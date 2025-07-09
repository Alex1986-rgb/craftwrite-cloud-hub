import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, CheckCircle, Zap, Clock, Users, Star, Sparkles, Calculator, MessageSquare } from "lucide-react";
import { useUnifiedOrderForm } from "@/hooks/useUnifiedOrderForm";
import { toast } from "@/hooks/use-toast";

const SMART_SERVICES = [
  { 
    id: 'seo-article', 
    title: 'SEO-статья', 
    price: 'от 1 500₽', 
    icon: '📝',
    description: 'Оптимизированная статья для поисковых систем',
    time: '24-48 часов',
    includes: ['Анализ конкурентов', 'Структура H1-H6', 'Meta-описания']
  },
  { 
    id: 'landing', 
    title: 'Продающий лендинг', 
    price: 'от 3 000₽', 
    icon: '🎯',
    description: 'Конвертирующая страница для продаж',
    time: '48-72 часа',
    includes: ['Структура продаж', 'Эмоциональные триггеры', 'CTA-блоки']
  },
  { 
    id: 'marketplace', 
    title: 'Карточки товаров', 
    price: 'от 500₽', 
    icon: '🛒',
    description: 'Описания для маркетплейсов',
    time: '12-24 часа',
    includes: ['SEO-оптимизация', 'Ключевые слова', 'Характеристики']
  },
  { 
    id: 'other', 
    title: 'Другая задача', 
    price: 'рассчитаем', 
    icon: '💡',
    description: 'Индивидуальное решение под ваши цели',
    time: 'договоримся',
    includes: ['Персональный подход', 'Гибкие условия', 'Консультация']
  }
];

