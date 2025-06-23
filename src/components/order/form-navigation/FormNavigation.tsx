
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
          Далее
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Button 
          onClick={onSubmit}
          disabled={!isCurrentStepValid || loading}
          className="ml-auto"
        >
          {loading ? 'Отправка...' : 'Отправить заказ'}
        </Button>
      )}
    </div>
  );
}
