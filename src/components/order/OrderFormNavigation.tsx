
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle, Settings, SkipForward } from 'lucide-react';
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

  const handleSkipToFinal = () => {
    if (currentStep === 4) {
      setCurrentStep(5);
    }
  };

  const getNextButtonText = () => {
    switch (currentStep) {
      case 3:
        return (
          <>
            <Settings className="w-4 h-4" />
            Детальные настройки
          </>
        );
      case 4:
        return 'К завершению';
      default:
        return (
          <>
            Далее
            <ArrowRight className="w-4 h-4" />
          </>
        );
    }
  };

  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
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

      <div className="flex items-center gap-2">
        {/* Skip button for step 4 (advanced settings) */}
        {currentStep === 4 && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleSkipToFinal}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
          >
            <SkipForward className="w-4 h-4" />
            Пропустить
          </Button>
        )}

        {currentStep < 5 ? (
          <Button
            type="button"
            onClick={handleNext}
            disabled={!isCurrentStepValid()}
            className={`flex items-center gap-2 ${
              variant === 'client' ? 'btn-unified-primary' : 'bg-gradient-to-r from-blue-600 to-purple-600'
            }`}
          >
            {getNextButtonText()}
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

      {/* Help text for advanced features */}
      {currentStep === 3 && (
        <div className="absolute top-full left-0 right-0 mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 text-blue-800 font-medium mb-2">
            <Settings className="w-4 h-4" />
            Дополнительные возможности на следующем шаге
          </div>
          <p className="text-sm text-blue-700">
            Настройте объем текста, ключевые слова, анализ конкурентов и мета-данные для лучшего результата.
          </p>
        </div>
      )}
    </div>
  );
}
