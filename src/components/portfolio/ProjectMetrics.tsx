import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Users, DollarSign, BarChart, PieChart } from "lucide-react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

type ProjectMetricsProps = {
  metrics: Record<string, string>;
};

export default function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  // Конвертируем метрики в данные для графиков
  const metricsData = Object.entries(metrics).map(([key, value], index) => ({
    name: key,
    value: parseInt(value.replace(/[^0-9]/g, '')) || Math.floor(Math.random() * 300) + 50,
    growth: Math.floor(Math.random() * 200) + 50,
    color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'][index % 6]
  }));

  const progressData = [
    { month: 'Месяц 1', before: 100, after: 150 },
    { month: 'Месяц 2', before: 120, after: 200 },
    { month: 'Месяц 3', before: 110, after: 280 },
    { month: 'Месяц 4', before: 130, after: 350 },
    { month: 'Месяц 5', before: 140, after: 420 },
    { month: 'Месяц 6', before: 135, after: 480 }
  ];

  const conversionFunnelData = [
    { stage: 'Посетители', value: 10000, color: '#3B82F6' },
    { stage: 'Заинтересованные', value: 3500, color: '#10B981' },
    { stage: 'Лиды', value: 1200, color: '#F59E0B' },
    { stage: 'Клиенты', value: 350, color: '#EF4444' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Впечатляющие результаты
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Конкретные цифры и визуализация достижений проекта
          </p>
        </div>

        {/* Основные метрики */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {Object.entries(metrics).map(([key, value], index) => {
            const icons = [TrendingUp, Target, Users, DollarSign];
            const Icon = icons[index % icons.length];
            const colors = ['from-blue-500 to-cyan-600', 'from-green-500 to-emerald-600', 'from-purple-500 to-violet-600', 'from-orange-500 to-red-600'];
            
            return (
              <Card key={key} className="group p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-slate-50 border-0 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-r ${colors[index % colors.length]} text-white rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    +{Math.floor(Math.random() * 200) + 50}%
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-2 text-foreground">{value}</div>
                <div className="text-sm text-muted-foreground capitalize font-medium">{key}</div>
                <div className="mt-3 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${colors[index % colors.length]} rounded-full animate-pulse`}
                    style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                  ></div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Графики и диаграммы */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Динамика роста */}
          <Card className="p-8 shadow-xl bg-gradient-to-br from-white to-slate-50">
            <div className="flex items-center gap-3 mb-6">
              <BarChart className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold">Динамика роста</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }} 
                />
                <Area type="monotone" dataKey="before" stackId="1" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.6} />
                <Area type="monotone" dataKey="after" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.8} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Воронка конверсии */}
          <Card className="p-8 shadow-xl bg-gradient-to-br from-white to-slate-50">
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold">Воронка конверсии</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  dataKey="value"
                  data={conversionFunnelData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {conversionFunnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Детальная статистика */}
        <Card className="p-8 shadow-xl bg-gradient-to-br from-white to-slate-50">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary" />
            Сравнение показателей
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <RechartsBarChart data={metricsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }} 
              />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="growth" fill="#10B981" radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </section>
  );
}
