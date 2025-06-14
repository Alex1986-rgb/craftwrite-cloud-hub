
import { Card } from "@/components/ui/card";
import { Check, X, Star } from "lucide-react";

const comparisonData = {
  features: [
    "Профессиональные копирайтеры",
    "Проверка уникальности",
    "SEO-оптимизация",
    "Бесплатные правки",
    "Персональный менеджер",
    "Гарантия сроков",
    "Техническая поддержка 24/7",
    "Аналитика эффективности",
    "Многоязычный контент",
    "Брендинг и стиль"
  ],
  competitors: [
    {
      name: "Фрилансеры",
      price: "от 500 ₽",
      color: "red",
      features: [true, false, false, false, false, false, false, false, false, false]
    },
    {
      name: "Агентства",
      price: "от 15 000 ₽",
      color: "amber",
      features: [true, true, true, true, false, true, false, false, true, true]
    },
    {
      name: "CopyPro Cloud",
      price: "от 2 000 ₽",
      color: "emerald",
      isOurs: true,
      features: [true, true, true, true, true, true, true, true, true, true]
    }
  ]
};

export default function PriceComparison() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Сравнение с конкурентами
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Убедитесь сами: мы предлагаем лучшее соотношение цены и качества на рынке
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="p-4">
                  <h3 className="text-xl font-bold">Возможности</h3>
                </div>
                {comparisonData.competitors.map((competitor, index) => (
                  <Card
                    key={index}
                    className={`p-6 text-center relative ${
                      competitor.isOurs 
                        ? "border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-blue-50" 
                        : "bg-white"
                    }`}
                  >
                    {competitor.isOurs && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                          Рекомендуем
                        </span>
                      </div>
                    )}
                    <h4 className="text-xl font-bold mb-2">{competitor.name}</h4>
                    <p className={`text-2xl font-black ${
                      competitor.color === 'red' ? 'text-red-600' :
                      competitor.color === 'amber' ? 'text-amber-600' :
                      'text-emerald-600'
                    }`}>
                      {competitor.price}
                    </p>
                  </Card>
                ))}
              </div>

              {/* Feature comparison */}
              <div className="space-y-2">
                {comparisonData.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="grid grid-cols-4 gap-4 items-center py-3 border-b border-slate-100">
                    <div className="p-2">
                      <span className="font-medium">{feature}</span>
                    </div>
                    {comparisonData.competitors.map((competitor, compIndex) => (
                      <div key={compIndex} className="text-center p-2">
                        {competitor.features[featureIndex] ? (
                          <Check className={`w-6 h-6 mx-auto ${
                            competitor.isOurs ? 'text-emerald-600' : 'text-green-500'
                          }`} />
                        ) : (
                          <X className="w-6 h-6 mx-auto text-red-400" />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-8 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-200">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6 text-emerald-600" />
                  <h4 className="text-xl font-bold text-emerald-800">Почему выбирают нас:</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-emerald-700">
                  <div>
                    <strong>Оптимальная цена:</strong> В 3-5 раз дешевле агентств при том же качестве
                  </div>
                  <div>
                    <strong>Надежность:</strong> В отличие от фрилансеров, гарантируем сроки и качество
                  </div>
                  <div>
                    <strong>Полный сервис:</strong> Все услуги в одном месте с единым стандартом качества
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
