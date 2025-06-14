
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Award, 
  TrendingUp, 
  Users, 
  Brain,
  PenTool,
  Search,
  Target,
  Globe,
  Zap
} from "lucide-react";

const expertiseAreas = [
  {
    icon: PenTool,
    title: "SEO-копирайтинг",
    level: 95,
    experience: "5+ лет",
    description: "Создание SEO-оптимизированного контента с высокими позициями в поиске",
    specialists: 15
  },
  {
    icon: Target,
    title: "Конверсионный копирайтинг",
    level: 92,
    experience: "4+ лет", 
    description: "Продающие тексты с доказанной эффективностью конверсии",
    specialists: 12
  },
  {
    icon: Brain,
    title: "Контент-стратегия",
    level: 88,
    experience: "6+ лет",
    description: "Стратегическое планирование контента для достижения бизнес-целей",
    specialists: 8
  },
  {
    icon: Globe,
    title: "Многоязычный контент",
    level: 85,
    experience: "3+ лет",
    description: "Локализация и создание контента на 12 языках мира",
    specialists: 10
  }
];

const teamStats = [
  { icon: Users, value: "50+", label: "Экспертов в команде", description: "Дипломированные специалисты" },
  { icon: Award, value: "200+", label: "Сертификатов", description: "Google, Яндекс, Facebook" },
  { icon: BookOpen, value: "15,000+", label: "Часов обучения", description: "Ежегодно на развитие" },
  { icon: TrendingUp, value: "98%", label: "Клиентов возвращаются", description: "Показатель лояльности" }
];

const certifications = [
  "Google Analytics Certified",
  "Яндекс.Директ Certified",
  "Facebook Blueprint Certified",
  "HubSpot Content Marketing",
  "Копирайтинг РАР",
  "Digital Marketing Institute"
];

export default function TeamExpertiseSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Brain className="w-4 h-4 mr-2" />
            Экспертиза команды
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Профессионалы своего дела
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Наша команда — это синергия опыта, креативности и глубоких знаний в области 
            цифрового маркетинга и копирайтинга.
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {teamStats.map((stat, index) => (
            <Card key={index} className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
              <div className="font-semibold text-slate-700 mb-1">{stat.label}</div>
              <div className="text-sm text-slate-500">{stat.description}</div>
            </Card>
          ))}
        </div>

        {/* Expertise Areas */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12 text-slate-800">
            Области экспертизы
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertiseAreas.map((area, index) => (
              <Card key={index} className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <area.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-slate-800 mb-2">{area.title}</h4>
                    <p className="text-slate-600 mb-4">{area.description}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      <span>Опыт: {area.experience}</span>
                      <span>•</span>
                      <span>Специалистов: {area.specialists}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">Уровень экспертизы</span>
                    <span className="text-sm font-bold text-blue-600">{area.level}%</span>
                  </div>
                  <Progress value={area.level} className="h-2" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Сертификации и квалификации
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Наши специалисты регулярно подтверждают свою квалификацию 
              в ведущих образовательных платформах и получают сертификаты индустрии.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-blue-200/50 text-center">
                <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-slate-700">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Development */}
        <Card className="p-8 bg-gradient-to-r from-slate-50 to-white border-0 shadow-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Непрерывное развитие команды
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Обучение</h4>
                <p className="text-slate-600 text-sm">
                  Ежемесячные тренинги, вебинары и курсы повышения квалификации
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Исследования</h4>
                <p className="text-slate-600 text-sm">
                  Изучение трендов, алгоритмов и лучших практик индустрии
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Инновации</h4>
                <p className="text-slate-600 text-sm">
                  Внедрение новых технологий и методологий в работу
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
