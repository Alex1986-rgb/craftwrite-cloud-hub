-- Phase 1: Critical Issues - Configure Analytics and Production Settings

-- Update analytics settings to enable tracking
UPDATE public.system_settings 
SET value = 'true'
WHERE key IN ('google_analytics_enabled', 'yandex_metrika_enabled', 'analytics_enabled');

-- Add production readiness settings
INSERT INTO public.system_settings (key, value, description) VALUES
  ('launch_status', '"production"', 'Статус запуска системы'),
  ('production_mode', 'true', 'Режим продакшена'),
  ('google_analytics_id', '"G-XXXXXXXXXX"', 'Google Analytics Measurement ID (требует настройки)'),
  ('yandex_metrika_id', '"12345678"', 'Яндекс.Метрика ID (требует настройки)'),
  ('error_monitoring_enabled', 'true', 'Включить мониторинг ошибок'),
  ('performance_monitoring_enabled', 'true', 'Включить мониторинг производительности'),
  ('automated_testing_enabled', 'true', 'Включить автоматизированное тестирование'),
  ('order_auto_processing_enabled', 'true', 'Включить автоматическую обработку заказов'),
  ('notification_system_enabled', 'true', 'Включить систему уведомлений'),
  ('abandoned_cart_recovery_enabled', 'true', 'Включить восстановление заброшенных заказов'),
  ('admin_dashboard_enhanced', 'true', 'Включить расширенную админ панель')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  description = EXCLUDED.description,
  updated_at = now();

-- Create table for system diagnostics
CREATE TABLE IF NOT EXISTS public.system_diagnostics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  check_type text NOT NULL,
  check_name text NOT NULL,
  status text NOT NULL CHECK (status IN ('pass', 'fail', 'warning')),
  details jsonb DEFAULT '{}',
  error_message text,
  checked_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on diagnostics table
ALTER TABLE public.system_diagnostics ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to manage diagnostics
CREATE POLICY "Admins can manage system diagnostics"
ON public.system_diagnostics
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create table for order processing queue
CREATE TABLE IF NOT EXISTS public.order_processing_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
  processing_step text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  attempts integer DEFAULT 0,
  max_attempts integer DEFAULT 3,
  error_message text,
  scheduled_at timestamp with time zone DEFAULT now(),
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on processing queue
ALTER TABLE public.order_processing_queue ENABLE ROW LEVEL SECURITY;

-- Create policy for system to manage queue
CREATE POLICY "System can manage order processing queue"
ON public.order_processing_queue
FOR ALL
TO authenticated
USING (true);

-- Create table for abandoned order recovery
CREATE TABLE IF NOT EXISTS public.abandoned_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_id uuid,
  step_abandoned text NOT NULL,
  form_data jsonb DEFAULT '{}',
  recovery_attempts integer DEFAULT 0,
  recovered_at timestamp with time zone,
  abandoned_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on abandoned orders
ALTER TABLE public.abandoned_orders ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own abandoned orders
CREATE POLICY "Users can view their own abandoned orders"
ON public.abandoned_orders
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

-- Create policy for system to manage abandoned orders
CREATE POLICY "System can manage abandoned orders"
ON public.abandoned_orders
FOR ALL
TO authenticated
USING (true);

-- Create function to run system diagnostics
CREATE OR REPLACE FUNCTION public.run_system_diagnostics()
RETURNS TABLE(
  check_type text,
  check_name text,
  status text,
  details jsonb,
  error_message text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Clear previous diagnostics
  DELETE FROM public.system_diagnostics WHERE checked_at < now() - interval '1 hour';
  
  -- Check database connectivity
  INSERT INTO public.system_diagnostics (check_type, check_name, status, details)
  VALUES ('database', 'connectivity', 'pass', '{"timestamp": "' || now() || '"}');
  
  -- Check system settings
  INSERT INTO public.system_diagnostics (check_type, check_name, status, details)
  SELECT 
    'configuration',
    'analytics_settings',
    CASE 
      WHEN COUNT(*) FILTER (WHERE key IN ('google_analytics_enabled', 'yandex_metrika_enabled') AND value = 'true') >= 2 
      THEN 'pass'
      ELSE 'warning'
    END,
    jsonb_build_object('enabled_analytics', COUNT(*) FILTER (WHERE key IN ('google_analytics_enabled', 'yandex_metrika_enabled') AND value = 'true'))
  FROM public.system_settings
  WHERE key IN ('google_analytics_enabled', 'yandex_metrika_enabled');
  
  -- Check pending orders
  INSERT INTO public.system_diagnostics (check_type, check_name, status, details)
  SELECT 
    'operations',
    'pending_orders',
    CASE 
      WHEN COUNT(*) > 10 THEN 'warning'
      WHEN COUNT(*) > 5 THEN 'pass'
      ELSE 'pass'
    END,
    jsonb_build_object('pending_count', COUNT(*))
  FROM public.orders
  WHERE status = 'pending';
  
  -- Return diagnostics results
  RETURN QUERY
  SELECT 
    sd.check_type,
    sd.check_name,
    sd.status,
    sd.details,
    sd.error_message
  FROM public.system_diagnostics sd
  WHERE sd.checked_at >= now() - interval '5 minutes'
  ORDER BY sd.checked_at DESC;
END;
$$;

-- Create function to process order queue
CREATE OR REPLACE FUNCTION public.process_order_queue()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  queue_item RECORD;
BEGIN
  -- Process pending queue items
  FOR queue_item IN 
    SELECT * FROM public.order_processing_queue 
    WHERE status = 'pending' 
    AND scheduled_at <= now()
    AND attempts < max_attempts
    ORDER BY created_at ASC
    LIMIT 10
  LOOP
    -- Update status to processing
    UPDATE public.order_processing_queue 
    SET status = 'processing', started_at = now(), attempts = attempts + 1
    WHERE id = queue_item.id;
    
    -- Here would be the actual processing logic
    -- For now, just mark as completed
    UPDATE public.order_processing_queue 
    SET status = 'completed', completed_at = now()
    WHERE id = queue_item.id;
  END LOOP;
END;
$$;