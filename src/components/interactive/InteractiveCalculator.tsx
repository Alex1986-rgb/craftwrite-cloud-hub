
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, Clock, Zap, CheckCircle2 } from 'lucide-react';

interface CalculatorProps {
  serviceType?: string;
  onPriceChange?: (price: number) => void;
}

const serviceTypes = {
  'seo-article': { 
    name: 'SEO-статья', 
    basePrice: 800, 
    pricePerWord: 12,
    minWords: 500,
    maxWords: 5000,
    urgencyMultiplier: { standard: 1, fast: 1.5, urgent: 2 }
  },
  'landing-page': { 
    name: 'Landing page', 
    basePrice: 15000, 
    pricePerWord: 8,
    minWords: 1000,
    maxWords: 3000,
    urgencyMultiplier: { standard: 1, fast: 1.3, urgent: 1.8 }
  },
  'email-campaign': { 
    name: 'Email-кампания', 
    basePrice: 2500, 
    pricePerWord: 15,
    minWords: 300,
    maxWords: 1500,
    urgencyMultiplier: { standard: 1, fast: 1.4, urgent: 2 }
  },
  'social-media': { 
    name: 'SMM-контент', 
    basePrice: 1200, 
    pricePerWord: 25,
    minWords: 100,
    maxWords: 800,
    urgencyMultiplier: { standard: 1, fast: 1.6, urgent: 2.2 }
  },
  'product-desc': { 
    name: 'Описания товаров', 
    basePrice: 500, 
    pricePerWord: 8,
    minWords: 200,
    maxWords: 1000,
    urgencyMultiplier: { standard: 1, fast: 1.4, urgent: 1.9 }
  }
};

const complexityMultipliers = {
  'simple': { name: 'Простой', multiplier: 1, description: 'Стандартные требования' },
  'medium': { name: 'Средний', multiplier: 1.3, description: 'Специализированная тематика' },
  'complex': { name: 'Сложный', multiplier: 1.7, description: 'Экспертный уровень, исследования' }
};

const urgencyOptions = {
  'standard': { name: 'Стандартно', days: '5-7 дней', multiplier: 1 },
  'fast': { name: 'Быстро', days: '2-3 дня', multiplier: 1.5 },
  'urgent': { name: 'Срочно', days: '24 часа', multiplier: 2 }
};

