import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  BarChart3,
  Users,
  FileText,
  DollarSign,
  MessageSquare,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Eye,
  Edit
} from 'lucide-react';
import { 
  sampleOrders, 
  sampleClients, 
  samplePortfolio, 
  samplePayments, 
  sampleChats, 
  sampleAnalytics,
  sampleActivity,
  sampleNotifications
} from '@/data/sampleDashboardData';

export default function SampleDataDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Завершен</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">В работе</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Ожидает</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Отменен</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Оплачен</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Ожидает</Badge>;
      case 'failed':
        return <Badge variant="destructive">Неудача</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">CopyPro Cloud Dashboard</h1>
            <p className="opacity-90">Комплексная система управления копирайтингом</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-white/20 text-white px-3 py-1">READY</Badge>
            <Badge className="bg-green-500 text-white px-3 py-1">LAUNCH</Badge>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Месячный доход</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sampleAnalytics.monthly_revenue.toLocaleString()}₽</div>
            <p className="text-xs text-muted-foreground">+12.5% от прошлого месяца</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Заказы</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sampleAnalytics.total_orders}</div>
            <p className="text-xs text-muted-foreground">{sampleAnalytics.completed_orders} завершено</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Клиенты</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sampleClients.length}</div>
            <p className="text-xs text-muted-foreground">
              {sampleClients.filter(c => c.status === 'vip').length} VIP клиентов
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Конверсия</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sampleAnalytics.conversion_rate}%</div>
            <p className="text-xs text-muted-foreground">Средний чек: {sampleAnalytics.avg_order_value.toLocaleString()}₽</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="orders">Заказы</TabsTrigger>
          <TabsTrigger value="clients">Клиенты</TabsTrigger>
          <TabsTrigger value="portfolio">Портфолио</TabsTrigger>
          <TabsTrigger value="payments">Платежи</TabsTrigger>
          <TabsTrigger value="chats">Чаты</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Последняя активность
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleActivity.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.color === 'green' ? 'bg-green-100' :
                        activity.color === 'blue' ? 'bg-blue-100' :
                        activity.color === 'orange' ? 'bg-orange-100' :
                        'bg-yellow-100'
                      }`}>
                        {activity.icon === 'check-circle' && <CheckCircle className="w-4 h-4 text-green-600" />}
                        {activity.icon === 'plus' && <Plus className="w-4 h-4 text-blue-600" />}
                        {activity.icon === 'dollar-sign' && <DollarSign className="w-4 h-4 text-green-600" />}
                        {activity.icon === 'message-circle' && <MessageSquare className="w-4 h-4 text-orange-600" />}
                        {activity.icon === 'clock' && <Clock className="w-4 h-4 text-yellow-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(activity.timestamp).toLocaleString('ru-RU')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Популярные услуги
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleAnalytics.popular_services.map((service, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{service.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ 
                              width: `${(service.count / Math.max(...sampleAnalytics.popular_services.map(s => s.count))) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-8">{service.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Управление заказами</CardTitle>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Новый заказ
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Услуга</TableHead>
                    <TableHead>Клиент</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Сумма</TableHead>
                    <TableHead>Дедлайн</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-xs">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.service_name}</p>
                          <p className="text-xs text-muted-foreground">{order.service_slug}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.contact_name}</p>
                          <p className="text-xs text-muted-foreground">{order.contact_email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{order.estimated_price.toLocaleString()}₽</TableCell>
                      <TableCell>
                        {order.deadline ? new Date(order.deadline).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clients Tab */}
        <TabsContent value="clients">
          <Card>
            <CardHeader>
              <CardTitle>База клиентов</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Клиент</TableHead>
                    <TableHead>Компания</TableHead>
                    <TableHead>Заказов</TableHead>
                    <TableHead>Потрачено</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Последний заказ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-xs text-muted-foreground">{client.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{client.company || '-'}</TableCell>
                      <TableCell>{client.total_orders}</TableCell>
                      <TableCell>{client.total_spent.toLocaleString()}₽</TableCell>
                      <TableCell>
                        <Badge variant={client.status === 'vip' ? 'default' : 'secondary'}>
                          {client.status === 'vip' ? 'VIP' : client.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {client.last_order_date ? 
                          new Date(client.last_order_date).toLocaleDateString() : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {samplePortfolio.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{item.service_type}</p>
                    </div>
                    <Badge>{item.tags[0]}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{item.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Клиент:</span>
                      <span className="font-medium">{item.client_name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Результат:</span>
                      <span className="font-medium text-green-600">{item.results.improvement}</span>
                    </div>
                    {item.metrics.roi && (
                      <div className="flex justify-between text-sm">
                        <span>ROI:</span>
                        <span className="font-medium">{item.metrics.roi}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1 mt-3">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Платежи и транзакции</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID платежа</TableHead>
                    <TableHead>Заказ</TableHead>
                    <TableHead>Сумма</TableHead>
                    <TableHead>Метод</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Дата</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {samplePayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-mono text-xs">{payment.id}</TableCell>
                      <TableCell className="font-mono text-xs">{payment.order_id}</TableCell>
                      <TableCell className="font-medium">{payment.amount.toLocaleString()}₽</TableCell>
                      <TableCell>{payment.payment_method}</TableCell>
                      <TableCell>{getPaymentStatusBadge(payment.payment_status)}</TableCell>
                      <TableCell>
                        {new Date(payment.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Chats Tab */}
        <TabsContent value="chats">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sampleChats.map((chat) => (
              <Card key={chat.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{chat.client_name}</CardTitle>
                      <p className="text-sm text-muted-foreground">Заказ: {chat.order_id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {chat.unread_count > 0 && (
                        <Badge className="bg-red-100 text-red-800">
                          {chat.unread_count} новых
                        </Badge>
                      )}
                      <Badge variant={chat.status === 'active' ? 'default' : 'secondary'}>
                        {chat.status === 'active' ? 'Активен' : 'Решен'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">{chat.last_message}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(chat.last_message_time).toLocaleString('ru-RU')}
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Открыть чат
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ключевые показатели</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Дневной доход</span>
                    <span className="font-bold">{sampleAnalytics.daily_revenue.toLocaleString()}₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Конверсия</span>
                    <span className="font-bold">{sampleAnalytics.conversion_rate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Средний чек</span>
                    <span className="font-bold">{sampleAnalytics.avg_order_value.toLocaleString()}₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Удовлетворенность</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold">{sampleAnalytics.client_satisfaction}/5</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Уведомления системы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleNotifications.map((notification) => (
                    <div key={notification.id} className={`p-3 rounded-lg border ${
                      notification.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                      notification.type === 'success' ? 'bg-green-50 border-green-200' :
                      'bg-blue-50 border-blue-200'
                    }`}>
                      <div className="flex items-start gap-2">
                        {notification.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />}
                        {notification.type === 'success' && <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />}
                        {notification.type === 'info' && <MessageSquare className="w-4 h-4 text-blue-600 mt-0.5" />}
                        <div>
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(notification.timestamp).toLocaleString('ru-RU')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}