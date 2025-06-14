
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  CheckCircle, 
  Star, 
  Zap, 
  Crown, 
  ArrowRight,
  Clock,
  Shield,
  Users
} from "lucide-react";

const pricingPlans = [
  {
    name: "Стартовый",
    description: "Идеально для небольших проектов",
    price: "от 500₽",
    period: "за статью",
    icon: Zap,
    popular: false,
    features: [
      "SEO-статьи до 3000 знаков",
      "Базовая оптимизация",
      "Проверка уникальности",
      "1 бесплатная правка",
      "Срок выполнения: 3-5 дней"
    ],
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-50 to-cyan-50"
  },
  {
    name: "Профессиональный",
    description: "Лучший выбор для бизнеса",
    price: "от 1200₽",
    period: "за статью",
    icon: Star,
    popular: true,
    features: [
      "SEO-статьи до 6000 знаков",
      "Глубокая SEO-оптимизация",
      "LSI-анализ и семантика",
      "3 бесплатные правки",
      "Срок выполнения: 24-48 часов",
      "Конкурентный анализ"
    ],
    gradient: "from-purple-500 to-violet-600",
    bgGradient: "from-purple-50 to-violet-50"
  },
  {
    name: "Премиум",
    description: "Для крупных проектов",
    price: "от 2500₽",
    period: "за статью",
    icon: Crown,
    popular: false,
    features: [
      "SEO-статьи без ограничений",
      "Экспертная оптимизация",
      "Полный технический аудит",
      "Неограниченные правки",
      "Срок выполнения: 24 часа",
      "Персональный менеджер",
      "Стратегия продвижения"
    ],
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50"
  }
];

const additionalServices = [
  { name: "Описания товаров", price: "от 150₽", icon: Clock },
  { name: "Тексты для соцсетей", price: "от 300₽", icon: Users },
  { name: "Email-рассылки", price: "от 800₽", icon: Shield },
  { name: "Продающие лендинги", price: "от 5000₽", icon: Star }
];

export default function ModernPricingSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-slate-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-gradient-to-tr from-blue-500/5 to-emerald-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
            <CheckCircle className="w-5 h-5 mr-2" />
            Прозрачные цены
          </Badge>
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Тарифы для любого бюджета
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Выберите подходящий тариф для вашего проекта. Все цены финальные, без скрытых доплат
          </p>
        </div>

        {/* Тарифные планы */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`group relative p-8 hover:shadow-2xl transition-all duration-700 border-0 overflow-hidden ${
                plan.popular 
                  ? 'bg-gradient-to-br from-primary/5 to-purple-500/5 scale-105 ring-2 ring-primary/20' 
                  : `bg-gradient-to-br ${plan.bgGradient}`
              } hover:scale-105 hover:-translate-y-2`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-purple-600 text-white border-0 px-6 py-2 font-bold">
                  Популярный
                </Badge>
              )}
              
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {plan.description}
                </p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                asChild 
                size="lg" 
                className={`w-full group-hover:scale-105 transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90' 
                    : 'bg-gradient-to-r ' + plan.gradient + ' hover:opacity-90'
                }`}
              >
                <Link to="/order" className="flex items-center justify-center gap-2">
                  Заказать сейчас
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>

        {/* Дополнительные услуги */}
        <div className="bg-gradient-to-r from-slate-50 to-white rounded-3xl p-8 md:p-12 border border-slate-200/50 shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Дополнительные услуги
            </h3>
            <p className="text-lg text-muted-foreground">
              Расширьте возможности вашего контент-маркетинга
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service) => (
              <div key={service.name} className="group text-center p-6 bg-white rounded-2xl border border-slate-200/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2 text-foreground">{service.name}</h4>
                <p className="text-lg font-bold text-primary">{service.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA секция */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Нужна консультация по выбору тарифа?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/prices">Подробные цены</Link>
            </Button>
            <Button asChild size="lg">
              <Link to="/order">Получить расчет</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
