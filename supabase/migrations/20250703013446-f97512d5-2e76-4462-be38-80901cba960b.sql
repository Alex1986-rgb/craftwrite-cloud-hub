-- Настройка полной автоматизации системы обработки заказов

-- Включаем необходимые расширения
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Создаем cron job для автоматической обработки заказов каждые 5 минут
SELECT cron.schedule(
  'auto-process-orders',
  '*/5 * * * *', -- каждые 5 минут
  $$
  SELECT public.process_all_stuck_orders_enhanced();
  $$
);

-- Создаем cron job для обновления системной статистики каждые 15 минут
SELECT cron.schedule(
  'update-system-health',
  '*/15 * * * *', -- каждые 15 минут
  $$
  SELECT public.run_system_health_check();
  $$
);

-- Обновляем системные настройки для полной автоматизации
INSERT INTO public.system_settings (key, value, description) VALUES
  ('automation_enabled', 'true', 'Полная автоматизация системы включена'),
  ('auto_processing_interval', '5', 'Интервал автообработки в минутах'),
  ('health_check_interval', '15', 'Интервал проверки здоровья системы в минутах'),
  ('openai_api_configured', 'true', 'OpenAI API настроен'),
  ('system_automation_version', '2.0', 'Версия системы автоматизации')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();

-- Создаем функцию для немедленного запуска полной обработки
CREATE OR REPLACE FUNCTION public.activate_full_automation()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  processed_result jsonb;
  health_result jsonb;
BEGIN
  -- Обрабатываем все застрявшие заказы
  SELECT public.process_all_stuck_orders_enhanced() INTO processed_result;
  
  -- Проверяем здоровье системы
  SELECT public.run_system_health_check() INTO health_result;
  
  -- Логируем активацию автоматизации
  INSERT INTO public.system_diagnostics (check_type, check_name, status, details)
  VALUES (
    'automation',
    'full_automation_activated',
    'pass',
    jsonb_build_object(
      'processed_orders', processed_result,
      'system_health', health_result,
      'cron_jobs_active', true,
      'activation_timestamp', now()
    )
  );
  
  RETURN jsonb_build_object(
    'success', true,
    'automation_activated', true,
    'processed_orders', processed_result,
    'system_health', health_result,
    'timestamp', now()
  );
END;
$function$;