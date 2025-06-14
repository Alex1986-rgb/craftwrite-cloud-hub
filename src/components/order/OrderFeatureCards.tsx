
import { Zap, Star, Shield, Target } from "lucide-react";

export default function OrderFeatureCards() {
  const features = [
    {
      icon: Zap,
      title: "Быстрое оформление",
      description: "Заказ за 5 минут",
      gradient: "from-green-50 to-emerald-50",
      border: "border-green-200/50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      titleColor: "text-green-800",
      descColor: "text-green-600"
    },
    {
      icon: Star,
      title: "Высокое качество",
      description: "10 000+ довольных клиентов",
      gradient: "from-blue-50 to-cyan-50",
      border: "border-blue-200/50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      titleColor: "text-blue-800",
      descColor: "text-blue-600"
    },
    {
      icon: Shield,
      title: "Гарантия качества",
      description: "14 дней на правки",
      gradient: "from-purple-50 to-pink-50",
      border: "border-purple-200/50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      titleColor: "text-purple-800",
      descColor: "text-purple-600"
    },
    {
      icon: Target,
      title: "Точность попадания",
      description: "98% успешных проектов",
      gradient: "from-orange-50 to-red-50",
      border: "border-orange-200/50",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      titleColor: "text-orange-800",
      descColor: "text-orange-600"
    }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6" aria-label="Преимущества нашего сервиса">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div
            key={index}
            className={`flex items-center gap-3 p-4 bg-gradient-to-r ${feature.gradient} rounded-xl border ${feature.border} hover:shadow-lg transition-all duration-300`}
          >
            <div className={`w-12 h-12 ${feature.iconBg} rounded-full flex items-center justify-center`} aria-hidden="true">
              <Icon className={`w-6 h-6 ${feature.iconColor}`} />
            </div>
            <div>
              <div className={`font-semibold ${feature.titleColor}`}>{feature.title}</div>
              <div className={`text-sm ${feature.descColor}`}>{feature.description}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
