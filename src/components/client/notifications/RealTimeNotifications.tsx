
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, X, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LiveNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  timestamp: Date;
}

export function RealTimeNotifications() {
  const [notifications, setNotifications] = useState<LiveNotification[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Симуляция WebSocket соединения
  useEffect(() => {
    const connect = () => {
      setIsConnected(true);
      console.log('🔗 Подключение к real-time уведомлениям');
      
      // Симуляция получения уведомлений
      const interval = setInterval(() => {
        if (Math.random() > 0.7) { // 30% шанс получить уведомление
          const mockNotifications = [
            {
              title: 'Статья обновлена',
              message: 'Ваша SEO-статья прошла финальную проверку',
              type: 'success' as const
            },
            {
              title: 'Новое сообщение',
              message: 'Менеджер прислал комментарий к проекту',
              type: 'info' as const
            },
            {
              title: 'Срок подходит',
              message: 'До дедлайна проекта осталось 2 дня',
              type: 'warning' as const
            }
          ];

          const randomNotif = mockNotifications[Math.floor(Math.random() * mockNotifications.length)];
          addNotification(randomNotif);
        }
      }, 10000); // Каждые 10 секунд

      return () => {
        clearInterval(interval);
        setIsConnected(false);
      };
    };

    const cleanup = connect();
    return cleanup;
  }, []);

  const addNotification = (notif: Omit<LiveNotification, 'id' | 'timestamp'>) => {
    const newNotification: LiveNotification = {
      ...notif,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]); // Максимум 5 уведомлений

    // Показываем toast уведомление
    toast({
      title: notif.title,
      description: notif.message,
      variant: notif.type === 'warning' ? 'destructive' : 'default'
    });
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: LiveNotification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default: return <MessageSquare className="w-4 h-4 text-blue-600" />;
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center gap-2 glass-card px-3 py-2 text-sm">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          <span>{isConnected ? 'Подключено' : 'Отключено'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {/* Connection Status */}
      <div className="flex items-center gap-2 glass-card px-3 py-2 text-sm">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
        <span>{isConnected ? 'Подключено' : 'Отключено'}</span>
      </div>

      {/* Notifications */}
      {notifications.map((notification, index) => (
        <Card 
          key={notification.id} 
          className="glass-card border-0 shadow-2xl animate-slide-in-right"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeNotification(notification.id)}
                    className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
                
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  {notification.message}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {notification.timestamp.toLocaleTimeString('ru-RU', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${
                      notification.type === 'success' ? 'bg-green-100 text-green-700' :
                      notification.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {notification.type}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
