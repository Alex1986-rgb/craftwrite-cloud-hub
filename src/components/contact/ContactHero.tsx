
import { MessageCircle, Clock, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactHero() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-3 mb-6">
            <MessageCircle className="w-5 h-5 text-blue-600 animate-pulse" />
            <span className="text-blue-700 font-semibold">Свяжитесь с нами</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-slate-800 mb-6 leading-tight">
            Готовы обсудить
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ваш проект?
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Наши эксперты готовы помочь вам создать продающий контент, который увеличит конверсию и привлечет клиентов
          </p>

          <Button 
            onClick={scrollToContact}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold rounded-full px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Получить консультацию
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { icon: Clock, value: "< 1 часа", label: "Время ответа" },
            { icon: Users, value: "30+", label: "Экспертов" },
            { icon: Award, value: "500+", label: "Проектов" },
            { icon: MessageCircle, value: "24/7", label: "Поддержка" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-white/60 backdrop-blur-lg rounded-2xl border border-slate-200/50 hover:scale-105 transition-transform duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
