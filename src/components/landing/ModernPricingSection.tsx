
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Zap, Crown } from "lucide-react";
import PricingPlanCard from "./pricing/PricingPlanCard";
import AdditionalServices from "./pricing/AdditionalServices";
import PricingCTA from "./pricing/PricingCTA";

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
          {pricingPlans.map((plan) => (
            <PricingPlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        {/* Дополнительные услуги */}
        <AdditionalServices />

        {/* CTA секция */}
        <PricingCTA />
      </div>
    </section>
  );
}
