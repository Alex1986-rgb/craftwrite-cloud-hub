
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ComprehensiveSeo from '@/components/seo/ComprehensiveSeo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  ArrowRight,
  Zap,
  Target,
  TrendingUp,
  Layout,
  Smartphone,
  BarChart3
} from 'lucide-react';
import UnifiedOrderForm from '@/components/order/UnifiedOrderForm';

const LANDING_PACKAGES = [
  {
    title: 'Простой лендинг',
    price: 'от 5 000₽',
    sections: '5-7 секций',
    features: ['Адаптивный дизайн', 'Форма заявки', 'SEO-оптимизация', 'Базовая аналитика'],
    deliveryTime: '3-5 дней',
    popular: false
  },
  {
    title: 'Продающий лендинг',
    price: 'от 8 500₽',
    sections: '8-12 секций',
    features: ['A/B тестирование', 'Психологические триггеры', 'Интерактивные элементы', 'Калькулятор стоимости', 'CRM-интеграция'],
    deliveryTime: '5-7 дней',
    popular: true
  },
  {
    title: 'Премиум лендинг',
    price: 'от 15 000₽',
    sections: '12+ секций',
    features: ['Персонализация контента', 'Чат-бот интеграция', 'Видео-презентации', 'Многоступенчатые воронки', 'Полная аналитика'],
    deliveryTime: '7-10 дней',
    popular: false
  }
];

export default function LandingPageOrder() {
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
        title="Заказать лендинг | CopyPro Cloud - Продающие посадочные страницы"
        description="Создание высококонверсионных лендингов с гарантией результата. A/B тестирование, адаптивный дизайн, интеграции. Конверсия до 15%. От 5000₽"
        keywords="создание лендинга, посадочная страница, продающий лендинг, конверсионный дизайн, заказать лендинг"
      />
      
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30">
                <Layout className="w-4 h-4 mr-2" />
                Лендинги
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Лендинги с конверсией до 15%
              </h1>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                Создаем продающие посадочные страницы, которые превращают посетителей в клиентов. 
                Адаптивный дизайн, психологические триггеры, A/B тестирование
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span>Быстрая загрузка</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  <span>Мобильная адаптация</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Высокая конверсия</span>
                </div>
              </div>
              <Button 
                size="lg" 
                className="mt-8 bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => setShowForm(true)}
              >
                Заказать лендинг
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Почему наши лендинги продают</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-3">Психология продаж</h3>
                <p className="text-gray-600">Используем проверенные психологические триггеры: социальные доказательства, дефицит, авторитет</p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-3">Скорость загрузки</h3>
                <p className="text-gray-600">Оптимизированный код и сжатые изображения обеспечивают загрузку менее чем за 2 секунды</p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-3">A/B тестирование</h3>
                <p className="text-gray-600">Тестируем различные варианты заголовков, кнопок и форм для максимальной конверсии</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Пакеты создания лендингов
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                От простых страниц до комплексных продающих систем
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {LANDING_PACKAGES.map((pkg, index) => (
                <Card 
                  key={index} 
                  className={`relative hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                    pkg.popular 
                      ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 transform hover:scale-105' 
                      : 'border-transparent bg-white hover:border-purple-200'
                  }`}
                  onClick={() => handlePackageSelect(pkg.title)}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600">
                      🔥 Популярный
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-lg mb-2">{pkg.title}</CardTitle>
                    <div className="text-3xl font-bold text-purple-600 mb-2">{pkg.price}</div>
                    <div className="text-sm text-gray-500">{pkg.sections}</div>
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
          <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
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
        <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Превратите трафик в продажи
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Закажите продающий лендинг и увеличьте конверсию в 3-5 раз уже через неделю
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setShowForm(true)}
            >
              Создать лендинг
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
