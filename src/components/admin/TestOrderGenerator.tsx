import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Zap, 
  TestTube,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { logger } from '@/utils/logger';

const TEST_SERVICES = [
  {
    slug: 'seo-article',
    name: 'SEO-статья',
    sampleDetails: 'Написать SEO-статью на тему "Как выбрать качественную мебель для дома". Объем 3000-4000 символов, ключевые слова: мебель для дома, качественная мебель, выбор мебели.'
  },
  {
    slug: 'landing-page',
    name: 'Лендинг пейдж',
    sampleDetails: 'Создать лендинг для курса по изучению английского языка. Целевая аудитория: взрослые 25-45 лет, желающие изучать английский для карьеры.'
  },
  {
    slug: 'email-campaigns',
    name: 'Email кампания',
    sampleDetails: 'Создать welcome-серию из 5 писем для онлайн-школы программирования. Цель: познакомить с преподавателями и мотивировать к покупке курса.'
  },
  {
    slug: 'telegram-content',
    name: 'Telegram контент',
    sampleDetails: 'Создать 10 постов для Telegram-канала о здоровом питании. Аудитория: женщины 25-40 лет, интересующиеся ЗОЖ.'
  }
];

interface TestOrder {
  id: string;
  serviceName: string;
  status: string;
  createdAt: string;
  processingTime?: number;
}

export default function TestOrderGenerator() {
  const [selectedService, setSelectedService] = useState('');
  const [customDetails, setCustomDetails] = useState('');
  const [testOrders, setTestOrders] = useState<TestOrder[]>([]);
  const [generating, setGenerating] = useState(false);
  const [batchCount, setBatchCount] = useState('1');

  const generateTestOrder = async (serviceSlug: string, details: string) => {
    const service = TEST_SERVICES.find(s => s.slug === serviceSlug);
    if (!service) return null;

    const testOrderData = {
      service_name: service.name,
      service_slug: serviceSlug,
      details: details || service.sampleDetails,
      additional_requirements: 'Тестовый заказ - создан автоматически для отладки системы',
      contact_name: 'Тест Тестович',
      contact_email: 'test@example.com',
      contact_phone: '+7 (999) 123-45-67',
      status: 'pending',
      user_id: null // Анонимный тестовый заказ
    };

    const startTime = Date.now();
    
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert(testOrderData)
        .select('*')
        .single();

      if (error) throw error;

      const testOrder: TestOrder = {
        id: data.id,
        serviceName: service.name,
        status: 'pending',
        createdAt: new Date().toISOString(),
        processingTime: Date.now() - startTime
      };

      setTestOrders(prev => [testOrder, ...prev]);
      
      logger.info('Test order created', { 
        orderId: data.id, 
        service: serviceSlug,
        processingTime: testOrder.processingTime 
      });

      return testOrder;
    } catch (error) {
      logger.error('Failed to create test order', { serviceSlug, error });
      throw error;
    }
  };

  const handleSingleGeneration = async () => {
    if (!selectedService) {
      toast({
        title: "Ошибка",
        description: "Выберите тип услуги",
        variant: "destructive"
      });
      return;
    }

    setGenerating(true);
    try {
      await generateTestOrder(selectedService, customDetails);
      toast({
        title: "Тестовый заказ создан",
        description: "Заказ отправлен на автоматическую обработку",
      });
    } catch (error) {
      toast({
        title: "Ошибка создания заказа",
        description: "Не удалось создать тестовый заказ",
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleBatchGeneration = async () => {
    const count = parseInt(batchCount);
    if (count < 1 || count > 10) {
      toast({
        title: "Ошибка",
        description: "Количество заказов должно быть от 1 до 10",
        variant: "destructive"
      });
      return;
    }

    setGenerating(true);
    const results = [];
    const errors = [];

    try {
      for (let i = 0; i < count; i++) {
        const randomService = TEST_SERVICES[Math.floor(Math.random() * TEST_SERVICES.length)];
        try {
          const order = await generateTestOrder(randomService.slug, '');
          if (order) results.push(order);
          // Небольшая задержка между заказами
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
          errors.push(error);
        }
      }

      toast({
        title: "Пакетная генерация завершена",
        description: `Создано заказов: ${results.length}, ошибок: ${errors.length}`,
      });
    } finally {
      setGenerating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Генератор тестовых заказов</h2>
        <p className="text-muted-foreground">
          Создание тестовых заказов для проверки автоматической обработки
        </p>
      </div>

      <Tabs defaultValue="single" className="space-y-4">
        <TabsList>
          <TabsTrigger value="single">
            <TestTube className="h-4 w-4 mr-2" />
            Одиночный заказ
          </TabsTrigger>
          <TabsTrigger value="batch">
            <Zap className="h-4 w-4 mr-2" />
            Пакетная генерация
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="h-4 w-4 mr-2" />
            История ({testOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="single">
          <Card>
            <CardHeader>
              <CardTitle>Создать тестовый заказ</CardTitle>
              <CardDescription>
                Выберите тип услуги и настройте параметры тестового заказа
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Тип услуги</label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите услугу" />
                  </SelectTrigger>
                  <SelectContent>
                    {TEST_SERVICES.map((service) => (
                      <SelectItem key={service.slug} value={service.slug}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Техническое задание (опционально)
                </label>
                <Textarea
                  placeholder="Оставьте пустым для использования стандартного ТЗ"
                  value={customDetails}
                  onChange={(e) => setCustomDetails(e.target.value)}
                  rows={4}
                />
              </div>

              <Button 
                onClick={handleSingleGeneration}
                disabled={generating || !selectedService}
                className="w-full"
              >
                <Play className="h-4 w-4 mr-2" />
                {generating ? 'Создаём заказ...' : 'Создать тестовый заказ'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batch">
          <Card>
            <CardHeader>
              <CardTitle>Пакетная генерация</CardTitle>
              <CardDescription>
                Создание множественных тестовых заказов для нагрузочного тестирования
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Количество заказов (1-10)
                </label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={batchCount}
                  onChange={(e) => setBatchCount(e.target.value)}
                />
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Что будет создано:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Случайные типы услуг из доступных</li>
                  <li>• Стандартные технические задания</li>
                  <li>• Тестовые контактные данные</li>
                  <li>• Автоматический запуск обработки</li>
                </ul>
              </div>

              <Button 
                onClick={handleBatchGeneration}
                disabled={generating}
                className="w-full"
                variant="outline"
              >
                <Zap className="h-4 w-4 mr-2" />
                {generating ? 'Генерируем заказы...' : `Создать ${batchCount} тестовых заказов`}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>История тестовых заказов</CardTitle>
              <CardDescription>
                Отслеживание созданных тестовых заказов и их статусов
              </CardDescription>
            </CardHeader>
            <CardContent>
              {testOrders.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Нет тестовых заказов</h3>
                  <p className="text-muted-foreground">
                    Создайте первый тестовый заказ для начала отладки
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {testOrders.map((order) => (
                    <div 
                      key={order.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{order.serviceName}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {order.id.slice(0, 8)}... • 
                          Создан: {new Date(order.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {order.processingTime && (
                          <span className="text-xs text-muted-foreground">
                            {order.processingTime}мс
                          </span>
                        )}
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}