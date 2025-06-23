
-- Улучшение структуры базы данных для модернизированной системы

-- Создание таблицы для чатов между клиентами и менеджерами
CREATE TABLE IF NOT EXISTS public.chat_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы для сообщений в чате
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'system')),
  file_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы для файлов заказов (расширенная версия project_files)
ALTER TABLE public.project_files 
ADD COLUMN IF NOT EXISTS file_type TEXT DEFAULT 'document',
ADD COLUMN IF NOT EXISTS processing_status TEXT DEFAULT 'pending' CHECK (processing_status IN ('pending', 'processed', 'failed')),
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';

-- Создание таблицы для версий сгенерированных текстов
CREATE TABLE IF NOT EXISTS public.generated_content_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL DEFAULT 1,
  content TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('seo-article', 'landing', 'email', 'social')),
  prompt_used TEXT,
  ai_model TEXT DEFAULT 'gpt-4.1-2025-04-14',
  quality_score INTEGER CHECK (quality_score >= 0 AND quality_score <= 100),
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы для системы скидок и промокодов
CREATE TABLE IF NOT EXISTS public.promo_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value INTEGER NOT NULL,
  min_order_amount INTEGER DEFAULT 0,
  max_uses INTEGER,
  used_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы для платежей
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL, -- в копейках
  currency TEXT DEFAULT 'RUB',
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
  payment_gateway TEXT DEFAULT 'yookassa',
  gateway_payment_id TEXT,
  promo_code_id UUID REFERENCES public.promo_codes(id),
  discount_amount INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Создание таблицы для аудита действий
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы для системных настроек (расширение существующей)
INSERT INTO public.system_settings (key, value, description) VALUES
('ai_generation_enabled', 'true', 'Включить AI генерацию текстов'),
('telegram_notifications_enabled', 'true', 'Включить Telegram уведомления'),
('payment_gateway', '"yookassa"', 'Платежный шлюз по умолчанию'),
('default_ai_model', '"gpt-4.1-2025-04-14"', 'AI модель по умолчанию'),
('max_order_files', '10', 'Максимальное количество файлов на заказ')
ON CONFLICT (key) DO NOTHING;

-- Улучшение таблицы заказов
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
ADD COLUMN IF NOT EXISTS assigned_manager_id UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS quality_rating INTEGER CHECK (quality_rating >= 1 AND quality_rating <= 5),
ADD COLUMN IF NOT EXISTS client_feedback TEXT,
ADD COLUMN IF NOT EXISTS revision_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Включение Row Level Security
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_content_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Политики RLS для чатов
CREATE POLICY "Users can view their own chat rooms" ON public.chat_rooms
  FOR SELECT USING (
    client_id = auth.uid() OR 
    admin_id = auth.uid() OR
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Users can create chat rooms for their orders" ON public.chat_rooms
  FOR INSERT WITH CHECK (
    client_id = auth.uid() OR 
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Users can view messages in their chat rooms" ON public.chat_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.chat_rooms cr 
      WHERE cr.id = room_id AND (
        cr.client_id = auth.uid() OR 
        cr.admin_id = auth.uid() OR
        public.has_role(auth.uid(), 'admin')
      )
    )
  );

CREATE POLICY "Users can send messages in their chat rooms" ON public.chat_messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.chat_rooms cr 
      WHERE cr.id = room_id AND (
        cr.client_id = auth.uid() OR 
        cr.admin_id = auth.uid() OR
        public.has_role(auth.uid(), 'admin')
      )
    )
  );

-- Политики для версий контента
CREATE POLICY "Users can view content versions for their orders" ON public.generated_content_versions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders o 
      WHERE o.id = order_id AND (
        o.user_id = auth.uid() OR 
        public.has_role(auth.uid(), 'admin')
      )
    )
  );

CREATE POLICY "Admins can manage content versions" ON public.generated_content_versions
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Политики для платежей
CREATE POLICY "Users can view their own payments" ON public.payments
  FOR SELECT USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create payments for their orders" ON public.payments
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Политики для промокодов
CREATE POLICY "Everyone can view active promo codes" ON public.promo_codes
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage promo codes" ON public.promo_codes
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Включение realtime для чатов
ALTER TABLE public.chat_rooms REPLICA IDENTITY FULL;
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;
ALTER TABLE public.orders REPLICA IDENTITY FULL;

-- Добавление таблиц в realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;

-- Создание функций для автоматического обновления статистики
CREATE OR REPLACE FUNCTION public.update_order_activity()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.orders 
  SET last_activity_at = NOW() 
  WHERE id = NEW.order_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггер для обновления активности заказа при новых сообщениях
CREATE TRIGGER update_order_activity_trigger
  AFTER INSERT ON public.chat_messages
  FOR EACH ROW EXECUTE FUNCTION public.update_order_activity();

-- Функция для автоматического создания чата при создании заказа
CREATE OR REPLACE FUNCTION public.create_order_chat_room()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.chat_rooms (order_id, client_id)
  VALUES (NEW.id, NEW.user_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггер для создания чата
CREATE TRIGGER create_order_chat_trigger
  AFTER INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.create_order_chat_room();

-- Функция для обновления статистики промокодов
CREATE OR REPLACE FUNCTION public.update_promo_code_usage()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.payment_status = 'completed' AND OLD.payment_status != 'completed' AND NEW.promo_code_id IS NOT NULL THEN
    UPDATE public.promo_codes 
    SET used_count = used_count + 1 
    WHERE id = NEW.promo_code_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггер для статистики промокодов
CREATE TRIGGER update_promo_usage_trigger
  AFTER UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.update_promo_code_usage();
