
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import UnifiedOrderForm from '@/components/order/UnifiedOrderForm';

export default function ClientNewOrder() {
  const navigate = useNavigate();

  const handleOrderCreated = () => {
    toast({
      title: "Заказ успешно создан!",
      description: "Ваш заказ отправлен в работу. Мы свяжемся с вами в ближайшее время.",
    });
    
    // Redirect to orders list after successful creation
    setTimeout(() => {
      navigate('/client/orders');
    }, 2000);
  };

  return (
    <div className="animate-slide-in-up">
      <UnifiedOrderForm 
        variant="client" 
        onOrderCreated={handleOrderCreated}
      />
    </div>
  );
}
