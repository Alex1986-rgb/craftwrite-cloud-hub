import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowDown, FileText, TrendingUp, Users, Clock, Target, CheckCircle, Award } from "lucide-react";
import { Link } from "react-router-dom";

const PROFESSIONAL_STATS = [
  { label: "SEO-текстов создано", value: 12847, suffix: "+" },
  { label: "Довольных клиентов", value: 98, suffix: "%" },
  { label: "Экспертов в команде", value: 50, suffix: "+" },
  { label: "Лет опыта работы", value: 5, suffix: "" }
];

const PROCESS_STEPS = [
  { 
    icon: FileText, 
    title: "Анализ ТЗ", 
    description: "Изучаем вашу нишу, конкурентов и целевую аудиторию",
    color: "from-blue-600 to-blue-700"
  },
  { 
    icon: Users, 
    title: "Работа экспертов", 
    description: "Сертифицированные копирайтеры создают уникальный контент",
    color: "from-orange-500 to-orange-600"
  },
  { 
    icon: CheckCircle, 
    title: "Контроль качества", 
    description: "Проверка уникальности, SEO-оптимизации и соответствия ТЗ",
    color: "from-emerald-600 to-emerald-700"
  }
];

export default function ProfessionalHeroSection() {
  const [animatedStats, setAnimatedStats] = useState(PROFESSIONAL_STATS.map(() => 0));

  useEffect(() => {
    const timers = PROFESSIONAL_STATS.map((stat, index) => {
      return setTimeout(() => {
        const duration = 2000;
        const steps = 60;
        const increment = stat.value / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }
          setAnimatedStats(prev => {
            const newStats = [...prev];
            newStats[index] = Math.floor(current);
            return newStats;
          });
        }, duration / steps);
      }, index * 200);
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, hsl(var(--professional-blue)/0.1) 1px, transparent 1px),
              linear-gradient(180deg, hsl(var(--professional-blue)/0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-16">
          
          {/* Main Hero Content */}
          <div className="space-y-8 max-w-4xl mx-auto">
            <Badge className="inline-flex items-center px-6 py-2 text-base font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
              <Award className="w-5 h-5 mr-2" />
              Сертифицированные эксперты
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-900">
                <span className="text-blue-700">Профессиональный</span>
                <br />
                <span className="text-slate-700">копирайтинг</span>
                <br />
                <span className="text-orange-600">для бизнеса</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Команда из <strong className="text-blue-700">50+ экспертов</strong> создает контент, который 
                <strong className="text-orange-600"> продает и привлекает клиентов</strong>. 
                Гарантия качества и результата.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                size="lg" 
                className="px-8 py-4 text-lg font-semibold bg-blue-700 hover:bg-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link to="/order">
                  <FileText className="w-5 h-5 mr-2" />
                  Заказать тексты
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold border-2 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl"
              >
                <Link to="/portfolio">
                  <Target className="w-5 h-5 mr-2" />
                  Посмотреть портфолио
                </Link>
              </Button>
            </div>
          </div>

          {/* Professional Stats */}
          <Card className="max-w-4xl mx-auto p-8 bg-white/70 backdrop-blur-sm border border-slate-200 shadow-xl rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {PROFESSIONAL_STATS.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-3xl md:text-4xl font-bold text-blue-700">
                    {animatedStats[index].toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Process Steps */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
              Как мы работаем
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {PROCESS_STEPS.map((step, index) => (
                <Card key={index} className="p-8 text-center space-y-6 bg-white border border-slate-200 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-gradient-to-br ${step.color} shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-slate-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">100% Гарантия</p>
                <p className="text-xs text-slate-500">Качество или возврат</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">50+ Экспертов</p>
                <p className="text-xs text-slate-500">С дипломами и опытом</p>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">От 24 часов</p>
                <p className="text-xs text-slate-500">Быстрая доставка</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">5 лет роста</p>
                <p className="text-xs text-slate-500">Проверено временем</p>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center pt-8">
            <div className="animate-bounce p-3 rounded-full bg-slate-100">
              <ArrowDown className="w-6 h-6 text-slate-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}