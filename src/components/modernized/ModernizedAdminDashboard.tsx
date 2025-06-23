
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  MessageSquare,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useEnhancedOrders } from '@/hooks/useEnhancedOrders';
import { useModernizedPayments } from '@/hooks/useModernizedPayments';
import ModernizedOrderManagement from './ModernizedOrderManagement';
import ModernizedPaymentManager from './ModernizedPaymentManager';
import ModernizedChatManagement from './ModernizedChatManagement';
import ModernizedAnalytics from './ModernizedAnalytics';

export default function ModernizedAdminDashboard() {
  const { orders } = useEnhancedOrders();
  const { payments } = useModernizedPayments();
  const [activeTab, setActiveTab] = useState('overview');

  // Вычисляем статистику
  const stats = {
    totalOrders: orders.length,
    newOrders: orders.filter(o => o.status === 'new').length,
    inProgressOrders: orders.filter(o => o.status === 'in_progress').length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    totalRevenue: payments
      .filter(p => p.payment_status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0) / 100,
    avgOrderValue: payments.length > 0 
      ? payments.reduce((sum, p) => sum + p.amount, 0) / payments.length / 100 
      : 0,
    activeChats: orders.filter(o => o.status === 'in_progress').length,
    avgRating: orders
      .filter(o => o.quality_rating)
      .reduce((sum, o) => sum + (o.quality_rating || 0), 0) / 
      Math.max(orders.filter(o => o.quality_rating).length, 1)
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Панель администратора</h1>
        <p className="text-slate-600">Полный контроль над системой управления заказами</p>
      </div>

      {/* Карточки статистики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Всего заказов</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">{stats.newOrders} новых</Badge>
              <Badge variant="outline">{stats.inProgressOrders} в работе</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Доход</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()}₽</div>
            <p className="text-xs text-muted-foreground">
              Средний чек: {stats.avgOrderValue.toLocaleString()}₽
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Активные чаты</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeChats}</div>
            <p className="text-xs text-muted-foreground">
              Требуют внимания
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Рейтинг качества</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgRating.toFixed(1)}</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star} 
                  className={`h-4 w-4 ${star <= stats.avgRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Основные табы */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="orders">Заказы</TabsTrigger>
          <TabsTrigger value="payments">Платежи</TabsTrigger>
          <TabsTrigger value="chats">Чаты</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Последние заказы */}
            <Card>
              <CardHeader>
                <CardTitle>Последние заказы</CardTitle>
                <CardDescription>Недавно созданные заказы</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{order.service_name}</p>
                        <p className="text-sm text-muted-foreground">{order.contact_name}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          order.status === 'new' ? 'default' :
                          order.status === 'in_progress' ? 'secondary' :
                          order.status === 'completed' ? 'outline' : 'destructive'
                        }>
                          {order.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {order.estimated_price ? `${order.estimated_price / 100}₽` : 'Не указано'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Быстрые действия */}
            <Card>
              <CardHeader>
                <CardTitle>Быстрые действия</CardTitle>
                <CardDescription>Часто используемые функции</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setActiveTab('orders')}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Управление заказами
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setActiveTab('chats')}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Активные чаты
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setActiveTab('analytics')}
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Аналитика
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <ModernizedOrderManagement />
        </TabsContent>

        <TabsContent value="payments">
          <ModernizedPaymentManager />
        </TabsContent>

        <TabsContent value="chats">
          <ModernizedChatManagement />
        </TabsContent>

        <TabsContent value="analytics">
          <ModernizedAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
