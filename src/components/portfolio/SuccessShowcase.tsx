
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Zap, Rocket, Star, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const successMetrics = [
  {
    title: "Общий ROI наших клиентов",
    value: "420%",
    description: "Средняя окупаемость инвестиций",
    icon: Trophy,
    color: "from-yellow-400 to-orange-500"
  },
  {
    title: "Увеличение конверсии",
    value: "180%",
    description: "В среднем по всем проектам",
    icon: Target,
    color: "from-green-400 to-emerald-500"
  },
  {
    title: "Рост органического трафика",
    value: "250%",
    description: "SEO-проекты показывают стабильный рост",
    icon: Zap,
    color: "from-blue-400 to-cyan-500"
  },
  {
    title: "Успешных запусков",
    value: "95%",
    description: "Процент проектов, превысивших KPI",
    icon: Rocket,
    color: "from-purple-400 to-violet-500"
  }
];

const industryData = [
  { name: 'E-commerce', projects: 25, growth: 280, color: '#3B82F6' },
  { name: 'FinTech', projects: 15, growth: 320, color: '#10B981' },
  { name: 'SaaS', projects: 20, growth: 180, color: '#F59E0B' },
  { name: 'Образование', projects: 12, growth: 220, color: '#EF4444' },
  { name: 'Медицина', projects: 8, growth: 190, color: '#8B5CF6' }
];

const timelineData = [
  { month: 'Янв', projects: 3, success: 95 },
  { month: 'Фев', projects: 5, success: 92 },
  { month: 'Мар', projects: 7, success: 96 },
  { month: 'Апр', projects: 6, success: 94 },
  { month: 'Май', projects: 8, success: 98 },
  { month: 'Июн', projects: 10, success: 97 }
];

export default function SuccessShowcase() {
  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-primary/10 to-background relative overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-purple-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/15 to-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Заголовок секции */}
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-gradient-to-r from-primary to-purple-600 text-white border-0 px-6 py-2 text-lg font-semibold">
            <Star className="w-5 h-5 mr-2" />
            Доказанная эффективность
          </Badge>
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-8 bg-gradient-to-r from-white via-slate-100 to-primary bg-clip-text text-transparent">
            Результаты, которые вдохновляют
          </h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            За последний год мы помогли 60+ компаниям достичь выдающихся результатов. 
            Наши клиенты получают измеримый ROI и превышают все поставленные цели.
          </p>
        </div>

        {/* Основные метрики успеха */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {successMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="group p-8 bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl">
                <div className="text-center">
                  <div className={`inline-flex p-4 bg-gradient-to-r ${metric.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
                  <div className="text-lg font-semibold text-slate-200 mb-2">{metric.title}</div>
                  <div className="text-sm text-slate-400">{metric.description}</div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Графики и аналитика */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Рост по отраслям */}
          <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-primary" />
              Результаты по отраслям
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={industryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <YAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.95)', 
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
                  }} 
                />
                <Bar dataKey="growth" fill="url(#gradientBar)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="gradientBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1E40AF" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Динамика успешности */}
          <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Target className="w-8 h-8 text-primary" />
              Динамика успешности проектов
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="month" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <YAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.95)', 
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="success" 
                  stroke="#10B981" 
                  strokeWidth={4}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Мотивирующие цитаты клиентов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "Наша выручка выросла на 320% за 6 месяцев работы с CopyPro Cloud",
              author: "Михаил Петров",
              company: "TechStore",
              result: "+320% выручки"
            },
            {
              quote: "Конверсия лендинга увеличилась с 2% до 18% — невероятный результат!",
              author: "Анна Сидорова", 
              company: "CodeAcademy",
              result: "+800% конверсии"
            },
            {
              quote: "Привлекли $2M инвестиций благодаря качественному контенту",
              author: "Дмитрий Волков",
              company: "PayFlow",
              result: "$2M инвестиций"
            }
          ].map((testimonial, index) => (
            <Card key={index} className="p-6 bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="mb-4">
                <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                  {testimonial.result}
                </Badge>
              </div>
              <blockquote className="text-slate-200 italic mb-4 text-lg leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="text-white font-semibold">{testimonial.author}</div>
              <div className="text-slate-400 text-sm">{testimonial.company}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
