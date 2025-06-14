
import { Star } from "lucide-react";

export default function OrderFormHeader() {
  return (
    <div className="flex flex-col items-center mb-1 animate-fade-in">
      <span className="inline-flex items-center bg-amber-100 text-amber-800 rounded-full px-3 py-1 text-xs font-semibold mb-2 border border-amber-200 shadow-sm animate-scale-in">
        <Star className="w-4 h-4 mr-1 text-amber-500" /> Новый заказ за 3 минуты!
      </span>
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-1">
        Закажите текст прямо сейчас
      </h1>
      <p className="text-sm text-muted-foreground text-center max-w-md animate-fade-in">
        Мы быстро рассчитаем цену и поможем подобрать оптимальный формат — просто заполните форму!
      </p>
    </div>
  );
}
