-- Add missing columns to payments table
ALTER TABLE public.payments 
ADD COLUMN IF NOT EXISTS modulbank_payment_id TEXT,
ADD COLUMN IF NOT EXISTS payment_url TEXT,
ADD COLUMN IF NOT EXISTS callback_data JSONB;

-- Create system_settings table if not exists (with proper constraints)
CREATE TABLE IF NOT EXISTS public.system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL DEFAULT '{}',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on system_settings
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for system_settings
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'system_settings' 
    AND policyname = 'Only admins can manage system settings'
  ) THEN
    CREATE POLICY "Only admins can manage system settings" 
    ON public.system_settings 
    FOR ALL 
    USING (has_role(auth.uid(), 'admin'::app_role));
  END IF;
END $$;

-- Insert ModulBank system settings
INSERT INTO public.system_settings (key, value, description) 
SELECT 'modulbank_merchant_id', '"merchant_placeholder"', 'ModulBank Merchant ID'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE key = 'modulbank_merchant_id');

INSERT INTO public.system_settings (key, value, description) 
SELECT 'modulbank_secret_key', '"secret_placeholder"', 'ModulBank Secret Key'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE key = 'modulbank_secret_key');

INSERT INTO public.system_settings (key, value, description) 
SELECT 'modulbank_test_mode', 'true', 'ModulBank Test Mode Flag'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE key = 'modulbank_test_mode');

INSERT INTO public.system_settings (key, value, description) 
SELECT 'modulbank_active', 'false', 'ModulBank Integration Active Status'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE key = 'modulbank_active');

-- Insert YooKassa system settings
INSERT INTO public.system_settings (key, value, description) 
SELECT 'yookassa_shop_id', '"shop_placeholder"', 'YooKassa Shop ID'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE key = 'yookassa_shop_id');

INSERT INTO public.system_settings (key, value, description) 
SELECT 'yookassa_secret_key', '"secret_placeholder"', 'YooKassa Secret Key'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE key = 'yookassa_secret_key');

INSERT INTO public.system_settings (key, value, description) 
SELECT 'yookassa_test_mode', 'true', 'YooKassa Test Mode Flag'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE key = 'yookassa_test_mode');

INSERT INTO public.system_settings (key, value, description) 
SELECT 'yookassa_active', 'false', 'YooKassa Integration Active Status'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE key = 'yookassa_active');

-- Insert general payment settings
INSERT INTO public.system_settings (key, value, description) 
SELECT 'payment_system_active', 'true', 'Payment System General Status'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE key = 'payment_system_active');

INSERT INTO public.system_settings (key, value, description) 
SELECT 'default_payment_gateway', '"modulbank"', 'Default Payment Gateway'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE key = 'default_payment_gateway');

INSERT INTO public.system_settings (key, value, description) 
SELECT 'payment_receipt_enabled', 'true', 'Enable Payment Receipts'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE key = 'payment_receipt_enabled');

INSERT INTO public.system_settings (key, value, description) 
SELECT 'supabase_service_role_key', '"placeholder"', 'Supabase Service Role Key for Edge Functions'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE key = 'supabase_service_role_key');

-- Add trigger for updating updated_at in system_settings
CREATE OR REPLACE FUNCTION public.update_system_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_system_settings_updated_at ON public.system_settings;
CREATE TRIGGER update_system_settings_updated_at
  BEFORE UPDATE ON public.system_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_system_settings_updated_at();

-- Create RLS policy for system can update payment details
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'payments' 
    AND policyname = 'System can update payment details'
  ) THEN
    CREATE POLICY "System can update payment details" 
    ON public.payments 
    FOR UPDATE 
    USING (true);
  END IF;
END $$;