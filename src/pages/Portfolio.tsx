
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Filter, 
  ExternalLink, 
  TrendingUp, 
  Users, 
  Target,
  Award,
  Eye,
  ArrowRight,
  BarChart3,
  CheckCircle
} from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const categories = [
  { name: "Все проекты", count: 24 },
  { name: "SEO-статьи", count: 8 },
  { name: "Лендинги", count: 6 },
  { name: "E-commerce", count: 5 },
  { name: "Блоги", count: 3 },
  { name: "Email", count: 2 }
];

const portfolioItems = [
  {
    id: 1,
    title: "Интернет-магазин электроники TechStore",
    category: "E-commerce",
    client: "TechStore",
    description: "Полное переписывание контента для интернет-магазина: описания категорий, товаров, страницы о компании",
    results: [
      "Увеличение конверсии на 245%",
      "Рост органического трафика на 180%",
      "Повышение времени на сайте на 65%"
    ],
    metrics: {
      conversion: "+245%",
      traffic: "+180%",
      time: "+65%"
    },
    tags: ["SEO", "Конверсия", "E-commerce"],
    image: "/placeholder.svg",
    featured: true
  },
  {
    id: 2,
    title: "Лендинг курсов программирования CodeAcademy",
    category: "Лендинги",
    client: "CodeAcademy",
    description: "Создание продающего лендинга для онлайн-курсов с психологическими триггерами и четкой структурой",
    results: [
      "Конверсия в заявку 18.5%",
      "Снижение стоимости лида на 40%",
      "Рост продаж на 320%"
    ],
    metrics: {
      conversion: "18.5%",
      leadCost: "-40%",
      sales: "+320%"
    },
    tags: ["Лендинг", "Образование", "Конверсия"],
    image: "/placeholder.svg",
    featured: true
  },
  {
    id: 3,
    title: "Блог IT-консалтинговой компании",
    category: "Блоги",
    client: "IT Solutions Pro",
    description: "Разработка контент-стратегии и написание экспертных статей для позиционирования в B2B сегменте",
    results: [
      "Рост лидов через блог на 150%",
      "Увеличение экспертности бренда",
      "Топ-3 по ключевым запросам"
    ],
    metrics: {
      leads: "+150%",
      authority: "Топ-3",
      articles: "24"
    },
    tags: ["B2B", "Экспертность", "IT"],
    image: "/placeholder.svg",
    featured: false
  },
  {
    id: 4,
    title: "Email-кампания для фитнес-клуба",
    category: "Email",
    client: "FitLife Club",
    description: "Серия продающих писем для автоворонки: welcome-серия, реактивация, допродажи",
    results: [
      "Open rate 45% (среднее 22%)",
      "Click rate 12% (среднее 3%)",
      "Выручка с email +280%"
    ],
    metrics: {
      openRate: "45%",
      clickRate: "12%",
      revenue: "+280%"
    },
    tags: ["Email", "Фитнес", "Автоворонка"],
    image: "/placeholder.svg",
    featured: false
  },
  {
    id: 5,
    title: "SEO-тексты для юридической компании",
    category: "SEO-статьи",
    client: "LegalPro",
    description: "Комплекс SEO-статей и оптимизация существующих страниц для продвижения юридических услуг",
    results: [
      "Вход в ТОП-10 по 85% запросов",
      "Рост органики на 200%",
      "Увеличение заявок на 60%"
    ],
    metrics: {
      topPositions: "85%",
      organic: "+200%",
      requests: "+60%"
    },
    tags: ["SEO", "Юриспруденция", "B2B"],
    image: "/placeholder.svg",
    featured: false
  },
  {
    id: 6,
    title: "Контент для стартапа FinTech",
    category: "Лендинги",
    client: "PayFlow",
    description: "Создание контента для финтех-стартапа: лендинг, блог, соцсети, email-рассылки",
    results: [
      "Привлечение $2M инвестиций",
      "Регистрация 10К+ пользователей",
      "Конверсия лендинга 8.2%"
    ],
    metrics: {
      investment: "$2M",
      users: "10K+",
      conversion: "8.2%"
    },
    tags: ["FinTech", "Стартап", "Инвестиции"],
    image: "/placeholder.svg",
    featured: false
  }
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("Все проекты");

  const filteredItems = portfolioItems.filter(item => 
    selectedCategory === "Все проекты" || item.category === selectedCategory
  );

  const featuredItems = filteredItems.filter(item => item.featured);
  const regularItems = filteredItems.filter(item => !item.featured);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-slate-50/50">
        {/* Hero секция */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5"></div>
          <div className="container max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-6 px-6 py-3 text-lg font-semibold">
                <Eye className="w-5 h-5 mr-2" />
                Портфолио
              </Badge>
              <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Наши успешные проекты
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Реальные кейсы с измеримыми результатами. Посмотрите, как наш контент 
                помогает бизнесу достигать амбициозных целей
              </p>
            </div>
          </div>
        </section>

        {/* Фильтры */}
        <section className="py-8 bg-white border-b">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-6">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">Фильтр по категориям:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.name)}
                  className="flex items-center gap-2"
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-1">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Топовые кейсы */}
        {featuredItems.length > 0 && (
          <section className="py-16">
            <div className="container max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Award className="w-8 h-8 text-primary" />
                Топовые кейсы
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {featuredItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="h-48 bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center relative">
                      <BarChart3 className="w-16 h-16 text-primary" />
                      <Badge className="absolute top-4 right-4">{item.category}</Badge>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground mb-6">{item.description}</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {Object.entries(item.metrics).slice(0, 3).map(([key, value]) => (
                          <div key={key} className="text-center p-3 bg-slate-50 rounded-lg">
                            <div className="text-2xl font-bold text-primary">{value}</div>
                            <div className="text-xs text-muted-foreground capitalize">{key}</div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 mb-6">
                        {item.results.map((result, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{result}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>

                      <Button asChild className="w-full">
                        <Link to={`/portfolio/${item.id}`} className="flex items-center justify-center gap-2">
                          Подробнее о проекте
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Все проекты */}
        <section className="py-16">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Target className="w-8 h-8 text-primary" />
              Все проекты
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
                    <TrendingUp className="w-12 h-12 text-slate-400" />
                    <Badge variant="outline" className="absolute top-2 right-2 text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {Object.entries(item.metrics).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="text-center p-2 bg-slate-50 rounded">
                          <div className="text-lg font-bold text-primary">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>

                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link to={`/portfolio/${item.id}`} className="flex items-center justify-center gap-2">
                        Детали
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA секция */}
        <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Хотите такие же результаты?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Обсудим ваш проект и покажем, как наш опыт поможет достичь ваших целей
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/order" className="flex items-center gap-2">
                  Начать проект
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/#contact">Получить консультацию</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
