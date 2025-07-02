import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Eye,
  Clock,
  CheckCircle,
  Star,
  MessageSquare
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import { toast } from '@/hooks/use-toast';

interface ClientOrder {
  id: string;
  service_name: string;
  status: string;
  created_at: string;
  generated_prompt?: string;
  quality_rating?: number;
  generated_content?: {
    id: string;
    content: string;
    content_type: string;
    ai_model: string;
    created_at: string;
  }[];
}

export default function ClientContentView() {
  const { user } = useUnifiedAuth();
  const [orders, setOrders] = useState<ClientOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadClientOrders();
    }
  }, [user]);

  const loadClientOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          service_name,
          status,
          created_at,
          generated_prompt,
          quality_rating,
          generated_content:generated_content_versions(
            id,
            content,
            content_type,
            ai_model,
            created_at
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить заказы",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadContent = (content: string, fileName: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const completedOrders = orders.filter(order => 
    order.status === 'completed' && order.generated_content && order.generated_content.length > 0
  );

  const pendingOrders = orders.filter(order => 
    order.status === 'pending' || order.status === 'processing'
  );

  const allOrders = orders.filter(order => order.status !== 'cancelled');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Мои тексты</h2>
        <p className="text-muted-foreground">Готовые и обрабатываемые заказы</p>
      </div>

      <Tabs defaultValue="completed" className="space-y-6">
        <TabsList>
          <TabsTrigger value="completed">
            Готовые ({completedOrders.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            В обработке ({pendingOrders.length})
          </TabsTrigger>
          <TabsTrigger value="all">
            Все заказы ({allOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="completed" className="space-y-4">
          {completedOrders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Пока нет готовых текстов</h3>
                <p className="text-muted-foreground">
                  Как только ваши заказы будут выполнены, они появятся здесь
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {completedOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{order.service_name}</CardTitle>
                        <CardDescription>
                          Заказ от {new Date(order.created_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Готов
                        </Badge>
                        {order.quality_rating && (
                          <Badge variant="secondary">
                            <Star className="w-3 h-3 mr-1" />
                            {order.quality_rating}/5
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.generated_content?.map((content) => (
                        <div key={content.id} className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                              Сгенерировано: {new Date(content.created_at).toLocaleString()} | 
                              Модель: {content.ai_model}
                            </div>
                          </div>
                          
                          <div className="bg-muted p-4 rounded-lg">
                            <p className="text-sm whitespace-pre-wrap">
                              {selectedContent === content.id 
                                ? content.content
                                : content.content.substring(0, 300) + '...'
                              }
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedContent(
                                selectedContent === content.id ? null : content.id
                              )}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              {selectedContent === content.id ? 'Свернуть' : 'Показать полностью'}
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
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => downloadContent(
                                content.content, 
                                `${order.service_name}_${new Date(content.created_at).toLocaleDateString()}`
                              )}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Скачать
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingOrders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Нет заказов в обработке</h3>
                <p className="text-muted-foreground">
                  Все ваши заказы выполнены или вы еще не сделали заказ
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {pendingOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{order.service_name}</CardTitle>
                        <CardDescription>
                          Заказ от {new Date(order.created_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge variant={order.status === 'pending' ? "secondary" : "default"}>
                        <Clock className="w-3 h-3 mr-1" />
                        {order.status === 'pending' ? 'В очереди' : 'Обрабатывается'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {order.generated_prompt && (
                        <div>
                          <h4 className="font-medium mb-2">Техническое задание обработано:</h4>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-sm text-green-700">
                              ✓ Промпт сгенерирован, текст создается...
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <div className="text-sm text-muted-foreground">
                        {order.status === 'pending' 
                          ? 'Ваш заказ добавлен в очередь на обработку'
                          : 'Искусственный интеллект создает ваш текст'
                        }
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {allOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{order.service_name}</CardTitle>
                      <CardDescription>
                        Заказ от {new Date(order.created_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge variant={
                      order.status === 'completed' ? "outline" :
                      order.status === 'processing' ? "default" :
                      order.status === 'pending' ? "secondary" : "destructive"
                    }>
                      {order.status === 'completed' ? 'Готов' :
                       order.status === 'processing' ? 'Обрабатывается' :
                       order.status === 'pending' ? 'В очереди' : order.status}
                    </Badge>
                  </div>
                </CardHeader>
                {order.generated_content && order.generated_content.length > 0 && (
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Готовых версий текста: {order.generated_content.length}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}