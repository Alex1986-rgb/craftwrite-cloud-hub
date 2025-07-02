-- Create system_settings table for storing configuration
CREATE TABLE IF NOT EXISTS public.system_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access only
CREATE POLICY "Only admins can manage system settings" 
ON public.system_settings 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Insert default analytics settings
INSERT INTO public.system_settings (key, value, description) VALUES
('google_analytics_enabled', 'false', 'Enable Google Analytics tracking'),
('google_analytics_id', '""', 'Google Analytics tracking ID'),
('yandex_metrika_enabled', 'false', 'Enable Yandex Metrika tracking'),
('yandex_metrika_id', '""', 'Yandex Metrika counter ID'),
('email_notifications_enabled', '{"enabled": false}', 'Email notifications configuration'),
('telegram_notifications_enabled', 'false', 'Telegram notifications enabled'),
('production_mode', 'false', 'Production mode status'),
('launch_status', '"preparing"', 'System launch status: preparing, testing, ready, launched')
ON CONFLICT (key) DO NOTHING;

-- Create trigger for updated_at
CREATE TRIGGER update_system_settings_updated_at
BEFORE UPDATE ON public.system_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();