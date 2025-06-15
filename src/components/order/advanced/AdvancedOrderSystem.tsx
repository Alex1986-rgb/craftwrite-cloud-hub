
import { useState, useMemo } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Package, CreditCard } from 'lucide-react';
import { OrderFormData, PaymentMethod } from '@/types/advancedOrder';
import { Service } from '@/data/types/service';
import SmartOrderFilters from './SmartOrderFilters';
import DynamicQuestionBuilder from './DynamicQuestionBuilder';
import EnhancedPriceCalculator from './EnhancedPriceCalculator';
import IntegratedPaymentForm from './IntegratedPaymentForm';
import OrderProgressHeader from './OrderProgressHeader';
import OrderNavigationCard from './OrderNavigationCard';
import ServiceInfoCard from './ServiceInfoCard';
import { useToast } from '@/hooks/use-toast';

interface AdvancedOrderSystemProps {
  selectedService: Service;
  onClose?: () => void;
  className?: string;
}

const STEPS = [
  { id: 'configure', label: 'Настройки', icon: Package },
  { id: 'details', label: 'Детали', icon: CheckCircle },
  { id: 'payment', label: 'Оплата', icon: CreditCard }
];

export default function AdvancedOrderSystem({ 
  selectedService, 
  onClose,
  className 
}: AdvancedOrderSystemProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [orderData, setOrderData] = useState<OrderFormData>({
    serviceSlug: selectedService.slug,
    serviceName: selectedService.name,
    filters: {},
    answers: {},
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      company: ''
    },
    pricing: {
      basePrice: selectedService.price.min,
      additionalCosts: {},
      totalPrice: selectedService.price.min,
      currency: selectedService.price.currency
    },
    timeline: {
      estimatedDays: selectedService.deliveryTime.min,
      priority: 'standard'
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const updateFilters = (filters: Record<string, any>) => {
    setOrderData(prev => ({
      ...prev,
      filters
    }));
  };

  const updateAnswers = (answers: Record<string, any>) => {
    setOrderData(prev => ({
      ...prev,
      answers
    }));
  };

  const updatePersonalInfo = (info: Partial<OrderFormData['personalInfo']>) => {
    setOrderData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...info
      }
    }));
  };

  const getStepProgress = (stepIndex: number): number => {
    switch (stepIndex) {
      case 0:
        const filtersCount = Object.keys(orderData.filters).length;
        return Math.min(100, filtersCount * 20);
      
      case 1:
        const answersCount = Object.keys(orderData.answers).length;
        return Math.min(100, answersCount * 25);
      
      case 2:
        const personalInfoFields = Object.values(orderData.personalInfo).filter(v => v && v.trim()).length;
        return Math.min(100, personalInfoFields * 25);
      
      default:
        return 0;
    }
  };

  const canProceedToNext = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0:
        return Object.keys(orderData.filters).length >= 2;
      case 1:
        return Object.keys(orderData.answers).length >= 1;
      case 2:
        return Boolean(orderData.personalInfo.name && orderData.personalInfo.email);
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1 && canProceedToNext(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePaymentSubmit = async (paymentMethod: PaymentMethod) => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting order:', {
        orderData,
        paymentMethod
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Заказ успешно создан!",
        description: "Вы будете перенаправлены на страницу оплаты",
      });

      window.open(`/payment/${paymentMethod.id}`, '_blank');
      
    } catch (error) {
      toast({
        title: "Ошибка создания заказа",
        description: "Попробуйте еще раз или свяжитесь с поддержкой",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const overallProgress = useMemo(() => {
    const stepProgresses = STEPS.map((_, index) => getStepProgress(index));
    const completedSteps = stepProgresses.filter(progress => progress >= 80).length;
    return Math.round((completedSteps / STEPS.length) * 100);
  }, [orderData]);

  return (
    <div className={`max-w-7xl mx-auto p-6 space-y-6 ${className}`}>
      <OrderProgressHeader
        selectedService={selectedService}
        onClose={onClose}
        overallProgress={overallProgress}
        steps={STEPS}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        getStepProgress={getStepProgress}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {currentStep === 0 && (
            <SmartOrderFilters
              selectedService={selectedService}
              filters={orderData.filters}
              onFiltersChange={updateFilters}
            />
          )}

          {currentStep === 1 && (
            <DynamicQuestionBuilder
              serviceSlug={selectedService.slug}
              answers={orderData.answers}
              onAnswersChange={updateAnswers}
            />
          )}

          {currentStep === 2 && (
            <IntegratedPaymentForm
              orderData={orderData}
              onPersonalInfoChange={updatePersonalInfo}
              onSubmit={handlePaymentSubmit}
              isLoading={isSubmitting}
            />
          )}
        </div>

        <div className="space-y-6">
          <EnhancedPriceCalculator
            selectedService={selectedService}
            filters={orderData.filters}
            answers={orderData.answers}
          />

          <OrderNavigationCard
            currentStep={currentStep}
            totalSteps={STEPS.length}
            getStepProgress={getStepProgress}
            canProceedToNext={canProceedToNext}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />

          <ServiceInfoCard selectedService={selectedService} />
        </div>
      </div>
    </div>
  );
}
