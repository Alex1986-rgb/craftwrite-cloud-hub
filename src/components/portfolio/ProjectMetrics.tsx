
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Users, DollarSign, BarChart, PieChart, Activity, Award } from "lucide-react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, Area, AreaChart, RadialBarChart, RadialBar, Legend } from 'recharts';
import { useState } from "react";

type ProjectMetricsProps = {
  metrics: Record<string, string>;
};

export default function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  // Enhanced data generation
  const metricsData = Object.entries(metrics).map(([key, value], index) => ({
    name: key,
    value: parseInt(value.replace(/[^0-9]/g, '')) || Math.floor(Math.random() * 300) + 50,
    growth: Math.floor(Math.random() * 200) + 50,
    target: Math.floor(Math.random() * 100) + 200,
    color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'][index % 6]
  }));

  const performanceData = [
    { month: 'Месяц 1', before: 100, after: 150, target: 140 },
    { month: 'Месяц 2', before: 120, after: 200, target: 180 },
    { month: 'Месяц 3', before: 110, after: 280, target: 250 },
    { month: 'Месяц 4', before: 130, after: 350, target: 320 },
    { month: 'Месяц 5', before: 140, after: 420, target: 400 },
    { month: 'Месяц 6', before: 135, after: 480, target: 450 }
  ];

  const radialData = [
    { name: 'Конверсия', value: 85, fill: '#3B82F6' },
    { name: 'Трафик', value: 92, fill: '#10B981' },
    { name: 'Вовлеченность', value: 78, fill: '#F59E0B' },
    { name: 'ROI', value: 96, fill: '#EF4444' }
  ];

  const impactMetrics = [
    { label: 'Увеличение продаж', value: '320%', icon: TrendingUp, color: 'from-green-500 to-emerald-600' },
    { label: 'Рост конверсии', value: '245%', icon: Target, color: 'from-blue-500 to-cyan-600' },
    { label: 'Новые клиенты', value: '1,200+', icon: Users, color: 'from-purple-500 to-violet-600' },
    { label: 'Дополнительная прибыль', value: '$2.5M', icon: DollarSign, color: 'from-orange-500 to-red-600' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-mesh"></div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full px-6 py-3 mb-6">
            <Activity className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold">Аналитика результатов</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Впечатляющие результаты
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Детальная аналитика и визуализация достижений проекта с интерактивными диаграммами
          </p>
        </div>

        {/* Impact Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {impactMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card 
                key={metric.label} 
                className="group p-6 hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 bg-gradient-to-br from-white to-slate-50 border-0 shadow-lg cursor-pointer overflow-hidden relative animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setActiveMetric(metric.label)}
                onMouseLeave={() => setActiveMetric(null)}
              >
                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 bg-gradient-to-r ${metric.color} text-white rounded-2xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 shadow-lg`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200 animate-pulse">
                      ↗ Рост
                    </Badge>
                  </div>
                  
                  <div className="text-4xl font-bold mb-3 text-foreground group-hover:scale-105 transition-transform duration-300">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                    {metric.label}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-1000 group-hover:animate-shimmer`}
                      style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                    ></div>
                  </div>
                  
                  {/* Animated Elements */}
                  <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r ${metric.color} rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300`}></div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Interactive Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Performance Timeline */}
          <Card className="p-8 shadow-xl bg-gradient-to-br from-white to-slate-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-slide-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl">
                <BarChart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Динамика роста</h3>
                <p className="text-slate-600">Сравнение до и после внедрения</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="beforeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#94a3b8" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="afterGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                  }} 
                />
                <Area type="monotone" dataKey="before" stackId="1" stroke="#94a3b8" fill="url(#beforeGradient)" />
                <Area type="monotone" dataKey="after" stackId="2" stroke="#3B82F6" fill="url(#afterGradient)" />
                <Line type="monotone" dataKey="target" stroke="#10B981" strokeDasharray="5 5" strokeWidth={2} dot={{ fill: '#10B981' }} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Radial Performance Chart */}
          <Card className="p-8 shadow-xl bg-gradient-to-br from-white to-slate-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl">
                <PieChart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Эффективность KPI</h3>
                <p className="text-slate-600">Процент достижения целей</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={radialData}>
                <RadialBar
                  minAngle={15}
                  label={{ fill: '#666', position: 'insideStart' }}
                  background
                  clockWise={true}
                  dataKey="value"
                  cornerRadius={10}
                />
                <Legend
                  iconSize={8}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ fontSize: '14px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                  }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Card className="p-8 shadow-xl bg-gradient-to-br from-white to-slate-50 animate-reveal">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Сравнительный анализ метрик</h3>
              <p className="text-slate-600">Детальное сопоставление показателей</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={450}>
            <RechartsBarChart data={metricsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }} 
              />
              <Legend />
              <Bar dataKey="value" name="Текущий результат" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="growth" name="Рост" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" name="Цель" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </section>
  );
}
