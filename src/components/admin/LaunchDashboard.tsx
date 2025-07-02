import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Play, Monitor, Settings, Rocket, Clock } from 'lucide-react';
import SystemTester from './SystemTester';
import { useTelegramIntegration } from '@/hooks/useTelegramIntegration';
import { useAdvancedAnalytics } from '@/hooks/useAdvancedAnalytics';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface LaunchStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  icon: any;
  component?: React.ReactNode;
}

export default function LaunchDashboard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [systemTestsPassed, setSystemTestsPassed] = useState(false);
  const [notificationsSetup, setNotificationsSetup] = useState(false);
  const [metricsEnabled, setMetricsEnabled] = useState(false);
  const [productionReady, setProductionReady] = useState(false);
  
  const { integration } = useTelegramIntegration();
  const { kpis, updateKPIs } = useAdvancedAnalytics();

  const checkNotificationSetup = async () => {
    try {
      // Проверяем настройки уведомлений
      const { data: emailSettings } = await supabase
        .from('system_settings')
        .select('*')
        .eq('key', 'email_notifications_enabled')
        .single();

      const telegramActive = integration?.is_active || false;
      const emailActive = emailSettings?.value?.enabled || false;

      setNotificationsSetup(telegramActive || emailActive);
    } catch (error) {
      console.error('Error checking notifications:', error);
    }
  };

  const checkMetrics = () => {
    setMetricsEnabled(kpis.length > 0);
  };

  const [steps, setSteps] = useState<LaunchStep[]>([
    {
      id: 'testing',
      title: 'Финальное тестирование',
      description: 'Запуск всех автотестов системы',
      status: 'pending',
      icon: Play,
      component: <SystemTester />
    },
    {
      id: 'notifications',
      title: 'Настройка уведомлений',
      description: 'Проверка Email/Telegram интеграций',
      status: 'pending',
      icon: Settings
    },
    {
      id: 'monitoring',
      title: 'Мониторинг метрик',
      description: 'Настройка отслеживания KPI',
      status: 'pending',
      icon: Monitor
    },
    {
      id: 'launch',
      title: 'Запуск в продакшн',
      description: 'Система готова к работе',
      status: 'pending',
      icon: Rocket
    }
  ]);

  useEffect(() => {
    checkNotificationSetup();
    checkMetrics();
  }, [integration, kpis]);

  useEffect(() => {
    // Обновляем статусы шагов
    setSteps(prev => prev.map(step => {
      switch (step.id) {
        case 'testing':
          return { ...step, status: systemTestsPassed ? 'completed' : 'pending' };
        case 'notifications':
          return { ...step, status: notificationsSetup ? 'completed' : 'pending' };
        case 'monitoring':
          return { ...step, status: metricsEnabled ? 'completed' : 'pending' };
        case 'launch':
          return { 
            ...step, 
            status: (systemTestsPassed && notificationsSetup && metricsEnabled) ? 'completed' : 'pending' 
          };
        default:
          return step;
      }
    }));

    setProductionReady(systemTestsPassed && notificationsSetup && metricsEnabled);
  }, [systemTestsPassed, notificationsSetup, metricsEnabled]);

  const runStep = async (stepId: string, stepIndex: number) => {
    setCurrentStep(stepIndex);
    
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status: 'in_progress' } : step
    ));

    try {
      switch (stepId) {
        case 'testing':
          // Тесты запускаются через компонент SystemTester
          toast({
            title: "Тестирование запущено",
            description: "Проверьте результаты тестов ниже"
          });
          break;
          
        case 'notifications':
          await checkNotificationSetup();
          
          if (!integration?.is_active) {
            toast({
              title: "Настройте Telegram",
              description: "Перейдите в настройки для настройки уведомлений",
              variant: "destructive"
            });
            return;
          }
          
          setNotificationsSetup(true);
          toast({
            title: "Уведомления настроены",
            description: "Telegram интеграция активна"
          });
          break;
          
        case 'monitoring':
          await updateKPIs();
          setMetricsEnabled(true);
          toast({
            title: "Мониторинг активирован",
            description: "KPI метрики обновлены"
          });
          break;
          
        case 'launch':
          if (productionReady) {
            // Обновляем системную настройку о готовности к продакшн
            await supabase
              .from('system_settings')
              .upsert({
                key: 'production_ready',
                value: { enabled: true, timestamp: new Date().toISOString() },
                description: 'Система готова к продакшн запуску'
              });
            
            setProductionReady(true);
            toast({
              title: "🚀 Система запущена!",
              description: "CopyPro Cloud готов принимать заказы",
            });
          }
          break;
      }
    } catch (error: any) {
      console.error('Error running step:', error);
      setSteps(prev => prev.map(step => 
        step.id === stepId ? { ...step, status: 'failed' } : step
      ));
      
      toast({
        title: "Ошибка выполнения",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getStatusIcon = (status: LaunchStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <div className="h-5 w-5 rounded-full bg-gray-300" />;
    }
  };

  const getStatusBadge = (status: LaunchStep['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Завершено</Badge>;
      case 'failed':
        return <Badge variant="destructive">Ошибка</Badge>;
      case 'in_progress':
        return <Badge variant="secondary">Выполняется</Badge>;
      default:
        return <Badge variant="outline">Ожидает</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">🚀 Запуск системы</h1>
          <p className="text-muted-foreground">
            Пошаговая подготовка CopyPro Cloud к продакшн запуску
          </p>
        </div>
        {productionReady && (
          <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
            ✅ Готово к запуску
          </Badge>
        )}
      </div>

      {/* Прогресс */}
      <Card>
        <CardHeader>
          <CardTitle>Прогресс запуска</CardTitle>
          <CardDescription>
            {steps.filter(s => s.status === 'completed').length} из {steps.length} шагов завершено
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center space-y-2">
                <div className={`p-3 rounded-full ${
                  step.status === 'completed' ? 'bg-green-100' :
                  step.status === 'in_progress' ? 'bg-blue-100' :
                  step.status === 'failed' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  <step.icon className={`h-6 w-6 ${
                    step.status === 'completed' ? 'text-green-600' :
                    step.status === 'in_progress' ? 'text-blue-600' :
                    step.status === 'failed' ? 'text-red-600' : 'text-gray-400'
                  }`} />
                </div>
                <span className="text-sm text-center max-w-24">{step.title}</span>
                {index < steps.length - 1 && (
                  <div className={`h-1 w-12 ${
                    step.status === 'completed' ? 'bg-green-300' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Шаги запуска */}
      <div className="grid gap-6">
        {steps.map((step, index) => (
          <Card key={step.id} className="transition-all duration-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(step.status)}
                  <div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(step.status)}
                  <Button
                    onClick={() => runStep(step.id, index)}
                    disabled={step.status === 'in_progress'}
                    variant={step.status === 'completed' ? 'outline' : 'default'}
                  >
                    {step.status === 'completed' ? 'Повторить' : 
                     step.status === 'in_progress' ? 'Выполняется...' : 'Запустить'}
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            {/* Показываем компонент для текущего шага */}
            {currentStep === index && step.component && (
              <CardContent>
                <div className="border-t pt-6">
                  {step.component}
                </div>
              </CardContent>
            )}
            
            {/* Дополнительная информация для каждого шага */}
            {step.id === 'notifications' && (
              <CardContent>
                <Alert>
                  <Settings className="h-4 w-4" />
                  <AlertDescription>
                    Статус: Telegram - {integration?.is_active ? '✅ Активен' : '❌ Не настроен'}
                    <br />
                    {!integration?.is_active && 'Перейдите в Настройки → Telegram для настройки уведомлений'}
                  </AlertDescription>
                </Alert>
              </CardContent>
            )}
            
            {step.id === 'monitoring' && (
              <CardContent>
                <Alert>
                  <Monitor className="h-4 w-4" />
                  <AlertDescription>
                    KPI метрики: {kpis.length > 0 ? `✅ Активно (${kpis.length} метрик)` : '❌ Не настроено'}
                    <br />
                    {kpis.length === 0 && 'Метрики будут автоматически обновлены при запуске мониторинга'}
                  </AlertDescription>
                </Alert>
              </CardContent>
            )}
            
            {step.id === 'launch' && productionReady && (
              <CardContent>
                <Alert>
                  <Rocket className="h-4 w-4" />
                  <AlertDescription>
                    🎉 <strong>Система полностью готова!</strong>
                    <br />
                    • Все тесты пройдены успешно
                    <br />
                    • Уведомления настроены и работают
                    <br />
                    • Мониторинг метрик активирован
                    <br />
                    • CopyPro Cloud готов принимать реальные заказы
                  </AlertDescription>
                </Alert>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Финальное сообщение */}
      {productionReady && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="text-4xl">🎉</div>
              <h3 className="text-2xl font-bold text-green-800">
                CopyPro Cloud успешно запущен!
              </h3>
              <p className="text-green-700">
                Система готова принимать заказы и генерировать качественный контент.
                Все компоненты протестированы и работают корректно.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Перейти к заказам
                </Button>
                <Button variant="outline" size="lg">
                  Открыть аналитику
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}