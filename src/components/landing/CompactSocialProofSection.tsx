
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Trophy, Clock, ThumbsUp, CheckCircle, Timer } from "lucide-react";

const compactAchievements = [
  {
    icon: Users,
    number: "500+",
    label: "Клиентов",
    color: "text-blue-600"
  },
  {
    icon: Trophy,
    number: "2000+",
    label: "Проектов",
    color: "text-purple-600"
  },
  {
    icon: Clock,
    number: "24ч",
    label: "Доставка",
    color: "text-green-600"
  },
  {
    icon: ThumbsUp,
    number: "99%",
    label: "Довольны",
    color: "text-orange-600"
  }
];

export default function CompactSocialProofSection() {
  return (
    <section className="py-8 bg-gradient-to-b from-white to-slate-50/30 relative">
      <div className="container max-w-5xl mx-auto px-4 relative">
        {/* Compact achievements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {compactAchievements.map((achievement, index) => (
            <Card key={achievement.label} className="p-3 sm:p-4 text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/90 hover:scale-105">
              <div className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg mb-2`}>
                <achievement.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${achievement.color}`} />
              </div>
              <div className={`text-lg sm:text-2xl font-bold ${achievement.color} mb-1`}>
                {achievement.number}
              </div>
              <div className="font-medium text-foreground text-xs sm:text-sm">
                {achievement.label}
              </div>
            </Card>
          ))}
        </div>

        {/* Compact rating and live activity */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">4.9/5</span>
            <span className="text-xs text-muted-foreground">(500+ отзывов)</span>
          </div>

          {/* Live activity indicator */}
          <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-full border border-green-200">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <Timer className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-800">
              Сейчас работаем: 12 экспертов
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
