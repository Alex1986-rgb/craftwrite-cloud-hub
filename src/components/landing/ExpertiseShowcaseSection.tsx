
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  TrendingUp, 
  Target, 
  Globe, 
  ShoppingCart, 
  Monitor, 
  Banknote, 
  Home, 
  Heart, 
  GraduationCap,
  Shield,
  Percent 
} from "lucide-react";

const expertiseAreas = [
  {
    icon: Search,
    title: "SEO-оптимизация",
    description: "Глубокий анализ ключевых слов и конкурентов",
    features: ["Семантическое ядро", "LSI-анализ", "Техническое SEO", "Конкурентный анализ"],
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-600"
  },
  {
    icon: TrendingUp,
    title: "Конверсионный копирайтинг",
    description: "Тексты, которые продают",
    features: ["Психология продаж", "A/B тестирование", "Воронки продаж", "CRO-оптимизация"],
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-600"
  },
  {
    icon: Target,
    title: "Контент-маркетинг",
    description: "Стратегический подход к созданию контента",
    features: ["Контент-стратегия", "Редакционный план", "SMM-тексты", "Аналитика"],
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-600"
  },
  {
    icon: Globe,
    title: "Мультиязычный контент",
    description: "Качественный контент на разных языках",
    features: ["Локализация", "Культурная адаптация", "Технический перевод", "Нейминг"],
    color: "from-orange-500/20 to-yellow-500/20",
    iconColor: "text-orange-600"
  }
];

const industries = [
  { icon: ShoppingCart, name: "E-commerce", percentage: 85, color: "text-blue-600" },
  { icon: Monitor, name: "IT & Tech", percentage: 92, color: "text-purple-600" },
  { icon: Banknote, name: "Финансы", percentage: 78, color: "text-green-600" },
  { icon: Home, name: "Недвижимость", percentage: 88, color: "text-orange-600" },
  { icon: Heart, name: "Медицина", percentage: 81, color: "text-red-600" },
  { icon: GraduationCap, name: "Образование", percentage: 90, color: "text-indigo-600" }
];

export default function ExpertiseShowcaseSection() {
  return (
    <section className="py-12 bg-gradient-to-b from-slate-50/50 to-white">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3 px-3 py-1 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
            <Shield className="w-4 h-4 mr-2" />
            Наша экспертиза
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Профессионалы в каждой нише
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            30+ экспертов с глубокими знаниями создают контент мирового уровня
          </p>
        </div>

        {/* Компактная сетка экспертизы */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {expertiseAreas.map((area, index) => (
            <Card key={area.title} className="p-4 hover:shadow-md transition-all duration-300 border-0 bg-white/80">
              <div className="flex items-start gap-3 mb-3">
                <div className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br ${area.color} rounded-lg shrink-0`}>
                  <area.icon className={`w-5 h-5 ${area.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-foreground text-sm mb-1">
                    {area.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {area.description}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {area.features.map((feature) => (
                  <div key={feature} className="text-xs text-slate-600 px-2 py-1 bg-slate-50 rounded">
                    {feature}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Компактная статистика по отраслям */}
        <Card className="p-4 mb-6 bg-gradient-to-r from-slate-50 to-white border-slate-200">
          <h3 className="font-bold text-foreground mb-3 text-center">
            Экспертиза в ключевых отраслях
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {industries.map((industry, index) => (
              <div key={industry.name} className="flex items-center gap-2 p-2 bg-white rounded-lg">
                <industry.icon className={`w-5 h-5 ${industry.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">
                    {industry.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {industry.percentage}% успешных проектов
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-3">
            <Button variant="outline" size="sm" className="text-xs">
              Посмотреть примеры работ
            </Button>
          </div>
        </Card>

        {/* Информация об оплате */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 border border-emerald-100">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-lg">
              <Percent className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">
                Заказываете текст — 50% предоплата
              </h3>
              <p className="text-sm text-muted-foreground">
                Остальное после проверки вами текста
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
