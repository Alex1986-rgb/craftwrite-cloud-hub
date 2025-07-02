import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Zap
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { logger } from '@/utils/logger';
import { ErrorHandler } from '@/utils/errorHandler';

interface DebugOrder {
  id: string;
  service_name: string;
  status: string;
  created_at: string;
  generated_prompt?: string;
  contact_email: string;
  service_slug: string;
}

export default function OrderProcessingDebug() {
  const [pendingOrders, setPendingOrders] = useState<DebugOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingOrder, setProcessingOrder] = useState<string | null>(null);

  const loadPendingOrders = async () => {
    try {
      setLoading(true);
      logger.info('Loading pending orders for debugging');
      
      const { data, error } = await supabase
        .from('orders')
        .select('id, service_name, status, created_at, generated_prompt, contact_email, service_slug')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      
      setPendingOrders(data || []);
      logger.info('Pending orders loaded', { count: data?.length || 0 });
      
    } catch (error) {
      ErrorHandler.handle(error, { context: 'loadPendingOrders' });
    } finally {
      setLoading(false);
    }
  };

  const manuallyProcessOrder = async (orderId: string) => {
    try {
      setProcessingOrder(orderId);
      logger.info('Manually processing order', { orderId });
      
      const { data, error } = await supabase.functions.invoke('process-order-workflow', {
        body: { order_id: orderId }
      });

      if (error) throw error;
      
      toast({
        title: "Заказ обработан",
        description: "Заказ успешно отправлен на обработку",
      });
      
      // Обновляем список
      await loadPendingOrders();
      
    } catch (error) {
      ErrorHandler.handle(error, { context: 'manuallyProcessOrder', orderId });
    } finally {
      setProcessingOrder(null);
    }
  };

  const processAllPending = async () => {
    try {
      setLoading(true);
      logger.info('Processing all pending orders');
      
      const promises = pendingOrders.map(order => 
        supabase.functions.invoke('process-order-workflow', {
          body: { order_id: order.id }
        })
      );
      
      await Promise.allSettled(promises);
      
      toast({
        title: "Обработка запущена",
        description: `Запущена обработка ${pendingOrders.length} заказов`,
      });
      
      // Обновляем список через некоторое время
      setTimeout(loadPendingOrders, 2000);
      
    } catch (error) {
      ErrorHandler.handle(error, { context: 'processAllPending' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Отладка обработки заказов</h2>
          <p className="text-muted-foreground">
            Диагностика и ручная обработка проблемных заказов
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={loadPendingOrders} 
            disabled={loading}
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Обновить
          </Button>
          <Button 
            onClick={processAllPending} 
            disabled={loading || pendingOrders.length === 0}
          >
            <Zap className="h-4 w-4 mr-2" />
            Обработать все
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Ожидающие заказы ({pendingOrders.length})
          </TabsTrigger>
          <TabsTrigger value="diagnostics">
            Диагностика системы
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {pendingOrders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Нет ожидающих заказов</h3>
                <p className="text-muted-foreground">
                  Все заказы обработаны или система работает корректно
                </p>
                <Button onClick={loadPendingOrders} className="mt-4" variant="outline">
                  Проверить еще раз
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{order.service_name}</CardTitle>
                        <CardDescription>
                          ID: {order.id} • {new Date(order.created_at).toLocaleString()}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Badge variant="secondary">
                          <Clock className="h-3 w-3 mr-1" />
                          {order.status}
                        </Badge>
                        <Button
                          onClick={() => manuallyProcessOrder(order.id)}
                          disabled={processingOrder === order.id}
                          size="sm"
                        >
                          <Play className={`h-4 w-4 mr-2 ${processingOrder === order.id ? 'animate-spin' : ''}`} />
                          Обработать
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Email:</span> {order.contact_email}
                      </div>
                      <div>
                        <span className="font-medium">Услуга:</span> {order.service_slug}
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Промпт:</span>{' '}
                        {order.generated_prompt ? (
                          <Badge variant="outline">Создан</Badge>
                        ) : (
                          <Badge variant="destructive">Не создан</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="diagnostics">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Системная диагностика
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Проверьте следующее:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• OpenAI API ключ настроен в Supabase Edge Function Secrets</li>
                    <li>• Триггер trigger_new_order_processing активен в базе данных</li>
                    <li>• Edge Function process-order-workflow развернута</li>
                    <li>• Промпт-шаблоны созданы для всех типов услуг</li>
                    <li>• pg_net расширение включено для HTTP запросов</li>
                  </ul>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={loadPendingOrders} variant="outline">
                    Проверить заказы
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}