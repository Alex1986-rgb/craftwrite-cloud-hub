import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Star, Users, Clock, TrendingUp, Shield, Award, Zap, Target, CheckCircle, PlayCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ModernHeroSection = () => {
  const [animatedNumber, setAnimatedNumber] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setAnimatedNumber(prev => prev < 2000 ? prev + 50 : 2000);
    }, 50);
    
    // Cycling through features
    const featureTimer = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);
    
    return () => {
      clearInterval(timer);
      clearInterval(featureTimer);
    };
  }, []);

  const features = [
    { icon: Shield, text: "100% гарантия уникальности", color: "text-green-600" },
    { icon: Award, text: "50+ экспертов с опытом 5+ лет", color: "text-blue-600" },
    { icon: Zap, text: "Экспресс-доставка от 24 часов", color: "text-purple-600" },
    { icon: Target, text: "SEO-оптимизация под ТОП-10", color: "text-orange-600" }
  ];

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 overflow-hidden mobile-safe-area pt-16 pb-8">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className={`absolute top-1/4 left-1/6 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl ${!isMobile ? 'animate-float' : ''}`}></div>
        <div className={`absolute bottom-1/4 right-1/6 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl ${!isMobile ? 'animate-float' : ''}`} style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[600px] sm:h-[600px] bg-gradient-to-r from-emerald-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-ping"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center px-4 sm:px-6">
        {/* Premium badge */}
        <div className={`flex justify-center mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-blue-200/30 text-blue-800 font-semibold text-sm shadow-lg">
            <Award className="w-4 h-4 text-blue-600" />
            <span>Премиальная платформа копирайтинга #1 в России</span>
          </div>
        </div>

        {/* Компактный заголовок */}
        <div className={`transition-all duration-1200 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold mb-4 text-slate-900 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-shimmer">
              CopyPro Cloud
            </span>
            <div className="text-xl sm:text-2xl font-medium text-slate-600 mt-2">
              SEO-копирайтинг от 500₽
            </div>
          </h1>
        </div>

        {/* Компактное описание */}
        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-base sm:text-lg text-slate-700 mb-6 max-w-2xl mx-auto leading-relaxed">
            50+ экспертов создают продающие тексты за 24-72 часа с <span className="font-bold text-green-600">гарантией результата</span>
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-4 mb-6 text-sm">
            <div className="flex items-center gap-1.5 text-green-600 font-medium">
              <Star className="w-3.5 h-3.5 fill-current" />
              100% уникальность
            </div>
            <div className="flex items-center gap-1.5 text-blue-600 font-medium">
              <Zap className="w-3.5 h-3.5" />
              Быстрая доставка
            </div>
            <div className="flex items-center gap-1.5 text-purple-600 font-medium">
              <Shield className="w-3.5 h-3.5" />
              Гарантия качества
            </div>
          </div>
        </div>

        {/* Компактная CTA */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="space-y-4 mb-6">
            <Button 
              size="lg" 
              className="group px-8 py-3 rounded-full text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 hover:scale-105" 
              asChild
            >
              <Link to="#order" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Заказать от 500₽
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-slate-600">
              <span>✓ Без предоплаты</span>
              <span>✓ Правки бесплатно</span>
              <span>✓ Гарантия результата</span>
            </div>
          </div>

          {/* Компактные интегрированные метрики */}
          <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto text-center">
            <div>
              <div className="text-lg lg:text-xl font-bold text-blue-600">{animatedNumber >= 2000 ? '2000+' : animatedNumber}</div>
              <div className="text-xs text-slate-600">проектов</div>
            </div>
            <div>
              <div className="text-lg lg:text-xl font-bold text-green-600">100%</div>
              <div className="text-xs text-slate-600">уникальность</div>
            </div>
            <div>
              <div className="text-lg lg:text-xl font-bold text-purple-600">50+</div>
              <div className="text-xs text-slate-600">экспертов</div>
            </div>
            <div>
              <div className="text-lg lg:text-xl font-bold text-orange-600">24ч</div>
              <div className="text-xs text-slate-600">доставка</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHeroSection;
