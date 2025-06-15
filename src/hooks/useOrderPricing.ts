
import { useOrderForm } from '@/contexts/OrderFormContext';

export function useOrderPricing() {
  const { form } = useOrderForm();

  const calculateEstimatedPrice = (): number => {
    let basePrice = 0;
    
    // Service-based pricing logic
    switch (form.service) {
      case 'landing-page':
        basePrice = 15000;
        break;
      case 'sales-letter':
        basePrice = 12000;
        break;
      case 'email-sequence':
        basePrice = 8000;
        break;
      default:
        basePrice = 5000;
    }

    // Deadline modifiers
    if (form.deadline === 'urgent') {
      basePrice *= 1.5;
    } else if (form.deadline === 'express') {
      basePrice *= 1.3;
    }

    // Additional services
    const additionalPrice = form.additionalServices.length * 2000;

    return Math.round(basePrice + additionalPrice);
  };

  const getEstimatedDeliveryTime = (): string => {
    switch (form.deadline) {
      case 'urgent':
        return '1-2 дня';
      case 'express':
        return '3-5 дней';
      case 'standard':
        return '7-10 дней';
      default:
        return '5-7 дней';
    }
  };

  return {
    calculateEstimatedPrice,
    getEstimatedDeliveryTime
  };
}
