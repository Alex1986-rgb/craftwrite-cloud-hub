
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Target,
  Clock,
  DollarSign
} from 'lucide-react';

interface ProjectMetric {
  name: string;
  value: number;
  change: number;
  isPositive: boolean;
}

interface ChartData {
  month: string;
  orders: number;
  spending: number;
}

export default function ClientAnalytics() {
  const metrics: ProjectMetric[] = [
    { name: 'Завершенные проекты', value: 12, change: 20, isPositive: true },
    { name: 'Средний срок выполнения', value: 5.2, change: -8, isPositive: true },
    { name: 'Общие затраты', value: 245000, change: 15, isPositive: false },
    { name: 'Качество контента', value: 9.2, change: 5, isPositive: true }
  ];

  const monthlyData: ChartData[] = [
    { month: 'Сен', orders: 2, spending: 35000 },
    { month: 'Окт', orders: 3, spending: 45000 },
    { month: 'Ноя', orders: 4, spending: 78000 },
    { month: 'Дек', orders: 3, spending: 87000 }
  ];

  const serviceStats = [
    { service: 'SEO-статьи', count: 5, percentage: 42 },
    { service: 'Лендинги', count: 3, percentage: 25 },
    { service: 'Email-кампании', count: 2, percentage: 17 },
    { service: 'SMM-контент', count: 2, percentage: 16 }
  ];

  const projectEfficiency = [
    { project: 'SEO-статья "Маркетинг 2024"', deadline: '2024-12-20', progress: 85, efficiency: 'Отлично' },
    { project: 'Лендинг для курсов', deadline: '2024-12-18', progress: 95, efficiency: 'Хорошо' },
    { project: 'Email-кампания', deadline: '2024-12-15', progress: 100, efficiency: 'Отлично' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Аналитика</h1>
        <p className="text-slate-600">Анализ эффективности ваших проектов</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {index === 0 && <Target className="w-5 h-5 text-blue-600" />}
                  {index === 1 && <Clock className="w-5 h-5 text-blue-600" />}
                  {index === 2 && <DollarSign className="w-5 h-5 text-blue-600" />}
                  {index === 3 && <BarChart3 className="w-5 h-5 text-blue-600" />}
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  metric.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {metric.change}%
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">{metric.name}</p>
                <p className="text-xl font-bold">
                  {index === 2 ? `₽${metric.value.toLocaleString()}` : 
                   index === 1 || index === 3 ? `${metric.value}` : 
                   metric.value}
                  {index === 1 && ' дней'}
                  {index === 3 && '/10'}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Динамика по месяцам
            </CardTitle>
            <CardDescription>Заказы и расходы за последние месяцы</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 text-sm font-medium">{data.month}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">Заказов: {data.orders}</span>
                        <Badge variant="secondary" className="text-xs">
                          ₽{data.spending.toLocaleString()}
                        </Badge>
                      </div>
                      <Progress 
                        value={(data.orders / Math.max(...monthlyData.map(d => d.orders))) * 100} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Распределение услуг
            </CardTitle>
            <CardDescription>Популярные типы заказов</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceStats.map((stat) => (
                <div key={stat.service} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{stat.service}</span>
                      <span className="text-sm text-slate-600">{stat.count} шт.</span>
                    </div>
                    <Progress value={stat.percentage} className="h-2" />
                  </div>
                  <div className="ml-3 text-sm font-medium">{stat.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Efficiency */}
      <Card>
        <CardHeader>
          <CardTitle>Эффективность проектов</CardTitle>
          <CardDescription>Анализ выполнения текущих и завершенных проектов</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectEfficiency.map((project, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{project.project}</h3>
                  <Badge className={
                    project.efficiency === 'Отлично' ? 'bg-green-100 text-green-800' :
                    project.efficiency === 'Хорошо' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {project.efficiency}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <span className="text-sm text-slate-600">Прогресс:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={project.progress} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">
                      Срок: {new Date(project.deadline).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">
                      Качество: {project.efficiency}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ROI Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Анализ ROI</CardTitle>
          <CardDescription>Возврат инвестиций от контент-маркетинга</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">287%</div>
              <div className="text-sm text-slate-600">Средний ROI</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">+45%</div>
              <div className="text-sm text-slate-600">Рост трафика</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
              <div className="text-sm text-slate-600">Новых лидов</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
