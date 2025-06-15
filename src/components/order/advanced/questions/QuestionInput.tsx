
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DynamicQuestion } from '@/types/advancedOrder';

interface QuestionInputProps {
  question: DynamicQuestion;
  value: any;
  onChange: (value: any) => void;
  hasError?: boolean;
}

export default function QuestionInput({ 
  question, 
  value, 
  onChange, 
  hasError 
}: QuestionInputProps) {
  const errorClass = hasError ? 'border-red-500' : '';

  switch (question.type) {
    case 'text':
      return (
        <Input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          className={errorClass}
        />
      );

    case 'textarea':
      return (
        <Textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          rows={4}
          className={errorClass}
        />
      );

    case 'number':
      return (
        <Input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          placeholder={question.placeholder}
          min={question.validation?.min}
          max={question.validation?.max}
          className={errorClass}
        />
      );

    case 'select':
      return (
        <Select value={value || ''} onValueChange={onChange}>
          <SelectTrigger className={errorClass}>
            <SelectValue placeholder="Выберите вариант" />
          </SelectTrigger>
          <SelectContent>
            {question.options?.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case 'multiselect':
      return (
        <div className="space-y-2">
          {question.options?.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`${question.id}-${option}`}
                checked={value?.includes?.(option) || false}
                onCheckedChange={(checked) => {
                  const currentValues = value || [];
                  if (checked) {
                    onChange([...currentValues, option]);
                  } else {
                    onChange(currentValues.filter((v: string) => v !== option));
                  }
                }}
              />
              <Label htmlFor={`${question.id}-${option}`} className="text-sm">
                {option}
              </Label>
            </div>
          ))}
        </div>
      );

    case 'checkbox':
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={question.id}
            checked={value || false}
            onCheckedChange={onChange}
          />
          <Label htmlFor={question.id}>{question.label}</Label>
        </div>
      );

    default:
      return null;
  }
}
