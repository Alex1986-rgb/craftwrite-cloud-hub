
import { TrendingUp, Users, Shield, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const AnimatedStats = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      icon: TrendingUp,
      number: "2000+",
      label: "Выполненных заказов",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: Shield,
      number: "100%",
      label: "Уникальность статей",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      icon: Clock,
      number: "24ч",
      label: "Средний срок сдачи",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50"
    },
    {
      icon: Users,
      number: "30+",
      label: "Экспертов в штате",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className={`text-center transition-all duration-700 delay-${index * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${stat.bgColor} hover:scale-110 transition-transform duration-300`}>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-slate-900 mb-2 animate-pulse-glow">
                  {stat.number}
                </div>
                
                <div className="text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-slate-500 px-4 py-2 bg-slate-50 rounded-full inline-block border">
            Официальные ссылки на проверки доступны по вашему заказу
          </p>
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;
