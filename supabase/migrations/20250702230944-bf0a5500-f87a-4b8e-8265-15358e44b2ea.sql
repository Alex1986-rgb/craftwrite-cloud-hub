-- Обновляем настройки после добавления OpenAI API ключа
UPDATE public.system_settings 
SET value = 'true', updated_at = now() 
WHERE key = 'openai_api_configured';

-- Отмечаем систему как полностью готовую к продакшену
INSERT INTO public.system_settings (key, value, description) VALUES
  ('production_readiness_status', '100', 'Система готова к продакшену на 100%'),
  ('openai_integration_status', '"fully_configured"', 'OpenAI интеграция полностью настроена'),
  ('auto_text_generation_enabled', 'true', 'Автоматическая генерация текстов включена'),
  ('system_launch_ready', 'true', 'Система готова к запуску в продакшен')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();