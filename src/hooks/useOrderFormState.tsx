
import { useState, useRef, useEffect } from "react";
import { OrderFormState, defaultFormState } from "@/types/orderForm";
import { useOrderFormValidation } from "./useOrderFormValidation";
import { useOrderFormCalculations } from "./useOrderFormCalculations";
import { useOrderFormSubmission } from "./useOrderFormSubmission";
import { useOrderFormSteps } from "./useOrderFormSteps";

export function useOrderFormState() {
  const [form, setForm] = useState<OrderFormState>(defaultFormState);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const { isFormValid } = useOrderFormValidation();
  const { getSelectedService, calculateEstimatedPrice, getEstimatedDeliveryTime } = useOrderFormCalculations(form);
  const { currentStep, completedSteps, setCurrentStep, resetSteps } = useOrderFormSteps(form);
  const { loading, handleSubmit: submitForm } = useOrderFormSubmission();

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const updateForm = (updates: Partial<OrderFormState>) => {
    setForm(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    submitForm(e, form, () => isFormValid(form), setForm, resetSteps);
  };

  return {
    form,
    currentStep,
    completedSteps,
    loading,
    nameInputRef,
    updateForm,
    setCurrentStep,
    handleSubmit,
    isFormValid: () => isFormValid(form),
    calculateEstimatedPrice,
    getEstimatedDeliveryTime,
    getSelectedService
  };
}
