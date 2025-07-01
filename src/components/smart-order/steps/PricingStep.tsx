
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Zap, CheckCircle, Star, Shield, TrendingUp } from 'lucide-react';

interface PricingStepProps {
  data: {
    basePrice: number;
    totalPrice: number;
    urgencyMultiplier: number;
    additionalServices: string[];
    deadline: string;
  };
  onUpdate: (data: Partial<PricingStepProps['data']>) => void;
  serviceType: string;
  characterCount: number;
}

const URGENCY_OPTIONS = [
  {
    id: '1',
    multiplier: 1,
    label: 'Стандартные сроки',
    description: '5-7 рабочих дней',
    icon: Clock,
    popular: false
  },
  {
    id: '1.3',
    multiplier: 1.3,
    label: 'Быстрое выполнение',
    description: '3-4 рабочих дня',
    icon: TrendingUp,
    popular: true
  },
  {
    id: '1.5',
    multiplier: 1.5,
    label: 'Очень быстро',
    description: '1-2 рабочих дня',
    icon: Zap,
    popular: false
  },
  {
    id: '2',
    multiplier: 2,
    label: 'Экспресс (24 часа)',
    description: 'Готово завтра',
    icon: Zap,
    popular: false
  }
];

const ADDITIONAL_SERVICES = [
  {
    id: 'competitor-analysis',
    title: 'Анализ конкурентов',
    description: 'Подробный анализ 5-10 конкурентов с рекомендациями',
    price: 3000,
    icon: TrendingUp
  },
  {
    id: 'keyword-research',
    title: 'Расширенный подбор ключевых слов',
    description: 'Семантическое ядро до 100 ключевых фраз',
    price: 2000,
    icon: Star
  },
  {
    id: 'content-plan',
    title: 'Контент-план на месяц',
    description: '30 идей для публикаций с описанием',
    price: 4000,
    icon: CheckCircle
  },
  {
    id: 'revision-guarantee',
    title: 'Расширенная гарантия правок',
    description: 'Неограниченные правки в течение 30 дней',
    price: 1500,
    icon: Shield
  }
];

export default function PricingStep({ 
  data, 
  onUpdate, 
  serviceType, 
  characterCount 
}: PricingStepProps) {
  const handleUrgencyChange = (multiplierStr: string) => {
    const multiplier = parseFloat(multiplierStr);
    onUpdate({ urgencyMultiplier: multiplier });
  };

  const handleAdditionalServiceToggle = (serviceId: string) => {
    const currentServices = data.additionalServices || [];
    const newServices = currentServices.includes(serviceId)
      ? currentServices.filter(id => id !== serviceId)
      : [...currentServices, serviceId];
    
    onUpdate({ additionalServices: newServices });
  };

  const calculateAdditionalServicesPrice = () => {
    return (data.additionalServices || []).reduce((sum, serviceId) => {
      const service = ADDITIONAL_SERVICES.find(s => s.id === serviceId);
      return sum + (service?.price || 0);
    }, 0);
  };

  const selectedUrgency = URGENCY_OPTIONS.find(
    opt => opt.multiplier === data.urgencyMultiplier
  ) || URGENCY_OPTIONS[0];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Сроки и дополнительные услуги
        </h2>
        <p className="text-gray-600">
          Выберите оптимальные условия для вашего проекта
        </p>
      </div>

      {/* Urgency Selection */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Сроки выполнения</Label>
        
        <RadioGroup
          value={data.urgencyMultiplier.toString()}
          onValueChange={handleUrgencyChange}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {URGENCY_OPTIONS.map((option) => (
              <Card
                key={option.id}
                className={`relative p-4 cursor-pointer transition-all ${
                  data.urgencyMultiplier === option.multiplier
                    ? 'ring-2 ring-blue-500 bg-blue-50'
                    : 'hover:shadow-md'
                }`}
                onClick={() => handleUrgencyChange(option.id)}
              >
                {option.popular && (
                  <Badge className="absolute top-2 right-2 bg-orange-500">
                    Популярно
                  </Badge>
                )}
                
                <div className="flex items-center space-x-3">
                  <RadioGroupItem 
                    value={option.id} 
                    id={option.id}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <option.icon className="w-4 h-4" />
                      <span className="font-medium">{option.label}</span>
                      {option.multiplier > 1 && (
                        <Badge variant="outline">
                          +{Math.round((option.multiplier - 1) * 100)}%
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Additional Services */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Дополнительные услуги</Label>
        <p className="text-sm text-gray-600">
          Усильте эффект основного текста профессиональными дополнениями
        </p>
        
        <div className="space-y-3">
          {ADDITIONAL_SERVICES.map((service) => (
            <Card key={service.id} className="p-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id={service.id}
                  checked={(data.additionalServices || []).includes(service.id)}
                  onCheckedChange={() => handleAdditionalServiceToggle(service.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <service.icon className="w-4 h-4 text-blue-600" />
                    <Label htmlFor={service.id} className="font-medium cursor-pointer">
                      {service.title}
                    </Label>
                    <Badge variant="outline" className="ml-auto">
                      +{service.price.toLocaleString()} ₽
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Price Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-4">
            Итоговая стоимость
          </h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Базовая стоимость:</span>
              <span>{data.basePrice?.toLocaleString() || 0} ₽</span>
            </div>
            
            {data.urgencyMultiplier > 1 && (
              <div className="flex justify-between text-orange-600">
                <span>Срочность ({selectedUrgency.label}):</span>
                <span>+{Math.round((data.basePrice || 0) * (data.urgencyMultiplier - 1)).toLocaleString()} ₽</span>
              </div>
            )}
            
            {calculateAdditionalServicesPrice() > 0 && (
              <div className="flex justify-between text-blue-600">
                <span>Дополнительные услуги:</span>
                <span>+{calculateAdditionalServicesPrice().toLocaleString()} ₽</span>
              </div>
            )}
            
            <hr className="border-green-200" />
            
            <div className="flex justify-between text-lg font-bold text-green-800">
              <span>К оплате:</span>
              <span>{data.totalPrice?.toLocaleString() || 0} ₽</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-green-700">
              <Clock className="w-4 h-4" />
              <span>Срок выполнения: {selectedUrgency.description}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Guarantees */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="p-4">
          <h4 className="font-semibold text-blue-900 mb-3">
            ✅ Гарантии качества
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 100% уникальность текста</li>
            <li>• Соответствие техническому заданию</li>
            <li>• Бесплатные правки в течение 7 дней</li>
            <li>• Возврат средств при неудовлетворительном результате</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
