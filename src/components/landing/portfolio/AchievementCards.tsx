
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, BarChart3, Star } from "lucide-react";

const achievements = [
  {
    icon: TrendingUp,
    value: "2000+",
    label: "Проектов завершено",
    description: "За всё время работы"
  },
  {
    icon: Users,
    value: "500+",
    label: "Довольных клиентов",
    description: "Постоянно с нами работают"
  },
  {
    icon: BarChart3,
    value: "150%",
    label: "Средний рост метрик",
    description: "У наших клиентов"
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Рейтинг качества",
    description: "По отзывам клиентов"
  }
];

export default function AchievementCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      {achievements.map((achievement, index) => (
        <Card key={achievement.label} className="group p-6 text-center hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-slate-50/50 hover:scale-105 hover:-translate-y-1">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
            <achievement.icon className="w-7 h-7 text-primary" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-primary mb-1 group-hover:scale-105 transition-transform duration-300">
            {achievement.value}
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
  );
}
