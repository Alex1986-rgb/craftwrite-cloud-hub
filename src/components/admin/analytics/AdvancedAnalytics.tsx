import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp,
  BarChart3,
  PieChart,
  Users,
  DollarSign,
  Clock,
  Target,
  Activity,
  Award,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsData {
  revenue: {
    total: number;
    growth: number;
    monthly: Array<{ month: string; amount: number }>;
  };
  orders: {
    total: number;
    completed: number;
    pending: number;
    cancelled: number;
    conversionRate: number;
  };
  services: {
    performance: Array<{
      name: string;
      orders: number;
      revenue: number;
      avgTime: number;
      satisfaction: number;
    }>;
  };
  clients: {
    total: number;
    new: number;
    returning: number;
    churnRate: number;
  };
  quality: {
    avgScore: number;
    improvementRate: number;
    topCategories: Array<{ name: string; score: number }>;
  };
}

export default function AdvancedAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    revenue: {
      total: 2450000,
      growth: 15.3,
      monthly: [
        { month: 'Янв', amount: 180000 },
        { month: 'Фев', amount: 220000 },
        { month: 'Мар', amount: 250000 },
        { month: 'Апр', amount: 280000 },
        { month: 'Май', amount: 320000 },
        { month: 'Июн', amount: 350000 }
      ]
    },
    orders: {
      total: 1247,
      completed: 1105,
      pending: 89,
      cancelled: 53,
      conversionRate: 88.6
    },
    services: {
      performance: [
        { name: 'SEO-статьи', orders: 450, revenue: 900000, avgTime: 24, satisfaction: 4.8 },
        { name: 'Лендинг пейджи', orders: 285, revenue: 855000, avgTime: 72, satisfaction: 4.6 },
        { name: 'Email кампании', orders: 320, revenue: 480000, avgTime: 48, satisfaction: 4.7 },
        { name: 'Telegram контент', orders: 192, revenue: 215000, avgTime: 18, satisfaction: 4.9 }
      ]
    },
    clients: {
      total: 567,
      new: 89,
      returning: 478,
      churnRate: 5.2
    },
    quality: {
      avgScore: 87.3,
      improvementRate: 12.5,
      topCategories: [
        { name: 'Уникальность', score: 92 },
        { name: 'Читаемость', score: 89 },
        { name: 'SEO', score: 85 },
        { name: 'Структура', score: 88 }
      ]
    }
  });
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState('30d');

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      // В реальности здесь будет запрос к базе данных
      // Имитируем загрузку данных
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Расширенная аналитика</h2>
          <p className="text-muted-foreground">
            Детальная статистика и метрики эффективности
          </p>
        </div>
        <div className="flex gap-2">
          <select 
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7d">7 дней</option>
            <option value="30d">30 дней</option>
            <option value="90d">3 месяца</option>
            <option value="365d">1 год</option>
          </select>
          <Button onClick={loadAnalytics} disabled={loading} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Обновить
          </Button>
        </div>
      </div>

      {/* Ключевые метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Общая выручка</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analytics.revenue.total)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{analytics.revenue.growth}%</span> к прошлому периоду
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Заказы</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.orders.total}</div>
            <p className="text-xs text-muted-foreground">
              Конверсия: <span className="text-blue-600">{analytics.orders.conversionRate}%</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Клиенты</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.clients.total}</div>
            <p className="text-xs text-muted-foreground">
              Новых: <span className="text-green-600">{analytics.clients.new}</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Качество</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.quality.avgScore}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{analytics.quality.improvementRate}%</span> улучшение
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">
            <TrendingUp className="h-4 w-4 mr-2" />
            Выручка
          </TabsTrigger>
          <TabsTrigger value="services">
            <PieChart className="h-4 w-4 mr-2" />
            Услуги
          </TabsTrigger>
          <TabsTrigger value="quality">
            <Target className="h-4 w-4 mr-2" />
            Качество
          </TabsTrigger>
          <TabsTrigger value="clients">
            <Users className="h-4 w-4 mr-2" />
            Клиенты
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Динамика выручки</CardTitle>
                <CardDescription>Помесячная статистика доходов</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.revenue.monthly.map((month, index) => {
                    const maxAmount = Math.max(...analytics.revenue.monthly.map(m => m.amount));
                    const percentage = (month.amount / maxAmount) * 100;
                    
                    return (
                      <div key={month.month} className="flex items-center gap-4">
                        <div className="w-12 text-sm">{month.month}</div>
                        <div className="flex-1">
                          <Progress value={percentage} className="h-3" />
                        </div>
                        <div className="w-24 text-sm font-medium text-right">
                          {formatCurrency(month.amount)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Средний чек</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(analytics.revenue.total / analytics.orders.total)}
                  </div>
                  <p className="text-sm text-muted-foreground">За заказ</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Прогноз на месяц</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(380000)}
                  </div>
                  <p className="text-sm text-muted-foreground">Ожидаемый доход</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ROI кампаний</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">325%</div>
                  <p className="text-sm text-muted-foreground">Возврат инвестиций</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="services">
          <div className="grid gap-4">
            {analytics.services.performance.map((service) => (
              <Card key={service.name}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <Badge variant="outline">{service.orders} заказов</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(service.revenue)}
                      </div>
                      <div className="text-sm text-muted-foreground">Выручка</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {service.avgTime}ч
                      </div>
                      <div className="text-sm text-muted-foreground">Ср. время</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {service.satisfaction}
                      </div>
                      <div className="text-sm text-muted-foreground">Рейтинг</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {formatCurrency(service.revenue / service.orders)}
                      </div>
                      <div className="text-sm text-muted-foreground">За заказ</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Эффективность</span>
                      <span>{((service.satisfaction / 5) * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={(service.satisfaction / 5) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quality">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Метрики качества</CardTitle>
                <CardDescription>Анализ качества сгенерированного контента</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.quality.topCategories.map((category) => (
                    <div key={category.name} className="flex items-center gap-4">
                      <div className="w-24 text-sm">{category.name}</div>
                      <div className="flex-1">
                        <Progress value={category.score} className="h-3" />
                      </div>
                      <div className="w-12 text-sm font-medium">{category.score}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Тренд качества</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-8 w-8 text-green-500" />
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        +{analytics.quality.improvementRate}%
                      </div>
                      <div className="text-sm text-muted-foreground">За последний месяц</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>A/B тесты</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Активных тестов</span>
                      <Badge variant="default">3</Badge>
                    </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Завершенных</span>
                    <Badge variant="outline">12</Badge>
                  </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Улучшений</span>
                      <Badge variant="secondary">8</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="clients">
          <div className="grid gap-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Новые клиенты</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {analytics.clients.new}
                  </div>
                  <p className="text-sm text-muted-foreground">За период</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Возвращающиеся</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {analytics.clients.returning}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {((analytics.clients.returning / analytics.clients.total) * 100).toFixed(1)}% от общего числа
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Отток клиентов</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {analytics.clients.churnRate}%
                  </div>
                  <p className="text-sm text-muted-foreground">Churn rate</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Сегментация клиентов</CardTitle>
                <CardDescription>Распределение по типам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>VIP клиенты (>100k₽)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={15} className="w-32 h-2" />
                      <span className="text-sm">15%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Постоянные (5+ заказов)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={35} className="w-32 h-2" />
                      <span className="text-sm">35%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Обычные (1-4 заказа)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={50} className="w-32 h-2" />
                      <span className="text-sm">50%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}