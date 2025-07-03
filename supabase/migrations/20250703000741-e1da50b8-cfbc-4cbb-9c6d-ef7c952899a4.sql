-- Создаем финальный тест системы для диагностики
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
  'Диагностический тест Edge Function',
  'seo-article',
  'Система Диагностики 2025',
  'diagnostics@copypro.cloud',
  'Создать SEO-статью для проверки полного цикла работы Edge Function после исправлений. Важно убедиться что функция получает заказ, генерирует промпт, обращается к OpenAI и сохраняет результат.',
  'Ключевые слова: диагностика, Edge Function, автоматизация, тестирование. Объем: 1800-2200 символов.',
  'pending',
  NULL,
  3500,
  '{"target_audience": "системные администраторы", "seo_keywords": ["диагностика", "Edge Function", "автоматизация"], "article_length": "1800-2200", "test_order": true}'::jsonb
);