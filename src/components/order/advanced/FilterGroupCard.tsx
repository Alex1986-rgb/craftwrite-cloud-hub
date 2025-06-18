
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ChevronDown, ChevronUp, LucideIcon } from 'lucide-react';
import { SmartFilter } from '@/types/advancedOrder';

interface FilterGroupCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  filters: SmartFilter[];
  values: Record<string, any>;
  onValueChange: (filterId: string, value: any) => void;
  defaultOpen?: boolean;
}

export default function FilterGroupCard({
  title,
  description,
  icon: Icon,
  filters,
  values,
  onValueChange,
  defaultOpen = false
}: FilterGroupCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const renderFilter = (filter: SmartFilter) => {
    const value = values[filter.id];

    switch (filter.type) {
      case 'text':
        return (
          <Input
            value={value || ''}
            onChange={(e) => onValueChange(filter.id, e.target.value)}
            placeholder={filter.placeholder}
          />
        );

      case 'textarea':
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => onValueChange(filter.id, e.target.value)}
            placeholder={filter.placeholder}
            rows={3}
          />
        );

      case 'select':
        return (
          <Select value={value || ''} onValueChange={(val) => onValueChange(filter.id, val)}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите вариант" />
            </SelectTrigger>
            <SelectContent>
              {filter.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
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
                  checked={Array.isArray(value) && value.includes(option.value)}
                  onCheckedChange={(checked) => {
                    const currentValues = Array.isArray(value) ? value : [];
                    if (checked) {
                      onValueChange(filter.id, [...currentValues, option.value]);
                    } else {
                      onValueChange(filter.id, currentValues.filter((v: string) => v !== option.value));
                    }
                  }}
                />
                <Label htmlFor={`${filter.id}-${option.value}`}>{option.label}</Label>
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
              onCheckedChange={(checked) => onValueChange(filter.id, checked)}
            />
            <Label htmlFor={filter.id}>{filter.name}</Label>
          </div>
        );

      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => onValueChange(filter.id, Number(e.target.value))}
            placeholder={filter.placeholder}
            min={filter.min}
            max={filter.max}
            step={filter.step}
          />
        );

      default:
        return null;
    }
  };

  if (filters.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader 
        className="cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-blue-600" />
            <div>
              <div className="text-lg font-semibold">{title}</div>
              <div className="text-sm text-gray-600 font-normal">{description}</div>
            </div>
          </div>
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </CardTitle>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-6">
          {filters.map((filter) => (
            <div key={filter.id} className="space-y-2">
              <Label className="text-sm font-medium">
                {filter.name}
                {filter.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {filter.description && (
                <p className="text-xs text-gray-600">{filter.description}</p>
              )}
              {renderFilter(filter)}
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}
