
export interface PortfolioItem {
  id: string;
  service_slug: string;
  title: string;
  description: string;
  before_text?: string;
  after_text?: string;
  image_url?: string;
  metrics: Record<string, any>;
  tags: string[];
  created_at: string;
}

export const PORTFOLIO_EXAMPLES: PortfolioItem[] = [
  {
    id: "1",
    service_slug: "seo-articles",
    title: "SEO-статья для IT-компании: рост трафика на 340%",
    description: "Написали экспертную статью о DevOps-практиках для IT-компании. Результат превзошел все ожидания.",
    before_text: "Сайт компании находился на 3-4 странице поиска по ключевым запросам. Органический трафик составлял всего 150 посетителей в месяц.",
    after_text: "После публикации статьи сайт поднялся в ТОП-3 по 15 ключевым запросам. Органический трафик вырос до 660 посетителей в месяц.",
    metrics: {
      trafficIncrease: "340%",
      keywordPositions: "ТОП-3",
      timeToResult: "2 месяца",
      conversionRate: "12%"
    },
    tags: ["SEO", "IT", "DevOps", "технические тексты"],
    created_at: "2024-01-15"
  },
  {
    id: "2",
    service_slug: "landing-pages",
    title: "Лендинг для онлайн-курсов: конверсия 23%",
    description: "Создали продающий лендинг для онлайн-школы программирования с применением психологических триггеров.",
    before_text: "Старый лендинг показывал конверсию 3.2%. Посетители не доходили до оплаты, высокий показатель отказов.",
    after_text: "Новый лендинг демонстрирует стабильную конверсию 23%. Время на сайте увеличилось в 4 раза.",
    metrics: {
      conversionRate: "23%",
      bounceReduction: "65%",
      timeOnSite: "+400%",
      revenue: "+650%"
    },
    tags: ["лендинг", "образование", "конверсия", "психология продаж"],
    created_at: "2024-01-20"
  },
  {
    id: "3",
    service_slug: "email-campaigns",
    title: "Email-серия для SaaS: 45% открываемость",
    description: "Разработали welcome-серию из 7 писем для SaaS-платформы управления проектами.",
    before_text: "Стандартные письма показывали открываемость 18% и кликабельность 2.1%. Низкий retention новых пользователей.",
    after_text: "Персонализированная серия достигла открываемости 45% и кликабельности 12%. Retention увеличился на 180%.",
    metrics: {
      openRate: "45%",
      clickRate: "12%",
      retentionIncrease: "180%",
      ltv: "+230%"
    },
    tags: ["email-маркетинг", "SaaS", "retention", "автоматизация"],
    created_at: "2024-02-01"
  },
  {
    id: "4",
    service_slug: "social-media-content",
    title: "SMM-стратегия для фитнес-клуба: 150K охват",
    description: "Создали контент-план на месяц для сети фитнес-клубов с фокусом на мотивационный контент.",
    before_text: "Аккаунт набирал 2-3K охвата в месяц. Вовлеченность на уровне 1.2%. Подписчики не активны.",
    after_text: "Достигли органического охвата 150K за месяц. Вовлеченность выросла до 8.7%. +1200 новых клиентов.",
    metrics: {
      reachIncrease: "5000%",
      engagement: "8.7%",
      newClients: 1200,
      revenueGrowth: "340%"
    },
    tags: ["SMM", "фитнес", "мотивация", "Instagram"],
    created_at: "2024-02-15"
  },
  {
    id: "5",
    service_slug: "product-descriptions",
    title: "Описания для косметики: +180% продаж на WB",
    description: "Переписали описания для линейки органической косметики на Wildberries.",
    before_text: "Товары теялись на 5-6 страницах поиска. Конверсия в покупку составляла 0.8%. Много возвратов.",
    after_text: "Поднялись в ТОП-10 по всем ключевым запросам. Конверсия выросла до 2.3%. Возвраты снизились на 40%.",
    metrics: {
      salesIncrease: "180%",
      conversionRate: "2.3%",
      returnReduction: "40%",
      positionImprovement: "ТОП-10"
    },
    tags: ["e-commerce", "косметика", "Wildberries", "конверсия"],
    created_at: "2024-03-01"
  }
];
