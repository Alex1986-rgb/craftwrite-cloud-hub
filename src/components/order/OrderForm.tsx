
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
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <OrderFormHeader />
      
      <OrderProgressIndicator currentStep={currentStep} />

      {form.service && (
        <OrderSelectedService serviceName={form.service} />
      )}

      <OrderFormValidation 
        validations={validationRules} 
        showSuccess={showValidationSuccess}
      />

      <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-card to-card/80">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Основная информация */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Контактная информация</h3>
              <div className="text-sm text-muted-foreground">
                Прогресс: {formProgress}%
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ваше имя *</Label>
                <Input
                  ref={nameInputRef}
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Введите ваше имя"
                  className="transition-all duration-200 focus:ring-2"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="transition-all duration-200 focus:ring-2"
                  required
                />
                <OrderEmailHint />
              </div>
            </div>
          </div>

          {/* Выбор услуги */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Тип услуги</h3>
            <ServiceSelector
              services={filteredServices}
              selectedService={form.service}
              onServiceSelect={handleServiceSelect}
            />
          </div>

          {/* Дополнительные вопросы */}
          {currentQuestions.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Дополнительные параметры</h3>
              <OrderQuestionGroup
                questions={currentQuestions}
                answers={form.additional}
                onChange={handleAdditionalChange}
              />
            </div>
          )}

          {/* Детали проекта */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Детали проекта</h3>
            <div className="space-y-2">
              <Label htmlFor="details">Подробное описание *</Label>
              <Textarea
                id="details"
                name="details"
                value={form.details}
                onChange={handleChange}
                placeholder="Опишите ваш проект максимально подробно: цели, целевую аудиторию, стиль, особые требования..."
                rows={5}
                className="transition-all duration-200 focus:ring-2 resize-none"
                required
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Минимум 20 символов для качественного выполнения</span>
                <span>{form.details.length}/2000</span>
              </div>
            </div>
          </div>

          {/* Кнопка отправки */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowValidationSuccess(!showValidationSuccess)}
                className="sm:w-auto"
              >
                {showValidationSuccess ? "Скрыть" : "Показать"} статус полей
              </Button>
              
              <Button
                type="submit"
                disabled={loading || !isFormValid}
                className="flex-1 sm:flex-none sm:min-w-[200px] relative overflow-hidden"
                size="lg"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    Отправляем заказ...
                  </div>
                ) : (
                  "Отправить заказ"
                )}
              </Button>
            </div>
            
            <OrderConsent />
            
            {!isFormValid && (
              <div className="text-center text-sm text-muted-foreground">
                Заполните все обязательные поля для отправки заказа
              </div>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
