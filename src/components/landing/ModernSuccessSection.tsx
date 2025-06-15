
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, Users, Star, ArrowRight, PlayCircle, Award, Target, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
      revenue: { before: 1200000, after: 5040000 }
    },
    quote: "Наша выручка выросла в 4 раза за полгода работы с CopyPro Cloud",
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
      leads: { before: 280, after: 784 }
    },
    quote: "Конверсия лендинга выросла с 3% до 9% — невероятный результат!",
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
      conversion: { before: 1.8, after: 6.2 },
      users: { before: 1200, after: 15000 }
    },
    quote: "Качественный контент помог нам привлечь серьезных инвесторов",
    color: "purple"
  }
];

const keyMetrics = [
  {
    icon: Trophy,
    value: "420%",
    label: "Средний ROI",
    description: "Возврат инвестиций наших клиентов"
  },
  {
    icon: TrendingUp,
    value: "250%",
    label: "Рост трафика",
    description: "Увеличение органического трафика"
  },
  {
    icon: Users,
    value: "500+",
    label: "Успешных проектов",
    description: "Довольных клиентов за год"
  },
  {
    icon: Star,
    value: "95%",
    label: "Превышение KPI",
    description: "Проекты с результатом выше плана"
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
      blue: "from-blue-50 to-blue-100 border-blue-200",
      green: "from-emerald-50 to-emerald-100 border-emerald-200",
      purple: "from-purple-50 to-purple-100 border-purple-200"
    };
    return colors[color as keyof typeof colors];
  };

  const getAccentColor = (color: string) => {
    const colors = {
      blue: "text-blue-600",
      green: "text-emerald-600", 
      purple: "text-purple-600"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-100/30 to-cyan-100/30 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 px-6 py-3 text-lg font-semibold shadow-lg">
            <Award className="w-5 h-5 mr-2" />
            Доказанная эффективность
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Реальные результаты наших клиентов
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
            За последний год мы помогли 500+ компаниям достичь выдающихся результатов. 
            Каждая цифра — это реальный успех наших клиентов.
          </p>
          
          <Button 
            onClick={playSuccessStories}
            disabled={isPlaying}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <PlayCircle className="w-6 h-6 mr-2" />
            {isPlaying ? 'Демонстрация успехов...' : 'Посмотреть истории успеха'}
          </Button>
        </div>

        {/* Ключевые метрики */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {keyMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="group p-6 bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2 group-hover:scale-105 transition-transform duration-300">{metric.value}</div>
                  <div className="text-lg font-semibold text-slate-700 mb-2">{metric.label}</div>
                  <div className="text-sm text-slate-500">{metric.description}</div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Истории успеха */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Переключатели историй */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-blue-600" />
              <h3 className="text-3xl font-playfair font-bold text-slate-900">
                Истории трансформации
              </h3>
            </div>
            
            {successStories.map((story, index) => (
              <Card 
                key={story.id}
                className={`p-6 cursor-pointer transition-all duration-300 border-2 ${
                  activeStory === index 
                    ? `bg-gradient-to-r ${getColorClasses(story.color)} scale-105 shadow-xl border-blue-300` 
                    : 'bg-white/60 border-slate-200 hover:bg-white/80 hover:shadow-lg'
                }`}
                onClick={() => setActiveStory(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md`}>
                    {story.company.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-slate-900">{story.company}</h4>
                      <Badge className="bg-slate-100 text-slate-700 text-xs border-slate-200">{story.industry}</Badge>
                    </div>
                    <p className="text-slate-600 text-sm mb-2">{story.challenge}</p>
                    <div className={`font-semibold ${getAccentColor(story.color)}`}>{story.result}</div>
                  </div>
                  <div className="text-slate-400 text-xs bg-slate-100 px-2 py-1 rounded-lg">{story.timeline}</div>
                </div>
              </Card>
            ))}
          </div>

          {/* График и детали активной истории */}
          <div className="space-y-6">
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <h4 className="text-2xl font-bold text-slate-900">
                  Динамика роста: {successStories[activeStory].company}
                </h4>
              </div>
              
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
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
                    strokeWidth={3}
                    name="После"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Отзыв клиента */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg">
              <blockquote className="text-slate-700 italic text-lg mb-4 leading-relaxed">
                "{successStories[activeStory].quote}"
              </blockquote>
              <div className="flex items-center justify-between">
                <div className="text-slate-900 font-semibold">{successStories[activeStory].company}</div>
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                  {successStories[activeStory].result}
                </Badge>
              </div>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="p-12 bg-gradient-to-r from-blue-50 via-white to-purple-50 border-blue-200 shadow-xl text-center">
          <h3 className="text-3xl font-playfair font-bold mb-6 text-slate-900">
            Готовы стать следующей историей успеха?
          </h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Присоединяйтесь к сотням компаний, которые уже трансформировали свой бизнес с помощью качественного контента
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white border-0 px-12 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            Начать свою трансформацию
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </Card>
      </div>
    </section>
  );
}
