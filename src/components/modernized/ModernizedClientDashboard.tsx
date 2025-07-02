
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  MessageSquare, 
  DollarSign, 
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';
import { useEnhancedOrders } from '@/hooks/useEnhancedOrders';
import { useModernizedPayments } from '@/hooks/useModernizedPayments';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import ModernizedClientOrders from './ModernizedClientOrders';
import ModernizedClientChat from './ModernizedClientChat';
import ModernizedClientPayments from './ModernizedClientPayments';
import ClientContentView from '@/components/client/ClientContentView';
import { Link } from 'react-router-dom';

export default function ModernizedClientDashboard() {
  const { user } = useUnifiedAuth();
  const { orders } = useEnhancedOrders();
  const { payments } = useModernizedPayments();
  const [activeTab, setActiveTab] = useState('overview');

  // Статистика клиента
  const stats = {
    totalOrders: orders.length,
    activeOrders: orders.filter(o => o.status === 'in_progress' || o.status === 'new').length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    totalSpent: payments
      .filter(p => p.payment_status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0) / 100,
    avgRating: orders
      .filter(o => o.quality_rating)
      .reduce((sum, o) => sum + (o.quality_rating || 0), 0) / 
      Math.max(orders.filter(o => o.quality_rating).length, 1),
    pendingPayments: payments.filter(p => p.payment_status === 'pending').length
  };

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Приветствие */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">
          Добро пожаловать, {user?.email?.split('@')[0]}!
        </h1>
        <p className="opacity-90">
          Управляйте своими заказами и отслеживайте прогресс работ
        </p>
      </div>

      {/* Быстрая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Всего заказов</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">{stats.activeOrders} активных</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Завершено</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedOrders}</div>
            {stats.avgRating > 0 && (
              <div className="flex items-center gap-1 mt-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">{stats.avgRating.toFixed(1)}/5</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Потрачено</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSpent.toLocaleString()}₽</div>
            {stats.pendingPayments > 0 && (
              <Badge variant="outline" className="mt-2">
                {stats.pendingPayments} ожидают оплаты
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Быстрые действия</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Link to="/order">
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Новый заказ
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Основные табы */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="orders">Мои заказы</TabsTrigger>
          <TabsTrigger value="content">Мои тексты</TabsTrigger>
          <TabsTrigger value="chats">Сообщения</TabsTrigger>
          <TabsTrigger value="payments">Платежи</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Последние заказы */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Последние заказы</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveTab('orders')}
                  >
                    Все заказы
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentOrders.map(order => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{order.service_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          order.status === 'new' ? 'default' :
                          order.status === 'in_progress' ? 'secondary' :
                          order.status === 'completed' ? 'outline' : 'destructive'
                        }>
                          {order.status === 'new' ? 'Новый' :
                           order.status === 'in_progress' ? 'В работе' :
                           order.status === 'completed' ? 'Завершен' :
                           order.status === 'cancelled' ? 'Отменен' : order.status}
                        </Badge>
                        {order.estimated_price && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {order.estimated_price / 100}₽
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {recentOrders.length === 0 && (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Пока нет заказов</h3>
                      <p className="text-muted-foreground mb-4">
                        Создайте свой первый заказ и начните работу с нами
                      </p>
                      <Link to="/order">
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Создать заказ
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Уведомления и статус */}
            <Card>
              <CardHeader>
                <CardTitle>Уведомления</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.activeOrders > 0 && (
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900">
                          У вас {stats.activeOrders} активных заказов
                        </p>
                        <p className="text-sm text-blue-700">
                          Следите за прогрессом в разделе "Мои заказы"
                        </p>
                      </div>
                    </div>
                  )}

                  {stats.pendingPayments > 0 && (
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-900">
                          Ожидается оплата ({stats.pendingPayments})
                        </p>
                        <p className="text-sm text-yellow-700">
                          Проверьте раздел "Платежи" для завершения оплаты
                        </p>
                      </div>
                    </div>
                  )}

                  {stats.completedOrders > 0 && stats.activeOrders === 0 && stats.pendingPayments === 0 && (
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-900">
                          Все заказы выполнены!
                        </p>
                        <p className="text-sm text-green-700">
                          Готовы к новым проектам? Создайте новый заказ
                        </p>
                      </div>
                    </div>
                  )}

                  {stats.totalOrders === 0 && (
                    <div className="text-center py-4">
                      <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Пока нет уведомлений</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <ModernizedClientOrders />
        </TabsContent>

        <TabsContent value="content">
          <ClientContentView />
        </TabsContent>

        <TabsContent value="chats">
          <ModernizedClientChat />
        </TabsContent>

        <TabsContent value="payments">
          <ModernizedClientPayments />
        </TabsContent>
      </Tabs>
    </div>
  );
}
