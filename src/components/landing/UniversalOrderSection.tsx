import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, CheckCircle, FileText, Target, User, Zap } from "lucide-react";
import { useUnifiedOrderForm } from "@/hooks/useUnifiedOrderForm";
import { toast } from "@/hooks/use-toast";
import ModernTechnicalTaskStep from "@/components/order/advanced/ModernTechnicalTaskStep";
import ModernDetailedEstimate from "@/components/order/advanced/ModernDetailedEstimate";

interface ServiceType {
  id: string;
  title: string;
  description: string;
  examples: string[];
  icon: string;
}

const SERVICE_TYPES: ServiceType[] = [
  {
    id: "article",
    title: "Статья или обзор",
    description: "Для привлечения клиентов на сайт",
    examples: ["Статья в блог", "Обзор товаров", "Экспертный материал"],
    icon: "📝"
  },
  {
    id: "selling-text",
    title: "Продающий текст",
    description: "Чтобы убедить купить ваш товар или услугу",
    examples: ["Страница товара", "Коммерческое предложение", "Презентация"],
    icon: "💰"
  },
  {
    id: "social-posts",
    title: "Посты для соцсетей",
    description: "Контент для ваших групп и каналов",
    examples: ["Посты ВК", "Telegram-посты", "Instagram-контент"],
    icon: "📱"
  },
  {
    id: "website-texts",
    title: "Тексты для сайта",
    description: "Разделы сайта и описания",
    examples: ["О компании", "Услуги", "Карточки товаров"],
    icon: "🌐"
  },
  {
    id: "other",
    title: "Что-то другое",
    description: "Опишете свою задачу подробнее",
    examples: ["Email-письма", "Презентации", "Нестандартная задача"],
    icon: "🎯"
  }
];

const STEP_ICONS = {
  1: Target,
  2: FileText,
  3: User,
  4: Zap,
  5: CheckCircle
};

