-- Fix RLS policy to allow anonymous orders
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;

-- Create a single, clear policy for order creation
CREATE POLICY "Allow order creation" ON public.orders
FOR INSERT
WITH CHECK (
  -- Allow if user is authenticated and matches user_id
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) 
  OR 
  -- Allow if user_id is NULL (anonymous orders)
  (user_id IS NULL)
  OR
  -- Allow if user is admin
  has_role(auth.uid(), 'admin'::app_role)
);