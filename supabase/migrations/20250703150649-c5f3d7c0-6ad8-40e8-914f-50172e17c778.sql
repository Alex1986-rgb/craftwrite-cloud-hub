-- Add missing columns to payments table
ALTER TABLE public.payments 
ADD COLUMN IF NOT EXISTS modulbank_payment_id TEXT,
ADD COLUMN IF NOT EXISTS payment_url TEXT,
ADD COLUMN IF NOT EXISTS callback_data JSONB;

-- Insert ModulBank integration
INSERT INTO public.payment_integrations (provider, public_key, is_active, supported_currencies, webhook_url)
VALUES (
  'modulbank',
  'merchant_placeholder',
  false,
  ARRAY['RUB'],
  'https://yotunjzgomkuuwpyftqr.supabase.co/functions/v1/modulbank-callback'
) ON CONFLICT (provider) DO UPDATE SET
  supported_currencies = EXCLUDED.supported_currencies,
  webhook_url = EXCLUDED.webhook_url;

-- Insert YooKassa integration  
INSERT INTO public.payment_integrations (provider, public_key, is_active, supported_currencies, webhook_url)
VALUES (
  'yookassa',
  'shop_id_placeholder', 
  false,
  ARRAY['RUB'],
  'https://yotunjzgomkuuwpyftqr.supabase.co/functions/v1/yukassa-payment'
) ON CONFLICT (provider) DO UPDATE SET
  supported_currencies = EXCLUDED.supported_currencies,
  webhook_url = EXCLUDED.webhook_url;

-- Create system_settings table if not exists
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
CREATE POLICY "Only admins can manage system settings" 
ON public.system_settings 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert ModulBank system settings
INSERT INTO public.system_settings (key, value, description) VALUES
  ('modulbank_merchant_id', '"merchant_placeholder"', 'ModulBank Merchant ID'),
  ('modulbank_secret_key', '"secret_placeholder"', 'ModulBank Secret Key'),
  ('modulbank_test_mode', 'true', 'ModulBank Test Mode Flag'),
  ('modulbank_active', 'false', 'ModulBank Integration Active Status')
ON CONFLICT (key) DO NOTHING;

-- Insert YooKassa system settings
INSERT INTO public.system_settings (key, value, description) VALUES
  ('yookassa_shop_id', '"shop_placeholder"', 'YooKassa Shop ID'),
  ('yookassa_secret_key', '"secret_placeholder"', 'YooKassa Secret Key'),
  ('yookassa_test_mode', 'true', 'YooKassa Test Mode Flag'),
  ('yookassa_active', 'false', 'YooKassa Integration Active Status')
ON CONFLICT (key) DO NOTHING;

-- Insert general payment settings
INSERT INTO public.system_settings (key, value, description) VALUES
  ('payment_system_active', 'true', 'Payment System General Status'),
  ('default_payment_gateway', '"modulbank"', 'Default Payment Gateway'),
  ('payment_receipt_enabled', 'true', 'Enable Payment Receipts'),
  ('supabase_service_role_key', '"placeholder"', 'Supabase Service Role Key for Edge Functions')
ON CONFLICT (key) DO NOTHING;

-- Add trigger for updating updated_at in system_settings
CREATE OR REPLACE FUNCTION public.update_system_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_system_settings_updated_at
  BEFORE UPDATE ON public.system_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_system_settings_updated_at();

-- Update RLS policies for payments table to handle new columns
CREATE POLICY "System can update payment details" 
ON public.payments 
FOR UPDATE 
USING (true);

-- Add trigger to update promo code usage when payment is completed
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

DROP TRIGGER IF EXISTS trigger_update_promo_code_usage ON public.payments;
CREATE TRIGGER trigger_update_promo_code_usage
  AFTER UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_promo_code_usage();