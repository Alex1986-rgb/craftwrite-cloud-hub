-- Update the service role key setting and reprocess stuck orders
UPDATE public.system_settings 
SET value = '"PLACEHOLDER_FOR_MANUAL_UPDATE"', 
    description = 'Supabase Service Role Key for Edge Function calls - needs manual configuration via admin panel'
WHERE key = 'supabase_service_role_key';

-- Reprocess all pending orders by triggering them again
UPDATE public.orders 
SET status = 'pending', 
    updated_at = now(),
    notes = COALESCE(notes || ' | ', '') || 'Reprocessed after system fix'
WHERE status = 'pending' 
AND id IN (
  SELECT id FROM public.orders 
  WHERE status = 'pending' 
  ORDER BY created_at ASC 
  LIMIT 10
);