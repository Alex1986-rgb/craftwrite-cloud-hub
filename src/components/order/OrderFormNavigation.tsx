
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useOrderForm } from '@/contexts/OrderFormContext';
import { useOrderValidation } from '@/hooks/useOrderValidation';

interface OrderFormNavigationProps {
  variant?: 'public' | 'client';
  loading: boolean;
  isFormValid: boolean;
  onSubmit: () => void;
}

export function OrderFormNavigation({ 
  variant, 
  loading, 
  isFormValid, 
  onSubmit 
}: OrderFormNavigationProps) {
  const { currentStep, setCurrentStep } = useOrderForm();
  const { isCurrentStepValid } = useOrderValidation();

  const handleNext = () => {
    if (isCurrentStepValid() && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
      <Button
        type="button"
        variant="outline"
        onClick={handlePrevious}
        disabled={currentStep === 1}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Назад
      </Button>

      {currentStep < 5 ? (
        <Button
          type="button"
          onClick={handleNext}
          disabled={!isCurrentStepValid()}
          className={`flex items-center gap-2 ${
            variant === 'client' ? 'btn-unified-primary' : ''
          }`}
        >
          Далее
          <ArrowRight className="w-4 h-4" />
        </Button>
      ) : (
        <Button
          onClick={onSubmit}
          disabled={!isFormValid || loading}
          className={`flex items-center gap-2 ${
            variant === 'client' ? 'btn-unified-primary' : 'bg-gradient-to-r from-blue-600 to-purple-600'
          }`}
        >
          {loading ? (
            "Создание..."
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              Создать заказ
            </>
          )}
        </Button>
      )}
    </div>
  );
}
