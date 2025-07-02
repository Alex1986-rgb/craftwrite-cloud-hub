-- Fix RLS policies for anonymous orders - split into separate policies

-- Remove the complex policy that's causing issues
DROP POLICY IF EXISTS "Allow order creation" ON public.orders;

-- Create three separate, simple policies for clarity

-- 1. Policy for authenticated users creating their own orders
CREATE POLICY "Authenticated users can create orders" ON public.orders
FOR INSERT
WITH CHECK (
  auth.uid() IS NOT NULL AND user_id = auth.uid()
);

-- 2. Policy for anonymous orders (guest checkout)
CREATE POLICY "Anonymous users can create orders" ON public.orders
FOR INSERT
WITH CHECK (
  auth.uid() IS NULL AND user_id IS NULL
);

-- 3. Policy for admins to create any orders
CREATE POLICY "Admins can create any orders" ON public.orders
FOR INSERT
WITH CHECK (
  auth.uid() IS NOT NULL AND 
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role = 'admin'::app_role
  )
);