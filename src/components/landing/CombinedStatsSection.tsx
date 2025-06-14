
import { Users, Star, Award, Clock, Shield, Zap, TrendingUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const stats = [
  { icon: Users, value: "30+", label: "экспертов", color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
  { icon: Star, value: "2000+", label: "проектов", color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" },
  { icon: Award, value: "100%", label: "уникальность", color: "text-purple-600", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
  { icon: Clock, value: "24ч", label: "от заказа", color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
];

const trustFeatures = [
  {
    icon: Shield,
    title: "Гарантия качества",
    description: "100% уникальность по Text.ru с официальным отчетом",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    icon: Zap,
    title: "Быстрое выполнение", 
    description: "От 24 часов до готового премиального контента",
    gradient: "from-green-500 to-blue-500"
  },
  {
    icon: TrendingUp,
    title: "Экспертная команда",
    description: "30+ дипломированных специалистов с опытом 5+ лет",
    gradient: "from-purple-500 to-pink-500"
  }
];

const CombinedStatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState([0, 0, 100, 24]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate numbers
          const timers = [
            setTimeout(() => {
              let count = 0;
              const timer = setInterval(() => {
                count += 1;
                setAnimatedValues(prev => [count, prev[1], prev[2], prev[3]]);
                if (count >= 30) clearInterval(timer);
              }, 50);
            }, 200),
            setTimeout(() => {
              let count = 0;
              const timer = setInterval(() => {
                count += 50;
                setAnimatedValues(prev => [prev[0], count, prev[2], prev[3]]);
                if (count >= 2000) clearInterval(timer);
              }, 30);
            }, 400),
          ];
          return () => timers.forEach(clearTimeout);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Enhanced statistics with better animations */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center group cursor-pointer"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl ${stat.bgColor} border ${stat.borderColor} flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-glow`}>
                <stat.icon className={`w-10 h-10 ${stat.color}`} />
              </div>
              <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {index === 0 ? `${animatedValues[0]}+` :
                 index === 1 ? `${animatedValues[1]}+` :
                 index === 2 ? `${animatedValues[2]}%` :
                 `${animatedValues[3]}ч`}
              </div>
              <div className="text-slate-600 font-semibold tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced trust features with better animations */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1200 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {trustFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-8 rounded-3xl bg-white/80 backdrop-blur-lg border border-slate-200/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden relative"
              style={{ animationDelay: `${(index + 4) * 200}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
              
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                {feature.description}
              </p>
              
              {/* Subtle border animation */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/20 transition-colors duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CombinedStatsSection;
