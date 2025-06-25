
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ContactInfoStep from './form-steps/ContactInfoStep';
import ServiceSelectionStep from './form-steps/ServiceSelectionStep';
import OrderDetailsStep from './form-steps/OrderDetailsStep';
import PaymentStep from './form-steps/PaymentStep';
import FormNavigation from './form-navigation/FormNavigation';
import StepIndicator from './form-navigation/StepIndicator';
import PriceCalculator from './PriceCalculator';
import { useUnifiedOrderForm } from '@/hooks/useUnifiedOrderForm';
import { toast } from 'sonner';

interface UnifiedOrderFormProps {
  variant?: 'public' | 'client';
  serviceTitle?: string;
  selectedPackage?: string;
  onOrderCreated?: () => void;
  onSuccess?: () => void;
}

export default function UnifiedOrderForm({ 
  variant = 'public', 
  serviceTitle = '',
  selectedPackage = '',
  onOrderCreated,
  onSuccess 
}: UnifiedOrderFormProps) {
  const {
    currentStep,
    formData,
    loading,
    handleInputChange,
    handleServiceSelect,
    handleSubmit,
    isCurrentStepValid,
    goToNextStep,
    goToPreviousStep
  } = useUnifiedOrderForm({
    serviceTitle,
    selectedPackage,
    onOrderCreated,
    onSuccess
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(3000);
  const [urgencyMultiplier, setUrgencyMultiplier] = useState(1);
  const [complexityMultiplier, setComplexityMultiplier] = useState(1);
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);

  const handleCreateOrder = async () => {
    try {
      await handleSubmit();
      toast.success('Заказ успешно создан!', {
        description: 'Мы свяжемся с вами в течение 1 рабочего дня'
      });
    } catch (error: any) {
      toast.error('Ошибка создания заказа', {
        description: error.message
      });
    }
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.error('Выберите способ оплаты');
      return;
    }

    try {
      await handleCreateOrder();
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ContactInfoStep
            formData={formData}
            onInputChange={handleInputChange}
          />
        );

      case 2:
        return (
          <ServiceSelectionStep
            formData={formData}
            serviceTitle={serviceTitle}
            selectedPackage={selectedPackage}
            onServiceSelect={handleServiceSelect}
          />
        );

      case 3:
        return (
          <div className="space-y-6">
            <OrderDetailsStep
              formData={formData}
              onInputChange={handleInputChange}
            />
            
            <PriceCalculator
              basePrice={3000}
              urgencyMultiplier={urgencyMultiplier}
              complexityMultiplier={complexityMultiplier}
              additionalServices={additionalServices}
              onPriceChange={setCalculatedPrice}
            />
          </div>
        );

      case 4:
        return (
          <PaymentStep
            selectedMethod={paymentMethod}
            onMethodSelect={setPaymentMethod}
            totalAmount={calculatedPrice}
            onPayment={handlePayment}
            loading={loading}
          />
        );

      default:
        return null;
    }
  };

  const handleFormSubmit = () => {
    if (currentStep === 4) {
      handlePayment();
    } else {
      handleCreateOrder();
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {serviceTitle ? `Заказ: ${serviceTitle}` : 'Оформление заказа'}
        </CardTitle>
        <StepIndicator currentStep={currentStep} totalSteps={4} />
      </CardHeader>
      <CardContent className="space-y-6">
        {renderStep()}
        
        <FormNavigation
          currentStep={currentStep}
          totalSteps={4}
          isCurrentStepValid={isCurrentStepValid()}
          loading={loading}
          onPrevious={goToPreviousStep}
          onNext={goToNextStep}
          onSubmit={handleFormSubmit}
        />
      </CardContent>
    </Card>
  );
}
