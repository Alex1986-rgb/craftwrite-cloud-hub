
export interface OrderFormData {
  serviceSlug: string;
  serviceName: string;
  filters: Record<string, any>;
  answers: Record<string, any>;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
  pricing: {
    basePrice: number;
    additionalCosts: Record<string, number>;
    totalPrice: number;
    currency: string;
  };
  timeline: {
    estimatedDays: number;
    priority: 'standard' | 'urgent' | 'express';
  };
}

export interface SmartFilter {
  id: string;
  name: string;
  description?: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'checkbox' | 'checkbox_with_options' | 'number' | 'range';
  required?: boolean;
  placeholder?: string;
  defaultValue?: any;
  options?: Array<{
    label: string;
    value: string;
    priceMultiplier?: number;
    description?: string;
  }>;
  min?: number;
  max?: number;
  step?: number;
  recommendations?: string[];
  dependencies?: Array<{
    filterId: string;
    expectedValue: any;
  }>;
}

export interface SmartQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'boolean';
  required?: boolean;
  options?: string[];
  conditionalOn?: {
    filterId: string;
    expectedValue: any;
  };
}

export interface DynamicQuestion {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'checkbox' | 'number';
  required?: boolean;
  placeholder?: string;
  description?: string;
  options?: string[];
  dependsOn?: string;
  showWhen?: any;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface PaymentMethodOption {
  id: string;
  name: string;
  icon: string;
  fee?: number;
  description: string;
  supported: boolean;
}

export type PaymentMethod = PaymentMethodOption;

export interface ServiceQuestion {
  id: string;
  text: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'checkbox';
  options?: string[];
  required?: boolean;
  category?: string;
}
