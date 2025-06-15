
import { useState, useRef, useMemo } from 'react';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import { useOrderForm } from '@/contexts/OrderFormContext';
import { useOrderValidation } from '@/hooks/useOrderValidation';
import { useOrderPricing } from '@/hooks/useOrderPricing';

import OrderFormContact from './OrderFormContact';
import OrderFormService from './OrderFormService';
import OrderFormDetails from './OrderFormDetails';
import OrderFormDeadline from './OrderFormDeadline';
import OrderFormAdvanced from './OrderFormAdvanced';
import OrderFormSummary from './OrderFormSummary';

interface OrderFormContentProps {
  variant?: 'public' | 'client';
  onOrderCreated?: () => void;
}

export function OrderFormContent({ variant, onOrderCreated }: OrderFormContentProps) {
  const { user } = useUnifiedAuth();
  const { 
    form, 
    currentStep, 
    loading, 
    updateForm, 
    setCurrentStep, 
    setLoading 
  } = useOrderForm();
  
  const { isFormValid } = useOrderValidation();
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

  return {
    renderStepContent,
    handleSubmit,
    estimatedPrice,
    deliveryTime,
    loading,
    isFormValid
  };
}
