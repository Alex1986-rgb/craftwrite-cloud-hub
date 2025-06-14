
import { Star, Zap, Shield } from "lucide-react";

export default function OrderFormHeader() {
  return (
    <div className="flex flex-col items-center mb-6 md:mb-8 animate-fade-in">
      <div className="flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 rounded-full px-4 py-2 text-sm font-semibold mb-4 border border-amber-200 shadow-sm animate-scale-in">
        <Star className="w-4 h-4 text-amber-500 fill-current" /> 
        Новый заказ за 3 минуты!
        <Zap className="w-4 h-4 text-amber-500" />
      </div>
      
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent px-4 leading-tight">
        Закажите текст прямо сейчас
      </h1>
      
      <p className="text-muted-foreground text-center max-w-lg animate-fade-in text-base md:text-lg px-4 leading-relaxed">
        Мы быстро рассчитаем цену и поможем подобрать оптимальный формат — просто заполните форму!
      </p>
      
      <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Shield className="w-4 h-4 text-green-500" />
          <span>100% уникальность</span>
        </div>
        <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
        <div className="flex items-center gap-1">
          <Zap className="w-4 h-4 text-blue-500" />
          <span>От 24 часов</span>
        </div>
      </div>
    </div>
  );
}
