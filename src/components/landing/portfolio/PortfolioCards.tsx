
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, TrendingUp, Users, Award, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const portfolioItems = [
  {
    id: 1,
    title: "Интернет-магазин электроники TechStore",
    category: "E-commerce",
    description: "Увеличили конверсию на 245% и органический трафик на 180%",
    image: "/api/placeholder/400/300",
    metrics: {
      conversion: "+245%",
      traffic: "+180%",
      ranking: "ТОП-3"
    },
    tags: ["E-commerce", "SEO", "Конверсии"],
    gradient: "from-blue-500 to-cyan-600"
  },
  {
    id: 2,
    title: "Лендинг курсов программирования",
    category: "Лендинги",
    description: "Повысили конверсию лендинга с 2.3% до 18.5%",
    image: "/api/placeholder/400/300",
    metrics: {
      conversion: "18.5%",
      leads: "+800%",
      sales: "+320%"
    },
    tags: ["Лендинг", "Образование", "CRO"],
    gradient: "from-purple-500 to-violet-600"
  },
  {
    id: 3,
    title: "FinTech стартап контент-стратегия",
    category: "Контент-маркетинг",
    description: "Привлекли $2M инвестиций и 10K+ пользователей",
    image: "/api/placeholder/400/300",
    metrics: {
      investment: "$2M",
      users: "10K+",
      conversion: "8.2%"
    },
    tags: ["FinTech", "Стартап", "Инвестиции"],
    gradient: "from-emerald-500 to-green-600"
  },
  {
    id: 4,
    title: "Email-маркетинг для фитнес-клуба",
    category: "Email-маркетинг", 
    description: "Open rate 45% и рост продаж персональных тренировок на 280%",
    image: "/api/placeholder/400/300",
    metrics: {
      openRate: "45%",
      ptSales: "+280%",
      retention: "+65%"
    },
    tags: ["Email", "Фитнес", "Retention"],
    gradient: "from-orange-500 to-red-600"
  },
  {
    id: 5,
    title: "SEO для юридической компании",
    category: "SEO-статьи",
    description: "85% запросов в ТОП-10 и рост органики на 200%",
    image: "/api/placeholder/400/300", 
    metrics: {
      topPositions: "85%",
      organic: "+200%",
      leads: "+60%"
    },
    tags: ["SEO", "Юриспруденция", "B2B"],
    gradient: "from-indigo-500 to-purple-600"
  },
  {
    id: 6,
    title: "SaaS-платформа продающие тексты",
    category: "SaaS-копирайтинг",
    description: "Trial-to-paid конверсия выросла с 8% до 22%",
    image: "/api/placeholder/400/300",
    metrics: {
      trialConversion: "+175%",
      mrr: "+180%", 
      salesCycle: "-35%"
    },
    tags: ["SaaS", "B2B", "Tech"],
    gradient: "from-teal-500 to-blue-600"
  }
];

export default function PortfolioCards() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
      {portfolioItems.slice(0, 3).map((item, index) => (
        <Card key={item.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-700 border-0 bg-gradient-to-br from-white via-slate-50/30 to-white hover:scale-105 hover:-translate-y-4 relative">
          {/* Изображение проекта */}
          <div className="relative h-56 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-30 group-hover:opacity-40 transition-opacity duration-500`}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-7xl font-bold text-white/40 group-hover:text-white/60 transition-colors duration-500">
                {item.title.charAt(0)}
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <Badge className={`bg-gradient-to-r ${item.gradient} text-white border-0 px-4 py-2 font-semibold`}>
                {item.category}
              </Badge>
            </div>
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-semibold text-slate-700">ТОП</span>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <h3 className="text-2xl font-playfair font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
              {item.title}
            </h3>
            
            <p className="text-muted-foreground mb-6 text-base leading-relaxed">
              {item.description}
            </p>
            
            {/* Метрики проекта */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {Object.entries(item.metrics).map(([key, value]) => (
                <div key={key} className="text-center p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl hover:shadow-md transition-shadow duration-300">
                  <div className="text-lg font-bold text-primary mb-1">{value}</div>
                  <div className="text-xs text-muted-foreground capitalize font-medium">{key}</div>
                </div>
              ))}
            </div>
            
            {/* Теги */}
            <div className="flex flex-wrap gap-2 mb-6">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs px-3 py-1 bg-slate-100 hover:bg-slate-200 transition-colors duration-200">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <Button asChild className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300 bg-gradient-to-r from-primary to-blue-600 text-white border-0 py-3">
              <Link to={`/portfolio/${item.id}`} className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Подробнее о кейсе
                <ExternalLink className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
