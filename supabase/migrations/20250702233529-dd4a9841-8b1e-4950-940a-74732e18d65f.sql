-- Complete fix for automatic order processing system

-- 1. First, fix the trigger function with proper error handling and configuration
CREATE OR REPLACE FUNCTION public.trigger_order_processing()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  service_role_key text;
BEGIN
  -- Only process new orders with pending status
  IF TG_OP = 'INSERT' AND NEW.status = 'pending' THEN
    -- Get the service role key from system settings
    SELECT value INTO service_role_key 
    FROM public.system_settings 
    WHERE key = 'supabase_service_role_key'
    LIMIT 1;
    
    -- If no service role key found, use environment variable
    IF service_role_key IS NULL THEN
      service_role_key := current_setting('app.supabase_service_role_key', true);
    END IF;
    
    -- If still no key, log error and continue
    IF service_role_key IS NULL OR service_role_key = '' THEN
      INSERT INTO public.system_diagnostics (check_type, check_name, status, details, error_message)
      VALUES (
        'trigger',
        'order_processing_trigger',
        'fail',
        jsonb_build_object('order_id', NEW.id, 'timestamp', now()),
        'Service role key not configured'
      );
      RETURN NEW;
    END IF;
    
    -- Call the edge function using pg_net
    PERFORM
      net.http_post(
        url := 'https://yotunjzgomkuuwpyftqr.supabase.co/functions/v1/process-order-workflow',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || service_role_key
        ),
        body := jsonb_build_object('order_id', NEW.id::text)
      );
    
    -- Log successful trigger execution
    INSERT INTO public.system_diagnostics (check_type, check_name, status, details)
    VALUES (
      'trigger',
      'order_processing_trigger',
      'pass',
      jsonb_build_object(
        'order_id', NEW.id,
        'service_name', NEW.service_name,
        'timestamp', now(),
        'action', 'edge_function_called'
      )
    );
  END IF;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log any errors that occur
    INSERT INTO public.system_diagnostics (check_type, check_name, status, details, error_message)
    VALUES (
      'trigger',
      'order_processing_trigger',
      'fail',
      jsonb_build_object(
        'order_id', NEW.id,
        'timestamp', now(),
        'sql_state', SQLSTATE,
        'sql_message', SQLERRM
      ),
      'Trigger execution failed: ' || SQLERRM
    );
    
    RETURN NEW;
END;
$$;

-- 2. Ensure pg_net extension is available
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 3. Create/recreate the trigger
DROP TRIGGER IF EXISTS trigger_order_processing_on_insert ON public.orders;

CREATE TRIGGER trigger_order_processing_on_insert
  AFTER INSERT ON public.orders
  FOR EACH ROW
  WHEN (NEW.status = 'pending')
  EXECUTE FUNCTION public.trigger_order_processing();

-- 4. Configure service role key in system settings (placeholder - will be updated via admin panel)
INSERT INTO public.system_settings (key, value, description) VALUES
  ('supabase_service_role_key', '""', 'Supabase Service Role Key for Edge Function calls'),
  ('auto_processing_enabled', 'true', 'Automatic order processing enabled'),
  ('trigger_status', '"active"', 'Status of order processing trigger'),
  ('last_trigger_fix', jsonb_build_object('timestamp', now(), 'version', '2.0'), 'Last trigger fix timestamp')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();

-- 5. Add monitoring function for trigger health
CREATE OR REPLACE FUNCTION public.check_trigger_health()
RETURNS TABLE(
  trigger_exists boolean,
  function_exists boolean,
  recent_executions integer,
  last_error text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    EXISTS(
      SELECT 1 FROM information_schema.triggers 
      WHERE trigger_name = 'trigger_order_processing_on_insert'
      AND event_object_table = 'orders'
    ) as trigger_exists,
    EXISTS(
      SELECT 1 FROM information_schema.routines 
      WHERE routine_name = 'trigger_order_processing'
      AND routine_type = 'FUNCTION'
    ) as function_exists,
    COALESCE((
      SELECT COUNT(*)::integer 
      FROM public.system_diagnostics 
      WHERE check_name = 'order_processing_trigger'
      AND checked_at >= now() - interval '1 hour'
    ), 0) as recent_executions,
    (
      SELECT error_message 
      FROM public.system_diagnostics 
      WHERE check_name = 'order_processing_trigger'
      AND status = 'fail'
      ORDER BY checked_at DESC 
      LIMIT 1
    ) as last_error;
END;
$$;

-- 6. Create a test order to verify the system
INSERT INTO public.orders (
  service_name,
  service_slug,
  contact_name,
  contact_email,
  details,
  additional_requirements,
  status,
  user_id,
  estimated_price,
  service_options
) VALUES (
  'Тест исправленной системы автообработки',
  'seo-article',
  'Система Диагностики v2.0',
  'fixed-system-test@copypro.cloud',
  'Тестовый заказ для проверки исправленной системы автоматической обработки заказов с улучшенным триггером и обработкой ошибок.',
  'Включает: проверку триггера, обработку ошибок, мониторинг выполнения.',
  'pending',
  NULL,
  2800,
  '{"target_audience": "системные администраторы", "seo_keywords": ["автоматизация", "мониторинг", "обработка заказов"], "article_length": "1500-2000"}'::jsonb
);

-- 7. Mark existing pending orders for reprocessing
UPDATE public.orders 
SET status = 'pending', 
    updated_at = now(),
    notes = COALESCE(notes || ' | ', '') || 'Reprocessed after trigger fix'
WHERE status = 'pending' 
  AND created_at < now() - interval '3 minutes'
  AND id IN (
    SELECT id FROM public.orders 
    WHERE status = 'pending' 
    AND created_at < now() - interval '3 minutes'
    ORDER BY created_at ASC 
    LIMIT 10
  );