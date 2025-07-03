-- ЭТАП 1-2: ИСПРАВЛЕНИЕ ТРИГГЕРА И ДОБАВЛЕНИЕ ДЕТАЛЬНОГО ЛОГИРОВАНИЯ

-- Удаляем старый триггер
DROP TRIGGER IF EXISTS trigger_order_processing_on_insert ON public.orders;

-- Пересоздаем улучшенную функцию триггера с детальным логированием
CREATE OR REPLACE FUNCTION public.trigger_order_processing()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  service_role_key text;
  http_request_id bigint;
  function_url text := 'https://yotunjzgomkuuwpyftqr.supabase.co/functions/v1/process-order-workflow';
BEGIN
  -- Детальное логирование начала выполнения триггера
  INSERT INTO public.system_diagnostics (check_type, check_name, status, details)
  VALUES (
    'trigger',
    'trigger_execution_detailed',
    'pass',
    jsonb_build_object(
      'trigger_operation', TG_OP,
      'order_id', NEW.id,
      'order_status', NEW.status,
      'service_name', NEW.service_name,
      'contact_email', NEW.contact_email,
      'timestamp', now(),
      'stage', 'trigger_started'
    )
  );

  -- Обрабатываем только INSERT операции со статусом pending
  IF TG_OP = 'INSERT' AND NEW.status = 'pending' THEN
    
    -- Получаем service role key с проверками
    SELECT value INTO service_role_key 
    FROM public.system_settings 
    WHERE key = 'supabase_service_role_key'
    LIMIT 1;
    
    -- Fallback на переменную окружения
    IF service_role_key IS NULL OR service_role_key = '' THEN
      service_role_key := current_setting('app.supabase_service_role_key', true);
    END IF;
    
    -- Логируем состояние ключа
    INSERT INTO public.system_diagnostics (check_type, check_name, status, details)
    VALUES (
      'trigger',
      'service_key_check',
      CASE WHEN service_role_key IS NOT NULL AND service_role_key != '' THEN 'pass' ELSE 'fail' END,
      jsonb_build_object(
        'order_id', NEW.id,
        'key_available', service_role_key IS NOT NULL AND service_role_key != '',
        'key_length', COALESCE(length(service_role_key), 0),
        'timestamp', now()
      )
    );
    
    -- Проверяем наличие ключа
    IF service_role_key IS NULL OR service_role_key = '' THEN
      INSERT INTO public.system_diagnostics (check_type, check_name, status, details, error_message)
      VALUES (
        'trigger',
        'service_key_missing',
        'fail',
        jsonb_build_object('order_id', NEW.id, 'timestamp', now()),
        'Service role key not configured - cannot process order'
      );
      RETURN NEW; -- Не прерываем, но не обрабатываем
    END IF;
    
    -- Логируем попытку HTTP вызова
    INSERT INTO public.system_diagnostics (check_type, check_name, status, details)
    VALUES (
      'trigger',
      'http_call_attempt',
      'pass',
      jsonb_build_object(
        'order_id', NEW.id,
        'edge_function_url', function_url,
        'timestamp', now(),
        'stage', 'before_http_call'
      )
    );
    
    -- Выполняем HTTP вызов Edge Function
    BEGIN
      SELECT request_id INTO http_request_id
      FROM net.http_post(
        url := function_url,
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
        'http_call_success',
        'pass',
        jsonb_build_object(
          'order_id', NEW.id,
          'request_id', http_request_id,
          'edge_function_url', function_url,
          'timestamp', now(),
          'stage', 'http_call_completed'
        )
      );
      
    EXCEPTION
      WHEN OTHERS THEN
        -- Детальное логирование ошибок HTTP вызова
        INSERT INTO public.system_diagnostics (check_type, check_name, status, details, error_message)
        VALUES (
          'trigger',
          'http_call_error',
          'fail',
          jsonb_build_object(
            'order_id', NEW.id,
            'sql_state', SQLSTATE,
            'sql_message', SQLERRM,
            'timestamp', now(),
            'stage', 'http_call_failed'
          ),
          'HTTP call to Edge Function failed: ' || SQLERRM
        );
    END;
    
  ELSE
    -- Логируем пропуск обработки
    INSERT INTO public.system_diagnostics (check_type, check_name, status, details)
    VALUES (
      'trigger',
      'trigger_skipped',
      'pass',
      jsonb_build_object(
        'trigger_operation', TG_OP,
        'order_id', COALESCE(NEW.id, OLD.id),
        'order_status', COALESCE(NEW.status, OLD.status),
        'reason', CASE 
          WHEN TG_OP != 'INSERT' THEN 'not_insert_operation'
          WHEN NEW.status != 'pending' THEN 'status_not_pending'
          ELSE 'unknown'
        END,
        'timestamp', now()
      )
    );
  END IF;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Глобальное логирование ошибок триггера
    INSERT INTO public.system_diagnostics (check_type, check_name, status, details, error_message)
    VALUES (
      'trigger',
      'trigger_global_error',
      'fail',
      jsonb_build_object(
        'order_id', COALESCE(NEW.id, OLD.id),
        'sql_state', SQLSTATE,
        'sql_message', SQLERRM,
        'timestamp', now(),
        'context', 'trigger_order_processing_global_catch'
      ),
      'Trigger execution failed globally: ' || SQLERRM
    );
    
    RETURN NEW; -- Возвращаем NEW даже при ошибке, чтобы не блокировать создание заказа
