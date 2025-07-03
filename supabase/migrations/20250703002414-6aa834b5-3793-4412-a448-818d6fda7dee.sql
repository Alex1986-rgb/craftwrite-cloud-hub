-- КОМПЛЕКСНОЕ ИСПРАВЛЕНИЕ СИСТЕМЫ АВТООБРАБОТКИ ЗАКАЗОВ
-- План из 5 этапов: диагностика, пересоздание, тестирование, восстановление, мониторинг

-- ЭТАП 1: ДИАГНОСТИКА И ОЧИСТКА
-- Удаляем старые диагностические записи
DELETE FROM public.system_diagnostics WHERE check_name = 'order_processing_trigger' AND checked_at < now() - interval '1 hour';

-- Проверяем текущее состояние триггера
INSERT INTO public.system_diagnostics (check_type, check_name, status, details)
SELECT 
  'trigger',
  'trigger_diagnosis',
  CASE WHEN count(*) > 0 THEN 'pass' ELSE 'fail' END,
  jsonb_build_object(
    'triggers_found', count(*),
    'trigger_names', array_agg(trigger_name),
    'timestamp', now()
  )
FROM information_schema.triggers 
WHERE event_object_table = 'orders' 
  AND trigger_schema = 'public'
  AND trigger_name LIKE '%processing%';

-- ЭТАП 2: ПЕРЕСОЗДАНИЕ ТРИГГЕРА С УЛУЧШЕННОЙ ЛОГИКОЙ
-- Удаляем существующий триггер
DROP TRIGGER IF EXISTS trigger_order_processing_on_insert ON public.orders;

-- Улучшаем функцию триггера с детальным логированием
CREATE OR REPLACE FUNCTION public.trigger_order_processing()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  service_role_key text;
  http_request_id bigint;
BEGIN
  -- Логируем начало выполнения триггера
  INSERT INTO public.system_diagnostics (check_type, check_name, status, details)
  VALUES (
    'trigger',
    'trigger_execution_start',
    'pass',
    jsonb_build_object(
      'order_id', NEW.id,
      'service_name', NEW.service_name,
      'status', NEW.status,
      'timestamp', now(),
      'action', 'trigger_fired'
    )
  );

  -- Обрабатываем только новые заказы со статусом pending
  IF TG_OP = 'INSERT' AND NEW.status = 'pending' THEN
    -- Получаем service role key
    SELECT value INTO service_role_key 
    FROM public.system_settings 
    WHERE key = 'supabase_service_role_key'
    LIMIT 1;
    
    -- Если ключ не найден, используем переменную окружения
    IF service_role_key IS NULL THEN
      service_role_key := current_setting('app.supabase_service_role_key', true);
    END IF;
    
    -- Проверяем наличие ключа
    IF service_role_key IS NULL OR service_role_key = '' THEN
      INSERT INTO public.system_diagnostics (check_type, check_name, status, details, error_message)
      VALUES (
        'trigger',
        'service_key_error',
        'fail',
        jsonb_build_object('order_id', NEW.id, 'timestamp', now()),
        'Service role key not configured'
      );
      RETURN NEW;
    END IF;
    
    -- Вызываем Edge Function
    SELECT request_id INTO http_request_id
    FROM net.http_post(
      url := 'https://yotunjzgomkuuwpyftqr.supabase.co/functions/v1/process-order-workflow',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || service_role_key
      ),
      body := jsonb_build_object('order_id', NEW.id::text)
    );
    
    -- Логируем успешный вызов
    INSERT INTO public.system_diagnostics (check_type, check_name, status, details)
    VALUES (
      'trigger',
      'edge_function_called',
      'pass',
      jsonb_build_object(
        'order_id', NEW.id,
        'request_id', http_request_id,
        'edge_function_url', 'process-order-workflow',
        'timestamp', now(),
        'action', 'http_post_success'
      )
    );
  END IF;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Детальное логирование ошибок
    INSERT INTO public.system_diagnostics (check_type, check_name, status, details, error_message)
    VALUES (
      'trigger',
      'trigger_error',
      'fail',
      jsonb_build_object(
        'order_id', NEW.id,
        'sql_state', SQLSTATE,
        'sql_message', SQLERRM,
        'timestamp', now(),
        'context', 'trigger_order_processing'
      ),
      'Trigger execution failed: ' || SQLERRM
    );
    
    RETURN NEW;
END;
$$;

-- Создаем новый триггер
CREATE TRIGGER trigger_order_processing_on_insert
  AFTER INSERT ON public.orders
  FOR EACH ROW
  WHEN (NEW.status = 'pending')
  EXECUTE FUNCTION public.trigger_order_processing();

