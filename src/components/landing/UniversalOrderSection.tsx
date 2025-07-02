import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, CheckCircle, FileText, Target, User } from "lucide-react";
import { useUnifiedOrderForm } from "@/hooks/useUnifiedOrderForm";
import { toast } from "@/hooks/use-toast";

interface ServiceType {
  id: string;
  title: string;
  description: string;
  examples: string[];
  icon: string;
}

const SERVICE_TYPES: ServiceType[] = [
  {
    id: "seo-article",
    title: "Статья для сайта или блога",
    description: "SEO-оптимизированная статья для привлечения клиентов",
    examples: ["Статья в блог", "Экспертная статья", "Обзор товаров"],
    icon: "📝"
  },
  {
    id: "landing-page",
    title: "Продающая страница",
    description: "Убеждающий текст для продажи товара или услуги",
    examples: ["Лендинг", "Продающее письмо", "Коммерческое предложение"],
    icon: "💰"
  },
  {
    id: "website-content",
    title: "Контент для сайта",
    description: "Тексты для разделов сайта и карточек товаров",
    examples: ["О компании", "Описания услуг", "Карточки товаров"],
    icon: "🌐"
  },
  {
    id: "social-content",
    title: "Контент для соцсетей",
    description: "Посты, рекламные материалы и контент-планы",
    examples: ["Посты ВКонтакте", "Telegram-контент", "Instagram-посты"],
    icon: "📱"
  },
  {
    id: "email-marketing",
    title: "Email-рассылки",
    description: "Письма для автоворонок и рассылок",
    examples: ["Приветственная серия", "Продающие письма", "Реактивации"],
    icon: "📧"
  },
  {
    id: "other",
    title: "Другое",
    description: "Нестандартная задача или комплексный проект",
    examples: ["Презентации", "Сценарии", "Комплексный проект"],
    icon: "🎯"
  }
];

const STEP_ICONS = {
  1: Target,
  2: FileText,
  3: User
};

export default function UniversalOrderSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType | null>(null);
  
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
      "seo-article": 5000,
      "landing-page": 8000,
      "website-content": 4000,
      "social-content": 3000,
      "email-marketing": 6000,
      "other": 5000
    };
    
    return basePrices[selectedServiceType.id] || 5000;
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 my-12">
              {[
                { step: 1, title: "Что нужно?", desc: "Выберите тип текста" },
                { step: 2, title: "Расскажите детали", desc: "Опишите задачу" },
                { step: 3, title: "Получите цену", desc: "Контакты и стоимость" }
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
              Шаг {currentStep} из 3
            </CardTitle>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-6">
              <div 
                className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 3) * 100}%` }}
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
                      placeholder={`Например: ${selectedServiceType.examples[0]} для ${selectedServiceType.description.toLowerCase()}`}
                      className="min-h-32 mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="additionalRequirements" className="text-base font-medium">
                      Дополнительные требования
                    </Label>
                    <Textarea
                      id="additionalRequirements"
                      name="additionalRequirements"
                      value={formData.additionalRequirements}
                      onChange={handleInputChange}
                      placeholder="Объем, стиль, ключевые слова, особые требования..."
                      className="min-h-24 mt-2"
                    />
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

            {/* Step 3: Contact Info */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-semibold">Ваши контакты</h3>
                  <div className="bg-primary/10 rounded-lg p-4">
                    <div className="text-lg font-semibold text-primary">
                      Стоимость: {calculatePrice().toLocaleString()} ₽
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Срок: 2-5 дней
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-base font-medium">
                      Имя *
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
                    placeholder="для отправки готового текста"
                    className="mt-2"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={goToPreviousStep} className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Назад
                  </Button>
                  <Button 
                    onClick={handleFormSubmit}
                    disabled={!isCurrentStepValid() || loading}
                    className="flex-1"
                  >
                    {loading ? (
                      "Отправляем..."
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Заказать текст
                      </>
                    )}
                  </Button>
                </div>
              </div>
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