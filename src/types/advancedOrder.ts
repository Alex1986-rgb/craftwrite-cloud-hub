
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

export type PaymentMethod = 'card' | 'yandex' | 'sbp' | 'bank_transfer';

export interface ServiceQuestion {
  id: string;
  text: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'checkbox';
  options?: string[];
  required?: boolean;
  category?: string;
}
