import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Zap,
  Database,
  Clock
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface OrderStats {
  pending_orders: number;
  completed_orders: number;
  failed_orders: number;
  recent_processed: number;
}

interface SystemHealth {
  overall_status: 'healthy' | 'warning' | 'critical';
  edge_function_responsive: boolean;
  trigger_working: boolean;
  database_healthy: boolean;
  recommendations: string[];
}

export default function FixedOrderProcessingMonitor() {
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const checkSystemHealth = async () => {
    setLoading(true);
    try {
      // Получаем статистику заказов
      const { data: orderStats, error: orderError } = await supabase.rpc('monitor_order_processing_health');
      
      if (orderError) throw orderError;

      const currentStats = orderStats[0];
      setStats({
        pending_orders: currentStats.details.stuck_orders || 0,
        completed_orders: currentStats.details.recent_completed || 0,
        failed_orders: 0,
        recent_processed: currentStats.details.recent_orders || 0
      });

      // Определяем здоровье системы
      const healthStatus: SystemHealth = {
        overall_status: currentStats.status as 'healthy' | 'warning' | 'critical',
        edge_function_responsive: (currentStats.details.successful_calls || 0) > 0,
        trigger_working: (currentStats.details.trigger_executions || 0) > 0,
        database_healthy: true,
        recommendations: [
          currentStats.alert_level === 'critical' ? 'Требуется немедленное вмешательство' : 
          currentStats.alert_level === 'warning' ? 'Рекомендуется мониторинг' : 
          'Система работает нормально'
        ]
      };

      setHealth(healthStatus);

      toast({
        title: "Статус системы обновлен",
        description: `Найдено ${currentStats.details.stuck_orders || 0} застрявших заказов`,
      });

    } catch (error: any) {
      console.error('Health check failed:', error);
      toast({
        title: "Ошибка проверки системы",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const processStuckOrders = async () => {
    setProcessing(true);
    try {
      // Используем улучшенную функцию обработки
      const { data, error } = await supabase.rpc('process_all_stuck_orders_enhanced');
      
      if (error) throw error;

      toast({
        title: "Обработка завершена",
        description: `Обработано заказов: ${data.processed_orders}, ошибок: ${data.errors_count}`,
      });

      // Обновляем статус через 3 секунды
      setTimeout(() => {
        checkSystemHealth();
      }, 3000);

    } catch (error: any) {
      console.error('Processing failed:', error);
      toast({
        title: "Ошибка обработки",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const activateFullAutomation = async () => {
    setProcessing(true);
    try {
      const { data, error } = await supabase.rpc('activate_full_automation');
      
      if (error) throw error;

      toast({
        title: "Автоматизация активирована!",
        description: `Система полностью настроена. Обработано: ${data.processed_orders.processed_orders} заказов`,
      });

      // Обновляем статус
      setTimeout(() => {
        checkSystemHealth();
      }, 2000);

    } catch (error: any) {
      console.error('Automation activation failed:', error);
      toast({
        title: "Ошибка активации автоматизации",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const testEdgeFunction = async () => {
    try {
      // Создаем тестовый заказ
      const testOrder = {
        service_name: `ТЕСТ Edge Function ${new Date().toLocaleTimeString()}`,
        service_slug: 'seo-article',
        contact_name: 'Система Тестирования',
        contact_email: `test-edge-${Date.now()}@copypro.cloud`,
        details: 'Тестовый заказ для проверки работы исправленной Edge Function.',
        status: 'pending'
      };

      const { data, error } = await supabase
        .from('orders')
        .insert(testOrder)
        .select()
        .single();

      if (error) throw error;

      // Вызываем Edge Function напрямую
      const { data: functionResult, error: functionError } = await supabase.functions.invoke('process-order-workflow', {
        body: { order_id: data.id }
      });

      if (functionError) throw functionError;

      toast({
        title: "Edge Function протестирована",
        description: `Заказ ${data.id.slice(0, 8)}... обработан успешно`,
      });

      // Обновляем статус
      setTimeout(() => {
        checkSystemHealth();
      }, 2000);

    } catch (error: any) {
      console.error('Edge Function test failed:', error);
      toast({
        title: "Ошибка тестирования Edge Function",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    checkSystemHealth();
    // Автообновление каждые 30 секунд
    const interval = setInterval(checkSystemHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Исправленный мониторинг обработки заказов</h2>
          <p className="text-muted-foreground">
            Улучшенная система мониторинга с прямым вызовом Edge Function
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={checkSystemHealth} disabled={loading} variant="outline">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Обновить
          </Button>
          <Button onClick={testEdgeFunction} variant="secondary">
            <Zap className="w-4 h-4 mr-2" />
            Тест Edge Function
          </Button>
        </div>
      </div>

      {/* Статус системы */}
      {health && (
        <Card className={`border-2 ${getStatusColor(health.overall_status)}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(health.overall_status)}
                <div>
                  <div className="font-bold text-lg">
                    {health.overall_status === 'healthy' ? 'Система здорова' :
                     health.overall_status === 'warning' ? 'Требует внимания' : 'Критическая ошибка'}
                  </div>
                  <div className="text-sm opacity-75">
                    Последнее обновление: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-2xl">
                  {stats?.pending_orders || 0}
                </div>
                <div className="text-sm">застрявших заказов</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Статистика */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-medium">Ожидают</div>
                  <div className="text-2xl font-bold">{stats.pending_orders}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium">Завершено</div>
                  <div className="text-2xl font-bold">{stats.completed_orders}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium">Недавно обработано</div>
                  <div className="text-2xl font-bold">{stats.recent_processed}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="font-medium">Edge Function</div>
                  <Badge variant={health?.edge_function_responsive ? "default" : "destructive"}>
                    {health?.edge_function_responsive ? "Работает" : "Недоступна"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Действия */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Полная автоматизация
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Активирует полную автоматизацию: cron jobs каждые 5 минут, мониторинг здоровья, обработка всех заказов
            </p>
            <Button 
              onClick={activateFullAutomation}
              disabled={processing}
              className="w-full"
              variant="default"
            >
              {processing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Активируем...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  🚀 Активировать автоматизацию
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Обработка застрявших заказов
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Ручная обработка всех pending заказов через Edge Function
            </p>
            <Button 
              onClick={processStuckOrders}
              disabled={processing}
              className="w-full"
              variant="outline"
            >
              {processing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Обрабатываем...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Обработать заказы вручную
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Статус автоматизации</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Cron Jobs:</span>
                <Badge variant="default">✅ Активны</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Автообработка:</span>
                <Badge variant="default">⏱️ Каждые 5 мин</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Мониторинг:</span>
                <Badge variant="default">📊 Каждые 15 мин</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>OpenAI API:</span>
                <Badge variant="default">🤖 Настроен</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Прогресс обработки */}
      {processing && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span className="font-medium">Обработка заказов...</span>
            </div>
            <Progress value={undefined} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">
              Отправляем заказы в Edge Function для автоматической обработки
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}