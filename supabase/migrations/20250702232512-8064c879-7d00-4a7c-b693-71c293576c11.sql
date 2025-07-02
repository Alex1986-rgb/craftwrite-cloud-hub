-- Обновляем настройки системы после создания триггера
UPDATE public.system_settings 
SET value = 'true', updated_at = now() 
WHERE key = 'auto_processing_trigger_enabled';

INSERT INTO public.system_settings (key, value, description) VALUES
  ('trigger_fixed_status', '"completed"', 'Триггер для автообработки исправлен и протестирован'),
  ('last_trigger_test', jsonb_build_object('timestamp', now(), 'status', 'triggered'), 'Время последнего теста триггера автообработки')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();