
export interface SmartFilter {
  id: string;
  name: string;
  type: 'select' | 'multiselect' | 'range' | 'text' | 'checkbox';
  options?: FilterOption[];
  min?: number;
  max?: number;
  defaultValue?: any;
  description?: string;
  recommendations?: string[];
}

export interface FilterOption {
  value: string;
  label: string;
  description?: string;
  priceMultiplier?: number;
  icon?: string;
}

export interface DynamicQuestion {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'number' | 'checkbox';
  required: boolean;
  options?: string[];
  placeholder?: string;
  description?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
  dependsOn?: string;
  showWhen?: any;
}

export interface OrderFormData {
  serviceSlug: string;
  serviceName: string;
  filters: Record<string, any>;
  answers: Record<string, any>;
  personalInfo: {
    name: string;
    email: string;
    phone?: string;
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
    deadline?: string;
    priority: 'standard' | 'urgent' | 'express';
  };
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  fee?: number;
  description: string;
  supported: boolean;
}
