import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Target,
  Clock,
  DollarSign,
  Download,
  FileText,
  Activity
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { AnimatedStatsGrid } from '@/components/ui/animated-stats';
import { EnhancedProgress } from '@/components/ui/enhanced-progress';
import { ReportExporter } from '@/utils/reportExport';

export default function EnhancedClientAnalytics() {
  const monthlyData = [
    { month: 'Янв', orders: 2, spending: 35000, revenue: 120000 },
    { month: 'Фев', orders: 3, spending: 45000, revenue: 180000 },
    { month: 'Мар', orders: 1, spending: 28000, revenue: 95000 },
    { month: 'Апр', orders: 4, spending: 78000, revenue: 290000 },
    { month: 'Май', orders: 2, spending: 32000, revenue: 150000 },
    { month: 'Июн', orders: 3, spending: 87000, revenue: 310000 }
  ];

  const serviceData = [
    { name: 'SEO-статьи', value: 42, count: 5, color: '#3B82F6' },
    { name: 'Лендинги', value: 25, count: 3, color: '#10B981' },
    { name: 'Email-кампании', value: 17, count: 2, color: '#F59E0B' },
    { name: 'SMM-контент', value: 16, count: 2, color: '#EF4444' }
  ];

  const roiData = [
    { service: 'SEO-статьи', roi: 340, investment: 45000, return: 198000 },
    { service: 'Лендинги', roi: 280, investment: 75000, return: 285000 },
    { service: 'Email', roi: 195, investment: 25000, return: 73750 },
    { service: 'SMM', roi: 150, investment: 30000, return: 75000 }
  ];

  const stats = [
    {
      title: 'Завершенные проекты',
      value: '12',
      icon: Target,
      trend: { value: 20, isPositive: true },
      color: 'blue' as const
    },
    {
      title: 'Средний срок',
      value: '5.2 дня',
      icon: Clock,
      trend: { value: 8, isPositive: true },
      color: 'green' as const
    },
    {
      title: 'Общие затраты',
      value: '₽245,000',
      icon: DollarSign,
      trend: { value: 15, isPositive: false },
      color: 'orange' as const
    },
    {
      title: 'Общий ROI',
      value: '285%',
      icon: TrendingUp,
      trend: { value: 23, isPositive: true },
      color: 'purple' as const
    }
  ];

  const exportReport = (format: 'pdf' | 'excel') => {
    const reportData = ReportExporter.generateClientReport();
    if (format === 'pdf') {
      ReportExporter.exportToPDF(reportData);
    } else {
      ReportExporter.exportToExcel(reportData);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Export Actions */}
      <div className="flex justify-between items-center animate-slide-in-up">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Аналитика проектов</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Детальный анализ эффективности ваших проектов
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => exportReport('excel')}
            className="glass-card border-0 hover:shadow-glow"
          >
            <FileText className="w-4 h-4 mr-2" />
            Excel
          </Button>
          <Button 
            onClick={() => exportReport('pdf')}
            className="gradient-primary text-white hover:shadow-glow"
          >
            <Download className="w-4 h-4 mr-2" />
            PDF отчет
          </Button>
        </div>
      </div>

      {/* Animated Stats */}
      <AnimatedStatsGrid stats={stats} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend Chart */}
        <Card className="glass-card border-0 animate-slide-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Динамика доходности
            </CardTitle>
            <CardDescription>Соотношение инвестиций и результатов</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Доходы"
                />
                <Area
                  type="monotone"
                  dataKey="spending"
                  stroke="#EF4444"
                  fillOpacity={1}
                  fill="url(#colorSpending)"
                  name="Затраты"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Distribution */}
        <Card className="glass-card border-0 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-600" />
              Распределение услуг
            </CardTitle>
            <CardDescription>Популярность различных типов заказов</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  dataKey="value"
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ROI Analysis Chart */}
      <Card className="glass-card border-0 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            Анализ ROI по услугам
          </CardTitle>
          <CardDescription>Возврат инвестиций для каждого типа услуг</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={roiData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="service" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Bar 
                dataKey="roi" 
                fill="#10B981" 
                name="ROI %" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-0 animate-slide-in-up" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle className="text-lg">Эффективность</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Качество контента</span>
                <span className="text-sm font-medium">9.2/10</span>
              </div>
              <EnhancedProgress value={92} variant="gradient" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Соблюдение сроков</span>
                <span className="text-sm font-medium">95%</span>
              </div>
              <EnhancedProgress value={95} variant="animated" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Удовлетворенность</span>
                <span className="text-sm font-medium">98%</span>
              </div>
              <EnhancedProgress value={98} variant="gradient" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 animate-slide-in-up" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle className="text-lg">Финансовые показатели</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Общие инвестиции</span>
              <span className="font-bold text-lg">₽175,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Общий доход</span>
              <span className="font-bold text-lg text-green-600">₽631,750</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-sm font-medium">Чистая прибыль</span>
              <span className="font-bold text-xl text-green-600">₽456,750</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 animate-slide-in-up" style={{ animationDelay: '500ms' }}>
          <CardHeader>
            <CardTitle className="text-lg">Прогноз</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">+340%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Прогнозируемый ROI на следующий месяц</div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span>Рост на 23% по сравнению с прошлым периодом</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
