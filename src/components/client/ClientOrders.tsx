
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Search,
  Filter,
  Download,
  Eye,
  MessageSquare,
  Calendar
} from 'lucide-react';

interface Order {
  id: string;
  title: string;
  status: 'new' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  progress: number;
  deadline: string;
  amount: number;
  service: string;
  createdAt: string;
  description: string;
  manager: string;
}

export default function ClientOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const orders: Order[] = [
    {
      id: 'ORD-001',
      title: 'SEO-статья для блога',
      status: 'in_progress',
      progress: 75,
      deadline: '2024-12-20',
      amount: 8500,
      service: 'SEO-статья',
      createdAt: '2024-12-10',
      description: 'Статья о современных трендах в маркетинге',
      manager: 'Анна Петрова'
    },
    {
      id: 'ORD-002',
      title: 'Лендинг для курсов',
      status: 'review',
      progress: 90,
      deadline: '2024-12-18',
      amount: 25000,
      service: 'Продающий лендинг',
      createdAt: '2024-12-05',
      description: 'Лендинг для онлайн-курсов по программированию',
      manager: 'Сергей Иванов'
    },
    {
      id: 'ORD-003',
      title: 'Email-кампания',
      status: 'completed',
      progress: 100,
      deadline: '2024-12-15',
      amount: 12000,
      service: 'Email-кампания',
      createdAt: '2024-11-28',
      description: 'Серия из 5 писем для автоворонки',
      manager: 'Мария Сидорова'
    },
    {
      id: 'ORD-004',
      title: 'Контент для соцсетей',
      status: 'new',
      progress: 10,
      deadline: '2024-12-25',
      amount: 15000,
      service: 'SMM-контент',
      createdAt: '2024-12-14',
      description: 'Контент-план на месяц для Instagram',
      manager: 'Елена Козлова'
    }
  ];

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      new: { label: 'Новый', className: 'bg-blue-100 text-blue-800' },
      in_progress: { label: 'В работе', className: 'bg-yellow-100 text-yellow-800' },
      review: { label: 'На проверке', className: 'bg-purple-100 text-purple-800' },
      completed: { label: 'Завершен', className: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Отменен', className: 'bg-red-100 text-red-800' }
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
      case 'cancelled': return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Мои заказы</h1>
          <p className="text-slate-600">Управляйте своими проектами и отслеживайте прогресс</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          Новый заказ
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Поиск по названию или услуге..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="new">Новые</SelectItem>
                  <SelectItem value="in_progress">В работе</SelectItem>
                  <SelectItem value="review">На проверке</SelectItem>
                  <SelectItem value="completed">Завершенные</SelectItem>
                  <SelectItem value="cancelled">Отмененные</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <h3 className="font-semibold text-lg">{order.title}</h3>
                    <p className="text-slate-600">{order.service} • ID: {order.id}</p>
                    <p className="text-sm text-slate-500 mt-1">{order.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(order.status)}
                  <span className="font-bold text-lg">₽{order.amount.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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

                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Менеджер: {order.manager}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-end">
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Чат
                </Button>
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
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Заказы не найдены</h3>
            <p className="text-slate-600">Попробуйте изменить параметры поиска</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
