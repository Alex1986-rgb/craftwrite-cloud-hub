import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, Zap, Clock, Target, Brain, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";

const ModernOrderSection = () => {
  const [activeService, setActiveService] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    {
      icon: Brain,
      title: "SEO-статьи",
      description: "Экспертные статьи с AI-оптимизацией",
      price: "от 2000₽",
      time: "24-48 часов",
      features: ["LSI-оптимизация", "100% уникальность", "Анализ конкурентов"],
      gradient: "from-blue-500 to-purple-600",
      slug: "seo-article"
    },
    {
      icon: Target,
      title: "Лендинги",
      description: "Продающие страницы с высокой конверсией",
      price: "от 8000₽",
      time: "3-5 дней",
      features: ["A/B тестирование", "Психология продаж", "Адаптивный дизайн"],
      gradient: "from-purple-500 to-pink-600",
      slug: "landing-page"
    },
    {
      icon: Zap,
      title: "Email-кампании",
      description: "Воронки продаж для автоматизации",
      price: "от 5000₽",
      time: "2-3 дня",
      features: ["Сегментация", "Автоворонки", "Персонализация"],
      gradient: "from-pink-500 to-red-600",
      slug: "email-marketing"
    },
    {
      icon: Wand2,
      title: "Контент для соцсетей",
      description: "Вирусный контент для всех платформ",
      price: "от 3000₽",
      time: "1-2 дня",
      features: ["Тренды", "Визуальное сопровождение", "Таргетинг"],
      gradient: "from-green-500 to-teal-600",
      slug: "social-media"
    }
  ];

  return (
    <section id="order" className="py-24 relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-20 h-20 bg-primary/10 rounded-full animate-float" />
        <div className="absolute top-40 right-32 w-16 h-16 bg-purple-500/10 rounded-full animate-float-delayed" />
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-pink-500/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container-modern relative z-10">
        
        {/* Section header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 glass-morphism rounded-full px-6 py-3 mb-4">
            <Sparkles className="w-5 h-5 text-primary animate-glow-rotate" />
            <span className="text-sm font-medium text-muted-foreground">Smart Order System</span>
          </div>
          
          <h2 className="text-fluid-xl font-bold text-foreground">
            Выберите тип контента
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI-помощник поможет создать идеальное техническое задание за 2 минуты
          </p>
        </div>

        {/* Services grid with advanced interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`card-morphing relative overflow-hidden border-0 transition-all duration-500 cursor-pointer group ${
                hoveredCard === index ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setActiveService(index)}
            >
              {/* Animated gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <CardContent className="relative p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 group-hover:animate-glow-rotate`}>
                  <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-gradient transition-all duration-300">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 text-sm">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Цена:</span>
                    <span className="font-semibold text-primary">{service.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Срок:</span>
                    <span className="font-semibold">{service.time}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="text-xs text-muted-foreground bg-secondary/50 rounded-lg px-3 py-2">
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full btn-magnetic" 
                  asChild
                >
                  <Link to={`/order/${service.slug}`}>
                    Выбрать
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Smart order CTA */}
        <div className="text-center space-y-8">
          <div className="glass-morphism rounded-3xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-primary animate-pulse-glow" />
              <h3 className="text-2xl font-bold text-foreground">AI Smart Order</h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Не знаете, что выбрать? Наш AI-помощник анализирует ваши потребности 
              и предложит оптимальное решение за 30 секунд
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-magnetic btn-glow px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl" 
                asChild
              >
                <Link to="/smart-order" className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  Запустить AI-помощника
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="glass-morphism px-8 py-4 rounded-xl"
                asChild
              >
                <Link to="/order" className="flex items-center gap-3">
                  <Clock className="w-5 h-5" />
                  Обычный заказ
                </Link>
              </Button>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            {[
              "✓ Консультация бесплатно",
              "✓ Фиксированная цена", 
              "✓ Правки включены",
              "✓ Оплата по факту"
            ].map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernOrderSection;