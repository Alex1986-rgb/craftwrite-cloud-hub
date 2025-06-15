
import { Shield, Users, Clock, Target, Award, CheckCircle, TrendingUp, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

const ModernTrustSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    // Cycle through cards for attention
    const cardTimer = setInterval(() => {
      setActiveCard(prev => (prev + 1) % 6);
    }, 4000);
    
    return () => clearInterval(cardTimer);
  }, []);

  const trustFeatures = [
    {
      icon: Users,
      title: "30+ экспертов",
      description: "Только дипломированные SEO-копирайтеры для вашего проекта",
      accent: "bg-gradient-to-r from-blue-500 to-cyan-500",
      stats: "Средний опыт 5+ лет"
    },
    {
      icon: Shield,
      title: "Антиплагиат Text.ru",
      description: "Бесплатно предоставляем ссылки на проверки для каждой статьи",
      accent: "bg-gradient-to-r from-green-500 to-emerald-500",
      stats: "100% уникальность"
    },
    {
      icon: Clock,
      title: "Сроки от 24ч",
      description: "Оперативная работа: от одного дня без компромиссов по качеству",
      accent: "bg-gradient-to-r from-orange-500 to-red-500",
      stats: "Экспресс-доставка"
    },
    {
      icon: Target,
      title: "Глубокая SEO-оптимизация",
      description: "Работа по ключам клиента, тематический LSI и выдача технических отчетов",
      accent: "bg-gradient-to-r from-purple-500 to-pink-500",
      stats: "ТОП-10 гарантия"
    },
    {
      icon: Award,
      title: "Многолетний опыт",
      description: "Средний стаж наших специалистов — 5+ лет в нише SEO-копирайтинга",
      accent: "bg-gradient-to-r from-indigo-500 to-purple-500",
      stats: "Проверенная экспертиза"
    },
    {
      icon: CheckCircle,
      title: "Гарантия правок",
      description: "Правки и корректировки по пожеланию в течение 7 дней после сдачи",
      accent: "bg-gradient-to-r from-teal-500 to-green-500",
      stats: "7 дней поддержки"
    }
  ];

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-r from-green-400/8 to-cyan-400/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Decorative grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Premium header section */}
        <div className={`text-center mb-16 sm:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Trust badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full mb-8 shadow-lg backdrop-blur-sm">
            <Star className="w-5 h-5 text-blue-600 fill-current" />
            <span className="text-blue-800 font-bold text-sm">Доверие 2000+ клиентов</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>

          <h2 className="mobile-heading-lg font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
            Почему нам доверяют заказчики
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl sm:text-2xl text-slate-600 font-medium mb-4 leading-relaxed">
              Профессионализм & Прозрачность
            </p>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
              Каждая статья нашего сервиса сопровождается отчетом по уникальности на Text.ru. 
              Без компромиссов — только экспертный SEO-контент под ключ.
            </p>
          </div>
        </div>

        {/* Enhanced trust features grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 transition-all duration-1200 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = activeCard === index;
            
            return (
              <Card 
                key={index}
                className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-lg ${
                  isActive ? 'shadow-2xl scale-105 ring-2 ring-blue-200' : 'shadow-lg'
                }`}
                onMouseEnter={() => setActiveCard(index)}
              >
                {/* Gradient background overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${feature.accent.replace('bg-gradient-to-r', 'bg-gradient-to-br')} opacity-5`}></div>
                
                <CardContent className="p-8 relative z-10">
                  {/* Icon with gradient background */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ${feature.accent}`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* Stats badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full">
                      <div className={`w-2 h-2 rounded-full ${feature.accent}`}></div>
                      <span className="text-sm font-semibold text-slate-700">
                        {feature.stats}
                      </span>
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${feature.accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA section */}
        <div className={`mt-16 sm:mt-20 text-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-8 py-6 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-lg rounded-3xl border border-blue-200/30 shadow-xl">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-600" />
              <span className="text-lg font-bold text-slate-800">
                Гарантия качества 100%
              </span>
            </div>
            
            <div className="hidden sm:block w-px h-8 bg-slate-300"></div>
            
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-blue-600" />
              <span className="text-lg font-bold text-slate-800">
                Официальные отчеты Text.ru
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernTrustSection;
