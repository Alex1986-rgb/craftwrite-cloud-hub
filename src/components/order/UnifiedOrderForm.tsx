
import { useState, useRef, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import { OrderFormProvider, useOrderForm } from '@/contexts/OrderFormContext';
import { useOrderValidation } from '@/hooks/useOrderValidation';
import { useOrderPricing } from '@/hooks/useOrderPricing';

import { OrderFormLayout } from './OrderFormLayout';
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
import ExpertTipsWidget from './sidebar/ExpertTipsWidget';

interface UnifiedOrderFormProps {
  variant?: 'public' | 'client';
  onOrderCreated?: () => void;
}

function OrderFormContent({ variant, onOrderCreated }: UnifiedOrderFormProps) {
  const { user } = useUnifiedAuth();
  const { 
    form, 
    currentStep, 
    completedSteps, 
    loading, 
    updateForm, 
    setCurrentStep, 
    setLoading 
  } = useOrderForm();
  
  const { isCurrentStepValid, isFormValid } = useOrderValidation();
  const { calculateEstimatedPrice, getEstimatedDeliveryTime } = useOrderPricing();
  const nameInputRef = useRef<HTMLInputElement>(null);

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

  // Calculate form progress
  const formProgress = useMemo(() => {
    let completedFields = 0;
    const totalFields = 5;
    
    if (form.name.trim()) completedFields++;
    if (form.email.trim()) completedFields++;
    if (form.service) completedFields++;
    if (form.details.trim()) completedFields++;
    if (form.deadline) completedFields++;
    
    return (completedFields / totalFields) * 100;
  }, [form]);

  const handleNext = () => {
    if (isCurrentStepValid() && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    onOrderCreated?.();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <OrderFormContact
            form={form}
            handleChange={(e) => updateForm({ [e.target.name]: e.target.value })}
            nameInputRef={nameInputRef}
            formProgress={formProgress}
            variant={variant}
            userPrefilled={Boolean(user && variant === 'client')}
          />
        );
      case 2:
        return (
          <OrderFormService
            filteredServices={[]}
            selectedService={form.service}
            onServiceSelect={(service) => updateForm({ service })}
            variant={variant}
          />
        );
      case 3:
        return (
          <OrderFormDetails
            details={form.details}
            handleChange={(e) => updateForm({ [e.target.name]: e.target.value })}
            variant={variant}
          />
        );
      case 4:
        return (
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
        );
      case 5:
        return (
          <OrderFormSummary
            service={form.service}
            deadline={form.deadline}
            estimatedPrice={estimatedPrice}
            deliveryTime={deliveryTime}
            clientName={form.name}
            clientEmail={form.email}
            details={form.details}
            onEdit={() => setCurrentStep(1)}
            variant={variant}
          />
        );
      default:
        return null;
    }
  };

  const navigation = (
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
          disabled={!isCurrentStepValid()}
          className={`flex items-center gap-2 ${
            variant === 'client' ? 'btn-unified-primary' : ''
          }`}
        >
          Далее
          <ArrowRight className="w-4 h-4" />
        </Button>
      ) : (
        <Button
          onClick={handleSubmit}
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
  );

  const sidebar = (
    <div className="space-y-6">
      <OrderFormPricing
        service={form.service}
        deadline={form.deadline}
        estimatedPrice={estimatedPrice}
        deliveryTime={deliveryTime}
        variant={variant}
      />
      <ExpertTipsWidget 
        selectedService={form.service}
        className="hidden lg:block"
      />
    </div>
  );

  return (
    <>
      {variant === 'public' && <OrderFormHeader />}
      
      {variant === 'client' && (
        <div className="text-center mb-8">
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
        />
      )}

      <OrderFormLayout
        variant={variant}
        sidebar={sidebar}
        navigation={navigation}
      >
        {renderStepContent()}
      </OrderFormLayout>
    </>
  );
}

export default function UnifiedOrderForm(props: UnifiedOrderFormProps) {
  return (
    <OrderFormProvider>
      <OrderFormContent {...props} />
    </OrderFormProvider>
  );
}
