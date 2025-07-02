-- Создаем тестовый заказ для проверки системы
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
  'SEO-статья для тестирования системы',
  'seo-article',
  'Тест Пользователь',
  'test@copypro.cloud', 
  'Создать SEO-статью на тему "Как выбрать качественный копирайтинг для бизнеса". Статья должна быть информативной, содержать практические советы и призыв к действию.',
  'Включить ключевые слова: копирайтинг, качественные тексты, контент-маркетинг. Объем 1500-2000 символов.',
  'pending',
  NULL,
  5000,
  '{"target_audience": "владельцы бизнеса", "seo_keywords": ["копирайтинг", "качественные тексты", "контент-маркетинг"], "article_length": "1500-2000"}'::jsonb
);