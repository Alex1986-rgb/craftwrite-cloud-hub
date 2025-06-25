
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import { toast } from 'sonner';
import { useTelegramNotifications } from './useTelegramNotifications';

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
  technical_specification?: Record<string, any>;
}

export function useSupabaseOrders() {
  const { user, isAuthenticated } = useUnifiedAuth();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const { sendOrderNotification } = useTelegramNotifications();

  const createOrder = async (orderData: OrderData) => {
    setLoading(true);
    try {
      // Создаем техническое задание на основе данных формы
      const technicalSpecification = {
        service_type: orderData.service_slug,
        requirements: {
          target_audience: orderData.service_options?.target_audience || '',
          style: orderData.service_options?.style || '',
          keywords: orderData.service_options?.keywords || '',
          character_count: orderData.service_options?.character_count || '',
          additional_features: orderData.service_options?.additional_features || []
        },
        client_brief: orderData.details,
        additional_requirements: orderData.additional_requirements || '',
        deadline: orderData.deadline,
        estimated_cost: orderData.estimated_price
      };

      // Подготавливаем данные для вставки
      const insertData = {
        ...orderData,
        user_id: user?.id || null, // Может быть null для гостевых заказов
        estimated_price: orderData.estimated_price ? Math.round(orderData.estimated_price * 100) : null,
        technical_specification: technicalSpecification,
        status: 'new',
        payment_status: 'unpaid'
      };

      console.log('Creating order with data:', insertData);

      const { data, error } = await supabase
        .from('orders')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error('Supabase order creation error:', error);
        throw error;
      }

      console.log('Order created successfully:', data);

      // Отправляем уведомление в Telegram
      try {
        await sendOrderNotification(data.id, {
          ...orderData,
          ...data,
          technical_specification: technicalSpecification
        });
      } catch (notificationError) {
        console.error('Telegram notification error:', notificationError);
        // Не прерываем процесс из-за ошибки уведомления
      }

      // Создаем уведомление для пользователя (только если аутентифицирован)
      if (user) {
        try {
          const { error: notificationError } = await supabase
            .from('notifications')
            .insert({
              user_id: user.id,
              title: 'Заказ создан',
              message: `Ваш заказ "${orderData.service_name}" успешно создан и принят в работу. Мы свяжемся с вами в ближайшее время.`,
              type: 'success'
            });

          if (notificationError) {
            console.error('Notification creation error:', notificationError);
          }
        } catch (notificationError) {
          console.error('Notification error:', notificationError);
        }
      }

      toast.success('Заказ успешно создан!', {
        description: 'Техническое задание отправлено исполнителю. Мы свяжемся с вами в течение 1 рабочего дня'
      });

      if (isAuthenticated) {
        await fetchUserOrders();
      }

      return { success: true, order: data };
    } catch (error: any) {
      console.error('Error creating order:', error);
      
      let errorMessage = 'Попробуйте еще раз';
      if (error.message?.includes('violates row-level security')) {
        errorMessage = 'Ошибка доступа. Попробуйте войти в систему или создать заказ как гость';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error('Ошибка при создании заказа', {
        description: errorMessage
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
