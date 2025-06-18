
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { SmartFilter } from '@/types/advancedOrder';

interface FilterInputProps {
  filter: SmartFilter;
  value: any;
  onChange: (value: any) => void;
}

export default function FilterInput({ filter, value, onChange }: FilterInputProps) {
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
          rows={3}
          className="w-full"
        />
      );

    case 'select':
      return (
        <Select value={value || ''} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите вариант" />
          </SelectTrigger>
          <SelectContent>
            {filter.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center justify-between w-full">
                  <span>{option.label}</span>
                  {option.priceMultiplier && option.priceMultiplier > 1 && (
                    <span className="text-xs text-orange-600 ml-2">
                      +{Math.round((option.priceMultiplier - 1) * 100)}%
                    </span>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case 'multiselect':
      return (
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {filter.options?.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`${filter.id}-${option.value}`}
                checked={Array.isArray(value) && value.includes(option.value)}
                onCheckedChange={(checked) => {
                  const currentValues = Array.isArray(value) ? value : [];
                  if (checked) {
                    onChange([...currentValues, option.value]);
                  } else {
                    onChange(currentValues.filter((v: string) => v !== option.value));
                  }
                }}
              />
              <Label 
                htmlFor={`${filter.id}-${option.value}`}
                className="text-sm flex-1 cursor-pointer"
              >
                {option.label}
                {option.priceMultiplier && option.priceMultiplier > 1 && (
                  <span className="text-xs text-orange-600 ml-1">
                    (+{Math.round((option.priceMultiplier - 1) * 100)}%)
                  </span>
                )}
              </Label>
            </div>
          ))}
        </div>
      );

    case 'checkbox':
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={filter.id}
            checked={!!value}
            onCheckedChange={onChange}
          />
          <Label htmlFor={filter.id} className="cursor-pointer">
            {filter.name}
          </Label>
        </div>
      );

    case 'number':
      return (
        <Input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder={filter.placeholder}
          min={filter.min}
          max={filter.max}
          step={filter.step}
          className="w-full"
        />
      );

    default:
      return null;
  }
}
