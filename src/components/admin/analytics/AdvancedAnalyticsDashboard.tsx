
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, RefreshCw, BarChart3, Users, DollarSign } from 'lucide-react';
import { useAdvancedAnalytics } from '@/hooks/useAdvancedAnalytics';
import KPIDashboard from './KPIDashboard';
import ConversionFunnelAnalytics from './ConversionFunnelAnalytics';
import CustomerLifetimeValue from './CustomerLifetimeValue';
import RevenueAnalytics from './RevenueAnalytics';
import CustomReportBuilder from './CustomReportBuilder';

export default function AdvancedAnalyticsDashboard() {
  const { kpis, financialData, customerData, loading, error, updateKPIs } = useAdvancedAnalytics();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await updateKPIs();
    setRefreshing(false);
  };

  // Calculate key metrics
  const todayRevenue = kpis.find(k => k.kpi_name === 'daily_revenue')?.kpi_value || 0;
  const conversionRate = kpis.find(k => k.kpi_name === 'conversion_rate')?.kpi_value || 0;
  const avgOrderValue = kpis.find(k => k.kpi_name === 'avg_order_value')?.kpi_value || 0;

  const totalCustomers = customerData.length;
  const highValueCustomers = customerData.filter(c => c.segment === 'high_value').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-500" />
          <p className="mt-2 text-gray-600">Загрузка аналитики...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={handleRefresh} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Попробовать снова
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Расширенная аналитика</h1>
          <p className="text-slate-600">Глубокий анализ бизнес-показателей и прогнозирование</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-green-100 text-green-800">
            Данные обновлены в реальном времени
          </Badge>
          <Button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Обновить
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Доход сегодня</p>
                <p className="text-2xl font-bold text-green-600">₽{todayRevenue.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+12.5%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Конверсия</p>
                <p className="text-2xl font-bold text-blue-600">{conversionRate.toFixed(1)}%</p>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+2.3%</span>
                </div>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Средний чек</p>
                <p className="text-2xl font-bold text-purple-600">₽{avgOrderValue.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <TrendingDown className="w-4 h-4" />
                  <span>-1.2%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">VIP клиенты</p>
                <p className="text-2xl font-bold text-orange-600">{highValueCustomers}</p>
                <p className="text-sm text-slate-500">из {totalCustomers} всего</p>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="kpis" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="kpis">KPI Панель</TabsTrigger>
          <TabsTrigger value="funnel">Воронка конверсий</TabsTrigger>
          <TabsTrigger value="revenue">Анализ доходов</TabsTrigger>
          <TabsTrigger value="customers">Клиенты</TabsTrigger>
          <TabsTrigger value="reports">Отчеты</TabsTrigger>
        </TabsList>

        <TabsContent value="kpis" className="space-y-6">
          <KPIDashboard kpis={kpis} />
        </TabsContent>

        <TabsContent value="funnel" className="space-y-6">
          <ConversionFunnelAnalytics />
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <RevenueAnalytics financialData={financialData} />
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <CustomerLifetimeValue customerData={customerData} />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <CustomReportBuilder />
        </TabsContent>
      </Tabs>
    </div>
  );
}
