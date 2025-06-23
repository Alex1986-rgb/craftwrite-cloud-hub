
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Zap, 
  MessageCircle, 
  Calculator, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Users,
  Timer,
  FileText,
  Target,
  Sparkles
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSupabaseOrders } from '@/hooks/useSupabaseOrders';

const services = [
  { 
    id: 'seo-article', 
    name: 'SEO-статья', 
    price: 'от 1500₽', 
    popular: true,
    fields: ['topic', 'keywords', 'character_count', 'target_audience']
  },
  { 
    id: 'landing', 
    name: 'Лендинг', 
    price: 'от 5000₽', 
    urgent: true,
    fields: ['product_name', 'target_audience', 'benefits', 'call_to_action']
  },
  { 
    id: 'email', 
    name: 'Email-рассылка', 
    price: 'от 2000₽',
    fields: ['email_type', 'subject', 'target_audience', 'goal']
  },
  { 
    id: 'social', 
    name: 'SMM-контент', 
    price: 'от 800₽',
    fields: ['platform', 'content_type', 'posts_count', 'topic']
  },
];

export default function QuickOrderSection() {
  const [selectedService, setSelectedService] = useState('seo-article');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    details: '',
    // SEO-статья
    topic: '',
    keywords: '',
    character_count: '5000',
    target_audience: '',
    // Лендинг
    product_name: '',
    benefits: '',
    call_to_action: '',
    // Email
    email_type: '',
    subject: '',
    goal: '',
    // SMM
    platform: '',
    content_type: '',
    posts_count: '1'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const isMobile = useIsMobile();
  const { createOrder, loading } = useSupabaseOrders();

  const selectedServiceData = services.find(s => s.id === selectedService);

  const handleQuickOrder = async () => {
    if (!formData.email || !formData.name) {
      return;
    }

    const serviceOptions: Record<string, any> = {};
    
    // Собираем данные в зависимости от типа услуги
    if (selectedService === 'seo-article') {
      serviceOptions.topic = formData.topic;
      serviceOptions.keywords = formData.keywords;
      serviceOptions.character_count = formData.character_count;
      serviceOptions.target_audience = formData.target_audience;
    } else if (selectedService === 'landing') {
      serviceOptions.product_name = formData.product_name;
      serviceOptions.benefits = formData.benefits;
      serviceOptions.call_to_action = formData.call_to_action;
      serviceOptions.target_audience = formData.target_audience;
    } else if (selectedService === 'email') {
      serviceOptions.email_type = formData.email_type;
      serviceOptions.subject = formData.subject;
      serviceOptions.goal = formData.goal;
      serviceOptions.target_audience = formData.target_audience;
    } else if (selectedService === 'social') {
      serviceOptions.platform = formData.platform;
      serviceOptions.content_type = formData.content_type;
      serviceOptions.posts_count = formData.posts_count;
      serviceOptions.topic = formData.topic;
      serviceOptions.target_audience = formData.target_audience;
    }

    const orderData = {
      service_slug: selectedService,
      service_name: selectedServiceData?.name || '',
      contact_name: formData.name,
      contact_email: formData.email,
      contact_phone: formData.phone,
      details: formData.details || `Быстрый заказ: ${selectedServiceData?.name}`,
      service_options: serviceOptions,
      estimated_price: getEstimatedPrice()
    };

    const result = await createOrder(orderData);
    
    if (result.success) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const getEstimatedPrice = () => {
    const basePrices: Record<string, number> = {
      'seo-article': 1500,
      'landing': 5000,
      'email': 2000,
      'social': 800
    };
    return basePrices[selectedService] || 1500;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderServiceFields = () => {
    if (!selectedServiceData) return null;

    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-slate-800 flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-600" />
          Детали услуги
        </h4>
        
        {selectedService === 'seo-article' && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Тема статьи *
              </label>
              <Input
                value={formData.topic}
                onChange={(e) => handleInputChange('topic', e.target.value)}
                placeholder="О чём написать статью?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Ключевые слова
              </label>
              <Input
                value={formData.keywords}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
                placeholder="Через запятую"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Объём
                </label>
                <Select value={formData.character_count} onValueChange={(value) => handleInputChange('character_count', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3000">3000 символов</SelectItem>
                    <SelectItem value="5000">5000 символов</SelectItem>
                    <SelectItem value="8000">8000 символов</SelectItem>
                    <SelectItem value="10000">10000+ символов</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Аудитория
                </label>
                <Input
                  value={formData.target_audience}
                  onChange={(e) => handleInputChange('target_audience', e.target.value)}
                  placeholder="Кто будет читать?"
                />
              </div>
            </div>
          </>
        )}

        {selectedService === 'landing' && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Продукт/Услуга *
              </label>
              <Input
                value={formData.product_name}
                onChange={(e) => handleInputChange('product_name', e.target.value)}
                placeholder="Что продаёте?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Целевая аудитория
              </label>
              <Input
                value={formData.target_audience}
                onChange={(e) => handleInputChange('target_audience', e.target.value)}
                placeholder="Кто ваши клиенты?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Ключевые преимущества
              </label>
              <Textarea
                value={formData.benefits}
                onChange={(e) => handleInputChange('benefits', e.target.value)}
                placeholder="Почему выбирают именно вас?"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Призыв к действию
              </label>
              <Input
                value={formData.call_to_action}
                onChange={(e) => handleInputChange('call_to_action', e.target.value)}
                placeholder="Что должен сделать посетитель?"
              />
            </div>
          </>
        )}

        {selectedService === 'email' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Тип рассылки
                </label>
                <Select value={formData.email_type} onValueChange={(value) => handleInputChange('email_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">Приветственная</SelectItem>
                    <SelectItem value="promotional">Рекламная</SelectItem>
                    <SelectItem value="newsletter">Новостная</SelectItem>
                    <SelectItem value="transactional">Транзакционная</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Тема письма
                </label>
                <Input
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Тема письма"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Цель рассылки
              </label>
              <Input
                value={formData.goal}
                onChange={(e) => handleInputChange('goal', e.target.value)}
                placeholder="Что хотите достичь?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Целевая аудитория
              </label>
              <Input
                value={formData.target_audience}
                onChange={(e) => handleInputChange('target_audience', e.target.value)}
                placeholder="Кто получатели?"
              />
            </div>
          </>
        )}

        {selectedService === 'social' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Платформа
                </label>
                <Select value={formData.platform} onValueChange={(value) => handleInputChange('platform', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Соцсеть" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="telegram">Telegram</SelectItem>
                    <SelectItem value="vk">ВКонтакте</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Тип контента
                </label>
                <Select value={formData.content_type} onValueChange={(value) => handleInputChange('content_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Что создать?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="post">Пост</SelectItem>
                    <SelectItem value="story">Сторис</SelectItem>
                    <SelectItem value="reel">Reels/Shorts</SelectItem>
                    <SelectItem value="carousel">Карусель</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Тематика
                </label>
                <Input
                  value={formData.topic}
                  onChange={(e) => handleInputChange('topic', e.target.value)}
                  placeholder="О чём контент?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Количество
                </label>
                <Select value={formData.posts_count} onValueChange={(value) => handleInputChange('posts_count', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 пост</SelectItem>
                    <SelectItem value="3">3 поста</SelectItem>
                    <SelectItem value="5">5 постов</SelectItem>
                    <SelectItem value="10">10 постов</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}
      </div>
    );
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
            Быстрый заказ с техзаданием
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Закажите контент прямо сейчас
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Заполните форму — получите готовое техзадание и промпт для качественного результата
          </p>
        </div>

        {/* Quick Order Card */}
        <Card className="max-w-4xl mx-auto p-6 md:p-8 shadow-xl bg-white/95 backdrop-blur-lg border-0">
          {!isSubmitted ? (
            <>
              {step === 1 && (
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

                  <Button 
                    onClick={() => setStep(2)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Далее
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="mb-6">
                    <Button 
                      variant="ghost" 
                      onClick={() => setStep(1)}
                      className="mb-4"
                    >
                      ← Назад
                    </Button>
                    
                    {renderServiceFields()}

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Дополнительные пожелания
                      </label>
                      <Textarea
                        value={formData.details}
                        onChange={(e) => handleInputChange('details', e.target.value)}
                        placeholder="Расскажите подробнее о ваших требованиях..."
                        rows={3}
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={() => setStep(3)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Далее
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="mb-6">
                    <Button 
                      variant="ghost" 
                      onClick={() => setStep(2)}
                      className="mb-4"
                    >
                      ← Назад
                    </Button>
                    
                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-blue-600" />
                      Ваши контакты
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Имя *
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Как к вам обращаться?"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Телефон
                        </label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+7 (999) 123-45-67"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="email@example.com"
                      />
                    </div>

                    {/* Summary */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50">
                      <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Ваш заказ
                      </h4>
                      <div className="text-sm text-slate-600 space-y-1">
                        <div><span className="font-medium">Услуга:</span> {selectedServiceData?.name}</div>
                        <div><span className="font-medium">Стоимость:</span> от {getEstimatedPrice()}₽</div>
                        <div><span className="font-medium">Срок:</span> 1-3 рабочих дня</div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleQuickOrder}
                    disabled={!formData.email || !formData.name || loading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Отправляем...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Создать техзадание
                      </>
                    )}
                  </Button>
                </>
              )}

              {/* Quick Action Buttons - показываем только на первом шаге */}
              {step === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
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
              )}

              {/* Trust Indicators */}
              {step === 1 && (
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-slate-200 mt-6">
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
                    <span>Техзадание в Telegram</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            // Success State
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Техзадание создано!</h3>
              <p className="text-slate-600 mb-4">
                Ваш заказ обработан и отправлен копирайтеру с детальным техническим заданием. 
                Мы свяжемся с вами в течение 15 минут.
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
                <div className="text-sm font-medium text-green-800">Сейчас создают техзадания: 3 копирайтера</div>
                <div className="text-xs text-green-600">Последний заказ: 2 минуты назад</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
