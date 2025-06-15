
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, Users, Zap, Star, ArrowRight, PlayCircle, Award, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const successStories = [
  {
    id: 1,
    company: "TechStore",
    industry: "E-commerce",
    challenge: "Низкая конверсия",
    result: "Рост конверсии на 320%",
    timeline: "6 месяцев",
    metrics: {
      conversion: { before: 2.1, after: 8.8 },
      revenue: { before: 1200000, after: 5040000 },
      traffic: { before: 15000, after: 42000 }
    },
    quote: "Наша выручка выросла в 4 раза за полгода работы с CopyPro Cloud",
    avatar: "T",
    color: "blue"
  },
  {
    id: 2,
    company: "CodeAcademy",
    industry: "Образование",
    challenge: "Слабые продажи курсов",
    result: "Увеличение продаж на 180%",
    timeline: "4 месяца",
    metrics: {
      conversion: { before: 3.2, after: 8.9 },
      leads: { before: 280, after: 784 },
      retention: { before: 45, after: 78 }
    },
    quote: "Конверсия лендинга выросла с 3% до 9% — невероятный результат!",
    avatar: "C",
    color: "green"
  },
  {
    id: 3,
    company: "PayFlow",
    industry: "FinTech",
    challenge: "Сложности с привлечением инвестиций",
    result: "Привлечено $2M инвестиций",
    timeline: "8 месяцев",
    metrics: {
      investment: { before: 0, after: 2000000 },
      users: { before: 1200, after: 15000 },
      conversion: { before: 1.8, after: 6.2 }
    },
    quote: "Качественный контент помог нам привлечь серьезных инвесторов",
    avatar: "P",
    color: "purple"
  }
];

const keyMetrics = [
  {
    icon: Trophy,
    value: "420%",
    label: "Средний ROI",
    description: "Возврат инвестиций наших клиентов",
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    icon: TrendingUp,
    value: "250%",
    label: "Рост трафика",
    description: "Увеличение органического трафика",
    gradient: "from-green-400 to-emerald-500"
  },
  {
    icon: Users,
    value: "500+",
    label: "Успешных проектов",
    description: "Довольных клиентов за год",
    gradient: "from-blue-400 to-cyan-500"
  },
  {
    icon: Star,
    value: "95%",
    label: "Превышение KPI",
    description: "Проекты с результатом выше плана",
    gradient: "from-purple-400 to-violet-500"
  }
];

const chartData = [
  { month: 'Янв', before: 100, after: 120 },
  { month: 'Фев', before: 105, after: 145 },
  { month: 'Мар', before: 110, after: 180 },
  { month: 'Апр', before: 108, after: 220 },
  { month: 'Май', before: 115, after: 280 },
  { month: 'Июн', before: 112, after: 350 }
];

export default function ModernSuccessSection() {
  const [activeStory, setActiveStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSuccessStories = () => {
    setIsPlaying(true);
    successStories.forEach((_, index) => {
      setTimeout(() => {
        setActiveStory(index);
      }, index * 2000);
    });
    
    setTimeout(() => {
      setIsPlaying(false);
    }, successStories.length * 2000);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-gradient-to-r from-emerald-500 to-blue-600 text-white border-0 px-6 py-3 text-lg font-semibold">
            <Award className="w-5 h-5 mr-2" />
            Доказанная эффективность
          </Badge>
          <h2 className="text-5xl md:text-7xl font-playfair font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-emerald-200 bg-clip-text text-transparent">
            Реальные результаты наших клиентов
          </h2>
          <p className="text-xl text-slate-200 max-w-4xl mx-auto leading-relaxed mb-8">
            За последний год мы помогли 500+ компаниям достичь выдающихся результатов. 
            Каждая цифра — это реальный успех наших клиентов.
          </p>
          
          <Button 
            onClick={playSuccessStories}
            disabled={isPlaying}
            className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white px-8 py-4 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            <PlayCircle className="w-6 h-6 mr-2" />
            {isPlaying ? 'Демонстрация успехов...' : 'Посмотреть истории успеха'}
          </Button>
        </div>

        {/* Ключевые метрики */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {keyMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="group p-8 bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl">
                <div className="text-center">
                  <div className={`inline-flex p-4 bg-gradient-to-r ${metric.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">{metric.value}</div>
                  <div className="text-lg font-semibold text-slate-200 mb-2">{metric.label}</div>
                  <div className="text-sm text-slate-400">{metric.description}</div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Истории успеха */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Переключатели историй */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Target className="w-8 h-8 text-emerald-400" />
              Истории трансформации
            </h3>
            
            {successStories.map((story, index) => (
              <Card 
                key={story.id}
                className={`p-6 cursor-pointer transition-all duration-500 ${
                  activeStory === index 
                    ? 'bg-white/15 border-emerald-400/50 scale-105 shadow-2xl' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                onClick={() => setActiveStory(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getColorClasses(story.color)} rounded-xl flex items-center justify-center text-white font-bold`}>
                    {story.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-white">{story.company}</h4>
                      <Badge className="bg-white/20 text-white text-xs">{story.industry}</Badge>
                    </div>
                    <p className="text-slate-300 text-sm mb-2">{story.challenge}</p>
                    <div className="text-emerald-400 font-semibold">{story.result}</div>
                  </div>
                  <div className="text-slate-400 text-xs">{story.timeline}</div>
                </div>
              </Card>
            ))}
          </div>

          {/* График и детали активной истории */}
          <div className="space-y-6">
            <Card className="p-8 bg-white/5 backdrop-blur-lg border-white/10">
              <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
                Динамика роста: {successStories[activeStory].company}
              </h4>
              
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
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
                    dataKey="before" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="До"
                    strokeDasharray="5 5"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="after" 
                    stroke="#10b981" 
                    strokeWidth={4}
                    name="После"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Отзыв клиента */}
            <Card className="p-6 bg-gradient-to-r from-white/10 to-white/5 border-white/20">
              <blockquote className="text-slate-200 italic text-lg mb-4 leading-relaxed">
                "{successStories[activeStory].quote}"
              </blockquote>
              <div className="flex items-center justify-between">
                <div className="text-white font-semibold">{successStories[activeStory].company}</div>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
                  {successStories[activeStory].result}
                </Badge>
              </div>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-6 text-white">
            Готовы стать следующей историей успеха?
          </h3>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
            Присоединяйтесь к сотням компаний, которые уже трансформировали свой бизнес с помощью качественного контента
          </p>
          <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white border-0 px-12 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Начать свою трансформацию
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
