
import { OrderFormState } from "@/types/orderForm";
import { SERVICES } from "@/data/services";

export function useOrderFormCalculations(form: OrderFormState) {
  const getSelectedService = () => {
    return SERVICES.find(service => service.name === form.service);
  };

  const calculateEstimatedPrice = () => {
    const selectedService = getSelectedService();
    if (!selectedService) return 5000;

    const basePrice = selectedService.price.min;
    
    // Deadline multiplier
    let deadlineMultiplier = 1;
    if (form.deadline === "urgent") deadlineMultiplier = 1.5;
    if (form.deadline === "express") deadlineMultiplier = 2;

    // Additional services cost
    const additionalServicesCost = form.additionalServices.reduce((total, serviceId) => {
      const costs: Record<string, number> = {
        "seo-optimization": 2000,
        "urgency": 3000,
        "multiple-variants": 1500,
        "consultation": 1000,
        "localization": 2500,
      };
      return total + (costs[serviceId] || 0);
    }, 0);

    const finalPrice = Math.round(basePrice * deadlineMultiplier) + additionalServicesCost;
    
    // Ensure minimum price
    return Math.max(finalPrice, selectedService.price.min);
  };

  const getEstimatedDeliveryTime = () => {
    const selectedService = getSelectedService();
    if (!selectedService) return "3-5 дней";

    let { min, max, unit } = selectedService.deliveryTime;
    
    // Adjust for deadline
    if (form.deadline === "urgent") {
      min = Math.max(1, Math.ceil(min / 2));
      max = Math.max(2, Math.ceil(max / 2));
    } else if (form.deadline === "express") {
      min = 1;
      max = 1;
      unit = "день";
    }

    return min === max ? `${min} ${unit}` : `${min}-${max} ${unit}`;
  };

  return {
    getSelectedService,
    calculateEstimatedPrice,
    getEstimatedDeliveryTime
  };
}
