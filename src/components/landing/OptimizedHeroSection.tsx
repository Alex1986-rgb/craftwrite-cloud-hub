
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
    { icon: Shield, text: "100% уникальность", color: "text-green-600" },
    { icon: Award, text: "50+ экспертов", color: "text-blue-600" },
    { icon: Zap, text: "От 24 часов", color: "text-purple-600" },
    { icon: Target, text: "SEO ТОП-10", color: "text-orange-600" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 overflow-hidden">
      {/* Enhanced background with performance optimization */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {!isMobile && (
          <>
            <div className="absolute top-1/4 left-1/6 w-64 h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/6 w-80 h-80 lg:w-[500px] lg:h-[500px] bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          </>
        )}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 lg:w-[600px] lg:h-[600px] bg-gradient-to-r from-emerald-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center px-3 sm:px-4 lg:px-6">
        {/* Urgency Badge */}
        <div className={`flex justify-center mb-3 sm:mb-4 lg:mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 text-xs sm:text-sm lg:text-base animate-pulse">
            <Timer className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2" />
            Осталось {urgencySlots} слота на эту неделю
          </Badge>
        </div>

        {/* Premium badge */}
        <div className={`flex justify-center mb-4 sm:mb-6 lg:mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-1 sm:gap-2 lg:gap-3 px-3 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-blue-200/30 text-blue-800 font-semibold text-xs sm:text-sm lg:text-lg shadow-lg">
            <Award className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-blue-600 flex-shrink-0" />
            <span className="text-center">Премиальная платформа копирайтинга #1</span>
          </div>
        </div>

        {/* Enhanced main heading with desktop-first typography */}
        <div className={`transition-all duration-1200 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black text-slate-900 leading-tight mb-4 sm:mb-6 lg:mb-8">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-shimmer block">
              CopyPro
            </span>
            <span className="text-slate-800 block mt-1 sm:mt-2">Cloud</span>
          </h1>
          <div className="text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl font-medium text-slate-600 mt-3 sm:mt-4 lg:mt-6 max-w-5xl mx-auto">
            Профессиональные тексты, которые продают
            <div className="text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl text-blue-600 font-semibold mt-2 sm:mt-2 lg:mt-4">
              От 500₽ за текст • Готово за 24 часа • Гарантия результата
            </div>
          </div>
        </div>

        {/* Enhanced value proposition */}
        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl text-slate-700 mb-6 sm:mb-8 lg:mb-12 max-w-6xl mx-auto leading-relaxed font-medium">
            Команда из <span className="font-bold text-blue-600">50+ экспертов</span> создает SEO-тексты, 
            продающие лендинги и контент для соцсетей с 
            <span className="font-bold text-green-600"> гарантией результата</span>
          </p>
        </div>

        {/* Rotating features showcase - desktop optimized */}
        <div className={`mb-6 sm:mb-8 lg:mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="flex justify-center px-2">
            <div className="grid grid-cols-2 lg:flex lg:items-center gap-2 sm:gap-3 lg:gap-6 p-3 sm:px-8 sm:py-4 lg:px-12 lg:py-6 bg-white/90 backdrop-blur-lg rounded-2xl lg:rounded-3xl shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-500 max-w-full">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className={`flex flex-col lg:flex-row items-center gap-1 sm:gap-2 lg:gap-3 px-2 sm:px-4 lg:px-6 py-2 lg:py-3 rounded-xl lg:rounded-2xl transition-all duration-500 text-center lg:text-left min-h-[60px] lg:min-h-auto touch-target ${
                      activeFeature === index 
                        ? `bg-gradient-to-r from-blue-50 to-purple-50 ${feature.color} scale-105 shadow-md` 
                        : 'text-slate-500 opacity-60'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 flex-shrink-0" />
                    <span className="text-xs sm:text-sm lg:text-base xl:text-lg font-medium leading-tight">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enhanced metrics with desktop grid */}
        <div className={`mb-8 sm:mb-10 lg:mb-16 transition-all duration-1200 delay-600 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-slate-200/50 touch-target">
              <div className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-blue-600 mb-1 sm:mb-2 lg:mb-3 animate-pulse-glow">{animatedNumber}+</div>
              <div className="text-xs sm:text-sm lg:text-base xl:text-lg text-slate-600 font-medium">проектов</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-slate-200/50 touch-target">
              <div className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-green-600 mb-1 sm:mb-2 lg:mb-3">100%</div>
              <div className="text-xs sm:text-sm lg:text-base xl:text-lg text-slate-600 font-medium">уникальность</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-slate-200/50 touch-target">
              <div className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-purple-600 mb-1 sm:mb-2 lg:mb-3">50+</div>
              <div className="text-xs sm:text-sm lg:text-base xl:text-lg text-slate-600 font-medium">экспертов</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-slate-200/50 touch-target">
              <div className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-orange-600 mb-1 sm:mb-2 lg:mb-3 flex items-center justify-center gap-1 lg:gap-2">
                24ч
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-orange-500" />
              </div>
              <div className="text-xs sm:text-sm lg:text-base xl:text-lg text-slate-600 font-medium">доставка</div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA section with desktop scaling */}
        <div className={`flex flex-col lg:flex-row gap-3 sm:gap-6 lg:gap-8 justify-center items-stretch lg:items-center mb-8 sm:mb-10 lg:mb-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Button 
            size="lg" 
            className="group relative w-full lg:w-auto px-6 sm:px-14 lg:px-20 py-4 sm:py-6 lg:py-8 rounded-2xl lg:rounded-3xl text-base sm:text-lg lg:text-2xl xl:text-3xl font-bold shadow-2xl hover:shadow-glow transition-all duration-500 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 hover:from-blue-400 hover:via-purple-400 hover:to-blue-500 border-0 hover:scale-110 will-change-transform overflow-hidden touch-target" 
            asChild
          >
            <Link to="/order" className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 relative z-10">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 animate-pulse flex-shrink-0" />
              <div className="flex flex-col items-center">
                <span>Заказать от 500₽</span>
                <span className="text-xs lg:text-sm opacity-90">Быстрый старт за 24ч</span>
              </div>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 group-hover:translate-x-3 transition-transform duration-500 flex-shrink-0" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="group w-full lg:w-auto px-6 sm:px-12 lg:px-16 py-4 sm:py-6 lg:py-8 rounded-2xl lg:rounded-3xl text-base sm:text-lg lg:text-xl xl:text-2xl font-bold bg-white/90 backdrop-blur-lg border-2 border-slate-300 hover:border-blue-400 transition-all duration-500 hover:scale-105 hover:shadow-xl touch-target"
            asChild
          >
            <Link to="#quick-order" className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4">
              <PlayCircle className="w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0" />
              <span>Быстрый заказ</span>
              <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
            </Link>
          </Button>
        </div>

        {/* Trust indicators with desktop optimization */}
        <div className={`transition-all duration-1200 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Client trust logos */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <div className="text-xs sm:text-sm lg:text-base xl:text-lg text-slate-500 mb-2 sm:mb-3 lg:mb-4">Нам доверяют:</div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 lg:gap-8">
              {clientLogos.map((client, index) => (
                <div key={index} className={`font-bold text-sm sm:text-lg lg:text-2xl xl:text-3xl ${client.color} opacity-60 hover:opacity-100 transition-opacity`}>
                  {client.name}
                </div>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 px-3 sm:px-4 lg:px-6 py-3 lg:py-4 bg-white/60 backdrop-blur-md rounded-xl lg:rounded-2xl border border-green-200/50 touch-target">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm lg:text-base xl:text-lg font-medium text-slate-700">Правки 30 дней</span>
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 px-3 sm:px-4 lg:px-6 py-3 lg:py-4 bg-white/60 backdrop-blur-md rounded-xl lg:rounded-2xl border border-blue-200/50 touch-target">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm lg:text-base xl:text-lg font-medium text-slate-700">Портфолио работ</span>
            </div>
            <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 px-3 sm:px-4 lg:px-6 py-3 lg:py-4 bg-white/60 backdrop-blur-md rounded-xl lg:rounded-2xl border border-purple-200/50 touch-target">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm lg:text-base xl:text-lg font-medium text-slate-700">Договор + НДС</span>
            </div>
          </div>
        </div>

        {/* Social proof banner */}
        <div className={`mt-8 sm:mt-12 lg:mt-16 transition-all duration-1400 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 sm:gap-3 lg:gap-4 px-3 sm:px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full lg:rounded-2xl border border-green-200/50 shadow-lg">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white flex items-center justify-center text-white text-xs lg:text-base font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="text-xs sm:text-sm lg:text-base xl:text-lg font-medium text-green-800">
              <span className="font-bold">2000+</span> довольных клиентов
            </div>
            <Star className="w-4 h-4 lg:w-6 lg:h-6 text-yellow-500 fill-current flex-shrink-0" />
          </div>
        </div>

        {/* Payment info badge */}
        <div className="mt-4 sm:mt-6 lg:mt-8 max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-blue-200/50">
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <Percent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600 flex-shrink-0" />
              <div className="text-left">
                <div className="text-sm lg:text-base xl:text-lg font-bold text-blue-800">50% предоплата</div>
                <div className="text-xs lg:text-sm xl:text-base text-blue-600">Остальное после проверки</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
