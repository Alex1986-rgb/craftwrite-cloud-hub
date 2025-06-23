
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Sparkles, 
  Star, 
  Users, 
  Clock, 
  TrendingUp, 
  Shield, 
  Award, 
  Zap, 
  Target, 
  CheckCircle, 
  PlayCircle,
  Timer,
  Percent
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Client logos for trust indicators
const clientLogos = [
  { name: "Сбер", color: "text-green-600" },
  { name: "Яндекс", color: "text-red-500" },
  { name: "МТС", color: "text-red-600" },
  { name: "ВТБ", color: "text-blue-600" },
];

export default function OptimizedHeroSection() {
  const [animatedNumber, setAnimatedNumber] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [urgencySlots, setUrgencySlots] = useState(3);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setAnimatedNumber(prev => prev < 2000 ? prev + 50 : 2000);
    }, 50);
    
    const featureTimer = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);

    // Simulate urgency countdown
    const urgencyTimer = setInterval(() => {
      setUrgencySlots(prev => prev > 1 ? prev - 1 : 5);
    }, 300000); // Change every 5 minutes
    
    return () => {
      clearInterval(timer);
      clearInterval(featureTimer);
      clearInterval(urgencyTimer);
    };
  }, []);

  const features = [
    { icon: Shield, text: "100% уникальность + отчет", color: "text-green-600" },
    { icon: Award, text: "50+ экспертов с опытом 5+ лет", color: "text-blue-600" },
    { icon: Zap, text: "Доставка от 24 часов", color: "text-purple-600" },
    { icon: Target, text: "SEO под ТОП-10 выдачи", color: "text-orange-600" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 overflow-hidden mobile-safe-area">
      {/* Enhanced background with performance optimization */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {!isMobile && (
          <>
            <div className="absolute top-1/4 left-1/6 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/6 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          </>
        )}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[600px] sm:h-[600px] bg-gradient-to-r from-emerald-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center px-4 sm:px-6">
        {/* Urgency Badge */}
        <div className={`flex justify-center mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 px-4 py-2 animate-pulse">
            <Timer className="w-4 h-4 mr-2" />
            Осталось {urgencySlots} слота на эту неделю
          </Badge>
        </div>

        {/* Premium badge */}
        <div className={`flex justify-center mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-blue-200/30 text-blue-800 font-semibold text-sm shadow-lg">
            <Award className="w-4 h-4 text-blue-600" />
            <span>Премиальная платформа копирайтинга #1 в России</span>
          </div>
        </div>

        {/* Enhanced main heading with better mobile typography */}
        <div className={`transition-all duration-1200 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 text-slate-900 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-shimmer">
              CopyPro
            </span>
            <span className="text-slate-800 block mt-2">Cloud</span>
          </h1>
          <div className="text-lg sm:text-xl md:text-2xl font-medium text-slate-600 mt-4 max-w-3xl mx-auto">
            Профессиональные тексты, которые продают
            <div className="text-base sm:text-lg text-blue-600 font-semibold mt-2">
              От 500₽ за текст • Готово за 24 часа • Гарантия результата
            </div>
          </div>
        </div>

        {/* Enhanced value proposition with pricing */}
        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-700 mb-8 max-w-4xl mx-auto leading-relaxed font-medium">
            Команда из <span className="font-bold text-blue-600">50+ экспертов</span> создает SEO-тексты, 
            продающие лендинги и контент для соцсетей с 
            <span className="font-bold text-green-600"> гарантией результата</span>
          </p>
        </div>

        {/* Rotating features showcase - optimized for mobile */}
        <div className={`mb-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-4 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-500 overflow-x-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-2 px-2 sm:px-4 py-2 rounded-xl transition-all duration-500 whitespace-nowrap ${
                      activeFeature === index 
                        ? `bg-gradient-to-r from-blue-50 to-purple-50 ${feature.color} scale-105 shadow-md` 
                        : 'text-slate-500 opacity-60'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enhanced metrics with mobile optimization */}
        <div className={`mb-10 transition-all duration-1200 delay-600 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-3 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-slate-200/50">
              <div className="text-xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2 animate-pulse-glow">{animatedNumber}+</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">проектов</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-3 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-slate-200/50">
              <div className="text-xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">100%</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">уникальность</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-3 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-slate-200/50">
              <div className="text-xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">50+</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">экспертов</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-3 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-slate-200/50">
              <div className="text-xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2 flex items-center justify-center gap-1">
                24ч
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">доставка</div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA section with pricing */}
        <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center mb-10 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Button 
            size="lg" 
            className="group relative mobile-button px-8 sm:px-14 py-5 sm:py-6 rounded-2xl text-base sm:text-lg font-bold shadow-2xl hover:shadow-glow transition-all duration-500 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 hover:from-blue-400 hover:via-purple-400 hover:to-blue-500 border-0 hover:scale-110 will-change-transform overflow-hidden touch-target" 
            asChild
          >
            <Link to="/order" className="flex items-center justify-center gap-3 relative z-10">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
              <div className="flex flex-col items-center">
                <span>Заказать от 500₽</span>
                <span className="text-xs opacity-90">Быстрый старт за 24ч</span>
              </div>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-3 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="group mobile-button px-6 sm:px-12 py-5 sm:py-6 rounded-2xl text-base sm:text-lg font-bold bg-white/90 backdrop-blur-lg border-2 border-slate-300 hover:border-blue-400 transition-all duration-500 hover:scale-105 hover:shadow-xl touch-target"
            asChild
          >
            <Link to="#quick-order" className="flex items-center justify-center gap-3">
              <PlayCircle className="w-5 h-5" />
              <span>Быстрый заказ</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>

        {/* Trust indicators with client logos */}
        <div className={`transition-all duration-1200 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Client trust logos */}
          <div className="mb-6">
            <div className="text-sm text-slate-500 mb-3">Нам доверяют:</div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {clientLogos.map((client, index) => (
                <div key={index} className={`font-bold text-lg ${client.color} opacity-60 hover:opacity-100 transition-opacity`}>
                  {client.name}
                </div>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 bg-white/60 backdrop-blur-md rounded-xl border border-green-200/50">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-700">Правки 30 дней</span>
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 bg-white/60 backdrop-blur-md rounded-xl border border-blue-200/50">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-700">Портфолио работ</span>
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 bg-white/60 backdrop-blur-md rounded-xl border border-purple-200/50">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-700">Договор + НДС</span>
            </div>
          </div>
        </div>

        {/* Social proof banner with live activity */}
        <div className={`mt-12 transition-all duration-1400 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-3 px-4 sm:px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200/50 shadow-lg">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="text-xs sm:text-sm font-medium text-green-800">
              <span className="font-bold">2000+</span> довольных клиентов
            </div>
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
          </div>
        </div>

        {/* Payment info badge */}
        <div className="mt-6 max-w-md mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 sm:p-4 border border-blue-200/50">
            <div className="flex items-center gap-3">
              <Percent className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div className="text-left">
                <div className="text-sm font-bold text-blue-800">50% предоплата</div>
                <div className="text-xs text-blue-600">Остальное после проверки</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
