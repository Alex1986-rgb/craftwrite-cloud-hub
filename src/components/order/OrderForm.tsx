
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useOrderForm } from "@/hooks/useOrderForm";
import OrderFormHeader from "./OrderFormHeader";
import OrderProgressIndicator from "./OrderProgressIndicator";
import OrderSelectedService from "./OrderSelectedService";
import OrderFormValidation from "./OrderFormValidation";
import OrderFormContact from "./OrderFormContact";
import OrderFormService from "./OrderFormService";
import OrderFormAdditional from "./OrderFormAdditional";
import OrderFormDetails from "./OrderFormDetails";
import OrderFormActions from "./OrderFormActions";
import OrderFormPricing from "./OrderFormPricing";
import OrderFormDeadline from "./OrderFormDeadline";

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
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [selectedDeadline, setSelectedDeadline] = useState("standard");

  const handleDeadlineChange = (deadline: string) => {
    setSelectedDeadline(deadline);
    // Calculate price based on deadline
    const basePrice = 5000;
    let multiplier = 1;
    if (deadline === "urgent") multiplier = 1.5;
    if (deadline === "express") multiplier = 2;
    setEstimatedPrice(basePrice * multiplier);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 md:space-y-8">
      <OrderFormHeader />
      
      <OrderProgressIndicator currentStep={currentStep} />

      {form.service && (
        <OrderSelectedService serviceName={form.service} />
      )}

      <OrderFormValidation 
        validations={validationRules} 
        showSuccess={showValidationSuccess}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6 md:p-8 shadow-2xl border-0 bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <OrderFormContact
                form={form}
                handleChange={handleChange}
                nameInputRef={nameInputRef}
                formProgress={formProgress}
              />

              <OrderFormService
                filteredServices={filteredServices}
                selectedService={form.service}
                onServiceSelect={handleServiceSelect}
              />

              <OrderFormAdditional
                currentQuestions={currentQuestions}
                answers={form.additional}
                onChange={handleAdditionalChange}
              />

              <OrderFormDetails
                details={form.details}
                handleChange={handleChange}
              />

              <OrderFormDeadline
                selectedDeadline={selectedDeadline}
                onDeadlineChange={handleDeadlineChange}
              />

              <OrderFormActions
                loading={loading}
                isFormValid={isFormValid}
                showValidationSuccess={showValidationSuccess}
                setShowValidationSuccess={setShowValidationSuccess}
                handleSubmit={handleSubmit}
              />
            </form>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <OrderFormPricing
              service={form.service}
              deadline={selectedDeadline}
              estimatedPrice={estimatedPrice}
            />
            
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200/50">
              <h3 className="text-lg font-bold text-blue-800 mb-4">💡 Полезные советы</h3>
              <div className="space-y-3 text-sm text-blue-700">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Чем подробнее описание, тем точнее результат</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Укажите целевую аудиторию и стиль</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Приложите примеры, если есть</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