export default function InteractiveCalculator({ serviceType, onPriceChange }: CalculatorProps) {
  const [selectedService, setSelectedService] = useState(serviceType || '');
  const [wordCount, setWordCount] = useState([1000]);
  const [complexity, setComplexity] = useState('medium');
  const [urgency, setUrgency] = useState('standard');
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [priceBreakdown, setPriceBreakdown] = useState<any>({});

  const additionalOptions = {
    'seo-optimization': { name: 'SEO-оптимизация', price: 2000 },
    'competitor-analysis': { name: 'Анализ конкурентов', price: 3000 },
    'revision-guarantee': { name: 'Расширенные правки', price: 1500 },
    'express-start': { name: 'Экспресс-старт', price: 2500 },
    'content-plan': { name: 'Контент-план', price: 4000 }
  };

  useEffect(() => {
    calculatePrice();
  }, [selectedService, wordCount, complexity, urgency, additionalServices]);

  const calculatePrice = () => {
    if (!selectedService) return;

    const service = serviceTypes[selectedService as keyof typeof serviceTypes];
    const words = wordCount[0];
    
    // Базовая стоимость
    const basePrice = service.basePrice;
    
    // Стоимость за слова
    const wordsPrice = Math.max(0, (words - service.minWords)) * service.pricePerWord;
    
    // Коэффициент сложности
    const complexityMult = complexityMultipliers[complexity as keyof typeof complexityMultipliers].multiplier;
    
    // Коэффициент срочности
    const urgencyMult = service.urgencyMultiplier[urgency as keyof typeof service.urgencyMultiplier];
    
    // Дополнительные услуги
    const additionalPrice = additionalServices.reduce((sum, serviceId) => {
      return sum + (additionalOptions[serviceId as keyof typeof additionalOptions]?.price || 0);
    }, 0);
    
    // Расчет итоговой стоимости
    const subtotal = (basePrice + wordsPrice) * complexityMult * urgencyMult;
    const total = subtotal + additionalPrice;
    
    // Скидка за объем
    const volumeDiscount = total > 50000 ? total * 0.1 : total > 25000 ? total * 0.05 : 0;
    const finalTotal = Math.round(total - volumeDiscount);
    
    setFinalPrice(finalTotal);
    setPriceBreakdown({
      basePrice,
      wordsPrice,
      complexityMult,
      urgencyMult,
      additionalPrice,
      volumeDiscount,
      total: finalTotal
    });
    
    onPriceChange?.(finalTotal);
  };

  const toggleAdditionalService = (serviceId: string) => {
    setAdditionalServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getDeliveryTime = () => {
    return urgencyOptions[urgency as keyof typeof urgencyOptions].days;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50/30">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Calculator className="w-8 h-8" />
          Калькулятор стоимости проекта
        </CardTitle>
        <p className="opacity-90">Рассчитайте точную стоимость вашего проекта за 1 минуту</p>
      </CardHeader>

      <CardContent className="p-8 space-y-8">
        {/* Выбор услуги */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Тип контента</Label>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="h-12 text-lg">
              <SelectValue placeholder="Выберите тип контента" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(serviceTypes).map(([key, service]) => (
                <SelectItem key={key} value={key} className="text-lg py-3">
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedService && (
          <>
            {/* Объем контента */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Объем контента</Label>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {wordCount[0].toLocaleString()} слов
                </Badge>
              </div>
              <Slider
                value={wordCount}
                onValueChange={setWordCount}
                max={serviceTypes[selectedService as keyof typeof serviceTypes].maxWords}
                min={serviceTypes[selectedService as keyof typeof serviceTypes].minWords}
                step={100}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{serviceTypes[selectedService as keyof typeof serviceTypes].minWords} слов</span>
                <span>{serviceTypes[selectedService as keyof typeof serviceTypes].maxWords} слов</span>
              </div>
            </div>

            {/* Сложность */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Сложность проекта</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(complexityMultipliers).map(([key, option]) => (
                  <Card 
                    key={key}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      complexity === key 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setComplexity(key)}
                  >
                    <CardContent className="p-4 text-center">
                      <h4 className="font-semibold text-lg">{option.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                      <Badge variant="secondary" className="mt-2">
                        ×{option.multiplier}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Срочность */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Сроки выполнения</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(urgencyOptions).map(([key, option]) => (
                  <Card 
                    key={key}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      urgency === key 
                        ? 'ring-2 ring-orange-500 bg-orange-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setUrgency(key)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock className="w-5 h-5" />
                        <h4 className="font-semibold">{option.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{option.days}</p>
                      {option.multiplier > 1 && (
                        <Badge variant="secondary" className="mt-2">
                          +{Math.round((option.multiplier - 1) * 100)}%
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Дополнительные услуги */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Дополнительные услуги</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(additionalOptions).map(([key, option]) => (
                  <Card 
                    key={key}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      additionalServices.includes(key) 
                        ? 'ring-2 ring-green-500 bg-green-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleAdditionalService(key)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {additionalServices.includes(key) && (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        )}
                        <span className="font-medium">{option.name}</span>
                      </div>
                      <Badge variant="outline">
                        +{option.price.toLocaleString()} ₽
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Результат */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Итоговая стоимость</h3>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">
                    {finalPrice.toLocaleString()} ₽
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <Clock className="w-4 h-4" />
                    <span>Готово через {getDeliveryTime()}</span>
                  </div>
                </div>
              </div>

              {priceBreakdown.volumeDiscount > 0 && (
                <div className="flex items-center gap-2 text-green-700 mb-3">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">
                    Скидка за объем: -{priceBreakdown.volumeDiscount.toLocaleString()} ₽
                  </span>
                </div>
              )}

              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Базовая стоимость:</span>
                  <span>{priceBreakdown.basePrice?.toLocaleString()} ₽</span>
                </div>
                {priceBreakdown.wordsPrice > 0 && (
                  <div className="flex justify-between">
                    <span>Доп. объем ({(wordCount[0] - serviceTypes[selectedService as keyof typeof serviceTypes].minWords)} слов):</span>
                    <span>+{priceBreakdown.wordsPrice?.toLocaleString()} ₽</span>
                  </div>
                )}
                {priceBreakdown.additionalPrice > 0 && (
                  <div className="flex justify-between">
                    <span>Дополнительные услуги:</span>
                    <span>+{priceBreakdown.additionalPrice?.toLocaleString()} ₽</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-green-200">
                <div className="flex items-center gap-2 text-blue-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm">Гарантия качества</span>
                </div>
                <div className="flex items-center gap-2 text-blue-700">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">Бесплатные правки</span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
