import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, CheckCircle, MessageSquare, User, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import FloatingParticles from "@/components/ui/floating-particles";
import { useUnifiedOrderForm } from "@/hooks/useUnifiedOrderForm";
import { toast } from "@/hooks/use-toast";

const QUICK_SERVICES = [
  { id: 'seo-article', title: 'SEO-статья', price: 'от 1 500₽', emoji: '📝' },
  { id: 'landing', title: 'Продающий лендинг', price: 'от 3 000₽', emoji: '🎯' },
  { id: 'marketplace', title: 'Карточки товаров', price: 'от 1 200₽', emoji: '🛒' },
  { id: 'other', title: 'Другая задача', price: 'рассчитаем', emoji: '💡' }
];

interface SimplifiedOrderSectionProps {
  selectedService?: string;
}

export default function SimplifiedOrderSection({ selectedService }: SimplifiedOrderSectionProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const {
    formData,
    loading,
    handleInputChange,
    handleServiceSelect,
    handleSubmit
  } = useUnifiedOrderForm({
    serviceTitle: selectedService,
    onSuccess: () => {
      setIsFormOpen(false);
      setCurrentStep(1);
      toast({
        title: "Заказ отправлен!",
        description: "Мы свяжемся с вами в течение 30 минут и отправим подробную смету"
      });
    }
  });

  const handleQuickSubmit = async () => {
    if (!formData.service || !formData.details || !formData.name || !formData.email) {
      toast({
        title: "Заполните все поля",
        description: "Нам нужна эта информация для качественной работы",
        variant: "destructive"
      });
      return;
    }

    try {
      await handleSubmit(3000);
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && !formData.service) {
      toast({
        title: "Выберите услугу",
        description: "Это поможет нам лучше понять вашу задачу",
        variant: "destructive"
      });
      return;
    }
    if (currentStep === 2 && !formData.details.trim()) {
      toast({
        title: "Опишите задачу",
        description: "Чем подробнее, тем точнее будет смета",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  if (!isFormOpen) {
    return (
      <section className="py-20 md:py-32 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
          {/* Animated Background Blobs */}
          <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/6 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          {/* Floating Particles */}
          <FloatingParticles count={20} />
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.03)_1px,transparent_0)] [background-size:50px_50px]"></div>
        </div>
        
        <div className="container max-w-4xl mx-auto px-4 relative z-10 text-center">
          <div className="space-y-12 animate-fade-in">
            {/* Hero section */}
            <div className="space-y-8">
              <div className="space-y-4">
                <GlassCard variant="frosted" className="inline-flex items-center gap-3 px-6 py-3">
                  <Zap className="w-4 h-4" />
                  <span>Быстрый заказ</span>
                </GlassCard>
                
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent leading-tight">
                  Заказать текст
                </h2>
                <div className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground/90 max-w-4xl mx-auto leading-relaxed">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold">3 простых шага</span>
                  {" — "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">смета за 30 минут</span>
                </div>
              </div>

              {/* Process steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  { step: 1, title: "Что нужно?", desc: "Выберите тип задачи", color: "from-blue-500 to-cyan-500" },
                  { step: 2, title: "Опишите детали", desc: "Расскажите о проекте", color: "from-green-500 to-emerald-500" },
                  { step: 3, title: "Получите смету", desc: "И начнем работу", color: "from-purple-500 to-violet-500" }
                ].map((item, index) => (
                  <GlassCard key={item.step} variant="elevated" className="flex flex-col items-center space-y-4 group p-8 hover:scale-105">
                    <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-r ${item.color} text-white flex items-center justify-center text-xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      {item.step}
                      {index < 2 && (
                        <div className="hidden md:block absolute -right-8 top-1/2 transform -translate-y-1/2">
                          <ArrowRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-lg text-foreground">{item.title}</h4>
                      <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-6">
              <Button 
                size="lg" 
                onClick={() => setIsFormOpen(true)}
                className="group text-xl px-16 py-8 h-auto bg-gradient-to-r from-primary via-primary/90 to-accent hover:from-primary/90 hover:via-primary/80 hover:to-accent/90 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 rounded-2xl border-0 font-bold relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  Начать заказ
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Button>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Без предоплаты</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Правки бесплатно</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Результат гарантирован</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <FloatingParticles count={15} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.03)_1px,transparent_0)] [background-size:50px_50px]"></div>
      </div>
      
      <div className="container max-w-3xl mx-auto px-4 relative z-10">
        <GlassCard variant="elevated" className="shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-4">
              {currentStep === 1 && <MessageSquare className="h-8 w-8 text-primary" />}
              {currentStep === 2 && <User className="h-8 w-8 text-primary" />}
              {currentStep === 3 && <CheckCircle className="h-8 w-8 text-primary" />}
              Шаг {currentStep} из 3
            </CardTitle>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500" 
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Что вам нужно?</h3>
                  <p className="text-muted-foreground">Выберите тип задачи или опишите свою</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {QUICK_SERVICES.map((service) => (
                    <GlassCard
                      key={service.id}
                      variant={formData.service === service.title ? "elevated" : "default"}
                      className={`p-4 cursor-pointer transition-all duration-300 text-left hover:scale-105 ${
                        formData.service === service.title
                          ? 'border-2 border-blue-400/50 bg-blue-50/50'
                          : 'hover:border-white/50'
                      }`}
                      onClick={() => {
                        handleServiceSelect(service.title);
                        nextStep();
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{service.emoji}</span>
                        <div>
                          <div className="font-semibold">{service.title}</div>
                          <div className="text-sm text-primary font-medium">{service.price}</div>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Task Description + Contact */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Расскажите о задаче</h3>
                  <p className="text-muted-foreground">Чем подробнее опишете, тем точнее будет смета</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="details">Опишите вашу задачу</Label>
                    <Textarea
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      placeholder="Например: Нужна SEO-статья про выбор детской коляски на 3000 знаков. Целевая аудитория - молодые родители. Основные ключи: 'детская коляска', 'как выбрать коляску', 'лучшие коляски 2024'..."
                      rows={5}
                      className="resize-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Ваше имя</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Как к вам обращаться?"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Для отправки готового текста"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Телефон (необязательно)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Для срочных вопросов"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Summary */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Готово!</h3>
                  <p className="text-muted-foreground">Проверьте данные и отправьте заказ</p>
                </div>
                
                <GlassCard variant="subtle" className="p-6 space-y-4">
                  <div>
                    <div className="font-semibold">Услуга:</div>
                    <div className="text-muted-foreground">{formData.service}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Задача:</div>
                    <div className="text-muted-foreground">{formData.details}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Контакт:</div>
                    <div className="text-muted-foreground">{formData.name} ({formData.email})</div>
                  </div>
                </GlassCard>

                <GlassCard variant="elevated" className="bg-green-50/80 border border-green-200/50 p-4">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Что дальше?</span>
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-green-700">
                    <li>• Мы свяжемся в течение 30 минут</li>
                    <li>• Отправим подробную смету</li>
                    <li>• Начнем работу сразу после одобрения</li>
                    <li>• Оплата только после получения результата</li>
                  </ul>
                </GlassCard>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={currentStep === 1 ? () => setIsFormOpen(false) : prevStep}
                className="px-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {currentStep === 1 ? 'Закрыть' : 'Назад'}
              </Button>
              
              {currentStep < 3 ? (
                <Button onClick={nextStep} className="px-6">
                  Далее
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleQuickSubmit} 
                  disabled={loading}
                  className="px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  {loading ? 'Отправляем...' : 'Отправить заказ'}
                  <Zap className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </section>
  );
}