import React, { useState, useEffect, useRef } from "react";
import { TrendingUp, Users, Award, Shield, CheckCircle, Star, Zap, Target, Globe, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AnimatedStatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    experts: 0,
    projects: 0,
    uniqueness: 0,
    growth: 0
  });
  const sectionRef = useRef(null);

  const stats = [
    {
      id: 'experts',
      icon: Users,
      target: 52,
      suffix: '',
      label: "Элитных экспертов",
      description: "Каждый специалист с дипломом и опытом 5+ лет",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      details: ["Профильное образование", "Сертификаты", "Постоянное обучение"]
    },
    {
      id: 'projects',
      icon: Award,
      target: 2000,
      suffix: '+',
      label: "Успешных проектов",
      description: "Реализованных заказов с ростом продаж клиентов",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      details: ["ROI 300-800%", "B2B и B2C", "Все ниши рынка"]
    },
    {
      id: 'uniqueness',
      icon: Shield,
      target: 100,
      suffix: '%',
      label: "Гарантия уникальности",
      description: "Проверка Text.ru + официальные ссылки",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      details: ["Text.ru проверка", "Антиплагиат", "Отчеты клиенту"]
    },
    {
      id: 'growth',
      icon: TrendingUp,
      target: 180,
      suffix: '%',
      label: "Рост конверсии",
      description: "Максимальный зафиксированный результат",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      details: ["Средний +65%", "До +180%", "Доказанный ROI"]
    }
  ];

  const achievements = [
    {
      icon: Star,
      title: "Топ-3 в рейтинге",
      description: "Лидер рынка SEO-копирайтинга",
      color: "text-yellow-500"
    },
    {
      icon: Zap,
      title: "24-часовая доставка",
      description: "Экспресс-выполнение заказов",
      color: "text-purple-500"
    },
    {
      icon: Target,
      title: "Точное попадание в ТЗ",
      description: "100% соответствие требованиям",
      color: "text-blue-500"
    },
    {
      icon: Globe,
      title: "Международный опыт",
      description: "Работаем с клиентами из 15 стран",
      color: "text-green-500"
    }
  ];

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animate numbers when visible
  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 FPS
      const stepDuration = duration / steps;

      stats.forEach((stat) => {
        let currentStep = 0;
        const increment = stat.target / steps;

        const timer = setInterval(() => {
          currentStep++;
          const currentValue = Math.min(increment * currentStep, stat.target);
          
          setAnimatedStats(prev => ({
            ...prev,
            [stat.id]: Math.round(currentValue)
          }));

          if (currentStep >= steps) {
            clearInterval(timer);
          }
        }, stepDuration);
      });
    }
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-blue-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-16 w-3 h-3 bg-purple-400/20 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-emerald-400/20 rounded-full animate-pulse"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-800 px-6 py-3 rounded-full text-sm font-bold mb-8 border border-blue-200/50 shadow-lg">
            <TrendingUp className="w-5 h-5" />
            Проверенные результаты
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Цифры, которые
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              говорят за нас
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            <span className="font-semibold text-blue-600">5 лет</span> работы на рынке, 
            <span className="font-semibold text-purple-600"> тысячи довольных клиентов</span> и 
            <span className="font-semibold text-green-600"> проверенные результаты</span>
          </p>
        </div>

        {/* Animated Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <Card 
              key={stat.id}
              className={`group text-center p-8 hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm hover:scale-105 hover:-translate-y-4 overflow-hidden relative cursor-pointer`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Card glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg`}></div>
              
              <CardContent className="pt-6 relative z-10">
                {/* Animated Icon */}
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${stat.gradient} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                
                {/* Animated Number */}
                <div className={`text-5xl font-black mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {animatedStats[stat.id]}{stat.suffix}
                </div>
                
                {/* Label and Description */}
                <h3 className="font-bold text-lg mb-3 group-hover:text-slate-900 transition-colors duration-300">
                  {stat.label}
                </h3>
                
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {stat.description}
                </p>

                {/* Details on hover */}
                <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {stat.details.map((detail, i) => (
                    <div key={i} className="flex items-center justify-center gap-2 text-xs text-slate-600">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="group flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className={`w-12 h-12 ${achievement.color} bg-current/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">{achievement.title}</div>
                <div className="text-xs text-slate-600">{achievement.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Clock className="w-8 h-8" />
              <div className="text-left">
                <div className="text-3xl font-black">Готовы начать?</div>
                <div className="text-blue-100">Первая консультация — бесплатно</div>
              </div>
            </div>
            
            <p className="text-blue-50 text-lg leading-relaxed max-w-2xl mx-auto">
              Присоединяйтесь к <span className="font-bold text-white">1000+ успешным компаниям</span>, 
              которые уже увеличили свои продажи с помощью нашего контента
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-slate-50 font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="#order">
                  <Zap className="w-5 h-5 mr-2" />
                  Получить консультацию
                </a>
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 font-bold px-8 py-4 rounded-2xl transition-all duration-300"
                asChild
              >
                <a href="/portfolio">
                  <Star className="w-5 h-5 mr-2" />
                  Посмотреть кейсы
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedStatsSection;