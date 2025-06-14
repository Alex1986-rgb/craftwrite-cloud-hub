
import { Users, Star, Award, Clock, Shield, Zap } from "lucide-react";

const stats = [
  { icon: Users, value: "30+", label: "экспертов", color: "text-blue-600" },
  { icon: Star, value: "2000+", label: "проектов", color: "text-green-600" },
  { icon: Award, value: "100%", label: "уникальность", color: "text-purple-600" },
  { icon: Clock, value: "24ч", label: "от заказа", color: "text-orange-600" },
];

const trustFeatures = [
  {
    icon: Shield,
    title: "Гарантия качества",
    description: "100% уникальность по Text.ru"
  },
  {
    icon: Zap,
    title: "Быстрое выполнение", 
    description: "От 24 часов до готового контента"
  },
  {
    icon: Award,
    title: "Экспертная команда",
    description: "30+ дипломированных специалистов"
  }
];

const CombinedStatsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-slate-600 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Доверие */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50/50 to-purple-50/30 border border-slate-200/50 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CombinedStatsSection;
