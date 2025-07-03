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
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden mobile-safe-area pt-16 pb-8">

      <div className="relative z-10 max-w-6xl mx-auto text-center px-4 sm:px-6">
        {/* Premium badge */}
        <div className={`flex justify-center mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card text-white font-semibold text-sm shadow-lg">
            <Award className="w-4 h-4 text-blue-400" />
            <span>Премиальная платформа копирайтинга #1 в России</span>
          </div>
        </div>

        {/* Компактный заголовок */}
        <div className={`transition-all duration-1200 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold mb-4 text-white leading-tight">
            <span className="text-gradient animate-shimmer">
              CopyPro Cloud
            </span>
            <div className="text-xl sm:text-2xl font-medium text-slate-300 mt-2">
              SEO-копирайтинг от 500₽
            </div>
          </h1>
        </div>

        {/* Компактное описание */}
        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-base sm:text-lg text-slate-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            50+ экспертов создают продающие тексты за 24-72 часа с <span className="font-bold text-green-400">гарантией результата</span>
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-4 mb-6 text-sm">
            <div className="flex items-center gap-1.5 text-green-400 font-medium">
              <Star className="w-3.5 h-3.5 fill-current" />
              100% уникальность
            </div>
            <div className="flex items-center gap-1.5 text-blue-400 font-medium">
              <Zap className="w-3.5 h-3.5" />
              Быстрая доставка
            </div>
            <div className="flex items-center gap-1.5 text-purple-400 font-medium">
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
            
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-slate-400">
              <span>✓ Без предоплаты</span>
              <span>✓ Правки бесплатно</span>
              <span>✓ Гарантия результата</span>
            </div>
          </div>

          {/* Компактные интегрированные метрики */}
          <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto text-center">
            <div>
              <div className="text-lg lg:text-xl font-bold text-blue-400">{animatedNumber >= 2000 ? '2000+' : animatedNumber}</div>
              <div className="text-xs text-slate-400">проектов</div>
            </div>
            <div>
              <div className="text-lg lg:text-xl font-bold text-green-400">100%</div>
              <div className="text-xs text-slate-400">уникальность</div>
            </div>
            <div>
              <div className="text-lg lg:text-xl font-bold text-purple-400">50+</div>
              <div className="text-xs text-slate-400">экспертов</div>
            </div>
            <div>
              <div className="text-lg lg:text-xl font-bold text-orange-400">24ч</div>
              <div className="text-xs text-slate-400">доставка</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHeroSection;
