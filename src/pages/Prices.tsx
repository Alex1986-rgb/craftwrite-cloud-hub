
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { 
  CheckCircle, 
  Star, 
  Zap, 
  Crown, 
  ArrowRight,
  Calculator,
  Shield,
  Users,
  Target,
  Award,
  Clock,
  TrendingUp
} from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PriceCalculator from "@/components/prices/PriceCalculator";
import PriceComparison from "@/components/prices/PriceComparison";
import PriceFAQ from "@/components/prices/PriceFAQ";

const pricingPlans = [
  {
    name: "Стартовый",
    description: "Для небольших проектов и стартапов",
    monthlyPrice: 15000,
    yearlyPrice: 150000,
    icon: Zap,
    popular: false,
    features: [
      "До 5 статей в месяц",
      "SEO-оптимизация",
      "Проверка уникальности",
      "2 бесплатные правки",
      "Сроки: 3-5 дней",
      "Email поддержка"
    ],
    limits: "До 3000 знаков на статью",
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-50 to-cyan-50"
  },
  {
    name: "Профессиональный",
    description: "Оптимальное решение для бизнеса",
    monthlyPrice: 35000,
    yearlyPrice: 350000,
    icon: Star,
    popular: true,
    features: [
      "До 15 статей в месяц",
      "Глубокая SEO-оптимизация",
      "LSI-анализ и семантика",
      "5 бесплатных правок",
      "Сроки: 24-48 часов",
      "Конкурентный анализ",
      "Приоритетная поддержка",
      "Персональный менеджер"
    ],
    limits: "До 6000 знаков на статью",
    gradient: "from-purple-500 to-violet-600",
    bgGradient: "from-purple-50 to-violet-50"
  },
  {
    name: "Корпоративный",
    description: "Для крупного бизнеса и агентств",
    monthlyPrice: 75000,
    yearlyPrice: 750000,
    icon: Crown,
    popular: false,
    features: [
      "Безлимитные статьи",
      "Экспертная оптимизация",
      "Полный технический аудит",
      "Неограниченные правки",
      "Сроки: 12-24 часа",
      "Стратегия продвижения",
      "Круглосуточная поддержка",
      "Команда экспертов",
      "Отчеты и аналитика",
      "API интеграция"
    ],
    limits: "Без ограничений по объему",
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50"
  }
];

const additionalServices = [
  {
    category: "Контент для сайтов",
    services: [
      { name: "Описания товаров", price: "от 150₽", unit: "за товар" },
      { name: "Категорийные страницы", price: "от 800₽", unit: "за страницу" },
      { name: "О компании", price: "от 2000₽", unit: "за страницу" },
      { name: "Посадочные страницы", price: "от 5000₽", unit: "за лендинг" }
    ]
  },
  {
    category: "Социальные сети",
    services: [
      { name: "Посты для Instagram", price: "от 300₽", unit: "за пост" },
      { name: "Статьи для LinkedIn", price: "от 800₽", unit: "за статью" },
      { name: "Контент-план", price: "от 10000₽", unit: "за месяц" },
      { name: "SMM-тексты", price: "от 500₽", unit: "за пост" }
    ]
  },
  {
    category: "Email-маркетинг",
    services: [
      { name: "Email-рассылки", price: "от 800₽", unit: "за письмо" },
      { name: "Последовательности писем", price: "от 5000₽", unit: "за серию" },
      { name: "Триггерные письма", price: "от 1200₽", unit: "за письмо" },
      { name: "Welcome-серия", price: "от 8000₽", unit: "за серию" }
    ]
  },
  {
    category: "Специальные проекты",
    services: [
      { name: "Техническая документация", price: "от 1000₽", unit: "за страницу" },
      { name: "Пресс-релизы", price: "от 3000₽", unit: "за релиз" },
      { name: "Кейс-стади", price: "от 5000₽", unit: "за кейс" },
      { name: "White papers", price: "от 15000₽", unit: "за документ" }
    ]
  }
];

export default function Prices() {
  const [isYearly, setIsYearly] = useState(false);
  const [activeTab, setActiveTab] = useState("plans");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-slate-50/50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-to-tr from-blue-500/5 to-emerald-500/5 rounded-full blur-2xl"></div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 py-16 relative z-10">
          {/* Hero секция */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
              <Calculator className="w-5 h-5 mr-2" />
              Прозрачные цены
            </Badge>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Тарифы для любого бизнеса
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Выберите подходящий план или рассчитайте индивидуальную стоимость. 
              Все цены финальные, без скрытых доплат.
            </p>

            {/* Переключатель месяц/год */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-lg font-medium ${!isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
                Месячная оплата
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-primary"
              />
              <span className={`text-lg font-medium ${isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
                Годовая оплата
              </span>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                -20% экономия
              </Badge>
            </div>
          </div>

          {/* Табы */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12">
              <TabsTrigger value="plans">Тарифные планы</TabsTrigger>
              <TabsTrigger value="calculator">Калькулятор</TabsTrigger>
              <TabsTrigger value="services">Доп. услуги</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            {/* Тарифные планы */}
            <TabsContent value="plans" className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                      
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-primary">
                          {isYearly 
                            ? `${(plan.yearlyPrice / 1000).toFixed(0)}K₽` 
                            : `${(plan.monthlyPrice / 1000).toFixed(0)}K₽`
                          }
                        </span>
                        <span className="text-muted-foreground ml-2">
                          /{isYearly ? 'год' : 'месяц'}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-6">
                        {plan.limits}
                      </p>
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
                        Выбрать план
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </Card>
                ))}
              </div>

              {/* Дополнительная информация */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center p-6 bg-white rounded-2xl border border-slate-200/50 shadow-sm">
                  <Shield className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">100% уникальность</h4>
                  <p className="text-sm text-muted-foreground">Гарантия с проверкой Text.ru</p>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl border border-slate-200/50 shadow-sm">
                  <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">30+ экспертов</h4>
                  <p className="text-sm text-muted-foreground">Дипломированные специалисты</p>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl border border-slate-200/50 shadow-sm">
                  <Clock className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Быстрые сроки</h4>
                  <p className="text-sm text-muted-foreground">От 24 часов</p>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl border border-slate-200/50 shadow-sm">
                  <Award className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Гарантия качества</h4>
                  <p className="text-sm text-muted-foreground">7 дней на правки</p>
                </div>
              </div>
            </TabsContent>

            {/* Калькулятор */}
            <TabsContent value="calculator">
              <PriceCalculator />
            </TabsContent>

            {/* Дополнительные услуги */}
            <TabsContent value="services" className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Дополнительные услуги
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Расширьте возможности вашего контент-маркетинга с нашими специализированными услугами
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {additionalServices.map((category) => (
                  <Card key={category.category} className="p-8 bg-gradient-to-br from-white to-slate-50/50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <h3 className="text-2xl font-bold mb-6 text-foreground">
                      {category.category}
                    </h3>
                    <div className="space-y-4">
                      {category.services.map((service) => (
                        <div key={service.name} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200/50 hover:border-primary/30 transition-colors duration-300">
                          <div>
                            <h4 className="font-semibold text-foreground">{service.name}</h4>
                            <p className="text-sm text-muted-foreground">{service.unit}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-primary">{service.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* FAQ */}
            <TabsContent value="faq">
              <PriceFAQ />
            </TabsContent>
          </Tabs>

          {/* CTA секция */}
          <div className="text-center mt-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Готовы начать работу?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Получите бесплатную консультацию и персональное предложение для вашего проекта
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/order">Заказать контент</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/#contact">Получить консультацию</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
