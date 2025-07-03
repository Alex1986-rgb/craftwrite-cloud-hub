-- Тестируем работу триггера с новым заказом
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
  'ФИНАЛЬНЫЙ ТЕСТ ТРИГГЕРА - РАБОТАЕТ ЛИ',
  'seo-article',
  'Тестирование Триггера',
  'trigger-final-test@copypro.cloud',
  'Создать тестовую SEO-статью для проверки работы восстановленного триггера автоматической обработки заказов.',
  'Ключевые слова: триггер, тестирование, автоматизация. Объем: 1200-1500 символов.',
  'pending',
  NULL,
  2800,
  '{"target_audience": "тестировщики", "seo_keywords": ["триггер", "тестирование", "автоматизация"], "article_length": "1200-1500", "trigger_test": true}'::jsonb
);