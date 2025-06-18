
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
  Search,
  Target,
  TrendingUp,
  FileText
} from 'lucide-react';
import UnifiedOrderForm from '@/components/order/UnifiedOrderForm';

const SEO_PACKAGES = [
  {
    title: 'Базовая SEO-статья',
    price: 'от 2 000₽',
    wordCount: '2000-3000 слов',
    features: ['Анализ ключевых слов', 'SEO-оптимизация', 'Уникальность 95%+', 'Техническое задание'],
    deliveryTime: '2-3 дня',
    popular: false
  },
  {
    title: 'Экспертная статья',
    price: 'от 3 500₽',
    wordCount: '3000-5000 слов',
    features: ['Глубокий анализ конкурентов', 'LSI-оптимизация', 'Экспертные интервью', 'Инфографика', 'Мета-теги'],
    deliveryTime: '3-5 дней',
    popular: true
  },
  {
    title: 'Лонгрид премиум',
    price: 'от 5 000₽',
    wordCount: '5000+ слов',
    features: ['Кластер статей', 'Интерактивные элементы', 'Видео-материалы', 'A/B тестирование', 'Аналитика'],
    deliveryTime: '5-7 дней',
    popular: false
  }
];

export default function SeoArticleOrder() {
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
        title="Заказать SEO-статью | CopyPro Cloud - Продвижение в поисковых системах"
        description="Закажите SEO-оптимизированные статьи для продвижения сайта. Экспертный анализ ключевых слов, уникальность 95%+, гарантия результата. От 2000₽"
        keywords="SEO статьи, продвижение сайта, поисковая оптимизация, контент-маркетинг, написание SEO текстов"
      />
      
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30">
                <Search className="w-4 h-4 mr-2" />
                SEO-оптимизация
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SEO-статьи для топа поисковых систем
              </h1>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                Профессиональные SEO-тексты, которые выводят ваш сайт в ТОП Google и Яндекс. 
                Экспертный анализ ключевых слов, LSI-оптимизация и гарантия уникальности 95%+
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  <span>Точное попадание в ТОП</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Рост трафика на 150%</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span>95%+ уникальность</span>
                </div>
              </div>
              <Button 
                size="lg" 
                className="mt-8 bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => setShowForm(true)}
              >
                Заказать SEO-статью
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Что делает наши SEO-статьи эффективными</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-3">Анализ конкурентов</h3>
                <p className="text-gray-600">Изучаем ТОП-10 конкурентов, анализируем их стратегии и создаем контент, который превосходит их по всем параметрам</p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-3">LSI-оптимизация</h3>
                <p className="text-gray-600">Используем семантически связанные ключевые слова для естественного восприятия текста поисковыми системами</p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-3">Структурированность</h3>
                <p className="text-gray-600">Правильная структура с H1-H6, списками, таблицами и схемами для максимального ранжирования</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Выберите пакет SEO-статей
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                От базовых статей до премиум-лонгридов с интерактивными элементами
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {SEO_PACKAGES.map((pkg, index) => (
                <Card 
                  key={index} 
                  className={`relative hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                    pkg.popular 
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 transform hover:scale-105' 
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
                    <div className="text-sm text-gray-500">{pkg.wordCount}</div>
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
          <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
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
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Выведите ваш сайт в ТОП поисковых систем
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Закажите профессиональные SEO-статьи и получите стабильный рост органического трафика уже через месяц
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setShowForm(true)}
            >
              Начать продвижение
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
