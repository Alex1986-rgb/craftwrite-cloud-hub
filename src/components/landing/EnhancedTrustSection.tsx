import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Award, Users, TrendingUp, Shield, Clock } from 'lucide-react';

const TRUST_STATS = [
  {
    number: '2000+',
    label: 'Проектов выполнено',
    description: 'За 5 лет работы',
    icon: CheckCircle,
    color: 'from-green-500 to-emerald-600'
  },
  {
    number: '98%',
    label: 'Клиентов довольны',
    description: 'Возвращаются снова',
    icon: Users,
    color: 'from-blue-500 to-blue-600'
  },
  {
    number: '200%',
    label: 'Средний рост трафика',
    description: 'Наших SEO-статей',
    icon: TrendingUp,
    color: 'from-purple-500 to-purple-600'
  },
  {
    number: '24 часа',
    label: 'Экспресс-доставка',
    description: 'Для срочных заказов',
    icon: Clock,
    color: 'from-orange-500 to-red-500'
  }
];

const GUARANTEES = [
  {
    title: '100% уникальность',
    description: 'Проверяем через Text.ru, Advego, eTXT. Предоставляем официальные отчеты.',
    icon: Shield
  },
  {
    title: 'Бесплатные правки',
    description: 'В течение 30 дней корректируем текст до полного соответствия ТЗ.',
    icon: CheckCircle
  },
  {
    title: 'Возврат средств',
    description: 'Если результат не соответствует договоренностям — вернем деньги.',
    icon: Award
  }
];

const CLIENT_CASES = [
  {
    industry: 'E-commerce',
    task: 'SEO-статьи для интернет-магазина',
    result: 'Трафик вырос с 1000 до 15000 визитов/месяц',
    period: '6 месяцев',
    growth: '+1400%'
  },
  {
    industry: 'Образование',
    task: 'Лендинг для онлайн-курса',
    result: 'Конверсия выросла с 3% до 18%',
    period: '2 месяца',
    growth: '+500%'
  },
  {
    industry: 'Маркетплейсы',
    task: 'Карточки товаров Wildberries',
    result: 'Продажи выросли с 10 до 150 шт/день',
    period: '1 месяц',
    growth: '+1400%'
  }
];

export default function EnhancedTrustSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20"></div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="px-4 py-2 text-sm font-semibold bg-primary/10 text-primary border-primary/20">
            <Award className="w-4 h-4 mr-2" />
            Проверенная экспертиза
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Результаты говорят сами за себя
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Более 2000 успешных проектов, десятки благодарных отзывов, 
            конкретные цифры роста бизнеса наших клиентов.
          </p>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {TRUST_STATS.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guarantees */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Наши гарантии
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GUARANTEES.map((guarantee, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-green-600 mb-4">
                    <guarantee.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">{guarantee.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{guarantee.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Client Cases */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Кейсы наших клиентов
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLIENT_CASES.map((clientCase, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {/* Growth badge */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 text-center font-bold">
                  {clientCase.growth}
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <Badge variant="secondary" className="mb-2">{clientCase.industry}</Badge>
                      <h4 className="font-semibold text-foreground">{clientCase.task}</h4>
                    </div>
                    
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="text-sm text-muted-foreground mb-1">Результат:</div>
                      <div className="font-semibold text-foreground">{clientCase.result}</div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div className="text-muted-foreground">
                        Период: <span className="font-semibold">{clientCase.period}</span>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-semibold">{clientCase.growth}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              <span className="font-semibold">Хотите увидеть больше кейсов?</span> 
              {" "}Запросите портфолио при заказе — покажем проекты из вашей ниши.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}