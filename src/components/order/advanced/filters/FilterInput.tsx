
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SmartFilter } from '@/types/advancedOrder';

interface FilterInputProps {
  filter: SmartFilter;
  value: any;
  onChange: (value: any) => void;
}

export default function FilterInput({ filter, value, onChange }: FilterInputProps) {
  switch (filter.type) {
    case 'select':
      return (
        <Select value={value || ''} onValueChange={onChange}>
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
                    onChange([...currentValues, option.value]);
                  } else {
                    onChange(currentValues.filter((v: string) => v !== option.value));
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
            onValueChange={(val) => onChange(val[0])}
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
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Введите ${filter.name.toLowerCase()}`}
        />
      );

    case 'checkbox':
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={filter.id}
            checked={value || false}
            onCheckedChange={onChange}
          />
          <Label htmlFor={filter.id}>{filter.name}</Label>
        </div>
      );

    default:
      return null;
  }
}
