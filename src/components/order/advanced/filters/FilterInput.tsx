
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SmartFilter } from '@/types/advancedOrder';

interface FilterInputProps {
  filter: SmartFilter;
  value: any;
  onChange: (value: any) => void;
}

export default function FilterInput({ filter, value, onChange }: FilterInputProps) {
  const handleMultiselectChange = (optionValue: string, checked: boolean) => {
    const currentValues = Array.isArray(value) ? value : [];
    if (checked) {
      onChange([...currentValues, optionValue]);
    } else {
      onChange(currentValues.filter((v: string) => v !== optionValue));
    }
  };

  const handleCheckboxWithOptionsChange = (isChecked: boolean, selectedOptions?: string[]) => {
    if (!isChecked) {
      onChange(null);
    } else {
      onChange(selectedOptions || []);
    }
  };

  switch (filter.type) {
    case 'text':
      return (
        <Input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={filter.placeholder}
          className="w-full"
        />
      );

    case 'textarea':
      return (
        <Textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={filter.placeholder}
          rows={4}
          className="w-full"
        />
      );

    case 'select':
      return (
        <Select value={value || ''} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите опцию..." />
          </SelectTrigger>
          <SelectContent>
            {filter.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center justify-between w-full">
                  <span>{option.label}</span>
                  {option.priceMultiplier && option.priceMultiplier !== 1 && (
                    <Badge variant="outline" className="ml-2">
                      {option.priceMultiplier > 1 ? '+' : ''}{Math.round((option.priceMultiplier - 1) * 100)}%
                    </Badge>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case 'multiselect':
      const selectedValues = Array.isArray(value) ? value : [];
      return (
        <div className="space-y-3">
          {filter.options?.map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <Checkbox
                id={`${filter.id}-${option.value}`}
                checked={selectedValues.includes(option.value)}
                onCheckedChange={(checked) => handleMultiselectChange(option.value, !!checked)}
              />
              <Label htmlFor={`${filter.id}-${option.value}`} className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <span>{option.label}</span>
                  {option.priceMultiplier && option.priceMultiplier !== 1 && (
                    <Badge variant="outline" className="ml-2">
                      {option.priceMultiplier > 1 ? '+' : ''}{Math.round((option.priceMultiplier - 1) * 100)}%
                    </Badge>
                  )}
                </div>
                {option.description && (
                  <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                )}
              </Label>
            </div>
          ))}
        </div>
      );

    case 'checkbox_with_options':
      const isMainChecked = value !== null && value !== undefined;
      const selectedSubOptions = Array.isArray(value) ? value : [];
      
      return (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id={filter.id}
              checked={isMainChecked}
              onCheckedChange={(checked) => {
                if (!checked) {
                  onChange(null);
                } else {
                  onChange([]);
                }
              }}
            />
            <Label htmlFor={filter.id} className="font-medium cursor-pointer">
              Включить эту опцию
            </Label>
          </div>
          
          {isMainChecked && filter.options && (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <h5 className="font-medium mb-3 text-blue-900">Выберите тип:</h5>
              <div className="space-y-2">
                {filter.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3">
                    <Checkbox
                      id={`${filter.id}-sub-${option.value}`}
                      checked={selectedSubOptions.includes(option.value)}
                      onCheckedChange={(checked) => {
                        const newOptions = checked 
                          ? [...selectedSubOptions, option.value]
                          : selectedSubOptions.filter((v: string) => v !== option.value);
                        onChange(newOptions);
                      }}
                    />
                    <Label htmlFor={`${filter.id}-sub-${option.value}`} className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-800">{option.label}</span>
                        {option.priceMultiplier && option.priceMultiplier !== 1 && (
                          <Badge variant="outline" className="ml-2 border-blue-300 text-blue-700">
                            {option.priceMultiplier > 1 ? '+' : ''}{Math.round((option.priceMultiplier - 1) * 100)}%
                          </Badge>
                        )}
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      );

    case 'checkbox':
      return (
        <div className="flex items-center space-x-3">
          <Checkbox
            id={filter.id}
            checked={!!value}
            onCheckedChange={onChange}
          />
          <Label htmlFor={filter.id} className="cursor-pointer">
            Включить
          </Label>
        </div>
      );

    case 'number':
      return (
        <Input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(Number(e.target.value))}
          min={filter.min}
          max={filter.max}
          step={filter.step}
          className="w-full"
        />
      );

    default:
      return <div>Неподдерживаемый тип поля</div>;
  }
}
