
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Info, Filter, RotateCcw, Lightbulb } from 'lucide-react';
import { SmartFilter } from '@/types/advancedOrder';
import { COMMON_FILTERS } from '@/data/orderFiltersConfig';

interface SmartOrderFiltersProps {
  selectedService: any;
  filters: Record<string, any>;
  onFiltersChange: (filters: Record<string, any>) => void;
  className?: string;
}

export default function SmartOrderFilters({ 
  selectedService, 
  filters, 
  onFiltersChange,
  className 
}: SmartOrderFiltersProps) {
  const [showRecommendations, setShowRecommendations] = useState<Record<string, boolean>>({});

  // Получаем применимые фильтры для выбранной услуги
  const applicableFilters = useMemo(() => {
    if (!selectedService) return COMMON_FILTERS;
    
    // Логика определения релевантных фильтров по типу услуги
    const allFilters = [...COMMON_FILTERS];
    
    // Добавляем специфичные фильтры для определенных услуг
    if (selectedService.category === 'SEO-контент') {
      allFilters.push({
        id: 'seo_optimization',
        name: 'SEO-оптимизация',
        type: 'select',
        options: [
          { value: 'basic', label: 'Базовая', description: 'Ключевые слова в тексте' },
          { value: 'advanced', label: 'Расширенная', description: 'Глубокий анализ конкурентов' },
          { value: 'technical', label: 'Техническая', description: 'Мета-теги, разметка, структура' }
        ],
        recommendations: ['Техническая SEO-оптимизация повышает эффективность в 2-3 раза']
      } as SmartFilter);
    }

    return allFilters;
  }, [selectedService]);

  const updateFilter = (filterId: string, value: any) => {
    onFiltersChange({
      ...filters,
      [filterId]: value
    });
  };

  const resetFilters = () => {
    const defaultFilters: Record<string, any> = {};
    applicableFilters.forEach(filter => {
      if (filter.defaultValue !== undefined) {
        defaultFilters[filter.id] = filter.defaultValue;
      }
    });
    onFiltersChange(defaultFilters);
  };

  const toggleRecommendations = (filterId: string) => {
    setShowRecommendations(prev => ({
      ...prev,
      [filterId]: !prev[filterId]
    }));
  };

  const renderFilterInput = (filter: SmartFilter) => {
    const value = filters[filter.id];

    switch (filter.type) {
      case 'select':
        return (
          <Select value={value || ''} onValueChange={(val) => updateFilter(filter.id, val)}>
            <SelectTrigger>
              <SelectValue placeholder={`Выберите ${filter.name.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {filter.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div>
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'multiselect':
        return (
          <div className="space-y-2">
            {filter.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${filter.id}-${option.value}`}
                  checked={value?.includes?.(option.value) || false}
                  onCheckedChange={(checked) => {
                    const currentValues = value || [];
                    if (checked) {
                      updateFilter(filter.id, [...currentValues, option.value]);
                    } else {
                      updateFilter(filter.id, currentValues.filter((v: string) => v !== option.value));
                    }
                  }}
                />
                <Label htmlFor={`${filter.id}-${option.value}`} className="text-sm">
                  {option.label}
                  {option.description && (
                    <span className="text-xs text-muted-foreground block">{option.description}</span>
                  )}
                </Label>
              </div>
            ))}
          </div>
        );

      case 'range':
        return (
          <div className="space-y-4">
            <Slider
              value={[value || filter.defaultValue || filter.min || 0]}
              min={filter.min}
              max={filter.max}
              step={100}
              onValueChange={(val) => updateFilter(filter.id, val[0])}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filter.min} символов</span>
              <span className="font-medium">{value || filter.defaultValue || filter.min} символов</span>
              <span>{filter.max} символов</span>
            </div>
          </div>
        );

      case 'text':
        return (
          <Input
            value={value || ''}
            onChange={(e) => updateFilter(filter.id, e.target.value)}
            placeholder={`Введите ${filter.name.toLowerCase()}`}
          />
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={filter.id}
              checked={value || false}
              onCheckedChange={(checked) => updateFilter(filter.id, checked)}
            />
            <Label htmlFor={filter.id}>{filter.name}</Label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Настройки заказа
          </CardTitle>
          <Button variant="outline" size="sm" onClick={resetFilters}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Сбросить
          </Button>
        </div>
        {selectedService && (
          <Badge variant="secondary" className="w-fit">
            {selectedService.name}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {applicableFilters.map((filter) => (
          <div key={filter.id} className="space-y-3">
            <div className="flex items-center gap-2">
              <Label className="font-medium">{filter.name}</Label>
              {filter.description && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => toggleRecommendations(filter.id)}
                >
                  <Info className="w-4 h-4" />
                </Button>
              )}
            </div>

            {filter.description && (
              <p className="text-sm text-muted-foreground">{filter.description}</p>
            )}

            {renderFilterInput(filter)}

            {filter.recommendations && showRecommendations[filter.id] && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="space-y-2">
                      <p className="font-medium text-blue-900 text-sm">Рекомендации:</p>
                      <ul className="space-y-1">
                        {filter.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-sm text-blue-700">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
