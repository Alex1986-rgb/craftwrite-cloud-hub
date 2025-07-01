
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Paperclip, Users } from 'lucide-react';
import { useLiveChat } from '@/hooks/useLiveChat';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import { format } from 'date-fns';

interface RealTimeChatProps {
  roomId: string;
  roomTitle?: string;
}

export default function RealTimeChat({ roomId, roomTitle }: RealTimeChatProps) {
  const { user } = useUnifiedAuth();
  const { messages, typingUsers, isConnected, sendMessage, sendTypingIndicator } = useLiveChat(roomId);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await sendMessage(newMessage);
    setNewMessage('');
    setIsTyping(false);
  };

  const handleTyping = (value: string) => {
    setNewMessage(value);
    
    if (!isTyping && value.trim()) {
      setIsTyping(true);
      sendTypingIndicator(true);
    }

    // Сбрасываем таймер печатания
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      sendTypingIndicator(false);
    }, 1000);
  };

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span>{roomTitle || 'Чат'}</span>
          <div className="flex items-center gap-2">
            <Badge variant={isConnected ? 'default' : 'destructive'}>
              {isConnected ? 'Online' : 'Offline'}
            </Badge>
            <Users className="w-4 h-4" />
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4 pt-0">
        {/* Область сообщений */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-64">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg ${
                  message.sender_id === user?.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="text-sm">{message.message}</div>
                <div className={`text-xs mt-1 ${
                  message.sender_id === user?.id ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {format(new Date(message.created_at), 'HH:mm')}
                </div>
              </div>
            </div>
          ))}
          
          {/* Индикатор печатания */}
          {typingUsers.map((typingUser) => (
            <div key={typingUser.user_id} className="flex justify-start">
              <div className="bg-gray-100 px-3 py-2 rounded-lg">
                <div className="text-sm text-gray-600">
                  {typingUser.user_name} печатает...
                </div>
              </div>
            </div>
          ))}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Форма отправки */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => handleTyping(e.target.value)}
            placeholder="Введите сообщение..."
            className="flex-1"
          />
          <Button type="button" variant="outline" size="icon">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button type="submit" disabled={!newMessage.trim() || !isConnected}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