export default function SmartOrderSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [priceEstimate, setPriceEstimate] = useState(null);
  const [onlineExperts, setOnlineExperts] = useState(12);
  
  const {
    formData,
    loading,
    handleInputChange,
    handleServiceSelect,
    handleSubmit
  } = useUnifiedOrderForm({
    onSuccess: () => {
      setIsFormOpen(false);
      setCurrentStep(1);
      setSelectedService(null);
      toast({
        title: "Заказ отправлен!",
        description: "Мы свяжемся с вами в течение 30 минут"
      });
    }
  });

  // Simulate online experts count
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineExperts(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newValue = prev + change;
        return Math.max(8, Math.min(15, newValue));
      });
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Smart price calculation
  useEffect(() => {
    if (selectedService && formData.details) {
      const wordCount = formData.details.split(' ').length;
      const basePrice = selectedService.id === 'seo-article' ? 1500 : 
                       selectedService.id === 'landing' ? 3000 :
                       selectedService.id === 'marketplace' ? 500 : 2000;
      
      const estimate = Math.round(basePrice * (1 + wordCount * 0.1));
      setPriceEstimate(estimate);
    }
  }, [selectedService, formData.details]);

  const handleQuickSubmit = async () => {
    if (!formData.service || !formData.details || !formData.name || !formData.email) {
      toast({
        title: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }
    await handleSubmit(priceEstimate || 3000);
  };

  if (!isFormOpen) {
    return (
      <section id="order" className="py-24 bg-gradient-to-b from-white via-slate-50/30 to-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          
          {/* Enhanced section header */}
          <div className="text-center space-y-8 mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-800 px-6 py-3 rounded-full text-sm font-bold border border-blue-200/50 shadow-lg">
              <Sparkles className="w-4 h-4" />
              Умное оформление заказа
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
              Заказать <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">профессиональный</span> текст
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Автоматический расчет стоимости, быстрая обработка заявки и персональный менеджер
            </p>

            {/* Live indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200/50 shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <Users className="w-4 h-4 text-green-600" />
                <span className="font-medium text-slate-700">{onlineExperts} экспертов онлайн</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200/50 shadow-sm">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-slate-700">Ответ за 30 минут</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200/50 shadow-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-medium text-slate-700">Рейтинг 4.9/5</span>
              </div>
            </div>
          </div>

          {/* Smart service grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {SMART_SERVICES.map((service, index) => (
              <Card key={service.id} className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-slate-200/50 bg-white/80 backdrop-blur-sm hover:scale-105 hover:-translate-y-2 overflow-hidden">
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  <div className="text-2xl font-bold text-blue-600">{service.price}</div>
                  <div className="text-sm text-slate-500 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3" />
                    {service.time}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600 text-center leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-700 text-center">Включено:</div>
                    {service.includes.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300"
                    onClick={() => {
                      setSelectedService(service);
                      handleServiceSelect(service.title);
                      setIsFormOpen(true);
                    }}
                  >
                    Выбрать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick start CTA */}
          <div className="text-center">
            <Button 
              size="lg" 
              onClick={() => setIsFormOpen(true)}
              className="px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold rounded-2xl text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Zap className="w-6 h-6 mr-3 relative z-10" />
              <span className="relative z-10">Быстрый заказ</span>
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
            </Button>
            
            {/* Enhanced guarantees */}
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              {[
                { icon: CheckCircle, text: "Без предоплаты", color: "text-green-600" },
                { icon: MessageSquare, text: "Правки бесплатно", color: "text-blue-600" },
                { icon: Calculator, text: "Точная смета", color: "text-purple-600" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-600">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container max-w-3xl mx-auto px-4">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              {selectedService && (
                <span className="text-2xl">{selectedService.icon}</span>
              )}
              <CardTitle className="text-2xl font-bold text-slate-900">
                {selectedService ? selectedService.title : `Шаг ${currentStep} из 3`}
              </CardTitle>
            </div>
            
            {/* Enhanced progress bar */}
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500 shadow-sm" 
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>

            {/* Live price estimate */}
            {priceEstimate && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200/50">
                <div className="text-sm text-slate-600 mb-1">Предварительная стоимость:</div>
                <div className="text-2xl font-bold text-blue-600">{priceEstimate.toLocaleString()}₽</div>
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Выберите тип контента</h3>
                  <p className="text-slate-600">Что именно вам нужно создать?</p>
                </div>
                
                <div className="space-y-3">
                  {SMART_SERVICES.map((service) => (
                    <Card
                      key={service.id}
                      className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedService?.id === service.id
                          ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      onClick={() => {
                        setSelectedService(service);
                        handleServiceSelect(service.title);
                        setCurrentStep(2);
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{service.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-bold text-slate-900">{service.title}</div>
                            <div className="text-blue-600 font-bold">{service.price}</div>
                          </div>
                          <div className="text-sm text-slate-600 mb-2">{service.description}</div>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Clock className="w-3 h-3" />
                            {service.time}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Enhanced Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Детали проекта</h3>
                  <p className="text-slate-600">Чем подробнее опишете, тем точнее будет смета</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="details" className="text-base font-semibold">Описание задачи</Label>
                    <Textarea
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      placeholder="Опишите подробно что нужно создать: тематика, цели, целевая аудитория, особые требования..."
                      rows={5}
                      className="resize-none mt-2 text-base"
                    />
                    <div className="text-xs text-slate-500 mt-1">
                      Символов: {formData.details.length} • Слов: {formData.details.split(' ').filter(Boolean).length}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-base font-semibold">Ваше имя</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Как к вам обращаться?"
                        className="mt-2 text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-base font-semibold">Email для связи</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="mt-2 text-base"
                      />
                    </div>
                  </div>

                  {selectedService && (
                    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200/50">
                      <CardContent className="p-4">
                        <div className="text-sm font-semibold text-blue-800 mb-2">Что входит в {selectedService.title}:</div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {selectedService.includes.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-blue-700">
                              <CheckCircle className="w-3 h-3 text-blue-600" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Enhanced Summary */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Подтвердите заказ</h3>
                  <p className="text-slate-600">Проверьте данные перед отправкой</p>
                </div>
                
                <Card className="bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200">
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="font-semibold text-slate-900 mb-1">Услуга:</div>
                        <div className="text-slate-700">{formData.service}</div>
                        {priceEstimate && (
                          <div className="text-lg font-bold text-blue-600 mt-1">
                            ≈ {priceEstimate.toLocaleString()}₽
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 mb-1">Контакт:</div>
                        <div className="text-slate-700">{formData.name}</div>
                        <div className="text-slate-600 text-sm">{formData.email}</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 mb-1">Задача:</div>
                      <div className="text-slate-700 text-sm leading-relaxed">{formData.details}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-green-800 mb-2">Что происходит дальше:</div>
                        <ul className="space-y-2 text-sm text-green-700">
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                            <span>Персональный менеджер свяжется в течение 30 минут</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                            <span>Получите детальную смету с точной стоимостью</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                            <span>Эксперт начнет работу сразу после подтверждения</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Enhanced Navigation */}
            <div className="flex justify-between pt-6 border-t border-slate-200">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  if (currentStep === 1) {
                    setIsFormOpen(false);
                    setSelectedService(null);
                  } else {
                    setCurrentStep(prev => prev - 1);
                  }
                }}
                className="px-8 py-3"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {currentStep === 1 ? 'Закрыть' : 'Назад'}
              </Button>
              
              {currentStep < 3 ? (
                <Button 
                  size="lg"
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  disabled={currentStep === 1 && !selectedService}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Далее
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  size="lg"
                  onClick={handleQuickSubmit} 
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-bold"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Отправляем...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Отправить заказ
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}