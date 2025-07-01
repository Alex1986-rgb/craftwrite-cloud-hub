
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';

interface UserPresence {
  user_id: string;
  status: 'online' | 'offline' | 'away';
  last_seen: string;
  metadata: Record<string, any>;
}

export function useUserPresence() {
  const { user } = useUnifiedAuth();
  const [onlineUsers, setOnlineUsers] = useState<UserPresence[]>([]);
  const [myStatus, setMyStatus] = useState<'online' | 'offline' | 'away'>('online');
  const presenceInterval = useRef<NodeJS.Timeout>();
  const visibilityTimeout = useRef<NodeJS.Timeout>();

  // Обновляем присутствие пользователя
  const updatePresence = async (status: 'online' | 'offline' | 'away' = 'online', metadata: Record<string, any> = {}) => {
    if (!user) return;

    try {
      await supabase.rpc('update_user_presence', {
        p_user_id: user.id,
        p_status: status,
        p_metadata: metadata
      });
      
      setMyStatus(status);
    } catch (error) {
      console.error('Error updating presence:', error);
    }
  };

  // Получаем список онлайн пользователей
  const fetchOnlineUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('user_presence')
        .select('*')
        .eq('status', 'online')
        .gte('last_seen', new Date(Date.now() - 5 * 60 * 1000).toISOString()); // последние 5 минут

      if (error) throw error;
      setOnlineUsers(data || []);
    } catch (error) {
      console.error('Error fetching online users:', error);
    }
  };

  // Обработка изменения видимости вкладки
  const handleVisibilityChange = () => {
    if (document.hidden) {
      // Вкладка скрыта - устанавливаем статус "away" через 1 минуту
      visibilityTimeout.current = setTimeout(() => {
        updatePresence('away');
      }, 60000);
    } else {
      // Вкладка активна - устанавливаем статус "online"
      if (visibilityTimeout.current) {
        clearTimeout(visibilityTimeout.current);
      }
      updatePresence('online');
    }
  };

  // Обработка закрытия страницы
  const handleBeforeUnload = () => {
    if (user) {
      // Используем синхронный запрос для надежности
      navigator.sendBeacon(
        `${supabase.supabaseUrl}/rest/v1/rpc/update_user_presence`,
        JSON.stringify({
          p_user_id: user.id,
          p_status: 'offline'
        })
      );
    }
  };

  useEffect(() => {
    if (!user) return;

    // Устанавливаем онлайн статус при входе
    updatePresence('online');

    // Периодически обновляем присутствие (каждые 30 секунд)
    presenceInterval.current = setInterval(() => {
      updatePresence(myStatus);
    }, 30000);

    // Получаем список онлайн пользователей
    fetchOnlineUsers();

    // Подписываемся на изменения статуса
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      if (presenceInterval.current) {
        clearInterval(presenceInterval.current);
      }
      if (visibilityTimeout.current) {
        clearTimeout(visibilityTimeout.current);
      }
      
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      // Устанавливаем оффлайн при размонтировании
      updatePresence('offline');
    };
  }, [user]);

  return {
    onlineUsers,
    myStatus,
    updatePresence,
    fetchOnlineUsers
  };
}
