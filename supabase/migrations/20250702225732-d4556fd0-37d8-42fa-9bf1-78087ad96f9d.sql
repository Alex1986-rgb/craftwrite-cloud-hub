-- Создаем таблицу шаблонов уведомлений
CREATE TABLE IF NOT EXISTS public.notification_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'email', -- 'email' или 'telegram'
  event_type TEXT NOT NULL, -- 'order_created', 'order_status_changed', etc.
  subject_template TEXT,
  content_template TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Включаем RLS для notification_templates
ALTER TABLE public.notification_templates ENABLE ROW LEVEL SECURITY;

-- Создаем политики RLS
CREATE POLICY "Admins can manage notification templates" ON public.notification_templates
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Everyone can view active templates" ON public.notification_templates
FOR SELECT USING (is_active = true);

-- Добавляем базовые шаблоны уведомлений
INSERT INTO public.notification_templates (type, event_type, subject_template, content_template) VALUES
-- Email шаблоны
('email', 'order_created', 'Заказ №{{order_id}} создан', 
'<h2>Спасибо за ваш заказ!</h2>
<p>Уважаемый {{client_name}}, ваш заказ успешно создан и принят в работу.</p>
<p><strong>Детали заказа:</strong></p>
<ul>
  <li>Услуга: {{service_name}}</li>
  <li>Стоимость: {{price}} руб.</li>
  <li>Срок выполнения: {{deadline}}</li>
</ul>
<p>Мы приступим к выполнению вашего заказа в ближайшее время и будем держать вас в курсе прогресса.</p>'),

('email', 'order_status_changed', 'Статус заказа №{{order_id}} изменен', 
'<h2>Обновление по вашему заказу</h2>
<p>Уважаемый {{client_name}}, статус вашего заказа изменился:</p>
<div class="status {{status_class}}">
  <p><strong>Новый статус:</strong> {{new_status}}</p>
</div>
<p>{{status_message}}</p>'),

('email', 'order_completed', 'Заказ №{{order_id}} выполнен', 
'<h2>Ваш заказ готов!</h2>
<p>Уважаемый {{client_name}}, ваш заказ успешно выполнен.</p>
<p>Результат работы доступен в вашем личном кабинете. Мы будем рады получить вашу обратную связь!</p>'),

-- Telegram шаблоны
('telegram', 'order_created', '', 
'🎉 <b>Новый заказ создан!</b>

📋 Заказ: {{service_name}}
💰 Стоимость: {{price}} руб.
📅 Срок: {{deadline}}

Мы приступаем к выполнению вашего заказа!'),

('telegram', 'order_status_changed', '', 
'📝 <b>Обновление заказа №{{order_id}}</b>

🔄 Статус: {{new_status}}
📋 {{status_message}}'),

('telegram', 'order_completed', '', 
'✅ <b>Заказ №{{order_id}} выполнен!</b>

🎯 Результат готов и доступен в личном кабинете.
Спасибо за доверие!');

-- Обновляем настройки системы для уведомлений
INSERT INTO public.system_settings (key, value, description) VALUES
  ('notification_system_enabled', 'true', 'Включить систему уведомлений'),
  ('email_from_address', '"CopyPro Cloud <noreply@copypro.cloud>"', 'Адрес отправителя email'),
  ('telegram_webhook_enabled', 'false', 'Включить Telegram webhook')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();