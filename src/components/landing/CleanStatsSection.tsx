import React from "react";
import { TrendingUp, Users, Shield, Clock } from "lucide-react";

const CleanStatsSection = () => {
  const stats = [
    {
      icon: TrendingUp,
      number: "5000+",
      label: "Выполненных заказов",
      description: "За 5 лет работы"
    },
    {
      icon: Shield,
      number: "100%",
      label: "Уникальность",
      description: "Проверка по Text.ru"
    },
    {
      icon: Clock,
      number: "24ч",
      label: "Минимальный срок",
      description: "Без потери качества"
    },
    {
      icon: Users,
      number: "50+",
      label: "Экспертов в команде",
      description: "Средний опыт 5+ лет"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Мы помогли 1000+ компаниям увеличить продажи с помощью качественного контента
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {stat.number}
                </div>
                
                <div className="text-lg font-semibold text-slate-900 mb-1">
                  {stat.label}
                </div>
                
                <div className="text-sm text-slate-600">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Simple guarantee */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-lg shadow-sm border border-slate-200">
            <Shield className="w-6 h-6 text-green-600" />
            <span className="text-lg font-semibold text-slate-900">
              Официальные ссылки на проверки уникальности
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CleanStatsSection;