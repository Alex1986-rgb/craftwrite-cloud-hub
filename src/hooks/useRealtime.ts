
import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';

interface RealtimeHookOptions {
  table: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  filter?: string;
  onInsert?: (payload: any) => void;
  onUpdate?: (payload: any) => void;
  onDelete?: (payload: any) => void;
  onError?: (error: any) => void;
}

export function useRealtime({
  table,
  event = '*',
  filter,
  onInsert,
  onUpdate,
  onDelete,
  onError
}: RealtimeHookOptions) {
  const { user } = useUnifiedAuth();
  const [isConnected, setIsConnected] = useState(false);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!user) return;

    const channelName = `realtime_${table}_${user.id}`;
    
    try {
      const channel = supabase.channel(channelName);

      // Исправленный синтаксис для подписки на postgres_changes
      const subscription = channel.on(
        'postgres_changes',
        {
          event: event,
          schema: 'public',
          table: table,
          ...(filter && { filter })
        },
        (payload) => {
          console.log('Realtime event:', payload);
          
          switch (payload.eventType) {
            case 'INSERT':
              onInsert?.(payload);
              break;
            case 'UPDATE':
              onUpdate?.(payload);
              break;
            case 'DELETE':
              onDelete?.(payload);
              break;
          }
        }
      );

      channel.subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
        if (status === 'CHANNEL_ERROR') {
          onError?.('Failed to subscribe to realtime channel');
        }
      });

      channelRef.current = channel;

    } catch (error) {
      console.error('Realtime subscription error:', error);
      onError?.(error);
    }

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [user, table, event, filter]);

  const disconnect = () => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
      setIsConnected(false);
    }
  };

  return {
    isConnected,
    disconnect
  };
}
