
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, Users, DollarSign, Eye, MousePointer, Clock, ArrowUp, ArrowDown } from "lucide-react";

type OptimizedProjectMetricsProps = {
  metrics: {
    [key: string]: string;
  };
};

const metricsData = [
  { name: 'Конверсия', before: 1.2, after: 4.14, growth: 245 },
  { name: 'Трафик', before: 100, after: 280, growth: 180 },
  { name: 'Время на сайте', before: 84, after: 138, growth: 65 },
  { name: 'Отказы', before: 78, after: 45, growth: -42 }
];

const timelineData = [
  { month: 'Янв', before: 1.2, after: 1.2 },
  { month: 'Фев', before: 1.3, after: 1.8 },
  { month: 'Мар', before: 1.1, after: 2.9 },
  { month: 'Апр', before: 1.2, after: 4.14 }
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B'];

export default function OptimizedProjectMetrics({ metrics }: OptimizedProjectMetricsProps) {
  return (
    <section id="metrics" className="py-16 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-green-100 text-green-700 border-green-200 px-6 py-2 text-lg mb-6">
            Измеримые результаты
          </Badge>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-slate-900">
            Как изменились ключевые метрики
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Данные из Google Analytics и внутренних систем TechStore за период с января по апрель 2024
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metricsData.map((metric, index) => {
            const isNegativeGood = metric.name === 'Отказы';
            const isPositive = isNegativeGood ? metric.growth < 0 : metric.growth > 0;
            
            return (
              <Card key={metric.name} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-slate-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-slate-600">{metric.name}</div>
                  <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    {Math.abs(metric.growth)}%
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">До:</span>
                    <span className="font-bold text-slate-700">{metric.before}{metric.name === 'Трафик' ? '' : '%'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">После:</span>
                    <span className={`font-bold text-xl ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.after}{metric.name === 'Трафик' ? '' : '%'}
                    </span>
                  </div>
                </div>

                {/* Mini progress bar */}
                <div className="mt-4 w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(Math.abs(metric.growth), 100)}%` }}
                  ></div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Timeline Chart */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6 text-slate-900">Динамика конверсии по месяцам</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={timelineData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name === 'after' ? 'После оптимизации' : 'До оптимизации']}
                />
                <Area type="monotone" dataKey="before" stroke="#EF4444" fill="#FEE2E2" strokeWidth={2} />
                <Area type="monotone" dataKey="after" stroke="#10B981" fill="#D1FAE5" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-sm text-slate-600">До оптимизации</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-600">После оптимизации</span>
              </div>
            </div>
          </Card>

          {/* Pie Chart */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6 text-slate-900">Распределение улучшений</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={metricsData.filter(m => m.growth > 0)}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="growth"
                  label={({ name, growth }) => `${name}: +${growth}%`}
                >
                  {metricsData.filter(m => m.growth > 0).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`+${value}%`, 'Рост']} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Bottom Stats */}
        <Card className="p-8 bg-gradient-to-r from-primary via-blue-600 to-purple-600 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Итоговый результат за 3 месяца</h3>
            <p className="text-blue-100 text-lg">Комплексная оптимизация контента принесла измеримые результаты</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mx-auto mb-4">
                <MousePointer className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">245%</div>
              <div className="text-blue-100">Рост конверсии</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">180%</div>
              <div className="text-blue-100">Рост трафика</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mx-auto mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">65%</div>
              <div className="text-blue-100">Время на сайте</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mx-auto mb-4">
                <DollarSign className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold mb-2">320%</div>
              <div className="text-blue-100">Рост продаж</div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
