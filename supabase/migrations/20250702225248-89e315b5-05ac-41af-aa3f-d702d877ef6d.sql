-- Обновляем Yandex Metrica ID в системных настройках
UPDATE public.system_settings 
SET value = '"103175646"', updated_at = now() 
WHERE key = 'yandex_metrica_id';

-- Также включаем Yandex Metrica
INSERT INTO public.system_settings (key, value, description) VALUES
  ('yandex_metrika_enabled', 'true', 'Включить Яндекс.Метрику')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();

-- Обновляем дополнительные настройки аналитики
INSERT INTO public.system_settings (key, value, description) VALUES
  ('analytics_enabled', 'true', 'Включить аналитику'),
  ('conversion_tracking_enabled', 'true', 'Включить отслеживание конверсий')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();