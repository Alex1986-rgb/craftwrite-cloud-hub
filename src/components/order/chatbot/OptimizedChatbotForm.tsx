
import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Bot, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

// Import existing step components
import ContactStep from './form-steps/ContactStep';
import PlatformStep from './form-steps/PlatformStep';
import AudienceStep from './form-steps/AudienceStep';
import FinalStep from './form-steps/FinalStep';
import AdvancedStep from './form-steps/AdvancedStep';

// Import new components
import PriceCalculator from './PriceCalculator';
import FormProgress from './FormProgress';
import EnhancedValidation from './EnhancedValidation';

interface OptimizedChatbotFormProps {
  selectedType?: string;
  onClose: () => void;
  onSuccess?: () => void;
}

interface PriceBreakdown {
  basePrice: number;
  platformMultiplier: number;
  complexityMultiplier: number;
  dialogTypesPrice: number;
  totalPrice: number;
  deliveryTime: string;
}

const VALIDATION_RULES = [
  {
    field: 'name',
    validate: (value: string) => value && value.trim().length >= 2,
    message: 'Имя должно содержать минимум 2 символа',
    severity: 'error' as const
  },
  {
    field: 'email',
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Введите корректный email адрес',
    severity: 'error' as const
  },
  {
    field: 'platforms',
    validate: (value: string[]) => value && value.length > 0,
    message: 'Выберите хотя бы одну платформу',
    severity: 'error' as const
  },
  {
    field: 'audience',
    validate: (value: string) => value && value.trim().length > 0,
    message: 'Опишите целевую аудиторию',
    severity: 'error' as const
  },
  {
    field: 'description',
    validate: (value: string) => value && value.trim().length >= 10,
    message: 'Описание проекта должно содержать минимум 10 символов',
    severity: 'warning' as const
  }
];

