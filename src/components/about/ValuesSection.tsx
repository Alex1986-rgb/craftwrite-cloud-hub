
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart,
  Shield,
  Users,
  Lightbulb,
  Target,
  Zap,
  CheckCircle,
  TrendingUp
} from "lucide-react";

const coreValues = [
  {
    icon: Shield,
    title: "Честность и прозрачность",
    description: "Открытые процессы, честные цены, прозрачная отчетность по каждому проекту",
    principles: [
      "Никаких скрытых платежей",
      "Детальная отчетность",
      "Открытое общение",
      "Честная оценка сроков"
    ],
    color: "blue"
  },
  {
    icon: Target,
    title: "Результативность",
    description: "Каждый текст создается с четкой целью и измеримыми KPI для достижения бизнес-результатов",
    principles: [
      "Фокус на ROI клиента",
      "Измеримые метрики",
      "A/B тестирование",
      "Постоянная оптимизация"
    ],
    color: "green"
  },
  {
    icon: Users,
    title: "Клиентоориентированность",
    description: "Интересы клиента превыше всего. Мы работаем как внутренняя команда вашего бизнеса",
    principles: [
      "Индивидуальный подход",
      "24/7 поддержка",
      "Быстрое реагирование",
      "Долгосрочные отношения"
    ],
    color: "purple"
  },
  {
    icon: Lightbulb,
    title: "Инновации и развитие",
    description: "Постоянно изучаем новые тренды, технологии и методы для повышения эффективности",
    principles: [
      "Внедрение AI-инструментов",
      "Изучение алгоритмов",
      "Новые форматы контента",
      "Обучение команды"
    ],
    color: "orange"
  },
  {
    icon: Heart,
    title: "Качество превыше количества",
    description: "Лучше выполнить 10 проектов отлично, чем 50 посредственно. Качество - наш главный актив",
    principles: [
      "Многоступенчатая проверка",
      "Ручная модерация",
      "Экспертная оценка",
      "Гарантия качества"
    ],
    color: "red"
  },
  {
    icon: Zap,
    title: "Скорость и эффективность",
    description: "Быстрые решения без ущерба качеству. Оптимизированные процессы и автоматизация",
    principles: [
      "Соблюдение дедлайнов",
      "Быстрая обратная связь",
      "Эффективные процессы",
      "Автоматизация рутины"
    ],
    color: "indigo"
  }
];

const workingPrinciples = [
  {
    icon: CheckCircle,
    title: "Системный подход",
    description: "Каждый проект проходит через отработанную систему процессов"
  },
  {
    icon: TrendingUp,
    title: "Постоянное улучшение",
    description: "Анализируем результаты и оптимизируем методы работы"
  },
  {
    icon: Users,
    title: "Командная работа",
    description: "Синергия экспертов разных направлений для лучшего результата"
  },
  {
    icon: Target,
    title: "Ориентация на цель",
    description: "Каждое действие направлено на достижение бизнес-целей клиента"
  }
];

export default function ValuesSection() {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
      red: "from-red-500 to-red-600",
      indigo: "from-indigo-500 to-indigo-600"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Heart className="w-4 h-4 mr-2" />
            Ценности компании
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Принципы, которыми мы руководствуемся
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Наши ценности не просто написаны на стене — они определяют каждое решение, 
            каждый процесс и каждое взаимодействие с клиентами.
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {coreValues.map((value, index) => (
            <Card key={index} className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className={`w-16 h-16 bg-gradient-to-r ${getColorClasses(value.color)} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <value.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 text-center mb-4">
                {value.title}
              </h3>
              
              <p className="text-slate-600 text-center mb-6 leading-relaxed">
                {value.description}
              </p>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-800 text-sm uppercase tracking-wide">
                  Как мы это реализуем:
                </h4>
                {value.principles.map((principle, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className={`w-4 h-4 text-${value.color}-500 flex-shrink-0`} />
                    <span className="text-sm text-slate-600">{principle}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Working Principles */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              Принципы работы
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Основные подходы, которые делают нашу работу эффективной и результативной
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workingPrinciples.map((principle, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <principle.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-slate-800 mb-3">{principle.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center">
          <Card className="p-8 lg:p-12 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-0 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Наша миссия
            </h3>
            <blockquote className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto italic">
              "Помогать бизнесу расти через силу слова. Мы создаем контент, который не просто 
              информирует, а вдохновляет к действию, строит доверие и приводит к результатам. 
              Каждый текст — это инвестиция в успех наших клиентов."
            </blockquote>
            <cite className="block mt-6 text-slate-300">
              — Команда CopyPro Cloud
            </cite>
          </Card>
        </div>
      </div>
    </section>
  );
}
