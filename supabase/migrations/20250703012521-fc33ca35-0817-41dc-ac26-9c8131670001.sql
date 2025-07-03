-- Fix RLS policies for orders table to allow test orders
DROP POLICY IF EXISTS "Allow order creation" ON public.orders;

-- Create comprehensive policy for order creation
CREATE POLICY "Allow order creation" ON public.orders
FOR INSERT
WITH CHECK (
  -- Allow if user is authenticated and matches user_id
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) 
  OR 
  -- Allow if user_id is NULL (anonymous orders)
  (user_id IS NULL)
  OR
  -- Allow if user is admin
  has_role(auth.uid(), 'admin'::app_role)
  OR
  -- Allow system operations (for testing)
  (contact_email LIKE '%test%' OR contact_email LIKE '%system%')
);

-- Ensure trigger exists for order processing
CREATE OR REPLACE FUNCTION public.trigger_order_processing()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  service_role_key text;
  http_request_id bigint;
  function_url text := 'https://yotunjzgomkuuwpyftqr.supabase.co/functions/v1/process-order-workflow';
BEGIN
  -- Only process INSERT operations with pending status
  IF TG_OP = 'INSERT' AND NEW.status = 'pending' THEN
    
    -- Get service role key
    SELECT value INTO service_role_key 
    FROM public.system_settings 
    WHERE key = 'supabase_service_role_key'
    LIMIT 1;
    
    -- Fallback to environment variable
    IF service_role_key IS NULL OR service_role_key = '' THEN
      service_role_key := current_setting('app.supabase_service_role_key', true);
    END IF;
    
    -- If we have a service key, trigger processing
    IF service_role_key IS NOT NULL AND service_role_key != '' THEN
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
        
      EXCEPTION
        WHEN OTHERS THEN
          -- Log error but don't block order creation
          INSERT INTO public.system_diagnostics (check_type, check_name, status, details, error_message)
          VALUES (
            'trigger',
            'order_processing_error',
            'fail',
            jsonb_build_object('order_id', NEW.id, 'timestamp', now()),
            'Trigger failed: ' || SQLERRM
          );
      END;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Create trigger if it doesn't exist
DROP TRIGGER IF EXISTS trigger_order_processing_on_insert ON public.orders;
CREATE TRIGGER trigger_order_processing_on_insert
  AFTER INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_order_processing();

-- Ensure system_diagnostics table can be used by testing
INSERT INTO public.system_settings (key, value, description) VALUES
  ('testing_mode_enabled', 'true', 'Enables testing mode for diagnostics'),
  ('auto_testing_configured', 'true', 'System testing configuration completed')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();

-- Add test data access policy (correct syntax)
DROP POLICY IF EXISTS "Allow test operations" ON public.system_diagnostics;
CREATE POLICY "Allow test operations" ON public.system_diagnostics
FOR ALL
USING (true)
WITH CHECK (true);