export default function UniversalOrderSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType | null>(null);
  const [technicalTaskData, setTechnicalTaskData] = useState<any>({});
  const [estimateData, setEstimateData] = useState(null);
  const [isEstimateApproved, setIsEstimateApproved] = useState(false);
  
  const {
    currentStep,
    formData,
    loading,
    handleInputChange,
    handleServiceSelect,
    handleSubmit,
    isCurrentStepValid,
    goToNextStep,
    goToPreviousStep,
    setCurrentStep
  } = useUnifiedOrderForm({
    onSuccess: () => {
      setIsFormOpen(false);
      setSelectedServiceType(null);
      setTechnicalTaskData({});
      setEstimateData(null);
      setIsEstimateApproved(false);
      setCurrentStep(1);
      toast({
        title: "Заказ отправлен!",
        description: "Мы свяжемся с вами в течение 30 минут"
      });
    }
  });

  const handleServiceTypeSelect = (serviceType: ServiceType) => {
    setSelectedServiceType(serviceType);
    handleServiceSelect(serviceType.title);
    goToNextStep();
  };

  const handleTechnicalTaskUpdate = (updates: any) => {
    setTechnicalTaskData(prev => ({ ...prev, ...updates }));
  };

  const handleCreateEstimate = async () => {
    if (!selectedServiceType) {
      toast({
        title: "Ошибка",
        description: "Тип услуги не выбран",
        variant: "destructive"
      });
      return;
    }

    // Имитация процесса создания сметы с задержкой
    toast({
      title: "Создание сметы...",
      description: "Анализируем техническое задание"
    });

    const estimate = {
      serviceType: selectedServiceType?.id || '',
      projectDetails: formData.details,
      keywords: technicalTaskData.keywords || [],
      lsiKeywords: technicalTaskData.lsiKeywords || [],
      contentStructure: technicalTaskData.contentStructure || [],
      totalWordCount: technicalTaskData.totalWordCount || 3000,
      targetAudience: technicalTaskData.targetAudience || '',
      competitorUrls: technicalTaskData.competitorUrls || [],
      additionalServices: [],
      urgencyMultiplier: 1
    };
    
    // Небольшая задержка для показа процесса
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setEstimateData(estimate);
    
    toast({
      title: "Смета создана!",
      description: "Переходим к просмотру детальной сметы"
    });
    
    goToNextStep();
  };

  const handleEstimateApprove = () => {
    setIsEstimateApproved(true);
  };

  const handleFormSubmit = async () => {
    try {
      const estimatedPrice = calculatePrice();
      await handleSubmit(estimatedPrice);
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const calculatePrice = (): number => {
    if (!selectedServiceType) return 3000;
    
    const basePrices: Record<string, number> = {
      "article": 4000,
      "selling-text": 6000,
      "social-posts": 2500,
      "website-texts": 3500,
      "other": 4500
    };
    
    const basePrice = basePrices[selectedServiceType.id] || 4000;
    
    // Adjust price based on details length (rough complexity estimation)
    const detailsLength = formData.details.length;
    let multiplier = 1;
    
    if (detailsLength > 500) multiplier = 1.3;
    else if (detailsLength > 200) multiplier = 1.1;
    
    return Math.round(basePrice * multiplier);
  };

  const getSmartQuestions = (serviceType: ServiceType) => {
    const questionSets: Record<string, { placeholder: string; hints: string[] }> = {
      "article": {
        placeholder: "Например: Статья про выбор детской коляски на 3000 знаков. Нужно раскрыть критерии выбора, популярные модели и где купить",
        hints: [
          "📝 Укажите тему и объем статьи",
          "🎯 Какая цель статьи? (привлечь клиентов, информировать, продать)",
          "🔍 Нужны ли ключевые слова для поиска в Яндексе/Google?"
        ]
      },
      "selling-text": {
        placeholder: "Например: Продающий текст для курса по изучению английского языка. Целевая аудитория - занятые взрослые 25-40 лет",
        hints: [
          "💡 Что продаете? (товар, услуга, курс)",
          "👥 Кто ваши клиенты? (возраст, интересы, проблемы)",
          "⭐ Какие у вас преимущества перед конкурентами?"
        ]
      },
      "social-posts": {
        placeholder: "Например: 10 постов для Instagram салона красоты. Темы: новые услуги, уход за кожей, акции",
        hints: [
          "📱 Для какой соцсети? (ВК, Телеграм, Инстаграм)",
          "📊 Сколько постов нужно?",
          "🎨 Какой стиль общения? (дружеский, экспертный, официальный)"
        ]
      },
      "website-texts": {
        placeholder: "Например: Тексты для сайта стоматологии. Нужны: главная страница, о клинике, услуги (лечение, имплантация, отбеливание)",
        hints: [
          "🌐 Какие разделы сайта нужно написать?",
          "🏢 Расскажите о своей компании и услугах",
          "📍 Где находитесь? (для местной SEO-оптимизации)"
        ]
      },
      "other": {
        placeholder: "Опишите подробно, что именно вам нужно. Например: презентация для инвесторов, сценарий видеоролика, email-рассылка",
        hints: [
          "📋 Какой формат текста нужен?",
          "🎯 Какая цель вашего проекта?",
          "⏰ Есть ли особые требования ко времени?"
        ]
      }
    };
    
    return questionSets[serviceType.id] || questionSets["other"];
  };

  if (!isFormOpen) {
    return (
      <section className="py-20 md:py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        
        <div className="container max-w-4xl mx-auto px-4 relative z-10 text-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Заказать текст
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                3 простых вопроса — точная цена за 2 минуты
              </p>
            </div>

            {/* Process steps */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 my-12">
              {[
                { step: 1, title: "Что нужно?", desc: "Выберите тип текста" },
                { step: 2, title: "Расскажите детали", desc: "Опишите задачу" },
                { step: 3, title: "Контакты", desc: "Ваши данные" },
                { step: 4, title: "Техзадание", desc: "Детали проекта" },
                { step: 5, title: "Смета", desc: "Одобрение и оплата" }
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary/80 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                    {item.step}
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              onClick={() => setIsFormOpen(true)}
              className="text-xl px-12 py-6 h-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Начать заказ
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-background to-primary/5"></div>
      
      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-4">
              {React.createElement(STEP_ICONS[currentStep as keyof typeof STEP_ICONS], { 
                className: "h-8 w-8 text-primary" 
              })}
              Шаг {currentStep} из 5
            </CardTitle>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-6">
              <div 
                className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              ></div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Step 1: Service Type Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-semibold">Что вам нужно?</h3>
                  <p className="text-muted-foreground">Выберите тип текста, который нужен</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SERVICE_TYPES.map((serviceType) => (
                    <Card 
                      key={serviceType.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
                        selectedServiceType?.id === serviceType.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                      onClick={() => handleServiceTypeSelect(serviceType)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="text-3xl">{serviceType.icon}</div>
                          <div className="flex-1 space-y-2">
                            <h4 className="font-semibold">{serviceType.title}</h4>
                            <p className="text-sm text-muted-foreground">{serviceType.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {serviceType.examples.slice(0, 2).map((example, idx) => (
                                <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  {example}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && selectedServiceType && (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-semibold">Расскажите подробнее</h3>
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <span className="text-2xl">{selectedServiceType.icon}</span>
                    <span className="font-medium">{selectedServiceType.title}</span>
                  </div>
                </div>

                {/* Smart hints */}
                <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                  <div className="text-sm font-medium text-blue-800 mb-2">💡 Подсказки для заполнения:</div>
                  {getSmartQuestions(selectedServiceType).hints.map((hint, idx) => (
                    <div key={idx} className="text-sm text-blue-700">{hint}</div>
                  ))}
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="details" className="text-base font-medium">
                      Опишите вашу задачу *
                    </Label>
                    <Textarea
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      placeholder={getSmartQuestions(selectedServiceType).placeholder}
                      className="min-h-32 mt-2"
                      required
                    />
                    <div className="mt-1 text-xs text-muted-foreground">
                      Чем подробнее опишете, тем точнее будет цена и результат
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="additionalRequirements" className="text-base font-medium">
                      Дополнительные пожелания
                    </Label>
                    <Textarea
                      id="additionalRequirements"
                      name="additionalRequirements"
                      value={formData.additionalRequirements}
                      onChange={handleInputChange}
                      placeholder="Особые требования к стилю, объему, срокам..."
                      className="min-h-24 mt-2"
                    />
                  </div>
                </div>

                {/* Live price preview */}
                {formData.details && (
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-sm text-green-600 mb-1">Предварительная стоимость:</div>
                    <div className="text-xl font-bold text-green-700">
                      {calculatePrice().toLocaleString()} ₽
                    </div>
                    <div className="text-xs text-green-600">
                      {formData.details.length > 200 ? "Детальное описание — более точная цена!" : "Добавьте больше деталей для точной оценки"}
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button variant="outline" onClick={goToPreviousStep} className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Назад
                  </Button>
                  <Button 
                    onClick={goToNextStep} 
                    disabled={!isCurrentStepValid()}
                    className="flex-1"
                  >
                    Далее
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Info */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-semibold">Контактная информация</h3>
                  <p className="text-muted-foreground">Как с вами связаться для уточнения деталей</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-base font-medium">
                      Ваше имя *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Как к вам обращаться?"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-base font-medium">
                      Телефон *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+7 (999) 123-45-67"
                      className="mt-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-base font-medium">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="На этот email отправим готовый текст"
                    className="mt-2"
                    required
                  />
                  <div className="mt-1 text-xs text-muted-foreground">
                    💌 На email придет подтверждение заказа и готовый текст
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={goToPreviousStep} className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Назад
                  </Button>
                  <Button 
                    onClick={goToNextStep}
                    disabled={!isCurrentStepValid()}
                    className="flex-1"
                  >
                    Далее
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Technical Task */}
            {currentStep === 4 && (
              <ModernTechnicalTaskStep
                formData={technicalTaskData}
                onUpdate={handleTechnicalTaskUpdate}
                onNext={handleCreateEstimate}
                onPrevious={goToPreviousStep}
              />
            )}

            {/* Step 5: Detailed Estimate */}
            {currentStep === 5 && estimateData && (
              <ModernDetailedEstimate
                {...estimateData}
                onEdit={() => setCurrentStep(4)}
                onApprove={handleEstimateApprove}
                onPayment={handleFormSubmit}
              />
            )}
          </CardContent>
        </Card>

        {/* Close button */}
        <div className="text-center mt-6">
          <Button 
            variant="ghost" 
            onClick={() => {
              setIsFormOpen(false);
              setSelectedServiceType(null);
              setTechnicalTaskData({});
              setEstimateData(null);
              setIsEstimateApproved(false);
              setCurrentStep(1);
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            Закрыть форму
          </Button>
        </div>
      </div>
    </section>
  );
}