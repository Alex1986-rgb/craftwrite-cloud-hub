import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Target, TrendingUp, Users, Clock, FileText } from "lucide-react";

const TECH_FEATURES = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "AI-Powered Analysis",
    description: "Нейросети анализируют ТОП-10 конкурентов и создают уникальный контент",
    stats: "99.2% уникальности",
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Smart LSI Distribution", 
    description: "Равномерное распределение ключевых слов и LSI-семантики по тексту",
    stats: "3-5% плотность ключей",
    gradient: "from-purple-500 to-pink-400"
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Conversion Optimization",
    description: "Тексты создаются с учетом психологии продаж и конверсионных триггеров",
    stats: "До 180% рост конверсии",
    gradient: "from-green-500 to-emerald-400"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Quality Assurance",
    description: "Профессиональная обработка до 10,000 URL за 3 дня с экспертной проверкой",
    stats: "3 дня = 10К страниц",
    gradient: "from-orange-500 to-red-400"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Expert Supervision",
    description: "Каждый текст проверяется командой экспертов-копирайтеров",
    stats: "50+ экспертов",
    gradient: "from-indigo-500 to-blue-400"
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Ready-to-Use Format",
    description: "Получаете структурированную таблицу, готовую для загрузки на сайт",
    stats: "Excel/CSV формат",
    gradient: "from-teal-500 to-cyan-400"
  }
];

const PROCESSING_METRICS = [
  { label: "Текстов в день", value: "2000+", icon: "⚡" },
  { label: "Ключей анализируется", value: "2.5M", icon: "🔍" },
  { label: "Экспертных проверок", value: "100%", icon: "🎯" },
  { label: "Дней полного цикла", value: "3", icon: "🌍" }
];

export default function TechShowcaseSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/50 to-purple-900/30">
        <div className="absolute inset-0">
          {/* Floating tech elements */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16">
          <Badge className="glass-interactive px-4 py-2 text-lg">
            ⚡ Технологии будущего
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            <span className="text-gradient">AI-технологии</span>
            <br />
            <span>массового создания контента</span>
          </h2>
          
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Уникальная система, объединяющая возможности нейросетей, 
            экспертизу копирайтеров и передовые алгоритмы SEO-оптимизации
          </p>
        </div>

        {/* Processing Metrics */}
        <Card className="glass-premium max-w-4xl mx-auto p-8 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Качество за 3 дня работы
              </h3>
              <p className="text-blue-200">Метрики профессионального подхода к массовому контенту</p>
            </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PROCESSING_METRICS.map((metric, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-3xl">{metric.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-gradient">
                  {metric.value}
                </div>
                <div className="text-sm text-blue-200">{metric.label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tech Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TECH_FEATURES.map((feature, index) => (
            <Card 
              key={index} 
              className="glass-panel p-6 hover:glass-interactive transition-all duration-300 stagger-item group"
            >
              <div className="space-y-4">
                
                {/* Icon with gradient background */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  
                  <p className="text-blue-100 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <Badge className="glass-interactive text-cyan-300 border-cyan-300/30">
                    {feature.stats}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* AI Process Visualization */}
        <div className="mt-20">
          <Card className="glass-neon p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">
                3-дневный цикл качественной обработки
              </h3>
              <p className="text-blue-200">
                Схема профессионального процесса создания массового SEO-контента
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-4 items-center">
              {[
                { step: "День 1", desc: "Анализ + подбор ключей", color: "blue" },
                { step: "День 2", desc: "AI генерация текстов", color: "purple" },
                { step: "День 2", desc: "Экспертная проверка", color: "green" },
                { step: "День 3", desc: "Финальная проверка", color: "orange" },
                { step: "✓", desc: "Готовый контент", color: "cyan" }
              ].map((item, index) => (
                <div key={index} className="text-center space-y-3">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-${item.color}-500 to-${item.color}-400 flex items-center justify-center text-white font-bold text-lg`}>
                    {item.step}
                  </div>
                  <p className="text-sm text-blue-200">{item.desc}</p>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-400/50 to-transparent transform translate-x-4"></div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}