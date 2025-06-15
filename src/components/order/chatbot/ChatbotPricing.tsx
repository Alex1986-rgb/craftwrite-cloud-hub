
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star } from 'lucide-react';

const PRICING_PLANS = [
  {
    name: 'Стартер',
    price: 2500,
    popular: false,
    description: 'Для небольших проектов',
    features: [
      'До 10 сценариев диалогов',
      'Базовая логика ветвления',
      'Простые ответы FAQ',
      'Техподдержка 1 месяц',
      'Инструкция по настройке'
    ],
    platforms: ['Telegram', 'WhatsApp'],
    deliveryTime: '3-5 дней'
  },
  {
    name: 'Бизнес',
    price: 5000,
    popular: true,
    description: 'Оптимальный выбор',
    features: [
      'До 25 сценариев диалогов',
      'Сложная логика и условия',
      'Интеграция с формами',
      'A/B тестирование скриптов',
      'Техподдержка 3 месяца',
      'Обучение команды'
    ],
    platforms: ['Все популярные платформы'],
    deliveryTime: '5-7 дней'
  },
  {
    name: 'Премиум',
    price: 8000,
    popular: false,
    description: 'Для крупного бизнеса',
    features: [
      'До 50 сценариев диалогов',
      'AI-готовность скриптов',
      'Многоязычная поддержка',
      'CRM интеграция',
      'Аналитика диалогов',
      'Техподдержка 6 месяцев',
      'Персональный менеджер'
    ],
    platforms: ['Все платформы + кастом'],
    deliveryTime: '7-10 дней'
  }
];

interface ChatbotPricingProps {
  onSelectPlan?: (plan: string) => void;
}

export default function ChatbotPricing({ onSelectPlan }: ChatbotPricingProps) {
  return (
    <section className="py-16 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Тарифы на разработку скриптов
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Выберите подходящий пакет в зависимости от сложности вашего проекта
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan, index) => (
            <Card
              key={index}
              className={`relative hover:shadow-xl transition-all duration-300 ${
                plan.popular
                  ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50'
                  : 'border bg-white hover:border-blue-200'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                  <Star className="w-3 h-3 mr-1" />
                  Популярный
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl text-slate-900">{plan.name}</CardTitle>
                <p className="text-slate-600 text-sm">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-blue-600">
                    {plan.price.toLocaleString()}₽
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Сроки: {plan.deliveryTime}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Что включено:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Платформы:</h4>
                  <p className="text-sm text-slate-600">{plan.platforms.join(', ')}</p>
                </div>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                      : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => onSelectPlan?.(plan.name)}
                >
                  Выбрать {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-slate-600 text-sm">
            Нужен индивидуальный расчет?{' '}
            <Button variant="link" className="p-0 h-auto text-blue-600">
              Связаться с менеджером
            </Button>
          </p>
        </div>
      </div>
    </section>
  );
}
