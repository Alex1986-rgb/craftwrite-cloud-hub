
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Clock, CheckCircle, Search, FileCheck, Percent } from "lucide-react";

const guarantees = [
  {
    icon: Users,
    title: "30+ экспертов",
    description: "Дипломированные SEO-копирайтеры",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-600"
  },
  {
    icon: Shield,
    title: "Антиплагиат Text.ru",
    description: "Бесплатные ссылки на проверки",
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-600"
  },
  {
    icon: Clock,
    title: "Сроки от 24ч",
    description: "Оперативная работа без компромиссов",
    color: "from-orange-500/20 to-yellow-500/20",
    iconColor: "text-orange-600"
  },
  {
    icon: Search,
    title: "SEO-оптимизация",
    description: "Работа по ключам + LSI анализ",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-600"
  },
  {
    icon: FileCheck,
    title: "Опыт 5+ лет",
    description: "Средний стаж наших специалистов",
    color: "from-indigo-500/20 to-blue-500/20",
    iconColor: "text-indigo-600"
  },
  {
    icon: CheckCircle,
    title: "Гарантия правок",
    description: "Корректировки в течение 7 дней",
    color: "from-teal-500/20 to-green-500/20",
    iconColor: "text-teal-600"
  }
];

export default function InteractiveGuaranteesSection() {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-slate-50/50">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Компактный заголовок */}
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3 px-3 py-1 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
            <Shield className="w-4 h-4 mr-2" />
            Профессионализм & Прозрачность
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Экспертный SEO-контент под ключ
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Каждая статья сопровождается отчетом по уникальности на Text.ru
          </p>
        </div>

        {/* Компактная сетка гарантий */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {guarantees.map((guarantee, index) => (
            <Card key={guarantee.title} className="p-3 hover:shadow-md transition-all duration-300 border-0 bg-white/80 hover:scale-105">
              <div className="flex items-start gap-3">
                <div className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br ${guarantee.color} rounded-lg shrink-0`}>
                  <guarantee.icon className={`w-5 h-5 ${guarantee.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-foreground leading-tight">
                    {guarantee.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 leading-tight">
                    {guarantee.description}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

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
