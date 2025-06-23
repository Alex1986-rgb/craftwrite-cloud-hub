
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Filter, 
  Clock, 
  DollarSign, 
  Star, 
  Zap, 
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '@/data/quickOrderServices';

interface SmartFiltersProps {
  selectedCategory: string;
  selectedPriceRange: string;
  selectedUrgency: string;
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (range: string) => void;
  onUrgencyChange: (urgency: string) => void;
}

const PRICE_RANGES = [
  { id: 'all', label: 'Любая цена', range: [0, Infinity] },
  { id: 'budget', label: 'До 2000₽', range: [0, 2000] },
  { id: 'medium', label: '2000-5000₽', range: [2000, 5000] },
  { id: 'premium', label: 'От 5000₽', range: [5000, Infinity] }
];

const URGENCY_OPTIONS = [
  { id: 'any', label: 'Любые сроки', icon: Clock },
  { id: 'fast', label: 'Срочно (1-2 дня)', icon: Zap },
  { id: 'standard', label: 'Стандарт (2-5 дней)', icon: Clock }
];

export default function SmartFilters({
  selectedCategory,
  selectedPriceRange,
  selectedUrgency,
  onCategoryChange,
  onPriceRangeChange,
  onUrgencyChange
}: SmartFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-4 mb-6 bg-gradient-to-r from-blue-50 to-purple-50/30 border-blue-200/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-slate-800">Умный поиск услуг</h3>
          <Badge variant="outline" className="text-xs">
            <Info className="w-3 h-3 mr-1" />
            С рекомендациями
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600"
        >
          {isExpanded ? (
            <>Скрыть <ChevronUp className="w-4 h-4 ml-1" /></>
          ) : (
            <>Фильтры <ChevronDown className="w-4 h-4 ml-1" /></>
          )}
        </Button>
      </div>

      {/* Categories - always visible */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {SERVICE_CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className={`text-xs transition-all duration-200 ${
                selectedCategory === category.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'hover:bg-blue-50 hover:border-blue-300'
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Expanded filters */}
      {isExpanded && (
        <div className="space-y-4 border-t border-blue-200/50 pt-4">
          {/* Price Range */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              Бюджет проекта
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {PRICE_RANGES.map((range) => (
                <Button
                  key={range.id}
                  variant={selectedPriceRange === range.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPriceRangeChange(range.id)}
                  className={`text-xs ${
                    selectedPriceRange === range.id 
                      ? 'bg-green-600 text-white' 
                      : 'hover:bg-green-50'
                  }`}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Urgency */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              Сроки выполнения
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {URGENCY_OPTIONS.map((option) => {
                const Icon = option.icon;
                return (
                  <Button
                    key={option.id}
                    variant={selectedUrgency === option.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => onUrgencyChange(option.id)}
                    className={`text-xs justify-start ${
                      selectedUrgency === option.id 
                        ? 'bg-orange-600 text-white' 
                        : 'hover:bg-orange-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Quick tips */}
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <Star className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-800">
                <div className="font-medium mb-1">💡 Рекомендация эксперта:</div>
                <div>
                  {selectedCategory === 'content' && 'SEO-статьи лучше всего работают при объёме от 1500 слов'}
                  {selectedCategory === 'sales' && 'Лендинги с персонализацией конвертируют на 40% лучше'}
                  {selectedCategory === 'email' && 'Email-последовательности из 5-7 писем показывают максимальный ROI'}
                  {selectedCategory === 'social' && 'Контент-планы на месяц вперёд экономят до 60% времени'}
                  {selectedCategory === 'all' && 'Комплексные проекты получают скидку до 20%'}
                  {!['content', 'sales', 'email', 'social', 'all'].includes(selectedCategory) && 
                    'Выберите категорию для получения персональных рекомендаций'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
