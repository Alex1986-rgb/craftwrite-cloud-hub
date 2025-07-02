
import { Sparkles } from "lucide-react";

export default function ContactHeader() {
  return (
    <div className="text-center mb-16 animate-fade-in">
      {/* Enhanced Badge */}
      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-full px-6 py-3 mb-6 border border-primary/20 backdrop-blur-sm">
        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
        <span className="text-primary font-semibold text-sm tracking-wide">Свяжитесь с нами</span>
        <div className="w-2 h-2 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      {/* Enhanced Title with Animation */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
        <span className="block animate-slide-up">
          Готовы начать?
        </span>
        <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-slide-up mt-2" style={{ animationDelay: '0.2s' }}>
          Обсудим ваш проект
        </span>
      </h2>
      
      {/* Enhanced Description */}
      <div className="max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
          Оставьте заявку, и наш эксперт свяжется с вами в течение часа для обсуждения деталей и расчета стоимости
        </p>
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Бесплатная консультация</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Ответ в течение часа</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Без обязательств</span>
          </div>
        </div>
      </div>
    </div>
  );
}
