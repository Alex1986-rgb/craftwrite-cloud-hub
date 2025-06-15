
import { useOrderForm } from '@/contexts/OrderFormContext';
import OrderFormPricing from './OrderFormPricing';
import ExpertTipsWidget from './sidebar/ExpertTipsWidget';

interface OrderFormSidebarProps {
  variant?: 'public' | 'client';
  estimatedPrice: number;
  deliveryTime: string;
}

export function OrderFormSidebar({ variant, estimatedPrice, deliveryTime }: OrderFormSidebarProps) {
  const { form } = useOrderForm();

  return (
    <div className="space-y-6">
      <OrderFormPricing
        service={form.service}
        deadline={form.deadline}
        estimatedPrice={estimatedPrice}
        deliveryTime={deliveryTime}
        variant={variant}
      />
      <ExpertTipsWidget 
        selectedService={form.service}
        className="hidden lg:block"
      />
    </div>
  );
}
