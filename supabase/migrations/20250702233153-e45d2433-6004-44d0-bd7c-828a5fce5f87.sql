-- Fix the automatic order processing system

-- 1. Create the missing trigger for automatic order processing
DROP TRIGGER IF EXISTS trigger_order_processing_on_insert ON public.orders;

CREATE TRIGGER trigger_order_processing_on_insert
  AFTER INSERT ON public.orders
  FOR EACH ROW
  WHEN (NEW.status = 'pending')
  EXECUTE FUNCTION public.trigger_order_processing();

-- 2. Enable pg_net extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 3. Set up system settings for proper monitoring
INSERT INTO public.system_settings (key, value, description) VALUES
  ('auto_processing_trigger_enabled', 'true', 'Триггер автоматической обработки заказов включен'),
  ('trigger_status', '"active"', 'Статус триггера автообработки'),
  ('last_trigger_check', jsonb_build_object('timestamp', now(), 'status', 'configured'), 'Время последней проверки триггера')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();

-- 4. Create a test order to verify the system works
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
  'Тест автоматической обработки',
  'seo-article',
  'Система Диагностики',
  'autotest@copypro.cloud', 
  'Автоматический тест для проверки работы триггера обработки заказов после исправления системы.',
  'Тест включает: проверку триггера, вызов Edge Function, генерацию контента.',
  'pending',
  NULL,
  2500,
  '{"target_audience": "разработчики", "seo_keywords": ["автоматизация", "тестирование", "система"], "article_length": "1200-1500"}'::jsonb
);

-- 5. Reprocess stuck pending orders
UPDATE public.orders 
SET status = 'pending', 
    updated_at = now()
WHERE status = 'pending' 
  AND created_at < now() - interval '5 minutes'
  AND id IN (
    SELECT id FROM public.orders 
    WHERE status = 'pending' 
    ORDER BY created_at ASC 
    LIMIT 10
  );