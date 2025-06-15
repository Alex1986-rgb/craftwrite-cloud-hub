
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calculator, 
  TrendingUp, 
  Clock, 
  Star, 
  Zap, 
  Target,
  DollarSign,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Service } from '@/data/types/service';

interface LivePriceCalculatorProps {
  selectedService: Service;
  filters: Record<string, any>;
  answers: Record<string, any>;
  onOrderNow?: () => void;
  className?: string;
}

export default function LivePriceCalculator({
  selectedService,
  filters,
  answers,
  onOrderNow,
  className
}: LivePriceCalculatorProps) {
  const calculatePrice = () => {
    let basePrice = selectedService.price.min;
    let multiplier = 1;
    
    // Применяем мультипликаторы из фильтров
    Object.entries(filters).forEach(([key, value]) => {
      if (value && typeof value === 'string') {
        // Здесь должна быть логика расчета на основе конкретных фильтров
        if (key === 'seo_optimization' && value === 'advanced') multiplier += 0.3;
        if (key === 'seo_optimization' && value === 'technical') multiplier += 0.6;
        if (key === 'competitor_analysis' && value === 'basic') multiplier += 0.1;
        if (key === 'competitor_analysis' && value === 'detailed') multiplier += 0.4;
      }
    });
    
    return Math.round(basePrice * multiplier);
  };

  const totalPrice = calculatePrice();
  const savings = Math.round((totalPrice - selectedService.price.min) * 0.15);

  const getConfigurationScore = () => {
    const totalFilters = Object.keys(filters).length + Object.keys(answers).length;
    const configuredFilters = Object.values({...filters, ...answers}).filter(value => 
      value !== undefined && value !== null && value !== '' && 
      (!Array.isArray(value) || value.length > 0)
    ).length;
    
    return Math.min(100, Math.round((configuredFilters / Math.max(totalFilters, 1)) * 100));
  };

  const configScore = getConfigurationScore();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Основной калькулятор цены */}
      <Card className="sticky top-6 shadow-xl border-2 border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Калькулятор стоимости
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Базовая цена */}
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Базовая стоимость:</span>
              <span className="font-medium">{selectedService.price.min.toLocaleString()} ₽</span>
            </div>
            
            {/* Дополнительные опции */}
            {totalPrice > selectedService.price.min && (
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-600">Дополнительные опции:</span>
                <span className="font-medium text-purple-600">
                  +{(totalPrice - selectedService.price.min).toLocaleString()} ₽
                </span>
              </div>
            )}
            
            {/* Итоговая цена */}
            <div className="flex justify-between items-center py-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg px-4">
              <span className="text-lg font-semibold text-gray-900">Итого:</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {totalPrice.toLocaleString()} ₽
                </div>
                {savings > 0 && (
                  <div className="text-sm text-gray-500">
                    Экономия: {savings} ₽
                  </div>
                )}
              </div>
            </div>
            
            {/* Срок выполнения */}
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Срок выполнения:</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">
                {selectedService.deliveryTime.min} дня
              </Badge>
            </div>

            {/* Кнопка заказа */}
            <Button 
              onClick={onOrderNow}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 text-lg font-semibold"
              disabled={configScore < 50}
            >
              {configScore >= 50 ? (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Заказать сейчас
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Заполните больше настроек
                </>
              )}
            </Button>
            
            {configScore < 50 && (
              <p className="text-xs text-center text-gray-500">
                Минимум 50% настроек для оформления заказа
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Статистика конфигурации */}
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-green-900">Готовность заказа</h4>
            <Badge className={`${configScore >= 70 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
              {configScore}%
            </Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${configScore}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-semibold text-green-700">{Object.keys(filters).length}</div>
              <div className="text-green-600">Фильтров</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-blue-700">{Object.keys(answers).length}</div>
              <div className="text-blue-600">Ответов</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-purple-700">{configScore}%</div>
              <div className="text-purple-600">Готово</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Гарантии */}
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Наши гарантии
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-yellow-800">
              <CheckCircle2 className="w-3 h-3 text-yellow-600" />
              Уникальность 80-100%
            </div>
            <div className="flex items-center gap-2 text-yellow-800">
              <CheckCircle2 className="w-3 h-3 text-yellow-600" />
              Бесплатные правки
            </div>
            <div className="flex items-center gap-2 text-yellow-800">
              <CheckCircle2 className="w-3 h-3 text-yellow-600" />
              Соблюдение сроков
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
