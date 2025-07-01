import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, ArrowLeft, Sparkles, Calculator, Clock, Users } from 'lucide-react';
import { toast } from 'sonner';

// Import step components
import ServiceSelectionStep from './steps/ServiceSelectionStep';
import ProjectDetailsStep from './steps/ProjectDetailsStep';
import RequirementsStep from './steps/RequirementsStep';
import PricingStep from './steps/PricingStep';
import ContactStep from './steps/ContactStep';
import SmartPriceCalculator from './SmartPriceCalculator';

// Import analytics components
import { AnalyticsProvider, useAnalytics } from './analytics/AnalyticsProvider';
import FunnelAnalyticsDisplay from './analytics/FunnelAnalyticsDisplay';

// Import the integration hook
import { useSmartOrderIntegration, SmartOrderData } from '@/hooks/useSmartOrderIntegration';

interface SmartOrderWizardProps {
  preselectedService?: string;
  onOrderComplete?: (orderId: string) => void;
  onClose?: () => void;
}

const STEPS = [
  { id: 1, title: 'Тип контента', description: 'Что вам нужно?', icon: Sparkles },
  { id: 2, title: 'Детали проекта', description: 'Расскажите о задаче', icon: Users },
  { id: 3, title: 'Требования', description: 'Технические детали', icon: CheckCircle },
  { id: 4, title: 'Цена и сроки', description: 'Расчёт стоимости', icon: Calculator },
  { id: 5, title: 'Контакты', description: 'Как с вами связаться', icon: Clock }
];

