
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  isCurrentStepValid: boolean;
  loading: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  showSkipService?: boolean;
}

export default function FormNavigation({
  currentStep,
  totalSteps,
  isCurrentStepValid,
  loading,
  onPrevious,
  onNext,
  onSubmit,
  showSkipService = false
}: FormNavigationProps) {
  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  const handleNext = () => {
    if (isLastStep) {
      onSubmit();
    } else {
      onNext();
    }
  };

  const getNextButtonText = () => {
    if (loading) {
      return (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          {isLastStep ? 'Создание заказа...' : 'Загрузка...'}
        </>
      );
    }
    
    if (showSkipService) {
      return (
        <>
          Далее
          <ArrowRight className="w-4 h-4 ml-2" />
        </>
      );
    }
    
    if (isLastStep) {
      return 'Создать заказ';
    }
    
    return (
      <>
        Далее
        <ArrowRight className="w-4 h-4 ml-2" />
      </>
    );
  };

  return (
    <div className="flex justify-between items-center pt-6 border-t">
      {!isFirstStep ? (
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={loading}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>
      ) : (
        <div />
      )}

      <Button
        onClick={handleNext}
        disabled={!isCurrentStepValid && !showSkipService || loading}
        className={isLastStep ? "bg-green-600 hover:bg-green-700" : ""}
      >
        {getNextButtonText()}
      </Button>
    </div>
  );
}
