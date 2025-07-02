-- Обновляем Google Analytics ID в системных настройках
UPDATE public.system_settings 
SET value = '"G-MVVVEX2HD3"', updated_at = now() 
WHERE key = 'google_analytics_id';

-- Также включаем Google Analytics
INSERT INTO public.system_settings (key, value, description) VALUES
  ('google_analytics_enabled', 'true', 'Включить Google Analytics')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();