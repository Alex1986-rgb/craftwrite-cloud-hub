
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <ComprehensiveSeo
        title="Заказать скрипты для чат-бота | CopyPro Cloud - Умные диалоги для бизнеса"
        description="Создание скриптов для чат-ботов с высокой конверсией. Квалификация лидов, обработка заявок, консультации. Увеличение продаж до 40%. От 3000₽"
        keywords="скрипты чат-бота, диалоги для бота, chatbot scripts, бот для сайта, автоматизация продаж"
      />
      
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
              <h3 className="font-semibold mb-3">Повышение продаж</h3>
              <p className="text-gray-600">Увеличивают конверсию на 30-80% благодаря персонализированному общению</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Пакеты скриптов</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {CHATBOT_PACKAGES.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'ring-2 ring-blue-500' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white">Популярный</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl mb-2">{pkg.title}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{pkg.price}</div>
                  <p className="text-gray-600">{pkg.features}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {pkg.scenarios.map((scenario, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{scenario}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-sm text-gray-600 pt-2 border-t">
                    Срок выполнения: {pkg.deliveryTime}
                  </div>
                  <Button 
                    className="w-full"
                    variant={pkg.popular ? "default" : "outline"}
                    onClick={() => handlePackageSelect(pkg.title)}
                  >
                    Выбрать пакет
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Заказ скриптов для чат-бота</h3>
                <Button variant="ghost" onClick={() => setShowForm(false)}>×</Button>
              </div>
              <UnifiedOrderForm
                serviceTitle="Скрипты для чат-бота"
                selectedPackage={selectedPackage}
                onSuccess={() => {
                  setShowForm(false);
                  navigate('/chatbot-order-tracking');
                }}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
