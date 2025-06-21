
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import { toast } from 'sonner';

interface OrderData {
  service_slug: string;
  service_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  details: string;
  additional_requirements?: string;
  estimated_price?: number;
  deadline?: string;
  service_options?: Record<string, any>;
}

export function useSupabaseOrders() {
  const { user } = useUnifiedAuth();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  const createOrder = async (orderData: OrderData) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('orders')
        .insert({
          ...orderData,
          user_id: user?.id || null,
          estimated_price: orderData.estimated_price ? orderData.estimated_price * 100 : null, // конвертируем в копейки
        });

      if (error) throw error;

      toast.success('Заказ успешно создан!', {
        description: 'Мы свяжемся с вами в течение 1 рабочего дня'
      });

      return true;
    } catch (error: any) {
      console.error('Error creating order:', error);
      toast.error('Ошибка при создании заказа', {
        description: error.message || 'Попробуйте еще раз'
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fetchUserOrders = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast.error('Ошибка загрузки заказов');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserOrders();
    }
  }, [user]);

  return {
    createOrder,
    fetchUserOrders,
    orders,
    loading
  };
}
