
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Users,
  Award,
  TrendingUp,
  Globe,
  Rocket,
  Star,
  Building
} from "lucide-react";

const timelineEvents = [
  {
    year: "2019",
    quarter: "Q1",
    title: "Основание CopyPro Cloud",
    description: "Запуск платформы с командой из 5 копирайтеров",
    icon: Rocket,
    metrics: { clients: 12, projects: 45, team: 5 },
    color: "blue"
  },
  {
    year: "2020",
    quarter: "Q2",
    title: "Первые крупные клиенты",
    description: "Привлечение клиентов из IT и e-commerce сегментов",
    icon: Users,
    metrics: { clients: 85, projects: 320, team: 15 },
    color: "green"
  },
  {
    year: "2021",
    quarter: "Q3",
    title: "Сертификация команды",
    description: "Получение сертификатов Google Analytics и Яндекс.Директ",
    icon: Award,
    metrics: { clients: 180, projects: 750, team: 25 },
    color: "purple"
  },
  {
    year: "2022",
    quarter: "Q1",
    title: "Международная экспансия",
    description: "Выход на рынки СНГ и работа с зарубежными клиентами",
    icon: Globe,
    metrics: { clients: 320, projects: 1400, team: 35 },
    color: "orange"
  },
  {
    year: "2023",
    quarter: "Q4",
    title: "Лидерство в индустрии",
    description: "Признание экспертами рынка, награды и премии",
    icon: Star,
    metrics: { clients: 500, projects: 2800, team: 45 },
    color: "pink"
  },
  {
    year: "2024",
    quarter: "Q2",
    title: "Новый офис и масштабирование",
    description: "Переезд в новый офис, расширение команды до 50+ экспертов",
    icon: Building,
    metrics: { clients: 750, projects: 5000, team: 52 },
    color: "indigo"
  }
];

const achievements = [
  { year: "2020", title: "Лучший стартап года", org: "Digital Awards" },
  { year: "2021", title: "Топ-10 агентств контента", org: "Marketing Russia" },
  { year: "2022", title: "Премия за инновации", org: "Content Marketing Awards" },
  { year: "2023", title: "Агентство года", org: "Copywriting Awards" },
  { year: "2024", title: "Эксперт года в SEO", org: "Search Marketing Expo" }
];

export default function CompanyTimelineSection() {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
      pink: "from-pink-500 to-pink-600",
      indigo: "from-indigo-500 to-indigo-600"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Calendar className="w-4 h-4 mr-2" />
            История компании
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
            Путь к лидерству в индустрии
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            За 5 лет мы прошли путь от стартапа до ведущего агентства копирайтинга, 
            постоянно развиваясь и устанавливая новые стандарты качества.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500 transform md:-translate-x-0.5"></div>
            
            {/* Timeline Events */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div key={index} className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Timeline Dot */}
                  <div className={`absolute left-4 md:left-1/2 w-8 h-8 bg-gradient-to-r ${getColorClasses(event.color)} rounded-full flex items-center justify-center transform md:-translate-x-4 z-10`}>
                    <event.icon className="w-4 h-4 text-white" />
                  </div>
                  
                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}>
                    <Card className="p-6 bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className={`bg-gradient-to-r ${getColorClasses(event.color)} text-white border-0`}>
                          {event.year} {event.quarter}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-800 mb-3">
                        {event.title}
                      </h3>
                      
                      <p className="text-slate-600 mb-4">
                        {event.description}
                      </p>
                      
                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-800">{event.metrics.clients}</div>
                          <div className="text-xs text-slate-500">Клиентов</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-800">{event.metrics.projects}</div>
                          <div className="text-xs text-slate-500">Проектов</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-800">{event.metrics.team}</div>
                          <div className="text-xs text-slate-500">В команде</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Награды и признание
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Наш профессионализм и качество работы отмечены ведущими 
              организациями и экспертами индустрии.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="text-lg font-bold text-slate-800 mb-2">
                  {achievement.title}
                </div>
                <div className="text-sm text-slate-600 mb-1">
                  {achievement.org}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {achievement.year}
                </Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* Current Stats */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-8">
            CopyPro Cloud сегодня
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">750+</div>
              <div className="text-slate-600">Активных клиентов</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">5,000+</div>
              <div className="text-slate-600">Завершенных проектов</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">52</div>
              <div className="text-slate-600">Эксперта в команде</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">15+</div>
              <div className="text-slate-600">Стран присутствия</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
