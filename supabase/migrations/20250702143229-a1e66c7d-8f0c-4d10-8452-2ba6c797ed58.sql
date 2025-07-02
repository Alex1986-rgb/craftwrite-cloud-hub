-- Создание триггера для автоматической обработки заказов
CREATE OR REPLACE FUNCTION public.trigger_order_processing()
RETURNS TRIGGER AS $$
BEGIN
  -- Запускаем обработку заказа через edge function только для новых заказов
  IF TG_OP = 'INSERT' AND NEW.status = 'pending' THEN
    -- Используем pg_net для асинхронного вызова edge function
    PERFORM
      net.http_post(
        url := 'https://yotunjzgomkuuwpyftqr.supabase.co/functions/v1/process-order-workflow',
        headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.supabase_service_role_key', true) || '"}'::jsonb,
        body := json_build_object('order_id', NEW.id)::jsonb
      );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Создаем триггер на вставку заказов
DROP TRIGGER IF EXISTS trigger_new_order_processing ON public.orders;
CREATE TRIGGER trigger_new_order_processing
  AFTER INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_order_processing();

-- Добавляем уникальный индекс для service_type в prompt_templates
CREATE UNIQUE INDEX IF NOT EXISTS idx_prompt_templates_service_type ON public.prompt_templates(service_type);

-- Добавляем промпт-шаблоны для основных услуг
INSERT INTO public.prompt_templates (service_type, template_name, prompt_template, variables) VALUES
('seo-article', 'SEO Статья', 
'Создай SEO-оптимизированную статью на тему "{{service_name}}".

Техническое задание:
{{details}}

{{additional_requirements}}

Ключевые слова: {{keywords}}
Целевая аудитория: {{target_audience}}
Объем: {{word_count}} слов
Тон: {{tone_style}}

Требования:
- Уникальный контент
- SEO-оптимизация с ключевыми словами
- Структура: заголовок H1, подзаголовки H2-H3
- Мета-описание до 160 символов
- Призыв к действию

Создай профессиональную статью, которая будет полезна читателям и оптимизирована для поисковых систем.',
'["service_name", "details", "additional_requirements", "keywords", "target_audience", "word_count", "tone_style"]'::jsonb),

('landing-page', 'Лендинг пейдж', 
'Создай продающий текст для лендинг-страницы "{{service_name}}".

Техническое задание:
{{details}}

{{additional_requirements}}

Ключевые слова: {{keywords}}
Целевая аудитория: {{target_audience}}
Тон: {{tone_style}}

Структура:
1. Цепляющий заголовок
2. Проблема целевой аудитории
3. Решение (продукт/услуга)
4. Преимущества и выгоды
5. Социальные доказательства
6. Призыв к действию

Создай убедительный текст, который конвертирует посетителей в клиентов.',
'["service_name", "details", "additional_requirements", "keywords", "target_audience", "tone_style"]'::jsonb),

('email-campaigns', 'Email кампания', 
'Создай email для рассылки "{{service_name}}".

Техническое задание:
{{details}}

{{additional_requirements}}

Тип письма: {{email_type}}
Целевая аудитория: {{target_audience}}
Тон: {{tone_style}}

Требования:
- Цепляющая тема письма
- Персонализированное обращение
- Четкая структура
- Призыв к действию
- Соответствие CAN-SPAM

Создай эффективное email-письмо с высоким уровнем открытий и кликов.',
'["service_name", "details", "additional_requirements", "email_type", "target_audience", "tone_style"]'::jsonb),

('telegram-content', 'Telegram контент', 
'Создай контент для Telegram-канала "{{service_name}}".

Техническое задание:
{{details}}

{{additional_requirements}}

Тип контента: {{content_type}}
Целевая аудитория: {{target_audience}}
Тон: {{tone_style}}

Требования:
- Подходящий для мессенджера формат
- Эмодзи для повышения вовлеченности
- Призыв к действию
- Соответствие правилам Telegram

Создай вирусный контент, который увеличит подписки и вовлеченность.',
'["service_name", "details", "additional_requirements", "content_type", "target_audience", "tone_style"]'::jsonb)

ON CONFLICT (service_type) DO UPDATE SET
  prompt_template = EXCLUDED.prompt_template,
  variables = EXCLUDED.variables,
  updated_at = now();

-- Функция для анализа готовности заказа к обработке
CREATE OR REPLACE FUNCTION public.is_order_ready_for_processing(order_id uuid)
RETURNS boolean AS $$
DECLARE
  order_record RECORD;
BEGIN
  SELECT * INTO order_record FROM orders WHERE id = order_id;
  
  -- Проверяем обязательные поля
  IF order_record.service_slug IS NULL OR 
     order_record.details IS NULL OR 
     order_record.contact_email IS NULL THEN
    RETURN false;
  END IF;
  
  -- Проверяем статус
  IF order_record.status != 'pending' THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql;

-- Функция для повторной обработки заказа
CREATE OR REPLACE FUNCTION public.reprocess_order(order_id uuid)
RETURNS boolean AS $$
BEGIN
  -- Обновляем статус для повторной обработки
  UPDATE orders 
  SET status = 'pending', 
      generated_prompt = NULL,
      updated_at = now()
  WHERE id = order_id;
  
  -- Запускаем обработку
  PERFORM
    net.http_post(
      url := 'https://yotunjzgomkuuwpyftqr.supabase.co/functions/v1/process-order-workflow',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.supabase_service_role_key', true) || '"}'::jsonb,
      body := json_build_object('order_id', order_id)::jsonb
    );
    
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;