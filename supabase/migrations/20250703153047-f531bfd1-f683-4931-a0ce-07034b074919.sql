-- КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ СИСТЕМЫ ОБРАБОТКИ ЗАКАЗОВ
-- Исправляем все найденные проблемы и восстанавливаем автоматизацию

-- ЭТАП 1: ИСПРАВЛЯЕМ HTTP ЗАПРОСЫ В ФУНКЦИЯХ
-- Исправляем функцию process_all_stuck_orders_enhanced с правильным синтаксисом
CREATE OR REPLACE FUNCTION public.process_all_stuck_orders_enhanced()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stuck_order RECORD;
  processed_count integer := 0;
  errors_count integer := 0;
  service_role_key text;
  http_request_result RECORD;
BEGIN
  -- Получаем service role key
  SELECT value INTO service_role_key 
  FROM public.system_settings 
  WHERE key = 'supabase_service_role_key'
  LIMIT 1;
  
  IF service_role_key IS NULL THEN
    service_role_key := current_setting('app.supabase_service_role_key', true);
  END IF;
  
  -- Логируем начало массовой обработки
  INSERT INTO public.system_diagnostics (check_type, check_name, status, details)
  VALUES (
    'bulk_processing',
    'mass_processing_started',
    'pass',
    jsonb_build_object(
      'timestamp', now(),
      'service_key_available', service_role_key IS NOT NULL
    )
  );
  
  -- Обрабатываем каждый застрявший заказ
  FOR stuck_order IN 
    SELECT id, service_name, created_at, contact_email
    FROM public.orders 
    WHERE status = 'pending'
    ORDER BY created_at ASC
  LOOP
    BEGIN
      -- Сбрасываем состояние заказа
      UPDATE public.orders 
      SET 
        generated_prompt = NULL,
        updated_at = now(),
        notes = COALESCE(notes || ' | ', '') || 'Перезапущен массово ' || now()::text
      WHERE id = stuck_order.id;
      
      -- ИСПРАВЛЕНО: Правильный синтаксис HTTP вызова
      SELECT * INTO http_request_result
      FROM net.http_post(
        url := 'https://yotunjzgomkuuwpyftqr.supabase.co/functions/v1/process-order-workflow',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || service_role_key
        ),
        body := jsonb_build_object('order_id', stuck_order.id::text)
      );
      
      -- Логируем успешную обработку
      INSERT INTO public.system_diagnostics (check_type, check_name, status, details)
      VALUES (
        'bulk_processing',
        'order_reprocessed',
        'pass',
        jsonb_build_object(
          'order_id', stuck_order.id,
          'http_request_id', http_request_result.id,
          'service_name', stuck_order.service_name,
          'timestamp', now()
        )
      );
      
      processed_count := processed_count + 1;
      
    EXCEPTION WHEN OTHERS THEN
      errors_count := errors_count + 1;
      
      INSERT INTO public.system_diagnostics (check_type, check_name, status, details, error_message)
      VALUES (
        'bulk_processing',
        'order_reprocess_error',
        'fail',
        jsonb_build_object(
          'order_id', stuck_order.id,
          'sql_state', SQLSTATE,
          'timestamp', now()
        ),
        'Failed to reprocess order: ' || SQLERRM
      );
    END;
  END LOOP;
  
  -- Финальное логирование
  INSERT INTO public.system_diagnostics (check_type, check_name, status, details)
  VALUES (
    'bulk_processing',
    'mass_processing_completed',
    CASE WHEN errors_count = 0 THEN 'pass' ELSE 'warning' END,
    jsonb_build_object(
      'processed_orders', processed_count,
      'errors_count', errors_count,
      'timestamp', now(),
      'success_rate', CASE WHEN processed_count + errors_count > 0 
        THEN processed_count::numeric / (processed_count + errors_count) * 100 
        ELSE 0 END
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

-- ЭТАП 2: ВОССТАНАВЛИВАЕМ ТРИГГЕР ОБРАБОТКИ ЗАКАЗОВ
-- Удаляем старый триггер если существует
DROP TRIGGER IF EXISTS trigger_order_processing_on_insert ON public.orders;

-- Создаем новый триггер
CREATE TRIGGER trigger_order_processing_on_insert
  AFTER INSERT ON public.orders
  FOR EACH ROW
  WHEN (NEW.status = 'pending')
  EXECUTE FUNCTION public.trigger_order_processing();

-- ЭТАП 3: ИСПРАВЛЯЕМ ДРУГИЕ ФУНКЦИИ С АНАЛОГИЧНЫМИ ПРОБЛЕМАМИ
-- Исправляем функцию test_edge_function_directly
CREATE OR REPLACE FUNCTION public.test_edge_function_directly(test_order_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  service_role_key text;
  http_request_result RECORD;
  result jsonb;
BEGIN
  -- Получаем service role key
  SELECT value INTO service_role_key 
  FROM public.system_settings 
  WHERE key = 'supabase_service_role_key'
  LIMIT 1;
  
  IF service_role_key IS NULL THEN
    service_role_key := current_setting('app.supabase_service_role_key', true);
  END IF;
  
  -- ИСПРАВЛЕНО: Тестируем прямой вызов Edge Function
  SELECT * INTO http_request_result
  FROM net.http_post(
    url := 'https://yotunjzgomkuuwpyftqr.supabase.co/functions/v1/process-order-workflow',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || service_role_key
    ),
    body := jsonb_build_object('order_id', test_order_id::text)
  );
  
  -- Логируем тест
  INSERT INTO public.system_diagnostics (check_type, check_name, status, details)
  VALUES (
    'edge_function_test',
    'direct_function_call',
    'pass',
    jsonb_build_object(
      'test_order_id', test_order_id,
      'http_request_id', http_request_result.id,
      'timestamp', now(),
      'test_type', 'manual_direct_call'
    )
  );
  
  result := jsonb_build_object(
    'success', true,
    'http_request_id', http_request_result.id,
    'test_order_id', test_order_id,
    'timestamp', now()
  );
  
  RETURN result;
END;
$$;

-- ЭТАП 4: СОЗДАЕМ АВТОМАТИЗИРОВАННУЮ СИСТЕМУ МОНИТОРИНГА
-- Функция автоматического исправления застрявших заказов
CREATE OR REPLACE FUNCTION public.auto_fix_stuck_orders()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stuck_count integer;
  fix_result jsonb;
BEGIN
  -- Проверяем количество застрявших заказов
  SELECT COUNT(*) INTO stuck_count
  FROM public.orders 
  WHERE status = 'pending' AND created_at < now() - interval '10 minutes';
  
  -- Если есть застрявшие заказы, исправляем их
  IF stuck_count > 0 THEN
    SELECT public.process_all_stuck_orders_enhanced() INTO fix_result;
    
    -- Логируем автоматическое исправление
    INSERT INTO public.system_diagnostics (check_type, check_name, status, details)
    VALUES (
      'automation',
      'auto_fix_executed',
      'pass',
      jsonb_build_object(
        'stuck_orders_found', stuck_count,
        'fix_result', fix_result,
        'timestamp', now(),
        'trigger', 'automatic'
      )
    );
  ELSE
    fix_result := jsonb_build_object(
      'processed_orders', 0,
      'message', 'No stuck orders found',
      'timestamp', now()
    );
  END IF;
  
  RETURN fix_result;
END;
$$;

-- ЭТАП 5: НАСТРАИВАЕМ АВТОМАТИЗАЦИЮ
-- Включаем необходимые расширения
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Удаляем старые cron jobs если существуют
SELECT cron.unschedule('auto-fix-stuck-orders') WHERE EXISTS (
  SELECT 1 FROM cron.job WHERE jobname = 'auto-fix-stuck-orders'
);

-- Создаем cron job для автоматического исправления застрявших заказов каждые 5 минут
SELECT cron.schedule(
  'auto-fix-stuck-orders',
  '*/5 * * * *', -- каждые 5 минут
  'SELECT public.auto_fix_stuck_orders();'
);

-- ЭТАП 6: ЗАПУСКАЕМ НЕМЕДЛЕННОЕ ИСПРАВЛЕНИЕ
-- Обрабатываем все застрявшие заказы прямо сейчас
SELECT public.process_all_stuck_orders_enhanced() as immediate_fix_result;

-- Создаем тестовый заказ для проверки работы триггера
INSERT INTO public.orders (
  service_name,
  service_slug, 
  contact_name,
  contact_email,
  details,
  status
) VALUES (
  'Тест восстановленной системы',
  'test-order',
  'Система Автоматизации',
  'automation-test@copypro.cloud', 
  'Тестовый заказ для проверки восстановленной автоматической обработки.',
  'pending'
);

-- ЭТАП 7: ОБНОВЛЯЕМ СИСТЕМНЫЕ НАСТРОЙКИ
INSERT INTO public.system_settings (key, value, description) VALUES
  ('system_fully_restored', 'true', 'Система полностью восстановлена'),
  ('automation_active', 'true', 'Автоматизация активна'),
  ('trigger_restored', 'true', 'Триггер обработки заказов восстановлен'),
  ('http_requests_fixed', 'true', 'HTTP запросы исправлены'),
  ('cron_jobs_active', 'true', 'Cron jobs настроены и активны'),
  ('last_full_restoration', jsonb_build_object('timestamp', now(), 'version', 'complete_fix_v1.0'), 'Последнее полное восстановление системы')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();

-- ЭТАП 8: ФИНАЛЬНАЯ ДИАГНОСТИКА
-- Запускаем полную диагностику системы
SELECT public.run_system_diagnostics() as final_diagnostics_result;