END;
$$;

-- Создаем новый триггер
CREATE TRIGGER trigger_order_processing_on_insert
  AFTER INSERT ON public.orders
  FOR EACH ROW
  WHEN (NEW.status = 'pending')
  EXECUTE FUNCTION public.trigger_order_processing();

-- ЭТАП 3: ФУНКЦИЯ ТЕСТИРОВАНИЯ EDGE FUNCTION
CREATE OR REPLACE FUNCTION public.test_edge_function_directly(test_order_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  service_role_key text;
  http_request_id bigint;
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
  
  -- Тестируем прямой вызов Edge Function
  SELECT request_id INTO http_request_id
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
      'request_id', http_request_id,
      'timestamp', now(),
      'test_type', 'manual_direct_call'
    )
  );
  
  result := jsonb_build_object(
    'success', true,
    'request_id', http_request_id,
    'test_order_id', test_order_id,
    'timestamp', now()
  );
  
  RETURN result;
END;
$$;

-- ЭТАП 4: УЛУЧШЕННАЯ ФУНКЦИЯ ОБРАБОТКИ ЗАСТРЯВШИХ ЗАКАЗОВ
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
  http_request_id bigint;
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
      
      -- Запускаем обработку через HTTP вызов
      SELECT request_id INTO http_request_id
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
          'request_id', http_request_id,
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

