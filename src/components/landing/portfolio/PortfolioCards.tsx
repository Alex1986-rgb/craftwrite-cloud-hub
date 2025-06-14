
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const portfolioItems = [
  {
    title: "E-commerce платформа",
    category: "SEO-статьи",
    description: "Увеличили органический трафик на 340% за 6 месяцев",
    image: "/api/placeholder/400/300",
    metrics: {
      traffic: "+340%",
      conversion: "+85%",
      ranking: "ТОП-3"
    },
    tags: ["E-commerce", "SEO", "Конверсии"],
    gradient: "from-blue-500 to-cyan-600"
  },
  {
    title: "Финтех стартап",
    category: "Продающие тексты",
    description: "Повысили конверсию лендинга с 2% до 12%",
    image: "/api/placeholder/400/300",
    metrics: {
      conversion: "+500%",
      leads: "+280%",
      ctr: "+156%"
    },
    tags: ["Финтех", "Лендинг", "Продажи"],
    gradient: "from-purple-500 to-violet-600"
  },
  {
    title: "Образовательная платформа",
    category: "Контент-маркетинг",
    description: "Создали контент-стратегию, которая привлекла 50K подписчиков",
    image: "/api/placeholder/400/300",
    metrics: {
      subscribers: "+50K",
      engagement: "+245%",
      reach: "+400%"
    },
    tags: ["Образование", "SMM", "Блог"],
    gradient: "from-emerald-500 to-green-600"
  }
];

export default function PortfolioCards() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
      {portfolioItems.map((item, index) => (
        <Card key={item.title} className="group overflow-hidden hover:shadow-2xl transition-all duration-700 border-0 bg-gradient-to-br from-white to-slate-50/30 hover:scale-105 hover:-translate-y-2">
          {/* Изображение проекта */}
          <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20`}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-bold text-white/30">
                {item.title.charAt(0)}
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <Badge className={`bg-gradient-to-r ${item.gradient} text-white border-0`}>
                {item.category}
              </Badge>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
              {item.title}
            </h3>
            
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
              {item.description}
            </p>
            
            {/* Метрики проекта */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {Object.entries(item.metrics).map(([key, value]) => (
                <div key={key} className="text-center p-2 bg-slate-50 rounded-lg">
                  <div className="text-lg font-bold text-primary">{value}</div>
                  <div className="text-xs text-muted-foreground capitalize">{key}</div>
                </div>
              ))}
            </div>
            
            {/* Теги */}
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full group-hover:border-primary/50 group-hover:text-primary transition-colors duration-300">
              <ExternalLink className="w-4 h-4 mr-2" />
              Подробнее о кейсе
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
