
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SmartFilter } from '@/types/advancedOrder';
import FilterInput from './filters/FilterInput';
import { CheckCircle2, AlertCircle, TrendingUp, Lightbulb } from 'lucide-react';

interface FilterGroupCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  filters: SmartFilter[];
  values: Record<string, any>;
  onValueChange: (filterId: string, value: any) => void;
  className?: string;
}

export default function FilterGroupCard({
  title,
  description,
  icon: Icon,
  filters,
  values,
  onValueChange,
  className
}: FilterGroupCardProps) {
  const completedFilters = filters.filter(filter => {
    const value = values[filter.id];
    return value !== undefined && value !== null && value !== '' && 
           (!Array.isArray(value) || value.length > 0);
  }).length;

  const completionPercentage = Math.round((completedFilters / filters.length) * 100);

  const getPriceImpact = () => {
    let totalImpact = 0;
    filters.forEach(filter => {
      const value = values[filter.id];
      if (value && filter.options) {
        const selectedOption = filter.options.find(opt => opt.value === value);
        if (selectedOption?.priceMultiplier && selectedOption.priceMultiplier > 1) {
          totalImpact += (selectedOption.priceMultiplier - 1) * 100;
        }
      }
    });
    return totalImpact;
  };

  const priceImpact = getPriceImpact();

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}>
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-gray-900">{title}</CardTitle>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {completedFilters > 0 && (
              <Badge variant="default" className="bg-green-100 text-green-800">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                {completedFilters}/{filters.length}
              </Badge>
            )}
            {priceImpact > 0 && (
              <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{Math.round(priceImpact)}%
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm text-gray-600">Заполнено:</span>
          <span className="text-sm font-medium text-purple-600">{completionPercentage}%</span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid gap-6">
          {filters.map(filter => {
            const value = values[filter.id];
            const hasValue = value !== undefined && value !== null && value !== '' && 
                             (!Array.isArray(value) || value.length > 0);
            
            return (
              <div key={filter.id} className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                hasValue ? 'border-green-200 bg-green-50/30' : 'border-gray-200 hover:border-purple-200'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{filter.name}</h4>
                    {filter.description && (
                      <p className="text-sm text-gray-600 mb-3">{filter.description}</p>
                    )}
                  </div>
                  {hasValue && (
                    <CheckCircle2 className="w-5 h-5 text-green-500 ml-2 flex-shrink-0" />
                  )}
                </div>
                
                <FilterInput
                  filter={filter}
                  value={value}
                  onChange={(newValue) => onValueChange(filter.id, newValue)}
                />
                
                {filter.recommendations && filter.recommendations.length > 0 && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-800">
                        <strong>Совет:</strong> {filter.recommendations[0]}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
