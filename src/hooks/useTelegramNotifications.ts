
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useTelegramNotifications() {
  const [loading, setLoading] = useState(false);

  const sendOrderNotification = async (orderId: string, orderData: any) => {
    setLoading(true);
    try {
      // Генерируем промпт на основе данных заказа
      const { data: promptData, error: promptError } = await supabase
        .rpc('generate_order_prompt', {
          order_data: {
            service: mapServiceToType(orderData.service_slug),
            topic: orderData.service_name,
            character_count: orderData.service_options?.character_count || '5000',
            keywords: orderData.service_options?.keywords || '',
            target_audience: orderData.service_options?.target_audience || '',
            style: orderData.service_options?.style || 'профессиональный',
            content_structure: orderData.service_options?.content_structure || '',
            additional_requirements: orderData.additional_requirements || '',
            client_details: orderData.details,
            service_name: orderData.service_name,
            benefits: orderData.service_options?.benefits || '',
            call_to_action: orderData.service_options?.call_to_action || '',
            landing_structure: orderData.service_options?.landing_structure || '',
            email_type: orderData.service_options?.email_type || '',
            subject: orderData.service_options?.subject || '',
            goal: orderData.service_options?.goal || '',
            tone: orderData.service_options?.tone || '',
            email_structure: orderData.service_options?.email_structure || '',
            platform: orderData.service_options?.platform || '',
            content_type: orderData.service_options?.content_type || '',
            posts_count: orderData.service_options?.posts_count || '1'
          }
        });

      if (promptError) {
        throw new Error(promptError.message);
      }

      // Отправляем уведомление в Telegram
      const { error } = await supabase.functions.invoke('telegram-order-notifications', {
        body: {
          orderId,
          orderData,
          promptText: promptData
        }
      });

      if (error) throw error;

      toast.success('Уведомление отправлено в Telegram');
      return true;
    } catch (error: any) {
      console.error('Ошибка отправки уведомления:', error);
      toast.error('Ошибка отправки уведомления: ' + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const mapServiceToType = (serviceSlug: string): string => {
    const mapping: Record<string, string> = {
      'seo-article': 'seo-article',
      'seo-statya': 'seo-article',
      'landing': 'landing',
      'lending': 'landing',
      'email': 'email',
      'email-rassylka': 'email',
      'social': 'social',
      'smm': 'social',
      'smm-content': 'social'
    };
    
    return mapping[serviceSlug] || 'seo-article';
  };

  return {
    sendOrderNotification,
    loading
  };
}
