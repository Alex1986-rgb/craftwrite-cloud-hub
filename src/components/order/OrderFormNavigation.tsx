
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import OrderFormActions from "./OrderFormActions";

interface OrderFormNavigationProps {
  currentStep: number;
  canGoNext: boolean;
  loading: boolean;
  isFormValid: boolean;
  showValidationSuccess: boolean;
  setShowValidationSuccess: (show: boolean) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function OrderFormNavigation({
  currentStep,
  canGoNext,
  loading,
  isFormValid,
  showValidationSuccess,
  setShowValidationSuccess,
  handleNext,
  handlePrevious,
  handleSubmit
}: OrderFormNavigationProps) {
  return (
    <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
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
          disabled={!canGoNext}
          className="flex items-center gap-2"
        >
          Далее
          <ArrowRight className="w-4 h-4" />
        </Button>
      ) : (
        <OrderFormActions
          loading={loading}
          isFormValid={isFormValid}
          showValidationSuccess={showValidationSuccess}
          setShowValidationSuccess={setShowValidationSuccess}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
