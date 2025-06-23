
-- Создаем таблицу для Telegram интеграции
CREATE TABLE public.telegram_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  chat_id BIGINT NOT NULL,
  bot_token TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Создаем таблицу для настроек уведомлений
CREATE TABLE public.notification_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email_notifications BOOLEAN DEFAULT true,
  telegram_notifications BOOLEAN DEFAULT false,
  push_notifications BOOLEAN DEFAULT true,
  order_status_updates BOOLEAN DEFAULT true,
  payment_notifications BOOLEAN DEFAULT true,
  marketing_notifications BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Создаем таблицу для платежных интеграций
CREATE TABLE public.payment_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL CHECK (provider IN ('stripe', 'yukassa')),
  is_active BOOLEAN DEFAULT false,
  public_key TEXT,
  webhook_url TEXT,
  supported_currencies TEXT[] DEFAULT ARRAY['USD'],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Создаем таблицу для локализации
CREATE TABLE public.translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL,
  locale TEXT NOT NULL CHECK (locale IN ('ru', 'en')),
  value TEXT NOT NULL,
  namespace TEXT DEFAULT 'common',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(key, locale, namespace)
);

-- Включаем RLS для всех новых таблиц
ALTER TABLE public.telegram_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;

-- RLS политики для telegram_integrations
CREATE POLICY "Users can manage their own telegram integrations"
  ON public.telegram_integrations
  FOR ALL
  USING (auth.uid() = user_id);

-- RLS политики для notification_settings
CREATE POLICY "Users can manage their own notification settings"
  ON public.notification_settings
  FOR ALL
  USING (auth.uid() = user_id);

-- RLS политики для payment_integrations (только админы)
CREATE POLICY "Only admins can manage payment integrations"
  ON public.payment_integrations
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- RLS политики для translations (чтение для всех)
CREATE POLICY "Everyone can read translations"
  ON public.translations
  FOR SELECT
  USING (true);

-- RLS политики для translations (изменение для админов - INSERT)
CREATE POLICY "Only admins can insert translations"
  ON public.translations
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- RLS политики для translations (изменение для админов - UPDATE)
CREATE POLICY "Only admins can update translations"
  ON public.translations
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- RLS политики для translations (изменение для админов - DELETE)
CREATE POLICY "Only admins can delete translations"
  ON public.translations
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Добавляем базовые переводы
INSERT INTO public.translations (key, locale, value, namespace) VALUES
-- Навигация
('nav.home', 'ru', 'Главная', 'common'),
('nav.home', 'en', 'Home', 'common'),
('nav.services', 'ru', 'Услуги', 'common'),
('nav.services', 'en', 'Services', 'common'),
('nav.prices', 'ru', 'Цены', 'common'),
('nav.prices', 'en', 'Prices', 'common'),
('nav.portfolio', 'ru', 'Портфолио', 'common'),
('nav.portfolio', 'en', 'Portfolio', 'common'),
('nav.blog', 'ru', 'Блог', 'common'),
('nav.blog', 'en', 'Blog', 'common'),
('nav.about', 'ru', 'О нас', 'common'),
('nav.about', 'en', 'About', 'common'),

-- Кнопки
('button.order', 'ru', 'Заказать', 'common'),
('button.order', 'en', 'Order', 'common'),
('button.login', 'ru', 'Войти', 'common'),
('button.login', 'en', 'Login', 'common'),
('button.register', 'ru', 'Регистрация', 'common'),
('button.register', 'en', 'Register', 'common'),
('button.save', 'ru', 'Сохранить', 'common'),
('button.save', 'en', 'Save', 'common'),
('button.cancel', 'ru', 'Отменить', 'common'),
('button.cancel', 'en', 'Cancel', 'common'),

-- Уведомления
('notification.orderCreated', 'ru', 'Заказ создан успешно', 'notifications'),
('notification.orderCreated', 'en', 'Order created successfully', 'notifications'),
('notification.paymentSuccess', 'ru', 'Платеж прошел успешно', 'notifications'),
('notification.paymentSuccess', 'en', 'Payment successful', 'notifications');

-- Функция для создания настроек уведомлений при регистрации
CREATE OR REPLACE FUNCTION public.create_notification_settings()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notification_settings (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Триггер для автоматического создания настроек уведомлений
CREATE TRIGGER create_notification_settings_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.create_notification_settings();
