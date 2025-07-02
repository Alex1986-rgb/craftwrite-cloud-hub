import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Settings,
  PlayCircle,
  RotateCcw,
  Database,
  Zap
} from 'lucide-react';
import { useSystemDiagnostics } from '@/hooks/useSystemDiagnostics';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import OrderProcessingMonitor from './OrderProcessingMonitor';

export default function SystemDiagnostics() {
  const { diagnostics, loading, error, runDiagnostics, getOverallStatus } = useSystemDiagnostics();
  const [testingTrigger, setTestingTrigger] = useState(false);
  const [creatingTestOrder, setCreatingTestOrder] = useState(false);

  const createTestOrder = async () => {
    setCreatingTestOrder(true);
    try {
      const testOrder = {
        service_name: `Тест системы ${new Date().toLocaleTimeString()}`,
        service_slug: 'seo-article',
        contact_name: 'Система Диагностики',
        contact_email: `test-${Date.now()}@copypro.cloud`,
        details: 'Автоматический тест системы обработки заказов. Этот заказ создан для проверки работоспособности триггеров и Edge Functions.',
        additional_requirements: 'Тестирование: автоматическая генерация контента, уведомления.',
        status: 'pending',
        estimated_price: 1500,
        service_options: {
          target_audience: 'тестировщики',
          seo_keywords: ['тест', 'автоматизация', 'диагностика'],
          article_length: '800-1000'
        }
      };

      const { data, error: orderError } = await supabase
        .from('orders')
        .insert(testOrder)
        .select()
        .single();

      if (orderError) throw orderError;

      toast({
        title: "Тестовый заказ создан",
        description: `ID: ${data.id.slice(0, 8)}... Отслеживайте его обработку в мониторе`,
      });

      // Перезапускаем диагностику через 2 секунды
      setTimeout(() => {
        runDiagnostics();
      }, 2000);

    } catch (err) {
      console.error('Error creating test order:', err);
      toast({
        title: "Ошибка создания тестового заказа",
        description: err instanceof Error ? err.message : 'Неизвестная ошибка',
        variant: "destructive"
      });
    } finally {
      setCreatingTestOrder(false);
    }
  };

  const testTrigger = async () => {
    setTestingTrigger(true);
    try {
      // Проверяем наличие триггера
      const { data: triggers, error: triggerError } = await supabase
        .from('information_schema.triggers')
        .select('trigger_name, event_manipulation, action_statement')
        .eq('trigger_schema', 'public')
        .eq('event_object_table', 'orders');

      if (triggerError) throw triggerError;

      const hasProcessingTrigger = triggers?.some(t => 
        t.trigger_name?.includes('processing') || 
        t.action_statement?.includes('process-order-workflow')
      );

      if (!hasProcessingTrigger) {
        throw new Error('Триггер автоматической обработки не найден');
      }

      // Проверяем настройки системы
      const { data: settings, error: settingsError } = await supabase
        .from('system_settings')
        .select('key, value')
        .in('key', ['auto_processing_trigger_enabled', 'trigger_fixed_status']);

      if (settingsError) throw settingsError;

      const triggerEnabled = settings?.find(s => s.key === 'auto_processing_trigger_enabled')?.value === 'true';
      const triggerFixed = settings?.find(s => s.key === 'trigger_fixed_status')?.value === '"completed"';

      toast({
        title: "Диагностика триггера",
        description: `Триггер: ${hasProcessingTrigger ? '✅' : '❌'} | Включен: ${triggerEnabled ? '✅' : '❌'} | Исправлен: ${triggerFixed ? '✅' : '❌'}`,
      });

    } catch (err) {
      console.error('Error testing trigger:', err);
      toast({
        title: "Ошибка тестирования триггера",
        description: err instanceof Error ? err.message : 'Неизвестная ошибка',
        variant: "destructive"
      });
    } finally {
      setTestingTrigger(false);
    }
  };

  const configureServiceRoleKey = async () => {
    const serviceRoleKey = prompt('Введите Supabase Service Role Key:');
    if (!serviceRoleKey) return;

    try {
      const { error } = await supabase
        .from('system_settings')
        .update({ value: JSON.stringify(serviceRoleKey) })
        .eq('key', 'supabase_service_role_key');

      if (error) throw error;

      toast({
        title: "Service Role Key обновлен",
        description: "Ключ успешно сохранен в системных настройках",
      });

      // Перезапускаем диагностику
      setTimeout(() => {
        runDiagnostics();
      }, 1000);

    } catch (err) {
      console.error('Error updating service role key:', err);
      toast({
        title: "Ошибка обновления ключа",
        description: err instanceof Error ? err.message : 'Неизвестная ошибка',
        variant: "destructive"
      });
    }
  };

  const reprocessStuckOrders = async () => {
    try {
      // Находим заказы, которые долго висят в статусе pending
      const { data: stuckOrders, error: ordersError } = await supabase
        .from('orders')
        .select('id, service_name, created_at')
        .eq('status', 'pending')
        .lt('created_at', new Date(Date.now() - 5 * 60 * 1000).toISOString()); // старше 5 минут

      if (ordersError) throw ordersError;

      if (!stuckOrders || stuckOrders.length === 0) {
        toast({
          title: "Нет застрявших заказов",
          description: "Все заказы обрабатываются нормально",
        });
        return;
      }

      // Перезапускаем обработку для каждого застрявшего заказа
      for (const order of stuckOrders) {
        await supabase.rpc('reprocess_order', { order_id: order.id });
      }

      toast({
        title: "Перезапуск обработки",
        description: `Перезапущена обработка ${stuckOrders.length} заказов`,
      });

    } catch (err) {
      console.error('Error reprocessing orders:', err);
      toast({
        title: "Ошибка перезапуска",
        description: err instanceof Error ? err.message : 'Неизвестная ошибка',
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Здоровая</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800"><AlertTriangle className="h-3 w-3 mr-1" />Предупреждения</Badge>;
      case 'critical':
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="h-3 w-3 mr-1" />Критическая</Badge>;
      default:
        return <Badge variant="secondary">Неизвестно</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Диагностика системы</h2>
          <p className="text-muted-foreground">
            Проверка работоспособности автоматической обработки заказов
          </p>
        </div>
        <div className="flex gap-2">
          {getStatusBadge(getOverallStatus())}
          <Button onClick={runDiagnostics} disabled={loading} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Обновить
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Ошибка диагностики: {error}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <Activity className="h-4 w-4 mr-2" />
            Обзор
          </TabsTrigger>
          <TabsTrigger value="monitoring">
            <Database className="h-4 w-4 mr-2" />
            Мониторинг заказов
          </TabsTrigger>
          <TabsTrigger value="testing">
            <PlayCircle className="h-4 w-4 mr-2" />
            Тестирование
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {diagnostics.map((diagnostic, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    {diagnostic.status === 'pass' && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {diagnostic.status === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                    {diagnostic.status === 'fail' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    {diagnostic.check_name}
                  </CardTitle>
                  <CardDescription className="capitalize">{diagnostic.check_type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant={
                    diagnostic.status === 'pass' ? 'default' : 
                    diagnostic.status === 'warning' ? 'secondary' : 'destructive'
                  }>
                    {diagnostic.status === 'pass' ? 'Пройдено' :
                     diagnostic.status === 'warning' ? 'Предупреждение' : 'Ошибка'}
                  </Badge>
                  {diagnostic.error_message && (
                    <p className="text-sm text-red-600 mt-2">{diagnostic.error_message}</p>
                  )}
                  {diagnostic.details && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      {Object.entries(diagnostic.details).map(([key, value]) => (
                        <div key={key}>
                          <span className="font-medium">{key}:</span> {String(value)}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring">
          <OrderProcessingMonitor />
        </TabsContent>

        <TabsContent value="testing">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5" />
                  Тестирование системы
                </CardTitle>
                <CardDescription>
                  Создание тестовых заказов и проверка автоматической обработки
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={createTestOrder} 
                  disabled={creatingTestOrder}
                  className="w-full"
                >
                  {creatingTestOrder ? 'Создание...' : 'Создать тестовый заказ'}
                </Button>
                
                <Button 
                  onClick={testTrigger} 
                  disabled={testingTrigger}
                  variant="outline"
                  className="w-full"
                >
                  {testingTrigger ? 'Проверка...' : 'Проверить триггер'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Управление
                </CardTitle>
                <CardDescription>
                  Ручное управление процессами и исправление проблем
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={configureServiceRoleKey}
                  variant="default"
                  className="w-full"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Настроить Service Role Key
                </Button>

                <Button 
                  onClick={reprocessStuckOrders}
                  variant="outline"
                  className="w-full"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Перезапустить застрявшие заказы
                </Button>
                
                <Button 
                  onClick={runDiagnostics}
                  disabled={loading}
                  variant="outline"
                  className="w-full"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Полная диагностика
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}