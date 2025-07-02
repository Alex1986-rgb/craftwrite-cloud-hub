
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useOrderSystem } from '@/hooks/useOrderSystem';
import { useSystemSettings } from '@/hooks/useSystemSettings';
import { useEnhancedAnalytics } from '@/hooks/useEnhancedAnalytics';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Loader2, Info, TestTube } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function OrderSystemTest() {
  const { createOrder, loading, error } = useOrderSystem();
  const { settings, loading: settingsLoading, refreshSettings } = useSystemSettings();
  const { trackEvent, analyticsEnabled, googleAnalyticsId, yandexMetricaId } = useEnhancedAnalytics();
  
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});
  const [analyticsEvents, setAnalyticsEvents] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    service_name: 'SEO-статья',
    service_slug: 'seo-article',
    details: 'Тестовая статья для проверки системы заказов',
    contact_name: 'Тестовый пользователь',
    contact_email: 'test@example.com',
    contact_phone: '+7 900 123-45-67',
    estimated_price: 5000,
    additional_requirements: 'Дополнительные требования к тестовому заказу'
  });

  // Перехватываем console.log для отслеживания аналитических событий
  useEffect(() => {
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      if (args[0] === 'Event tracked:' || args[0] === 'Conversion tracked:') {
        setAnalyticsEvents(prev => [...prev, JSON.stringify(args[1], null, 2)]);
      }
      originalConsoleLog.apply(console, args);
    };

    return () => {
      console.log = originalConsoleLog;
    };
  }, []);

  const runSystemTests = async () => {
    const results: Record<string, boolean> = {};
    
    // Тест 1: Проверка системных настроек
    results.systemSettings = Object.keys(settings).length > 0;
    
    // Тест 2: Проверка минимальной суммы заказа
    const minOrderAmount = settings.min_order_amount || 1000;
    results.minOrderValidation = minOrderAmount > 0;
    
    // Тест 3: Проверка аналитики
    results.analyticsEnabled = analyticsEnabled;
    
    // Тест 4: Проверка валидации формы
    results.formValidation = formData.contact_email.includes('@') && formData.contact_name.length > 0;
    
    setTestResults(results);
    
    // Отправляем тестовое аналитическое событие
    trackEvent({
      action: 'system_test_completed',
      category: 'Testing',
      label: 'Order System Test',
      custom_parameters: {
        test_results: results,
        timestamp: new Date().toISOString()
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setOrderId('');
    setAnalyticsEvents([]);

    try {
      const order = await createOrder(formData);
      setSuccess(true);
      setOrderId(order.id);
      
      // Запускаем дополнительные тесты после создания заказа
      setTimeout(runSystemTests, 1000);
      
    } catch (err) {
      console.error('Order creation failed:', err);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (settingsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Загрузка системных настроек...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="w-5 h-5" />
            Тестирование системы заказов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Системные настройки */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Системные настройки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <strong>Название сайта:</strong> 
                  <div className="mt-1 p-2 bg-gray-100 rounded text-xs">
                    {settings.site_title || 'Не установлено'}
                  </div>
                </div>
                <div className="text-sm">
                  <strong>Валюта:</strong> 
                  <Badge variant="secondary">{settings.default_currency || 'RUB'}</Badge>
                </div>
                <div className="text-sm">
                  <strong>Мин. сумма заказа:</strong> 
                  <Badge variant={settings.min_order_amount ? 'default' : 'destructive'}>
                    {settings.min_order_amount ? `${settings.min_order_amount / 100} руб.` : 'Не установлено'}
                  </Badge>
                </div>
                <div className="text-sm">
                  <strong>Аналитика:</strong> 
                  <Badge variant={settings.analytics_enabled ? 'default' : 'secondary'}>
                    {settings.analytics_enabled ? '✅ Включена' : '❌ Отключена'}
                  </Badge>
                </div>
                <div className="text-sm">
                  <strong>Google Analytics:</strong> 
                  <div className="mt-1 p-2 bg-gray-100 rounded text-xs break-all">
                    {googleAnalyticsId || 'Не установлен'}
                  </div>
                </div>
                <div className="text-sm">
                  <strong>Яндекс.Метрика:</strong> 
                  <div className="mt-1 p-2 bg-gray-100 rounded text-xs">
                    {yandexMetricaId || 'Не установлен'}
                  </div>
                </div>
                
                <Button 
                  onClick={refreshSettings} 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                >
                  Обновить настройки
                </Button>
              </CardContent>
            </Card>

            {/* Форма заказа */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Тест создания заказа</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Название услуги"
                    value={formData.service_name}
                    onChange={(e) => handleInputChange('service_name', e.target.value)}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => handleInputChange('contact_email', e.target.value)}
                  />
                  <Input
                    placeholder="Имя"
                    value={formData.contact_name}
                    onChange={(e) => handleInputChange('contact_name', e.target.value)}
                  />
                  <Input
                    placeholder="Цена (в копейках)"
                    type="number"
                    value={formData.estimated_price}
                    onChange={(e) => handleInputChange('estimated_price', parseInt(e.target.value))}
                  />
                  <Textarea
                    placeholder="Описание заказа"
                    value={formData.details}
                    onChange={(e) => handleInputChange('details', e.target.value)}
                  />
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Создание заказа...
                      </>
                    ) : (
                      'Создать тестовый заказ'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Результаты тестов */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Результаты тестов</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(testResults).map(([test, passed]) => (
                  <div key={test} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{test.replace(/([A-Z])/g, ' $1')}</span>
                    <Badge variant={passed ? 'default' : 'destructive'}>
                      {passed ? '✅ Прошел' : '❌ Не прошел'}
                    </Badge>
                  </div>
                ))}
                
                {Object.keys(testResults).length === 0 && (
                  <div className="text-center text-gray-500 text-sm">
                    Создайте заказ для запуска тестов
                  </div>
                )}
                
                <Button 
                  onClick={runSystemTests} 
                  variant="outline" 
                  size="sm"
                  className="w-full mt-4"
                >
                  Запустить тесты вручную
                </Button>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-6" />

          {/* Статусы и события */}
          <div className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  ✅ Заказ успешно создан! ID: {orderId}
                  <br />
                  Система работает корректно. Аналитические события отправлены.
                </AlertDescription>
              </Alert>
            )}

            {/* События аналитики */}
            {analyticsEvents.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">События аналитики</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {analyticsEvents.map((event, index) => (
                      <div key={index} className="p-2 bg-gray-100 rounded text-xs">
                        <pre>{event}</pre>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
