
import { useState, useMemo } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Package, CreditCard, Sparkles, Target, TrendingUp } from 'lucide-react';
import { OrderFormData, PaymentMethod } from '@/types/advancedOrder';
import { Service } from '@/data/types/service';
import SmartOrderFilters from './SmartOrderFilters';
import DynamicQuestionBuilder from './DynamicQuestionBuilder';
import EnhancedPriceCalculator from './EnhancedPriceCalculator';
import IntegratedPaymentForm from './IntegratedPaymentForm';
import OrderProgressHeader from './OrderProgressHeader';
import OrderNavigationCard from './OrderNavigationCard';
import ServiceInfoCard from './ServiceInfoCard';
import OrderThankYou from '../OrderThankYou';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AdvancedOrderSystemProps {
  selectedService: Service;
  onClose?: () => void;
  className?: string;
}

const STEPS = [
  { id: 'configure', label: 'Настройки', icon: Package, description: 'Выберите параметры' },
  { id: 'details', label: 'Детали', icon: CheckCircle, description: 'Заполните информацию' },
  { id: 'payment', label: 'Оплата', icon: CreditCard, description: 'Завершите заказ' },
  { id: 'success', label: 'Готово', icon: Sparkles, description: 'Заказ принят' }
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
        return Math.min(100, filtersCount * 15);
      
      case 1:
        const answersCount = Object.keys(orderData.answers).length;
        return Math.min(100, answersCount * 20);
      
      case 2:
        const personalInfoFields = Object.values(orderData.personalInfo).filter(v => v && v.trim()).length;
        return Math.min(100, personalInfoFields * 25);
      
      case 3:
        return 100;
      
      default:
        return 0;
    }
  };

  const canProceedToNext = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0:
        return Object.keys(orderData.filters).length >= 3;
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
        description: "Оплата произведена успешно",
      });

      setCurrentStep(3); // Move to success step
      
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
    const stepProgresses = STEPS.slice(0, 3).map((_, index) => getStepProgress(index));
    const completedSteps = stepProgresses.filter(progress => progress >= 80).length;
    return Math.round((completedSteps / 3) * 100);
  }, [orderData]);

  // Show thank you page after successful payment
  if (currentStep === 3) {
    return (
      <div className={`max-w-7xl mx-auto p-6 ${className}`}>
        <OrderThankYou orderData={orderData} />
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto p-6 space-y-6 ${className}`}>
      {/* Enhanced Header with Service Info */}
      <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedService.name}</h1>
                <p className="text-gray-600">Настройте параметры для идеального результата</p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2">
              от {selectedService.price.min}₽
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Прогресс заказа</span>
              <span className="font-medium text-purple-600">{overallProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>

          {/* Steps Navigation */}
          <div className="flex items-center justify-between mt-6">
            {STEPS.slice(0, 3).map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              const progress = getStepProgress(index);
              
              return (
                <div key={step.id} className={`flex-1 ${index < STEPS.length - 2 ? 'mr-4' : ''}`}>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : isActive 
                          ? 'bg-blue-500 border-blue-500 text-white' 
                          : 'bg-gray-200 border-gray-300 text-gray-500'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>
                          {step.label}
                        </h3>
                        {progress > 0 && (
                          <span className="text-xs text-gray-500">{progress}%</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{step.description}</p>
                      {progress > 0 && progress < 100 && (
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div 
                            className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    {index < STEPS.length - 2 && (
                      <ArrowRight className="w-4 h-4 text-gray-400 ml-4" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

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
            totalSteps={3}
            getStepProgress={getStepProgress}
            canProceedToNext={canProceedToNext}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />

          <ServiceInfoCard selectedService={selectedService} />

          {/* Expert Quote Card */}
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-yellow-500 text-white rounded-full">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-1">Совет эксперта</h4>
                  <p className="text-sm text-yellow-800">
                    "Чем детальнее вы заполните настройки, тем точнее мы сможем создать текст под ваши потребности."
                  </p>
                  <p className="text-xs text-yellow-700 mt-2 italic">
                    — Анна Петрова, ведущий копирайтер
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Card */}
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-900">Статистика</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Средняя уникальность:</span>
                  <span className="font-medium text-green-800">94%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Довольных клиентов:</span>
                  <span className="font-medium text-green-800">98%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Среднее время:</span>
                  <span className="font-medium text-green-800">1.5 дня</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
