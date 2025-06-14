
import { Button } from "@/components/ui/button";
import { Star, Shield, Zap, Award, Sparkles } from "lucide-react";

interface OrderPageHeroProps {
  onQuickOrder: () => void;
}

export default function OrderPageHero({ onQuickOrder }: OrderPageHeroProps) {
  return (
    <div className="text-center mb-12 md:mb-20 animate-fade-in">
      <div className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-blue-100/80 to-purple-100/80 text-blue-700 px-4 py-2 md:px-8 md:py-4 rounded-full text-xs md:text-sm font-bold mb-6 md:mb-8 border border-blue-200/50 shadow-lg backdrop-blur-sm">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <Star className="w-4 h-4 md:w-5 md:h-5" />
        <span className="hidden sm:inline">Элитная команда</span> SEO-экспертов
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight tracking-tight px-2">
        Каталог услуг <br />
        <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">профессионального</span> копирайтинга
      </h1>
      
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium mb-6 md:mb-10 px-4">
        Выберите подходящую услугу из нашего каталога или перейдите к быстрому оформлению заказа
      </p>
      
      <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 mb-6 md:mb-10 px-4">
        <div className="flex items-center gap-2 md:gap-3 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 px-3 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-semibold border border-emerald-200/50 shadow-lg backdrop-blur-sm">
          <Shield className="w-3 h-3 md:w-4 md:h-4" />
          <span className="whitespace-nowrap">100% уникальность</span>
        </div>
        <div className="flex items-center gap-2 md:gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-semibold border border-blue-200/50 shadow-lg backdrop-blur-sm">
          <Zap className="w-3 h-3 md:w-4 md:h-4" />
          <span className="whitespace-nowrap">От 24 часов</span>
        </div>
        <div className="flex items-center gap-2 md:gap-3 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 px-3 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-semibold border border-purple-200/50 shadow-lg backdrop-blur-sm">
          <Award className="w-3 h-3 md:w-4 md:h-4" />
          <span className="whitespace-nowrap">30+ экспертов</span>
        </div>
      </div>

      <Button 
        onClick={onQuickOrder}
        size="lg"
        className="relative shadow-2xl transition-all duration-700 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-400 hover:via-blue-400 hover:to-purple-400 px-6 py-4 md:px-12 md:py-7 text-base md:text-lg font-bold rounded-full hover:scale-105 md:hover:scale-110 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-emerald-500/25 border-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full blur-sm"></div>
        <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2 relative z-10" />
        <span className="relative z-10">Быстрый заказ</span>
      </Button>
    </div>
  );
}
