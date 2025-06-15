
import React from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Plus,
  TrendingUp,
  Calendar,
  Eye,
  Download,
  Target,
  BarChart3,
  Users,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimatedStatsGrid } from '@/components/ui/animated-stats';
import { ProjectTimeline } from '@/components/ui/project-timeline';
import { EnhancedProgress } from '@/components/ui/enhanced-progress';
import { useClientAuth } from '@/contexts/ClientAuthContext';

export default function EnhancedClientDashboard() {
  const { client } = useClientAuth();

  // Мок данные для демонстрации
  const stats = [
    {
      title: 'Всего заказов',
      value: '24',
      icon: FileText,
      trend: { value: 12, isPositive: true },
      color: 'blue' as const
    },
    {
      title: 'В работе',
      value: '3',
      icon: Clock,
      trend: { value: 8, isPositive: true },
      color: 'orange' as const
    },
    {
      title: 'Завершено',
      value: '21',
      icon: CheckCircle,
      trend: { value: 15, isPositive: true },
      color: 'green' as const
    },
    {
      title: 'Потрачено',
      value: '₽485,000',
      icon: DollarSign,
      trend: { value: 23, isPositive: true },
      color: 'purple' as const
    }
  ];

  const timelineSteps = [
    {
      id: '1',
      title: 'SEO-статья принята',
      description: 'Статья прошла проверку и готова к публикации',
      status: 'completed' as const,
      date: '15 дек 2024'
    },
    {
      id: '2',
      title: 'Лендинг в разработке',
      description: 'Работаем над версткой и интеграцией функций',
      status: 'current' as const,
      date: '18 дек 2024',
      progress: 75
    },
    {
      id: '3',
      title: 'Email-кампания запланирована',
      description: 'Ожидается начало работы по техническому заданию',
      status: 'upcoming' as const,
      date: '22 дек 2024'
    }
  ];

  const quickActions = [
    {
      title: 'Новый заказ',
      description: 'Создать заказ на услуги',
      icon: Plus,
      color: 'from-blue-500 to-blue-600',
      href: '/client/new-order'
    },
    {
      title: 'Аналитика',
      description: 'Посмотреть статистику проектов',
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600',
      href: '/client/analytics'
    },
    {
      title: 'Документы',
      description: 'Договоры, акты и счета',
      icon: FileText,
      color: 'from-green-500 to-green-600',
      href: '/client/documents'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white animate-scale-in-center">
        <div className="absolute inset-0 bg-mesh opacity-30"></div>
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold animate-slide-in-up">
                Добро пожаловать, {client?.name}! 🚀
              </h1>
              <p className="text-blue-100 text-lg animate-slide-in-up" style={{ animationDelay: '100ms' }}>
                У вас 3 активных проекта на сумме ₽485,000
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4 animate-slide-in-right">
              <div className="text-right">
                <p className="text-blue-100 text-sm">Ваш менеджер</p>
                <p className="font-medium">Анна Петрова</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-200">Онлайн</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Stats */}
      <AnimatedStatsGrid stats={stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project Timeline */}
        <div className="lg:col-span-2">
          <Card className="glass-card border-0 animate-slide-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Прогресс проектов
              </CardTitle>
              <CardDescription>
                Актуальный статус ваших заказов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectTimeline steps={timelineSteps} />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="glass-card border-0 animate-slide-in-right">
            <CardHeader>
              <CardTitle className="text-lg">Быстрые действия</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <div 
                  key={action.title}
                  className="stagger-item group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="glass-card p-4 hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-gradient transition-colors duration-300">
                          {action.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* ROI Widget */}
          <Card className="glass-card border-0 animate-slide-in-right" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                ROI по проектам
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">SEO-статьи</span>
                  <span className="font-medium text-green-600">+340%</span>
                </div>
                <EnhancedProgress value={85} variant="gradient" size="sm" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Лендинги</span>
                  <span className="font-medium text-green-600">+280%</span>
                </div>
                <EnhancedProgress value={70} variant="gradient" size="sm" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Email-кампании</span>
                  <span className="font-medium text-green-600">+195%</span>
                </div>
                <EnhancedProgress value={60} variant="gradient" size="sm" />
              </div>
              
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-gray-100">Общий ROI</span>
                  <span className="text-lg font-bold text-green-600">+285%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="glass-card border-0 animate-slide-in-up" style={{ animationDelay: '300ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Недавняя активность
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'Статья "SEO-тренды 2024" одобрена', time: '2 часа назад', type: 'success' },
              { action: 'Новый комментарий к лендингу', time: '4 часа назад', type: 'info' },
              { action: 'Счет на 25,000₽ выставлен', time: '1 день назад', type: 'warning' },
              { action: 'Email-кампания запущена', time: '2 дня назад', type: 'success' }
            ].map((activity, index) => (
              <div 
                key={index} 
                className="stagger-item flex items-center gap-4 p-3 glass-card hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'info' ? 'bg-blue-500' :
                  activity.type === 'warning' ? 'bg-orange-500' : 'bg-gray-500'
                } animate-pulse`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-gray-100">{activity.action}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
