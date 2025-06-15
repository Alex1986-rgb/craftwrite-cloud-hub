
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SmartFilter } from '@/types/advancedOrder';
import { Info, TrendingUp, DollarSign } from 'lucide-react';

interface FilterInputProps {
  filter: SmartFilter;
  value: any;
  onChange: (value: any) => void;
}

export default function FilterInput({ filter, value, onChange }: FilterInputProps) {
  switch (filter.type) {
    case 'select':
      return (
        <div className="space-y-3">
          <Select value={value || ''} onValueChange={onChange}>
            <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <SelectValue placeholder={`Выберите ${filter.name.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              {filter.options?.map((option) => (
                <SelectItem key={option.value} value={option.value} className="py-3">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      {option.description && (
                        <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
                      )}
                    </div>
                    {option.priceMultiplier && option.priceMultiplier > 1 && (
                      <Badge variant="outline" className="ml-2 border-orange-200 text-orange-700 bg-orange-50">
                        <DollarSign className="w-3 h-3 mr-1" />
                        +{Math.round((option.priceMultiplier - 1) * 100)}%
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {value && filter.options && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              {(() => {
                const selectedOption = filter.options.find(opt => opt.value === value);
                return selectedOption ? (
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <span className="font-medium">{selectedOption.label}</span>
                      {selectedOption.description && (
                        <p className="mt-1">{selectedOption.description}</p>
                      )}
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </div>
      );

    case 'multiselect':
      return (
        <div className="space-y-4">
          <div className="grid gap-3">
            {filter.options?.map((option) => (
              <div key={option.value} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Checkbox
                  id={`${filter.id}-${option.value}`}
                  checked={value?.includes?.(option.value) || false}
                  onCheckedChange={(checked) => {
                    const currentValues = value || [];
                    if (checked) {
                      onChange([...currentValues, option.value]);
                    } else {
                      onChange(currentValues.filter((v: string) => v !== option.value));
                    }
                  }}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label htmlFor={`${filter.id}-${option.value}`} className="text-sm font-medium cursor-pointer">
                    {option.label}
                  </Label>
                  {option.description && (
                    <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                  )}
                </div>
                {option.priceMultiplier && option.priceMultiplier > 1 && (
                  <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +{Math.round((option.priceMultiplier - 1) * 100)}%
                  </Badge>
                )}
              </div>
            ))}
          </div>
          
          {value && value.length > 0 && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-green-800 mb-2">
                <Info className="w-4 h-4" />
                <span className="font-medium">Выбрано: {value.length} {value.length === 1 ? 'элемент' : 'элементов'}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {value.map((val: string) => {
                  const option = filter.options?.find(opt => opt.value === val);
                  return option ? (
                    <Badge key={val} variant="secondary" className="text-xs">
                      {option.label}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      );

    case 'range':
      const currentValue = value || filter.defaultValue || filter.min || 0;
      const percentage = filter.min && filter.max ? 
        ((currentValue - filter.min) / (filter.max - filter.min)) * 100 : 0;
      
      return (
        <div className="space-y-6">
          <div className="px-4">
            <Slider
              value={[currentValue]}
              min={filter.min}
              max={filter.max}
              step={100}
              onValueChange={(val) => onChange(val[0])}
              className="w-full"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Минимум</div>
              <div className="font-semibold text-gray-700">{filter.min?.toLocaleString()} символов</div>
            </div>
            <div className="p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <div className="text-xs text-blue-600 mb-1">Выбрано</div>
              <div className="font-bold text-blue-700 text-lg">{currentValue.toLocaleString()} символов</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Максимум</div>
              <div className="font-semibold text-gray-700">{filter.max?.toLocaleString()} символов</div>
            </div>
          </div>
          
          <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">Прогресс заполнения</span>
              <span className="text-sm text-blue-700">{Math.round(percentage)}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      );

    case 'text':
      return (
        <div className="space-y-3">
          <Input
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Введите ${filter.name.toLowerCase()}`}
            className="h-12 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors"
          />
          {value && (
            <div className="text-xs text-gray-500">
              Символов: {String(value).length}
            </div>
          )}
        </div>
      );

    case 'checkbox':
      return (
        <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Checkbox
            id={filter.id}
            checked={value || false}
            onCheckedChange={onChange}
          />
          <Label htmlFor={filter.id} className="font-medium cursor-pointer">
            {filter.name}
          </Label>
        </div>
      );

    default:
      return null;
  }
}
