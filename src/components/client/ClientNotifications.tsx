
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Bell, 
  CheckCircle, 
  AlertCircle,
  MessageSquare,
  FileText,
  CreditCard,
  Settings,
  Trash2,
  MarkAsUnread
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'payment' | 'system' | 'message';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export default function ClientNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notif-1',
      title: 'Заказ готов к проверке',
      message: 'Ваш заказ ORD-001 "SEO-статья для блога" готов к проверке',
      type: 'order',
      timestamp: '2024-12-14T15:30:00',
      isRead: false,
      actionUrl: '/client/orders'
    },
    {
      id: 'notif-2',
      title: 'Платеж обработан',
      message: 'Платеж на сумму ₽25,000 успешно обработан',
      type: 'payment',
      timestamp: '2024-12-14T10:15:00',
      isRead: false,
      actionUrl: '/client/payments'
    },
    {
      id: 'notif-3',
      title: 'Новое сообщение',
      message: 'Менеджер Анна отправила сообщение по заказу ORD-002',
      type: 'message',
      timestamp: '2024-12-13T18:45:00',
      isRead: true,
      actionUrl: '/client/support'
    },
    {
      id: 'notif-4',
      title: 'Обновление системы',
      message: 'В кабинете клиента добавлены новые функции аналитики',
      type: 'system',
      timestamp: '2024-12-12T12:00:00',
      isRead: true
    }
  ]);

  const [settings, setSettings] = useState({
    email: true,
    push: true,
    orderUpdates: true,
    paymentAlerts: true,
    systemNews: false,
    promotions: true
  });

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'payment': return <CreditCard className="w-5 h-5 text-green-600" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-purple-600" />;
      case 'system': return <Settings className="w-5 h-5 text-orange-600" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAsUnread = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, isRead: false } : notif
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Уведомления</h1>
          <p className="text-slate-600">
            У вас {unreadCount} непрочитанных уведомлений
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            <CheckCircle className="w-4 h-4 mr-2" />
            Отметить все как прочитанные
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Все уведомления
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`border rounded-lg p-4 transition-colors ${
                      !notification.isRead ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg border">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-slate-900">
                            {notification.title}
                            {!notification.isRead && (
                              <Badge className="ml-2 bg-blue-600 text-white text-xs">
                                Новое
                              </Badge>
                            )}
                          </h3>
                          <div className="flex gap-1">
                            {!notification.isRead ? (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => markAsUnread(notification.id)}
                              >
                                <MarkAsUnread className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-slate-600 text-sm mb-3">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            {new Date(notification.timestamp).toLocaleString('ru-RU')}
                          </span>
                          {notification.actionUrl && (
                            <Button size="sm" variant="outline">
                              Перейти
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Настройки уведомлений</CardTitle>
              <CardDescription>
                Управляйте способами получения уведомлений
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Способы доставки</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">Email уведомления</Label>
                    <Switch
                      id="email-notifications"
                      checked={settings.email}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, email: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications">Push уведомления</Label>
                    <Switch
                      id="push-notifications"
                      checked={settings.push}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, push: checked }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Типы уведомлений</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="order-updates">Обновления заказов</Label>
                    <Switch
                      id="order-updates"
                      checked={settings.orderUpdates}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, orderUpdates: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="payment-alerts">Уведомления об оплате</Label>
                    <Switch
                      id="payment-alerts"
                      checked={settings.paymentAlerts}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, paymentAlerts: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-news">Новости системы</Label>
                    <Switch
                      id="system-news"
                      checked={settings.systemNews}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, systemNews: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="promotions">Акции и предложения</Label>
                    <Switch
                      id="promotions"
                      checked={settings.promotions}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, promotions: checked }))
                      }
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full">
                Сохранить настройки
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Статистика уведомлений</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Всего уведомлений:</span>
                  <Badge variant="secondary">{notifications.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Непрочитанных:</span>
                  <Badge className="bg-blue-600 text-white">{unreadCount}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">За сегодня:</span>
                  <Badge variant="secondary">2</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
