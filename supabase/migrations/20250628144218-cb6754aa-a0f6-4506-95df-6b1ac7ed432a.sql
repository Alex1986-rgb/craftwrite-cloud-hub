
-- Сначала удаляем существующие политики, которые могут конфликтовать
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Включаем RLS для таблицы orders (если еще не включен)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Политики для таблицы orders
DROP POLICY IF EXISTS "Users can view their own orders or admins can view all" ON public.orders;
CREATE POLICY "Users can view their own orders or admins can view all"
  ON public.orders
  FOR SELECT
  USING (
    user_id = auth.uid() OR 
    public.has_role(auth.uid(), 'admin'::app_role)
  );

DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
CREATE POLICY "Anyone can create orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Only admins can update orders" ON public.orders;
CREATE POLICY "Only admins can update orders"
  ON public.orders
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Включаем RLS для таблицы profiles (если еще не включен)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Политики для таблицы profiles
CREATE POLICY "Users can view their own profile or admins can view all"
  ON public.profiles
  FOR SELECT
  USING (
    id = auth.uid() OR 
    public.has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (id = auth.uid());

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (id = auth.uid());

-- Включаем RLS для таблицы notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
CREATE POLICY "Users can view their own notifications"
  ON public.notifications
  FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;
CREATE POLICY "System can create notifications"
  ON public.notifications
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;
CREATE POLICY "Users can update their own notifications"
  ON public.notifications
  FOR UPDATE
  USING (user_id = auth.uid());

-- Включаем RLS для таблицы payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own payments or admins can view all" ON public.payments;
CREATE POLICY "Users can view their own payments or admins can view all"
  ON public.payments
  FOR SELECT
  USING (
    user_id = auth.uid() OR 
    public.has_role(auth.uid(), 'admin'::app_role)
  );

DROP POLICY IF EXISTS "System can create payments" ON public.payments;
CREATE POLICY "System can create payments"
  ON public.payments
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Only admins can update payments" ON public.payments;
CREATE POLICY "Only admins can update payments"
  ON public.payments
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Включаем RLS для таблицы activity_logs
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Only admins can view activity logs" ON public.activity_logs;
CREATE POLICY "Only admins can view activity logs"
  ON public.activity_logs
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "System can create activity logs" ON public.activity_logs;
CREATE POLICY "System can create activity logs"
  ON public.activity_logs
  FOR INSERT
  WITH CHECK (true);

-- Включаем RLS для таблицы chat_rooms
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their chat rooms or admins can view all" ON public.chat_rooms;
CREATE POLICY "Users can view their chat rooms or admins can view all"
  ON public.chat_rooms
  FOR SELECT
  USING (
    client_id = auth.uid() OR 
    admin_id = auth.uid() OR
    public.has_role(auth.uid(), 'admin'::app_role)
  );

-- Включаем RLS для таблицы chat_messages
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view messages in their chat rooms" ON public.chat_messages;
CREATE POLICY "Users can view messages in their chat rooms"
  ON public.chat_messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_rooms 
      WHERE id = room_id 
      AND (client_id = auth.uid() OR admin_id = auth.uid() OR public.has_role(auth.uid(), 'admin'::app_role))
    )
  );

DROP POLICY IF EXISTS "Users can send messages in their chat rooms" ON public.chat_messages;
CREATE POLICY "Users can send messages in their chat rooms"
  ON public.chat_messages
  FOR INSERT
  WITH CHECK (
    sender_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.chat_rooms 
      WHERE id = room_id 
      AND (client_id = auth.uid() OR admin_id = auth.uid())
    )
  );
