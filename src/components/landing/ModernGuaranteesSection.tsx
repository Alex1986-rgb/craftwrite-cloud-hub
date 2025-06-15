
import { Shield, Clock, Star, RefreshCw, FileCheck, Award, CheckCircle, AlertTriangle, Scale } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

const ModernGuaranteesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeGuarantee, setActiveGuarantee] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    // Cycle through guarantee cards
    const guaranteeTimer = setInterval(() => {
      setActiveGuarantee(prev => (prev + 1) % 4);
    }, 3500);
    
    return () => clearInterval(guaranteeTimer);
  }, []);

  const mainGuarantees = [
    {
      icon: Shield,
      title: "100% уникальность",
      subtitle: "Гарантия оригинальности",
      description: "Каждый текст проверяется через Text.ru, Advego и eTXT. Уникальность не менее 95%.",
      accent: "bg-gradient-to-r from-green-500 to-emerald-500",
      highlight: "95%+ гарантия"
    },
    {
      icon: Clock,
      title: "Сроки выполнения",
      subtitle: "От 24 часов",
      description: "Оперативная работа без компромиссов по качеству. Соблюдение дедлайнов гарантировано.",
      accent: "bg-gradient-to-r from-blue-500 to-cyan-500",
      highlight: "Точно в срок"
    },
    {
      icon: Star,
      title: "Качество контента",
      subtitle: "Экспертный уровень",
      description: "Работа только с дипломированными специалистами со стажем от 5 лет.",
      accent: "bg-gradient-to-r from-purple-500 to-pink-500",
      highlight: "Профессионалы"
    },
    {
      icon: RefreshCw,
      title: "Правки и доработки",
      subtitle: "30 дней бесплатно",
      description: "Корректировки по вашим пожеланиям в течение месяца после сдачи проекта.",
      accent: "bg-gradient-to-r from-orange-500 to-red-500",
      highlight: "Полная поддержка"
    }
  ];

  const additionalFeatures = [
    {
      icon: FileCheck,
      title: "Проверка по 3 сервисам",
      description: "Text.ru, Advego, eTXT"
    },
    {
      icon: Award,
      title: "Отчеты об уникальности",
      description: "Официальные ссылки на проверки"
    },
    {
      icon: CheckCircle,
      title: "Гарантия 95%+",
      description: "Минимальный порог уникальности"
    },
    {
      icon: AlertTriangle,
      title: "Возврат при несоответствии",
      description: "100% возврат или переработка"
    }
  ];

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-gradient-to-r from-green-400/6 to-blue-400/6 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-gradient-to-r from-purple-400/6 to-pink-400/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header section */}
        <div className={`text-center mb-16 sm:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Trust badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200/50 rounded-full mb-8 shadow-lg backdrop-blur-sm">
            <Shield className="w-5 h-5 text-green-600 fill-current" />
            <span className="text-green-800 font-bold text-sm">Официальные гарантии</span>
            <Scale className="w-4 h-4 text-green-600" />
          </div>

          <h2 className="mobile-heading-lg font-bold mb-6 bg-gradient-to-r from-slate-900 via-green-800 to-blue-800 bg-clip-text text-transparent leading-tight">
            Гарантии качества
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl sm:text-2xl text-slate-600 font-medium mb-4 leading-relaxed">
              Наши обязательства перед клиентами
            </p>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
              Мы берем на себя полную ответственность за качество, сроки и результат. 
              Ваша уверенность в сотрудничестве — наш главный приоритет.
            </p>
          </div>
        </div>

        {/* Main guarantees grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20 transition-all duration-1200 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {mainGuarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            const isActive = activeGuarantee === index;
            
            return (
              <Card 
                key={index}
                className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 border-0 bg-white/90 backdrop-blur-lg ${
                  isActive ? 'shadow-2xl scale-105 ring-2 ring-green-200' : 'shadow-lg'
                }`}
                onMouseEnter={() => setActiveGuarantee(index)}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${guarantee.accent.replace('bg-gradient-to-r', 'bg-gradient-to-br')} opacity-5`}></div>
                
                <CardContent className="p-6 sm:p-8 relative z-10 text-center">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ${guarantee.accent}`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-green-700 transition-colors duration-300">
                        {guarantee.title}
                      </h3>
                      <p className="text-sm text-green-600 font-semibold mt-1">
                        {guarantee.subtitle}
                      </p>
                    </div>
                    
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {guarantee.description}
                    </p>
                    
                    {/* Highlight badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full">
                      <div className={`w-2 h-2 rounded-full ${guarantee.accent}`}></div>
                      <span className="text-xs font-semibold text-slate-700">
                        {guarantee.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${guarantee.accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Detailed uniqueness guarantee */}
        <div className={`bg-gradient-to-r from-white/95 to-green-50/95 backdrop-blur-lg rounded-3xl p-8 sm:p-12 mb-16 shadow-xl border border-green-200/30 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">100% уникальность</h3>
              </div>
              
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Каждый текст проверяется через Text.ru, Advego и eTXT. Уникальность не менее 95%. 
                При несоответствии — полный возврат средств или бесплатная переработка.
              </p>

              <div className="bg-green-50 rounded-2xl p-6 border border-green-200/50">
                <h4 className="font-bold text-green-800 mb-3">Что входит в гарантию:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {additionalFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-semibold text-green-800">{feature.title}</div>
                          <div className="text-xs text-green-600">{feature.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-2xl mb-6 animate-pulse-glow">
                <span className="text-4xl font-bold text-white">95%+</span>
              </div>
              <p className="text-lg font-semibold text-green-700">Минимальная гарантия уникальности</p>
            </div>
          </div>
        </div>

        {/* Legal protection section */}
        <div className={`text-center transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-8 py-6 bg-gradient-to-r from-slate-50/90 to-blue-50/90 backdrop-blur-lg rounded-3xl border border-slate-200/30 shadow-xl">
            <div className="flex items-center gap-3">
              <Scale className="w-8 h-8 text-blue-600" />
              <span className="text-lg font-bold text-slate-800">
                Юридическая защита
              </span>
            </div>
            
            <div className="hidden sm:block w-px h-8 bg-slate-300"></div>
            
            <div className="flex items-center gap-3">
              <FileCheck className="w-8 h-8 text-green-600" />
              <span className="text-lg font-bold text-slate-800">
                Все гарантии закреплены в договоре
              </span>
            </div>
          </div>
          
          <p className="text-sm text-slate-500 mt-4 max-w-2xl mx-auto">
            При нарушении обязательств предусмотрена компенсация. 
            Работаем официально с полной юридической ответственностью.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ModernGuaranteesSection;
