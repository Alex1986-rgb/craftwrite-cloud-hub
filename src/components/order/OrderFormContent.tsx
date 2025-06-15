
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

// New modern components
import CharacterCalculator from './advanced/CharacterCalculator';
import AudienceSelector from './advanced/AudienceSelector';
import KeywordManager from './advanced/KeywordManager';

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

  // New state for modern features
  const [characterCount, setCharacterCount] = useState(5000);
  const [keywordMode, setKeywordMode] = useState<'client' | 'auto'>('client');
  const [competitorDomains, setCompetitorDomains] = useState<string[]>([]);

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
    
    // Enhanced order data with new features
    const orderData = {
      ...form,
      characterCount,
      keywordMode,
      competitorDomains,
      estimatedPrice,
      deliveryTime
    };
    
    console.log('Enhanced order data:', orderData);
    
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
          <div className="space-y-6">
            <OrderFormDetails
              details={form.details}
              handleChange={(e) => updateForm({ [e.target.name]: e.target.value })}
              variant={variant}
            />
            
            <CharacterCalculator
              serviceType={form.service}
              onCharacterCountChange={setCharacterCount}
              initialCount={characterCount}
            />
            
            <AudienceSelector
              onAudienceChange={(audience) => updateForm({ targetAudience: audience })}
              initialAudience={form.targetAudience}
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-8">
            <OrderFormDeadline
              selectedDeadline={form.deadline}
              onDeadlineChange={(deadline) => updateForm({ deadline })}
              variant={variant}
            />
            
            <KeywordManager
              onKeywordsChange={(keywords, mode) => {
                setKeywordMode(mode);
                updateForm({ seoKeywords: keywords.join(', ') });
              }}
              onCompetitorAnalysisChange={setCompetitorDomains}
              initialKeywords={form.seoKeywords ? form.seoKeywords.split(', ') : []}
              initialMode={keywordMode}
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
