
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ContactInfoStep from './form-steps/ContactInfoStep';
import ServiceSelectionStep from './form-steps/ServiceSelectionStep';
import OrderDetailsStep from './form-steps/OrderDetailsStep';
import FormNavigation from './form-navigation/FormNavigation';
import StepIndicator from './form-navigation/StepIndicator';
import { useUnifiedOrderForm } from '@/hooks/useUnifiedOrderForm';

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
          <OrderDetailsStep
            formData={formData}
            onInputChange={handleInputChange}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {serviceTitle ? `Заказ: ${serviceTitle}` : 'Оформление заказа'}
        </CardTitle>
        <StepIndicator currentStep={currentStep} totalSteps={3} />
      </CardHeader>
      <CardContent className="space-y-6">
        {renderStep()}
        
        <FormNavigation
          currentStep={currentStep}
          totalSteps={3}
          isCurrentStepValid={isCurrentStepValid()}
          loading={loading}
          onPrevious={goToPreviousStep}
          onNext={goToNextStep}
          onSubmit={handleSubmit}
        />
      </CardContent>
    </Card>
  );
}
