
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  DollarSign,
  Clock,
  Star,
  MessageSquare,
  Target
} from 'lucide-react';
import { useEnhancedOrders } from '@/hooks/useEnhancedOrders';
import { useModernizedPayments } from '@/hooks/useModernizedPayments';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function ModernizedAnalytics() {
  const { orders } = useEnhancedOrders();
  const { payments } = useModernizedPayments();
  const [timeRange, setTimeRange] = useState('30');

  // Фильтрация по времени
  const filterByTimeRange = (items: any[], timeRange: string) => {
    const now = new Date();
    const daysAgo = new Date(now.getTime() - parseInt(timeRange) * 24 * 60 * 60 * 1000);
    return items.filter(item => new Date(item.created_at) >= daysAgo);
  };

  const filteredOrders = filterByTimeRange(orders, timeRange);
  const filteredPayments = filterByTimeRange(payments, timeRange);

  // Основные метрики
  const metrics = {
    totalOrders: filteredOrders.length,
    completedOrders: filteredOrders.filter(o => o.status === 'completed').length,
    totalRevenue: filteredPayments
      .filter(p => p.payment_status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0) / 100,
    avgOrderValue: filteredPayments.length > 0 
      ? filteredPayments.reduce((sum, p) => sum + p.amount, 0) / filteredPayments.length / 100 
      : 0,
    conversionRate: filteredOrders.length > 0 
      ? (filteredOrders.filter(o => o.status === 'completed').length / filteredOrders.length) * 100 
      : 0,
    avgRating: filteredOrders
      .filter(o => o.quality_rating)
      .reduce((sum, o) => sum + (o.quality_rating || 0), 0) / 
      Math.max(filteredOrders.filter(o => o.quality_rating).length, 1),
    avgCompletionTime: calculateAvgCompletionTime(filteredOrders),
    repeatCustomers: calculateRepeatCustomers(filteredOrders)
  };

  // Данные для графиков
  const dailyStats = generateDailyStats(filteredOrders, filteredPayments, parseInt(timeRange));
  const serviceStats = generateServiceStats(filteredOrders);
  const statusDistribution = generateStatusDistribution(filteredOrders);

  function calculateAvgCompletionTime(orders: any[]) {
    const completedOrders = orders.filter(o => o.status === 'completed' && o.completed_at);
    if (completedOrders.length === 0) return 0;
    
    const totalTime = completedOrders.reduce((sum, order) => {
      const created = new Date(order.created_at);
      const completed = new Date(order.completed_at);
      return sum + (completed.getTime() - created.getTime());
    }, 0);
    
    return Math.round(totalTime / completedOrders.length / (1000 * 60 * 60 * 24)); // в днях
  }

  function calculateRepeatCustomers(orders: any[]) {
    const customerEmails = orders.map(o => o.contact_email);
    const uniqueCustomers = new Set(customerEmails);
    const repeatCustomers = customerEmails.length - uniqueCustomers.size;
    return Math.round((repeatCustomers / uniqueCustomers.size) * 100) || 0;
  }

  function generateDailyStats(orders: any[], payments: any[], days: number) {
    const stats = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayOrders = orders.filter(o => 
        new Date(o.created_at).toISOString().split('T')[0] === dateStr
      );
      
      const dayPayments = payments.filter(p => 
        p.payment_status === 'completed' &&
        new Date(p.created_at).toISOString().split('T')[0] === dateStr
      );
      
      stats.push({
        date: date.toLocaleDateString(),
        orders: dayOrders.length,
        revenue: dayPayments.reduce((sum, p) => sum + p.amount, 0) / 100,
        completed: dayOrders.filter(o => o.status === 'completed').length
      });
    }
    
    return stats;
  }

  function generateServiceStats(orders: any[]) {
    const serviceCount: { [key: string]: number } = {};
    orders.forEach(order => {
      serviceCount[order.service_name] = (serviceCount[order.service_name] || 0) + 1;
    });
    
    return Object.entries(serviceCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }

  function generateStatusDistribution(orders: any[]) {
    const statusCount: { [key: string]: number } = {};
    orders.forEach(order => {
      const status = order.status === 'new' ? 'Новые' :
                    order.status === 'in_progress' ? 'В работе' :
                    order.status === 'completed' ? 'Завершенные' :
                    order.status === 'cancelled' ? 'Отмененные' : order.status;
      statusCount[status] = (statusCount[status] || 0) + 1;
    });
    
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c'];
    
    return Object.entries(statusCount).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length]
    }));
  }

  return (
    <div className="space-y-6">
      {/* Фильтр времени */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Аналитика и отчеты</CardTitle>
              <CardDescription>Подробная аналитика работы системы</CardDescription>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Период" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Последние 7 дней</SelectItem>
                <SelectItem value="30">Последние 30 дней</SelectItem>
                <SelectItem value="90">Последние 90 дней</SelectItem>
                <SelectItem value="365">Последний год</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Ключевые метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Всего заказов</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              Завершено: {metrics.completedOrders} ({metrics.conversionRate.toFixed(1)}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Доход</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalRevenue.toLocaleString()}₽</div>
            <p className="text-xs text-muted-foreground">
              Средний чек: {metrics.avgOrderValue.toLocaleString()}₽
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Качество работы</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgRating.toFixed(1)}/5</div>
            <p className="text-xs text-muted-foreground">
              Время выполнения: {metrics.avgCompletionTime} дн.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Повторные клиенты</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.repeatCustomers}%</div>
            <p className="text-xs text-muted-foreground">
              Конверсия: {metrics.conversionRate.toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Графики */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* График заказов и доходов */}
        <Card>
          <CardHeader>
            <CardTitle>Динамика заказов и доходов</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#8884d8" name="Заказы" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" name="Доход (₽)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Распределение по статусам */}
        <Card>
          <CardHeader>
            <CardTitle>Распределение заказов по статусам</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Популярные услуги */}
        <Card>
          <CardHeader>
            <CardTitle>Популярные услуги</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceStats.slice(0, 8)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Завершенные заказы */}
        <Card>
          <CardHeader>
            <CardTitle>Завершенные заказы по дням</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
