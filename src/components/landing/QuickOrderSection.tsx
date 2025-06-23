
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  MessageCircle, 
  Calculator, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Users,
  Timer
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const services = [
  { id: 'seo', name: 'SEO-статья', price: 'от 1500₽', popular: true },
  { id: 'landing', name: 'Лендинг', price: 'от 5000₽', urgent: true },
  { id: 'email', name: 'Email-рассылка', price: 'от 2000₽' },
  { id: 'social', name: 'SMM-контент', price: 'от 800₽' },
];

export default function QuickOrderSection() {
  const [selectedService, setSelectedService] = useState('seo');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isMobile = useIsMobile();

  const handleQuickOrder = () => {
    if (email) {
      setIsSubmitted(true);
      // Here would be the actual order logic
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container max-w-5xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
            <Zap className="w-4 h-4 mr-2" />
            Быстрый заказ за 30 секунд
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Закажите контент прямо сейчас
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Выберите услугу, оставьте контакт — мы свяжемся в течение 15 минут
          </p>
        </div>

        {/* Quick Order Card */}
        <Card className="max-w-3xl mx-auto p-6 md:p-8 shadow-xl bg-white/95 backdrop-blur-lg border-0">
          {!isSubmitted ? (
            <>
              {/* Service Selection */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  Выберите услугу
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedService === service.id
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      {service.popular && (
                        <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">
                          Популярно
                        </Badge>
                      )}
                      {service.urgent && (
                        <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                          Срочно
                        </Badge>
                      )}
                      <div className="font-medium text-slate-800">{service.name}</div>
                      <div className="text-sm text-blue-600 font-semibold mt-1">{service.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  Ваш контакт для связи
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="email@example.com или +7 (999) 123-45-67"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                  <Button 
                    onClick={handleQuickOrder}
                    disabled={!email}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Заказать сейчас
                  </Button>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Button 
                  variant="outline" 
                  className="p-4 h-auto flex-col gap-2 hover:bg-green-50 hover:border-green-300 transition-all duration-300"
                  asChild
                >
                  <a href="https://wa.me/79999999999" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                    <span className="font-medium">WhatsApp чат</span>
                    <span className="text-xs text-slate-500">Ответим за 5 минут</span>
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  className="p-4 h-auto flex-col gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                  asChild
                >
                  <a href="https://t.me/copypro_cloud" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                    <span className="font-medium">Telegram бот</span>
                    <span className="text-xs text-slate-500">24/7 консультации</span>
                  </a>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span>Ответ за 15 минут</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>50+ экспертов</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  <span>Гарантия качества</span>
                </div>
              </div>
            </>
          ) : (
            // Success State
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Заявка отправлена!</h3>
              <p className="text-slate-600 mb-4">
                Наш менеджер свяжется с вами в течение 15 минут для уточнения деталей заказа
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-orange-600 bg-orange-50 px-4 py-2 rounded-lg">
                <Timer className="w-4 h-4" />
                <span>Среднее время ответа: 7 минут</span>
              </div>
            </div>
          )}
        </Card>

        {/* Live Activity Indicator */}
        <div className="max-w-md mx-auto mt-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-green-800">Сейчас заказывают: 5 человек</div>
                <div className="text-xs text-green-600">Последний заказ: 2 минуты назад</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
