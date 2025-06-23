
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Trophy, Clock, ThumbsUp, CheckCircle, Shield, Percent } from "lucide-react";

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
    icon: ThumbsUp,
    number: "99%",
    label: "Положительных отзывов",
    description: "От наших клиентов"
  }
];

export default function SocialProofSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-slate-50/50 relative">
      <div className="container max-w-6xl mx-auto px-4 relative">
        {/* Компактный заголовок */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-4 py-2 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
            <CheckCircle className="w-4 h-4 mr-2" />
            Проверенное качество
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Нам доверяют профессионалы
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Более 500 компаний выбрали CopyPro Cloud для создания продающего контента
          </p>
        </div>

        {/* Компактная статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {achievements.map((achievement, index) => (
            <Card key={achievement.label} className="p-4 text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50/50 hover:scale-105">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl mb-3">
                <achievement.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {achievement.number}
              </div>
              <div className="font-semibold text-foreground mb-1 text-sm">
                {achievement.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {achievement.description}
              </div>
            </Card>
          ))}
        </div>

        {/* Информация об оплате */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 border border-emerald-100">
          <div className="flex items-start gap-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-xl">
              <Shield className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 text-foreground flex items-center gap-2">
                <Percent className="w-5 h-5 text-emerald-600" />
                Заказываете текст - 50% предоплата
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Остальное после проверки вами текста. Гарантируем качество и соблюдение всех требований.
              </p>
            </div>
          </div>
        </div>

        {/* Рейтинг */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <span className="text-lg font-semibold text-foreground">
            4.9/5 средняя оценка клиентов
          </span>
        </div>
      </div>
    </section>
  );
}