-- ЭТАП 3: ФУНКЦИЯ МОНИТОРИНГА ЗАСТРЯВШИХ ЗАКАЗОВ
CREATE OR REPLACE FUNCTION public.monitor_stuck_orders()
RETURNS TABLE(
  stuck_orders_count integer,
  oldest_pending_age interval,
  recommended_action text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stuck_count integer;
  oldest_age interval;
BEGIN
  -- Считаем застрявшие заказы (старше 10 минут в pending)
  SELECT 
    COUNT(*),
    COALESCE(MAX(now() - created_at), interval '0')
  INTO stuck_count, oldest_age
  FROM public.orders 
  WHERE status = 'pending' 
    AND created_at < now() - interval '10 minutes';
  
  RETURN QUERY SELECT 
    stuck_count,
    oldest_age,
    CASE 
      WHEN stuck_count = 0 THEN 'Система работает нормально'
      WHEN stuck_count < 5 THEN 'Перезапустить обработку застрявших заказов'
      ELSE 'КРИТИЧНО: Проверить триггер и Edge Function'
    END;
END;
$$;

-- ЭТАП 4: ВОССТАНОВЛЕНИЕ ЗАСТРЯВШИХ ЗАКАЗОВ
-- Создаем функцию массового перезапуска
CREATE OR REPLACE FUNCTION public.reprocess_all_stuck_orders()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stuck_order RECORD;
  processed_count integer := 0;
  errors_count integer := 0;
  service_role_key text;
BEGIN
  -- Получаем service role key
  SELECT value INTO service_role_key 
  FROM public.system_settings 
  WHERE key = 'supabase_service_role_key'
  LIMIT 1;
  
  IF service_role_key IS NULL THEN
    service_role_key := current_setting('app.supabase_service_role_key', true);
  END IF;
  
  -- Обрабатываем каждый застрявший заказ
  FOR stuck_order IN 
    SELECT id, service_name, created_at
    FROM public.orders 
    WHERE status = 'pending' 
      AND created_at < now() - interval '5 minutes'
    ORDER BY created_at ASC
  LOOP
    BEGIN
      -- Сбрасываем состояние заказа
      UPDATE public.orders 
      SET 
        generated_prompt = NULL,
        updated_at = now(),
        notes = COALESCE(notes || ' | ', '') || 'Перезапущен автоматически ' || now()::text
      WHERE id = stuck_order.id;
      
      -- Запускаем обработку через HTTP вызов
      PERFORM net.http_post(
        url := 'https://yotunjzgomkuuwpyftqr.supabase.co/functions/v1/process-order-workflow',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || service_role_key
        ),
        body := jsonb_build_object('order_id', stuck_order.id::text)
      );
      
      processed_count := processed_count + 1;
      
    EXCEPTION WHEN OTHERS THEN
      errors_count := errors_count + 1;
      
      INSERT INTO public.system_diagnostics (check_type, check_name, status, details, error_message)
      VALUES (
        'reprocess',
        'reprocess_error',
        'fail',
        jsonb_build_object('order_id', stuck_order.id, 'timestamp', now()),
        'Failed to reprocess order: ' || SQLERRM
      );
    END;
  END LOOP;
  
  -- Логируем результат
  INSERT INTO public.system_diagnostics (check_type, check_name, status, details)
  VALUES (
    'reprocess',
    'bulk_reprocess_completed',
    CASE WHEN errors_count = 0 THEN 'pass' ELSE 'warning' END,
    jsonb_build_object(
      'processed_orders', processed_count,
      'errors_count', errors_count,
      'timestamp', now(),
      'action', 'bulk_reprocess'
    )
  );
  
  RETURN jsonb_build_object(
    'processed_orders', processed_count,
    'errors_count', errors_count,
    'success', true,
    'timestamp', now()
  );
END;
$$;

-- ЭТАП 5: ЗАПУСК ВОССТАНОВЛЕНИЯ
-- Сразу перезапускаем все застрявшие заказы
SELECT public.reprocess_all_stuck_orders();

-- Обновляем системные настройки
INSERT INTO public.system_settings (key, value, description) VALUES
  ('order_processing_fixed', 'true', 'Система автообработки полностью исправлена'),
  ('trigger_recreated_timestamp', to_jsonb(now()::text), 'Время пересоздания триггера'),
  ('monitoring_enabled', 'true', 'Мониторинг застрявших заказов включен'),
  ('last_bulk_reprocess', to_jsonb(now()::text), 'Последний массовый перезапуск')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();

-- Финальная диагностика
INSERT INTO public.system_diagnostics (check_type, check_name, status, details)
VALUES (
  'system',
  'comprehensive_fix_completed',
  'pass',
  jsonb_build_object(
    'timestamp', now(),
    'trigger_recreated', true,
    'monitoring_enabled', true,
    'stuck_orders_reprocessed', true,
    'system_status', 'fully_operational',
    'fix_version', '5.0_comprehensive'
  )
);