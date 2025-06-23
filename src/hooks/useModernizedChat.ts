
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import { toast } from 'sonner';

interface ChatRoom {
  id: string;
  order_id: string;
  client_id: string;
  admin_id?: string;
  status: 'active' | 'closed' | 'archived';
  created_at: string;
  updated_at: string;
}

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

export function useModernizedChat(orderId?: string) {
  const { user, currentRole } = useUnifiedAuth();
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  // Получаем чат комнату для заказа
  const fetchChatRoom = async () => {
    if (!orderId || !user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('chat_rooms')
        .select('*')
        .eq('order_id', orderId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setChatRoom(data);
        await fetchMessages(data.id);
      }
    } catch (error: any) {
      console.error('Error fetching chat room:', error);
      toast.error('Ошибка загрузки чата');
    } finally {
      setLoading(false);
    }
  };

  // Получаем сообщения
  const fetchMessages = async (roomId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          *,
          sender:sender_id (
            full_name,
            email
          )
        `)
        .eq('room_id', roomId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      console.error('Error fetching messages:', error);
    }
  };

  // Отправка сообщения
  const sendMessage = async (message: string, messageType: 'text' | 'file' = 'text', fileUrl?: string) => {
    if (!chatRoom || !user || !message.trim()) return;

    setSending(true);
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          room_id: chatRoom.id,
          sender_id: user.id,
          message,
          message_type: messageType,
          file_url: fileUrl
        });

      if (error) throw error;

      // Сообщения обновятся через realtime
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error('Ошибка отправки сообщения');
    } finally {
      setSending(false);
    }
  };

  // Назначение администратора к чату
  const assignAdmin = async (adminId: string) => {
    if (!chatRoom || currentRole !== 'admin') return;

    try {
      const { error } = await supabase
        .from('chat_rooms')
        .update({ admin_id: adminId })
        .eq('id', chatRoom.id);

      if (error) throw error;
      toast.success('Администратор назначен');
    } catch (error: any) {
      console.error('Error assigning admin:', error);
      toast.error('Ошибка назначения администратора');
    }
  };

  // Подписка на realtime обновления
  useEffect(() => {
    if (!chatRoom) return;

    const channel = supabase
      .channel(`chat_room_${chatRoom.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${chatRoom.id}`
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatRoom]);

  useEffect(() => {
    if (orderId) {
      fetchChatRoom();
    }
  }, [orderId, user]);

  return {
    chatRoom,
    messages,
    loading,
    sending,
    sendMessage,
    assignAdmin,
    fetchChatRoom
  };
}
