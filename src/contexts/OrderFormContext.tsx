
import { createContext, useContext, useState, ReactNode } from 'react';

export interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  details: string;
  deadline: string;
  additionalServices: string[];
  targetAudience: string;
  seoKeywords: string;
  preferredStyle: string;
  additionalRequirements: string;
}

interface OrderFormContextType {
  form: OrderFormData;
  currentStep: number;
  completedSteps: number[];
  loading: boolean;
  updateForm: (updates: Partial<OrderFormData>) => void;
  setCurrentStep: (step: number) => void;
  setLoading: (loading: boolean) => void;
}

const OrderFormContext = createContext<OrderFormContextType | undefined>(undefined);

export function OrderFormProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<OrderFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    details: '',
    deadline: '',
    additionalServices: [],
    targetAudience: '',
    seoKeywords: '',
    preferredStyle: '',
    additionalRequirements: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const updateForm = (updates: Partial<OrderFormData>) => {
    setForm(prev => ({ ...prev, ...updates }));
  };

  return (
    <OrderFormContext.Provider value={{
      form,
      currentStep,
      completedSteps,
      loading,
      updateForm,
      setCurrentStep,
      setLoading
    }}>
      {children}
    </OrderFormContext.Provider>
  );
}

export function useOrderForm() {
  const context = useContext(OrderFormContext);
  if (!context) {
    throw new Error('useOrderForm must be used within OrderFormProvider');
  }
  return context;
}
