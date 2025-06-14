
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Star, Users, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const ModernHeroSection = () => {
  const [animatedNumber, setAnimatedNumber] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedNumber(prev => prev < 2000 ? prev + 50 : 2000);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 overflow-hidden">
      {/* Минималистичные фоновые элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        {/* Компактные trust indicators */}
        <div className="flex justify-center items-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
            <Star className="w-4 h-4 fill-current" />
            100% уникальность
          </div>
          <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
            <Users className="w-4 h-4" />
            30+ экспертов
          </div>
          <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
          <div className="flex items-center gap-2 text-sm font-semibold text-purple-600">
            <Clock className="w-4 h-4" />
            От 24 часов
          </div>
        </div>

        {/* Основной заголовок - сокращенный и более мощный */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 leading-tight">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CopyPro
          </span>
          <span className="text-slate-800">Cloud</span>
        </h1>

        {/* Четкое value proposition */}
        <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Профессиональный SEO-копирайтинг с командой из 30+ экспертов. 
          Гарантируем результат и уникальность.
        </p>

        {/* Интерактивная метрика */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{animatedNumber}+</div>
              <div className="text-sm text-slate-600">выполненных проектов</div>
            </div>
            <div className="w-px h-10 bg-slate-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">100%</div>
              <div className="text-sm text-slate-600">уникальность</div>
            </div>
            <div className="w-px h-10 bg-slate-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">24ч</div>
              <div className="text-sm text-slate-600">быстрый старт</div>
            </div>
          </div>
        </div>

        {/* Один четкий CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="group px-10 py-6 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 border-0 hover:scale-105" 
            asChild
          >
            <Link to="/order" className="flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              Заказать контент
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-6 rounded-2xl text-lg font-semibold bg-white/80 backdrop-blur-sm border-2 border-slate-200 hover:border-primary/50 transition-all duration-300"
            asChild
          >
            <Link to="/portfolio">
              Посмотреть работы
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ModernHeroSection;
