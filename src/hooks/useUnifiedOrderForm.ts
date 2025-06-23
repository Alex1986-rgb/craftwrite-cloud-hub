
import { useState } from 'react';
import { toast } from 'sonner';

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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: serviceTitle || selectedPackage || '',
    details: '',
    additionalRequirements: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleServiceSelect = (service: string) => {
    setFormData(prev => ({ ...prev, service }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Симуляция отправки заказа
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Заказ успешно создан! Мы свяжемся с вами в течение часа.');
    setLoading(false);
    onOrderCreated?.();
    onSuccess?.();
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone;
      case 2:
        return formData.service;
      case 3:
        return formData.details;
      default:
        return true;
    }
  };

  const isCurrentStepValid = () => isStepValid(currentStep);

  const goToNextStep = () => {
    if (isCurrentStepValid() && currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return {
    currentStep,
    formData,
    loading,
    handleInputChange,
    handleServiceSelect,
    handleSubmit,
    isCurrentStepValid,
    goToNextStep,
    goToPreviousStep
  };
}
