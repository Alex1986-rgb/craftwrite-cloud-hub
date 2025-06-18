
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Award, RefreshCw, FileCheck, Users, CheckCircle, ArrowRight } from "lucide-react";

const guarantees = [
  {
    id: "uniqueness",
    icon: FileCheck,
    title: "100% уникальность",
    shortDesc: "Гарантия оригинальности",
    fullDesc: "Каждый текст проверяется через Text.ru, Advego и eTXT. Уникальность не менее 95%. При несоответствии - полный возврат средств или бесплатная переработка.",
    features: [
      "Проверка по 3 сервисам",
      "Отчеты об уникальности",
      "Гарантия 95%+",
      "Возврат при несоответствии"
    ],
    color: "blue"
  },
  {
    id: "timing",
    icon: Clock,
    title: "Сроки выполнения",
    shortDesc: "От 24 часов",
    fullDesc: "Стандартные заказы выполняем за 24-72 часа. Срочные - за 12-24 часа с доплатой 50%. При нарушении сроков по нашей вине - скидка 20% на текущий заказ.",
    features: [
      "Стандарт: 24-72 часа",
      "Срочно: 12-24 часа",
      "Скидка при опоздании",
      "Онлайн-трекинг прогресса"
    ],
    color: "green"
  },
  {
    id: "quality",
    icon: Award,
    title: "Качество контента",
    shortDesc: "Экспертный уровень",
    fullDesc: "Команда из дипломированных копирайтеров с опытом 5+ лет. Многоступенчатая проверка качества. Бесплатные правки в течение 30 дней.",
    features: [
      "Дипломированные эксперты",
      "Опыт команды 5+ лет",
      "Многоступенчатая проверка",
      "30 дней на правки"
    ],
    color: "purple"
  },
  {
    id: "revisions",
    icon: RefreshCw,
    title: "Правки и доработки",
    shortDesc: "30 дней бесплатно",
    fullDesc: "Неограниченное количество правок в течение 30 дней после сдачи проекта. Мажорные изменения ТЗ оплачиваются отдельно по согласованию.",
    features: [
      "30 дней бесплатных правок",
      "Неограниченное количество",
      "Быстрое внесение изменений",
      "Мажорные правки по согласованию"
    ],
    color: "orange"
  }
];

export default function InteractiveGuaranteesSection() {
  const [activeGuarantee, setActiveGuarantee] = useState(guarantees[0].id);

  const activeItem = guarantees.find(g => g.id === activeGuarantee) || guarantees[0];

  const getColorClasses = (color: string, isActive = false) => {
    const colors = {
      blue: isActive ? "border-blue-500 bg-blue-50 text-blue-700" : "border-blue-200 hover:border-blue-300 text-blue-600",
      green: isActive ? "border-green-500 bg-green-50 text-green-700" : "border-green-200 hover:border-green-300 text-green-600",
      purple: isActive ? "border-purple-500 bg-purple-50 text-purple-700" : "border-purple-200 hover:border-purple-300 text-purple-600",
      orange: isActive ? "border-orange-500 bg-orange-50 text-orange-700" : "border-orange-200 hover:border-orange-300 text-orange-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Shield className="w-4 h-4 mr-2" />
            Гарантии качества
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
            Наши обязательства перед клиентами
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Мы берем на себя полную ответственность за качество, сроки и результат. 
            Ваша уверенность в сотрудничестве - наш главный приоритет.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Guarantee Tabs */}
            <div className="space-y-4">
              {guarantees.map((guarantee) => (
                <Card
                  key={guarantee.id}
                  className={`p-6 cursor-pointer transition-all duration-300 border-2 ${
                    getColorClasses(guarantee.color, activeGuarantee === guarantee.id)
                  }`}
                  onClick={() => setActiveGuarantee(guarantee.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      activeGuarantee === guarantee.id 
                        ? `bg-${guarantee.color}-100` 
                        : `bg-${guarantee.color}-50`
                    }`}>
                      <guarantee.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-800 mb-1">
                        {guarantee.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {guarantee.shortDesc}
                      </p>
                      {activeGuarantee === guarantee.id && (
                        <ArrowRight className="w-4 h-4 mt-2 text-current" />
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Active Guarantee Details */}
            <div className="lg:col-span-2">
              <Card className="p-8 h-full bg-gradient-to-br from-white to-slate-50/50 border-0 shadow-xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r from-${activeItem.color}-500 to-${activeItem.color}-600 rounded-2xl flex items-center justify-center`}>
                    <activeItem.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">
                      {activeItem.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {activeItem.fullDesc}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <h4 className="font-semibold text-slate-800 mb-4">
                    Что входит в гарантию:
                  </h4>
                  {activeItem.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className={`w-5 h-5 text-${activeItem.color}-500 flex-shrink-0`} />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className={`p-4 bg-gradient-to-r from-${activeItem.color}-50 to-${activeItem.color}-100/50 rounded-xl border border-${activeItem.color}-200/50`}>
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className={`w-5 h-5 text-${activeItem.color}-600`} />
                    <span className={`font-semibold text-${activeItem.color}-800`}>
                      Юридическая защита
                    </span>
                  </div>
                  <p className={`text-sm text-${activeItem.color}-700`}>
                    Все гарантии закреплены в договоре. При нарушении обязательств предусмотрена компенсация.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
              <div className="text-sm text-slate-600">Соблюдение гарантий</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-green-600 mb-1">5000+</div>
              <div className="text-sm text-slate-600">Довольных клиентов</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-purple-600 mb-1">98%</div>
              <div className="text-sm text-slate-600">Возвращаются к нам</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-orange-600 mb-1">24/7</div>
              <div className="text-sm text-slate-600">Поддержка клиентов</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