export default function OptimizedChatbotForm({ 
  selectedType, 
  onClose, 
  onSuccess 
}: OptimizedChatbotFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const [projectData, setProjectData] = useState({
    platforms: [] as string[],
    scenarios: 15,
    complexity: '',
    audience: '',
    audienceScenarios: [] as string[],
    conversationStyle: '',
    dialogTypes: [] as string[],
    customScenarios: '',
    description: '',
    goals: '',
    deadline: '',
    budget: ''
  });

  // Updated pricing state to match FinalStep interface
  const [pricing, setPricing] = useState({
    platformsPrice: 0,
    scenariosPrice: 0,
    dialogTypesPrice: 0,
    totalPrice: 0
  });

  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(null);

  const [advancedOptions, setAdvancedOptions] = useState({
    characterCount: 3000,
    contentQuestions: [] as string[],
    keywords: [] as string[],
    keywordMode: 'client' as 'client' | 'auto',
    lsiKeywords: [] as string[],
    lsiMode: 'client' as 'client' | 'auto',
    competitorDomains: [] as string[],
    metaData: {
      metaTitle: '',
      metaDescription: '',
      companyName: '',
      includeLinks: false,
      internalLinks: [] as string[]
    }
  });

  const allFormData = {
    ...contactData,
    ...projectData,
    ...advancedOptions
  };

  const handleValidationChange = useCallback((isValid: boolean, errors: string[]) => {
    setIsFormValid(isValid);
    setValidationErrors(errors);
  }, []);

  const handlePriceUpdate = useCallback((price: number, breakdown: PriceBreakdown) => {
    // Update both pricing states
    setPricing({
      platformsPrice: breakdown.platformMultiplier,
      scenariosPrice: breakdown.basePrice,
      dialogTypesPrice: breakdown.dialogTypesPrice,
      totalPrice: price
    });
    setPriceBreakdown(breakdown);
  }, []);

  const handleFormRestore = useCallback((savedData: any) => {
    if (savedData.name) setContactData(prev => ({ ...prev, ...savedData }));
    if (savedData.platforms) setProjectData(prev => ({ ...prev, ...savedData }));
    if (savedData.characterCount) setAdvancedOptions(prev => ({ ...prev, ...savedData }));
  }, []);

  const handleContactChange = (field: string, value: string) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  const handleProjectChange = (field: string, value: string) => {
    setProjectData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      toast.error('Исправьте ошибки в форме перед отправкой');
      return;
    }
    
    setLoading(true);

    try {
      const orderData = {
        ...allFormData,
        pricing,
        breakdown: priceBreakdown,
        selectedType
      };

      console.log('Optimized chatbot order:', orderData);
      
      // Clear saved data after successful submission
      localStorage.removeItem('chatbot-order-draft');
      
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success('Заказ успешно отправлен!', {
        description: 'Мы свяжемся с вами в течение 2 часов для уточнения деталей.'
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error('Ошибка при отправке заказа');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ContactStep
            contactData={contactData}
            projectData={projectData}
            onContactChange={handleContactChange}
            onProjectChange={handleProjectChange}
          />
        );
      case 2:
        return (
          <PlatformStep
            platforms={projectData.platforms}
            scenarios={projectData.scenarios}
            onPlatformsChange={(platforms) => setProjectData(prev => ({ ...prev, platforms }))}
            onPlatformsPriceChange={() => {}}
            onComplexityChange={(scenarios, price, level) => {
              setProjectData(prev => ({ ...prev, scenarios, complexity: level }));
            }}
          />
        );
      case 3:
        return (
          <AudienceStep
            audience={projectData.audience}
            dialogTypes={projectData.dialogTypes}
            onAudienceChange={(audience, scenarios, style) => {
              setProjectData(prev => ({ 
                ...prev, 
                audience, 
                audienceScenarios: scenarios,
                conversationStyle: style 
              }));
            }}
            onDialogTypesChange={(types) => {
              setProjectData(prev => ({ ...prev, dialogTypes: types }));
            }}
            onCustomScenariosChange={(scenarios) => {
              setProjectData(prev => ({ ...prev, customScenarios: scenarios }));
            }}
          />
        );
      case 4:
        return (
          <AdvancedStep
            characterCount={advancedOptions.characterCount}
            contentQuestions={advancedOptions.contentQuestions}
            keywords={advancedOptions.keywords}
            keywordMode={advancedOptions.keywordMode}
            lsiKeywords={advancedOptions.lsiKeywords}
            competitorDomains={advancedOptions.competitorDomains}
            metaData={advancedOptions.metaData}
            onCharacterCountChange={(count) => 
              setAdvancedOptions(prev => ({ ...prev, characterCount: count }))
            }
            onContentQuestionsChange={(questions) => 
              setAdvancedOptions(prev => ({ ...prev, contentQuestions: questions }))
            }
            onKeywordsChange={(keywords, mode) => {
              setAdvancedOptions(prev => ({ ...prev, keywords, keywordMode: mode }));
            }}
            onLSIKeywordsChange={(keywords, mode) => {
              setAdvancedOptions(prev => ({ ...prev, lsiKeywords: keywords, lsiMode: mode }));
            }}
            onCompetitorAnalysisChange={(domains) => {
              setAdvancedOptions(prev => ({ ...prev, competitorDomains: domains }));
            }}
            onMetaDataChange={(metaData) => {
              setAdvancedOptions(prev => ({ ...prev, metaData }));
            }}
          />
        );
      case 5:
        return (
          <FinalStep
            projectData={{ goals: projectData.goals, deadline: projectData.deadline }}
            pricing={pricing}
            platforms={projectData.platforms}
            scenarios={projectData.scenarios}
            complexity={projectData.complexity}
            audience={projectData.audience}
            onProjectChange={handleProjectChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {/* Main Form */}
      <div className="lg:col-span-2">
        <Card className="shadow-2xl border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Заказ чат-бота</CardTitle>
                  <p className="opacity-90">Создание умного помощника для вашего бизнеса</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Progress indicator */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm opacity-90">Шаг {currentStep} из 5</span>
                <span className="text-sm opacity-90">{Math.round((currentStep / 5) * 100)}% завершено</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {/* Form Progress Component */}
            <FormProgress 
              formData={allFormData}
              onRestore={handleFormRestore}
            />
            
            {/* Enhanced Validation */}
            <EnhancedValidation
              formData={allFormData}
              rules={VALIDATION_RULES}
              onValidationChange={handleValidationChange}
            />

            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              {renderStepContent()}
              
              {/* Navigation */}
              <div className="flex justify-between items-center pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Назад
                </Button>

                {currentStep < 5 ? (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Далее
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={loading || !isFormValid}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 flex items-center gap-2"
                  >
                    {loading ? 'Отправка...' : 'Отправить заказ'}
                    {!loading && <CheckCircle className="w-4 h-4" />}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Price Calculator Sidebar */}
      <div className="lg:col-span-1">
        <PriceCalculator
          platforms={projectData.platforms}
          scenarios={projectData.scenarios}
          complexity={projectData.complexity}
          dialogTypes={projectData.dialogTypes}
          onPriceUpdate={handlePriceUpdate}
        />
      </div>
    </div>
  );
}
