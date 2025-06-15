
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calculator, TrendingUp, Clock, Target, DollarSign } from 'lucide-react';

interface PriceBreakdown {
  basePrice: number;
  filterAdjustments: Record<string, number>;
  totalPrice: number;
  currency: string;
  estimatedDays: number;
  confidence: number;
}

interface EnhancedPriceCalculatorProps {
  selectedService: any;
  filters: Record<string, any>;
  answers: Record<string, any>;
  className?: string;
}

export default function EnhancedPriceCalculator({
  selectedService,
  filters,
  answers,
  className
}: EnhancedPriceCalculatorProps) {
  const priceBreakdown = useMemo((): PriceBreakdown => {
    if (!selectedService) {
      return {
        basePrice: 0,
        filterAdjustments: {},
        totalPrice: 0,
        currency: '₽',
        estimatedDays: 0,
        confidence: 0
      };
    }

    let basePrice = selectedService.price.min;
    const adjustments: Record<string, number> = {};
    let totalMultiplier = 1;
    let estimatedDays = selectedService.deliveryTime.min;

    // Расчет корректировок на основе фильтров
    Object.entries(filters).forEach(([key, value]) => {
      switch (key) {
        case 'textLength':
          if (value > 5000) {
            const lengthMultiplier = 1 + ((value - 5000) / 10000);
            adjustments['Объем текста'] = Math.round((lengthMultiplier - 1) * basePrice);
            totalMultiplier *= lengthMultiplier;
          }
          break;

        case 'priority':
          if (value === 'urgent') {
            adjustments['Срочное выполнение'] = Math.round(basePrice * 0.5);
            totalMultiplier *= 1.5;
            estimatedDays = Math.ceil(estimatedDays / 2);
          } else if (value === 'express') {
            adjustments['Экспресс выполнение'] = Math.round(basePrice * 1.0);
            totalMultiplier *= 2;
            estimatedDays = 1;
          }
          break;

        case 'writingStyle':
          if (value === 'luxury' || value === 'expert') {
            adjustments['Премиум стиль'] = Math.round(basePrice * 0.3);
            totalMultiplier *= 1.3;
          }
          break;

        case 'targetAudience':
          if (Array.isArray(value) && value.length > 2) {
            adjustments['Многосегментная аудитория'] = Math.round(basePrice * 0.2);
            totalMultiplier *= 1.2;
          }
          break;

        case 'seo_optimization':
          if (value === 'advanced') {
            adjustments['Расширенная SEO-оптимизация'] = 2000;
            totalMultiplier *= 1.4;
          } else if (value === 'technical') {
            adjustments['Техническая SEO-оптимизация'] = 3500;
            totalMultiplier *= 1.7;
          }
          break;
      }
    });

    // Дополнительные корректировки на основе ответов
    Object.entries(answers).forEach(([key, value]) => {
      if (key === 'emails_count' && typeof value === 'number' && value > 1) {
        adjustments['Дополнительные письма'] = (value - 1) * 800;
      }
      if (key === 'competitors' && value && value.length > 50) {
        adjustments['Анализ конкурентов'] = 1500;
      }
    });

    const totalPrice = Math.round(basePrice * totalMultiplier + Object.values(adjustments).reduce((sum, adj) => sum + adj, 0));

    // Расчет уверенности в оценке
    const filledFiltersCount = Object.values(filters).filter(v => v !== undefined && v !== null && v !== '').length;
    const filledAnswersCount = Object.values(answers).filter(v => v !== undefined && v !== null && v !== '').length;
    const confidence = Math.min(100, (filledFiltersCount + filledAnswersCount) * 10);

    return {
      basePrice,
      filterAdjustments: adjustments,
      totalPrice,
      currency: '₽',
      estimatedDays,
      confidence
    };
  }, [selectedService, filters, answers]);

  const getPriceRange = () => {
    if (!selectedService) return null;
    
    const min = priceBreakdown.totalPrice;
    const max = Math.round(min * 1.3); // Максимальная цена на 30% больше
    
    return { min, max };
  };

  const priceRange = getPriceRange();

  if (!selectedService) {
    return (
      <Card className={className}>
        <CardContent className="p-8 text-center">
          <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Выберите услугу для расчета стоимости
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Расчет стоимости
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant={priceBreakdown.confidence > 80 ? "default" : "secondary"}>
            Точность: {priceBreakdown.confidence}%
          </Badge>
          <Progress value={priceBreakdown.confidence} className="h-2 flex-1" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Основная стоимость */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Базовая стоимость</span>
            <span className="font-medium">{priceBreakdown.basePrice.toLocaleString()} {priceBreakdown.currency}</span>
          </div>
          
          {/* Корректировки */}
          {Object.entries(priceBreakdown.filterAdjustments).map(([name, amount]) => (
            <div key={name} className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">+ {name}</span>
              <span className={amount > 0 ? "text-orange-600" : "text-green-600"}>
                +{amount.toLocaleString()} {priceBreakdown.currency}
              </span>
            </div>
          ))}
        </div>

        <hr />

        {/* Итоговая стоимость */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Итого:</span>
            <div className="text-right">
              <div className="text-2xl text-primary">
                {priceBreakdown.totalPrice.toLocaleString()} {priceBreakdown.currency}
              </div>
              {priceRange && (
                <div className="text-sm text-muted-foreground">
                  от {priceRange.min.toLocaleString()} до {priceRange.max.toLocaleString()} {priceBreakdown.currency}
                </div>
              )}
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium text-sm">{priceBreakdown.estimatedDays} дней</div>
                <div className="text-xs text-muted-foreground">Срок выполнения</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium text-sm">{priceBreakdown.confidence}%</div>
                <div className="text-xs text-muted-foreground">Точность оценки</div>
              </div>
            </div>
          </div>

          {/* Рекомендации по цене */}
          {priceBreakdown.confidence < 70 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-orange-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-orange-900 mb-1">Уточните детали для точной оценки</div>
                  <div className="text-orange-700">
                    Заполните больше фильтров и вопросов для получения более точной стоимости проекта.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Экономия при выборе пакета */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <DollarSign className="w-4 h-4 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-blue-900 mb-1">Экономьте при заказе пакета</div>
                <div className="text-blue-700">
                  При заказе 3+ текстов скидка до 15%. При заказе 5+ текстов скидка до 25%.
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
