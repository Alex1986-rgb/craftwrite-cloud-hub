
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, TrendingUp, Users, DollarSign, Star, Calendar, Target, Award, ArrowRight, Share2, Heart } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: number;
    title: string;
    category: string;
    description: string;
    metrics: Record<string, string>;
    tags: string[];
    featured?: boolean;
    results: string[];
  } | null;
}

const generateDetailedData = () => ({
  timeline: Array.from({ length: 6 }, (_, i) => ({
    month: `Месяц ${i + 1}`,
    before: 100 + i * 20,
    after: 150 + i * 45
  })),
  categories: [
    { name: 'Конверсия', value: 35, color: '#3B82F6' },
    { name: 'Трафик', value: 25, color: '#10B981' },
    { name: 'Продажи', value: 40, color: '#F59E0B' }
  ],
  roi: Array.from({ length: 12 }, (_, i) => ({
    month: `М${i + 1}`,
    roi: Math.floor(Math.random() * 200) + 100 + i * 20
  }))
});

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'results' | 'process'>('overview');
  const [isLiked, setIsLiked] = useState(false);
  
  if (!project) return null;

  const detailedData = generateDetailedData();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
                  {project.category}
                </Badge>
                {project.featured && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    ПРЕМИУМ
                  </Badge>
                )}
              </div>
              <DialogTitle className="text-3xl font-playfair font-bold text-slate-900 mb-2 leading-tight">
                {project.title}
              </DialogTitle>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </div>
            
            <div className="flex items-center gap-2 ml-6">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  isLiked ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-red-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <Button variant="outline" size="sm" className="rounded-full">
                <Share2 className="w-4 h-4 mr-2" />
                Поделиться
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="sticky top-[120px] z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 px-6">
          <div className="flex gap-1">
            {[
              { id: 'overview', label: 'Обзор', icon: TrendingUp },
              { id: 'results', label: 'Результаты', icon: Target },
              { id: 'process', label: 'Процесс', icon: Award }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-300 border-b-2 ${
                    activeTab === tab.id
                      ? 'text-primary border-primary bg-primary/5'
                      : 'text-slate-600 border-transparent hover:text-primary hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(project.metrics).map(([key, value], index) => {
                  const icons = [TrendingUp, Users, DollarSign];
                  const Icon = icons[index % icons.length];
                  const colors = ['from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-violet-500'];
                  
                  return (
                    <Card key={key} className="p-6 text-center bg-gradient-to-br from-white to-slate-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                      <div className={`inline-flex p-4 bg-gradient-to-r ${colors[index % colors.length]} rounded-2xl mb-4 shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-4xl font-bold text-slate-800 mb-2">{value}</div>
                      <div className="text-sm text-slate-600 capitalize font-semibold uppercase tracking-wide">{key}</div>
                    </Card>
                  );
                })}
              </div>

              {/* Growth Chart */}
              <Card className="p-8 bg-gradient-to-br from-white to-slate-50 border-0 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  Динамика роста показателей
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={detailedData.timeline}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" className="text-sm" />
                    <YAxis className="text-sm" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                      }} 
                    />
                    <Area type="monotone" dataKey="before" stackId="1" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.6} name="До" />
                    <Area type="monotone" dataKey="after" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.8} name="После" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              {/* Tags */}
              <Card className="p-6 bg-gradient-to-br from-white to-slate-50 border-0 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-slate-800">Технологии и подходы</h3>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag, index) => (
                    <Badge 
                      key={tag} 
                      className={`px-4 py-2 font-medium text-sm transition-all duration-200 hover:scale-105 ${
                        index % 4 === 0 ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                        index % 4 === 1 ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                        index % 4 === 2 ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' :
                        'bg-orange-100 text-orange-700 hover:bg-orange-200'
                      }`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'results' && (
            <div className="space-y-8">
              {/* Key Results */}
              <Card className="p-8 bg-gradient-to-br from-white to-slate-50 border-0 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Target className="w-6 h-6 text-primary" />
                  Ключевые достижения
                </h3>
                <div className="grid gap-4">
                  {project.results.map((result, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700 font-medium text-lg">{result}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6 bg-gradient-to-br from-white to-slate-50 border-0 shadow-lg">
                  <h4 className="text-xl font-bold mb-4">Распределение улучшений</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        dataKey="value"
                        data={detailedData.categories}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {detailedData.categories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-white to-slate-50 border-0 shadow-lg">
                  <h4 className="text-xl font-bold mb-4">ROI по месяцам</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={detailedData.roi.slice(0, 6)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="roi" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="space-y-8">
              <Card className="p-8 bg-gradient-to-br from-white to-slate-50 border-0 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Award className="w-6 h-6 text-primary" />
                  Процесс реализации
                </h3>
                <div className="space-y-6">
                  {[
                    { phase: "Анализ и аудит", duration: "2 недели", description: "Глубокий анализ текущего состояния и выявление точек роста" },
                    { phase: "Стратегия и планирование", duration: "1 неделя", description: "Разработка детальной стратегии и roadmap проекта" },
                    { phase: "Реализация", duration: "6 недель", description: "Поэтапное внедрение решений с постоянным мониторингом" },
                    { phase: "Оптимизация", duration: "2 недели", description: "Тонкая настройка и оптимизация для максимального эффекта" }
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-md border border-slate-100">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h4 className="text-xl font-bold text-slate-800">{step.phase}</h4>
                          <Badge className="bg-blue-100 text-blue-700">{step.duration}</Badge>
                        </div>
                        <p className="text-slate-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="sticky bottom-0 bg-gradient-to-r from-primary to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xl font-bold mb-1">Заинтересовались проектом?</h4>
              <p className="opacity-90">Обсудим, как получить похожие результаты для вашего бизнеса</p>
            </div>
            <Button className="bg-white text-primary hover:bg-slate-100 font-semibold px-8 py-3 rounded-xl">
              <span className="mr-2">Обсудить проект</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