-- ЭТАП 5: ФУНКЦИИ МОНИТОРИНГА И АЛЕРТОВ
CREATE OR REPLACE FUNCTION public.monitor_order_processing_health()
RETURNS TABLE(
  status text,
  metric_name text,
  metric_value numeric,
  alert_level text,
  details jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  WITH order_stats AS (
    SELECT 
      COUNT(*) FILTER (WHERE status = 'pending' AND created_at < now() - interval '10 minutes') as stuck_orders,
      COUNT(*) FILTER (WHERE status = 'pending') as total_pending,
      COUNT(*) FILTER (WHERE status = 'completed') as total_completed,
      COUNT(*) FILTER (WHERE created_at >= now() - interval '1 hour') as recent_orders,
      COUNT(*) FILTER (WHERE status = 'completed' AND completed_at >= now() - interval '1 hour') as recent_completed
    FROM public.orders
  ),
  trigger_stats AS (
    SELECT 
      COUNT(*) FILTER (WHERE check_name = 'trigger_execution_detailed' AND checked_at >= now() - interval '1 hour') as trigger_executions,
      COUNT(*) FILTER (WHERE check_name = 'http_call_success' AND checked_at >= now() - interval '1 hour') as successful_calls,
      COUNT(*) FILTER (WHERE check_name = 'http_call_error' AND checked_at >= now() - interval '1 hour') as failed_calls
    FROM public.system_diagnostics
  )
  SELECT 
    CASE 
      WHEN o.stuck_orders = 0 THEN 'healthy'
      WHEN o.stuck_orders < 5 THEN 'warning'
      ELSE 'critical'
    END as status,
    'stuck_orders' as metric_name,
    o.stuck_orders as metric_value,
    CASE 
      WHEN o.stuck_orders = 0 THEN 'ok'
      WHEN o.stuck_orders < 5 THEN 'warning'
      ELSE 'critical'
    END as alert_level,
    jsonb_build_object(
      'stuck_orders', o.stuck_orders,
      'total_pending', o.total_pending,
      'total_completed', o.total_completed,
      'recent_orders', o.recent_orders,
      'recent_completed', o.recent_completed,
      'trigger_executions', t.trigger_executions,
      'successful_calls', t.successful_calls,
      'failed_calls', t.failed_calls,
      'success_rate', CASE WHEN t.trigger_executions > 0 
        THEN t.successful_calls::numeric / t.trigger_executions * 100 
        ELSE 0 END
    ) as details
  FROM order_stats o, trigger_stats t;
END;
$$;

-- Создаем функцию автоматических проверок системы
CREATE OR REPLACE FUNCTION public.run_system_health_check()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  health_result jsonb;
  stuck_orders_count integer;
  trigger_working boolean;
  edge_function_responsive boolean;
BEGIN
  -- Проверяем застрявшие заказы
  SELECT COUNT(*) INTO stuck_orders_count
  FROM public.orders 
  WHERE status = 'pending' AND created_at < now() - interval '10 minutes';
  
  -- Проверяем работу триггера
  SELECT COUNT(*) > 0 INTO trigger_working
  FROM public.system_diagnostics 
  WHERE check_name = 'trigger_execution_detailed' 
    AND checked_at >= now() - interval '1 hour';
  
  -- Проверяем отзывчивость Edge Function
  SELECT COUNT(*) > 0 INTO edge_function_responsive
  FROM public.system_diagnostics 
  WHERE check_name = 'http_call_success' 
    AND checked_at >= now() - interval '1 hour';
  
  health_result := jsonb_build_object(
    'timestamp', now(),
    'overall_status', CASE 
      WHEN stuck_orders_count = 0 AND trigger_working AND edge_function_responsive THEN 'healthy'
      WHEN stuck_orders_count < 5 THEN 'warning'
      ELSE 'critical'
    END,
    'stuck_orders_count', stuck_orders_count,
    'trigger_working', trigger_working,
    'edge_function_responsive', edge_function_responsive,
    'recommendations', CASE 
      WHEN stuck_orders_count = 0 THEN 'System operating normally'
      WHEN stuck_orders_count < 5 THEN 'Monitor closely, consider reprocessing stuck orders'
      ELSE 'URGENT: Run process_all_stuck_orders_enhanced() function'
    END
  );
  
  -- Логируем результат проверки
  INSERT INTO public.system_diagnostics (check_type, check_name, status, details)
  VALUES (
    'health_check',
    'automated_system_health_check',
    CASE 
      WHEN stuck_orders_count = 0 AND trigger_working AND edge_function_responsive THEN 'pass'
      WHEN stuck_orders_count < 5 THEN 'warning'
      ELSE 'fail'
    END,
    health_result
  );
  
  RETURN health_result;
END;
$$;

-- Обновляем системные настройки
INSERT INTO public.system_settings (key, value, description) VALUES
  ('trigger_enhanced_version', '"v2.0_with_detailed_logging"', 'Версия улучшенного триггера'),
  ('edge_function_monitoring_enabled', 'true', 'Мониторинг Edge Functions включен'),
  ('auto_health_checks_enabled', 'true', 'Автоматические проверки системы включены'),
  ('last_system_enhancement', to_jsonb(now()), 'Время последнего улучшения системы')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();

-- НЕМЕДЛЕННОЕ ВЫПОЛНЕНИЕ: Запускаем обработку всех застрявших заказов
SELECT public.process_all_stuck_orders_enhanced() as bulk_processing_result;

-- НЕМЕДЛЕННОЕ ВЫПОЛНЕНИЕ: Запускаем проверку здоровья системы
SELECT public.run_system_health_check() as health_check_result;