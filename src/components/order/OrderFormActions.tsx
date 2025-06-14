
import { Button } from "@/components/ui/button";
import OrderConsent from "./OrderConsent";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Sparkles, Send } from "lucide-react";

interface OrderFormActionsProps {
  loading: boolean;
  isFormValid: boolean;
  showValidationSuccess: boolean;
  setShowValidationSuccess: (show: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function OrderFormActions({ 
  loading, 
  isFormValid, 
  showValidationSuccess, 
  setShowValidationSuccess, 
  handleSubmit 
}: OrderFormActionsProps) {
  return (
    <section 
      className="space-y-4 md:space-y-6 pt-4 md:pt-6 border-t-2 border-slate-100"
      aria-labelledby="form-actions-heading"
      role="group"
    >
      <h3 id="form-actions-heading" className="sr-only">
        Действия с формой заказа
      </h3>
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3" role="group" aria-label="Основные действия">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowValidationSuccess(!showValidationSuccess)}
            className="text-xs md:text-sm px-4 py-2 md:px-6 md:py-3 border-2 hover:border-primary/50"
            aria-label={showValidationSuccess ? "Скрыть статус полей формы" : "Показать статус полей формы"}
            aria-pressed={showValidationSuccess}
          >
            {showValidationSuccess ? "Скрыть" : "Показать"} статус полей
          </Button>
          
          <Button
            type="submit"
            disabled={loading || !isFormValid}
            onClick={handleSubmit}
            className="flex-1 sm:flex-none sm:min-w-[220px] relative overflow-hidden text-sm md:text-base px-6 py-4 md:px-8 md:py-5 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            size="lg"
            aria-label={loading ? "Отправляем заказ, пожалуйста подождите" : "Отправить заказ на обработку"}
            aria-describedby={!isFormValid ? "form-validation-message" : undefined}
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <LoadingSpinner size="sm" aria-hidden="true" />
                <span className="text-sm md:text-base">Отправляем заказ...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5" aria-hidden="true" />
                <span>Отправить заказ</span>
                <Send className="w-5 h-5" aria-hidden="true" />
              </div>
            )}
          </Button>
        </div>
        
        <OrderConsent />
        
        {!isFormValid && (
          <div 
            id="form-validation-message"
            className="text-center text-sm text-muted-foreground bg-amber-50 border border-amber-200 rounded-lg p-3"
            role="alert"
            aria-live="polite"
          >
            💡 Заполните все обязательные поля для отправки заказа
          </div>
        )}
      </div>
    </section>
  );
}
