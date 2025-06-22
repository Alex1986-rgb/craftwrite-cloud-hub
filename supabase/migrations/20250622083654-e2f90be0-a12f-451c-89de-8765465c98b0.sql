
-- Drop existing policies and recreate them properly
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can update own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Anyone can view portfolio" ON public.portfolio_items;
DROP POLICY IF EXISTS "Anyone can view testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admin can manage portfolio" ON public.portfolio_items;
DROP POLICY IF EXISTS "Admin can manage testimonials" ON public.testimonials;

-- Create user roles table for proper role management
CREATE TYPE public.app_role AS ENUM ('admin', 'client', 'guest');

CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'client',
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check user roles
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT role FROM public.user_roles WHERE user_roles.user_id = $1 LIMIT 1;
$$;

-- Function to check if user has specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- Orders policies
CREATE POLICY "Users can view their own orders" ON public.orders
FOR SELECT USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create orders" ON public.orders
FOR INSERT WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can update their own orders" ON public.orders
FOR UPDATE USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
FOR SELECT USING (id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can update their own profile" ON public.profiles
FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Users can insert their own profile" ON public.profiles
FOR INSERT WITH CHECK (id = auth.uid());

-- Portfolio items policies (public read access)
CREATE POLICY "Anyone can view portfolio items" ON public.portfolio_items
FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can manage portfolio items" ON public.portfolio_items
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Testimonials policies (public read access)
CREATE POLICY "Anyone can view testimonials" ON public.testimonials
FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can manage testimonials" ON public.testimonials
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- User roles policies
CREATE POLICY "Users can view their own role" ON public.user_roles
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles" ON public.user_roles
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Trigger to automatically create client role for new users
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'client');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();
