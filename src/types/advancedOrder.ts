
export interface DynamicQuestion {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'number' | 'checkbox';
  required: boolean;
  placeholder?: string;
  description?: string;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
  dependsOn?: string;
  showWhen?: string;
}

export interface SmartFilter {
  id: string;
  name: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'checkbox' | 'checkbox_with_options' | 'number';
  description?: string;
  placeholder?: string;
  options?: Array<{
    value: string;
    label: string;
    description?: string;
    priceMultiplier?: number;
  }>;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  recommendations?: string[];
}

export interface PaymentMethodOption {
  id: string;
  name: string;
  icon: string;
  fee: number;
  description: string;
  supported: boolean;
}

export interface OrderFormData {
  serviceSlug: string;
  serviceName: string;
  filters: Record<string, any>;
  answers: Record<string, any>;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    company?: string;
  };
  pricing: {
    basePrice: number;
    additionalCosts: Record<string, number>;
    totalPrice: number;
    currency: string;
  };
  timeline: {
    estimatedDays: number;
    priority: 'standard' | 'fast' | 'express';
  };
}
