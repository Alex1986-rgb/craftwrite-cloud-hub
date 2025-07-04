import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Zap, 
  Target, 
  TrendingUp, 
  Users,
  ArrowRight,
  CheckCircle,
  Clock,
  Brain,
  Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ModernOrderSection() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    {
      icon: Brain,
      title: 'SEO-статьи',
      description: 'Умные тексты с AI-оптимизацией для ТОП-10 поисковиков',
      price: 'от 2,990₽',
      features: ['ТОП-10 гарантия', 'AI-анализ конкурентов', 'Семантическое ядро'],
      gradient: 'from-blue-500 to-cyan-500',
      popular: true
    },
    {
      icon: Rocket,
      title: 'Продающие лендинги',
      description: 'Конвертирующие тексты с психологией продаж',
      price: 'от 4,990₽',
      features: ['+180% конверсия', 'A/B тестирование', 'Воронка продаж'],
      gradient: 'from-purple-500 to-pink-500',
      popular: false
    },
    {
      icon: Target,
      title: 'Email-кампании',
      description: 'Персонализированные рассылки с высоким CTR',
      price: 'от 1,990₽',
      features: ['40%+ открываемость', 'Сегментация', 'Автоворонки'],
      gradient: 'from-emerald-500 to-teal-500',
      popular: false
    },
    {
      icon: TrendingUp,
      title: 'Контент для соцсетей',
      description: 'Вирусный контент для всех платформ',
      price: 'от 990₽',
      features: ['Вирусный потенциал', 'Трендовые форматы', 'Аналитика'],
      gradient: 'from-orange-500 to-red-500',
      popular: false
    }
  ];

  const benefits = [
    { icon: Clock, text: 'Экспресс-доставка 24ч' },
    { icon: CheckCircle, text: 'Гарантия качества 100%' },
    { icon: Users, text: '2000+ довольных клиентов' },
    { icon: Sparkles, text: 'AI-powered копирайтинг' }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-blue-50/50 to-purple-50/30" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="glass-effect mb-6 text-primary border-primary/20">
            <Zap className="w-4 h-4 mr-2 animate-pulse" />
            Профессиональный копирайтинг
          </Badge>
          
          <h2 className="text-4xl lg:text-6xl font-bold font-playfair mb-6 text-3d">
            <span className="gradient-liquid bg-clip-text text-transparent animate-gradient-shift">
              Заказать копирайтинг
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Выберите услугу и получите результат, который 
            <span className="text-primary font-semibold"> превзойдет ваши ожидания</span>
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`morph-card magnetic group relative overflow-hidden border-none ${
                hoveredService === index ? 'animate-glow-pulse' : ''
              }`}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-2 -right-2 z-10">
                  <Badge className="glass-effect bg-primary text-primary-foreground animate-pulse">
                    ХИТ
                  </Badge>
                </div>
              )}

              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />

              <CardHeader className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-4 mb-4 group-hover:animate-liquid-flow`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
                
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10 space-y-4">
                <div className="text-3xl font-bold text-primary">{service.price}</div>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to="/order" className="block">
                  <Button className="w-full magnetic group/btn">
                    Заказать
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Bar */}
        <div className="glass-card p-8 rounded-3xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.text}
                className="flex items-center gap-3 group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="p-3 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="font-medium text-sm">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 glass-effect p-8 rounded-3xl">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Нужна консультация?
              </h3>
              <p className="text-muted-foreground">
                Обсудим ваш проект и подберем оптимальное решение
              </p>
            </div>
            <Button size="lg" className="magnetic">
              <Users className="w-5 h-5 mr-2" />
              Связаться с экспертом
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}