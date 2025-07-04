import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, CheckCircle, Zap } from "lucide-react";
import { useUnifiedOrderForm } from "@/hooks/useUnifiedOrderForm";
import { toast } from "@/hooks/use-toast";

const SERVICES = [
  { id: 'seo-article', title: 'SEO-статья', price: 'от 1 500₽', icon: '📝' },
  { id: 'landing', title: 'Продающий лендинг', price: 'от 3 000₽', icon: '🎯' },
  { id: 'marketplace', title: 'Карточки товаров', price: 'от 1 200₽', icon: '🛒' },
  { id: 'other', title: 'Другая задача', price: 'рассчитаем', icon: '💡' }
];

export default function CleanOrderSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
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
      toast({
        title: "Заказ отправлен!",
        description: "Мы свяжемся с вами в течение 30 минут"
      });
    }
  });

  const handleQuickSubmit = async () => {
    if (!formData.service || !formData.details || !formData.name || !formData.email) {
      toast({
        title: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }
    await handleSubmit(3000);
  };

  if (!isFormOpen) {
    return (
      <section id="order" className="py-20 bg-white">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          
          {/* Clean section header */}
          <div className="space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Заказать текст
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              3 простых шага — смета за 30 минут
            </p>
          </div>

          {/* Simplified process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { step: "1", title: "Выберите услугу", desc: "Что вам нужно?" },
              { step: "2", title: "Опишите задачу", desc: "Расскажите детали" },
              { step: "3", title: "Получите смету", desc: "За 30 минут" }
            ].map((item, index) => (
              <div key={item.step} className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-lg text-slate-900">{item.title}</h4>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Simple CTA */}
          <Button 
            size="lg" 
            onClick={() => setIsFormOpen(true)}
            className="px-12 py-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Zap className="w-5 h-5 mr-3" />
            Начать заказ
            <ArrowRight className="w-5 h-5 ml-3" />
          </Button>
          
          {/* Simple guarantees */}
          <div className="flex flex-wrap justify-center gap-8 mt-8 text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Без предоплаты</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Правки бесплатно</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Результат гарантирован</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="container max-w-2xl mx-auto px-4">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-slate-900">
              Шаг {currentStep} из 3
            </CardTitle>
            
            {/* Progress bar */}
            <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Что вам нужно?</h3>
                </div>
                
                <div className="space-y-3">
                  {SERVICES.map((service) => (
                    <Card
                      key={service.id}
                      className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                        formData.service === service.title
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      onClick={() => {
                        handleServiceSelect(service.title);
                        setCurrentStep(2);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{service.icon}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900">{service.title}</div>
                          <div className="text-sm text-blue-600 font-medium">{service.price}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Расскажите о задаче</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="details">Опишите задачу</Label>
                    <Textarea
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      placeholder="Опишите что вам нужно..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ваше имя"
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
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Summary */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Проверьте данные</h3>
                </div>
                
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <div className="font-semibold text-slate-900">Услуга:</div>
                      <div className="text-slate-600">{formData.service}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Задача:</div>
                      <div className="text-slate-600">{formData.details}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Контакт:</div>
                      <div className="text-slate-600">{formData.name} ({formData.email})</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-green-800 mb-2">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Что дальше?</span>
                    </div>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• Свяжемся в течение 30 минут</li>
                      <li>• Отправим подробную смету</li>
                      <li>• Начнем работу после одобрения</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={currentStep === 1 ? () => setIsFormOpen(false) : () => setCurrentStep(prev => prev - 1)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {currentStep === 1 ? 'Закрыть' : 'Назад'}
              </Button>
              
              {currentStep < 3 ? (
                <Button 
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  disabled={currentStep === 1 && !formData.service}
                >
                  Далее
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleQuickSubmit} 
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {loading ? 'Отправляем...' : 'Отправить заказ'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}