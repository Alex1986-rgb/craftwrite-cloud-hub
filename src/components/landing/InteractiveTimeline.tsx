import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Zap, Target } from "lucide-react";
import HolographicCard from "./HolographicCard";

const TIMELINE_STEPS = [
  {
    day: "День 1",
    phase: "Анализ и планирование",
    description: "Глубокий анализ конкурентов, подбор семантического ядра, создание контент-плана",
    icon: Target,
    color: "from-blue-500 to-cyan-400",
    details: [
      "Анализ ТОП-10 конкурентов",
      "Подбор 500+ ключевых слов",
      "LSI-семантика и синонимы",
      "Техническое задание"
    ]
  },
  {
    day: "День 2",
    phase: "AI-генерация + экспертная проверка",
    description: "Создание текстов с помощью AI и профессиональная проверка каждого материала",
    icon: Zap,
    color: "from-purple-500 to-pink-400",
    details: [
      "AI-генерация уникального контента",
      "Проверка экспертами-копирайтерами", 
      "Оптимизация под поисковые запросы",
      "Создание метатегов"
    ]
  },
  {
    day: "День 3",
    phase: "Финализация и доставка",
    description: "Финальная проверка качества, форматирование и подготовка к загрузке",
    icon: CheckCircle,
    color: "from-green-500 to-emerald-400",
    details: [
      "Финальная проверка на уникальность",
      "Форматирование в Excel/CSV",
      "Техническая оптимизация",
      "Готовый результат с гарантией"
    ]
  }
];

export default function InteractiveTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="max-w-6xl mx-auto py-16">
      <div className="text-center mb-12">
        <Badge className="glass-holographic px-6 py-3 text-lg mb-6">
          ⏱️ 3-дневный профессиональный цикл
        </Badge>
        <h3 className="text-3xl md:text-4xl font-bold text-holographic mb-4">
          Качество превыше скорости
        </h3>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Каждый этап работы контролируется экспертами для достижения максимального качества
        </p>
      </div>

      {/* Timeline Navigation */}
      <div className="flex justify-center mb-12">
        <div className="flex space-x-4">
          {TIMELINE_STEPS.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeStep === index
                    ? 'glass-ultra text-primary'
                    : 'glass-panel text-muted-foreground hover:glass-interactive'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{step.day}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Content */}
      <HolographicCard variant="ultra" className="p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${TIMELINE_STEPS[activeStep].color} flex items-center justify-center`}>
                {(() => {
                  const IconComponent = TIMELINE_STEPS[activeStep].icon;
                  return <IconComponent className="w-8 h-8 text-white" />;
                })()}
              </div>
              <div>
                <h4 className="text-2xl font-bold text-holographic">
                  {TIMELINE_STEPS[activeStep].phase}
                </h4>
                <Badge variant="outline" className="mt-2">
                  {TIMELINE_STEPS[activeStep].day}
                </Badge>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {TIMELINE_STEPS[activeStep].description}
            </p>

            <div className="space-y-3">
              {TIMELINE_STEPS[activeStep].details.map((detail, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* 3D Visualization */}
            <div className="glass-holographic p-8 rounded-2xl">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Прогресс этапа</span>
                  <Badge className="neon-glow">
                    {Math.round(((activeStep + 1) / TIMELINE_STEPS.length) * 100)}%
                  </Badge>
                </div>
                
                <div className="relative h-4 bg-muted/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 morphing-gradient"
                    style={{ width: `${((activeStep + 1) / TIMELINE_STEPS.length) * 100}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8">
                  {TIMELINE_STEPS.map((step, index) => (
                    <div
                      key={index}
                      className={`text-center p-3 rounded-lg transition-all duration-300 ${
                        index <= activeStep
                          ? 'glass-interactive text-primary'
                          : 'glass-panel text-muted-foreground'
                      }`}
                    >
                      <div className="text-2xl mb-2">
                        {index <= activeStep ? '✅' : '⏳'}
                      </div>
                      <div className="text-xs font-medium">{step.day}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </HolographicCard>

      {/* Quality Metrics */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {[
          { label: "Уникальность текстов", value: "99.8%", icon: "🎯" },
          { label: "Экспертных проверок", value: "100%", icon: "👨‍💼" },
          { label: "Дней гарантии", value: "30", icon: "🛡️" }
        ].map((metric, index) => (
          <HolographicCard key={index} variant="neon" className="p-6 text-center">
            <div className="text-4xl mb-3">{metric.icon}</div>
            <div className="text-3xl font-bold text-holographic mb-2">
              {metric.value}
            </div>
            <div className="text-sm text-muted-foreground">{metric.label}</div>
          </HolographicCard>
        ))}
      </div>
    </div>
  );
}