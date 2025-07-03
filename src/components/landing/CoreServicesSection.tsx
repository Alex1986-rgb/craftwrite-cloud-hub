import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Search, Target, ShoppingCart, CheckCircle, Star, TrendingUp } from 'lucide-react';

const CORE_SERVICES = [
  {
    id: 'seo-articles',
    title: 'SEO-статьи',
    subtitle: 'Органический трафик в 3 раза больше',
    description: 'Статьи, которые выводят ваш сайт в топ поиска. Проверенная методология, анализ конкурентов, работа с семантикой.',
    icon: Search,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-100/50',
    price: 'от 1 500₽',
    deliveryTime: '3-5 дней',
    results: [
      'Рост трафика на 200-300%',
      'Попадание в топ-10 поиска',
      '100% уникальность'
    ],
    examples: [
      'Статья "Как выбрать детскую коляску" - 15 000 переходов/месяц',
      'Обзор "Лучшие смартфоны 2024" - 8 000 переходов/месяц'
    ],
    features: [
      'Анализ ключевых слов',
      'Структура H1-H6',
      'LSI-ключи и синонимы',
      'Внутренняя перелинковка'
    ]
  },
  {
    id: 'landing-pages',
    title: 'Продающие лендинги',
    subtitle: 'Конверсия до 25%',
    description: 'Лендинг-страницы, которые превращают посетителей в покупателей. Психология продаж, проверенные схемы, сильные CTA.',
    icon: Target,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'from-green-50 to-emerald-100/50',
    price: 'от 3 000₽',
    deliveryTime: '5-7 дней',
    results: [
      'Конверсия 15-25%',
      'Рост продаж на 180%',
      'Окупаемость за месяц'
    ],
    examples: [
      'Лендинг курса английского - конверсия 23%',
      'Страница консультаций - конверсия 18%'
    ],
    features: [
      'Структура AIDA',
      'Анализ целевой аудитории',
      'Сильные заголовки',
      'Возражения и ответы'
    ]
  },
  {
    id: 'marketplace-content',
    title: 'Контент для маркетплейсов',
    subtitle: 'В 5 раз больше продаж',
    description: 'Карточки товаров для Wildberries, Ozon, Яндекс.Маркет. Поднимаем в поиске, увеличиваем конверсию.',
    icon: ShoppingCart,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50 to-purple-100/50',
    price: 'от 1 200₽',
    deliveryTime: '2-3 дня',
    results: [
      'Рост продаж в 5 раз',
      'Топ-20 в поиске',
      'Больше отзывов'
    ],
    examples: [
      'Карточка детской одежды - с 5 до 50 продаж/день',
      'Товары для дома - рост на 400%'
    ],
    features: [
      'SEO под маркетплейсы',
      'Ключевые слова WB/Ozon',
      'Эмоциональные описания',
      'Анализ конкурентов'
    ]
  }
];

interface CoreServicesSectionProps {
  onServiceSelect?: (service: string) => void;
}

export default function CoreServicesSection({ onServiceSelect }: CoreServicesSectionProps) {
  return (
    <section id="core-services" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-background to-primary/5"></div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
            <Star className="w-4 h-4" />
            Наши топ-3 экспертизы
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              В чем мы лучшие
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Сфокусировались на 3 направлениях и достигли экспертного уровня. 
            Каждый проект — это гарантированный результат для вашего бизнеса.
          </p>
        </div>

        {/* Core Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {CORE_SERVICES.map((service, index) => (
            <Card 
              key={service.id} 
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-50`}></div>
              
              {/* Icon badge */}
              <div className={`absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-white/50 text-foreground">
                    #{index + 1} экспертиза
                  </Badge>
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${service.color} text-white text-sm font-semibold`}>
                    {service.price}
                  </div>
                </div>
                
                <CardTitle className="text-2xl font-bold mb-2">{service.title}</CardTitle>
                <CardDescription className="text-base font-medium text-foreground/80">
                  {service.subtitle}
                </CardDescription>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardHeader>

              <CardContent className="relative z-10 space-y-6">
                {/* Results */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    Результаты клиентов:
                  </h4>
                  <ul className="space-y-2">
                    {service.results.map((result, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-muted-foreground">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Что входит:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground bg-white/50 rounded-lg px-2 py-1">
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button 
                  className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 text-white font-semibold shadow-lg group`}
                  onClick={() => onServiceSelect?.(service.title)}
                >
                  <span>Заказать {service.title.toLowerCase()}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                {/* Delivery time */}
                <div className="text-center text-sm text-muted-foreground">
                  ⚡ Готово за {service.deliveryTime}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* All services link */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            <span>Посмотреть все услуги</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            У нас есть еще 15+ услуг для разных задач
          </p>
        </div>
      </div>
    </section>
  );
}