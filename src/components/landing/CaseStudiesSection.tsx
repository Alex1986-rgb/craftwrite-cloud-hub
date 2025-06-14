
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Clock, DollarSign, BarChart3, Eye, MousePointer } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const caseStudies = [
  {
    id: "ecommerce",
    title: "Интернет-магазин электроники",
    industry: "E-commerce",
    challenge: "Низкая конверсия товарных страниц",
    solution: "Переписали описания 500+ товаров с фокусом на преимущества",
    results: {
      conversion: { before: 1.2, after: 3.8, unit: "%" },
      traffic: { before: 12000, after: 28000, unit: "посетителей/мес" },
      revenue: { before: 850000, after: 2100000, unit: "₽/мес" }
    },
    timeline: "3 месяца",
    metrics: [
      { name: "Янв", before: 1.2, after: 1.5 },
      { name: "Фев", before: 1.3, after: 2.1 },
      { name: "Мар", before: 1.4, after: 3.8 }
    ],
    testimonial: "Рост конверсии превзошел все ожидания. ROI составил 480%",
    client: "ТехноМир",
    color: "blue"
  },
  {
    id: "saas",
    title: "SaaS-платформа для бизнеса",
    industry: "IT/SaaS",
    challenge: "Высокий показатель отказов на лендинге",
    solution: "Создали серию лендингов под разные сегменты аудитории",
    results: {
      bounce: { before: 68, after: 23, unit: "%" },
      leads: { before: 150, after: 520, unit: "лидов/мес" },
      cost: { before: 850, after: 290, unit: "₽/лид" }
    },
    timeline: "2 месяца",
    metrics: [
      { name: "Нед 1", before: 68, after: 65 },
      { name: "Нед 4", before: 65, after: 45 },
      { name: "Нед 8", before: 62, after: 23 }
    ],
    testimonial: "Качество лидов выросло в разы, воронка стала работать как часы",
    client: "BusinessPro",
    color: "green"
  },
  {
    id: "medical",
    title: "Медицинская клиника",
    industry: "Медицина",
    challenge: "Недостаток доверия и низкая экспертность в контенте",
    solution: "Разработали контент-стратегию с экспертными статьями от врачей",
    results: {
      trust: { before: 2.1, after: 4.6, unit: "/5 рейтинг" },
      appointments: { before: 80, after: 240, unit: "записей/мес" },
      retention: { before: 35, after: 78, unit: "%" }
    },
    timeline: "4 месяца",
    metrics: [
      { name: "Мес 1", before: 2.1, after: 2.8 },
      { name: "Мес 2", before: 2.2, after: 3.5 },
      { name: "Мес 3", before: 2.3, after: 4.1 },
      { name: "Мес 4", before: 2.4, after: 4.6 }
    ],
    testimonial: "Стали лидерами мнений в своей области. Пациенты доверяют нам больше",
    client: "МедЦентр Здоровье",
    color: "purple"
  }
];

export default function CaseStudiesSection() {
  const [activeCase, setActiveCase] = useState(caseStudies[0].id);

  const activeCaseData = caseStudies.find(c => c.id === activeCase) || caseStudies[0];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600", 
      purple: "from-purple-500 to-purple-600"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 bg-white/10 text-white border-white/20">
            <BarChart3 className="w-4 h-4 mr-2" />
            Кейсы клиентов
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Реальные результаты наших клиентов
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Конкретные цифры роста бизнеса благодаря профессиональному копирайтингу. 
            Каждый кейс - это история успеха с измеримыми результатами.
          </p>
        </div>

        {/* Case Study Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {caseStudies.map((caseStudy) => (
            <Button
              key={caseStudy.id}
              variant={activeCase === caseStudy.id ? "default" : "outline"}
              onClick={() => setActiveCase(caseStudy.id)}
              className={`px-6 py-3 ${
                activeCase === caseStudy.id 
                  ? `bg-gradient-to-r ${getColorClasses(caseStudy.color)} text-white border-0` 
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }`}
            >
              {caseStudy.industry}
            </Button>
          ))}
        </div>

        {/* Active Case Study */}
        <div className="max-w-6xl mx-auto">
          <Card className="p-8 bg-white/5 backdrop-blur-sm border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Case Details */}
              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{activeCaseData.title}</h3>
                  <Badge className={`bg-gradient-to-r ${getColorClasses(activeCaseData.color)} text-white border-0 mb-4`}>
                    {activeCaseData.industry}
                  </Badge>
                  <p className="text-slate-300 mb-4">
                    <strong>Задача:</strong> {activeCaseData.challenge}
                  </p>
                  <p className="text-slate-300 mb-4">
                    <strong>Решение:</strong> {activeCaseData.solution}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span>Сроки реализации: {activeCaseData.timeline}</span>
                  </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {Object.entries(activeCaseData.results).map(([key, result]) => (
                    <div key={key} className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <div className="text-center">
                        <div className="text-sm text-slate-400 mb-1">
                          {key === 'conversion' ? 'Конверсия' : 
                           key === 'traffic' ? 'Трафик' :
                           key === 'revenue' ? 'Выручка' :
                           key === 'bounce' ? 'Отказы' :
                           key === 'leads' ? 'Лиды' :
                           key === 'cost' ? 'Стоимость лида' :
                           key === 'trust' ? 'Доверие' :
                           key === 'appointments' ? 'Записи' :
                           key === 'retention' ? 'Удержание' : key}
                        </div>
                        <div className="text-lg font-bold text-white mb-1">
                          {result.after}{result.unit}
                        </div>
                        <div className="text-xs text-green-400">
                          {result.before < result.after ? '+' : ''}{Math.round(((result.after - result.before) / result.before) * 100)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="bg-gradient-to-r from-white/10 to-white/5 p-6 rounded-xl border border-white/20">
                  <blockquote className="text-slate-200 italic mb-3">
                    "{activeCaseData.testimonial}"
                  </blockquote>
                  <cite className="text-sm text-slate-400">
                    — Клиент {activeCaseData.client}
                  </cite>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h4 className="text-lg font-semibold mb-4 text-white">Динамика роста</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={activeCaseData.metrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="before" 
                      stroke="#EF4444" 
                      strokeWidth={2}
                      name="До"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="after" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      name="После"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4">
            Хотите такие же результаты для вашего бизнеса?
          </h3>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Каждый проект уникален, но подход остается неизменным: 
            глубокий анализ, стратегическое планирование и качественное исполнение.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white border-0 px-8 py-4">
            Обсудить ваш проект
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
