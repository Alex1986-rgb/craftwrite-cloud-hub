import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Bot, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Import step components
import ContactStep from './form-steps/ContactStep';
import PlatformStep from './form-steps/PlatformStep';
import AudienceStep from './form-steps/AudienceStep';
import FinalStep from './form-steps/FinalStep';

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
    totalPrice: 0
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      ...contactData,
      ...projectData,
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
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
        
        {/* Progress indicator */}
        <div className="flex items-center gap-2 mt-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep ? 'bg-white text-blue-600' : 'bg-white/20 text-white/60'
              }`}>
                {step}
              </div>
              {step < 4 && (
                <div className={`w-16 h-1 mx-2 ${
                  step < currentStep ? 'bg-white' : 'bg-white/20'
                }`} />
              )}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit}>
          {renderStepContent()}
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
            
            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && (!contactData.name || !contactData.email || !projectData.description)) ||
                  (currentStep === 2 && projectData.platforms.length === 0) ||
                  (currentStep === 3 && !projectData.audience)
                }
              >
                Далее
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {loading ? 'Отправка...' : 'Отправить заказ'}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
