
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Award,
  Shield,
  BookOpen,
  Globe,
  Zap,
  Users,
  CheckCircle,
  ExternalLink,
  Star,
  Trophy
} from "lucide-react";

const certifications = [
  {
    category: "Google Сертификации",
    icon: Globe,
    color: "blue",
    certs: [
      { name: "Google Analytics Individual Qualification", level: "Expert", year: 2024 },
      { name: "Google Ads Search Certification", level: "Advanced", year: 2024 },
      { name: "Google Ads Display Certification", level: "Advanced", year: 2023 },
      { name: "Google My Business Certification", level: "Professional", year: 2023 }
    ]
  },
  {
    category: "Яндекс Сертификации",
    icon: Star,
    color: "green",
    certs: [
      { name: "Яндекс.Директ Professional", level: "Expert", year: 2024 },
      { name: "Яндекс.Метрика Advanced", level: "Expert", year: 2024 },
      { name: "Яндекс.Маркет Partner", level: "Professional", year: 2023 },
      { name: "Яндекс.Вебмастер Certified", level: "Advanced", year: 2023 }
    ]
  },
  {
    category: "Международные стандарты",
    icon: Award,
    color: "purple",
    certs: [
      { name: "Content Marketing Institute Certification", level: "Expert", year: 2024 },
      { name: "HubSpot Content Marketing", level: "Advanced", year: 2024 },
      { name: "Facebook Blueprint Certified", level: "Professional", year: 2023 },
      { name: "LinkedIn Marketing Certified", level: "Advanced", year: 2023 }
    ]
  },
  {
    category: "Отраслевые сертификаты",
    icon: BookOpen,
    color: "orange",
    certs: [
      { name: "Российская Ассоциация Рекламы", level: "Member", year: 2024 },
      { name: "Гильдия Копирайтеров России", level: "Expert", year: 2023 },
      { name: "Digital Marketing Institute", level: "Professional", year: 2023 },
      { name: "SEO Professional Certification", level: "Advanced", year: 2022 }
    ]
  }
];

const teamCertifications = [
  {
    role: "SEO-копирайтеры",
    count: 15,
    avgCerts: 8,
    specializations: ["Технический SEO", "Контент-аудит", "Семантическое ядро", "LSI-оптимизация"]
  },
  {
    role: "Конверсионные копирайтеры", 
    count: 12,
    avgCerts: 6,
    specializations: ["A/B тестирование", "Психология продаж", "UX-копирайтинг", "Email-маркетинг"]
  },
  {
    role: "Контент-стратеги",
    count: 8,
    avgCerts: 10,
    specializations: ["Аналитика", "Планирование", "ROI-оптимизация", "Омниканальность"]
  },
  {
    role: "Технические писатели",
    count: 6,
    avgCerts: 7,
    specializations: ["API документация", "UX-тексты", "Техническая локализация", "Инструкции"]
  }
];

const qualityStandards = [
  {
    standard: "ISO 27001",
    description: "Управление информационной безопасностью",
    status: "Сертифицированы",
    icon: Shield
  },
  {
    standard: "ISO 9001",
    description: "Система менеджмента качества",
    status: "В процессе",
    icon: CheckCircle
  },
  {
    standard: "GDPR Compliance",
    description: "Защита персональных данных",
    status: "Сертифицированы",
    icon: Users
  },
  {
    standard: "SOC 2 Type II",
    description: "Безопасность и конфиденциальность",
    status: "Планируется",
    icon: Zap
  }
];

export default function CertificationsSection() {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600", 
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600"
    };
    return colors[color as keyof typeof colors];
  };

  const getLevelColor = (level: string) => {
    const colors = {
      Expert: "text-red-600 bg-red-50",
      Advanced: "text-blue-600 bg-blue-50",
      Professional: "text-green-600 bg-green-50",
      Member: "text-purple-600 bg-purple-50"
    };
    return colors[level as keyof typeof colors] || "text-gray-600 bg-gray-50";
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Award className="w-4 h-4 mr-2" />
            Сертификации и стандарты
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Официальное признание экспертизы
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Мы постоянно подтверждаем свою квалификацию в ведущих платформах и получаем 
            сертификаты, которые гарантируют высочайший уровень профессионализма.
          </p>
        </div>

        {/* Certifications by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {certifications.map((category, index) => (
            <Card key={index} className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 bg-gradient-to-r ${getColorClasses(category.color)} rounded-2xl flex items-center justify-center`}>
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{category.category}</h3>
              </div>
              
              <div className="space-y-4">
                {category.certs.map((cert, certIndex) => (
                  <div key={certIndex} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800 mb-1">{cert.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getLevelColor(cert.level)}`}>
                          {cert.level}
                        </Badge>
                        <span className="text-sm text-slate-500">{cert.year}</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Team Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-slate-800">
            Сертификации команды по специализациям
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamCertifications.map((team, index) => (
              <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-slate-800">{team.role}</h4>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{team.count}</div>
                    <div className="text-sm text-slate-500">специалистов</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-medium text-slate-700">
                      Среднее количество сертификатов: {team.avgCerts}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-slate-800 mb-3">Ключевые специализации:</h5>
                  <div className="flex flex-wrap gap-2">
                    {team.specializations.map((spec, specIndex) => (
                      <Badge key={specIndex} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quality Standards */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              Стандарты качества и безопасности
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Соответствие международным стандартам качества, безопасности и управления
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityStandards.map((standard, index) => (
              <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <standard.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">{standard.standard}</h4>
                <p className="text-sm text-slate-600 mb-3">{standard.description}</p>
                <Badge 
                  className={
                    standard.status === 'Сертифицированы' ? 'bg-green-100 text-green-700' :
                    standard.status === 'В процессе' ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }
                >
                  {standard.status}
                </Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats and Recognition */}
        <div className="text-center">
          <Card className="p-8 lg:p-12 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-0 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              Цифры нашей экспертизы
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">200+</div>
                <div className="text-slate-300">Активных сертификатов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">25+</div>
                <div className="text-slate-300">Образовательных платформ</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">15,000+</div>
                <div className="text-slate-300">Часов обучения в год</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-400 mb-2">100%</div>
                <div className="text-slate-300">Команды сертифицированы</div>
              </div>
            </div>
            
            <blockquote className="text-lg italic max-w-3xl mx-auto">
              "Непрерывное обучение и сертификация — основа нашего профессионализма. 
              Каждый месяц наши специалисты повышают квалификацию, чтобы оставаться 
              на переднем крае индустрии."
            </blockquote>
          </Card>
        </div>
      </div>
    </section>
  );
}
