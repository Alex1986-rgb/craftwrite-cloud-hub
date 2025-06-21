
export interface Testimonial {
  id: string;
  client_name: string;
  client_company?: string;
  client_avatar_url?: string;
  service_slug?: string;
  rating: number;
  review_text: string;
  project_details?: string;
  results_achieved?: string;
  created_at: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    client_name: "Алексей Морозов",
    client_company: "TechStart Solutions",
    client_avatar_url: "/api/placeholder/60/60",
    service_slug: "seo-articles",
    rating: 5,
    review_text: "Ребята написали потрясающую SEO-статью для нашего IT-стартапа. За 2 месяца мы поднялись с 4 страницы в ТОП-3 Google по основным запросам. Трафик вырос в 3.5 раза!",
    project_details: "SEO-статья на тему 'DevOps практики для стартапов' объемом 4500 символов",
    results_achieved: "Рост органического трафика на 340%, позиции в ТОП-3 по 15 ключевым запросам",
    created_at: "2024-01-20"
  },
  {
    id: "2",
    client_name: "Мария Соколова",
    client_company: "BeautyLux",
    client_avatar_url: "/api/placeholder/60/60",
    service_slug: "product-descriptions",
    rating: 5,
    review_text: "Переписали описания товаров на Wildberries - результат потрясающий! Продажи выросли почти в 2 раза, а возвраты снизились. Теперь обращаемся только к вам!",
    project_details: "Переписаны описания для 45 SKU органической косметики",
    results_achieved: "Рост продаж на 180%, снижение возвратов на 40%, позиции в ТОП-10",
    created_at: "2024-03-05"
  },
  {
    id: "3",
    client_name: "Дмитрий Козлов",
    client_company: "FitLife Network",
    client_avatar_url: "/api/placeholder/60/60",
    service_slug: "social-media-content",
    rating: 5,
    review_text: "Контент-план для Instagram просто огонь! За месяц привлекли 1200+ новых клиентов в фитнес-клубы. Вовлеченность подписчиков выросла в 7 раз. Спасибо!",
    project_details: "Контент-стратегия и 30 постов для сети из 5 фитнес-клубов",
    results_achieved: "Охват 150K, вовлеченность 8.7%, +1200 новых клиентов, рост выручки на 340%",
    created_at: "2024-02-18"
  },
  {
    id: "4",
    client_name: "Екатерина Волкова",
    client_company: "ProManage SaaS",
    client_avatar_url: "/api/placeholder/60/60",
    service_slug: "email-campaigns",
    rating: 5,
    review_text: "Email-серия превзошла все ожидания! Открываемость 45% - мы такого не видели никогда. Retention новых пользователей вырос почти в 3 раза. Профессионально!",
    project_details: "Welcome-серия из 7 писем для SaaS-платформы управления проектами",
    results_achieved: "Открываемость 45%, кликабельность 12%, рост retention на 180%",
    created_at: "2024-02-10"
  },
  {
    id: "5",
    client_name: "Игорь Петров",
    client_company: "EduTech Academy",
    client_avatar_url: "/api/placeholder/60/60",
    service_slug: "landing-pages",
    rating: 5,
    review_text: "Лендинг для онлайн-курсов - это просто шедевр! Конверсия выросла с 3% до 23%. Каждый день десятки новых учеников. Окупился за неделю!",
    project_details: "Продающий лендинг для онлайн-школы программирования",
    results_achieved: "Конверсия 23%, рост времени на сайте на 400%, увеличение выручки на 650%",
    created_at: "2024-01-25"
  },
  {
    id: "6",
    client_name: "Анна Смирнова",
    client_company: "LocalBiz",
    rating: 5,
    review_text: "Написали тексты для нашего корпоративного сайта. Клиенты стали чаще обращаться, заявки выросли на 150%. Очень довольны качеством и сроками!",
    service_slug: "website-texts",
    project_details: "Полный комплект текстов для корпоративного сайта (8 страниц)",
    results_achieved: "Рост заявок на 150%, улучшение позиций в поиске, снижение отказов на 35%",
    created_at: "2024-03-12"
  }
];
