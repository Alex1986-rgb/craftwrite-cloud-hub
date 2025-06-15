
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Info, Filter, RotateCcw } from 'lucide-react';
import { SmartFilter } from '@/types/advancedOrder';
import { COMMON_FILTERS } from '@/data/orderFiltersConfig';
import FilterInput from './filters/FilterInput';
import FilterRecommendations from './filters/FilterRecommendations';

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

  const applicableFilters = useMemo(() => {
    if (!selectedService) return COMMON_FILTERS;
    
    const allFilters = [...COMMON_FILTERS];
    
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

            <FilterInput
              filter={filter}
              value={filters[filter.id]}
              onChange={(value) => updateFilter(filter.id, value)}
            />

            {filter.recommendations && showRecommendations[filter.id] && (
              <FilterRecommendations recommendations={filter.recommendations} />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
