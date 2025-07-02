
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useEnhancedAnalytics } from './useEnhancedAnalytics';
import { useSystemSettings } from './useSystemSettings';

interface OrderData {
  service_name: string;
  service_slug: string;
  details: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  estimated_price: number;
  deadline?: string;
  additional_requirements?: string;
  technical_specification?: any;
}

export function useOrderSystem() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { trackEvent, trackConversion, trackOrderFunnel } = useEnhancedAnalytics();
  const { getSetting } = useSystemSettings();

  const createOrder = useCallback(async (orderData: OrderData) => {
    try {
      setLoading(true);
      setError(null);

      // Track order start
      trackOrderFunnel('order_start', 1, {
        service: orderData.service_name,
        estimated_price: orderData.estimated_price
      });

      // Validate minimum order amount
      const minOrderAmount = getSetting('min_order_amount', 1000);
      if (orderData.estimated_price < minOrderAmount) {
        throw new Error(`Минимальная сумма заказа: ${minOrderAmount / 100} руб.`);
      }

      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          service_name: orderData.service_name,
          service_slug: orderData.service_slug,
          details: orderData.details,
          contact_name: orderData.contact_name,
          contact_email: orderData.contact_email,
          contact_phone: orderData.contact_phone,
          estimated_price: orderData.estimated_price,
          deadline: orderData.deadline ? new Date(orderData.deadline).toISOString().split('T')[0] : null,
          additional_requirements: orderData.additional_requirements,
          technical_specification: orderData.technical_specification,
          status: 'pending',
          payment_status: 'unpaid'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Track successful order creation
      trackEvent({
        action: 'order_created',
        category: 'Order',
        label: orderData.service_name,
        value: orderData.estimated_price,
        custom_parameters: {
          order_id: order.id,
          service_slug: orderData.service_slug
        }
      });

      trackOrderFunnel('order_created', 2, {
        order_id: order.id,
        service: orderData.service_name
      });

      // Track conversion for analytics
      trackConversion({
        event_name: 'begin_checkout',
        currency: 'RUB',
        value: orderData.estimated_price / 100,
        transaction_id: order.id,
        items: [{
          item_id: orderData.service_slug,
          item_name: orderData.service_name,
          category: 'copywriting_service',
          quantity: 1,
          price: orderData.estimated_price / 100
        }]
      });

      return order;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка создания заказа';
      setError(errorMessage);
      
      // Track error
      trackEvent({
        action: 'order_creation_error',
        category: 'Order',
        label: errorMessage,
        custom_parameters: {
          service: orderData.service_name,
          error: errorMessage
        }
      });

      throw err;
    } finally {
      setLoading(false);
    }
  }, [trackEvent, trackConversion, trackOrderFunnel, getSetting]);

  const getOrder = useCallback(async (orderId: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching order:', err);
      throw err;
    }
  }, []);

  return {
    createOrder,
    getOrder,
    loading,
    error
  };
}
