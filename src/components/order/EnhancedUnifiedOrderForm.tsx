
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, ArrowLeft, ArrowRight, Calculator, CreditCard } from 'lucide-react';
import { getServiceConfig, calculateServicePrice, FormFieldConfig } from '@/data/serviceFormConfigs';
import { useEnhancedOrders } from '@/hooks/useEnhancedOrders';
import { useTelegramNotifications } from '@/hooks/useTelegramNotifications';
import { toast } from 'sonner';

// Компоненты для рендеринга полей
import ContactInfoStep from './form-steps/ContactInfoStep';
import DynamicFormField from './form-steps/DynamicFormField';
import OrderSummaryStep from './form-steps/OrderSummaryStep';

interface EnhancedUnifiedOrderFormProps {
  serviceId: string;
  variant?: 'public' | 'client';
  onOrderCreated?: () => void;
  onSuccess?: () => void;
}

export default function EnhancedUnifiedOrderForm({ 
  serviceId, 
  variant = 'public',
  onOrderCreated,
  onSuccess 
}: EnhancedUnifiedOrderFormProps) {
  const { createOrder, loading } = useEnhancedOrders();
  const { sendOrderNotification } = useTelegramNotifications();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Контактная информация
    name: '',
    email: '',
    phone: '',
    // Динамические поля сервиса
    serviceFields: {} as { [key: string]: any },
    // Дополнительные услуги
    additionalServices: [] as string[],
    // Опция доставки
    deliveryOption: 'standard',
    // Дополнительные требования
    additionalRequirements: ''
  });

  const serviceConfig = getServiceConfig(serviceId);
  
  if (!serviceConfig) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-12">
          <p className="text-red-500">Конфигурация для услуги "{serviceId}" не найдена</p>
        </CardContent>
      </Card>
    );
  }

  const totalSteps = Math.max(...Object.keys(serviceConfig.steps).map(Number)) + 2; // +2 для контактов и подтверждения
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: any) => {
    if (field === 'additionalServices') {
      setFormData(prev => ({ ...prev, additionalServices: value }));
    } else if (field === 'deliveryOption') {
      setFormData(prev => ({ ...prev, deliveryOption: value }));
    } else if (['name', 'email', 'phone', 'additionalRequirements'].includes(field)) {
      setFormData(prev => ({ ...prev, [field]: value }));
    } else {
      setFormData(prev => ({
        ...prev,
        serviceFields: { ...prev.serviceFields, [field]: value }
      }));
    }
  };

  const calculatePrice = () => {
    return calculateServicePrice(serviceId, formData.serviceFields, formData.additionalServices, formData.deliveryOption);
  };

  const getDeliveryTime = () => {
    const deliveryConfig = serviceConfig.deliveryOptions[formData.deliveryOption];
    if (!deliveryConfig) return 'Не указано';
    
    switch (formData.deliveryOption) {
      case 'urgent': return '1-2 дня';
      case 'express': return '2-3 дня';
      case 'standard': return '5-7 дней';
      default: return 'Не указано';
    }
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return Boolean(formData.name.trim() && formData.email.trim());
      case totalSteps:
        return true; // Последний шаг (подтверждение)
      default:
        // Проверяем обязательные поля для текущего шага
        const stepConfig = serviceConfig.steps[step - 1];
        if (!stepConfig) return true;
        
        return Object.entries(stepConfig.fields).every(([fieldName, fieldConfig]) => {
          if (!fieldConfig.required) return true;
          const value = formData.serviceFields[fieldName];
          return Boolean(value && value !== '');
        });
    }
  };

  const canProceedToNext = () => isStepValid(currentStep);

  const goToNextStep = () => {
    if (canProceedToNext() && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const estimatedPrice = calculatePrice();
      const deliveryTime = getDeliveryTime();
      
      // Вычисляем дату дедлайна
      const baseDeliveryDays = formData.deliveryOption === 'urgent' ? 2 : 
                              formData.deliveryOption === 'express' ? 3 : 7;
      const deadlineDate = new Date();
      deadlineDate.setDate(deadlineDate.getDate() + baseDeliveryDays);
      
      // Формируем детальное описание заказа
      const serviceFieldsDescription = Object.entries(formData.serviceFields)
        .map(([key, value]) => {
          const fieldConfig = Object.values(serviceConfig.steps).reduce((acc, step) => {
            return { ...acc, ...step.fields };
          }, {} as { [key: string]: FormFieldConfig });
          
          const field = fieldConfig[key];
          const label = field?.label || key;
          
          if (Array.isArray(value)) {
            return `${label}: ${value.join(', ')}`;
          }
          return `${label}: ${value}`;
        })
        .join('\n');

      const additionalServicesDescription = formData.additionalServices.length > 0
        ? `\nДополнительные услуги: ${formData.additionalServices.map(serviceId => {
            const service = serviceConfig.additionalServices?.[serviceId];
            return service?.label || serviceId;
          }).join(', ')}`
        : '';

      const orderData = {
        service_slug: serviceId,
        service_name: serviceConfig.serviceName,
        contact_name: formData.name,
        contact_email: formData.email,
        contact_phone: formData.phone,
        details: `${serviceFieldsDescription}${additionalServicesDescription}`,
        additional_requirements: formData.additionalRequirements || '',
        estimated_price: estimatedPrice,
        deadline: deadlineDate.toISOString().split('T')[0],
        status: 'new',
        priority: formData.deliveryOption === 'urgent' ? 'high' : 'medium',
        service_options: {
          serviceFields: formData.serviceFields,
          additionalServices: formData.additionalServices,
          deliveryOption: formData.deliveryOption,
          calculatedPrice: estimatedPrice,
          deliveryTime: deliveryTime
        }
      };

      console.log('Создаем заказ с данными:', orderData);
      const createdOrder = await createOrder(orderData);
      
      if (createdOrder) {
        console.log('Заказ создан, отправляем уведомление в Telegram');
        await sendOrderNotification(createdOrder.id, orderData);
        
        toast.success('Заказ создан успешно!', {
          description: 'Переходим к оплате...',
          action: {
            label: 'Оплатить',
            onClick: () => {
              window.location.href = `/payment/${createdOrder.id}`;
            }
          }
        });

        setTimeout(() => {
          window.location.href = `/payment/${createdOrder.id}`;
        }, 3000);
      }
      
      onOrderCreated?.();
      onSuccess?.();
      
    } catch (error) {
      console.error('Ошибка создания заказа:', error);
      toast.error('Произошла ошибка при создании заказа. Попробуйте еще раз.');
    }
  };

  const renderStepContent = () => {
    // Шаг 1: Контактная информация
    if (currentStep === 1) {
      return (
        <ContactInfoStep
          formData={{
            name: formData.name,
            email: formData.email,
            phone: formData.phone
          }}
          onInputChange={(e) => handleInputChange(e.target.name, e.target.value)}
        />
      );
    }

    // Последний шаг: Подтверждение заказа
    if (currentStep === totalSteps) {
      return (
        <OrderSummaryStep
          serviceName={serviceConfig.serviceName}
          formData={formData}
          serviceConfig={serviceConfig}
          estimatedPrice={calculatePrice()}
          deliveryTime={getDeliveryTime()}
          onEdit={() => setCurrentStep(1)}
        />
      );
    }

    // Динамические шаги на основе конфигурации
    const stepConfig = serviceConfig.steps[currentStep - 1];
    if (!stepConfig) {
      return <div>Конфигурация шага не найдена</div>;
    }

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{stepConfig.title}</h3>
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(stepConfig.fields).map(([fieldName, fieldConfig]) => (
              <DynamicFormField
                key={fieldName}
                fieldName={fieldName}
                fieldConfig={fieldConfig}
                value={formData.serviceFields[fieldName]}
                onChange={(value) => handleInputChange(fieldName, value)}
              />
            ))}
          </div>
        </div>

        {/* Дополнительные услуги на последнем шаге конфигурации */}
        {currentStep === Math.max(...Object.keys(serviceConfig.steps).map(Number)) && serviceConfig.additionalServices && (
          <>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-4">Дополнительные услуги</h3>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(serviceConfig.additionalServices).map(([serviceId, serviceConfig]) => (
                  <Card 
                    key={serviceId}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      formData.additionalServices.includes(serviceId) ? 'ring-2 ring-green-500 bg-green-50' : ''
                    }`}
                    onClick={() => {
                      const newServices = formData.additionalServices.includes(serviceId)
                        ? formData.additionalServices.filter(id => id !== serviceId)
                        : [...formData.additionalServices, serviceId];
                      handleInputChange('additionalServices', newServices);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {formData.additionalServices.includes(serviceId) && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          <span className="font-medium">{serviceConfig.label}</span>
                        </div>
                        <Badge variant="secondary">+{serviceConfig.additionalPrice}₽</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Сроки выполнения</h3>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(serviceConfig.deliveryOptions).map(([optionId, optionConfig]) => (
                  <Card 
                    key={optionId}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      formData.deliveryOption === optionId ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => handleInputChange('deliveryOption', optionId)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{optionConfig.label}</span>
                        {optionConfig.priceMultiplier && optionConfig.priceMultiplier > 1 && (
                          <Badge variant="outline">
                            +{Math.round((optionConfig.priceMultiplier - 1) * 100)}%
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Показываем текущую расчетную стоимость */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Предварительная стоимость:</div>
              <div className="text-sm text-gray-600">Срок выполнения: {getDeliveryTime()}</div>
            </div>
            <div className="text-xl font-bold text-blue-600">
              {calculatePrice().toLocaleString()}₽
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Заголовок */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Заказ: {serviceConfig.serviceName}</h1>
        <p className="text-gray-600">Заполните форму для получения персонального предложения</p>
      </div>

      {/* Прогресс-бар */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Шаг {currentStep} из {totalSteps}</span>
          <span className="text-sm text-gray-500">{Math.round(progress)}% завершено</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Индикатор шагов */}
      <div className="flex items-center justify-center mb-8">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === currentStep ? 'bg-blue-500 text-white' :
              step < currentStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
            </div>
            {step < totalSteps && (
              <div className={`w-16 h-1 mx-2 ${
                step < currentStep ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Основной контент */}
      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && 'Контактная информация'}
            {currentStep > 1 && currentStep < totalSteps && serviceConfig.steps[currentStep - 1]?.title}
            {currentStep === totalSteps && 'Подтверждение заказа'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderStepContent()}

          {/* Навигация */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {currentStep > 1 ? (
              <Button 
                variant="outline" 
                onClick={goToPreviousStep}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Назад
              </Button>
            ) : <div />}

            {currentStep < totalSteps ? (
              <Button 
                onClick={goToNextStep}
                disabled={!canProceedToNext()}
                className="flex items-center gap-2"
              >
                Далее
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={!canProceedToNext() || loading}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                {loading ? 'Отправка...' : 'Оформить заказ и перейти к оплате'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
