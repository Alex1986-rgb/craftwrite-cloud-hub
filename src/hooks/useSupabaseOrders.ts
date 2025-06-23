
import React, { useState, useEffect } from 'react';
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
  const { user, isAuthenticated } = useUnifiedAuth();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  const createOrder = async (orderData: OrderData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          ...orderData,
          user_id: user?.id || null,
          estimated_price: orderData.estimated_price ? Math.round(orderData.estimated_price * 100) : null,
        })
        .select()
        .single();

      if (error) throw error;

      // Создаем уведомление для пользователя
      if (user) {
        await supabase.rpc('create_notification', {
          p_user_id: user.id,
          p_title: 'Заказ создан',
          p_message: `Ваш заказ "${orderData.service_name}" успешно создан и принят в работу.`,
          p_type: 'success'
        });
      }

      toast.success('Заказ успешно создан!', {
        description: 'Мы свяжемся с вами в течение 1 рабочего дня'
      });

      if (isAuthenticated) {
        await fetchUserOrders();
      }

      return { success: true, order: data };
    } catch (error: any) {
      console.error('Error creating order:', error);
      toast.error('Ошибка при создании заказа', {
        description: error.message || 'Попробуйте еще раз'
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchUserOrders = async () => {
    if (!user || !isAuthenticated) return;

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

  const updateOrder = async (orderId: string, updates: Partial<OrderData>) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', orderId);

      if (error) throw error;

      toast.success('Заказ обновлен');
      await fetchUserOrders();
      return true;
    } catch (error: any) {
      console.error('Error updating order:', error);
      toast.error('Ошибка обновления заказа');
      return false;
    }
  };

  useEffect(() => {
    if (user && isAuthenticated) {
      fetchUserOrders();
    } else {
      setOrders([]);
    }
  }, [user, isAuthenticated]);

  return {
    createOrder,
    fetchUserOrders,
    updateOrder,
    orders,
    loading
  };
}
