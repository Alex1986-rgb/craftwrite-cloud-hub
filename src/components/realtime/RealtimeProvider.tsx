
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import { toast } from 'sonner';

interface RealtimeContextType {
  isConnected: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  lastActivity: Date;
  activeConnections: number;
}

const RealtimeContext = createContext<RealtimeContextType>({
  isConnected: false,
  connectionStatus: 'disconnected',
  lastActivity: new Date(),
  activeConnections: 0
});

export const useRealtimeContext = () => useContext(RealtimeContext);

interface RealtimeProviderProps {
  children: React.ReactNode;
}

export default function RealtimeProvider({ children }: RealtimeProviderProps) {
  const { user } = useUnifiedAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const [lastActivity, setLastActivity] = useState(new Date());
  const [activeConnections, setActiveConnections] = useState(0);

  useEffect(() => {
    if (!user) return;

    const checkConnection = () => {
      const channels = supabase.getChannels();
      const connectedChannels = channels.filter(channel => channel.state === 'joined');
      
      setActiveConnections(connectedChannels.length);
      setIsConnected(connectedChannels.length > 0);
      
      if (connectedChannels.length > 0) {
        setConnectionStatus('connected');
        setLastActivity(new Date());
      } else {
        setConnectionStatus('disconnected');
      }
    };

    // Проверяем подключение каждые 5 секунд
    const intervalId = setInterval(checkConnection, 5000);
    
    // Начальная проверка
    checkConnection();

    // Обработчик изменения статуса подключения
    const handleStatusChange = () => {
      checkConnection();
    };

    // Слушаем изменения состояния подключения
    const statusChannel = supabase.channel('connection_status')
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setConnectionStatus('connected');
          setIsConnected(true);
          setLastActivity(new Date());
        } else if (status === 'CHANNEL_ERROR') {
          setConnectionStatus('error');
          setIsConnected(false);
          toast.error('Ошибка подключения к real-time серверу');
        }
      });

    return () => {
      clearInterval(intervalId);
      if (statusChannel) {
        supabase.removeChannel(statusChannel);
      }
    };
  }, [user]);

  const contextValue: RealtimeContextType = {
    isConnected,
    connectionStatus,
    lastActivity,
    activeConnections
  };

  return (
    <RealtimeContext.Provider value={contextValue}>
      {children}
    </RealtimeContext.Provider>
  );
}
