
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import { useActivityLogs } from './useActivityLogs';
import { toast } from 'sonner';

export interface EnhancedOrder {
  id: string;
  service_slug: string;
  service_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  details: string;
  additional_requirements?: string;
  estimated_price?: number;
  final_price?: number;
  deadline?: string;
  status: string;
  priority: string;
  notes?: string;
  assigned_admin_id?: string;
  completed_at?: string;
  user_id?: string;
  created_at: string;
  updated_at: string;
  service_options?: Record<string, any>;
  files_urls?: string[];
}

export function useEnhancedOrders() {
  const { user, currentRole } = useUnifiedAuth();
  const { logActivity } = useActivityLogs();
  const [orders, setOrders] = useState<EnhancedOrder[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let query = supabase.from('orders').select('*');
      
      // Если не админ, показываем только свои заказы
      if (currentRole !== 'admin' && user) {
        query = query.eq('user_id', user.id);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast.error('Ошибка загрузки заказов');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: Partial<EnhancedOrder>) => {
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

      await logActivity('order_created', 'order', data.id, {
        service: orderData.service_name,
        status: data.status
      });

      toast.success('Заказ успешно создан!', {
        description: 'Мы свяжемся с вами в течение 1 рабочего дня'
      });

      await fetchOrders();
      return data;
    } catch (error: any) {
      console.error('Error creating order:', error);
      toast.error('Ошибка при создании заказа', {
        description: error.message || 'Попробуйте еще раз'
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string, notes?: string) => {
    try {
      const updateData: any = { status: newStatus };
      if (notes) updateData.notes = notes;
      if (newStatus === 'completed') updateData.completed_at = new Date().toISOString();

      const { error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId);

      if (error) throw error;

      await logActivity('order_status_updated', 'order', orderId, {
        new_status: newStatus,
        notes
      });

      toast.success('Статус заказа обновлен');
      await fetchOrders();
    } catch (error: any) {
      console.error('Error updating order status:', error);
      toast.error('Ошибка обновления статуса заказа');
    }
  };

  const assignOrderToAdmin = async (orderId: string, adminId: string) => {
    if (currentRole !== 'admin') return;

    try {
      const { error } = await supabase
        .from('orders')
        .update({ assigned_admin_id: adminId })
        .eq('id', orderId);

      if (error) throw error;

      await logActivity('order_assigned', 'order', orderId, {
        assigned_to: adminId
      });

      toast.success('Заказ назначен администратору');
      await fetchOrders();
    } catch (error: any) {
      console.error('Error assigning order:', error);
      toast.error('Ошибка назначения заказа');
    }
  };

  const updateOrderPriority = async (orderId: string, priority: string) => {
    if (currentRole !== 'admin') return;

    try {
      const { error } = await supabase
        .from('orders')
        .update({ priority })
        .eq('id', orderId);

      if (error) throw error;

      await logActivity('order_priority_updated', 'order', orderId, {
        new_priority: priority
      });

      toast.success('Приоритет заказа обновлен');
      await fetchOrders();
    } catch (error: any) {
      console.error('Error updating order priority:', error);
      toast.error('Ошибка обновления приоритета');
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();

      // Подписка на реальные обновления заказов
      const channel = supabase
        .channel('orders_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'orders'
          },
          () => {
            fetchOrders(); // Перезагружаем заказы при любых изменениях
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, currentRole]);

  return {
    orders,
    loading,
    fetchOrders,
    createOrder,
    updateOrderStatus,
    assignOrderToAdmin,
    updateOrderPriority
  };
}
