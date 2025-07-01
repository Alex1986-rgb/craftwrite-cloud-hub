
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, Clock, Zap, CheckCircle } from 'lucide-react';

interface SmartPriceCalculatorProps {
  serviceType: string;
  characterCount: number;
  urgencyMultiplier: number;
  additionalServices: string[];
  onPriceUpdate: (price: number, breakdown: PriceBreakdown) => void;
}

interface PriceBreakdown {
  basePrice: number;
  characterPrice: number;
  urgencyPrice: number;
  additionalServicesPrice: number;
  totalPrice: number;
  deliveryTime: string;
  discount: number;
}

const SERVICE_PRICING = {
  'seo-article': { basePrice: 2000, pricePerChar: 0.4, minChars: 3000 },
  'landing-page': { basePrice: 15000, pricePerChar: 0.8, minChars: 5000 },
  'sales-letter': { basePrice: 12000, pricePerChar: 0.7, minChars: 4000 },
  'product-description': { basePrice: 1000, pricePerChar: 0.3, minChars: 1000 },
  'blog-post': { basePrice: 2500, pricePerChar: 0.45, minChars: 2500 },
  'email-sequence': { basePrice: 8000, pricePerChar: 0.6, minChars: 3000 },
  'social-media': { basePrice: 500, pricePerChar: 1.2, minChars: 500 },
  'press-release': { basePrice: 3000, pricePerChar: 0.5, minChars: 2000 }
};

const ADDITIONAL_SERVICES = {
  'competitor-analysis': { price: 3000, title: 'Анализ конкурентов' },
  'keyword-research': { price: 2000, title: 'Подбор ключевых слов' },
  'content-plan': { price: 4000, title: 'Контент-план' },
  'seo-optimization': { price: 2500, title: 'SEO-оптимизация' },
  'urgency-24h': { price: 0, title: 'Срочность 24 часа', multiplier: 2 },
  'urgency-48h': { price: 0, title: 'Срочность 48 часов', multiplier: 1.5 },
  'revision-guarantee': { price: 1500, title: 'Гарантия правок' }
};

const URGENCY_MULTIPLIERS = {
  1: { label: 'Стандартные сроки', days: '5-7 дней', multiplier: 1 },
  1.3: { label: 'Быстро', days: '3-4 дня', multiplier: 1.3 },
  1.5: { label: 'Очень быстро', days: '1-2 дня', multiplier: 1.5 },
  2: { label: 'Экспресс', days: '24 часа', multiplier: 2 }
};

