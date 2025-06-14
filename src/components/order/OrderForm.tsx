
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useOrderForm } from "@/hooks/useOrderForm";
import OrderFormHeader from "./OrderFormHeader";
import OrderProgressIndicator from "./OrderProgressIndicator";
import OrderSelectedService from "./OrderSelectedService";
import ServiceSelector from "./ServiceSelector";
import OrderQuestionGroup from "./OrderQuestionGroup";
import OrderEmailHint from "./OrderEmailHint";
import OrderConsent from "./OrderConsent";
import OrderFormValidation from "./OrderFormValidation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Sparkles, Send } from "lucide-react";

export default function OrderForm() {
  const {
    form,
    loading,
    handleServiceSelect,
    handleAdditionalChange,
    handleChange,
    handleSubmit,
    currentQuestions,
    nameInputRef,
    validationRules,
    formProgress,
    isFormValid,
    currentStep,
    filteredServices,
  } = useOrderForm();

  const [showValidationSuccess, setShowValidationSuccess] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4 md:space-y-6">
      <OrderFormHeader />
      
      <OrderProgressIndicator currentStep={currentStep} />

      {form.service && (
        <OrderSelectedService serviceName={form.service} />
      )}

      <OrderFormValidation 
        validations={validationRules} 
        showSuccess={showValidationSuccess}
      />

      <Card className="p-4 md:p-8 shadow-2xl border-0 bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          {/* Основная информация */}
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Контактная информация
              </h3>
              <div className="text-sm text-muted-foreground bg-primary/5 px-3 py-1 rounded-full">
                Прогресс: {formProgress}%
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm md:text-base font-medium">
                  Ваше имя *
                </Label>
                <Input
                  ref={nameInputRef}
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Введите ваше имя"
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm md:text-base py-3 md:py-4 border-2 hover:border-primary/30"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm md:text-base font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm md:text-base py-3 md:py-4 border-2 hover:border-primary/30"
                  required
                />
                <OrderEmailHint />
              </div>
            </div>
          </div>

          {/* Выбор услуги */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Тип услуги
            </h3>
            <ServiceSelector
              services={filteredServices}
              selectedService={form.service}
              onServiceSelect={handleServiceSelect}
            />
          </div>

          {/* Дополнительные вопросы */}
          {currentQuestions.length > 0 && (
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Дополнительные параметры
              </h3>
              <OrderQuestionGroup
                questions={currentQuestions}
                answers={form.additional}
                onChange={handleAdditionalChange}
              />
            </div>
          )}

          {/* Детали проекта */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Детали проекта
            </h3>
            <div className="space-y-3">
              <Label htmlFor="details" className="text-sm md:text-base font-medium">
                Подробное описание *
              </Label>
              <Textarea
                id="details"
                name="details"
                value={form.details}
                onChange={handleChange}
                placeholder="Опишите ваш проект максимально подробно: цели, целевую аудиторию, стиль, особые требования..."
                rows={5}
                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none text-sm md:text-base border-2 hover:border-primary/30"
                required
              />
              <div className="flex flex-col sm:flex-row justify-between text-xs text-muted-foreground gap-1">
                <span>Минимум 20 символов для качественного выполнения</span>
                <span className="text-primary font-medium">{form.details.length}/2000</span>
              </div>
            </div>
          </div>

          {/* Кнопка отправки */}
          <div className="space-y-4 md:space-y-6 pt-4 md:pt-6 border-t-2 border-slate-100">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowValidationSuccess(!showValidationSuccess)}
                  className="text-xs md:text-sm px-4 py-2 md:px-6 md:py-3 border-2 hover:border-primary/50"
                >
                  {showValidationSuccess ? "Скрыть" : "Показать"} статус полей
                </Button>
                
                <Button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="flex-1 sm:flex-none sm:min-w-[220px] relative overflow-hidden text-sm md:text-base px-6 py-4 md:px-8 md:py-5 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <LoadingSpinner size="sm" />
                      <span className="text-sm md:text-base">Отправляем заказ...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5" />
                      <span>Отправить заказ</span>
                      <Send className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </div>
              
              <OrderConsent />
              
              {!isFormValid && (
                <div className="text-center text-sm text-muted-foreground bg-amber-50 border border-amber-200 rounded-lg p-3">
                  💡 Заполните все обязательные поля для отправки заказа
                </div>
              )}
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
