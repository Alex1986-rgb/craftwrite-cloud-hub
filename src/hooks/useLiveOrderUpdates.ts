
import { useState, useEffect } from 'react';
import { useRealtime } from './useRealtime';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import { toast } from 'sonner';

interface LiveOrder {
  id: string;
  status: string;
  updated_at: string;
  contact_name: string;
  service_name: string;
  assigned_admin_id?: string;
}

export function useLiveOrderUpdates() {
  const { user, currentRole } = useUnifiedAuth();
  const [liveOrders, setLiveOrders] = useState<LiveOrder[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const handleOrderUpdate = (payload: any) => {
    const updatedOrder = payload.new as LiveOrder;
    
    setLiveOrders(prev => {
      const existingIndex = prev.findIndex(order => order.id === updatedOrder.id);
      if (existingIndex >= 0) {
        const newOrders = [...prev];
        newOrders[existingIndex] = updatedOrder;
        return newOrders;
      }
      return [...prev, updatedOrder];
    });

    setLastUpdate(new Date());

    // Показываем уведомление о изменении статуса
    if (payload.old?.status !== updatedOrder.status) {
      toast.success(`Статус заказа изменён`, {
        description: `Заказ "${updatedOrder.service_name}" теперь: ${getStatusText(updatedOrder.status)}`
      });
    }
  };

  const handleOrderInsert = (payload: any) => {
    const newOrder = payload.new as LiveOrder;
    setLiveOrders(prev => [newOrder, ...prev]);
    setLastUpdate(new Date());

    if (currentRole === 'admin') {
      toast.info('Новый заказ', {
        description: `Заказ от ${newOrder.contact_name}`
      });
    }
  };

  // Настраиваем realtime подписку
  const filter = currentRole === 'admin' ? undefined : `user_id=eq.${user?.id}`;
  
  const { isConnected } = useRealtime({
    table: 'orders',
    event: '*',
    filter,
    onUpdate: handleOrderUpdate,
    onInsert: handleOrderInsert,
    onError: (error) => {
      console.error('Live orders error:', error);
      toast.error('Ошибка live-обновлений заказов');
    }
  });

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      'pending': 'В ожидании',
      'in_progress': 'В работе',
      'completed': 'Завершён',
      'cancelled': 'Отменён'
    };
    return statusMap[status] || status;
  };

  return {
    liveOrders,
    isConnected,
    lastUpdate
  };
}
