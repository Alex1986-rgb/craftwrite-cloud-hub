
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Zap, ArrowRight, Lightbulb, CheckCircle, TrendingUp, Users, Clock } from "lucide-react";
import { useState } from "react";

type ProjectDetailsProps = {
  challenge: string;
  solution: string;
};

export default function ProjectDetails({ challenge, solution }: ProjectDetailsProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const processSteps = [
    {
      icon: Target,
      title: "Анализ проблемы",
      description: "Глубокое изучение вызовов и препятствий",
      color: "from-red-500 to-orange-600",
      bgColor: "from-red-50 to-orange-50"
    },
    {
      icon: Lightbulb,
      title: "Стратегия решения",
      description: "Разработка инновационного подхода",
      color: "from-yellow-500 to-amber-600",
      bgColor: "from-yellow-50 to-amber-50"
    },
    {
      icon: Zap,
      title: "Реализация",
      description: "Внедрение эффективного решения",
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      icon: TrendingUp,
      title: "Результат",
      description: "Достижение впечатляющих показателей",
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50"
    }
  ];

  const challengePoints = [
    "Низкие показатели конверсии",
    "Слабые позиции в поисковой выдаче",
    "Высокий показатель отказов",
    "Неэффективный пользовательский опыт"
  ];

  const solutionPoints = [
    "Комплексный SEO-анализ и оптимизация",
    "Переработка UX/UI дизайна",
    "Создание убедительного контента",
    "Внедрение аналитики и A/B тестов"
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full px-6 py-3 mb-6">
            <Target className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold">От вызова к решению</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-slate-900 to-primary bg-clip-text text-transparent">
            История трансформации
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Интерактивное путешествие от проблемы к инновационному решению
          </p>
        </div>

        {/* Process Timeline */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-blue-500 to-emerald-500 animate-shimmer"></div>
            
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <Card className={`p-6 text-center transition-all duration-700 hover:shadow-2xl hover:-translate-y-4 bg-gradient-to-br ${step.bgColor} border-0 shadow-lg relative overflow-hidden animate-scale-in`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {/* Hover Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className={`inline-flex p-4 bg-gradient-to-r ${step.color} text-white rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 shadow-lg`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-slate-800">{step.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                      
                      {/* Step Number */}
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-primary to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Challenge vs Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Challenge Section */}
          <div className="space-y-8">
            <Card className="group p-10 hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 bg-gradient-to-br from-red-50 to-orange-50 border-red-200/50 relative overflow-hidden animate-slide-up">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-r from-red-500 to-orange-600 rounded-full blur-2xl"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-lg">
                    <Target className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-playfair font-bold text-red-700">Вызов</h3>
                    <p className="text-red-600">Проблемы, которые нужно было решить</p>
                  </div>
                </div>
                
                <p className="text-slate-700 leading-relaxed text-lg mb-8">
                  {challenge}
                </p>

                {/* Challenge Points */}
                <div className="space-y-4">
                  {challengePoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-red-200/50 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700 font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Solution Section */}
          <div className="space-y-8">
            <Card className="group p-10 hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200/50 relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full blur-2xl"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-lg">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-playfair font-bold text-blue-700">Решение</h3>
                    <p className="text-blue-600">Инновационный подход к достижению целей</p>
                  </div>
                </div>
                
                <p className="text-slate-700 leading-relaxed text-lg mb-8">
                  {solution}
                </p>

                {/* Solution Points */}
                <div className="space-y-4">
                  {solutionPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-blue-200/50 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1 + 0.3}s` }}>
                      <div className="p-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg flex-shrink-0">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-slate-700 font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Success Transition */}
        <div className="mt-20 text-center">
          <Card className="inline-flex items-center gap-6 p-8 bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-bounce-soft">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <ArrowRight className="w-8 h-8" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">Результат трансформации</div>
                <div className="text-emerald-100">От проблемы к успеху за {Math.floor(Math.random() * 3) + 1} месяца</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
