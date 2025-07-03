
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Star, Zap, Shield, Award, TrendingUp, CheckCircle, Play } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const OptimizedHeroSection = () => {
  const [animatedNumber, setAnimatedNumber] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setAnimatedNumber(prev => prev < 2000 ? prev + 47 : 2000);
    }, 40);
    
    return () => clearInterval(timer);
  }, []);

  const trustIndicators = [
    { icon: Star, text: "4.9/5 рейтинг", value: "98% довольных клиентов" },
    { icon: Shield, text: "100% гарантия", value: "Возврат или правки" },
    { icon: Zap, text: "24-72 часа", value: "Срок выполнения" },
    { icon: Award, text: "50+ экспертов", value: "Опыт 5+ лет" }
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Sophisticated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-blue-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/6 to-blue-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Geometric elements */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-blue-400/40 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-16 w-3 h-3 bg-purple-400/40 rounded-full animate-bounce"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            {/* Premium Badge */}
            <Badge className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-800 border-blue-200/50 hover:scale-105 transition-transform duration-300">
              <Award className="w-4 h-4" />
              Премиальный копирайтинг с 2019 года
            </Badge>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Продающие тексты
                </span>
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  от 500₽ за 24 часа
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 max-w-xl">
                Команда из <span className="font-semibold text-blue-600">50+ экспертов</span> создает контент, 
                который увеличивает продажи на <span className="font-semibold text-green-600">40-180%</span>
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-3">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:shadow-md transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <indicator.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-slate-800">{indicator.text}</div>
                    <div className="text-xs text-slate-600">{indicator.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                asChild
              >
                <Link to="#order" className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Заказать текст
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="group px-8 py-4 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-2xl transition-all duration-300"
                asChild
              >
                <Link to="/portfolio" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Примеры работ
                </Link>
              </Button>
            </div>

            {/* Quick Features */}
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Без предоплаты
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Правки бесплатно
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Гарантия результата
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Visual */}
          <div className={`space-y-8 transition-all duration-1200 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {animatedNumber >= 2000 ? '2000+' : animatedNumber}
                </div>
                <div className="text-sm text-slate-600">Выполненных проектов</div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-sm text-slate-600">Довольных клиентов</div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">24ч</div>
                <div className="text-sm text-slate-600">Минимальный срок</div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">180%</div>
                <div className="text-sm text-slate-600">Рост конверсии</div>
              </div>
            </div>

            {/* Achievement Card */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-8 h-8" />
                  <div>
                    <div className="text-2xl font-bold">5 лет</div>
                    <div className="text-blue-100">в топе рынка</div>
                  </div>
                </div>
                <p className="text-blue-100 leading-relaxed">
                  Помогли 1000+ компаниям увеличить продажи с помощью качественного контента
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptimizedHeroSection;
