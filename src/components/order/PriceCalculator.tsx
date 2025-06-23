
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, Clock } from 'lucide-react';

interface PriceCalculatorProps {
  basePrice: number;
  urgencyMultiplier: number;
  complexityMultiplier: number;
  additionalServices: string[];
  onPriceChange: (price: number) => void;
}

export default function PriceCalculator({
  basePrice,
  urgencyMultiplier,
  complexityMultiplier,
  additionalServices,
  onPriceChange
}: PriceCalculatorProps) {
  const additionalServicesPrices: Record<string, number> = {
    'seo-optimization': 1000,
    'meta-tags': 500,
    'images': 800,
    'infographics': 1500,
    'express-delivery': 2000,
    'revisions': 1000,
    'competitor-analysis': 1200
  };

  const additionalServicesTotal = additionalServices.reduce((total, service) => {
    return total + (additionalServicesPrices[service] || 0);
  }, 0);

  const urgencyPrice = basePrice * (urgencyMultiplier - 1);
  const complexityPrice = basePrice * (complexityMultiplier - 1);
  
  const totalPrice = Math.round(
    basePrice + 
    urgencyPrice + 
    complexityPrice + 
    additionalServicesTotal
  );

  // Уведомляем родительский компонент об изменении цены
  React.useEffect(() => {
    onPriceChange(totalPrice);
  }, [totalPrice, onPriceChange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Расчет стоимости
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Базовая стоимость:</span>
            <span>{basePrice.toLocaleString()} ₽</span>
          </div>
          
          {urgencyMultiplier > 1 && (
            <div className="flex justify-between text-orange-600">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Срочность (+{Math.round((urgencyMultiplier - 1) * 100)}%):
              </span>
              <span>+{urgencyPrice.toLocaleString()} ₽</span>
            </div>
          )}
          
          {complexityMultiplier > 1 && (
            <div className="flex justify-between text-blue-600">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                Сложность (+{Math.round((complexityMultiplier - 1) * 100)}%):
              </span>
              <span>+{complexityPrice.toLocaleString()} ₽</span>
            </div>
          )}
          
          {additionalServices.length > 0 && (
            <div className="space-y-1">
              <div className="text-sm font-medium text-gray-700">Дополнительные услуги:</div>
              {additionalServices.map((service) => (
                <div key={service} className="flex justify-between text-sm pl-4">
                  <span>• {getServiceName(service)}</span>
                  <span>+{(additionalServicesPrices[service] || 0).toLocaleString()} ₽</span>
                </div>
              ))}
            </div>
          )}
          
          <hr className="my-3" />
          
          <div className="flex justify-between font-bold text-lg">
            <span>Итого:</span>
            <div className="text-right">
              <div className="text-green-600">{totalPrice.toLocaleString()} ₽</div>
              {totalPrice !== basePrice && (
                <Badge variant="outline" className="text-xs">
                  Экономия при заказе пакета
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getServiceName(serviceKey: string): string {
  const names: Record<string, string> = {
    'seo-optimization': 'SEO-оптимизация',
    'meta-tags': 'Мета-теги',
    'images': 'Подбор изображений',
    'infographics': 'Инфографика',
    'express-delivery': 'Экспресс-доставка',
    'revisions': 'Дополнительные правки',
    'competitor-analysis': 'Анализ конкурентов'
  };
  return names[serviceKey] || serviceKey;
}
