
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import { toast } from 'sonner';
import { useTelegramNotifications } from './useTelegramNotifications';

export interface SmartOrderData {
  // Service details
  serviceType: string;
  serviceSubtype?: string;
  
  // Project details
  projectTitle: string;
  targetAudience: string;
  projectGoals: string;
  competitorUrls: string[];
  
  // Content requirements
  characterCount: number;
  keywordsMode: 'client' | 'auto' | 'ai';
  keywords: string[];
  toneOfVoice: string;
  contentStructure: string[];
  
  // Pricing
  basePrice: number;
  totalPrice: number;
  urgencyMultiplier: number;
  additionalServices: string[];
  
  // Contact
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactCompany: string;
  
  // Technical
  deadline: string;
  specialRequirements: string;
  previousExperience: boolean;
}

export function useSmartOrderIntegration() {
  const { user } = useUnifiedAuth();
  const [loading, setLoading] = useState(false);
  const { sendOrderNotification } = useTelegramNotifications();

  const generateOrderId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `SO_${timestamp}_${random}`;
  };

  const createSmartOrder = async (orderData: SmartOrderData) => {
    setLoading(true);
    
    try {
      // Преобразуем данные умного заказа в формат таблицы orders
      const transformedData = {
        service_slug: orderData.serviceType,
        service_name: getServiceName(orderData.serviceType),
        contact_name: orderData.contactName,
        contact_email: orderData.contactEmail,
        contact_phone: orderData.contactPhone || null,
        details: buildOrderDetails(orderData),
        additional_requirements: orderData.specialRequirements || null,
        estimated_price: Math.round(orderData.totalPrice * 100), // В копейках
        deadline: orderData.deadline ? new Date(orderData.deadline).toISOString().split('T')[0] : null,
        user_id: user?.id || null,
        service_options: {
          serviceSubtype: orderData.serviceSubtype,
          characterCount: orderData.characterCount,
          keywordsMode: orderData.keywordsMode,
          keywords: orderData.keywords,
          toneOfVoice: orderData.toneOfVoice,
          contentStructure: orderData.contentStructure,
          targetAudience: orderData.targetAudience,
          projectGoals: orderData.projectGoals,
          competitorUrls: orderData.competitorUrls,
          basePrice: orderData.basePrice,
          urgencyMultiplier: orderData.urgencyMultiplier,
          additionalServices: orderData.additionalServices,
          contactCompany: orderData.contactCompany,
          previousExperience: orderData.previousExperience
        },
        technical_specification: {
          service_type: orderData.serviceType,
          requirements: {
            target_audience: orderData.targetAudience,
            style: orderData.toneOfVoice,
            keywords: orderData.keywords,
            character_count: orderData.characterCount,
            additional_features: orderData.additionalServices
          },
          client_brief: buildOrderDetails(orderData),
          additional_requirements: orderData.specialRequirements || '',
          deadline: orderData.deadline,
          estimated_cost: orderData.totalPrice
        }
      };

      console.log('Creating smart order with data:', transformedData);

      const { data, error } = await supabase
        .from('orders')
        .insert(transformedData)
        .select()
        .single();

      if (error) {
        console.error('Smart order creation error:', error);
        throw error;
      }

      console.log('Smart order created successfully:', data);

      // Отправляем уведомление в Telegram
      try {
        await sendOrderNotification(data.id, {
          ...transformedData,
          ...data
        });
      } catch (notificationError) {
        console.error('Telegram notification error:', notificationError);
        // Не прерываем процесс из-за ошибки уведомления
      }

      // Создаем уведомление для пользователя (если авторизован)
      if (user) {
        try {
          const { error: notificationError } = await supabase
            .from('notifications')
            .insert({
              user_id: user.id,
              title: 'Умный заказ создан',
              message: `Ваш заказ "${transformedData.service_name}" успешно создан через умную форму. Номер заказа: ${data.id.slice(-8)}`,
              type: 'success'
            });

          if (notificationError) {
            console.error('User notification creation error:', notificationError);
          }
        } catch (notificationError) {
          console.error('User notification error:', notificationError);
        }
      }

      // Очищаем сохраненные данные из localStorage
      localStorage.removeItem('smart-order-draft');

      toast.success('🎉 Умный заказ успешно создан!', {
        description: `Номер заказа: ${data.id.slice(-8)}. Мы свяжемся с вами в течение 30 минут`
      });

      return { success: true, order: data };
    } catch (error: any) {
      console.error('Error creating smart order:', error);
      
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

  const getServiceName = (serviceSlug: string): string => {
    const serviceNames: Record<string, string> = {
      'seo-article': 'SEO-статья',
      'landing-page': 'Продающий лендинг',
      'email-campaigns': 'Email-кампания',
      'telegram-content': 'Контент для Telegram',
      'chatbot-scripts': 'Скрипты для чат-бота',
      'website-texts': 'Тексты для сайта',
      'instagram': 'Контент для Instagram',
      'linkedin': 'Контент для LinkedIn',
      'youtube': 'Контент для YouTube',
      'ozon': 'Тексты для Ozon',
      'wildberries': 'Тексты для Wildberries'
    };
    
    return serviceNames[serviceSlug] || 'Копирайтинг';
  };

  const buildOrderDetails = (orderData: SmartOrderData): string => {
    const details = [];
    
    details.push(`📋 ПРОЕКТ: ${orderData.projectTitle}`);
    details.push(`🎯 ЦЕЛЕВАЯ АУДИТОРИЯ: ${orderData.targetAudience}`);
    details.push(`🎯 ЦЕЛИ ПРОЕКТА: ${orderData.projectGoals}`);
    
    if (orderData.competitorUrls.length > 0) {
      details.push(`🔍 КОНКУРЕНТЫ: ${orderData.competitorUrls.join(', ')}`);
    }
    
    details.push(`📏 ОБЪЕМ: ${orderData.characterCount} символов`);
    details.push(`🎨 ТОНАЛЬНОСТЬ: ${orderData.toneOfVoice}`);
    
    if (orderData.keywords.length > 0) {
      details.push(`🔑 КЛЮЧЕВЫЕ СЛОВА: ${orderData.keywords.join(', ')}`);
    }
    
    if (orderData.contentStructure.length > 0) {
      details.push(`📝 СТРУКТУРА: ${orderData.contentStructure.join(', ')}`);
    }
    
    if (orderData.additionalServices.length > 0) {
      details.push(`➕ ДОПОЛНИТЕЛЬНО: ${orderData.additionalServices.join(', ')}`);
    }
    
    details.push(`💰 СТОИМОСТЬ: ${orderData.totalPrice.toLocaleString()} ₽`);
    
    if (orderData.contactCompany) {
      details.push(`🏢 КОМПАНИЯ: ${orderData.contactCompany}`);
    }
    
    return details.join('\n');
  };

  return {
    createSmartOrder,
    loading
  };
}
