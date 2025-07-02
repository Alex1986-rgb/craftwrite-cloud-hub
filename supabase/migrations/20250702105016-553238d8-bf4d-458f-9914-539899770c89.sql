
-- Создаем базовые системные настройки для проекта
INSERT INTO public.system_settings (key, value, description) VALUES
  ('site_title', '"CopyPro Cloud - Профессиональный копирайтинг"', 'Заголовок сайта'),
  ('site_description', '"Ведущая платформа профессионального копирайтинга в России и СНГ с командой из 50+ сертифицированных экспертов"', 'Описание сайта'),
  ('default_currency', '"RUB"', 'Валюта по умолчанию'),
  ('maintenance_mode', 'false', 'Режим технического обслуживания'),
  ('google_analytics_id', '""', 'Google Analytics Measurement ID'),
  ('yandex_metrica_id', '""', 'Яндекс.Метрика ID'),
  ('base_url', '"https://copypro.cloud"', 'Базовый URL проекта'),
  ('support_email', '"support@copypro.cloud"', 'Email поддержки'),
  ('support_phone', '"+7 (800) 123-45-67"', 'Телефон поддержки'),
  ('order_confirmation_enabled', 'true', 'Включить подтверждение заказов'),
  ('telegram_notifications_enabled', 'true', 'Включить уведомления в Telegram'),
  ('email_notifications_enabled', 'true', 'Включить email уведомления'),
  ('min_order_amount', '1000', 'Минимальная сумма заказа в копейках'),
  ('max_order_amount', '100000000', 'Максимальная сумма заказа в копейках'),
  ('default_deadline_days', '7', 'Срок выполнения заказа по умолчанию в днях')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  description = EXCLUDED.description,
  updated_at = now();

-- Создаем настройки для аналитики
INSERT INTO public.system_settings (key, value, description) VALUES
  ('analytics_enabled', 'true', 'Включить аналитику'),
  ('performance_monitoring_enabled', 'true', 'Включить мониторинг производительности'),
  ('conversion_tracking_enabled', 'true', 'Включить отслеживание конверсий'),
  ('ab_testing_enabled', 'false', 'Включить A/B тестирование')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  description = EXCLUDED.description,
  updated_at = now();
