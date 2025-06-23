
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, Calculator, CreditCard, Edit, FileText } from 'lucide-react';
import { ServiceFormConfig } from '@/data/serviceFormConfigs';

interface OrderSummaryStepProps {
  serviceName: string;
  formData: any;
  serviceConfig: ServiceFormConfig;
  estimatedPrice: number;
  deliveryTime: string;
  onEdit: () => void;
}

export default function OrderSummaryStep({
  serviceName,
  formData,
  serviceConfig,
  estimatedPrice,
  deliveryTime,
  onEdit
}: OrderSummaryStepProps) {
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);

  const getFieldLabel = (fieldName: string): string => {
    const allFields = Object.values(serviceConfig.steps).reduce((acc, step) => {
      return { ...acc, ...step.fields };
    }, {});
    
    return allFields[fieldName]?.label || fieldName;
  };

  const getOptionLabel = (fieldName: string, value: any): string => {
    const allFields = Object.values(serviceConfig.steps).reduce((acc, step) => {
      return { ...acc, ...step.fields };
    }, {});
    
    const field = allFields[fieldName];
    if (field?.options) {
      const option = field.options.find(opt => opt.value === value);
      return option?.label || value;
    }
    
    if (Array.isArray(value)) {
      return value.map(v => {
        const option = field?.options?.find(opt => opt.value === v);
        return option?.label || v;
      }).join(', ');
    }
    
    return value;
  };

  const getAdditionalServiceLabel = (serviceId: string): string => {
    return serviceConfig.additionalServices?.[serviceId]?.label || serviceId;
  };

  const getDeliveryOptionLabel = (optionId: string): string => {
    return serviceConfig.deliveryOptions[optionId]?.label || optionId;
  };

  const renderPriceBreakdown = () => {
    const basePrice = serviceConfig.basePrice;
    const additionalServicesPrice = formData.additionalServices.reduce((sum: number, serviceId: string) => {
      const service = serviceConfig.additionalServices?.[serviceId];
      return sum + (service?.additionalPrice || 0);
    }, 0);
    
    const deliveryMultiplier = serviceConfig.deliveryOptions[formData.deliveryOption]?.priceMultiplier || 1;
    const urgencyPrice = deliveryMultiplier > 1 ? Math.round((basePrice + additionalServicesPrice) * (deliveryMultiplier - 1)) : 0;

    return (
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Детальная смета
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Базовая стоимость услуги</div>
                <div className="text-sm text-gray-600">{serviceName}</div>
              </div>
              <div className="font-medium">{basePrice.toLocaleString()}₽</div>
            </div>

            {formData.additionalServices.length > 0 && formData.additionalServices.map((serviceId: string) => {
              const service = serviceConfig.additionalServices?.[serviceId];
              if (!service) return null;
              
              return (
                <div key={serviceId} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{service.label}</div>
                    <div className="text-sm text-gray-600">Дополнительная услуга</div>
                  </div>
                  <div className="font-medium">+{service.additionalPrice?.toLocaleString()}₽</div>
                </div>
              );
            })}

            {urgencyPrice > 0 && (
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Доплата за срочность</div>
                  <div className="text-sm text-gray-600">
                    {getDeliveryOptionLabel(formData.deliveryOption)}
                  </div>
                </div>
                <div className="font-medium">+{urgencyPrice.toLocaleString()}₽</div>
              </div>
            )}

            <Separator />
            
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Итого к оплате:</span>
              <span className="text-blue-600">{estimatedPrice.toLocaleString()}₽</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Итоговая стоимость */}
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Итоговая стоимость</h3>
        <div className="text-4xl font-bold text-blue-600 mb-2">{estimatedPrice.toLocaleString()}₽</div>
        <p className="text-gray-600">Срок выполнения: {deliveryTime}</p>
      </div>

      {/* Кнопка детальной сметы */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
          className="flex items-center gap-2"
        >
          <Calculator className="w-4 h-4" />
          {showDetailedBreakdown ? 'Скрыть' : 'Показать'} детальную смету
        </Button>
      </div>

      {/* Детальная смета */}
      {showDetailedBreakdown && renderPriceBreakdown()}

      <Separator />

      {/* Детали заказа */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Детали заказа:</h4>
          <Button variant="outline" size="sm" onClick={onEdit} className="flex items-center gap-1">
            <Edit className="w-3 h-3" />
            Редактировать
          </Button>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Услуга:</strong> {serviceName}</p>
              <p><strong>Срок выполнения:</strong> {getDeliveryOptionLabel(formData.deliveryOption)}</p>
            </div>
            <div>
              <p><strong>Имя:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              {formData.phone && <p><strong>Телефон:</strong> {formData.phone}</p>}
            </div>
          </div>

          {Object.keys(formData.serviceFields).length > 0 && (
            <div>
              <p className="font-medium mb-2">Параметры услуги:</p>
              <div className="pl-4 space-y-1">
                {Object.entries(formData.serviceFields).map(([fieldName, value]) => (
                  <p key={fieldName}>
                    <strong>{getFieldLabel(fieldName)}:</strong> {getOptionLabel(fieldName, value)}
                  </p>
                ))}
              </div>
            </div>
          )}

          {formData.additionalServices.length > 0 && (
            <div>
              <p className="font-medium mb-2">Дополнительные услуги:</p>
              <div className="pl-4">
                <p>{formData.additionalServices.map(getAdditionalServiceLabel).join(', ')}</p>
              </div>
            </div>
          )}

          {formData.additionalRequirements && (
            <div>
              <p className="font-medium mb-2">Дополнительные требования:</p>
              <div className="pl-4">
                <p>{formData.additionalRequirements}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Информационные блоки */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Star className="w-5 h-5 text-blue-500 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-900">Что входит в услугу:</p>
            <ul className="mt-2 space-y-1 text-blue-800">
              <li>• Профессиональное выполнение работ</li>
              <li>• Проверка качества и уникальности</li>
              <li>• Бесплатные правки в течение 7 дней</li>
              <li>• Техническое задание и отчет</li>
              <li>• Круглосуточная поддержка</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <CreditCard className="w-5 h-5 text-green-600 mt-0.5" />
          <div className="text-sm text-green-800">
            <div className="font-medium mb-1">Что происходит после оформления заказа:</div>
            <ul className="space-y-1 text-green-700">
              <li>• Вы будете перенаправлены на страницу оплаты</li>
              <li>• Уведомление о заказе придет нашим менеджерам</li>
              <li>• После оплаты мы свяжемся с вами в течение 2 часов</li>
              <li>• Работа начнется немедленно после согласования деталей</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
