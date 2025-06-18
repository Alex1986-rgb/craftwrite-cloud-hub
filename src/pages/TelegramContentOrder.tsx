
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
  MessageCircle,
  Users,
  TrendingUp,
  Zap,
  Bot,
  Calendar
} from 'lucide-react';
import UnifiedOrderForm from '@/components/order/UnifiedOrderForm';

const TELEGRAM_PACKAGES = [
  {
    title: 'Контент-план',
    price: 'от 2 500₽',
    posts: '30 постов',
    features: ['Календарь публикаций', 'Разнообразные форматы', 'Хештеги и эмодзи', 'Редакционная политика'],
    deliveryTime: '3-5 дней',
    popular: false
  },
  {
    title: 'Комплексное ведение',
    price: 'от 8 000₽',
    posts: '60 постов + боты',
    features: ['Автопостинг', 'Интерактивные опросы', 'Настройка ботов', 'Аналитика', 'Работа с подписчиками'],
    deliveryTime: '5-7 дней',
    popular: true
  },
  {
    title: 'Премиум стратегия',
    price: 'от 15 000₽',
    posts: '100+ постов',
    features: ['Многоканальная стратегия', 'Кроссплатформенный контент', 'Персональный менеджер', 'Реклама в Telegram', 'Полная автоматизация'],
    deliveryTime: '7-10 дней',
    popular: false
  }
];

export default function TelegramContentOrder() {
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
        title="Заказать контент для Telegram | CopyPro Cloud - Ведение Telegram каналов"
        description="Создание контента для Telegram каналов и чатов. Автопостинг, боты, аналитика. Рост подписчиков до 300%. Контент-планы от 2500₽"
        keywords="telegram контент, ведение telegram канала, автопостинг телеграм, telegram боты, контент план телеграм"
      />
      
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30">
                <MessageCircle className="w-4 h-4 mr-2" />
                Telegram
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Контент для Telegram с ростом до 300%
              </h1>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                Создаем вирусный контент для Telegram каналов и чатов. 
                Автопостинг, интерактивные боты, аналитика роста аудитории
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  <span>Автоматизация</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Контент-планы</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Рост аудитории</span>
                </div>
              </div>
              <Button 
                size="lg" 
                className="mt-8 bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => setShowForm(true)}
              >
                Заказать контент
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Как мы развиваем Telegram каналы</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-3">Вирусный контент</h3>
                <p className="text-gray-600">Создаем посты, которые активно репостят и обсуждают. Используем актуальные тренды и мемы</p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="font-semibold mb-3">Умные боты</h3>
                <p className="text-gray-600">Настраиваем ботов для автоматизации рутинных задач и повышения вовлеченности</p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-3">Рост аудитории</h3>
                <p className="text-gray-600">Используем кросс-промо, конкурсы и партнерства для органического роста подписчиков</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Пакеты ведения Telegram
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                От контент-планов до полной автоматизации канала
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {TELEGRAM_PACKAGES.map((pkg, index) => (
                <Card 
                  key={index} 
                  className={`relative hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                    pkg.popular 
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 transform hover:scale-105' 
                      : 'border-transparent bg-white hover:border-blue-200'
                  }`}
                  onClick={() => handlePackageSelect(pkg.title)}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600">
                      🔥 Популярный
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-lg mb-2">{pkg.title}</CardTitle>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{pkg.price}</div>
                    <div className="text-sm text-gray-500">{pkg.posts}</div>
                    <div className="text-sm text-green-600 font-medium">Срок: {pkg.deliveryTime}</div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature}
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
          <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
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
        <section className="py-20 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Сделайте ваш Telegram канал популярным
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Начните привлекать тысячи активных подписчиков уже в первый месяц
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setShowForm(true)}
            >
              Начать развитие
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
