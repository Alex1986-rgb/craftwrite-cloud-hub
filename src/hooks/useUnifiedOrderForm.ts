
import { useState } from 'react';
import { useSupabaseOrders } from './useSupabaseOrders';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  details: string;
  additionalRequirements: string;
}

interface UseUnifiedOrderFormProps {
  serviceTitle?: string;
  selectedPackage?: string;
  onOrderCreated?: () => void;
  onSuccess?: () => void;
}

export function useUnifiedOrderForm({
  serviceTitle = '',
  selectedPackage = '',
  onOrderCreated,
  onSuccess
}: UseUnifiedOrderFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: serviceTitle || selectedPackage || '',
    details: '',
    additionalRequirements: ''
  });

  const { createOrder, loading } = useSupabaseOrders();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleServiceSelect = (service: string) => {
    setFormData(prev => ({ ...prev, service }));
  };

  const handleSubmit = async (estimatedPrice?: number) => {
    if (!formData.name || !formData.email || !formData.service || !formData.details) {
      throw new Error('Заполните все обязательные поля');
    }

    try {
      const orderData = {
        service_slug: formData.service.toLowerCase().replace(/\s+/g, '-'),
        service_name: formData.service,
        contact_name: formData.name,
        contact_email: formData.email,
        contact_phone: formData.phone,
        details: formData.details,
        additional_requirements: formData.additionalRequirements,
        estimated_price: estimatedPrice || 3000,
        service_options: {
          package: selectedPackage,
          serviceTitle: serviceTitle
        }
      };

      console.log('Creating order with data:', orderData);

      const result = await createOrder(orderData);
      
      if (result.success) {
        onOrderCreated?.();
        onSuccess?.();
        return result;
      } else {
        throw new Error(result.error || 'Ошибка создания заказа');
      }
    } catch (error: any) {
      console.error('Error in handleSubmit:', error);
      throw new Error(error.message || 'Ошибка создания заказа');
    }
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return Boolean(formData.name.trim() && formData.email.trim() && formData.phone.trim());
      case 2:
        // Если у нас уже есть выбранная услуга, автоматически проходим валидацию
        return Boolean(formData.service.trim() || serviceTitle || selectedPackage);
      case 3:
        return Boolean(formData.details.trim());
      case 4:
        return true;
      default:
        return true;
    }
  };

  const isCurrentStepValid = (): boolean => isStepValid(currentStep);

  const goToNextStep = () => {
    if (isCurrentStepValid() && currentStep < 4) {
      // Автоматически заполняем service если он не заполнен, но есть serviceTitle или selectedPackage
      if (currentStep === 2 && !formData.service && (serviceTitle || selectedPackage)) {
        setFormData(prev => ({ 
          ...prev, 
          service: serviceTitle || selectedPackage || '' 
        }));
      }
      setCurrentStep(prev => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Автоматически заполняем service при инициализации
  useState(() => {
    if ((serviceTitle || selectedPackage) && !formData.service) {
      setFormData(prev => ({ 
        ...prev, 
        service: serviceTitle || selectedPackage || '' 
      }));
    }
  });

  return {
    currentStep,
    formData,
    loading,
    handleInputChange,
    handleServiceSelect,
    handleSubmit,
    isCurrentStepValid,
    goToNextStep,
    goToPreviousStep,
    setCurrentStep
  };
}
