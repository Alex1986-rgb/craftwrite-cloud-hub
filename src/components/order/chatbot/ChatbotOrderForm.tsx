
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { X, Bot, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Import new modern components
import PlatformSelector from './advanced/PlatformSelector';
import ScriptComplexityCalculator from './advanced/ScriptComplexityCalculator';
import ChatbotAudienceSelector from './advanced/ChatbotAudienceSelector';
import DialogFlowBuilder from './advanced/DialogFlowBuilder';

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
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Контактная информация</h3>
              <p className="text-gray-600">Расскажите о себе и вашем проекте</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Имя *</Label>
                <Input
                  id="name"
                  required
                  value={contactData.name}
                  onChange={(e) => handleContactChange('name', e.target.value)}
                  placeholder="Ваше имя"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={contactData.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  value={contactData.phone}
                  onChange={(e) => handleContactChange('phone', e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              
              <div>
                <Label htmlFor="company">Компания</Label>
                <Input
                  id="company"
                  value={contactData.company}
                  onChange={(e) => handleContactChange('company', e.target.value)}
                  placeholder="Название компании"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Описание проекта *</Label>
              <Textarea
                id="description"
                required
                rows={4}
                value={projectData.description}
                onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Опишите ваш проект, задачи бота, основные функции..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Платформы и сложность</h3>
              <p className="text-gray-600">Выберите где будет работать бот и его сложность</p>
            </div>
            
            <PlatformSelector
              onPlatformsChange={handlePlatformsChange}
              onPriceChange={handlePlatformsPriceChange}
              initialPlatforms={projectData.platforms}
            />
            
            <ScriptComplexityCalculator
              onComplexityChange={handleComplexityChange}
              initialScenarios={projectData.scenarios}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Аудитория и диалоги</h3>
              <p className="text-gray-600">Настройте общение под вашу аудиторию</p>
            </div>
            
            <ChatbotAudienceSelector
              onAudienceChange={handleAudienceChange}
              initialAudience={projectData.audience}
            />
            
            <DialogFlowBuilder
              onDialogTypesChange={handleDialogTypesChange}
              onCustomScenariosChange={(scenarios) => 
                setProjectData(prev => ({ ...prev, customScenarios: scenarios }))
              }
              initialTypes={projectData.dialogTypes}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Финальные детали</h3>
              <p className="text-gray-600">Последние настройки и подтверждение заказа</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="goals">Цели и KPI</Label>
                <Textarea
                  id="goals"
                  rows={3}
                  value={projectData.goals}
                  onChange={(e) => setProjectData(prev => ({ ...prev, goals: e.target.value }))}
                  placeholder="Чего хотите достичь с помощью бота?"
                />
              </div>

              <div>
                <Label htmlFor="deadline">Срок выполнения</Label>
                <Input
                  id="deadline"
                  value={projectData.deadline}
                  onChange={(e) => setProjectData(prev => ({ ...prev, deadline: e.target.value }))}
                  placeholder="Например: 2 недели"
                />
              </div>
            </div>

            {/* Order Summary */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Итоговая стоимость</h4>
                <div className="space-y-2">
                  {projectData.platforms.length > 0 && (
                    <div className="flex justify-between">
                      <span>Дополнительные платформы:</span>
                      <span>{pricing.platformsPrice.toLocaleString()}₽</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Сценарии ({projectData.scenarios} шт.):</span>
                    <span>{pricing.scenariosPrice.toLocaleString()}₽</span>
                  </div>
                  {projectData.dialogTypes.length > 0 && (
                    <div className="flex justify-between">
                      <span>Типы диалогов:</span>
                      <span>{pricing.dialogTypesPrice.toLocaleString()}₽</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Итого:</span>
                    <span className="text-blue-600">{pricing.totalPrice.toLocaleString()}₽</span>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-600">
                  <div><strong>Платформы:</strong> {projectData.platforms.join(', ') || 'Telegram'}</div>
                  <div><strong>Сложность:</strong> {projectData.complexity}</div>
                  <div><strong>Аудитория:</strong> {projectData.audience}</div>
                </div>
              </CardContent>
            </Card>
          </div>
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
