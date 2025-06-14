
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  ExternalLink, 
  TrendingUp, 
  Users, 
  BarChart3, 
  ArrowRight,
  Star,
  Eye,
  MousePointer
} from "lucide-react";

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

export default function InnovativePortfolioSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50/50 to-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-primary/6 to-purple-500/4 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-gradient-to-r from-emerald-500/6 to-blue-500/4 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/20">
            <Eye className="w-5 h-5 mr-2" />
            Наши результаты
          </Badge>
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Кейсы, которые говорят сами за себя
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Каждый проект — это история успеха наших клиентов. Посмотрите, как мы помогаем бизнесу расти
          </p>
        </div>

        {/* Основные достижения */}
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

        {/* Портфолио кейсов */}
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

        {/* Интерактивный блок с метриками */}
        <div className="bg-gradient-to-r from-primary/5 via-purple-500/5 to-blue-500/5 rounded-3xl p-8 md:p-12 border border-primary/10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Средние результаты наших клиентов
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">+245%</div>
                    <div className="text-sm text-muted-foreground">Рост органического трафика</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                    <MousePointer className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">+180%</div>
                    <div className="text-sm text-muted-foreground">Увеличение конверсий</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">+320%</div>
                    <div className="text-sm text-muted-foreground">Рост вовлеченности</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center lg:text-left">
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Эти цифры — результат работы с командой профессионалов, которые понимают специфику вашего бизнеса и знают, как создавать контент, который работает.
              </p>
              <Button asChild size="lg" className="group">
                <Link to="/portfolio" className="flex items-center gap-2">
                  Посмотреть все кейсы
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* CTA секция */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Готовы получить такие же результаты?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Начните с бесплатной консультации, и мы покажем, как контент может изменить ваш бизнес
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/order">Заказать контент</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/portfolio">Все кейсы</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
