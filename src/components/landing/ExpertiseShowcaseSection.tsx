
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Target, 
  Search, 
  BarChart3, 
  Users, 
  Globe, 
  Zap, 
  Shield,
  ArrowRight,
  CheckCircle 
} from "lucide-react";

const expertiseAreas = [
  {
    icon: TrendingUp,
    title: "SEO-оптимизация",
    description: "Глубокий анализ ключевых слов, конкурентов и создание контента для топ-позиций",
    skills: ["Семантическое ядро", "LSI-анализ", "Техническое SEO", "Конкурентный анализ"],
    gradient: "from-green-500 to-emerald-600"
  },
  {
    icon: Target,
    title: "Конверсионный копирайтинг",
    description: "Тексты, которые продают: от email-рассылок до продающих лендингов",
    skills: ["Психология продаж", "A/B тестирование", "Воронки продаж", "CRO-оптимизация"],
    gradient: "from-blue-500 to-cyan-600"
  },
  {
    icon: BarChart3,
    title: "Контент-маркетинг",
    description: "Стратегический подход к созданию контента для различных каналов",
    skills: ["Контент-стратегия", "Редакционный план", "SMM-тексты", "Аналитика"],
    gradient: "from-purple-500 to-violet-600"
  },
  {
    icon: Globe,
    title: "Мультиязычный контент",
    description: "Создание качественного контента на русском и английском языках",
    skills: ["Локализация", "Культурная адаптация", "Технический перевод", "Нейминг"],
    gradient: "from-orange-500 to-red-600"
  }
];

const industries = [
  { name: "E-commerce", percentage: 85 },
  { name: "IT & Tech", percentage: 92 },
  { name: "Финансы", percentage: 78 },
  { name: "Недвижимость", percentage: 88 },
  { name: "Медицина", percentage: 81 },
  { name: "Образование", percentage: 90 }
];

export default function ExpertiseShowcaseSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50/50 to-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-primary/8 to-purple-500/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-gradient-to-r from-blue-500/8 to-emerald-500/6 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
            <Zap className="w-5 h-5 mr-2" />
            Наша экспертиза
          </Badge>
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
            Профессионалы в каждой нише
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            30+ экспертов с глубокими знаниями в различных отраслях создают контент мирового уровня
          </p>
        </div>

        {/* Области экспертизы */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {expertiseAreas.map((area, index) => (
            <Card key={area.title} className="group p-8 hover:shadow-2xl transition-all duration-700 border-0 bg-gradient-to-br from-white to-slate-50/30 hover:scale-105 hover:-translate-y-2 relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}></div>
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${area.gradient} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <area.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                  {area.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {area.description}
                </p>
                
                <div className="space-y-2">
                  {area.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Опыт работы с отраслями */}
        <div className="bg-gradient-to-r from-primary/5 via-purple-500/5 to-blue-500/5 rounded-3xl p-8 md:p-12 border border-primary/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Экспертиза в ключевых отраслях
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Наша команда имеет глубокий опыт работы с различными бизнес-сферами, 
                что позволяет создавать по-настоящему экспертный контент.
              </p>
              <Button asChild size="lg" className="group">
                <Link to="/portfolio" className="flex items-center gap-2">
                  Посмотреть примеры работ
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
            
            <div className="space-y-4">
              {industries.map((industry) => (
                <div key={industry.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">{industry.name}</span>
                    <span className="text-sm font-bold text-primary">{industry.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${industry.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              <p className="text-sm text-muted-foreground mt-4 italic">
                * Процент успешных проектов в каждой отрасли
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
