
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { FinancialAnalytics } from '@/hooks/useAdvancedAnalytics';

interface RevenueAnalyticsProps {
  financialData: FinancialAnalytics[];
}

export default function RevenueAnalytics({ financialData }: RevenueAnalyticsProps) {
  // Calculate summary metrics
  const totalRevenue = financialData.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = financialData.reduce((sum, day) => sum + day.orders_count, 0);
  const avgRevenue = financialData.length > 0 ? totalRevenue / financialData.length : 0;
  const avgConversion = financialData.length > 0 ? 
    financialData.reduce((sum, day) => sum + day.conversion_rate, 0) / financialData.length : 0;

  // Prepare chart data
  const chartData = financialData.map(day => ({
    date: new Date(day.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
    revenue: day.revenue,
    orders: day.orders_count,
    aov: day.avg_order_value,
    conversion: day.conversion_rate
  }));

  // Calculate growth rates
  const getGrowthRate = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const lastWeekRevenue = financialData.slice(-7).reduce((sum, day) => sum + day.revenue, 0);
  const prevWeekRevenue = financialData.slice(-14, -7).reduce((sum, day) => sum + day.revenue, 0);
  const revenueGrowth = getGrowthRate(lastWeekRevenue, prevWeekRevenue);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Анализ доходов</h2>
        <Badge className="bg-green-100 text-green-800">
          Финансовая аналитика
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Общий доход</p>
                <p className="text-xl font-bold text-green-600">₽{totalRevenue.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-xs mt-1">
                  {revenueGrowth >= 0 ? (
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500" />
                  )}
                  <span className={revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {Math.abs(revenueGrowth).toFixed(1)}%
                  </span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Заказов</p>
                <p className="text-xl font-bold text-blue-600">{totalOrders}</p>
                <p className="text-xs text-slate-500 mt-1">За период</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Средний доход/день</p>
                <p className="text-xl font-bold text-purple-600">₽{avgRevenue.toLocaleString()}</p>
                <p className="text-xs text-slate-500 mt-1">Среднее значение</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Конверсия</p>
                <p className="text-xl font-bold text-orange-600">{avgConversion.toFixed(1)}%</p>
                <p className="text-xs text-slate-500 mt-1">Средняя</p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Динамика доходов</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'revenue' ? `₽${Number(value).toLocaleString()}` : value,
                  name === 'revenue' ? 'Доход' : name === 'orders' ? 'Заказы' : 'Конверсия'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={3}
                name="revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Orders and Conversion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Количество заказов</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [value, 'Заказов']} />
                <Bar dataKey="orders" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Средний чек</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`₽${Number(value).toLocaleString()}`, 'Средний чек']} />
                <Line 
                  type="monotone" 
                  dataKey="aov" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {financialData.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <DollarSign className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Данные о доходах не найдены
            </h3>
            <p className="text-slate-600">
              Финансовая аналитика появится после обработки платежей
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
