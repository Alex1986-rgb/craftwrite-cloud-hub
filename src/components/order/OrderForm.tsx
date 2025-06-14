import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useOrderFormState } from "@/hooks/useOrderFormState";
import { useState } from "react";

import OrderFormHeader from "./OrderFormHeader";
import OrderFormSteps from "./OrderFormSteps";
import OrderSelectedService from "./OrderSelectedService";
import OrderFormContact from "./OrderFormContact";
import OrderFormService from "./OrderFormService";
import OrderFormDetails from "./OrderFormDetails";
import OrderFormDeadline from "./OrderFormDeadline";
import OrderFormAdvanced from "./OrderFormAdvanced";
import OrderFormSummary from "./OrderFormSummary";
import OrderFormPricing from "./OrderFormPricing";
import OrderFormActions from "./OrderFormActions";

export default function OrderForm() {
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
    calculateEstimatedPrice
  } = useOrderFormState();

  const [showValidationSuccess, setShowValidationSuccess] = useState(false);
  const estimatedPrice = calculateEstimatedPrice();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <OrderFormContact
            form={form}
            handleChange={(e) => updateForm({ [e.target.name]: e.target.value })}
            nameInputRef={nameInputRef}
            formProgress={0}
          />
        );
      
      case 2:
        return (
          <OrderFormService
            filteredServices={[
              "SEO-статья",
              "Лендинг", 
              "Описание товара",
              "Пост в соцсети",
              "Email-рассылка",
              "Презентация",
              "Веб-контент",
              "Техническая документация"
            ]}
            selectedService={form.service}
            onServiceSelect={(service) => updateForm({ service })}
          />
        );
      
      case 3:
        return (
          <OrderFormDetails
            details={form.details}
            handleChange={(e) => updateForm({ [e.target.name]: e.target.value })}
          />
        );
      
      case 4:
        return (
          <div className="space-y-8">
            <OrderFormDeadline
              selectedDeadline={form.deadline}
              onDeadlineChange={(deadline) => updateForm({ deadline })}
            />
            
            <OrderFormAdvanced
              additionalServices={form.additionalServices}
              onAdditionalServicesChange={(additionalServices) => updateForm({ additionalServices })}
              targetAudience={form.targetAudience}
              onTargetAudienceChange={(targetAudience) => updateForm({ targetAudience })}
              seoKeywords={form.seoKeywords}
              onSeoKeywordsChange={(seoKeywords) => updateForm({ seoKeywords })}
              preferredStyle={form.preferredStyle}
              onPreferredStyleChange={(preferredStyle) => updateForm({ preferredStyle })}
              additionalRequirements={form.additionalRequirements}
              onAdditionalRequirementsChange={(additionalRequirements) => updateForm({ additionalRequirements })}
            />
          </div>
        );
      
      case 5:
        return (
          <OrderFormSummary
            service={form.service}
            deadline={form.deadline}
            estimatedPrice={estimatedPrice}
            clientName={form.name}
            clientEmail={form.email}
            details={form.details}
            onEdit={() => setCurrentStep(1)}
          />
        );
      
      default:
        return null;
    }
  };

  const canGoNext = () => {
    switch (currentStep) {
      case 1: return form.name.trim() && form.email.trim();
      case 2: return form.service;
      case 3: return form.details.trim();
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

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 md:space-y-8">
      <OrderFormHeader />
      
      <OrderFormSteps currentStep={currentStep} completedSteps={completedSteps} />

      {form.service && currentStep > 2 && (
        <OrderSelectedService serviceName={form.service} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        <div className="lg:col-span-3">
          <Card className="p-6 md:p-8 shadow-2xl border-0 bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm">
            <div className="min-h-[400px]">
              {/* Step content rendering */}
              {currentStep === 1 && (
                <OrderFormContact
                  form={form}
                  handleChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                  nameInputRef={nameInputRef}
                  formProgress={0}
                />
              )}
              
              {currentStep === 2 && (
                <OrderFormService
                  filteredServices={[
                    "SEO-статья",
                    "Лендинг", 
                    "Описание товара",
                    "Пост в соцсети",
                    "Email-рассылка",
                    "Презентация",
                    "Веб-контент",
                    "Техническая документация"
                  ]}
                  selectedService={form.service}
                  onServiceSelect={(service) => updateForm({ service })}
                />
              )}
              
              {currentStep === 3 && (
                <OrderFormDetails
                  details={form.details}
                  handleChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                />
              )}
              
              {currentStep === 4 && (
                <div className="space-y-8">
                  <OrderFormDeadline
                    selectedDeadline={form.deadline}
                    onDeadlineChange={(deadline) => updateForm({ deadline })}
                  />
                  
                  <OrderFormAdvanced
                    additionalServices={form.additionalServices}
                    onAdditionalServicesChange={(additionalServices) => updateForm({ additionalServices })}
                    targetAudience={form.targetAudience}
                    onTargetAudienceChange={(targetAudience) => updateForm({ targetAudience })}
                    seoKeywords={form.seoKeywords}
                    onSeoKeywordsChange={(seoKeywords) => updateForm({ seoKeywords })}
                    preferredStyle={form.preferredStyle}
                    onPreferredStyleChange={(preferredStyle) => updateForm({ preferredStyle })}
                    additionalRequirements={form.additionalRequirements}
                    onAdditionalRequirementsChange={(additionalRequirements) => updateForm({ additionalRequirements })}
                  />
                </div>
              )}
              
              {currentStep === 5 && (
                <OrderFormSummary
                  service={form.service}
                  deadline={form.deadline}
                  estimatedPrice={estimatedPrice}
                  clientName={form.name}
                  clientEmail={form.email}
                  details={form.details}
                  onEdit={() => setCurrentStep(1)}
                />
              )}
            </div>
            
            {/* Navigation */}
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
                  disabled={!canGoNext()}
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
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <OrderFormPricing
              service={form.service}
              deadline={form.deadline}
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
