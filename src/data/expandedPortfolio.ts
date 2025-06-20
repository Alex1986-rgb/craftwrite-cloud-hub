
import type { Project } from "@/data/portfolioProjects";

export const EXPANDED_PORTFOLIO: Project[] = [
  {
    id: 1,
    title: "Интернет-магазин электроники TechPro",
    category: "E-commerce",
    description: "Полный рефакторинг контента для крупного интернет-магазина электроники с фокусом на повышение конверсии и SEO-оптимизацию. Переписали 500+ описаний товаров, создали 50 SEO-статей.",
    results: [
      "Увеличение конверсии на 180%",
      "Рост органического трафика на 250%", 
      "Повышение среднего чека на 45%",
      "Снижение отказов на 35%"
    ],
    metrics: {
      "конверсия": "+180%",
      "трафик": "+250%",
      "продажи": "+320%",
      "отказы": "-35%"
    },
    tags: ["E-commerce", "SEO", "Продающие тексты", "Описания товаров"],
    featured: true
  },
  {
    id: 2,
    title: "Финтех стартап CryptoWave",
    category: "Финтех",
    description: "Создание контент-стратегии и всех текстов для инновационной платформы криптоинвестиций. Разработали лендинг, email-воронки, техническую документацию.",
    results: [
      "Привлечение 50,000+ пользователей за 3 месяца",
      "Повышение доверия к бренду на 90%",
      "Успешное привлечение $5M инвестиций",
      "Конверсия регистрации 12%"
    ],
    metrics: {
      "пользователи": "50K+",
      "доверие": "+90%", 
      "инвестиции": "$5M",
      "конверсия": "12%"
    },
    tags: ["Финтех", "Стартап", "Инвестиции", "Блокчейн"],
    featured: true
  },
  {
    id: 3,
    title: "Медицинская клиника HealthFirst",
    category: "Медицина",
    description: "Разработка контента для сайта премиальной медицинской клиники с акцентом на экспертность и доверие. Создали 30 экспертных статей с участием врачей.",
    results: [
      "Увеличение записей на прием на 120%",
      "Рост узнаваемости бренда на 85%",
      "Повышение среднего чека на 60%",
      "Улучшение репутации в отзывах"
    ],
    metrics: {
      "записи": "+120%",
      "бренд": "+85%",
      "чек": "+60%",
      "отзывы": "4.8/5"
    },
    tags: ["Медицина", "Премиум", "Экспертность", "Доверие"],
    featured: false
  },
  {
    id: 4,
    title: "IT-консалтинг DevSolutions",
    category: "IT",
    description: "Создание технического контента и кейсов для B2B IT-компании, специализирующейся на Enterprise решениях. Разработали white papers и техническую документацию.",
    results: [
      "Увеличение лидов на 200%",
      "Сокращение цикла продаж на 30%", 
      "Рост среднего контракта на 150%",
      "Позиционирование как эксперта"
    ],
    metrics: {
      "лиды": "+200%",
      "цикл": "-30%",
      "контракт": "+150%",
      "экспертность": "9/10"
    },
    tags: ["IT", "B2B", "Enterprise", "Консалтинг"],
    featured: false
  },
  {
    id: 5,
    title: "Образовательная платформа EduMaster",
    category: "Образование", 
    description: "Комплексная работа над контентом для онлайн-платформы профессионального образования. Email-воронки, лендинги курсов, обучающий контент.",
    results: [
      "Увеличение конверсии в платные курсы на 140%",
      "Рост удержания студентов на 75%",
      "Повышение NPS на 40 пунктов",
      "Запуск 5 новых курсов"
    ],
    metrics: {
      "конверсия": "+140%",
      "удержание": "+75%", 
      "NPS": "+40",
      "курсы": "5 новых"
    },
    tags: ["Образование", "EdTech", "Онлайн-курсы", "UX-копирайтинг"],
    featured: false
  },
  {
    id: 6,
    title: "Ресторанная сеть GourmetCity",
    category: "HoReCa",
    description: "Контент-стратегия для сети премиальных ресторанов. Создали описания блюд, контент для соцсетей, PR-материалы для открытия новых локаций.",
    results: [
      "Рост онлайн-бронирований на 90%",
      "Увеличение среднего чека на 25%",
      "Охват в соцсетях 500K+ в месяц",
      "Открытие 3 новых ресторанов"
    ],
    metrics: {
      "бронирования": "+90%",
      "чек": "+25%",
      "охват": "500K",
      "локации": "+3"
    },
    tags: ["HoReCa", "Премиум", "SMM", "PR"],
    featured: true
  },
  {
    id: 7,
    title: "Фитнес-студия PowerFit",
    category: "Фитнес",
    description: "Email-маркетинг и контент для соцсетей фитнес-студии. Создали систему автоматических рассылок и вирусный контент для Instagram.",
    results: [
      "Open rate email-кампаний 45%",
      "Рост продаж абонементов на 160%",
      "Вовлечение в Instagram 15%+",
      "Удержание клиентов 80%+"
    ],
    metrics: {
      "email": "45%",
      "продажи": "+160%",
      "вовлечение": "15%",
      "удержание": "80%"
    },
    tags: ["Фитнес", "Email", "Instagram", "Retention"],
    featured: false
  },
  {
    id: 8,
    title: "Юридическая компания LegalPro",
    category: "Юриспруденция",
    description: "SEO-продвижение и контент для юридических услуг. Создали 40 экспертных статей по корпоративному праву с привлечением практикующих юристов.",
    results: [
      "85% запросов в ТОП-10 Яндекса",
      "Рост органического трафика на 280%",
      "Увеличение заявок на 65%",
      "Средний чек консультации +40%"
    ],
    metrics: {
      "позиции": "85%",
      "трафик": "+280%",
      "заявки": "+65%",
      "чек": "+40%"
    },
    tags: ["Юриспруденция", "SEO", "B2B", "Экспертность"],
    featured: false
  },
  {
    id: 9,
    title: "SaaS-платформа CloudManager",
    category: "SaaS",
    description: "Продающие тексты для B2B SaaS-платформы управления облачными ресурсами. Лендинги, email-воронки, техническая документация.",
    results: [
      "Trial-to-paid конверсия выросла с 8% до 22%",
      "MRR увеличился на 180%",
      "Сокращение цикла продаж на 35%",
      "Снижение Churn rate на 40%"
    ],
    metrics: {
      "конверсия": "+175%",
      "MRR": "+180%",
      "цикл": "-35%",
      "churn": "-40%"
    },
    tags: ["SaaS", "B2B", "Tech", "Облачные технологии"],
    featured: true
  },
  {
    id: 10,
    title: "Банк FinanceFirst",
    category: "Банкинг",
    description: "Контент для цифрового банка: продуктовые страницы, обучающие материалы, email-кампании. Соблюдение всех требований ЦБ РФ.",
    results: [
      "Рост открытия счетов на 95%",
      "Конверсия кредитных заявок +70%",
      "NPS банка вырос до 8.2",
      "Снижение обращений в поддержку на 30%"
    ],
    metrics: {
      "счета": "+95%",
      "кредиты": "+70%",
      "NPS": "8.2",
      "поддержка": "-30%"
    },
    tags: ["Банкинг", "Финансы", "Регулирование", "Digital"],
    featured: false
  }
];
