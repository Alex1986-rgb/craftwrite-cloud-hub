
import React, { useState, useMemo } from 'react';
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
  Timer,
  TrendingUp,
  Shield,
  Phone
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { QUICK_ORDER_SERVICES, QuickOrderService } from '@/data/quickOrderServices';
import SmartFilters from './quick-order/SmartFilters';
import EnhancedServiceCard from './quick-order/EnhancedServiceCard';

export default function QuickOrderSection() {
  const [selectedService, setSelectedService] = useState<QuickOrderService | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedUrgency, setSelectedUrgency] = useState('any');
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const isMobile = useIsMobile();

  // Filter services based on selected filters
  const filteredServices = useMemo(() => {
    let filtered = QUICK_ORDER_SERVICES;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Filter by price range
    if (selectedPriceRange !== 'all') {
      const priceRanges = {
        budget: [0, 2000],
        medium: [2000, 5000],
        premium: [5000, Infinity]
      };
      const range = priceRanges[selectedPriceRange as keyof typeof priceRanges];
      if (range) {
        filtered = filtered.filter(service => 
          service.basePrice >= range[0] && service.basePrice < range[1]
        );
      }
    }

    return filtered;
  }, [selectedCategory, selectedPriceRange, selectedUrgency]);

  const handleQuickOrder = () => {
    if ((email || phone) && selectedService) {
      setIsSubmitted(true);
      // Here would be the actual order logic
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const validateContact = (value: string, type: 'email' | 'phone') => {
    if (type === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else {
      return /^[\+]?[\d\s\-\(\)]{10,}$/.test(value);
    }
  };

  const isValidContact = contactMethod === 'email' 
    ? validateContact(email, 'email') 
    : validateContact(phone, 'phone');

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
            <Zap className="w-4 h-4 mr-2" />
            Быстрый заказ за 30 секунд
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Закажите премиальный контент прямо сейчас
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Выберите услугу с помощью умных фильтров, оставьте контакт — наш эксперт свяжется в течение 15 минут с персональным предложением
          </p>
        </div>

        {/* Smart Filters */}
        <SmartFilters
          selectedCategory={selectedCategory}
          selectedPriceRange={selectedPriceRange}
          selectedUrgency={selectedUrgency}
          onCategoryChange={setSelectedCategory}
          onPriceRangeChange={setSelectedPriceRange}
          onUrgencyChange={setSelectedUrgency}
        />

        {/* Services Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800 text-lg flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              Доступные услуги ({filteredServices.length})
            </h3>
            {selectedService && (
              <Badge variant="outline" className="text-green-600 border-green-300">
                <CheckCircle className="w-4 h-4 mr-1" />
                Выбрано: {selectedService.name}
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredServices.map((service) => (
              <EnhancedServiceCard
                key={service.id}
                service={service}
                isSelected={selectedService?.id === service.id}
                onClick={() => setSelectedService(service)}
              />
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Нет услуг, соответствующих выбранным фильтрам</p>
              <p className="text-sm">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </div>

        {/* Quick Order Card */}
        <Card className="max-w-4xl mx-auto p-6 md:p-8 shadow-xl bg-white/95 backdrop-blur-lg border-0">
          {!isSubmitted ? (
            <>
              {/* Contact Form */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  Ваши контактные данные
                </h3>
                
                {/* Contact method toggle */}
                <div className="flex gap-2 mb-4">
                  <Button
                    variant={contactMethod === 'email' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setContactMethod('email')}
                    className="text-sm"
                  >
                    📧 Email
                  </Button>
                  <Button
                    variant={contactMethod === 'phone' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setContactMethod('phone')}
                    className="text-sm"
                  >
                    📱 Телефон
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {contactMethod === 'email' ? (
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`flex-1 px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                        email && !validateContact(email, 'email')
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                          : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'
                      }`}
                    />
                  ) : (
                    <input
                      type="tel"
                      placeholder="+7 (999) 123-45-67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`flex-1 px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                        phone && !validateContact(phone, 'phone')
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                          : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'
                      }`}
                    />
                  )}
                  
                  <Button 
                    onClick={handleQuickOrder}
                    disabled={!selectedService || !isValidContact}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Заказать сейчас
                  </Button>
                </div>

                {/* Validation hints */}
                {((email && !validateContact(email, 'email')) || (phone && !validateContact(phone, 'phone'))) && (
                  <p className="text-red-500 text-sm mt-2">
                    {contactMethod === 'email' 
                      ? 'Введите корректный email адрес' 
                      : 'Введите корректный номер телефона'
                    }
                  </p>
                )}
              </div>

              {/* Order Summary */}
              {selectedService && (
                <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Ваш заказ:</h4>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-blue-800">{selectedService.name}</div>
                      <div className="text-sm text-blue-600">{selectedService.description}</div>
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      {selectedService.priceRange}
                    </div>
                  </div>
                </div>
              )}

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
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span>Гарантия качества</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <TrendingUp className="w-4 h-4 text-orange-600" />
                  <span>ROI до 300%</span>
                </div>
              </div>
            </>
          ) : (
            // Success State
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Заявка успешно отправлена!</h3>
              <p className="text-slate-600 mb-4">
                Наш эксперт свяжется с вами в течение 15 минут для обсуждения деталей проекта "{selectedService?.name}"
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
                <div className="text-sm font-medium text-green-800">Сейчас заказывают: 8 человек</div>
                <div className="text-xs text-green-600">Последний заказ: 3 минуты назад • {selectedService?.name || 'SEO-статья'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
