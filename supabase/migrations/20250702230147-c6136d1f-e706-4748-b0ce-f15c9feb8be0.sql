-- Обновляем настройки для включения Telegram уведомлений
INSERT INTO public.system_settings (key, value, description) VALUES
  ('telegram_bot_configured', 'true', 'Telegram бот настроен и готов к работе'),
  ('telegram_webhook_url', '""', 'URL webhook для Telegram бота'),
  ('notification_system_status', '"fully_configured"', 'Статус системы уведомлений')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();