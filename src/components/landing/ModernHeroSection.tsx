
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Star, Users, Clock, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

const ModernHeroSection = () => {
  const [animatedNumber, setAnimatedNumber] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setAnimatedNumber(prev => prev < 2000 ? prev + 50 : 2000);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 overflow-hidden">
      {/* Enhanced background elements with subtle animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-500/4 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/4 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/2 to-blue-500/2 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        {/* Staggered trust indicators with enhanced animations */}
        <div className={`flex flex-wrap justify-center items-center gap-4 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/95 backdrop-blur-md border border-green-200/50 text-green-700 font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-soft">
            <Star className="w-5 h-5 fill-current" />
            100% уникальность
          </div>
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/95 backdrop-blur-md border border-blue-200/50 text-blue-700 font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-soft" style={{ animationDelay: '0.2s' }}>
            <Users className="w-5 h-5" />
            30+ экспертов
          </div>
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/95 backdrop-blur-md border border-purple-200/50 text-purple-700 font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-soft" style={{ animationDelay: '0.4s' }}>
            <Clock className="w-5 h-5" />
            От 24 часов
          </div>
        </div>

        {/* Enhanced main heading with better typography */}
        <div className={`transition-all duration-1200 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="text-5xl md:text-8xl font-bold mb-6 text-slate-900 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-shimmer">
              CopyPro
            </span>
            <span className="text-slate-800 block mt-2">Cloud</span>
          </h1>
        </div>

        {/* Enhanced value proposition */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
            Профессиональный SEO-копирайтинг с командой из 30+ экспертов.
            <br />
            <span className="text-primary font-bold">Гарантируем результат и уникальность.</span>
          </p>
        </div>

        {/* Interactive metrics with enhanced animations */}
        <div className={`mb-12 transition-all duration-1200 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="inline-flex items-center gap-6 px-10 py-6 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-slate-200/50 hover:shadow-glow transition-all duration-500 hover:scale-105">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1 animate-pulse-glow">{animatedNumber}+</div>
              <div className="text-sm text-slate-600 font-medium">выполненных проектов</div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-1">100%</div>
              <div className="text-sm text-slate-600 font-medium">уникальность</div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-1 flex items-center gap-1">
                24ч
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-sm text-slate-600 font-medium">быстрый старт</div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA buttons with better animations */}
        <div className={`flex flex-col sm:flex-row gap-5 justify-center items-center mb-16 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Button 
            size="lg" 
            className="group relative px-12 py-6 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-glow transition-all duration-500 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 border-0 hover:scale-110 will-change-transform overflow-hidden" 
            asChild
          >
            <Link to="/order" className="flex items-center gap-3 relative z-10">
              <Sparkles className="w-6 h-6 animate-pulse" />
              Заказать контент
              <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="group px-10 py-6 rounded-2xl text-lg font-bold bg-white/90 backdrop-blur-lg border-2 border-slate-200 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-lg"
            asChild
          >
            <Link to="/portfolio" className="flex items-center gap-2">
              Посмотреть работы
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>

        {/* Enhanced quick stats with better mobile layout */}
        <div className={`border-t border-slate-200/50 pt-8 transition-all duration-1200 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm text-slate-500 mb-6 font-semibold tracking-wide uppercase">Почему выбирают нас:</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group cursor-pointer">
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">2000+</div>
              <div className="text-sm text-slate-600 font-medium">успешных проектов</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
              <div className="text-sm text-slate-600 font-medium">гарантия качества</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">30+</div>
              <div className="text-sm text-slate-600 font-medium">опытных экспертов</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">24ч</div>
              <div className="text-sm text-slate-600 font-medium">быстрый результат</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHeroSection;
