
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Базовый",
    price: "от 500₽",
    description: "Для небольших задач",
    features: [
      "SEO-статьи до 3000 символов",
      "Базовая оптимизация",
      "Проверка на уникальность",
      "Срок: 1-2 дня"
    ]
  },
  {
    name: "Профессиональный",
    price: "от 1500₽",
    description: "Для серьёзных проектов",
    features: [
      "SEO-статьи до 8000 символов",
      "Глубокая оптимизация",
      "LSI-слова",
      "Мета-теги",
      "Срок: 1-3 дня"
    ],
    popular: true
  },
  {
    name: "Корпоративный",
    price: "от 3000₽",
    description: "Для крупного бизнеса",
    features: [
      "Любой объём текста",
      "Экспертная проработка",
      "Технические тексты",
      "Консультация специалиста",
      "Приоритетная поддержка"
    ]
  }
];

const Pricing = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Тарифы и цены</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Выберите подходящий тариф для ваших задач
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm">
                    Популярный
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-primary">{plan.price}</div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'} asChild>
                  <Link to="/order">Заказать</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
