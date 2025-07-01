
import { useState, useEffect, useRef } from 'react';
import { useRealtime } from './useRealtime';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ChatMessage {
  id: string;
  room_id: string;
  sender_id: string;
  message: string;
  message_type: 'text' | 'file' | 'system';
  file_url?: string;
  is_read: boolean;
  created_at: string;
  sender?: {
    full_name?: string;
    email?: string;
  };
}

interface TypingIndicator {
  user_id: string;
  user_name: string;
  timestamp: number;
}

export function useLiveChat(roomId?: string) {
  const { user } = useUnifiedAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<TypingIndicator[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const presenceChannelRef = useRef<any>(null);

  // Обработка новых сообщений
  const handleNewMessage = (payload: any) => {
    const newMessage = payload.new as ChatMessage;
    
    // Не показываем уведомление для собственных сообщений
    if (newMessage.sender_id !== user?.id) {
      toast.info('Новое сообщение', {
        description: newMessage.message.substring(0, 50) + '...'
      });
    }

    setMessages(prev => {
      const exists = prev.find(msg => msg.id === newMessage.id);
      if (exists) return prev;
      return [...prev, newMessage];
    });
  };

  // Realtime подписка на сообщения
  useRealtime({
    table: 'chat_messages',
    event: 'INSERT',
    filter: roomId ? `room_id=eq.${roomId}` : undefined,
    onInsert: handleNewMessage,
    onError: (error) => {
      console.error('Live chat error:', error);
    }
  });

  // Presence канал для typing indicators
  useEffect(() => {
    if (!roomId || !user) return;

    const presenceChannel = supabase.channel(`chat_presence_${roomId}`);

    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState();
        const typingList: TypingIndicator[] = [];
        
        Object.entries(state).forEach(([key, presence]) => {
          const presenceData = presence[0] as any;
          if (presenceData.typing && presenceData.user_id !== user.id) {
            typingList.push({
              user_id: presenceData.user_id,
              user_name: presenceData.user_name,
              timestamp: presenceData.timestamp
            });
          }
        });
        
        setTypingUsers(typingList);
      })
      .subscribe(async (status) => {
        setIsConnected(status === 'SUBSCRIBED');
        
        if (status === 'SUBSCRIBED') {
          // Отправляем информацию о присутствии
          await presenceChannel.track({
            user_id: user.id,
            user_name: user.email || 'Пользователь',
            typing: false,
            timestamp: Date.now()
          });
        }
      });

    presenceChannelRef.current = presenceChannel;

    return () => {
      if (presenceChannelRef.current) {
        supabase.removeChannel(presenceChannelRef.current);
      }
    };
  }, [roomId, user]);

  // Функция для отправки typing indicator
  const sendTypingIndicator = async (isTyping: boolean) => {
    if (!presenceChannelRef.current || !user) return;

    try {
      await presenceChannelRef.current.track({
        user_id: user.id,
        user_name: user.email || 'Пользователь',
        typing: isTyping,
        timestamp: Date.now()
      });

      // Автоматически убираем typing через 3 секунды
      if (isTyping) {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        
        typingTimeoutRef.current = setTimeout(() => {
          sendTypingIndicator(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error sending typing indicator:', error);
    }
  };

  // Отправка сообщения
  const sendMessage = async (message: string, messageType: 'text' | 'file' = 'text', fileUrl?: string) => {
    if (!roomId || !user || !message.trim()) return;

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          room_id: roomId,
          sender_id: user.id,
          message,
          message_type: messageType,
          file_url: fileUrl
        });

      if (error) throw error;

      // Убираем typing indicator после отправки
      await sendTypingIndicator(false);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Ошибка отправки сообщения');
    }
  };

  return {
    messages,
    typingUsers,
    isConnected,
    sendMessage,
    sendTypingIndicator
  };
}
