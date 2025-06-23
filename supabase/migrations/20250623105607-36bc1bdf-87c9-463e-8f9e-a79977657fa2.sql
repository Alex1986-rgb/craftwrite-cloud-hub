
-- Улучшение структуры базы данных и RLS политик

-- 1. Добавляем недостающие столбцы в таблицу orders
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS assigned_admin_id UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ;

-- 2. Создаем таблицу для системных настроек
CREATE TABLE IF NOT EXISTS public.system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Создаем таблицу для уведомлений
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Создаем таблицу для файлов
CREATE TABLE IF NOT EXISTS public.project_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Создаем таблицу для логов активности
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Обновляем RLS политики для orders
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON public.orders;

CREATE POLICY "Users can view own orders" ON public.orders
FOR SELECT USING (
  user_id = auth.uid() OR 
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Users can create orders" ON public.orders
FOR INSERT WITH CHECK (
  user_id = auth.uid() OR 
  user_id IS NULL OR
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update all orders" ON public.orders
FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can update own orders" ON public.orders
FOR UPDATE USING (
  user_id = auth.uid() AND 
  status IN ('pending', 'in_progress')
);

-- 7. RLS для новых таблиц
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Политики для настроек (только админы)
CREATE POLICY "Only admins can manage settings" ON public.system_settings
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Политики для уведомлений
CREATE POLICY "Users can view own notifications" ON public.notifications
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can create notifications" ON public.notifications
FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can update own notifications" ON public.notifications
FOR UPDATE USING (user_id = auth.uid());

-- Политики для файлов
CREATE POLICY "Users can view project files" ON public.project_files
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = project_files.order_id 
    AND (orders.user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
  )
);

CREATE POLICY "Users can upload files to own orders" ON public.project_files
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = project_files.order_id 
    AND (orders.user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
  )
);

-- Политики для логов (только админы)
CREATE POLICY "Only admins can view logs" ON public.activity_logs
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- 8. Создаем функцию для логирования активности
CREATE OR REPLACE FUNCTION public.log_activity(
  p_action TEXT,
  p_entity_type TEXT DEFAULT NULL,
  p_entity_id UUID DEFAULT NULL,
  p_details JSONB DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
  INSERT INTO public.activity_logs (
    user_id, action, entity_type, entity_id, details
  ) VALUES (
    auth.uid(), p_action, p_entity_type, p_entity_id, p_details
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Создаем функцию для отправки уведомлений
CREATE OR REPLACE FUNCTION public.create_notification(
  p_user_id UUID,
  p_title TEXT,
  p_message TEXT,
  p_type TEXT DEFAULT 'info'
) RETURNS UUID AS $$
DECLARE
  notification_id UUID;
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type)
  VALUES (p_user_id, p_title, p_message, p_type)
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Добавляем триггер для логирования изменений заказов
CREATE OR REPLACE FUNCTION public.log_order_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM public.log_activity(
      'order_created',
      'order',
      NEW.id,
      jsonb_build_object('service', NEW.service_name, 'status', NEW.status)
    );
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status != NEW.status THEN
      PERFORM public.log_activity(
        'order_status_changed',
        'order',
        NEW.id,
        jsonb_build_object('old_status', OLD.status, 'new_status', NEW.status)
      );
    END IF;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER order_changes_log
  AFTER INSERT OR UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.log_order_changes();

-- 11. Добавляем индексы для производительности
CREATE INDEX IF NOT EXISTS idx_orders_status_priority ON public.orders(status, priority);
CREATE INDEX IF NOT EXISTS idx_orders_assigned_admin ON public.orders(assigned_admin_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON public.notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_action ON public.activity_logs(user_id, action);
CREATE INDEX IF NOT EXISTS idx_project_files_order ON public.project_files(order_id);
