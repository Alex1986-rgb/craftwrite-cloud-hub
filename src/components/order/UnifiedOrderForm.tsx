
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useOrderFormState } from '@/hooks/useOrderFormState';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';

import OrderFormHeader from './OrderFormHeader';
import OrderFormSteps from './OrderFormSteps';
import OrderSelectedService from './OrderSelectedService';
import OrderFormContact from './OrderFormContact';
import OrderFormService from './OrderFormService';
import OrderFormDetails from './OrderFormDetails';
import OrderFormDeadline from './OrderFormDeadline';
import OrderFormAdvanced from './OrderFormAdvanced';
import OrderFormSummary from './OrderFormSummary';
import OrderFormPricing from './OrderFormPricing';
import OrderFormActions from './OrderFormActions';

interface UnifiedOrderFormProps {
  variant?: 'public' | 'client';
  onOrderCreated?: () => void;
}

export default function UnifiedOrderForm({ 
  variant = 'public',
  onOrderCreated 
}: UnifiedOrderFormProps) {
  const { user, currentRole } = useUnifiedAuth();
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
  } = useOrderFormState();

  const [showValidationSuccess, setShowValidationSuccess] = useState(false);
  
  // Pre-fill user data if authenticated
  useState(() => {
    if (user && variant === 'client') {
      updateForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  });

  const estimatedPrice = calculateEstimatedPrice();
  const deliveryTime = getEstimatedDeliveryTime();
  const selectedService = getSelectedService();

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    await handleSubmit(e);
    onOrderCreated?.();
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 md:space-y-8">
      {variant === 'public' && <OrderFormHeader />}
      
      {variant === 'client' && (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gradient mb-4">Новый заказ</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Создайте заказ на написание текстов с предзаполненными данными
          </p>
        </div>
      )}
      
      <OrderFormSteps currentStep={currentStep} completedSteps={completedSteps} />

      {form.service && currentStep > 2 && (
        <OrderSelectedService 
          serviceName={form.service}
          serviceDetails={selectedService}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        <div className="lg:col-span-3">
          <Card className={`p-6 md:p-8 shadow-2xl border-0 ${
            variant === 'client' 
              ? 'glass-card' 
              : 'bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm'
          }`}>
            <div className="min-h-[400px]">
              {/* Step content rendering */}
              {currentStep === 1 && (
                <OrderFormContact
                  form={form}
                  handleChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                  nameInputRef={nameInputRef}
                  formProgress={0}
                  variant={variant}
                  userPrefilled={Boolean(user && variant === 'client')}
                />
              )}
              
              {currentStep === 2 && (
                <OrderFormService
                  filteredServices={[]} // Will be populated from services data
                  selectedService={form.service}
                  onServiceSelect={(service) => updateForm({ service })}
                  variant={variant}
                />
              )}
              
              {currentStep === 3 && (
                <OrderFormDetails
                  details={form.details}
                  handleChange={(e) => updateForm({ [e.target.name]: e.target.value })}
                  variant={variant}
                />
              )}
              
              {currentStep === 4 && (
                <div className="space-y-8">
                  <OrderFormDeadline
                    selectedDeadline={form.deadline}
                    onDeadlineChange={(deadline) => updateForm({ deadline })}
                    variant={variant}
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
                    variant={variant}
                  />
                </div>
              )}
              
              {currentStep === 5 && (
                <OrderFormSummary
                  service={form.service}
                  deadline={form.deadline}
                  estimatedPrice={estimatedPrice}
                  deliveryTime={deliveryTime}
                  clientName={form.name}
                  clientEmail={form.email}
                  details={form.details}
                  serviceDetails={selectedService}
                  onEdit={() => setCurrentStep(1)}
                  variant={variant}
                />
              )}
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
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
                  className={`flex items-center gap-2 ${
                    variant === 'client' ? 'btn-unified-primary' : ''
                  }`}
                >
                  Далее
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleFormSubmit}
                  disabled={!isFormValid() || loading}
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
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <OrderFormPricing
              service={form.service}
              deadline={form.deadline}
              estimatedPrice={estimatedPrice}
              deliveryTime={deliveryTime}
              serviceDetails={selectedService}
              variant={variant}
            />
            
            <Card className={`p-6 ${
              variant === 'client' 
                ? 'glass-card' 
                : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200/50'
            }`}>
              <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-4">💡 Полезные советы</h3>
              <div className="space-y-3 text-sm text-blue-700 dark:text-blue-300">
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
                  <div className="mt-4 p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg">
                    <div className="text-xs font-semibold text-blue-800 dark:text-blue-200 mb-1">Для этой услуги важно:</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">
                      {selectedService.recs.slice(0, 2).map((rec, index) => (
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
