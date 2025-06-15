
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Star, Users, Clock, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const MobileOptimizedHero = () => {
  const [animatedNumber, setAnimatedNumber] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setAnimatedNumber(prev => prev < 2000 ? prev + 50 : 2000);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 overflow-hidden">
      {/* Optimized background elements for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-48 h-48 md:w-72 md:h-72 bg-blue-500/4 rounded-full blur-3xl ${!isMobile ? 'animate-float' : ''}`}></div>
        <div className={`absolute bottom-1/3 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-500/4 rounded-full blur-3xl ${!isMobile ? 'animate-float' : ''}`} style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6">
        {/* Mobile-optimized trust indicators */}
        <div className={`flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 mb-6 sm:mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="touch-target inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl bg-white/95 backdrop-blur-md border border-green-200/50 text-green-700 font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            <span className="whitespace-nowrap">100% уникальность</span>
          </div>
          <div className="touch-target inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl bg-white/95 backdrop-blur-md border border-blue-200/50 text-blue-700 font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="whitespace-nowrap">30+ экспертов</span>
          </div>
          <div className="touch-target inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl bg-white/95 backdrop-blur-md border border-purple-200/50 text-purple-700 font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="whitespace-nowrap">От 24 часов</span>
          </div>
        </div>

        {/* Mobile-optimized main heading */}
        <div className={`transition-all duration-1200 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 text-slate-900 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              CopyPro
            </span>
            <span className="text-slate-800 block mt-1 sm:mt-2">Cloud</span>
          </h1>
        </div>

        {/* Mobile-optimized value proposition */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed font-medium px-2">
            Профессиональный SEO-копирайтинг с командой из 30+ экспертов.
            <br className="hidden sm:block" />
            <span className="text-primary font-bold">Гарантируем результат и уникальность.</span>
          </p>
        </div>

        {/* Mobile-optimized metrics with 2x2 grid on mobile */}
        <div className={`mb-8 sm:mb-12 transition-all duration-1200 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-6 sm:px-10 py-6 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-slate-200/50 hover:shadow-glow transition-all duration-500 hover:scale-105 max-w-full overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 w-full sm:w-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-primary mb-1">{animatedNumber}+</div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">проектов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-green-600 mb-1">100%</div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">уникальность</div>
              </div>
              <div className="text-center col-span-2 sm:col-span-1">
                <div className="text-2xl sm:text-4xl font-bold text-purple-600 mb-1 flex items-center justify-center gap-1">
                  24ч
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">быстрый старт</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-optimized CTA buttons - stacked on mobile */}
        <div className={`flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-stretch sm:items-center mb-12 sm:mb-16 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Button 
            size="lg" 
            className="group relative mobile-button px-8 sm:px-12 py-6 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-glow transition-all duration-500 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 border-0 hover:scale-105 will-change-transform overflow-hidden touch-target" 
            asChild
          >
            <Link to="/order" className="flex items-center justify-center gap-3 relative z-10">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              Заказать контент
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-3 transition-transform duration-500" />
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="group mobile-button px-8 sm:px-10 py-6 rounded-2xl text-lg font-bold bg-white/90 backdrop-blur-lg border-2 border-slate-200 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-lg touch-target"
            asChild
          >
            <Link to="/portfolio" className="flex items-center justify-center gap-2">
              Посмотреть работы
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>

        {/* Mobile-optimized quick stats with 2x2 grid */}
        <div className={`border-t border-slate-200/50 pt-6 sm:pt-8 transition-all duration-1200 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6 font-semibold tracking-wide uppercase">Почему выбирают нас:</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center group cursor-pointer touch-target">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">2000+</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">успешных проектов</div>
            </div>
            <div className="text-center group cursor-pointer touch-target">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">гарантия качества</div>
            </div>
            <div className="text-center group cursor-pointer touch-target">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">30+</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">опытных экспертов</div>
            </div>
            <div className="text-center group cursor-pointer touch-target">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">24ч</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">быстрый результат</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileOptimizedHero;
