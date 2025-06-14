
import { Sparkles } from "lucide-react";

export default function ContactHeader() {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-3 mb-6">
        <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
        <span className="text-blue-700 font-semibold">Свяжитесь с нами</span>
      </div>
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-slate-800 mb-6 leading-tight">
        Готовы начать?
        <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Обсудим ваш проект
        </span>
      </h2>
      
      <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Оставьте заявку, и наш эксперт свяжется с вами в течение часа для обсуждения деталей и расчета стоимости
      </p>
    </div>
  );
}
