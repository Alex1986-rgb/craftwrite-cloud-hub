
import { Sparkles } from "lucide-react";

export default function ContactHeader() {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 mb-4">
        <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
        <span className="text-blue-700 font-semibold text-sm">Свяжитесь с нами</span>
      </div>
      
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-slate-800 mb-4 leading-tight">
        Готовы начать?
        <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Обсудим ваш проект
        </span>
      </h2>
      
      <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Оставьте заявку, и наш эксперт свяжется с вами в течение часа для обсуждения деталей и расчета стоимости
      </p>
    </div>
  );
}
