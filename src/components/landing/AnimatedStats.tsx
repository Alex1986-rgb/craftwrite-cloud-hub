
import { TrendingUp, Users, Shield, Clock, FileCheck, Award } from "lucide-react";
import { useState, useEffect } from "react";

const AnimatedStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    orders: 0,
    uniqueness: 0,
    hours: 0,
    experts: 0
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Анимация цифр
    const interval = setInterval(() => {
      setAnimatedNumbers(prev => ({
        orders: prev.orders < 2000 ? prev.orders + 50 : 2000,
        uniqueness: prev.uniqueness < 100 ? prev.uniqueness + 2 : 100,
        hours: prev.hours < 24 ? prev.hours + 1 : 24,
        experts: prev.experts < 30 ? prev.experts + 1 : 30
      }));
    }, 80);

    const timeout = setTimeout(() => clearInterval(interval), 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const stats = [
    {
      icon: TrendingUp,
      number: `${animatedNumbers.orders}+`,
      label: "Выполненных заказов",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50"
    },
    {
      icon: Shield,
      number: `${animatedNumbers.uniqueness}%`,
      label: "Уникальность статей",
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50"
    },
    {
      icon: Clock,
      number: `${animatedNumbers.hours}ч`,
      label: "Средний срок сдачи",
      gradient: "from-orange-500 to-amber-500",
      bgGradient: "from-orange-50 to-amber-50"
    },
    {
      icon: Users,
      number: `${animatedNumbers.experts}+`,
      label: "Экспертов в штате",
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-50 to-violet-50"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white to-slate-50/50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className={`group relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} rounded-3xl p-6 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50`}
              >
                {/* Декоративный элемент */}
                <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 bg-gradient-to-r ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                <div className={`text-3xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.number}
                </div>
                
                <div className="text-sm font-medium text-slate-700 leading-tight">
                  {stat.label}
                </div>

                {/* Блик при ховере */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12 group-hover:animate-shimmer transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Дополнительная информация */}
        <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-4 bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-lg rounded-2xl border border-blue-200/30 shadow-xl">
            <div className="flex items-center gap-3">
              <FileCheck className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold text-slate-800">
                Официальные ссылки на проверки
              </span>
            </div>
            
            <div className="hidden sm:block w-px h-6 bg-slate-300"></div>
            
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-emerald-600" />
              <span className="text-lg font-semibold text-slate-800">
                доступны по вашему заказу
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;
