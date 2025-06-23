
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { FormFieldConfig } from '@/data/serviceFormConfigs';

interface DynamicFormFieldProps {
  fieldName: string;
  fieldConfig: FormFieldConfig;
  value: any;
  onChange: (value: any) => void;
}

export default function DynamicFormField({ fieldName, fieldConfig, value, onChange }: DynamicFormFieldProps) {
  const renderField = () => {
    switch (fieldConfig.type) {
      case 'input':
        return (
          <Input
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={fieldConfig.placeholder}
            required={fieldConfig.required}
          />
        );

      case 'textarea':
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={fieldConfig.placeholder}
            required={fieldConfig.required}
            className="min-h-[100px]"
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(Number(e.target.value))}
            placeholder={fieldConfig.placeholder}
            required={fieldConfig.required}
            min={fieldConfig.validation?.min}
            max={fieldConfig.validation?.max}
          />
        );

      case 'date':
        return (
          <Input
            type="date"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={fieldConfig.required}
          />
        );

      case 'select':
        if (fieldConfig.options && fieldConfig.options.length > 6) {
          // Для больших списков используем селект
          return (
            <Select value={value || ''} onValueChange={onChange}>
              <SelectTrigger>
                <SelectValue placeholder={fieldConfig.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {fieldConfig.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{option.label}</span>
                      {option.price && (
                        <Badge variant="secondary" className="ml-2">
                          {option.price}₽
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        } else {
          // Для коротких списков используем карточки
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {fieldConfig.options?.map((option) => (
                <Card 
                  key={option.value}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    value === option.value ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => onChange(option.value)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option.label}</span>
                      {option.price && (
                        <Badge variant="secondary">
                          {typeof option.price === 'number' ? `${option.price}₽` : `×${option.price}`}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          );
        }

      case 'radio':
        return (
          <RadioGroup value={value || ''} onValueChange={onChange}>
            <div className="grid grid-cols-1 gap-3">
              {fieldConfig.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`${fieldName}-${option.value}`} />
                  <Label htmlFor={`${fieldName}-${option.value}`} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span>{option.label}</span>
                      {option.price && (
                        <Badge variant="outline">+{option.price}₽</Badge>
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        );

      case 'checkbox':
        if (fieldConfig.options) {
          // Множественный выбор
          const selectedValues = Array.isArray(value) ? value : [];
          return (
            <div className="grid grid-cols-1 gap-3">
              {fieldConfig.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${fieldName}-${option.value}`}
                    checked={selectedValues.includes(option.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onChange([...selectedValues, option.value]);
                      } else {
                        onChange(selectedValues.filter((v: string) => v !== option.value));
                      }
                    }}
                  />
                  <Label htmlFor={`${fieldName}-${option.value}`} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span>{option.label}</span>
                      {option.price && (
                        <Badge variant="outline">+{option.price}₽</Badge>
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          );
        } else {
          // Одиночный чекбокс
          return (
            <div className="flex items-center space-x-2">
              <Checkbox
                id={fieldName}
                checked={Boolean(value)}
                onCheckedChange={(checked) => onChange(checked)}
              />
              <Label htmlFor={fieldName} className="cursor-pointer">
                {fieldConfig.label}
                {fieldConfig.additionalPrice && (
                  <Badge variant="outline" className="ml-2">
                    +{fieldConfig.additionalPrice}₽
                  </Badge>
                )}
              </Label>
            </div>
          );
        }

      case 'file':
        return (
          <Input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              onChange(file);
            }}
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          />
        );

      default:
        return (
          <Input
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={fieldConfig.placeholder}
            required={fieldConfig.required}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      {fieldConfig.type !== 'checkbox' || fieldConfig.options ? (
        <Label htmlFor={fieldName} className="text-base font-medium">
          {fieldConfig.label}
          {fieldConfig.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      ) : null}
      
      {renderField()}
      
      {fieldConfig.description && (
        <p className="text-sm text-gray-600">{fieldConfig.description}</p>
      )}
    </div>
  );
}
