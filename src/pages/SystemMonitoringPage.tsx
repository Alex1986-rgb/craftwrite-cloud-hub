import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle,
  AlertCircle, 
  Clock,
  Zap,
  Settings,
  BarChart3,
  Database,
  Bell,
  ExternalLink,
  Play,
  Ban
} from 'lucide-react';
import UnifiedHeader from '@/components/navigation/UnifiedHeader';
import EnhancedFooter from '@/components/common/EnhancedFooter';
import { useSystemDiagnostics } from '@/hooks/useSystemDiagnostics';

interface SystemMetric {
  id: string;
  name: string;
  value: string | number;
  status: 'pass' | 'fail' | 'warning' | 'preparing';
  description: string;
  action?: string;
  icon: React.ReactNode;
}

interface QuickLink {
  title: string;
  href: string;
  description: string;
  icon: React.ReactNode;
}

export default function SystemMonitoringPage() {
  const { diagnostics, loading, runDiagnostics, getOverallStatus } = useSystemDiagnostics();
  const [readinessProgress] = useState(20); // Mock данные

  // Системные метрики на основе диагностики
  const systemMetrics: SystemMetric[] = [
    {
      id: 'analytics',
      name: 'Аналитика настроена',
      value: 'fail',
      status: 'fail',
      description: 'Google Analytics и Яндекс.Метрика должны быть настроены',
      action: 'Настроить ID аналитики в системных настройках',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: 'diagnostics',
      name: 'Система диагностики',
      value: 'fail',
      status: 'fail',
      description: 'Все системные проверки должны проходить успешно',
      action: 'Проверить результаты диагностики и исправить ошибки',
      icon: <Settings className="w-5 h-5" />
    },
    {
      id: 'database',
      name: 'База данных',
      value: 'pass',
      status: 'pass',
      description: 'Подключение к базе данных должно работать стабильно',
      icon: <Database className="w-5 h-5" />
    },
    {
      id: 'orders',
      name: 'Обработка заказов',
      value: 'warning',
      status: 'warning',
      description: 'Автоматическая обработка заказов должна быть включена',
      action: 'Включить автоматическую обработку заказов',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 'notifications',
      name: 'Система уведомлений',
      value: 'warning',
      status: 'warning',
      description: 'Система уведомлений должна быть настроена',
      action: 'Настроить email и Telegram уведомления',
      icon: <Bell className="w-5 h-5" />
    }
  ];

  const quickLinks: QuickLink[] = [
    {
      title: 'Системные настройки',
      href: '/admin',
      description: 'Настроить аналитику и интеграции',
      icon: <Settings className="w-5 h-5" />
    },
    {
      title: 'Мониторинг системы',
      href: '/test',
      description: 'Проверить статус всех компонентов',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      title: 'Управление заказами',
      href: '/admin',
      description: 'Настроить автоматическую обработку',
      icon: <Zap className="w-5 h-5" />
    },
    {
      title: 'Аналитика и отчеты',
      href: '/admin',
      description: 'Настроить отслеживание метрик',
      icon: <BarChart3 className="w-5 h-5" />
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'fail':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'preparing':
        return <Clock className="w-5 h-5 text-blue-400" />;
      default:
        return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'bg-green-500/20 border-green-500/30 text-green-400';
      case 'warning':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
      case 'fail':
        return 'bg-red-500/20 border-red-500/30 text-red-400';
      case 'preparing':
        return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
      default:
        return 'bg-slate-500/20 border-slate-500/30 text-slate-400';
    }
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <UnifiedHeader />
      
      <div className="container mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Система мониторинга</h1>
          </div>
          <p className="text-slate-300 text-lg mb-6">
            Контроль состояния и готовности системы к продакшену
          </p>
          
          {/* Overall Status */}
          <div className="inline-flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl px-6 py-3">
            {getStatusIcon(getOverallStatus())}
            <span className="text-white font-medium">
              Система {getOverallStatus() === 'critical' ? 'требует внимания' : 
                      getOverallStatus() === 'warning' ? 'в тестовом режиме' : 'активна'}
            </span>
            <span className="text-slate-400 text-sm">
              • Последняя проверка: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Readiness Progress */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 col-span-full lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Готовность к продакшену
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-white">{readinessProgress}%</span>
                  <Badge className="bg-red-500/20 border-red-500/30 text-red-400">
                    Не готова
                  </Badge>
                </div>
                <Progress value={readinessProgress} className="h-3 bg-slate-700" />
                <p className="text-slate-400 text-sm">
                  Исправьте критические ошибки для запуска в продакшен
                </p>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Тестирование
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-400">
                  preparing
                </Badge>
                <p className="text-slate-300 text-sm">
                  Система в тестовом режиме
                </p>
                <p className="text-slate-400 text-xs">
                  Система находится в режиме тестирования и разработки
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Статус компонентов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Работают:</span>
                  <span className="text-green-400">1/5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Предупреждения:</span>
                  <span className="text-yellow-400">2/5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Ошибки:</span>
                  <span className="text-red-400">2/5</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Diagnostics */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">Детальная диагностика</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemMetrics.map((metric) => (
              <Card key={metric.id} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {metric.icon}
                      <span className="text-sm font-medium">{metric.name}</span>
                    </div>
                    {getStatusIcon(metric.status)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status === 'pass' ? 'pass' : 
                     metric.status === 'warning' ? 'warning' : 'fail'}
                  </Badge>
                  <p className="text-slate-300 text-sm">{metric.description}</p>
                  {metric.action && (
                    <div className="pt-2 border-t border-slate-700">
                      <p className="text-slate-400 text-xs mb-2">Действие:</p>
                      <p className="text-slate-300 text-xs">{metric.action}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Production Launch Block */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-sm border-red-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Ban className="w-5 h-5 text-red-400" />
                Запуск в продакшен
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-red-400 font-medium">
                    Система не готова к запуску в продакшен
                  </span>
                  <Badge className="bg-red-500/20 border-red-500/30 text-red-400">
                    Запуск заблокирован
                  </Badge>
                </div>
                <p className="text-slate-300 text-sm">
                  Исправьте критические ошибки перед запуском системы в производственный режим.
                </p>
                <Button 
                  disabled 
                  className="w-full bg-slate-700 text-slate-500 cursor-not-allowed"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Запустить в продакшен (заблокировано)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">Быстрые ссылки</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link) => (
              <Card key={link.title} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-700/50 transition-colors cursor-pointer group">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {link.icon}
                      <span className="text-sm font-medium">{link.title}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-sm">{link.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button 
            onClick={runDiagnostics}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Zap className="w-4 h-4 mr-2" />
            {loading ? 'Проверка...' : 'Обновить диагностику'}
          </Button>
          
          <Button 
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            <Settings className="w-4 h-4 mr-2" />
            Открыть настройки
          </Button>
        </div>
      </div>

      <EnhancedFooter />
    </div>
  );
}