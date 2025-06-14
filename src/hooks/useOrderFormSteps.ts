
import { useState, useEffect } from "react";
import { OrderFormState } from "@/types/orderForm";

export function useOrderFormSteps(form: OrderFormState) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Calculate completed steps based on form data
  useEffect(() => {
    const completed: number[] = [];
    
    if (form.name.trim() && form.email.trim()) {
      completed.push(1);
    }
    
    if (form.service) {
      completed.push(2);
    }
    
    if (form.details.trim()) {
      completed.push(3);
    }
    
    if (form.deadline) {
      completed.push(4);
    }

    setCompletedSteps(completed);
    
    // Auto-advance to next step
    const nextStep = completed.length + 1;
    if (nextStep <= 5 && nextStep > currentStep) {
      setCurrentStep(nextStep);
    }
  }, [form, currentStep]);

  const resetSteps = () => {
    setCurrentStep(1);
    setCompletedSteps([]);
  };

  return {
    currentStep,
    completedSteps,
    setCurrentStep,
    resetSteps
  };
}
