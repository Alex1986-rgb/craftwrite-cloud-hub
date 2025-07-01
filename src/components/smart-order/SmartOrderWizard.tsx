
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

interface SmartOrderWizardProps {
  preselectedService?: string;
  onOrderComplete?: (orderId: string) => void;
  onClose?: () => void;
}

export interface OrderData {
  // Service details
  serviceType: string;
  serviceSubtype: string;
  
  // Project details
  projectTitle: string;
  targetAudience: string;
  projectGoals: string;
  competitorUrls: string[];
  
  // Content requirements
  characterCount: number;
  keywordsMode: 'client' | 'auto' | 'ai';
  keywords: string[];
  toneOfVoice: string;
  contentStructure: string[];
  
  // Pricing
  basePrice: number;
  totalPrice: number;
  urgencyMultiplier: number;
  additionalServices: string[];
  
  // Contact
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactCompany: string;
  
  // Technical
  deadline: string;
  specialRequirements: string;
  previousExperience: boolean;
}

const STEPS = [
  { id: 1, title: 'Тип контента', description: 'Что вам нужно?', icon: Sparkles },
  { id: 2, title: 'Детали проекта', description: 'Расскажите о задаче', icon: Users },
  { id: 3, title: 'Требования', description: 'Технические детали', icon: CheckCircle },
  { id: 4, title: 'Цена и сроки', description: 'Расчёт стоимости', icon: Calculator },
  { id: 5, title: 'Контакты', description: 'Как с вами связаться', icon: Clock }
];

export default function SmartOrderWizard({ 
  preselectedService, 
  onOrderComplete, 
  onClose 
}: SmartOrderWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<Partial<OrderData>>({
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
      const parsed = JSON.parse(savedData);
      const timeDiff = Date.now() - parsed.timestamp;
      // Load if saved within last 24 hours
      if (timeDiff < 24 * 60 * 60 * 1000) {
        setOrderData(parsed);
        setCurrentStep(parsed.currentStep || 1);
        toast.success('Восстановлены сохранённые данные');
      }
    }
  }, []);

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(STEPS.length, prev + 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!orderData.serviceType;
      case 2:
        return !!(orderData.projectTitle && orderData.targetAudience);
      case 3:
        return orderData.characterCount! > 0;
      case 4:
        return orderData.totalPrice! > 0;
      case 5:
        return !!(orderData.contactName && orderData.contactEmail);
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    setLoading(true);
    try {
      // Simulate order creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderId = `order_${Date.now()}`;
      localStorage.removeItem('smart-order-draft');
      
      toast.success('Заказ успешно создан!', {
        description: 'Мы свяжемся с вами в течение 30 минут'
      });
      
      onOrderComplete?.(orderId);
    } catch (error) {
      toast.error('Ошибка создания заказа');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderData = (updates: Partial<OrderData>) => {
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
              <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/20">
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

        {/* Price calculator sidebar */}
        <div className="lg:col-span-1">
          <SmartPriceCalculator
            serviceType={orderData.serviceType || ''}
            characterCount={orderData.characterCount || 3000}
            urgencyMultiplier={orderData.urgencyMultiplier || 1}
            additionalServices={orderData.additionalServices || []}
            onPriceUpdate={(price, breakdown) => 
              updateOrderData({ totalPrice: price, basePrice: breakdown.basePrice })
            }
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
                  {loading ? 'Создание заказа...' : 'Отправить заказ'}
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
