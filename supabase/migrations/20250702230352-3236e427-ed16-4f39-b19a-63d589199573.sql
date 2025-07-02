-- Создаем триггер для автоматической обработки заказов
CREATE OR REPLACE FUNCTION public.trigger_order_processing()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Запускаем обработку заказа через edge function только для новых заказов
  IF TG_OP = 'INSERT' AND NEW.status = 'pending' THEN
    -- Используем pg_net для асинхронного вызова edge function
    PERFORM
      net.http_post(
        url := 'https://yotunjzgomkuuwpyftqr.supabase.co/functions/v1/process-order-workflow',
        headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.supabase_service_role_key', true) || '"}'::jsonb,
        body := json_build_object('order_id', NEW.id)::jsonb
      );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Создаем триггер, который будет запускаться при INSERT в таблицу orders
DROP TRIGGER IF EXISTS trigger_order_processing_on_insert ON public.orders;
CREATE TRIGGER trigger_order_processing_on_insert
  AFTER INSERT ON public.orders
  FOR EACH ROW
  WHEN (NEW.status = 'pending')
  EXECUTE FUNCTION public.trigger_order_processing();

-- Включаем pg_net расширение если оно не включено
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Обновляем настройки автоматической обработки
INSERT INTO public.system_settings (key, value, description) VALUES
  ('auto_processing_trigger_enabled', 'true', 'Триггер автоматической обработки заказов включен'),
  ('order_workflow_status', '"fully_automated"', 'Статус автоматического workflow'),
  ('edge_function_workflow_url', '"https://yotunjzgomkuuwpyftqr.supabase.co/functions/v1/process-order-workflow"', 'URL edge функции обработки')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();