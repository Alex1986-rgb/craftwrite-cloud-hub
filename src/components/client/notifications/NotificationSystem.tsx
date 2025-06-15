
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Bell,
  BellRing,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  FileText,
  DollarSign,
  Settings,
  X
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  orderUpdates: boolean;
  paymentAlerts: boolean;
  messageAlerts: boolean;
  weeklyReports: boolean;
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Статья готова к проверке',
      message: 'SEO-статья "Тренды 2024" завершена и ожидает вашего одобрения',
      type: 'success',
      timestamp: '2 минуты назад',
      read: false
    },
    {
      id: '2',
      title: 'Новое сообщение от менеджера',
      message: 'Анна Петрова прислала уточнения по лендингу',
      type: 'info',
      timestamp: '15 минут назад',
      read: false
    },
    {
      id: '3',
      title: 'Счет выставлен',
      message: 'Счет на сумму 25,000₽ за услуги email-маркетинга',
      type: 'warning',
      timestamp: '1 час назад',
      read: true
    },
    {
      id: '4',
      title: 'Проект завершен',
      message: 'Лендинг для образовательных курсов успешно завершен',
      type: 'success',
      timestamp: '3 часа назад',
      read: true
    }
  ]);

  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    paymentAlerts: true,
    messageAlerts: true,
    weeklyReports: false
  });

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotificationBadgeColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center animate-slide-in-up">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Уведомления</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            {unreadCount > 0 ? `У вас ${unreadCount} непрочитанных уведомлений` : 'Все уведомления прочитаны'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="glass-card border-0">
            <Settings className="w-4 h-4 mr-2" />
            Настройки
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="glass-card border-0 animate-slide-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BellRing className="w-5 h-5 text-blue-600" />
                Последние уведомления
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification, index) => (
                <div 
                  key={notification.id}
                  className={`stagger-item p-4 rounded-xl transition-all duration-300 hover:shadow-md ${
                    !notification.read 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' 
                      : 'glass-card'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-medium ${!notification.read ? 'text-blue-900 dark:text-blue-100' : ''}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge className={getNotificationBadgeColor(notification.type)}>
                            {notification.type}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          {notification.timestamp}
                        </span>
                        
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            Отметить как прочитанное
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Settings Panel */}
        <div className="space-y-6">
          <Card className="glass-card border-0 animate-slide-in-right">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Настройки уведомлений
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(settings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </label>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, [key]: checked }))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="glass-card border-0 animate-slide-in-right" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="text-lg">Статистика</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Сообщения</span>
                </div>
                <span className="text-sm font-medium">12</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Обновления проектов</span>
                </div>
                <span className="text-sm font-medium">8</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">Платежи</span>
                </div>
                <span className="text-sm font-medium">3</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
