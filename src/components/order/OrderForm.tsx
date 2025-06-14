
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
  );
}
