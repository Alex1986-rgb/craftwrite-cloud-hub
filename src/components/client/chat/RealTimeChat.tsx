
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Paperclip, Smile, Phone, Video, MoreVertical } from 'lucide-react';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'client' | 'manager';
  timestamp: Date;
  senderName: string;
  senderAvatar?: string;
  status: 'sent' | 'delivered' | 'read';
}

interface TypingIndicator {
  userId: string;
  userName: string;
  isTyping: boolean;
}

export function RealTimeChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Здравствуйте! Готов ответить на ваши вопросы по проекту.',
      sender: 'manager',
      timestamp: new Date(Date.now() - 30000),
      senderName: 'Анна Петрова',
      status: 'read'
    },
    {
      id: '2',
      content: 'Добрый день! У меня есть несколько вопросов по SEO-статье.',
      sender: 'client',
      timestamp: new Date(Date.now() - 25000),
      senderName: 'Вы',
      status: 'read'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [typingUsers, setTypingUsers] = useState<TypingIndicator[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers]);

  // Симуляция typing indicator
  useEffect(() => {
    if (isTyping) {
      const timeout = setTimeout(() => {
        setTypingUsers([{
          userId: 'manager',
          userName: 'Анна Петрова',
          isTyping: true
        }]);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isTyping]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'client',
      timestamp: new Date(),
      senderName: 'Вы',
      status: 'sent'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsTyping(true);

    // Симуляция ответа менеджера
    setTimeout(() => {
      setTypingUsers([]);
      const responses = [
        'Понял ваш вопрос, уточню с командой и отвечу в течение часа.',
        'Отличный вопрос! Давайте разберем это подробнее.',
        'Спасибо за обратную связь. Учтем это в дальнейшей работе.'
      ];
      
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'manager',
        timestamp: new Date(),
        senderName: 'Анна Петрова',
        status: 'sent'
      };
      
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    
    // Симуляция typing indicator для менеджера
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setTypingUsers([]);
    }, 3000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card className="glass-card border-0 h-[600px] flex flex-col">
      {/* Chat Header */}
      <CardHeader className="border-b border-white/20 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>АП</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">Анна Петрова</CardTitle>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {isOnline ? 'В сети' : 'Не в сети'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hover:shadow-glow">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:shadow-glow">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:shadow-glow">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Messages Area */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === 'client' ? 'flex-row-reverse' : ''}`}
          >
            <Avatar className="w-8 h-8">
              <AvatarFallback>
                {message.sender === 'client' ? 'Вы' : 'АП'}
              </AvatarFallback>
            </Avatar>
            
            <div className={`max-w-xs lg:max-w-md ${message.sender === 'client' ? 'text-right' : ''}`}>
              <div className="text-xs text-slate-500 mb-1">{message.senderName}</div>
              <div className={`p-3 rounded-lg ${
                message.sender === 'client' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                  : 'glass-card'
              }`}>
                {message.content}
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                <span>{formatTime(message.timestamp)}</span>
                {message.sender === 'client' && (
                  <Badge variant="secondary" className="text-xs">
                    {message.status === 'sent' && '✓'}
                    {message.status === 'delivered' && '✓✓'}
                    {message.status === 'read' && '✓✓'}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicators */}
        {typingUsers.map((user) => (
          <div key={user.userId} className="flex gap-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback>АП</AvatarFallback>
            </Avatar>
            <div className="glass-card p-3 rounded-lg">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        ))}
        
        <div ref={messagesEndRef} />
      </CardContent>

      {/* Message Input */}
      <div className="border-t border-white/20 p-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hover:shadow-glow">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Input
            placeholder="Введите сообщение..."
            value={newMessage}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 glass-card border-0"
          />
          <Button variant="ghost" size="sm" className="hover:shadow-glow">
            <Smile className="w-4 h-4" />
          </Button>
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="gradient-primary text-white hover:shadow-glow"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
