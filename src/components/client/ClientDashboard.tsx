
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Plus,
  TrendingUp,
  Calendar,
  Eye,
  Download
} from 'lucide-react';
import { useClientAuth } from '@/contexts/ClientAuthContext';

interface Order {
  id: string;
  title: string;
  status: 'new' | 'in_progress' | 'review' | 'completed';
  progress: number;
  deadline: string;
  amount: number;
  service: string;
}

export default function ClientDashboard() {
  const { client } = useClientAuth();

  // Мок данные для демонстрации
  const orders: Order[] = [
    {
      id: 'ORD-001',
      title: 'SEO-статья для блога',
      status: 'in_progress',
      progress: 75,
      deadline: '2024-12-20',
      amount: 8500,
      service: 'SEO-статья'
    },
    {
      id: 'ORD-002',
      title: 'Лендинг для курсов',
      status: 'review',
      progress: 90,
      deadline: '2024-12-18',
      amount: 25000,
      service: 'Продающий лендинг'
    },
    {
      id: 'ORD-003',
      title: 'Email-кампания',
      status: 'completed',
      progress: 100,
      deadline: '2024-12-15',
      amount: 12000,
      service: 'Email-кампания'
    }
  ];

  const stats = {
    totalOrders: orders.length,
    activeOrders: orders.filter(o => o.status !== 'completed').length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    totalSpent: orders.reduce((sum, o) => sum + o.amount, 0)
  };

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      new: { label: 'Новый', className: 'bg-blue-100 text-blue-800' },
      in_progress: { label: 'В работе', className: 'bg-yellow-100 text-yellow-800' },
      review: { label: 'На проверке', className: 'bg-purple-100 text-purple-800' },
      completed: { label: 'Завершен', className: 'bg-green-100 text-green-800' }
    };
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'new': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'in_progress': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'review': return <Eye className="w-4 h-4 text-purple-600" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">
          Добро пожаловать, {client?.name}!
        </h1>
        <p className="text-blue-100">
          У вас {stats.activeOrders} активных заказов на сумму ₽{stats.totalSpent.toLocaleString()}
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Всего заказов</p>
                <p className="text-xl font-bold">{stats.totalOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">В работе</p>
                <p className="text-xl font-bold">{stats.activeOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Завершено</p>
                <p className="text-xl font-bold">{stats.completedOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Потрачено</p>
                <p className="text-xl font-bold">₽{stats.totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Мои заказы</CardTitle>
            <CardDescription>Последние заказы и их статус</CardDescription>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Plus className="w-4 h-4 mr-2" />
            Новый заказ
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="font-medium">{order.title}</h3>
                      <p className="text-sm text-slate-600">{order.service} • ID: {order.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.status)}
                    <span className="font-bold">₽{order.amount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-slate-600">Прогресс:</span>
                      <span className="text-sm font-medium">{order.progress}%</span>
                    </div>
                    <Progress value={order.progress} className="h-2" />
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">
                      Срок: {new Date(order.deadline).toLocaleDateString('ru-RU')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 justify-end">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Подробнее
                    </Button>
                    {order.status === 'completed' && (
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Скачать
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium mb-2">Новый заказ</h3>
            <p className="text-sm text-slate-600">Создать новый заказ на услуги</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium mb-2">Документы</h3>
            <p className="text-sm text-slate-600">Договоры, акты и счета</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-medium mb-2">Аналитика</h3>
            <p className="text-sm text-slate-600">Статистика ваших проектов</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
