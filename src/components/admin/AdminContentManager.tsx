import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Eye, 
  RefreshCw, 
  Download, 
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Play
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface GeneratedContent {
  id: string;
  order_id: string;
  content: string;
  content_type: string;
  prompt_used?: string;
  ai_model: string;
  quality_score?: number;
  is_active: boolean;
  created_at: string;
  order?: {
    id: string;
    service_name: string;
    contact_name: string;
    contact_email: string;
    status: string;
    generated_prompt?: string;
  };
}

interface Order {
  id: string;
  service_name: string;
  contact_name: string;
  status: string;
  generated_prompt?: string;
  created_at: string;
}

export default function AdminContentManager() {
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [processingOrders, setProcessingOrders] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadContent();
    loadOrders();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('generated_content_versions')
        .select(`
          *,
          order:orders (
            id,
            service_name,
            contact_name,
            contact_email,
            status,
            generated_prompt
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGeneratedContent(data || []);
    } catch (error) {
      console.error('Error loading content:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить контент",
        variant: "destructive"
      });
    }
  };

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('id, service_name, contact_name, status, generated_prompt, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const reprocessOrder = async (orderId: string) => {
    setProcessingOrders(prev => new Set(prev).add(orderId));
    
    try {
      const { error } = await supabase.rpc('reprocess_order', { order_id: orderId });
      
      if (error) throw error;

      toast({
        title: "Успех",
        description: "Заказ отправлен на повторную обработку",
      });

      // Обновляем данные
      setTimeout(() => {
        loadContent();
        loadOrders();
      }, 2000);

    } catch (error) {
      console.error('Error reprocessing order:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось запустить повторную обработку",
        variant: "destructive"
      });
    } finally {
      setProcessingOrders(prev => {
        const newSet = new Set(prev);
        newSet.delete(orderId);
        return newSet;
      });
    }
  };

  const filteredContent = generatedContent.filter(content =>
    content.order?.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.order?.contact_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingOrders = orders.filter(order => 
    order.status === 'pending' || order.status === 'processing'
  );

  const completedOrders = orders.filter(order => 
    order.status === 'completed'
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Управление контентом</h2>
          <p className="text-muted-foreground">Просмотр и управление сгенерированными текстами</p>
        </div>
        <Button onClick={() => { loadContent(); loadOrders(); }} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Обновить
        </Button>
      </div>

      <Tabs defaultValue="generated" className="space-y-6">
        <TabsList>
          <TabsTrigger value="generated">
            Сгенерированный контент ({generatedContent.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Ожидают обработки ({pendingOrders.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Завершенные ({completedOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generated" className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию услуги или имени клиента..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {filteredContent.map((content) => (
              <Card key={content.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {content.order?.service_name || content.content_type}
                      </CardTitle>
                      <CardDescription>
                        Клиент: {content.order?.contact_name} | 
                        Модель: {content.ai_model} | 
                        {new Date(content.created_at).toLocaleString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={content.is_active ? "default" : "secondary"}>
                        {content.is_active ? "Активен" : "Архив"}
                      </Badge>
                      {content.quality_score && (
                        <Badge variant="outline">
                          Оценка: {content.quality_score}/10
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Сгенерированный текст:</h4>
                      <div className="bg-muted p-4 rounded-lg max-h-32 overflow-y-auto">
                        <p className="text-sm whitespace-pre-wrap">
                          {content.content.length > 500 
                            ? content.content.substring(0, 500) + '...'
                            : content.content
                          }
                        </p>
                      </div>
                    </div>
                    
                    {content.prompt_used && (
                      <div>
                        <h4 className="font-medium mb-2">Использованный промпт:</h4>
                        <div className="bg-blue-50 p-3 rounded-lg max-h-24 overflow-y-auto">
                          <p className="text-sm text-blue-700">
                            {content.prompt_used.length > 200
                              ? content.prompt_used.substring(0, 200) + '...'
                              : content.prompt_used
                            }
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedOrder(content.order ? {...content.order, created_at: content.created_at} : null)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Подробнее
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(content.content);
                          toast({ title: "Скопировано в буфер обмена" });
                        }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Копировать
                      </Button>
                      {content.order?.id && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => reprocessOrder(content.order!.id)}
                          disabled={processingOrders.has(content.order!.id)}
                        >
                          {processingOrders.has(content.order!.id) ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                          ) : (
                            <RefreshCw className="w-4 h-4 mr-2" />
                          )}
                          Перегенерировать
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {pendingOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{order.service_name}</CardTitle>
                      <CardDescription>
                        Клиент: {order.contact_name} | 
                        {new Date(order.created_at).toLocaleString()}
                      </CardDescription>
                    </div>
                    <Badge variant={order.status === 'pending' ? "secondary" : "default"}>
                      <Clock className="w-3 h-3 mr-1" />
                      {order.status === 'pending' ? 'В очереди' : 'Обрабатывается'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.generated_prompt && (
                      <div>
                        <h4 className="font-medium mb-2">Сгенерированный промпт:</h4>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-700">
                            {order.generated_prompt.substring(0, 200)}...
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => reprocessOrder(order.id)}
                        disabled={processingOrders.has(order.id)}
                      >
                        {processingOrders.has(order.id) ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                        ) : (
                          <Play className="w-4 h-4 mr-2" />
                        )}
                        Запустить обработку
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {completedOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{order.service_name}</CardTitle>
                      <CardDescription>
                        Клиент: {order.contact_name} | 
                        {new Date(order.created_at).toLocaleString()}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Завершен
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => reprocessOrder(order.id)}
                      disabled={processingOrders.has(order.id)}
                    >
                      {processingOrders.has(order.id) ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                      ) : (
                        <RefreshCw className="w-4 h-4 mr-2" />
                      )}
                      Перегенерировать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}