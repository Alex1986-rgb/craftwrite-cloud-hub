import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Rocket, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Settings,
  Database,
  Monitor,
  Zap,
  Shield,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { useSystemSettings } from '@/hooks/useSystemSettings';
import { useSystemDiagnostics } from '@/hooks/useSystemDiagnostics';
import { toast } from '@/hooks/use-toast';

export default function ProductionLaunchManager() {
  const [launching, setLaunching] = useState(false);
  const { getSetting, updateSetting } = useSystemSettings();
  const { diagnostics, runDiagnostics, getOverallStatus } = useSystemDiagnostics();

  const isProductionMode = getSetting('production_mode', false);
  const launchStatus = getSetting('launch_status', 'preparing');
  const analyticsEnabled = getSetting('analytics_enabled', false);
  const googleAnalyticsId = getSetting('google_analytics_id', '');
  const yandexMetricaId = getSetting('yandex_metrica_id', '');

  const getReadinessChecks = () => {
    return [
      {
        name: 'Аналитика настроена',
        status: analyticsEnabled && googleAnalyticsId && yandexMetricaId ? 'pass' : 'fail',
        description: 'Google Analytics и Яндекс.Метрика должны быть настроены',
        action: 'Настроить ID аналитики в системных настройках'
      },
      {
        name: 'Система диагностики',
        status: getOverallStatus() === 'healthy' ? 'pass' : getOverallStatus() === 'warning' ? 'warning' : 'fail',
        description: 'Все системные проверки должны проходить успешно',
        action: 'Проверить результаты диагностики и исправить ошибки'
      },
      {
        name: 'База данных',
        status: diagnostics.some(d => d.check_type === 'database' && d.status === 'pass') ? 'pass' : 'fail',
        description: 'Подключение к базе данных должно работать стабильно',
        action: 'Проверить подключение к Supabase'
      },
      {
        name: 'Обработка заказов',
        status: getSetting('order_auto_processing_enabled', false) ? 'pass' : 'warning',
        description: 'Автоматическая обработка заказов должна быть включена',
        action: 'Включить автоматическую обработку заказов'
      },
      {
        name: 'Система уведомлений',
        status: getSetting('notification_system_enabled', false) ? 'pass' : 'warning',
        description: 'Система уведомлений должна быть настроена',
        action: 'Настроить email и Telegram уведомления'
      }
    ];
  };

  const readinessChecks = getReadinessChecks();
  const passedChecks = readinessChecks.filter(check => check.status === 'pass').length;
  const totalChecks = readinessChecks.length;
  const readinessPercent = Math.round((passedChecks / totalChecks) * 100);
  const isReadyForProduction = passedChecks >= totalChecks - 1; // Allow 1 warning

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Monitor className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'fail':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const handleLaunchToProduction = async () => {
    if (!isReadyForProduction) {
      toast({
        title: "Система не готова",
        description: "Исправьте критические ошибки перед запуском в продакшен",
        variant: "destructive"
      });
      return;
    }

    try {
      setLaunching(true);

      // Update system settings for production
      await updateSetting('production_mode', true);
      await updateSetting('launch_status', 'production');
      await updateSetting('error_monitoring_enabled', true);
      await updateSetting('performance_monitoring_enabled', true);

      toast({
        title: "Запуск в продакшен успешен!",
        description: "Система переведена в режим продакшена"
      });

      // Run diagnostics after launch
      await runDiagnostics();

    } catch (error) {
      toast({
        title: "Ошибка запуска",
        description: "Не удалось перевести систему в продакшен",
        variant: "destructive"
      });
    } finally {
      setLaunching(false);
    }
  };

  const handleReturnToTesting = async () => {
    try {
      await updateSetting('production_mode', false);
      await updateSetting('launch_status', 'testing');

      toast({
        title: "Возврат в тестовый режим",
        description: "Система переведена в тестовый режим"
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось изменить режим системы",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Управление запуском в продакшен</h2>
          <p className="text-muted-foreground">
            Проверка готовности и запуск системы в производственный режим
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge 
            variant={isProductionMode ? "default" : "secondary"}
            className="px-3 py-1"
          >
            {isProductionMode ? 'Продакшен' : 'Тестирование'}
          </Badge>
          <Badge variant="outline">
            {launchStatus}
          </Badge>
        </div>
      </div>

      {/* Current Status */}
      <Card className={`border-2 ${isProductionMode ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            {isProductionMode ? (
              <Rocket className="w-8 h-8 text-green-600" />
            ) : (
              <Settings className="w-8 h-8 text-yellow-600" />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {isProductionMode ? 'Система в продакшене' : 'Система в тестовом режиме'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isProductionMode 
                  ? 'Все функции активны, система готова к работе с клиентами'
                  : 'Система находится в режиме тестирования и разработки'
                }
              </p>
            </div>
            {isProductionMode && (
              <Button
                onClick={handleReturnToTesting}
                variant="outline"
                size="sm"
              >
                Вернуть в тестирование
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Readiness Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Готовность к продакшену
          </CardTitle>
          <div className="flex items-center gap-4">
            <Progress value={readinessPercent} className="flex-1" />
            <span className="text-sm font-medium">{readinessPercent}%</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {readinessChecks.map((check, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border-2 ${getStatusColor(check.status)}`}
              >
                <div className="flex items-start gap-3">
                  {getStatusIcon(check.status)}
                  <div className="flex-1">
                    <div className="font-medium">{check.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {check.description}
                    </div>
                    {check.status !== 'pass' && (
                      <div className="text-sm mt-2 p-2 bg-white rounded border">
                        <strong>Действие:</strong> {check.action}
                      </div>
                    )}
                  </div>
                  <Badge className={getStatusColor(check.status)}>
                    {check.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Launch Actions */}
      {!isProductionMode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              Запуск в продакшен
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isReadyForProduction ? (
              <div className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Система готова к запуску в продакшен. Все критические проверки пройдены.
                  </AlertDescription>
                </Alert>
                <Button
                  onClick={handleLaunchToProduction}
                  disabled={launching}
                  size="lg"
                  className="w-full"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  {launching ? 'Запуск...' : 'Запустить в продакшен'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Система не готова к запуску в продакшен. Исправьте критические ошибки.
                  </AlertDescription>
                </Alert>
                <Button disabled size="lg" className="w-full">
                  <XCircle className="w-4 h-4 mr-2" />
                  Запуск заблокирован
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Быстрые ссылки
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Системные настройки</div>
                <div className="text-sm text-muted-foreground">
                  Настроить аналитику и интеграции
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Мониторинг системы</div>
                <div className="text-sm text-muted-foreground">
                  Проверить статус всех компонентов
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Управление заказами</div>
                <div className="text-sm text-muted-foreground">
                  Настроить автоматическую обработку
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Аналитика и отчеты</div>
                <div className="text-sm text-muted-foreground">
                  Настроить отслеживание метрик
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}