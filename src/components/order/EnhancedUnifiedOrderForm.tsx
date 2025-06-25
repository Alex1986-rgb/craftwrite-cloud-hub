
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Calculator, 
  FileText, 
  CreditCard,
  Loader2
} from 'lucide-react';
import { getServiceConfig, calculateServicePrice } from '@/data/serviceFormConfigs';
import PaymentForm from '@/components/payment/PaymentForm';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';

interface EnhancedUnifiedOrderFormProps {
  serviceId: string;
}

export default function EnhancedUnifiedOrderForm({ serviceId }: EnhancedUnifiedOrderFormProps) {
  const { user } = useUnifiedAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const serviceConfig = getServiceConfig(serviceId);

  useEffect(() => {
    if (user) {
      // Предзаполняем контактную информацию из профиля пользователя
      setContactInfo(prev => ({
        ...prev,
        email: user.email || '',
        // Можно загрузить дополнительную информацию из profiles
      }));
    }
  }, [user]);

  if (!serviceConfig) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Услуга не найдена</h2>
          <p className="text-gray-600">Конфигурация для услуги "{serviceId}" не найдена.</p>
        </CardContent>
      </Card>
    );
  }

  const totalSteps = Object.keys(serviceConfig.steps).length + 2; // +2 для контактов и оплаты
  const currentPrice = calculateServicePrice(serviceId, formData, additionalServices, deliveryOption);
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateOrder = async () => {
    if (!contactInfo.name || !contactInfo.email) {
      toast.error('Заполните обязательные поля контактной информации');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        service_name: serviceConfig.serviceName,
        service_slug: serviceId,
        details: JSON.stringify(formData),
        contact_name: contactInfo.name,
        contact_email: contactInfo.email,
        contact_phone: contactInfo.phone,
        estimated_price: currentPrice,
        service_options: {
          additional_services: additionalServices,
          delivery_option: deliveryOption,
          ...formData
        },
        user_id: user?.id || null
      };

      const { data: order, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (error) throw error;

      setOrderId(order.id);
      setShowPayment(true);
      toast.success('Заказ создан! Переходим к оплате...');
    } catch (error: any) {
      console.error('Error creating order:', error);
      toast.error('Ошибка создания заказа: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    // Контактная информация (первый шаг)
    if (currentStep === 1) {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Контактная информация</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Имя *</Label>
              <Input
                id="name"
                value={contactInfo.name}
                onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ваше имя"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                placeholder="email@example.com"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+7 (999) 123-45-67"
              />
            </div>
            
            <div>
              <Label htmlFor="company">Компания</Label>
              <Input
                id="company"
                value={contactInfo.company}
                onChange={(e) => setContactInfo(prev => ({ ...prev, company: e.target.value }))}
                placeholder="Название компании"
              />
            </div>
          </div>
        </div>
      );
    }

    // Шаги конфигурации услуги
    const configStep = serviceConfig.steps[currentStep - 1];
    if (configStep) {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{configStep.title}</h3>
          
          {Object.entries(configStep.fields).map(([fieldName, fieldConfig]) => (
            <div key={fieldName}>
              <Label htmlFor={fieldName}>
                {fieldConfig.label}
                {fieldConfig.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              
              {fieldConfig.type === 'input' && (
                <Input
                  id={fieldName}
                  value={formData[fieldName] || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, [fieldName]: e.target.value }))}
                  placeholder={fieldConfig.placeholder}
                  required={fieldConfig.required}
                />
              )}
              
              {fieldConfig.type === 'textarea' && (
                <Textarea
                  id={fieldName}
                  value={formData[fieldName] || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, [fieldName]: e.target.value }))}
                  placeholder={fieldConfig.placeholder}
                  required={fieldConfig.required}
                />
              )}
              
              {fieldConfig.type === 'select' && (
                <Select
                  value={formData[fieldName] || ''}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, [fieldName]: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите опцию" />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldConfig.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                        {option.price && <span className="ml-2 text-green-600">+{option.price}₽</span>}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              {fieldConfig.type === 'radio' && (
                <RadioGroup
                  value={formData[fieldName] || ''}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, [fieldName]: value }))}
                >
                  {fieldConfig.options?.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              
              {fieldConfig.type === 'checkbox' && (
                <div className="space-y-2">
                  {fieldConfig.options?.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.value}
                        checked={(formData[fieldName] || []).includes(option.value)}
                        onCheckedChange={(checked) => {
                          const currentValues = formData[fieldName] || [];
                          if (checked) {
                            setFormData(prev => ({
                              ...prev,
                              [fieldName]: [...currentValues, option.value]
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              [fieldName]: currentValues.filter(v => v !== option.value)
                            }));
                          }
                        }}
                      />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </div>
              )}
              
              {fieldConfig.description && (
                <p className="text-sm text-gray-500 mt-1">{fieldConfig.description}</p>
              )}
            </div>
          ))}
        </div>
      );
    }

    // Последний шаг - дополнительные услуги и сроки
    if (currentStep === totalSteps - 1) {
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Дополнительные услуги и сроки</h3>
          
          {serviceConfig.additionalServices && Object.keys(serviceConfig.additionalServices).length > 0 && (
            <div>
              <h4 className="font-medium mb-3">Дополнительные услуги</h4>
              <div className="space-y-2">
                {Object.entries(serviceConfig.additionalServices).map(([serviceId, serviceData]) => (
                  <div key={serviceId} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={serviceId}
                        checked={additionalServices.includes(serviceId)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setAdditionalServices(prev => [...prev, serviceId]);
                          } else {
                            setAdditionalServices(prev => prev.filter(s => s !== serviceId));
                          }
                        }}
                      />
                      <Label htmlFor={serviceId}>{serviceData.label}</Label>
                    </div>
                    {serviceData.additionalPrice && (
                      <Badge variant="outline">+{serviceData.additionalPrice}₽</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h4 className="font-medium mb-3">Сроки выполнения</h4>
            <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption}>
              {Object.entries(serviceConfig.deliveryOptions).map(([optionId, optionData]) => (
                <div key={optionId} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={optionId} id={optionId} />
                    <Label htmlFor={optionId}>{optionData.label}</Label>
                  </div>
                  {optionData.priceMultiplier && optionData.priceMultiplier !== 1 && (
                    <Badge variant="outline">×{optionData.priceMultiplier}</Badge>
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      );
    }

    // Оплата
    if (currentStep === totalSteps && showPayment && orderId) {
      return (
        <div className="text-center">
          <PaymentForm
            orderId={orderId}
            amount={currentPrice}
            description={`${serviceConfig.serviceName} - Заказ #${orderId.slice(-8)}`}
            onSuccess={(paymentId) => {
              toast.success('Платеж успешно завершен!');
              // Можно перенаправить на страницу успеха
            }}
            onError={(error) => {
              toast.error(`Ошибка оплаты: ${error}`);
            }}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {serviceConfig.serviceName}
          </CardTitle>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Шаг {currentStep} из {totalSteps}
            </div>
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              <span className="font-semibold">{(currentPrice / 100).toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
      </Card>

      {/* Content */}
      <Card>
        <CardContent className="p-6">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      {!showPayment && (
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад
              </Button>

              {currentStep === totalSteps - 1 ? (
                <Button
                  onClick={handleCreateOrder}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Создание заказа...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Перейти к оплате
                    </>
                  )}
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Далее
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
