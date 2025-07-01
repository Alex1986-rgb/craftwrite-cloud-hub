
import { useState, useEffect } from 'react';
import { useRealtime } from './useRealtime';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import { toast } from 'sonner';

interface LiveNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  created_at: string;
}

export function useLiveNotifications() {
  const { user } = useUnifiedAuth();
  const [notifications, setNotifications] = useState<LiveNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  const handleNewNotification = (payload: any) => {
    const newNotification = payload.new as LiveNotification;
    
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);

    // Показываем toast уведомление
    toast(newNotification.title, {
      description: newNotification.message,
      duration: 5000
    });
  };

  const handleNotificationUpdate = (payload: any) => {
    const updatedNotification = payload.new as LiveNotification;
    
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === updatedNotification.id 
          ? updatedNotification 
          : notification
      )
    );

    // Пересчитываем непрочитанные
    if (updatedNotification.is_read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const { isConnected: realtimeConnected } = useRealtime({
    table: 'notifications',
    event: '*',
    filter: user ? `user_id=eq.${user.id}` : undefined,
    onInsert: handleNewNotification,
    onUpdate: handleNotificationUpdate,
    onError: (error) => {
      console.error('Live notifications error:', error);
    }
  });

  useEffect(() => {
    setIsConnected(realtimeConnected);
  }, [realtimeConnected]);

  const markAsRead = async (notificationId: string) => {
    // Реализация будет использовать существующий хук useNotifications
  };

  const markAllAsRead = async () => {
    // Реализация будет использовать существующий хук useNotifications
  };

  return {
    notifications,
    unreadCount,
    isConnected,
    markAsRead,
    markAllAsRead
  };
}
