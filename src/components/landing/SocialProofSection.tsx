
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy, Users, Clock, CheckCircle, Award } from "lucide-react";

const achievements = [
  {
    icon: Users,
    number: "500+",
    label: "Довольных клиентов",
    description: "За последний год"
  },
  {
    icon: Trophy,
    number: "2000+",
    label: "Проектов выполнено",
    description: "С момента запуска"
  },
  {
    icon: Clock,
    number: "24ч",
    label: "Средний срок",
    description: "От заказа до готовности"
  },
  {
    icon: Award,
    number: "99%",
    label: "Положительных отзывов",
    description: "От наших клиентов"
  }
];

const certifications = [
  "Google Analytics сертификация",
  "Яндекс.Метрика эксперт",
  "SEMrush Academy",
  "Высшее филологическое образование"
];

export default function SocialProofSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-slate-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-blue-500/5 to-emerald-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
            <CheckCircle className="w-5 h-5 mr-2" />
            Проверенное качество
          </Badge>
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Нам доверяют профессионалы
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Более 500 компаний выбрали CopyPro Cloud для создания продающего контента
          </p>
        </div>

        {/* Статистика достижений */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={achievement.label} className="group p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-slate-50/50 hover:scale-105 hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <achievement.icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              </div>
              <div className="text-2xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-105 transition-transform duration-300">
                {achievement.number}
              </div>
              <div className="font-semibold text-foreground mb-1 text-sm md:text-base">
                {achievement.label}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                {achievement.description}
              </div>
            </Card>
          ))}
        </div>

        {/* Сертификации команды */}
        <div className="bg-gradient-to-r from-primary/5 via-purple-500/5 to-blue-500/5 rounded-3xl p-8 md:p-12 border border-primary/10">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Профессиональные сертификации нашей команды
            </h3>
            <p className="text-muted-foreground text-lg">
              Наши специалисты постоянно повышают квалификацию
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <div key={cert} className="group flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-5 h-5 text-primary fill-current" />
                </div>
                <span className="font-medium text-sm text-foreground leading-tight">
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Присоединяйтесь к сотням довольных клиентов
          </p>
          <div className="flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
            <span className="ml-3 text-lg font-semibold text-foreground">
              4.9/5 средняя оценка
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
