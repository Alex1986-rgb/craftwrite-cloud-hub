
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  isCurrentStepValid: boolean;
  loading: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export default function FormNavigation({
  currentStep,
  totalSteps,
  isCurrentStepValid,
  loading,
  onPrevious,
  onNext,
  onSubmit
}: FormNavigationProps) {
  const isLastStep = currentStep === totalSteps;
  const isPaymentStep = currentStep === 4;

  return (
    <div className="flex justify-between">
      {currentStep > 1 && (
        <Button variant="outline" onClick={onPrevious}>
          Назад
        </Button>
      )}
      
      {!isLastStep ? (
        <Button 
          onClick={onNext}
          disabled={!isCurrentStepValid}
          className="ml-auto"
        >
          {isPaymentStep ? 'К оплате' : 'Далее'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Button 
          onClick={onSubmit}
          disabled={!isCurrentStepValid || loading}
          className="ml-auto"
        >
          {loading ? 'Обработка...' : 'Завершить заказ'}
        </Button>
      )}
    </div>
  );
}
