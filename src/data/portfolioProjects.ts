
export type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  results: string[];
  metrics: Record<string, string>;
  tags: string[];
  featured: boolean;
};

export const portfolioProjects: Project[] = [
  {
    id: 1,
    title: "Интернет-магазин электроники TechPro",
    category: "E-commerce",
    description: "Полный рефакторинг контента для крупного интернет-магазина электроники с фокусом на повышение конверсии и SEO-оптимизацию.",
    results: [
      "Увеличение конверсии на 180%",
      "Рост органического трафика на 250%",
      "Повышение среднего чека на 45%"
    ],
    metrics: {
      "конверсия": "+180%",
      "трафик": "+250%",
      "продажи": "+320%"
    },
    tags: ["E-commerce", "SEO", "Продающие тексты", "Описания товаров"],
    featured: true
  },
  {
    id: 2,
    title: "Финтех стартап CryptoWave",
    category: "Финтех",
    description: "Создание контент-стратегии и всех текстов для инновационной платформы криптоинвестиций.",
    results: [
      "Привлечение 50,000+ пользователей за 3 месяца",
      "Повышение доверия к бренду на 90%",
      "Успешное привлечение $5M инвестиций"
    ],
    metrics: {
      "пользователи": "50K+",
      "доверие": "+90%",
      "инвестиции": "$5M"
    },
    tags: ["Финтех", "Стартап", "Инвестиции", "Блокчейн"],
    featured: true
  },
  {
    id: 3,
    title: "Медицинская клиника HealthFirst",
    category: "Медицина",
    description: "Разработка контента для сайта премиальной медицинской клиники с акцентом на экспертность и доверие.",
    results: [
      "Увеличение записей на прием на 120%",
      "Рост узнаваемости бренда на 85%",
      "Повышение среднего чека на 60%"
    ],
    metrics: {
      "записи": "+120%",
      "бренд": "+85%",
      "чек": "+60%"
    },
    tags: ["Медицина", "Премиум", "Экспертность", "Доверие"],
    featured: false
  },
  {
    id: 4,
    title: "IT-консалтинг DevSolutions",
    category: "IT",
    description: "Создание технического контента и кейсов для B2B IT-компании специализирующейся на Enterprise решениях.",
    results: [
      "Увеличение лидов на 200%",
      "Сокращение цикла продаж на 30%",
      "Рост среднего контракта на 150%"
    ],
    metrics: {
      "лиды": "+200%",
      "цикл": "-30%",
      "контракт": "+150%"
    },
    tags: ["IT", "B2B", "Enterprise", "Консалтинг"],
    featured: false
  },
  {
    id: 5,
    title: "Образовательная платформа EduMaster",
    category: "Образование",
    description: "Комплексная работа над контентом для онлайн-платформы профессионального образования.",
    results: [
      "Увеличение конверсии в платные курсы на 140%",
      "Рост удержания студентов на 75%",
      "Повышение NPS на 40 пунктов"
    ],
    metrics: {
      "конверсия": "+140%",
      "удержание": "+75%",
      "NPS": "+40"
    },
    tags: ["Образование", "EdTech", "Онлайн-курсы", "UX-копирайтинг"],
    featured: false
  }
];

export const portfolioCategories = [
  { name: "all", count: portfolioProjects.length },
  { name: "E-commerce", count: portfolioProjects.filter(p => p.category === "E-commerce").length },
  { name: "Финтех", count: portfolioProjects.filter(p => p.category === "Финтех").length },
  { name: "Медицина", count: portfolioProjects.filter(p => p.category === "Медицина").length },
  { name: "IT", count: portfolioProjects.filter(p => p.category === "IT").length },
  { name: "Образование", count: portfolioProjects.filter(p => p.category === "Образование").length }
];
