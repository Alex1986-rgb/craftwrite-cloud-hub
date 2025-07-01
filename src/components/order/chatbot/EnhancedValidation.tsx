
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface ValidationRule {
  field: string;
  validate: (value: any, formData?: any) => boolean;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

interface EnhancedValidationProps {
  formData: any;
  rules: ValidationRule[];
  onValidationChange: (isValid: boolean, errors: string[]) => void;
}

export default function EnhancedValidation({ 
  formData, 
  rules, 
  onValidationChange 
}: EnhancedValidationProps) {
  const [validationResults, setValidationResults] = useState<{
    errors: string[];
    warnings: string[];
    info: string[];
    isValid: boolean;
  }>({
    errors: [],
    warnings: [],
    info: [],
    isValid: true
  });

  useEffect(() => {
    validateForm();
  }, [formData, rules]);

  const validateForm = () => {
    const errors: string[] = [];
    const warnings: string[] = [];
    const info: string[] = [];

    rules.forEach(rule => {
      const fieldValue = getNestedValue(formData, rule.field);
      const isValid = rule.validate(fieldValue, formData);
      
      if (!isValid) {
        switch (rule.severity) {
          case 'error':
            errors.push(rule.message);
            break;
          case 'warning':
            warnings.push(rule.message);
            break;
          case 'info':
            info.push(rule.message);
            break;
        }
      }
    });

    const results = {
      errors,
      warnings,
      info,
      isValid: errors.length === 0
    };

    setValidationResults(results);
    onValidationChange(results.isValid, errors);
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  const getIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  if (validationResults.errors.length === 0 && 
      validationResults.warnings.length === 0 && 
      validationResults.info.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {validationResults.errors.map((error, index) => (
        <div key={`error-${index}`} className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded">
          {getIcon('error')}
          <span className="text-sm text-red-700">{error}</span>
        </div>
      ))}
      
      {validationResults.warnings.map((warning, index) => (
        <div key={`warning-${index}`} className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
          {getIcon('warning')}
          <span className="text-sm text-yellow-700">{warning}</span>
        </div>
      ))}
      
      {validationResults.info.map((info, index) => (
        <div key={`info-${index}`} className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded">
          {getIcon('info')}
          <span className="text-sm text-blue-700">{info}</span>
        </div>
      ))}
    </div>
  );
}
