-- Create a new test order to verify the complete workflow
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
  'Финальный тест обработки заказов',
  'seo-article',
  'Система Тестирования v3.0',
  'final-test@copypro.cloud',
  'Создать SEO-статью для проверки полного цикла автоматической обработки заказов после всех исправлений и настройки системы.',
  'Ключевые слова: автоматизация, копирайтинг, система обработки заказов. Объем: 1500-2000 символов.',
  'pending',
  NULL,
  3500,
  '{"target_audience": "администраторы", "seo_keywords": ["автоматизация", "копирайтинг", "система обработки"], "article_length": "1500-2000"}'::jsonb
);