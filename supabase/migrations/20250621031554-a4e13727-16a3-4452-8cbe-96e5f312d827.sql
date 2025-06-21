
-- Создаем таблицу профилей пользователей
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  company TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Создаем таблицу заказов
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  service_slug TEXT NOT NULL,
  service_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  details TEXT NOT NULL,
  additional_requirements TEXT,
  estimated_price INTEGER, -- в копейках
  final_price INTEGER, -- в копейках
  deadline DATE,
  service_options JSONB DEFAULT '{}',
  files_urls TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Создаем таблицу примеров работ
CREATE TABLE public.portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  before_text TEXT,
  after_text TEXT,
  image_url TEXT,
  metrics JSONB DEFAULT '{}', -- для хранения метрик (конверсия, просмотры и т.д.)
  tags TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Создаем таблицу отзывов
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_company TEXT,
  client_avatar_url TEXT,
  service_slug TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  project_details TEXT,
  results_achieved TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Включаем RLS для всех таблиц
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Политики для профилей
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Политики для заказов
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create orders" ON public.orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own orders" ON public.orders
  FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

-- Политики для портфолио (публичный доступ для чтения)
CREATE POLICY "Anyone can view portfolio" ON public.portfolio_items
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage portfolio" ON public.portfolio_items
  FOR ALL USING (true);

-- Политики для отзывов (публичный доступ для чтения)
CREATE POLICY "Anyone can view testimonials" ON public.testimonials
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage testimonials" ON public.testimonials
  FOR ALL USING (true);

-- Создаем функцию для автоматического создания профиля
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
END;
$$;

-- Создаем триггер для автоматического создания профиля при регистрации
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Добавляем индексы для производительности
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_service_slug ON public.orders(service_slug);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_portfolio_service_slug ON public.portfolio_items(service_slug);
CREATE INDEX idx_testimonials_service_slug ON public.testimonials(service_slug);
