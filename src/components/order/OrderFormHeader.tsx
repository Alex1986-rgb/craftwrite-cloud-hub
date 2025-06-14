
import { Star } from "lucide-react";

export default function OrderFormHeader() {
  return (
    <div className="flex flex-col items-center mb-6 animate-fade-in">
      <span className="inline-flex items-center bg-amber-100 text-amber-800 rounded-full px-3 py-1 text-xs font-semibold mb-3 border border-amber-200 shadow-sm animate-scale-in">
        <Star className="w-4 h-4 mr-1 text-amber-500" /> Новый заказ за 3 минуты!
      </span>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
        Закажите текст прямо сейчас
      </h1>
      <p className="text-muted-foreground text-center max-w-md animate-fade-in">
        Мы быстро рассчитаем цену и поможем подобрать оптимальный формат — просто заполните форму!
      </p>
    </div>
  );
}
