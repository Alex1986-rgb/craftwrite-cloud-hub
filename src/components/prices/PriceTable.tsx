
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Star, Zap, Crown } from "lucide-react";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";

const pricingPlans = [
  {
    name: "Стартовый",
    price: "от 2 000",
    period: "за проект",
    description: "Идеально для небольших задач",
    icon: Zap,
    color: "blue",
    popular: false,
    features: [
      "SEO-статья до 3000 знаков",
      "Описание товаров (до 5 шт)",
      "Посты для соцсетей (до 10 шт)",
      "1 раунд правок",
      "Базовая SEO-оптимизация",
      "Срок выполнения: 3-5 дней"
    ],
    priceId: "price_starter"
  },
  {
    name: "Профессиональный",
    price: "от 8 000",
    period: "за проект",
    description: "Для серьезного бизнеса",
    icon: Star,
    color: "emerald",
    popular: true,
    features: [
      "Все из тарифа 'Стартовый'",
      "Лендинг или многостраничник",
      "Email-кампания (до 5 писем)",
      "Продающие тексты",
      "3 раунда правок",
      "Расширенная SEO-оптимизация",
      "Аналитика конкурентов",
      "Срок выполнения: 5-7 дней"
    ],
    priceId: "price_professional"
  },
  {
    name: "Корпоративный",
    price: "от 25 000",
    period: "за проект",
    description: "Для крупных компаний",
    icon: Crown,
    color: "purple",
    popular: false,
    features: [
      "Все из тарифа 'Профессиональный'",
      "Контент-стратегия",
      "Безлимитные правки",
      "Персональный менеджер",
      "Приоритетная поддержка",
      "Брендинг и тон голоса",
      "Многоязычный контент",
      "Срок выполнения: 3-5 дней"
    ],
    priceId: "price_enterprise"
  }
];

export default function PriceTable() {
  const { createCheckoutSession, loading } = useStripeCheckout();

  const handleGetStarted = async (priceId: string) => {
    await createCheckoutSession({
      priceId,
      successUrl: `${window.location.origin}/payment-success`,
      cancelUrl: `${window.location.origin}/prices`
    });
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Выберите подходящий тариф
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Прозрачные цены для проектов любого масштаба. Начните с базового тарифа или выберите расширенные возможности
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card
                key={plan.name}
                className={`relative p-8 ${
                  plan.popular
                    ? "border-2 border-emerald-400 shadow-2xl scale-105"
                    : "border border-slate-200 shadow-lg"
                } bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Популярный выбор
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${
                    plan.color === 'blue' ? 'from-blue-100 to-blue-200' :
                    plan.color === 'emerald' ? 'from-emerald-100 to-emerald-200' :
                    'from-purple-100 to-purple-200'
                  } mb-4`}>
                    <IconComponent className={`w-8 h-8 ${
                      plan.color === 'blue' ? 'text-blue-600' :
                      plan.color === 'emerald' ? 'text-emerald-600' :
                      'text-purple-600'
                    }`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-slate-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-black">{plan.price}</span>
                    <span className="text-slate-600 ml-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleGetStarted(plan.priceId)}
                  disabled={loading}
                  className={`w-full py-4 font-bold ${
                    plan.popular
                      ? "bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                      : "bg-slate-900 hover:bg-slate-800"
                  }`}
                  size="lg"
                >
                  Заказать сейчас
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">
            Нужно что-то особенное? Мы создаем индивидуальные решения
          </p>
          <Button variant="outline" size="lg" className="border-2">
            Обсудить индивидуальный проект
          </Button>
        </div>
      </div>
    </section>
  );
}