function SmartOrderWizardContent({ 
  preselectedService, 
  onOrderComplete, 
  onClose 
}: SmartOrderWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const { createSmartOrder, loading } = useSmartOrderIntegration();
  const analytics = useAnalytics();
  
  const [orderData, setOrderData] = useState<Partial<SmartOrderData>>({
    serviceType: preselectedService || '',
    characterCount: 3000,
    keywordsMode: 'auto',
    keywords: [],
    urgencyMultiplier: 1,
    totalPrice: 0,
    additionalServices: [],
    competitorUrls: [],
    contentStructure: [],
    previousExperience: false
  });

  const progress = (currentStep / STEPS.length) * 100;

  // Auto-save to localStorage
  useEffect(() => {
    const saveData = { ...orderData, currentStep, timestamp: Date.now() };
    localStorage.setItem('smart-order-draft', JSON.stringify(saveData));
  }, [orderData, currentStep]);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('smart-order-draft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const timeDiff = Date.now() - parsed.timestamp;
        // Load if saved within last 24 hours
        if (timeDiff < 24 * 60 * 60 * 1000) {
          setOrderData(parsed);
          setCurrentStep(parsed.currentStep || 1);
          toast.success('✨ Восстановлены сохранённые данные', {
            description: 'Продолжите оформление заказа с того места, где остановились'
          });
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Обновленный handleNext с аналитикой
  const handleNext = async () => {
    if (validateCurrentStep()) {
      // Отмечаем текущий шаг как завершённый
      await analytics.trackStepExit(currentStep, true);
      
      const nextStep = Math.min(STEPS.length, currentStep + 1);
      setCurrentStep(nextStep);
      
      // Отслеживаем вход на следующий шаг
      if (nextStep <= STEPS.length) {
        await analytics.trackStepEnter(nextStep);
      }
      
      toast.success(`Шаг ${currentStep} завершён`, {
        description: `Переходим к шагу ${nextStep}`
      });
    }
  };

  // Обновленный handlePrev с аналитикой  
  const handlePrev = async () => {
    await analytics.trackStepExit(currentStep, false);
    
    const prevStep = Math.max(1, currentStep - 1);
    setCurrentStep(prevStep);
    
    await analytics.trackStepEnter(prevStep);
  };

  // Инициализация аналитики при монтировании
  useEffect(() => {
    analytics.trackStepEnter(1);
    
    // Обработчик закрытия формы
    const handleFormClose = () => {
      if (currentStep < 5) {
        analytics.trackFormAbandon(currentStep, orderData);
      }
    };

    // Отслеживание при закрытии компонента
    return () => {
      if (currentStep < 5) {
        handleFormClose();
      }
    };
  }, []);

  // Отслеживание изменений шага
  useEffect(() => {
    if (currentStep > 1) {
      analytics.trackStepEnter(currentStep);
    }
  }, [currentStep]);

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!orderData.serviceType) {
          toast.error('Выберите тип услуги');
          return false;
        }
        return true;
      case 2:
        if (!orderData.projectTitle) {
          toast.error('Укажите название проекта');
          return false;
        }
        if (!orderData.targetAudience) {
          toast.error('Опишите целевую аудиторию');
          return false;
        }
        return true;
      case 3:
        if (!orderData.characterCount || orderData.characterCount <= 0) {
          toast.error('Укажите корректный объем текста');
          return false;
        }
        return true;
      case 4:
        if (!orderData.totalPrice || orderData.totalPrice <= 0) {
          toast.error('Ошибка расчёта стоимости');
          return false;
        }
        return true;
      case 5:
        if (!orderData.contactName) {
          toast.error('Укажите ваше имя');
          return false;
        }
        if (!orderData.contactEmail) {
          toast.error('Укажите email для связи');
          return false;
        }
        // Простая валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(orderData.contactEmail)) {
          toast.error('Укажите корректный email адрес');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
      return;
    }

    // Проверяем, что все обязательные поля заполнены
    const requiredFields = [
      'serviceType', 'projectTitle', 'targetAudience', 'contactName', 'contactEmail'
    ];
    
    const missingFields = requiredFields.filter(field => !orderData[field as keyof SmartOrderData]);
    
    if (missingFields.length > 0) {
      toast.error('Заполните все обязательные поля', {
        description: `Не заполнены: ${missingFields.join(', ')}`
      });
      return;
    }

    try {
      // Отслеживаем попытку отправки формы
      await analytics.trackFormSubmit(orderData);
      
      const result = await createSmartOrder(orderData as SmartOrderData);
      
      if (result.success && result.order) {
        onOrderComplete?.(result.order.id);
      }
    } catch (error) {
      console.error('Order submission error:', error);
      toast.error('Ошибка отправки заказа', {
        description: 'Проверьте соединение с интернетом и попробуйте снова'
      });
    }
  };

  const updateOrderData = (updates: Partial<SmartOrderData>) => {
    setOrderData(prev => ({ ...prev, ...updates }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelectionStep
            selectedService={orderData.serviceType || ''}
            onServiceSelect={(service, subtype) => 
              updateOrderData({ serviceType: service, serviceSubtype: subtype })
            }
          />
        );
      case 2:
        return (
          <ProjectDetailsStep
            data={{
              projectTitle: orderData.projectTitle || '',
              targetAudience: orderData.targetAudience || '',
              projectGoals: orderData.projectGoals || '',
              competitorUrls: orderData.competitorUrls || []
            }}
            onUpdate={(data) => updateOrderData(data)}
          />
        );
      case 3:
        return (
          <RequirementsStep
            data={{
              characterCount: orderData.characterCount || 3000,
              keywordsMode: orderData.keywordsMode || 'auto',
              keywords: orderData.keywords || [],
              toneOfVoice: orderData.toneOfVoice || '',
              contentStructure: orderData.contentStructure || []
            }}
            onUpdate={(data) => updateOrderData(data)}
          />
        );
      case 4:
        return (
          <PricingStep
            data={{
              basePrice: orderData.basePrice || 0,
              totalPrice: orderData.totalPrice || 0,
              urgencyMultiplier: orderData.urgencyMultiplier || 1,
              additionalServices: orderData.additionalServices || [],
              deadline: orderData.deadline || ''
            }}
            onUpdate={(data) => updateOrderData(data)}
            serviceType={orderData.serviceType || ''}
            characterCount={orderData.characterCount || 3000}
          />
        );
      case 5:
        return (
          <ContactStep
            data={{
              contactName: orderData.contactName || '',
              contactEmail: orderData.contactEmail || '',
              contactPhone: orderData.contactPhone || '',
              contactCompany: orderData.contactCompany || '',
              specialRequirements: orderData.specialRequirements || '',
              previousExperience: orderData.previousExperience || false
            }}
            onUpdate={(data) => updateOrderData(data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header with progress */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl mb-2">Умный заказ текста</CardTitle>
              <p className="opacity-90">Заполните форму за 3 минуты и получите точную цену</p>
            </div>
            {onClose && (
              <Button 
                variant="ghost" 
                onClick={async () => {
                  if (currentStep < 5) {
                    await analytics.trackFormAbandon(currentStep, orderData);
                  }
                  onClose();
                }} 
                className="text-white hover:bg-white/20"
              >
                ✕
              </Button>
            )}
          </div>
          
          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm opacity-90">
                Шаг {currentStep} из {STEPS.length}
              </span>
              <span className="text-sm opacity-90">
                {Math.round(progress)}% завершено
              </span>
            </div>
            <Progress value={progress} className="bg-white/20" />
          </div>
          
          {/* Steps indicator */}
          <div className="flex justify-between mt-4">
            {STEPS.map((step) => (
              <div 
                key={step.id} 
                className={`flex flex-col items-center text-center flex-1 ${
                  step.id <= currentStep ? 'opacity-100' : 'opacity-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  step.id < currentStep 
                    ? 'bg-green-500' 
                    : step.id === currentStep 
                    ? 'bg-white text-blue-600' 
                    : 'bg-white/20'
                }`}>
                  {step.id < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </div>
                <div className="text-xs font-medium">{step.title}</div>
                <div className="text-xs opacity-75 hidden sm:block">{step.description}</div>
              </div>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Main content area */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form content */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              {renderStepContent()}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar with price calculator and analytics */}
        <div className="lg:col-span-1 space-y-6">
          <SmartPriceCalculator
            serviceType={orderData.serviceType || ''}
            characterCount={orderData.characterCount || 3000}
            urgencyMultiplier={orderData.urgencyMultiplier || 1}
            additionalServices={orderData.additionalServices || []}
            onPriceUpdate={(price, breakdown) => 
              updateOrderData({ totalPrice: price, basePrice: breakdown.basePrice })
            }
          />
          
          {/* Analytics Display */}
          <FunnelAnalyticsDisplay 
            sessionMetrics={analytics.getSessionMetrics()}
            showDetails={false}
          />
        </div>
      </div>

      {/* Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад
            </Button>

            <div className="flex items-center gap-2">
              {currentStep < STEPS.length ? (
                <Button
                  onClick={handleNext}
                  disabled={!validateCurrentStep()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 flex items-center gap-2"
                >
                  Далее
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading || !validateCurrentStep()}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 flex items-center gap-2"
                >
                  {loading ? 'Создаём заказ...' : 'Отправить заказ'}
                  {!loading && <CheckCircle className="w-4 h-4" />}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SmartOrderWizard(props: SmartOrderWizardProps) {
  return (
    <AnalyticsProvider>
      <SmartOrderWizardContent {...props} />
    </AnalyticsProvider>
  );
}
