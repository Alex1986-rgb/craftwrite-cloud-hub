-- Исправляем триггер для корректной работы с JSON
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
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || current_setting('app.supabase_service_role_key', true)
        ),
        body := jsonb_build_object('order_id', NEW.id::text)
      );
  END IF;
  
  RETURN NEW;
END;
$$;