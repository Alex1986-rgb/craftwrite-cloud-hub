
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
  Mail,
  Target,
  TrendingUp,
  Users,
  Clock,
  BarChart3
} from 'lucide-react';
import UnifiedOrderForm from '@/components/order/UnifiedOrderForm';

const EMAIL_PACKAGES = [
  {
    title: 'Разовая рассылка',
    price: 'от 1 500₽',
    emails: '1 письмо',
    features: ['Дизайн письма', 'Адаптивная верстка', 'Персонализация', 'Тестирование'],
    deliveryTime: '1-2 дня',
    popular: false
  },
  {
    title: 'Email-воронка',
    price: 'от 4 500₽',
    emails: '5-7 писем',
    features: ['Автоматизированная серия', 'Сегментация аудитории', 'Триггерные письма', 'A/B тестирование', 'Аналитика'],
    deliveryTime: '3-5 дней',
    popular: true
  },
  {
    title: 'Комплексная стратегия',
    price: 'от 12 000₽',
    emails: '15+ писем',
    features: ['Стратегия на 3 месяца', 'Многоэтапные воронки', 'Поведенческие триггеры', 'CRM-интеграция', 'Полная аналитика'],
    deliveryTime: '7-10 дней',
    popular: false
  }
];

export default function EmailCampaignsOrder() {
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
        title="Заказать email-рассылку | CopyPro Cloud - Email-маркетинг с высокой конверсией"
        description="Создание эффективных email-кампаний и автоматизированных воронок. Персонализация, сегментация, A/B тестирование. Открываемость до 45%. От 1500₽"
        keywords="email маркетинг, email рассылка, автоматизация рассылок, email воронки, триггерные письма"
      />
      
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30">
                <Mail className="w-4 h-4 mr-2" />
                Email-маркетинг
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Email-рассылки с открываемостью до 45%
              </h1>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                Создаем email-кампании, которые читают и по которым покупают. 
                Автоматизированные воронки, персонализация и точная сегментация аудитории
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>Сегментация аудитории</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Автоматизация</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Высокая конверсия</span>
                </div>
              </div>
              <Button 
                size="lg" 
                className="mt-8 bg-white text-green-600 hover:bg-gray-100"
                onClick={() => setShowForm(true)}
              >
                Заказать рассылку
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Что делает наши рассылки эффективными</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-3">Персонализация</h3>
                <p className="text-gray-600">Каждое письмо адаптируется под интересы и поведение конкретного получателя</p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-3">Автоматизация</h3>
                <p className="text-gray-600">Настраиваем триггерные цепочки писем, которые работают без вашего участия</p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-3">Точная сегментация</h3>
                <p className="text-gray-600">Делим базу на группы по демографии, поведению и интересам для максимальной релевантности</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Пакеты email-маркетинга
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                От разовых рассылок до комплексных автоматизированных стратегий
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {EMAIL_PACKAGES.map((pkg, index) => (
                <Card 
                  key={index} 
                  className={`relative hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                    pkg.popular 
                      ? 'border-green-500 bg-gradient-to-br from-green-50 to-blue-50 transform hover:scale-105' 
                      : 'border-transparent bg-white hover:border-green-200'
                  }`}
                  onClick={() => handlePackageSelect(pkg.title)}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-600">
                      🔥 Популярный
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-lg mb-2">{pkg.title}</CardTitle>
                    <div className="text-3xl font-bold text-green-600 mb-2">{pkg.price}</div>
                    <div className="text-sm text-gray-500">{pkg.emails}</div>
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
          <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
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
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Автоматизируйте продажи через email
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Настройте воронки, которые будут продавать ваши товары и услуги 24/7
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setShowForm(true)}
            >
              Запустить автоматизацию
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
