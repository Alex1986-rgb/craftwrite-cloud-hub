
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ComprehensiveSeo from '@/components/seo/ComprehensiveSeo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  ArrowRight,
  Zap,
  Users,
  TrendingUp,
  Target,
  Bot
} from 'lucide-react';
import ChatbotOrderForm from '@/components/order/chatbot/ChatbotOrderForm';
import ChatbotBenefits from '@/components/order/chatbot/ChatbotBenefits';
import ChatbotExamples from '@/components/order/chatbot/ChatbotExamples';

// Import refactored sections
import ChatbotHeroSection from './chatbot-sections/ChatbotHeroSection';
import ChatbotFeaturesSection from './chatbot-sections/ChatbotFeaturesSection';
import ChatbotPlatformsSection from './chatbot-sections/ChatbotPlatformsSection';

const SCRIPT_TYPES = [
  {
    title: 'Продающие скрипты',
    price: 'от 3 000₽',
    features: ['Воронка продаж', 'Обработка возражений', 'Закрытие сделки'],
    popular: true
  },
  {
    title: 'Поддержка клиентов',
    price: 'от 2 500₽',
    features: ['FAQ-сценарии', 'Техподдержка', 'Эскалация проблем']
  },
  {
    title: 'Лидогенерация',
    price: 'от 3 500₽',
    features: ['Квалификация лидов', 'Сбор контактов', 'Сегментация']
  },
  {
    title: 'Развлекательные боты',
    price: 'от 4 000₽',
    features: ['Игровые сценарии', 'Контент-боты', 'Интерактив']
  }
];

export default function ChatbotScriptsOrder() {
  const [selectedType, setSelectedType] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setShowForm(true);
  };

  const handleOrderComplete = () => {
    setShowForm(false);
    navigate('/order/tracking');
  };

  return (
    <>
      <ComprehensiveSeo
        title="Заказать скрипты для чат-ботов | CopyPro Cloud - Профессиональная разработка диалогов"
        description="Закажите профессиональные скрипты для чат-ботов в Telegram, WhatsApp, VK. Продающие сценарии, техподдержка, лидогенерация. Конверсия до 40%. От 2500₽"
        keywords="скрипты чат-ботов, диалоги телеграм бот, whatsapp бизнес скрипты, сценарии для ботов, разработка чат-ботов, продающие боты"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Скрипты для чат-ботов",
            "description": "Профессиональная разработка скриптов и сценариев для чат-ботов",
            "provider": {
              "@type": "Organization",
              "name": "CopyPro Cloud"
            },
            "offers": {
              "@type": "Offer",
              "price": "2500",
              "priceCurrency": "RUB",
              "priceRange": "2500-10000"
            }
          }
        ]}
      />
      
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        <ChatbotHeroSection onShowForm={() => setShowForm(true)} />
        <ChatbotFeaturesSection />
        <ChatbotPlatformsSection />

        {/* Enhanced Pricing Section */}
        <section className="py-16 bg-white/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Современные решения для любых задач
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Выберите тип чат-бота и платформы. Мы создадим умного помощника с учетом специфики вашего бизнеса
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {SCRIPT_TYPES.map((type, index) => (
                <Card 
                  key={index} 
                  className={`relative hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                    type.popular 
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 transform hover:scale-105' 
                      : 'border-transparent bg-white hover:border-blue-200'
                  }`}
                  onClick={() => handleTypeSelect(type.title)}
                >
                  {type.popular && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600">
                      🔥 Популярный
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-lg mb-2">{type.title}</CardTitle>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{type.price}</div>
                    <div className="text-sm text-gray-500">за базовую версию</div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {type.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-xs font-medium text-gray-600">Дополнительно:</div>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">AI-интеграция</Badge>
                        <Badge variant="outline" className="text-xs">Аналитика</Badge>
                        <Badge variant="outline" className="text-xs">Мультиплатформенность</Badge>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full"
                      variant={type.popular ? "default" : "outline"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTypeSelect(type.title);
                      }}
                    >
                      Создать бота
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* New features showcase */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">AI-готовность</h3>
                <p className="text-sm text-gray-600">Интеграция с ChatGPT, Claude и другими AI-ассистентами для умных ответов</p>
              </Card>
              
              <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Омниканальность</h3>
                <p className="text-sm text-gray-600">Один бот работает на всех платформах с адаптацией под каждую</p>
              </Card>
              
              <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Аналитика</h3>
                <p className="text-sm text-gray-600">Детальная статистика диалогов и конверсий для оптимизации</p>
              </Card>
            </div>
          </div>
        </section>

        <ChatbotBenefits />
        <ChatbotExamples />
        
        {/* Order Form Modal/Section */}
        {showForm && (
          <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="container mx-auto px-4">
              <ChatbotOrderForm 
                selectedType={selectedType}
                onClose={() => setShowForm(false)}
              />
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Готовы автоматизировать общение с клиентами?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Закажите профессиональные скрипты для чат-ботов и увеличьте конверсию уже через неделю
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setShowForm(true)}
            >
              Начать проект
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
