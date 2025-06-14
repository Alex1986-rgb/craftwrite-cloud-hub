
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { OrderFormState, defaultFormState } from "@/types/orderForm";

export function useOrderFormSubmission() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent,
    form: OrderFormState,
    isFormValid: () => boolean,
    resetForm: (newForm: OrderFormState) => void,
    resetSteps: () => void
  ) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: "Ошибка валидации",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Заказ успешно отправлен!",
        description: "Мы свяжемся с вами в течение 1 рабочего дня",
      });
      
      // Reset form
      resetForm(defaultFormState);
      resetSteps();
      
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте еще раз или свяжитесь с нами",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSubmit
  };
}
