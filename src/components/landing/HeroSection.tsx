
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, ArrowRight, BadgeCheck, Users, Star, Award, Sparkles } from "lucide-react";

const HeroSection = () => (
  <section className="relative flex flex-col items-center justify-center pt-20 pb-16 px-4 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 overflow-hidden">
    {/* Cleaner background elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/3 to-blue-500/3 rounded-full blur-3xl"></div>
    </div>

    <div className="relative z-10 max-w-5xl mx-auto text-center">
      {/* Clear trust badges */}
      <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-primary/20 text-primary font-semibold text-sm shadow-sm">
          <Users className="w-4 h-4" />
          30+ экспертов
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-green-200 text-green-700 font-semibold text-sm shadow-sm">
          <BadgeCheck className="w-4 h-4" />
          100% уникальность
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-amber-200 text-amber-700 font-semibold text-sm shadow-sm">
          <Award className="w-4 h-4" />
          2000+ проектов
        </div>
      </div>

      {/* Cleaner main heading */}
      <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-slate-900">
        <span className="block mb-2">
          CopyPro Cloud
        </span>
        <span className="text-2xl md:text-3xl font-medium text-slate-700 block">
          Профессиональный SEO-копирайтинг
        </span>
      </h1>

      {/* Clear subtitle */}
      <div className="max-w-3xl mx-auto mb-10">
        <p className="text-lg md:text-xl text-slate-600 mb-6 leading-relaxed">
          Создаём качественный контент с командой из 30+ дипломированных SEO-копирайтеров
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 text-base">
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <Star className="w-4 h-4 fill-current" />
            Проверка Text.ru
          </div>
          <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
          <div className="flex items-center gap-2 text-blue-600 font-medium">
            <Award className="w-4 h-4" />
            Гарантия качества
          </div>
          <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
          <div className="flex items-center gap-2 text-purple-600 font-medium">
            <Users className="w-4 h-4" />
            Экспертная команда
          </div>
        </div>
      </div>

      {/* Clear CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <Button 
          size="lg" 
          className="group px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 border-0 hover:scale-105" 
          asChild
        >
          <Link to="/order" className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Заказать контент
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          className="group px-8 py-4 rounded-full text-lg font-semibold bg-white/80 backdrop-blur-sm border-2 border-slate-200 hover:border-primary/50 transition-all duration-300 hover:scale-105"
        >
          <Play className="w-5 h-5 mr-2" />
          Посмотреть работы
        </Button>
      </div>

      {/* Clear trust indicators */}
      <div className="border-t border-slate-200 pt-8">
        <p className="text-sm text-slate-500 mb-4 font-medium">Наши результаты:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">2000+</div>
            <div className="text-sm text-slate-600">проектов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
            <div className="text-sm text-slate-600">уникальность</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">30+</div>
            <div className="text-sm text-slate-600">экспертов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">24ч</div>
            <div className="text-sm text-slate-600">от заказа</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
