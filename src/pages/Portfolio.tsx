import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioFilters from "@/components/portfolio/PortfolioFilters";
import FeaturedProjects from "@/components/portfolio/FeaturedProjects";
import AllProjects from "@/components/portfolio/AllProjects";
import PortfolioCTASection from "@/components/portfolio/PortfolioCTASection";

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
    title: "Контент-стратегия для FinTech стартапа",
    category: "Контент-маркетинг",
    client: "PayFlow",
    description: "Разработка комплексной контент-стратегии для финтех-стартапа: от лендинга до блога и email-рассылок",
    results: [
      "Привлечение $2M инвестиций",
      "Регистрация 10K+ пользователей",
      "Конверсия лендинга 8.2%"
    ],
    metrics: {
      investment: "$2M",
      users: "10K+",
      conversion: "8.2%"
    },
    tags: ["FinTech", "Стартап", "Инвестиции"],
    image: "/placeholder.svg",
    featured: true
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
        <PortfolioHero />
        <PortfolioFilters 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <FeaturedProjects projects={featuredItems} />
        <AllProjects projects={regularItems} />
        <PortfolioCTASection />
      </main>
      <Footer />
    </>
  );
}
