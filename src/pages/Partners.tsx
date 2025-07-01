
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Handshake, 
  TrendingUp, 
  Users, 
  Award,
  Target,
  Zap,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import UnifiedHeader from '@/components/navigation/UnifiedHeader';
import EnhancedFooter from '@/components/common/EnhancedFooter';
import { useSeoMeta } from '@/hooks/useSeoMeta';

const partnerPrograms = [
  {
    title: 'Агентское партнерство',
    commission: '15-25%',
    description: 'Для маркетинговых агентств и студий',
    features: [
      'Комиссия с каждого заказа',
      'Персональный менеджер',
      'Белые лейблы',
      'Приоритетная поддержка'
    ],
    minRevenue: '50 000₽/мес'
  },
  {
    title: 'Реферальная программа',
    commission: '10%',
    description: 'Для индивидуальных предпринимателей',
    features: [
      'Простая регистрация',
      'Пожизненная комиссия',
      'Маркетинговые материалы',
      'Онлайн-отчетность'
    ],
    minRevenue: '10 000₽/мес'
  },
  {
    title: 'Технологическая интеграция',
    commission: 'От 5%',
    description: 'Для IT-платформ и сервисов',
    features: [
      'API интеграция',
      'Техническая поддержка',
      'Совместный маркетинг',
      'Кастомизация решений'
    ],
    minRevenue: '100 000₽/мес'
  }
];

const benefits = [
  {
    icon: TrendingUp,
    title: 'Стабильный доход',
    description: 'Гарантированные выплаты каждый месяц без задержек'
  },
  {
    icon: Users,
    title: 'Личный менеджер',
    description: 'Персональная поддержка для развития партнерства'
  },
  {
    icon: Award,
    title: 'Качественный продукт',
    description: 'Высокое качество услуг гарантирует довольных клиентов'
  },
  {
    icon: Target,
    title: 'Маркетинговая поддержка',
    description: 'Готовые материалы и инструменты для продаж'
  }
];

export default function Partners() {
  useSeoMeta({
    title: 'Партнерская программа CopyPro Cloud - Зарабатывайте с нами',
    description: 'Станьте партнером CopyPro Cloud. Агентское партнерство, реферальная программа, технологические интеграции. Комиссия до 25%.',
    keywords: 'партнеры, партнерская программа, агентство, реферальная программа, комиссия'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <UnifiedHeader />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Партнерская программа
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Присоединяйтесь к нашей партнерской сети и зарабатывайте на рекомендациях качественных копирайтинговых услуг
          </p>
          
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>500+ активных партнеров</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Выплаты в срок</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Комиссия до 25%</span>
            </div>
          </div>

          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
            Стать партнером
          </Button>
        </div>

        {/* Partner Programs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Программы партнерства</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnerPrograms.map((program, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 relative">
                {index === 0 && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-orange-500">
                    Популярный
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl mb-2">{program.title}</CardTitle>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {program.commission}
                  </div>
                  <p className="text-gray-600">{program.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {program.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center border-t pt-4">
                    <p className="text-sm text-gray-600 mb-4">
                      Мин. оборот: <strong>{program.minRevenue}</strong>
                    </p>
                    <Button className="w-full">
                      Подать заявку
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Преимущества партнерства</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <Card className="mb-16 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Истории успеха партнеров</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">150%</div>
                <div className="text-sm text-gray-600">Рост дохода за год</div>
                <div className="text-xs text-gray-500 mt-1">Агентство "Рост Медиа"</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Новых клиентов в месяц</div>
                <div className="text-xs text-gray-500 mt-1">Фрилансер М. Петров</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">2M₽</div>
                <div className="text-sm text-gray-600">Общий доход партнера</div>
                <div className="text-xs text-gray-500 mt-1">IT-платформа ContentPro</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Готовы начать зарабатывать?</h3>
            <p className="mb-6 max-w-2xl mx-auto opacity-90">
              Заполните заявку на партнерство, и наш менеджер свяжется с вами в течение 24 часов 
              для обсуждения условий сотрудничества.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Handshake className="w-5 h-5 mr-2" />
                Стать партнером
              </Button>
              <Button size="lg" variant="outline" className="text-blue-600 border-white hover:bg-white">
                Скачать презентацию
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <EnhancedFooter />
    </div>
  );
}
