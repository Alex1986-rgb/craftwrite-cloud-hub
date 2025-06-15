
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, ArrowLeft, CheckCircle, AlertCircle, Package, CreditCard } from 'lucide-react';
import { OrderFormData, PaymentMethod } from '@/types/advancedOrder';
import { Service } from '@/data/types/service';
import SmartOrderFilters from './SmartOrderFilters';
import DynamicQuestionBuilder from './DynamicQuestionBuilder';
import EnhancedPriceCalculator from './EnhancedPriceCalculator';
import IntegratedPaymentForm from './IntegratedPaymentForm';
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
      case 0: // Configure
        const filtersCount = Object.keys(orderData.filters).length;
        return Math.min(100, filtersCount * 20);
      
      case 1: // Details
        const answersCount = Object.keys(orderData.answers).length;
        return Math.min(100, answersCount * 25);
      
      case 2: // Payment
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
        return orderData.personalInfo.name && orderData.personalInfo.email;
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
      // Здесь будет интеграция с реальными платежными системами
      console.log('Submitting order:', {
        orderData,
        paymentMethod
      });

      // Имитация API-вызова
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Заказ успешно создан!",
        description: "Вы будете перенаправлены на страницу оплаты",
      });

      // Редирект на страницу оплаты
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
      {/* Заголовок и прогресс */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl font-bold mb-2">
                <Package className="w-6 h-6" />
                Заказ: {selectedService.name}
              </CardTitle>
              <p className="text-muted-foreground">{selectedService.desc}</p>
            </div>
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                Закрыть
              </Button>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Общий прогресс</span>
              <span>{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
            
            {/* Индикатор шагов */}
            <div className="flex items-center justify-between">
              {STEPS.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = getStepProgress(index) >= 80;
                const isAccessible = index <= currentStep;

                return (
                  <div key={step.id} className="flex items-center">
                    <Button
                      variant={isActive ? "default" : isCompleted ? "secondary" : "ghost"}
                      size="sm"
                      className={`flex items-center gap-2 ${!isAccessible ? 'opacity-50' : ''}`}
                      onClick={() => isAccessible && setCurrentStep(index)}
                      disabled={!isAccessible}
                    >
                      <StepIcon className="w-4 h-4" />
                      <span className="hidden sm:inline">{step.label}</span>
                      {isCompleted && <CheckCircle className="w-3 h-3" />}
                    </Button>
                    {index < STEPS.length - 1 && (
                      <ArrowRight className="w-4 h-4 mx-2 text-muted-foreground" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Основное содержимое */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Левая колонка - основной контент */}
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

        {/* Правая колонка - калькулятор и навигация */}
        <div className="space-y-6">
          {/* Калькулятор цены */}
          <EnhancedPriceCalculator
            selectedService={selectedService}
            filters={orderData.filters}
            answers={orderData.answers}
          />

          {/* Навигация между шагами */}
          {currentStep < 2 && (
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Прогресс шага:</span>
                    <span>{getStepProgress(currentStep)}%</span>
                  </div>
                  <Progress value={getStepProgress(currentStep)} className="h-2" />
                  
                  <div className="flex gap-2">
                    {currentStep > 0 && (
                      <Button variant="outline" onClick={handlePrevious} className="flex-1">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Назад
                      </Button>
                    )}
                    
                    <Button 
                      onClick={handleNext}
                      disabled={!canProceedToNext(currentStep)}
                      className="flex-1"
                    >
                      Далее
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>

                  {!canProceedToNext(currentStep) && (
                    <div className="flex items-center gap-2 text-sm text-orange-600">
                      <AlertCircle className="w-4 h-4" />
                      <span>Заполните обязательные поля для продолжения</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Информация о сервисе */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">О услуге</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Сложность:</span>
                <Badge variant="secondary">{selectedService.difficulty}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Популярность:</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < selectedService.popularity ? "text-yellow-400" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground">{selectedService.detail}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
