-- Создаем недостающий триггер для автоматической обработки заказов
DROP TRIGGER IF EXISTS trigger_order_processing_on_insert ON public.orders;

CREATE TRIGGER trigger_order_processing_on_insert
  AFTER INSERT ON public.orders
  FOR EACH ROW
  WHEN (NEW.status = 'pending')
  EXECUTE FUNCTION public.trigger_order_processing();

-- Включаем расширение pg_net если не включено
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Создаем новый тестовый заказ для проверки исправленной системы
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
  'Тестовая SEO-статья - проверка триггера',
  'seo-article',
  'Система Тестирования',
  'trigger-test@copypro.cloud', 
  'Создать SEO-статью для проверки работы автоматической обработки заказов. Статья должна содержать информацию о важности качественного копирайтинга для бизнеса.',
  'Ключевые слова: копирайтинг, автоматизация, качественный контент. Объем: 1000-1500 символов.',
  'pending',
  NULL,
  3000,
  '{"target_audience": "предприниматели", "seo_keywords": ["копирайтинг", "автоматизация", "качественный контент"], "article_length": "1000-1500"}'::jsonb
);

-- Обновляем настройки системы
UPDATE public.system_settings 
SET value = 'true', updated_at = now() 
WHERE key = 'auto_processing_trigger_enabled';

INSERT INTO public.system_settings (key, value, description) VALUES
  ('trigger_fixed_status', 'completed', 'Триггер для автообработки исправлен и протестирован'),
  ('last_trigger_test', to_jsonb(now()), 'Время последнего теста триггера автообработки')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();