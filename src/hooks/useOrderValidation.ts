
import { useOrderForm } from '@/contexts/OrderFormContext';

export function useOrderValidation() {
  const { form, currentStep } = useOrderForm();

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return Boolean(form.name.trim() && form.email.trim());
      case 2:
        return Boolean(form.service);
      case 3:
        return Boolean(form.details.trim());
      case 4:
        return true;
      case 5:
        return Boolean(form.name && form.email && form.service && form.details);
      default:
        return false;
    }
  };

  const isCurrentStepValid = () => validateStep(currentStep);
  const isFormValid = () => validateStep(5);

  return {
    validateStep,
    isCurrentStepValid,
    isFormValid
  };
}
