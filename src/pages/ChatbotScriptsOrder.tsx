
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
  Bot,
  MessageCircle,
  Zap,
  Users,
  Settings,
  TrendingUp
} from 'lucide-react';
import UnifiedOrderForm from '@/components/order/UnifiedOrderForm';

const CHATBOT_PACKAGES = [
  {
    title: 'Простой бот',
    price: 'от 3 000₽',
    features: '10-15 сценариев',
    scenarios: ['Приветствие', 'FAQ', 'Контакты', 'Базовая навигация'],
    deliveryTime: '2-3 дня',
    popular: false
  },
  {
    title: 'Умный помощник',
    price: 'от 6 500₽',
    features: '25-35 сценариев',
    scenarios: ['Квалификация лидов', 'Обработка заявок', 'Консультации', 'Интеграции', 'Аналитика'],
    deliveryTime: '4-6 дней',
    popular: true
  },
  {
    title: 'AI-консультант',
    price: 'от 12 000₽',
    features: '50+ сценариев',
    scenarios: ['Персонализация', 'Машинное обучение', 'Мультиканальность', 'CRM интеграция', 'Продвинутая аналитика'],
    deliveryTime: '7-10 дней',
    popular: false
  }
];

export default function ChatbotScriptsOrder() {
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handlePackageSelect = (packageTitle: string) => {
    setSelectedPackage(packageTitle);
    setShowForm(true);
  };

  return (
    <>
      <ComprehensiveSeo
        title="Заказать скрипты для чат-бота | CopyPro Cloud - Умные диалоги для бизнеса"
        description="Создание скриптов для чат-ботов с высокой конверсией. Квалификация лидов, обработка заявок, консультации. Увеличение продаж до 40%. От 3000₽"
        keywords="скрипты чат-бота, диалоги для бота, chatbot scripts, бот для сайта, автоматизация продаж"
      />
      
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30">
                <Bot className="w-4 h-4 mr-2" />
                Чат-боты
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Скрипты чат-ботов, которые продают
              </h1>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                Создаем умных виртуальных помощников для вашего бизнеса. 
                Квалификация лидов, обработка заявок, консультации 24/7
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Умные диалоги</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span>Быстрые ответы</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Рост конверсии</span>
                </div>
              </div>
              <Button 
                size="lg" 
                className="mt-8 bg-white text-indigo-600 hover:bg-gray-100"
                onClick={() => setShowForm(true)}
              >
                Заказать скрипты
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Что умеют наши чат-боты</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold mb-3">Квалификация лидов</h3>
                <p className="text-gray-600">Определяют готовность клиента к покупке и передают горячие лиды менеджерам</p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-3">Автоматизация</h3>
                <p className="text-gray-600">Обрабатывают типовые запросы, освобождая время сотрудников для важных задач</p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-3">Увеличение продаж</h3>
                <p className="text-gray-600">Работают 24/7, не теряют клиентов и увеличивают конверсию до 40%</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Пакеты создания чат-ботов
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                От простых FAQ-ботов до умных AI-консультантов
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {CHATBOT_PACKAGES.map((pkg, index) => (
                <Card 
                  key={index} 
                  className={`relative hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                    pkg.popular 
                      ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50 transform hover:scale-105' 
                      : 'border-transparent bg-white hover:border-indigo-200'
                  }`}
                  onClick={() => handlePackageSelect(pkg.title)}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-indigo-600">
                      🔥 Популярный
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-lg mb-2">{pkg.title}</CardTitle>
                    <div className="text-3xl font-bold text-indigo-600 mb-2">{pkg.price}</div>
                    <div className="text-sm text-gray-500">{pkg.features}</div>
                    <div className="text-sm text-green-600 font-medium">Срок: {pkg.deliveryTime}</div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {pkg.scenarios.map((scenario, scenarioIndex) => (
                        <li key={scenarioIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {scenario}
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full"
                      variant={pkg.popular ? "default" : "outline"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePackageSelect(pkg.title);
                      }}
                    >
                      Выбрать пакет
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Order Form Section */}
        {showForm && (
          <section className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
            <div className="container mx-auto px-4">
              <UnifiedOrderForm 
                variant="public"
                onOrderCreated={() => {
                  setShowForm(false);
                  navigate('/order-tracking');
                }}
              />
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Автоматизируйте общение с клиентами
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Получите умного помощника, который работает 24/7 и никогда не теряет клиентов
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setShowForm(true)}
            >
              Создать чат-бота
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
