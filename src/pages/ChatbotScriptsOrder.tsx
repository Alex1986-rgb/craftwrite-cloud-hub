import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ComprehensiveSeo from '@/components/seo/ComprehensiveSeo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Bot, 
  Zap, 
  Target, 
  CheckCircle, 
  ArrowRight,
  Star,
  Clock,
  Users,
  TrendingUp
} from 'lucide-react';
import ChatbotOrderForm from '@/components/order/chatbot/ChatbotOrderForm';
import ChatbotBenefits from '@/components/order/chatbot/ChatbotBenefits';
import ChatbotExamples from '@/components/order/chatbot/ChatbotExamples';
import ChatbotPricing from '@/components/order/chatbot/ChatbotPricing';

const CHATBOT_FEATURES = [
  {
    icon: MessageSquare,
    title: 'Умные диалоги',
    description: 'Естественные сценарии общения с клиентами'
  },
  {
    icon: Target,
    title: 'Целевые воронки',
    description: 'Конверсионные последовательности для продаж'
  },
  {
    icon: Zap,
    title: 'Быстрые ответы',
    description: 'Мгновенная обработка типовых запросов'
  },
  {
    icon: Bot,
    title: 'AI-интеграция',
    description: 'Готовность к подключению ИИ-помощников'
  }
];

const PLATFORMS = [
  { name: 'Telegram', users: '700M+', growth: '+15%' },
  { name: 'WhatsApp Business', users: '2B+', growth: '+12%' },
  { name: 'Facebook Messenger', users: '1.3B+', growth: '+8%' },
  { name: 'VK Боты', users: '97M+', growth: '+20%' },
  { name: 'Viber', users: '260M+', growth: '+5%' },
  { name: 'Discord', users: '150M+', growth: '+25%' }
];

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
    // Redirect to tracking page
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
        {/* Hero Section */}
        <section className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-4">
                <Bot className="w-4 h-4 mr-2" />
                Умная автоматизация
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Создание <span className="text-gradient">чат-ботов</span>
                <br />
                нового поколения
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                Профессиональные чат-боты с умными сценариями для Telegram, WhatsApp, VK и других платформ. 
                Увеличьте конверсию до 40% и автоматизируйте общение с клиентами.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                  onClick={() => setShowForm(true)}
                >
                  Создать чат-бота
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg">
                  Примеры ботов
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-8 mt-8 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  AI-готовые сценарии
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  Запуск за 3-7 дней
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  100+ успешных ботов
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Почему наши скрипты эффективны
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Мы создаем не просто диалоги, а продуманные сценарии, которые ведут пользователя к целевому действию
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CHATBOT_FEATURES.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80">
                  <CardContent className="p-6">
                    <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Поддерживаемые платформы
              </h2>
              <p className="text-slate-600">
                Создаем скрипты для всех популярных мессенджеров и платформ
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {PLATFORMS.map((platform, index) => (
                <Card key={index} className="hover:shadow-md transition-all border-0 bg-white/60">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">{platform.name}</h4>
                      <p className="text-sm text-slate-500">{platform.users} пользователей</p>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">{platform.growth}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

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

        {/* Components Sections */}
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
