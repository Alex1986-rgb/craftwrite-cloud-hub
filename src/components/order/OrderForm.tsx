
import { Card } from "@/components/ui/card";
import { useOrderFormState } from "@/hooks/useOrderFormState";
import { useState } from "react";
import { SERVICES } from "@/data/services";

import OrderFormHeader from "./OrderFormHeader";
import OrderFormSteps from "./OrderFormSteps";
import OrderSelectedService from "./OrderSelectedService";
import OrderFormStepContent from "./OrderFormStepContent";
import OrderFormNavigation from "./OrderFormNavigation";
import OrderFormPricing from "./OrderFormPricing";

export default function OrderForm() {
  const orderFormState = useOrderFormState();
  
  if (!orderFormState) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <Card className="p-8 text-center">
          <p>Загрузка формы заказа...</p>
        </Card>
      </div>
    );
  }

  const {
    form,
    currentStep,
    completedSteps,
    loading,
    nameInputRef,
    updateForm,
    setCurrentStep,
    handleSubmit,
    isFormValid,
    calculateEstimatedPrice,
    getEstimatedDeliveryTime,
    getSelectedService
  } = orderFormState;

  const [showValidationSuccess, setShowValidationSuccess] = useState(false);
  
  const estimatedPrice = calculateEstimatedPrice ? calculateEstimatedPrice() : 5000;
  const deliveryTime = getEstimatedDeliveryTime ? getEstimatedDeliveryTime() : "3-5 дней";
  const selectedService = getSelectedService ? getSelectedService() : null;
  const availableServices = SERVICES?.map(service => service.name) || [];

  const canGoNext = () => {
    if (!form) return false;
    
    switch (currentStep) {
      case 1: return form.name?.trim() && form.email?.trim();
      case 2: return form.service;
      case 3: return form.details?.trim();
      case 4: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (canGoNext() && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormChange = (updates: any) => {
    if (updateForm) {
      updateForm(updates);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 md:space-y-8">
      <OrderFormHeader />
      
      <OrderFormSteps currentStep={currentStep} completedSteps={completedSteps || []} />

      {form?.service && currentStep > 2 && (
        <OrderSelectedService 
          serviceName={form.service}
          serviceDetails={selectedService}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        <div className="lg:col-span-3">
          <Card className="p-6 md:p-8 shadow-2xl border-0 bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm">
            <OrderFormStepContent
              currentStep={currentStep}
              form={form}
              nameInputRef={nameInputRef}
              availableServices={availableServices}
              selectedService={selectedService}
              estimatedPrice={estimatedPrice}
              deliveryTime={deliveryTime}
              handleFormChange={handleFormChange}
            />
            
            <OrderFormNavigation
              currentStep={currentStep}
              canGoNext={canGoNext()}
              loading={loading}
              isFormValid={isFormValid ? isFormValid() : false}
              showValidationSuccess={showValidationSuccess}
              setShowValidationSuccess={setShowValidationSuccess}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              handleSubmit={handleSubmit || (() => {})}
            />
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <OrderFormPricing
              service={form?.service || ""}
              deadline={form?.deadline || ""}
              estimatedPrice={estimatedPrice}
              deliveryTime={deliveryTime}
              serviceDetails={selectedService}
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
                {selectedService && (
                  <div className="mt-4 p-3 bg-white/60 rounded-lg">
                    <div className="text-xs font-semibold text-blue-800 mb-1">Для этой услуги важно:</div>
                    <div className="text-xs text-blue-600">
                      {selectedService.recs?.slice(0, 2).map((rec, index) => (
                        <div key={index} className="mb-1">• {rec}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
