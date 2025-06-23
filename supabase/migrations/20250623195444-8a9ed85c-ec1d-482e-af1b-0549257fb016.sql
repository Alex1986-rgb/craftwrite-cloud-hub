
-- Обновляем таблицу orders для более детального хранения информации о заказах
ALTER TABLE IF EXISTS orders 
ADD COLUMN IF NOT EXISTS technical_specification JSONB,
ADD COLUMN IF NOT EXISTS generated_prompt TEXT,
ADD COLUMN IF NOT EXISTS telegram_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS estimated_completion_time INTERVAL;

-- Создаем таблицу для хранения Telegram chat_id администраторов
CREATE TABLE IF NOT EXISTS admin_telegram_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  chat_id BIGINT NOT NULL,
  username TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включаем RLS для admin_telegram_settings
ALTER TABLE admin_telegram_settings ENABLE ROW LEVEL SECURITY;

-- Политики для admin_telegram_settings
CREATE POLICY "Admins can manage telegram settings" ON admin_telegram_settings
  FOR ALL USING (auth.uid() IN (
    SELECT user_id FROM user_roles WHERE role = 'admin'
  ));

-- Создаем таблицу для промт-шаблонов
CREATE TABLE IF NOT EXISTS prompt_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type TEXT NOT NULL,
  template_name TEXT NOT NULL,
  prompt_template TEXT NOT NULL,
  variables JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включаем RLS для prompt_templates
ALTER TABLE prompt_templates ENABLE ROW LEVEL SECURITY;

-- Политики для prompt_templates
CREATE POLICY "Everyone can read active prompt templates" ON prompt_templates
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage prompt templates" ON prompt_templates
  FOR ALL USING (auth.uid() IN (
    SELECT user_id FROM user_roles WHERE role = 'admin'
  ));

-- Вставляем базовые шаблоны промптов
INSERT INTO prompt_templates (service_type, template_name, prompt_template, variables) VALUES
('seo-article', 'SEO статья', 'Создай SEO-оптимизированную статью на тему: {{topic}}

Требования:
- Объем: {{character_count}} символов
- Ключевые слова: {{keywords}}
- Целевая аудитория: {{target_audience}}
- Стиль: {{style}}
- Структура: {{content_structure}}

Дополнительные требования:
{{additional_requirements}}

Техническое задание от клиента:
{{client_details}}', 
'["topic", "character_count", "keywords", "target_audience", "style", "content_structure", "additional_requirements", "client_details"]'),

('landing', 'Лендинг', 'Создай продающий текст для лендинга:

Услуга/Продукт: {{service_name}}
Целевая аудитория: {{target_audience}}
Ключевые преимущества: {{benefits}}
Призыв к действию: {{call_to_action}}
Стиль: {{style}}

Структура лендинга:
{{landing_structure}}

Требования клиента:
{{client_details}}

Дополнительно:
{{additional_requirements}}',
'["service_name", "target_audience", "benefits", "call_to_action", "style", "landing_structure", "client_details", "additional_requirements"]'),

('email', 'Email рассылка', 'Создай текст для email-рассылки:

Тип рассылки: {{email_type}}
Тема письма: {{subject}}
Целевая аудитория: {{target_audience}}
Цель рассылки: {{goal}}
Тон: {{tone}}

Структура:
{{email_structure}}

Техзадание:
{{client_details}}

Дополнительные требования:
{{additional_requirements}}',
'["email_type", "subject", "target_audience", "goal", "tone", "email_structure", "client_details", "additional_requirements"]'),

('social', 'SMM контент', 'Создай контент для социальных сетей:

Платформа: {{platform}}
Тип контента: {{content_type}}
Тематика: {{topic}}
Целевая аудитория: {{target_audience}}
Стиль: {{style}}
Количество постов: {{posts_count}}

Требования:
{{client_details}}

Дополнительно:
{{additional_requirements}}',
'["platform", "content_type", "topic", "target_audience", "style", "posts_count", "client_details", "additional_requirements"]');

-- Создаем функцию для генерации промпта
CREATE OR REPLACE FUNCTION generate_order_prompt(order_data JSONB)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  template_record RECORD;
  generated_prompt TEXT;
  var_name TEXT;
BEGIN
  -- Получаем шаблон для типа услуги
  SELECT * INTO template_record 
  FROM prompt_templates 
  WHERE service_type = (order_data->>'service')::TEXT 
    AND is_active = true 
  LIMIT 1;
  
  IF template_record IS NULL THEN
    RETURN 'Шаблон промпта не найден для услуги: ' || (order_data->>'service')::TEXT;
  END IF;
  
  generated_prompt := template_record.prompt_template;
  
  -- Заменяем переменные в шаблоне
  FOR var_name IN SELECT jsonb_array_elements_text(template_record.variables)
  LOOP
    generated_prompt := REPLACE(
      generated_prompt, 
      '{{' || var_name || '}}', 
      COALESCE((order_data->>var_name)::TEXT, '[Не указано]')
    );
  END LOOP;
  
  RETURN generated_prompt;
END;
$$;
