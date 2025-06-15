
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download
} from 'lucide-react';
import { useContentPipeline } from '@/hooks/useContentPipeline';
import { textRuService } from '@/services/textRuService';

export default function ContentPipelineManager() {
  const { orders, activeOrder, isProcessing, createAndProcessOrder } = useContentPipeline();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [testOrderParams, setTestOrderParams] = useState({
    userId: 'admin-test',
    serviceId: 'seo-article',
    parameters: {
      topic: 'Профессиональный копирайтинг',
      length: 2000,
      audience: 'бизнес',
      tone: 'профессиональный',
      keywords: 'копирайтинг, seo, контент'
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-gray-600" />;
      default: return <Zap className="w-4 h-4 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'generating': return 'bg-blue-100 text-blue-800';
      case 'checking': return 'bg-yellow-100 text-yellow-800';
      case 'optimizing': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateTestOrder = async () => {
    await createAndProcessOrder(testOrderParams);
  };

  const selectedOrder = selectedOrderId ? orders.find(o => o.id === selectedOrderId) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Пайплайн генерации контента</h1>
          <p className="text-slate-600">Управление автоматизированной системой создания текстов</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-green-100 text-green-800">
            <Zap className="w-4 h-4 mr-2" />
            Активен
          </Badge>
          <Button onClick={handleCreateTestOrder} disabled={isProcessing}>
            <Play className="w-4 h-4 mr-2" />
            Тестовый заказ
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="orders">Заказы</TabsTrigger>
          <TabsTrigger value="settings">Настройки</TabsTrigger>
          <TabsTrigger value="monitoring">Мониторинг</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Всего заказов</p>
                    <p className="text-2xl font-bold">{orders.length}</p>
                  </div>
                  <Clock className="w-8 h-8 text-slate-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">В обработке</p>
                    <p className="text-2xl font-bold">
                      {orders.filter(o => ['pending', 'generating', 'checking', 'optimizing'].includes(o.status)).length}
                    </p>
                  </div>
                  <Zap className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Завершено</p>
                    <p className="text-2xl font-bold text-green-600">
                      {orders.filter(o => o.status === 'completed').length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Ошибки</p>
                    <p className="text-2xl font-bold text-red-600">
                      {orders.filter(o => o.status === 'failed').length}
                    </p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {activeOrder && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Текущая обработка: {activeOrder.id}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(activeOrder.status)}>
                      {getStatusIcon(activeOrder.status)}
                      <span className="ml-2">{activeOrder.status}</span>
                    </Badge>
                    <span className="text-sm text-slate-600">
                      {activeOrder.progress}%
                    </span>
                  </div>
                  
                  <Progress value={activeOrder.progress} className="w-full" />
                  
                  <div className="bg-slate-50 p-3 rounded-md">
                    <h4 className="font-medium mb-2">Этапы обработки:</h4>
                    <div className="space-y-1 text-sm">
                      {activeOrder.processingSteps.map((step, index) => (
                        <div key={index} className="text-slate-600">{step}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Список заказов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedOrderId === order.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'
                      }`}
                      onClick={() => setSelectedOrderId(order.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{order.id}</span>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{order.status}</span>
                        </Badge>
                      </div>
                      <div className="text-xs text-slate-600">
                        <div>Услуга: {order.serviceId}</div>
                        <div>Создан: {order.createdAt.toLocaleString()}</div>
                        {order.status !== 'pending' && order.status !== 'failed' && (
                          <Progress value={order.progress} className="w-full mt-2 h-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedOrder && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Детали заказа
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {selectedOrder.result && (
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Параметры:</h4>
                      <div className="bg-slate-50 p-3 rounded-md text-sm">
                        <pre>{JSON.stringify(selectedOrder.parameters, null, 2)}</pre>
                      </div>
                    </div>
                    
                    {selectedOrder.qualityMetrics && (
                      <div>
                        <h4 className="font-medium">Метрики качества:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>Уникальность: {selectedOrder.qualityMetrics.uniqueness.toFixed(1)}%</div>
                          <div>Читабельность: {selectedOrder.qualityMetrics.readability.toFixed(1)}%</div>
                          <div>SEO-оценка: {selectedOrder.qualityMetrics.seoScore.toFixed(1)}%</div>
                          <div>AI-детекция: {selectedOrder.qualityMetrics.aiDetectionScore.toFixed(1)}%</div>
                        </div>
                      </div>
                    )}
                    
                    {selectedOrder.result && (
                      <div>
                        <h4 className="font-medium">Результат:</h4>
                        <div className="bg-slate-50 p-3 rounded-md text-sm max-h-40 overflow-y-auto">
                          {selectedOrder.result}
                        </div>
                      </div>
                    )}
                    
                    {selectedOrder.errorMessage && (
                      <div>
                        <h4 className="font-medium text-red-600">Ошибка:</h4>
                        <div className="bg-red-50 p-3 rounded-md text-sm text-red-700">
                          {selectedOrder.errorMessage}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Настройки API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Text.ru API ключ</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="Введите API ключ Text.ru"
                    className="flex-1 px-3 py-2 border rounded-md"
                    onChange={(e) => textRuService.setApiKey(e.target.value)}
                  />
                  <Button variant="outline">Проверить</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring">
          <Card>
            <CardHeader>
              <CardTitle>Мониторинг системы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-slate-500">
                <Settings className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p>Мониторинг в разработке</p>
                <p className="text-sm">Будет включать метрики производительности, логи и алерты</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
