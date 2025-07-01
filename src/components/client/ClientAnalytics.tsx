
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Target } from 'lucide-react';
import ClientAnalyticsMetrics from './analytics/ClientAnalyticsMetrics';
import ClientAnalyticsCharts from './analytics/ClientAnalyticsCharts';

export default function ClientAnalytics() {
  const metrics = [
    { name: 'Завершенные проекты', value: 12, change: 20, isPositive: true },
    { name: 'Средний срок выполнения', value: 5.2, change: -8, isPositive: true },
    { name: 'Общие затраты', value: 245000, change: 15, isPositive: false },
    { name: 'Качество контента', value: 9.2, change: 5, isPositive: true }
  ];

  const monthlyData = [
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
      <ClientAnalyticsMetrics metrics={metrics} />

      {/* Charts */}
      <ClientAnalyticsCharts monthlyData={monthlyData} serviceStats={serviceStats} />

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