export default function SmartPriceCalculator({
  serviceType,
  characterCount,
  urgencyMultiplier,
  additionalServices,
  onPriceUpdate
}: SmartPriceCalculatorProps) {
  const [breakdown, setBreakdown] = useState<PriceBreakdown>({
    basePrice: 0,
    characterPrice: 0,
    urgencyPrice: 0,
    additionalServicesPrice: 0,
    totalPrice: 0,
    deliveryTime: '5-7 дней',
    discount: 0
  });

  useEffect(() => {
    calculatePrice();
  }, [serviceType, characterCount, urgencyMultiplier, additionalServices]);

  const calculatePrice = () => {
    if (!serviceType || !SERVICE_PRICING[serviceType as keyof typeof SERVICE_PRICING]) {
      return;
    }

    const servicePricing = SERVICE_PRICING[serviceType as keyof typeof SERVICE_PRICING];
    const basePrice = servicePricing.basePrice;
    
    // Character-based pricing
    const effectiveCharCount = Math.max(characterCount, servicePricing.minChars);
    const characterPrice = Math.round((effectiveCharCount - servicePricing.minChars) * servicePricing.pricePerChar);
    
    // Additional services
    const additionalServicesPrice = additionalServices.reduce((sum, serviceId) => {
      const service = ADDITIONAL_SERVICES[serviceId as keyof typeof ADDITIONAL_SERVICES];
      return sum + (service?.price || 0);
    }, 0);
    
    // Base total before urgency
    const subtotal = basePrice + characterPrice + additionalServicesPrice;
    
    // Urgency pricing
    const urgencyPrice = Math.round(subtotal * (urgencyMultiplier - 1));
    
    // Volume discount
    let discount = 0;
    if (subtotal > 50000) discount = Math.round(subtotal * 0.15);
    else if (subtotal > 30000) discount = Math.round(subtotal * 0.1);
    else if (subtotal > 20000) discount = Math.round(subtotal * 0.05);
    
    const totalPrice = subtotal + urgencyPrice - discount;
    
    const deliveryTime = URGENCY_MULTIPLIERS[urgencyMultiplier as keyof typeof URGENCY_MULTIPLIERS]?.days || '5-7 дней';
    
    const newBreakdown: PriceBreakdown = {
      basePrice,
      characterPrice,
      urgencyPrice,
      additionalServicesPrice,
      totalPrice,
      deliveryTime,
      discount
    };
    
    setBreakdown(newBreakdown);
    onPriceUpdate(totalPrice, newBreakdown);
  };

  const formatPrice = (price: number) => `${price.toLocaleString()} ₽`;

  if (!serviceType) {
    return (
      <Card className="sticky top-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Калькулятор стоимости
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            Выберите тип контента для расчёта стоимости
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Calculator className="w-5 h-5" />
          Расчёт стоимости
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Базовая стоимость:</span>
            <span className="font-medium">{formatPrice(breakdown.basePrice)}</span>
          </div>
          
          {breakdown.characterPrice > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Доп. символы ({(characterCount - SERVICE_PRICING[serviceType as keyof typeof SERVICE_PRICING]?.minChars || 0).toLocaleString()}):
              </span>
              <span className="font-medium text-blue-600">+{formatPrice(breakdown.characterPrice)}</span>
            </div>
          )}
          
          {breakdown.additionalServicesPrice > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Доп. услуги:</span>
              <span className="font-medium text-blue-600">+{formatPrice(breakdown.additionalServicesPrice)}</span>
            </div>
          )}
          
          {breakdown.urgencyPrice > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Срочность:</span>
              <span className="font-medium text-orange-600">+{formatPrice(breakdown.urgencyPrice)}</span>
            </div>
          )}
          
          {breakdown.discount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Скидка за объём:</span>
              <span className="font-medium text-green-600">-{formatPrice(breakdown.discount)}</span>
            </div>
          )}
        </div>
        
        <hr className="border-blue-200" />
        
        {/* Total price */}
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-900">Итого:</span>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              {formatPrice(breakdown.totalPrice)}
            </div>
            <Badge variant="outline" className="text-xs mt-1">
              <Clock className="w-3 h-3 mr-1" />
              {breakdown.deliveryTime}
            </Badge>
          </div>
        </div>
        
        {/* Benefits */}
        <div className="bg-white/60 rounded-lg p-3 border border-blue-200">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <CheckCircle className="w-4 h-4" />
              <span>Гарантия качества</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <CheckCircle className="w-4 h-4" />
              <span>Бесплатные правки</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <CheckCircle className="w-4 h-4" />
              <span>100% уникальность</span>
            </div>
          </div>
        </div>
        
        {/* Savings indicator */}
        {breakdown.totalPrice > 20000 && (
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <div className="flex items-center gap-2 text-sm text-green-800">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">Экономия до 40%</span>
            </div>
            <p className="text-xs text-green-700 mt-1">
              По сравнению с агентствами полного цикла
            </p>
          </div>
        )}
        
        {/* Urgency indicator */}
        {urgencyMultiplier > 1 && (
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
            <div className="flex items-center gap-2 text-sm text-orange-800">
              <Zap className="w-4 h-4" />
              <span className="font-medium">Срочный заказ</span>
            </div>
            <p className="text-xs text-orange-700 mt-1">
              Приоритетное выполнение в течение {breakdown.deliveryTime}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
