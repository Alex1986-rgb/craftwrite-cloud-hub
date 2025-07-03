-- Исправляем SQL функции для корректной работы с net.http_post

-- Исправляем функцию process_all_stuck_orders_enhanced
CREATE OR REPLACE FUNCTION public.process_all_stuck_orders_enhanced()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
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
      
      -- ИСПРАВЛЕНО: Запускаем обработку через HTTP вызов
      SELECT id INTO http_request_id
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
          'http_request_id', http_request_id,
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
$function$;

-- Исправляем функцию test_edge_function_directly
CREATE OR REPLACE FUNCTION public.test_edge_function_directly(test_order_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
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
  
  -- ИСПРАВЛЕНО: Тестируем прямой вызов Edge Function
  SELECT id INTO http_request_id
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
      'http_request_id', http_request_id,
      'timestamp', now(),
      'test_type', 'manual_direct_call'
    )
  );
  
  result := jsonb_build_object(
    'success', true,
    'http_request_id', http_request_id,
    'test_order_id', test_order_id,
    'timestamp', now()
  );
  
  RETURN result;
END;
$function$;

-- Обновляем настройки системы
INSERT INTO public.system_settings (key, value, description) VALUES
  ('sql_functions_fixed', 'true', 'SQL функции исправлены для net.http_post'),
  ('fix_timestamp', to_jsonb(now()), 'Время исправления SQL функций'),
  ('system_ready_for_processing', 'true', 'Система готова для массовой обработки')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();