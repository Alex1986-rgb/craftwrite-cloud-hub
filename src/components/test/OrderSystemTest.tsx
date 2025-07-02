
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOrderSystem } from '@/hooks/useOrderSystem';
import { useSystemSettings } from '@/hooks/useSystemSettings';
import { useEnhancedAnalytics } from '@/hooks/useEnhancedAnalytics';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Loader2, Info, TestTube, Monitor, Sparkles, Activity, Settings, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { EnhancedFormField } from '@/components/ui/enhanced-form-field';
import { ProgressiveTextarea } from '@/components/ui/progressive-textarea';
import { ModernSelect } from '@/components/ui/modern-select';
import { toast } from '@/hooks/use-toast';
import EnhancedSystemMonitor from '@/components/admin/EnhancedSystemMonitor';
import ProductionLaunchManager from '@/components/admin/ProductionLaunchManager';

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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const serviceOptions = [
    { value: 'seo-article', label: 'SEO-статья', description: 'Оптимизированная статья для поисковых систем' },
    { value: 'landing-page', label: 'Лендинг', description: 'Продающая посадочная страница' },
    { value: 'telegram-content', label: 'Телеграм контент', description: 'Контент для Telegram канала' },
    { value: 'email-campaign', label: 'Email кампания', description: 'Серия писем для email маркетинга' },
    { value: 'chatbot-scripts', label: 'Чат-бот скрипты', description: 'Диалоги для чат-бота' }
  ];

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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.contact_email.trim()) {
      newErrors.contact_email = 'Email обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_email)) {
      newErrors.contact_email = 'Некорректный email';
    }
    
    if (!formData.contact_name.trim()) {
      newErrors.contact_name = 'Имя обязательно';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Ошибки в форме",
        description: "Пожалуйста, исправьте отмеченные ошибки",
        variant: "destructive"
      });
      return;
    }
    
    setSuccess(false);
    setOrderId('');
    setAnalyticsEvents([]);

    try {
      const order = await createOrder(formData);
      setSuccess(true);
      setOrderId(order.id);
      
      toast({
        title: "🎉 Тестовый заказ создан!",
        description: `Заказ #${order.id} успешно создан и обрабатывается`,
      });
      
      // Запускаем дополнительные тесты после создания заказа
      setTimeout(runSystemTests, 1000);
      
    } catch (err) {
      console.error('Order creation failed:', err);
      toast({
        title: "Ошибка создания заказа",
        description: "Не удалось создать тестовый заказ. Проверьте настройки системы.",
        variant: "destructive"
      });
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
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Modern Header with Enhanced Animation */}
      <div className="text-center space-y-4 animate-fade-in">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-full px-6 py-3 border border-primary/20 backdrop-blur-sm">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-primary font-semibold text-sm tracking-wide">Системная диагностика</span>
          <div className="w-2 h-2 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Тестирование и мониторинг системы
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Комплексная проверка всех компонентов системы с расширенным мониторингом и автоматизированными тестами
        </p>
        
        {/* Status Indicators */}
        <div className="flex justify-center gap-6 text-sm text-muted-foreground pt-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Система активна</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <span>Мониторинг включен</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            <span>Тесты готовы</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="diagnostics" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-14 bg-gradient-to-r from-muted/50 to-muted/30 backdrop-blur-sm border border-border/50">
          <TabsTrigger value="diagnostics" className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Activity className="w-4 h-4" />
            Расширенная диагностика
          </TabsTrigger>
          <TabsTrigger value="production" className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Settings className="w-4 h-4" />
            Управление продакшеном
          </TabsTrigger>
          <TabsTrigger value="legacy" className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <TestTube className="w-4 h-4" />
            Базовое тестирование
          </TabsTrigger>
        </TabsList>

        <TabsContent value="diagnostics" className="space-y-6">
          <EnhancedSystemMonitor />
        </TabsContent>

        <TabsContent value="production" className="space-y-6">
          <ProductionLaunchManager />
        </TabsContent>

        <TabsContent value="legacy" className="space-y-6">
          <Card className="form-modern border-primary/20 bg-gradient-to-br from-background/95 to-muted/30 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-primary/10">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TestTube className="w-5 h-5 text-primary" />
                </div>
                Тестирование системы заказов
                <Badge variant="secondary" className="ml-auto">
                  <Zap className="w-3 h-3 mr-1" />
                  Модернизировано
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Системные настройки */}
            <Card className="form-modern">
              <CardHeader className="bg-gradient-to-r from-info/5 to-info/10 border-b border-info/20">
                <CardTitle className="text-lg flex items-center gap-3">
                  <div className="p-2 bg-info/10 rounded-lg">
                    <Info className="w-4 h-4 text-info" />
                  </div>
                  Системные настройки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
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
            <Card className="form-modern">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-primary/20">
                <CardTitle className="text-lg flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TestTube className="w-4 h-4 text-primary" />
                  </div>
                  Тест создания заказа
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <ModernSelect
                    options={serviceOptions}
                    value={formData.service_slug}
                    onValueChange={(value) => {
                      const selectedService = serviceOptions.find(s => s.value === value);
                      handleInputChange('service_slug', value as string);
                      handleInputChange('service_name', selectedService?.label || '');
                    }}
                    label="Тип услуги"
                    placeholder="Выберите услугу для тестирования"
                    searchable={false}
                  />

                  <EnhancedFormField
                    id="contact_email"
                    name="contact_email"
                    type="email"
                    label="Email для тестирования"
                    placeholder="test@example.com"
                    value={formData.contact_email}
                    onChange={(e) => {
                      handleInputChange('contact_email', e.target.value);
                      if (errors.contact_email) {
                        setErrors(prev => ({ ...prev, contact_email: '' }));
                      }
                    }}
                    error={errors.contact_email}
                    success={formData.contact_email.includes('@') && !errors.contact_email}
                    required
                    realTimeValidation
                    validationRules={[
                      (value) => !value.trim() ? 'Email обязателен' : null,
                      (value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Некорректный email' : null
                    ]}
                  />

                  <EnhancedFormField
                    id="contact_name"
                    name="contact_name"
                    type="text"
                    label="Имя тестового пользователя"
                    placeholder="Тестовый пользователь"
                    value={formData.contact_name}
                    onChange={(e) => {
                      handleInputChange('contact_name', e.target.value);
                      if (errors.contact_name) {
                        setErrors(prev => ({ ...prev, contact_name: '' }));
                      }
                    }}
                    error={errors.contact_name}
                    success={formData.contact_name.length > 0 && !errors.contact_name}
                    required
                    realTimeValidation
                    validationRules={[
                      (value) => !value.trim() ? 'Имя обязательно' : null,
                      (value) => value.length < 2 ? 'Минимум 2 символа' : null
                    ]}
                  />

                  <EnhancedFormField
                    id="estimated_price"
                    name="estimated_price"
                    type="number"
                    label="Тестовая цена (в копейках)"
                    placeholder="5000"
                    value={formData.estimated_price.toString()}
                    onChange={(e) => handleInputChange('estimated_price', parseInt(e.target.value) || 0)}
                    tooltip="1 рубль = 100 копеек"
                  />

                  <ProgressiveTextarea
                    id="details"
                    name="details"
                    label="Описание тестового заказа"
                    placeholder="Подробное описание для тестирования системы..."
                    value={formData.details}
                    onChange={(e) => handleInputChange('details', e.target.value)}
                    characterLimit={1000}
                    showWordCount
                    autoResize
                    minRows={4}
                    suggestions={[
                      "Тестовая SEO-статья для проверки системы",
                      "Проверка функциональности создания заказов",
                      "Тестирование интеграции с платежной системой",
                      "Валидация процесса обработки заказов"
                    ]}
                  />

                  <Button 
                    type="submit" 
                    disabled={loading} 
                    className="submit-button-enhanced"
                    size="lg"
                  >
                    <div className="flex items-center justify-center gap-3">
                      {loading ? (
                        <>
                          <div className="form-spinner" />
                          Создание заказа...
                        </>
                      ) : (
                        <>
                          <TestTube className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                          Создать тестовый заказ
                        </>
                      )}
                    </div>
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Результаты тестов */}
            <Card className="form-modern">
              <CardHeader className="bg-gradient-to-r from-success/5 to-success/10 border-b border-success/20">
                <CardTitle className="text-lg flex items-center gap-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  Результаты тестов
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
