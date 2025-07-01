
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, Clock, Zap } from 'lucide-react';

interface PriceCalculatorProps {
  platforms: string[];
  scenarios: number;
  complexity: string;
  dialogTypes: string[];
  onPriceUpdate: (price: number, breakdown: PriceBreakdown) => void;
}

interface PriceBreakdown {
  basePrice: number;
  platformMultiplier: number;
  complexityMultiplier: number;
  dialogTypesPrice: number;
  totalPrice: number;
  deliveryTime: string;
}

const PRICING_CONFIG = {
  basePrice: 3000,
  platforms: {
    'telegram': 0,
    'whatsapp': 500,
    'viber': 400,
    'vk': 300,
    'website': 800,
    'instagram': 600
  },
  complexity: {
    'simple': 1,
    'medium': 1.5,
    'advanced': 2.2
  },
  dialogTypes: {
    'lead-qualification': 800,
    'consultation': 1200,
    'support': 600,
    'sales': 1500,
    'booking': 1000
  },
  deliveryTimes: {
    'simple': '2-3 дня',
    'medium': '4-6 дней',
    'advanced': '7-10 дней'
  }
};

export default function PriceCalculator({ 
  platforms, 
  scenarios, 
  complexity, 
  dialogTypes, 
  onPriceUpdate 
}: PriceCalculatorProps) {
  const [breakdown, setBreakdown] = useState<PriceBreakdown>({
    basePrice: 0,
    platformMultiplier: 0,
    complexityMultiplier: 0,
    dialogTypesPrice: 0,
    totalPrice: 0,
    deliveryTime: '2-3 дня'
  });

  useEffect(() => {
    calculatePrice();
  }, [platforms, scenarios, complexity, dialogTypes]);

  const calculatePrice = () => {
    let basePrice = PRICING_CONFIG.basePrice;
    
    // Platform pricing
    const platformMultiplier = platforms.reduce((sum, platform) => {
      return sum + (PRICING_CONFIG.platforms[platform as keyof typeof PRICING_CONFIG.platforms] || 0);
    }, 0);

    // Complexity multiplier
    const complexityMult = PRICING_CONFIG.complexity[complexity as keyof typeof PRICING_CONFIG.complexity] || 1;
    
    // Dialog types pricing
    const dialogTypesPrice = dialogTypes.reduce((sum, type) => {
      return sum + (PRICING_CONFIG.dialogTypes[type as keyof typeof PRICING_CONFIG.dialogTypes] || 0);
    }, 0);

    // Scenarios adjustment
    const scenarioAdjustment = Math.max(0, (scenarios - 15) * 200);

    const totalPrice = Math.round(
      (basePrice + platformMultiplier + dialogTypesPrice + scenarioAdjustment) * complexityMult
    );

    const deliveryTime = PRICING_CONFIG.deliveryTimes[complexity as keyof typeof PRICING_CONFIG.deliveryTimes] || '2-3 дня';

    const newBreakdown = {
      basePrice: basePrice + scenarioAdjustment,
      platformMultiplier,
      complexityMultiplier: Math.round((basePrice + platformMultiplier + dialogTypesPrice + scenarioAdjustment) * (complexityMult - 1)),
      dialogTypesPrice,
      totalPrice,
      deliveryTime
    };

    setBreakdown(newBreakdown);
    onPriceUpdate(totalPrice, newBreakdown);
  };

  const formatPrice = (price: number) => `${price.toLocaleString()} ₽`;

  return (
    <Card className="sticky top-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Calculator className="w-5 h-5" />
          Расчет стоимости
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Базовая стоимость:</span>
            <span className="font-medium">{formatPrice(breakdown.basePrice)}</span>
          </div>
          
          {breakdown.platformMultiplier > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Доп. платформы:</span>
              <span className="font-medium text-blue-600">+{formatPrice(breakdown.platformMultiplier)}</span>
            </div>
          )}
          
          {breakdown.dialogTypesPrice > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Типы диалогов:</span>
              <span className="font-medium text-blue-600">+{formatPrice(breakdown.dialogTypesPrice)}</span>
            </div>
          )}
          
          {breakdown.complexityMultiplier > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Сложность:</span>
              <span className="font-medium text-orange-600">+{formatPrice(breakdown.complexityMultiplier)}</span>
            </div>
          )}
        </div>
        
        <hr className="border-blue-200" />
        
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
        
        <div className="bg-white/60 rounded-lg p-3 border border-blue-200">
          <div className="flex items-center gap-2 text-sm text-blue-800">
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">Экономия до 40%</span>
          </div>
          <p className="text-xs text-blue-700 mt-1">
            По сравнению с разработкой с нуля
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
