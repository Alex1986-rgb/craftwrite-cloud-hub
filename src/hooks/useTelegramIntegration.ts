
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import { toast } from 'sonner';

interface TelegramIntegration {
  id: string;
  chat_id: number;
  is_active: boolean;
  created_at: string;
}

export function useTelegramIntegration() {
  const { user } = useUnifiedAuth();
  const [integration, setIntegration] = useState<TelegramIntegration | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchIntegration = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('telegram_integrations')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setIntegration(data || null);
    } catch (error: any) {
      console.error('Error fetching Telegram integration:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupIntegration = async (chatId: number) => {
    if (!user) return false;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('telegram_integrations')
        .upsert({
          user_id: user.id,
          chat_id: chatId,
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;

      setIntegration(data);
      toast.success('Telegram интеграция настроена!');
      return true;
    } catch (error: any) {
      console.error('Error setting up Telegram integration:', error);
      toast.error('Ошибка настройки Telegram интеграции');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleIntegration = async () => {
    if (!integration || !user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('telegram_integrations')
        .update({ is_active: !integration.is_active })
        .eq('id', integration.id)
        .select()
        .single();

      if (error) throw error;

      setIntegration(data);
      toast.success(
        data.is_active 
          ? 'Telegram уведомления включены' 
          : 'Telegram уведомления отключены'
      );
    } catch (error: any) {
      console.error('Error toggling Telegram integration:', error);
      toast.error('Ошибка изменения настроек');
    } finally {
      setLoading(false);
    }
  };

  const sendTestNotification = async () => {
    if (!user || !integration?.is_active) return;

    try {
      const { error } = await supabase.functions.invoke('telegram-notifications', {
        body: {
          user_id: user.id,
          message: '🧪 <b>Тестовое уведомление</b>\n\nВаша интеграция с Telegram работает корректно!',
          type: 'test'
        }
      });

      if (error) throw error;

      toast.success('Тестовое уведомление отправлено!');
    } catch (error: any) {
      console.error('Error sending test notification:', error);
      toast.error('Ошибка отправки уведомления');
    }
  };

  useEffect(() => {
    fetchIntegration();
  }, [user]);

  return {
    integration,
    loading,
    setupIntegration,
    toggleIntegration,
    sendTestNotification,
    refetch: fetchIntegration
  };
}
