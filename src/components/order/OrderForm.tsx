
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

      <Card className="p-4 md:p-6 shadow-lg border-0 bg-gradient-to-br from-card to-card/80">
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Основная информация */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <h3 className="text-base md:text-lg font-semibold">Контактная информация</h3>
              <div className="text-xs md:text-sm text-muted-foreground">
                Прогресс: {formProgress}%
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm md:text-base">Ваше имя *</Label>
                <Input
                  ref={nameInputRef}
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Введите ваше имя"
                  className="transition-all duration-200 focus:ring-2 text-sm md:text-base py-2 md:py-3"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm md:text-base">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="transition-all duration-200 focus:ring-2 text-sm md:text-base py-2 md:py-3"
                  required
                />
                <OrderEmailHint />
              </div>
            </div>
          </div>

          {/* Выбор услуги */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-base md:text-lg font-semibold">Тип услуги</h3>
            <ServiceSelector
              services={filteredServices}
              selectedService={form.service}
              onServiceSelect={handleServiceSelect}
            />
          </div>

          {/* Дополнительные вопросы */}
          {currentQuestions.length > 0 && (
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-base md:text-lg font-semibold">Дополнительные параметры</h3>
              <OrderQuestionGroup
                questions={currentQuestions}
                answers={form.additional}
                onChange={handleAdditionalChange}
              />
            </div>
          )}

          {/* Детали проекта */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-base md:text-lg font-semibold">Детали проекта</h3>
            <div className="space-y-2">
              <Label htmlFor="details" className="text-sm md:text-base">Подробное описание *</Label>
              <Textarea
                id="details"
                name="details"
                value={form.details}
                onChange={handleChange}
                placeholder="Опишите ваш проект максимально подробно: цели, целевую аудиторию, стиль, особые требования..."
                rows={4}
                className="transition-all duration-200 focus:ring-2 resize-none text-sm md:text-base"
                required
              />
              <div className="flex flex-col sm:flex-row justify-between text-xs text-muted-foreground gap-1">
                <span>Минимум 20 символов для качественного выполнения</span>
                <span>{form.details.length}/2000</span>
              </div>
            </div>
          </div>

          {/* Кнопка отправки */}
          <div className="space-y-3 md:space-y-4 pt-3 md:pt-4 border-t">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowValidationSuccess(!showValidationSuccess)}
                  className="text-xs md:text-sm px-3 py-2 md:px-4 md:py-2"
                >
                  {showValidationSuccess ? "Скрыть" : "Показать"} статус полей
                </Button>
                
                <Button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="flex-1 sm:flex-none sm:min-w-[200px] relative overflow-hidden text-sm md:text-base px-4 py-3 md:px-6 md:py-4"
                  size="lg"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      <span className="text-xs md:text-sm">Отправляем заказ...</span>
                    </div>
                  ) : (
                    "Отправить заказ"
                  )}
                </Button>
              </div>
              
              <OrderConsent />
              
              {!isFormValid && (
                <div className="text-center text-xs md:text-sm text-muted-foreground">
                  Заполните все обязательные поля для отправки заказа
                </div>
              )}
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
