
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy,
  Target,
  Users,
  TrendingUp,
  Award,
  Star,
  Zap,
  Globe,
  Clock,
  Heart,
  ThumbsUp,
  Rocket
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const keyMetrics = [
  {
    icon: Users,
    value: "750+",
    label: "Довольных клиентов",
    description: "По всему миру",
    growth: "+45% за год",
    color: "blue"
  },
  {
    icon: Target,
    value: "5,000+",
    label: "Проектов выполнено",
    description: "С 2019 года", 
    growth: "+120% за год",
    color: "green"
  },
  {
    icon: TrendingUp,
    value: "180%",
    label: "Средний рост ROI",
    description: "Клиентов после работы с нами",
    growth: "Медианный показатель",
    color: "purple"
  },
  {
    icon: Clock,
    value: "24ч",
    label: "Среднее время выполнения",
    description: "Срочных заказов",
    growth: "99.2% в срок",
    color: "orange"
  }
];

const industryBreakdown = [
  { name: 'E-commerce', value: 35, color: '#3B82F6' },
  { name: 'IT/SaaS', value: 25, color: '#10B981' },
  { name: 'Финансы', value: 15, color: '#8B5CF6' },
  { name: 'Медицина', value: 12, color: '#F59E0B' },
  { name: 'Образование', value: 8, color: '#EF4444' },
  { name: 'Другое', value: 5, color: '#6B7280' }
];

const yearlyGrowth = [
  { year: '2019', projects: 45, clients: 12 },
  { year: '2020', projects: 320, clients: 85 },
  { year: '2021', projects: 750, clients: 180 },
  { year: '2022', projects: 1400, clients: 320 },
  { year: '2023', projects: 2800, clients: 500 },
  { year: '2024', projects: 5000, clients: 750 }
];

const qualityMetrics = [
  { metric: "Уникальность текстов", value: 98.7, target: 95 },
  { metric: "Соблюдение сроков", value: 99.2, target: 95 },
  { metric: "Удовлетворенность клиентов", value: 96.8, target: 90 },
  { metric: "Возвращаемость клиентов", value: 94.5, target: 80 }
];

const awards = [
  {
    year: 2024,
    title: "Агентство года",
    organization: "Content Marketing Awards",
    icon: Trophy,
    description: "За выдающиеся результаты в контент-маркетинге"
  },
  {
    year: 2023,
    title: "Лучший SEO-копирайтинг",
    organization: "Digital Marketing Awards",
    icon: Star,
    description: "Признание экспертов за качество SEO-контента"
  },
  {
    year: 2022,
    title: "Инновация года",
    organization: "Marketing Innovation Summit",
    icon: Rocket,
    description: "За внедрение AI-технологий в копирайтинг"
  },
  {
    year: 2021,
    title: "Топ-10 агентств",
    organization: "Marketing Russia",
    icon: Award,
    description: "Вошли в топ-10 лучших агентств России"
  }
];

export default function AchievementsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Trophy className="w-4 h-4 mr-2" />
            Достижения и результаты
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Цифры, которые говорят за нас
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Наши достижения — это результат упорной работы, профессионализма команды 
            и доверия клиентов, которые выбирают нас снова и снова.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {keyMetrics.map((metric, index) => (
            <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
              <div className={`w-16 h-16 bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <metric.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-2">{metric.value}</div>
              <div className="font-semibold text-slate-700 mb-2">{metric.label}</div>
              <div className="text-sm text-slate-500 mb-3">{metric.description}</div>
              <Badge variant="secondary" className={`text-${metric.color}-600 bg-${metric.color}-50`}>
                {metric.growth}
              </Badge>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Industry Breakdown */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">
              Распределение по индустриям
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={industryBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {industryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Yearly Growth */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">
              Рост компании по годам
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="projects" fill="#3B82F6" name="Проекты" />
                <Bar dataKey="clients" fill="#10B981" name="Клиенты" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Quality Metrics */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-slate-800">
            Показатели качества
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {qualityMetrics.map((metric, index) => (
              <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-slate-800">{metric.metric}</h4>
                  <span className="text-2xl font-bold text-blue-600">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-3 mb-2" />
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Цель: {metric.target}%</span>
                  <span className="text-green-600 font-medium">
                    +{(metric.value - metric.target).toFixed(1)}%
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Awards and Recognition */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              Награды и признание
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Профессиональное сообщество отмечает качество нашей работы и вклад в развитие индустрии
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {awards.map((award, index) => (
              <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <award.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-slate-800">{award.title}</h4>
                      <Badge variant="secondary">{award.year}</Badge>
                    </div>
                    <p className="text-blue-600 font-medium mb-2">{award.organization}</p>
                    <p className="text-slate-600 text-sm">{award.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Client Satisfaction */}
        <div className="mt-16 text-center">
          <Card className="p-8 lg:p-12 bg-gradient-to-r from-green-50 to-emerald-50 border-0 shadow-lg">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Heart className="w-12 h-12 text-red-500" />
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
                Что говорят наши клиенты
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">96.8%</div>
                <div className="text-slate-600">Удовлетворенность</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">94.5%</div>
                <div className="text-slate-600">Возвращаются к нам</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
                <div className="text-slate-600">Средняя оценка</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
                <div className="text-slate-600">Рекомендуют нас</div>
              </div>
            </div>
            
            <blockquote className="text-lg text-slate-700 italic max-w-3xl mx-auto">
              "Более 750 компаний по всему миру доверяют нам свои проекты. 
              Это лучшее подтверждение качества нашей работы."
            </blockquote>
          </Card>
        </div>
      </div>
    </section>
  );
}
