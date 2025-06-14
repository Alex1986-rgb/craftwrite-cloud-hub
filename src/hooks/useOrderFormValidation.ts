
import { OrderFormState } from "@/types/orderForm";

export function useOrderFormValidation() {
  const isFormValid = (form: OrderFormState): boolean => {
    return Boolean(
      form.name.trim() && 
      form.email.trim() && 
      form.service && 
      form.details.trim()
    );
  };

  return {
    isFormValid
  };
}
