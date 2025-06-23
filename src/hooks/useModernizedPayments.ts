
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import { toast } from 'sonner';

interface Payment {
  id: string;
  order_id: string;
  user_id: string;
  amount: number;
  currency: string;
  payment_method?: string;
  payment_status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  payment_gateway: string;
  gateway_payment_id?: string;
  promo_code_id?: string;
  discount_amount: number;
  created_at: string;
  completed_at?: string;
}

interface PromoCode {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_uses?: number;
  used_count: number;
  is_active: boolean;
  valid_from: string;
  valid_until?: string;
}

export function useModernizedPayments() {
  const { user, currentRole } = useUnifiedAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);

  // Создание платежа
  const createPayment = async (orderId: string, amount: number, promoCode?: string) => {
    if (!user) throw new Error('User not authenticated');

    setLoading(true);
    try {
      let discountAmount = 0;
      let promoCodeId = null;

      // Проверяем промокод если указан
      if (promoCode) {
        const { data: promo, error: promoError } = await supabase
          .from('promo_codes')
          .select('*')
          .eq('code', promoCode.toUpperCase())
          .eq('is_active', true)
          .single();

        if (promoError) {
          toast.error('Промокод не найден или недействителен');
          return null;
        }

        if (promo) {
          // Проверяем минимальную сумму заказа
          if (amount < promo.min_order_amount) {
            toast.error(`Минимальная сумма заказа для применения промокода: ${promo.min_order_amount / 100}₽`);
            return null;
          }

          // Проверяем лимит использований
          if (promo.max_uses && promo.used_count >= promo.max_uses) {
            toast.error('Промокод больше не действителен');
            return null;
          }

          // Проверяем срок действия
          if (promo.valid_until && new Date() > new Date(promo.valid_until)) {
            toast.error('Срок действия промокода истек');
            return null;
          }

          // Вычисляем скидку
          if (promo.discount_type === 'percentage') {
            discountAmount = Math.round(amount * promo.discount_value / 100);
          } else {
            discountAmount = promo.discount_value;
          }

          promoCodeId = promo.id;
        }
      }

      const finalAmount = amount - discountAmount;

      const { data, error } = await supabase
        .from('payments')
        .insert({
          order_id: orderId,
          user_id: user.id,
          amount: finalAmount,
          promo_code_id: promoCodeId,
          discount_amount: discountAmount
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Платеж создан');
      return data;
    } catch (error: any) {
      console.error('Error creating payment:', error);
      toast.error('Ошибка создания платежа');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Обновление статуса платежа
  const updatePaymentStatus = async (paymentId: string, status: Payment['payment_status'], gatewayPaymentId?: string) => {
    try {
      const updates: any = { payment_status: status };
      if (status === 'completed') {
        updates.completed_at = new Date().toISOString();
      }
      if (gatewayPaymentId) {
        updates.gateway_payment_id = gatewayPaymentId;
      }

      const { error } = await supabase
        .from('payments')
        .update(updates)
        .eq('id', paymentId);

      if (error) throw error;

      // Обновляем статус заказа при успешном платеже
      if (status === 'completed') {
        const { data: payment } = await supabase
          .from('payments')
          .select('order_id')
          .eq('id', paymentId)
          .single();

        if (payment) {
          await supabase
            .from('orders')
            .update({ payment_status: 'paid' })
            .eq('id', payment.order_id);
        }
      }

      toast.success('Статус платежа обновлен');
    } catch (error: any) {
      console.error('Error updating payment status:', error);
      toast.error('Ошибка обновления статуса платежа');
    }
  };

  // Получение платежей пользователя
  const fetchUserPayments = async () => {
    if (!user) return;

    setLoading(true);
    try {
      let query = supabase.from('payments').select('*');
      
      if (currentRole !== 'admin') {
        query = query.eq('user_id', user.id);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setPayments(data || []);
    } catch (error: any) {
      console.error('Error fetching payments:', error);
      toast.error('Ошибка загрузки платежей');
    } finally {
      setLoading(false);
    }
  };

  // Проверка промокода
  const validatePromoCode = async (code: string, orderAmount: number) => {
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('code', code.toUpperCase())
        .eq('is_active', true)
        .single();

      if (error) {
        return { valid: false, message: 'Промокод не найден' };
      }

      if (orderAmount < data.min_order_amount) {
        return { 
          valid: false, 
          message: `Минимальная сумма заказа: ${data.min_order_amount / 100}₽` 
        };
      }

      if (data.max_uses && data.used_count >= data.max_uses) {
        return { valid: false, message: 'Промокод больше не действителен' };
      }

      if (data.valid_until && new Date() > new Date(data.valid_until)) {
        return { valid: false, message: 'Срок действия промокода истек' };
      }

      let discountAmount = 0;
      if (data.discount_type === 'percentage') {
        discountAmount = Math.round(orderAmount * data.discount_value / 100);
      } else {
        discountAmount = data.discount_value;
      }

      return {
        valid: true,
        message: `Скидка ${data.discount_type === 'percentage' ? data.discount_value + '%' : data.discount_value / 100 + '₽'}`,
        discountAmount,
        promoCode: data
      };
    } catch (error: any) {
      console.error('Error validating promo code:', error);
      return { valid: false, message: 'Ошибка проверки промокода' };
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserPayments();
    }
  }, [user]);

  return {
    payments,
    loading,
    createPayment,
    updatePaymentStatus,
    fetchUserPayments,
    validatePromoCode
  };
}
