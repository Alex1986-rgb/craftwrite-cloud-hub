-- Добавляем базовые промпт-шаблоны для автоматической обработки
INSERT INTO public.prompt_templates (service_type, template_name, prompt_template, variables) VALUES
('seo-article', 'Базовый шаблон SEO-статьи', 
'Создай SEO-оптимизированную статью на тему "{{service_name}}".

Техническое задание:
{{details}}

Дополнительные требования:
{{additional_requirements}}

Ключевые слова: {{keywords}}

Требования к статье:
- Объем: 2000-3000 символов
- SEO-оптимизация
- Уникальность 95%+
- Естественное вхождение ключевых слов
- Структурированный текст с подзаголовками
- Призыв к действию в конце

Создай профессиональную статью, которая будет полезна читателям и хорошо ранжироваться в поисковых системах.',
'["service_name", "details", "additional_requirements", "keywords"]'::jsonb),

('telegram-content', 'Шаблон контента для Telegram', 
'Создай серию постов для Telegram-канала на тему "{{service_name}}".

Техническое задание:
{{details}}

Дополнительные требования:
{{additional_requirements}}

Целевая аудитория: {{target_audience}}

Требования к контенту:
- 5-7 постов
- Каждый пост 200-300 символов
- Использование emoji
- Вовлекающий стиль
- Призывы к действию
- Хештеги для каждого поста

Создай качественный контент для Telegram, который будет генерировать высокую вовлеченность.',
'["service_name", "details", "additional_requirements", "target_audience"]'::jsonb),

('landing-page', 'Шаблон лендинга', 
'Создай продающий текст для лендинга "{{service_name}}".

Техническое задание:
{{details}}

Целевая аудитория: {{target_audience}}
Дополнительные требования: {{additional_requirements}}

Структура лендинга:
1. Заголовок (цепляющий)
2. Подзаголовок (польза)
3. Проблема клиента
4. Решение проблемы
5. Преимущества (3-5 пунктов)
6. Социальные доказательства
7. Призыв к действию

Создай конверсионный текст, который превращает посетителей в клиентов.',
'["service_name", "details", "target_audience", "additional_requirements"]'::jsonb),

('email-campaign', 'Шаблон email-кампании', 
'Создай email-кампанию на тему "{{service_name}}".

Техническое задание:
{{details}}

Дополнительные требования:
{{additional_requirements}}

Целевая аудитория: {{target_audience}}

Создай серию из 3-5 писем:
1. Приветственное письмо
2. Письмо с пользой/контентом
3. Продающее письмо
4. Письмо с возражениями
5. Финальное предложение

Каждое письмо должно быть персонализированным, с четким призывом к действию и высокой конверсией.',
'["service_name", "details", "additional_requirements", "target_audience"]'::jsonb)

ON CONFLICT (service_type, template_name) DO UPDATE SET
  prompt_template = EXCLUDED.prompt_template,
  variables = EXCLUDED.variables,
  updated_at = now();