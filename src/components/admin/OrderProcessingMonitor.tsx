import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Zap,
  TrendingUp,
  RefreshCw,
  Eye
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ProcessingMetrics {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  completedOrders: number;
  failedOrders: number;
  successRate: number;
  averageProcessingTime: number;
  recentActivity: OrderActivity[];
}

interface OrderActivity {
  id: string;
  orderId: string;
  serviceName: string;
  status: string;
  timestamp: string;
  processingTime?: number;
  errorMessage?: string;
}

export default function OrderProcessingMonitor() {
  const [metrics, setMetrics] = useState<ProcessingMetrics>({
    totalOrders: 0,
    pendingOrders: 0,
    processingOrders: 0,
    completedOrders: 0,
    failedOrders: 0,
    successRate: 0,
    averageProcessingTime: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [realTimeEnabled, setRealTimeEnabled] = useState(false);

  const loadMetrics = async () => {
    try {
      // Загружаем статистику заказов
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('id, service_name, status, created_at, completed_at')
        .order('created_at', { ascending: false })
        .limit(100);

      if (ordersError) throw ordersError;

      // Загружаем активность по контенту
      const { data: contentActivity, error: contentError } = await supabase
        .from('generated_content_versions')
        .select(`
          id,
          order_id,
          created_at,
          order:orders(service_name, status)
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      if (contentError) throw contentError;

      // Подсчитываем метрики
      const total = orders?.length || 0;
      const pending = orders?.filter(o => o.status === 'pending').length || 0;
      const processing = orders?.filter(o => o.status === 'processing').length || 0;
      const completed = orders?.filter(o => o.status === 'completed').length || 0;
      const failed = orders?.filter(o => o.status === 'failed').length || 0;
      
      const successRate = total > 0 ? (completed / total) * 100 : 0;
      
      // Вычисляем среднее время обработки
      const completedWithTime = orders?.filter(o => 
        o.status === 'completed' && o.completed_at && o.created_at
      ) || [];
      
      const avgTime = completedWithTime.length > 0 
        ? completedWithTime.reduce((acc, order) => {
            const start = new Date(order.created_at).getTime();
            const end = new Date(order.completed_at!).getTime();
            return acc + (end - start);
          }, 0) / completedWithTime.length / 1000 / 60 // в минутах
        : 0;

      // Формируем активность
      const activity: OrderActivity[] = (contentActivity || []).map(item => ({
        id: item.id,
        orderId: item.order_id,
        serviceName: (item.order as any)?.service_name || 'Неизвестно',
        status: 'completed',
        timestamp: item.created_at,
      }));

      setMetrics({
        totalOrders: total,
        pendingOrders: pending,
        processingOrders: processing,
        completedOrders: completed,
        failedOrders: failed,
        successRate,
        averageProcessingTime: avgTime,
        recentActivity: activity
      });

    } catch (error) {
      console.error('Error loading metrics:', error);
      toast({
        title: "Ошибка загрузки метрик",
        description: "Не удалось загрузить данные мониторинга",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const setupRealTimeMonitoring = () => {
    if (realTimeEnabled) return;

    const ordersChannel = supabase
      .channel('orders-monitoring')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          console.log('Order change detected:', payload);
          loadMetrics(); // Перезагружаем метрики при изменениях
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'generated_content_versions'
        },
        (payload) => {
          console.log('Content generated:', payload);
          loadMetrics();
        }
      )
      .subscribe();

    setRealTimeEnabled(true);

    return () => {
      supabase.removeChannel(ordersChannel);
      setRealTimeEnabled(false);
    };
  };

  useEffect(() => {
    loadMetrics();
    const cleanup = setupRealTimeMonitoring();
    
    // Автоматическое обновление каждые 30 секунд
    const interval = setInterval(loadMetrics, 30000);

    return () => {
      cleanup?.();
      clearInterval(interval);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Мониторинг обработки заказов</h2>
          <p className="text-muted-foreground">
            Real-time отслеживание автоматической обработки заказов
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant={realTimeEnabled ? "default" : "secondary"}>
            <Activity className="h-3 w-3 mr-1" />
            {realTimeEnabled ? 'Real-time ON' : 'Real-time OFF'}
          </Badge>
          <Button onClick={loadMetrics} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Обновить
          </Button>
        </div>
      </div>

      {/* Метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего заказов</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              За последние 100 заказов
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">В обработке</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {metrics.pendingOrders + metrics.processingOrders}
            </div>
            <p className="text-xs text-muted-foreground">
              Ожидают: {metrics.pendingOrders}, Обрабатываются: {metrics.processingOrders}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Успешность</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {metrics.successRate.toFixed(1)}%
            </div>
            <Progress 
              value={metrics.successRate} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Среднее время</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.averageProcessingTime.toFixed(1)}м
            </div>
            <p className="text-xs text-muted-foreground">
              От создания до готовности
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">
            <Activity className="h-4 w-4 mr-2" />
            Активность
          </TabsTrigger>
          <TabsTrigger value="status">
            <CheckCircle className="h-4 w-4 mr-2" />
            Статусы заказов
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Последняя активность</CardTitle>
              <CardDescription>
                Недавно обработанные заказы и сгенерированный контент
              </CardDescription>
            </CardHeader>
            <CardContent>
              {metrics.recentActivity.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Нет активности</h3>
                  <p className="text-muted-foreground">
                    Недавняя активность по обработке заказов не найдена
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {metrics.recentActivity.map((activity) => (
                    <div 
                      key={activity.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{activity.serviceName}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {activity.orderId.slice(0, 8)}... • 
                          {new Date(activity.timestamp).toLocaleString()}
                        </div>
                        {activity.errorMessage && (
                          <div className="text-sm text-red-600 mt-1">
                            Ошибка: {activity.errorMessage}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {activity.processingTime && (
                          <span className="text-xs text-muted-foreground">
                            {activity.processingTime}мс
                          </span>
                        )}
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status === 'completed' ? 'Контент готов' : activity.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Успешные ({metrics.completedOrders})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {metrics.completedOrders}
                </div>
                <p className="text-muted-foreground">
                  Заказы успешно обработаны и контент сгенерирован
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  Ошибки ({metrics.failedOrders})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">
                  {metrics.failedOrders}
                </div>
                <p className="text-muted-foreground">
                  Заказы с ошибками обработки
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}