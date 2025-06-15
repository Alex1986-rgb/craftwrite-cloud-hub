import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Bot, ArrowRight, ArrowLeft, CheckCircle, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Import step components
import ContactStep from './form-steps/ContactStep';
import PlatformStep from './form-steps/PlatformStep';
import AudienceStep from './form-steps/AudienceStep';
import FinalStep from './form-steps/FinalStep';
import AdvancedStep from './form-steps/AdvancedStep';

interface ChatbotOrderFormProps {
  selectedType?: string;
  onClose: () => void;
}

export default function ChatbotOrderForm({ selectedType, onClose }: ChatbotOrderFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Contact data
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  // Project data
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

  // Pricing data
  const [pricing, setPricing] = useState({
    platformsPrice: 0,
    scenariosPrice: 0,
    dialogTypesPrice: 0,
    characterPrice: 0,
    keywordPrice: 0,
    lsiPrice: 0,
    competitorAnalysisPrice: 0,
    metaDataPrice: 0,
    totalPrice: 0
  });

  // New advanced options state
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

  // Simplified validation
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return contactData.name.trim() !== '' && contactData.email.trim() !== '' && projectData.description.trim() !== '';
      case 2:
        return projectData.platforms.length > 0;
      case 3:
        return projectData.audience.trim() !== '';
      case 4:
        return true; // Advanced step is optional
      case 5:
        return true; // Final step validation handled separately
      default:
        return false;
    }
  };

  const handleContactChange = (field: string, value: string) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  const handleProjectChange = (field: string, value: string) => {
    setProjectData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlatformsChange = (platforms: string[]) => {
    setProjectData(prev => ({ ...prev, platforms }));
  };

  const handlePlatformsPriceChange = (price: number) => {
    setPricing(prev => ({ 
      ...prev, 
      platformsPrice: price,
      totalPrice: prev.scenariosPrice + price + prev.dialogTypesPrice
    }));
  };

  const handleComplexityChange = (scenarios: number, price: number, level: string) => {
    setProjectData(prev => ({ ...prev, scenarios, complexity: level }));
    setPricing(prev => ({ 
      ...prev, 
      scenariosPrice: price,
      totalPrice: prev.platformsPrice + price + prev.dialogTypesPrice
    }));
  };

  const handleAudienceChange = (audience: string, scenarios: string[], style: string) => {
    setProjectData(prev => ({ 
      ...prev, 
      audience, 
      audienceScenarios: scenarios,
      conversationStyle: style 
    }));
  };

  const handleDialogTypesChange = (types: string[], price: number) => {
    setProjectData(prev => ({ ...prev, dialogTypes: types }));
    setPricing(prev => ({ 
      ...prev, 
      dialogTypesPrice: price,
      totalPrice: prev.platformsPrice + prev.scenariosPrice + price
    }));
  };

  const handleAdvancedOptionsChange = (field: string, value: any) => {
    setAdvancedOptions(prev => ({ ...prev, [field]: value }));
  };

  const updatePricingForAdvanced = () => {
    let additionalPrice = 0;
    
    // Character-based pricing
    const baseCharacterPrice = Math.max(0, (advancedOptions.characterCount - 3000) * 0.5);
    
    // Keyword pricing
    const keywordPrice = advancedOptions.keywordMode === 'auto' ? 1500 : 0;
    const lsiPrice = advancedOptions.lsiMode === 'auto' ? 1000 : 0;
    
    // Competitor analysis
    const competitorPrice = advancedOptions.competitorDomains.length > 0 ? 2000 : 0;
    
    // Meta data
    const metaPrice = (advancedOptions.metaData.metaTitle || advancedOptions.metaData.metaDescription) ? 800 : 0;
    
    additionalPrice = baseCharacterPrice + keywordPrice + lsiPrice + competitorPrice + metaPrice;
    
    setPricing(prev => ({
      ...prev,
      characterPrice: baseCharacterPrice,
      keywordPrice,
      lsiPrice,
      competitorAnalysisPrice: competitorPrice,
      metaDataPrice: metaPrice,
      totalPrice: prev.platformsPrice + prev.scenariosPrice + prev.dialogTypesPrice + additionalPrice
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      ...contactData,
      ...projectData,
      ...advancedOptions,
      ...pricing,
      selectedType
    };

    console.log('Chatbot order data:', orderData);
    
    // Store order data for tracking page
    localStorage.setItem('lastOrderData', JSON.stringify(orderData));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Заказ успешно отправлен!",
      description: "Мы свяжемся с вами в течение 2 часов для уточнения деталей.",
    });

    setLoading(false);
    onClose();
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Enhanced step navigation
  const goToStep = (step: number) => {
    // Allow forward navigation only if previous steps are valid
    if (step <= currentStep || (step <= 5 && isStepsUpToValid(step - 1))) {
      setCurrentStep(step);
    }
  };

  const isStepsUpToValid = (upToStep: number): boolean => {
    for (let i = 1; i <= upToStep; i++) {
      if (!isStepValid(i)) return false;
    }
    return true;
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
            onPlatformsChange={handlePlatformsChange}
            onPlatformsPriceChange={handlePlatformsPriceChange}
            onComplexityChange={handleComplexityChange}
          />
        );

      case 3:
        return (
          <AudienceStep
            audience={projectData.audience}
            dialogTypes={projectData.dialogTypes}
            onAudienceChange={handleAudienceChange}
            onDialogTypesChange={handleDialogTypesChange}
            onCustomScenariosChange={(scenarios) => 
              setProjectData(prev => ({ ...prev, customScenarios: scenarios }))
            }
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
            onCharacterCountChange={(count) => handleAdvancedOptionsChange('characterCount', count)}
            onContentQuestionsChange={(questions) => handleAdvancedOptionsChange('contentQuestions', questions)}
            onKeywordsChange={(keywords, mode) => {
              handleAdvancedOptionsChange('keywords', keywords);
              handleAdvancedOptionsChange('keywordMode', mode);
              updatePricingForAdvanced();
            }}
            onLSIKeywordsChange={(keywords, mode) => {
              handleAdvancedOptionsChange('lsiKeywords', keywords);
              handleAdvancedOptionsChange('lsiMode', mode);
              updatePricingForAdvanced();
            }}
            onCompetitorAnalysisChange={(domains) => {
              handleAdvancedOptionsChange('competitorDomains', domains);
              updatePricingForAdvanced();
            }}
            onMetaDataChange={(metaData) => {
              handleAdvancedOptionsChange('metaData', metaData);
              updatePricingForAdvanced();
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

  const getStepTitle = (step: number): string => {
    const titles = {
      1: 'Контакты',
      2: 'Платформы',
      3: 'Аудитория',
      4: 'Детальные настройки',
      5: 'Завершение'
    };
    return titles[step as keyof typeof titles] || '';
  };

  return (
    <Card className="max-w-6xl mx-auto shadow-2xl border-0 bg-white">
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
        
        {/* Enhanced progress indicator */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm opacity-90">Шаг {currentStep} из 5</span>
            <span className="text-sm opacity-90">{Math.round((currentStep / 5) * 100)}% завершено</span>
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <button
                key={step}
                onClick={() => goToStep(step)}
                disabled={step > currentStep && !isStepsUpToValid(step - 1)}
                className={`relative p-3 rounded-lg text-xs font-medium transition-all duration-300 ${
                  step === currentStep
                    ? 'bg-white text-blue-600 shadow-lg'
                    : step < currentStep || isStepsUpToValid(step - 1)
                      ? 'bg-white/20 text-white hover:bg-white/30 cursor-pointer'
                      : 'bg-white/10 text-white/50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-center mb-1">
                  {step === 4 ? (
                    <Settings className="w-4 h-4" />
                  ) : step < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span>{step}</span>
                  )}
                </div>
                <div className="text-[10px] leading-tight">
                  {getStepTitle(step)}
                </div>
                {step === 4 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit}>
          {renderStepContent()}
          
          {/* Enhanced navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад
            </Button>
            
            <div className="flex items-center gap-2">
              {/* Skip advanced step option */}
              {currentStep === 3 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setCurrentStep(5)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Пропустить настройки
                </Button>
              )}
              
              {currentStep === 4 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setCurrentStep(5)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Пропустить
                </Button>
              )}
            </div>

            {currentStep < 5 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {currentStep === 3 ? (
                  <>
                    <Settings className="w-4 h-4" />
                    Детальные настройки
                  </>
                ) : currentStep === 4 ? (
                  'К завершению'
                ) : (
                  'Далее'
                )}
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 flex items-center gap-2"
              >
                {loading ? 'Отправка...' : 'Отправить заказ'}
                {!loading && <CheckCircle className="w-4 h-4" />}
              </Button>
            )}
          </div>

          {/* Help text for advanced features */}
          {currentStep === 3 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 text-blue-800 font-medium mb-2">
                <Settings className="w-4 h-4" />
                Хотите больше возможностей?
              </div>
              <p className="text-sm text-blue-700">
                На следующем шаге вы сможете настроить объем скриптов, управлять ключевыми словами, 
                анализировать конкурентов и добавить мета-данные для лучшего результата.
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
