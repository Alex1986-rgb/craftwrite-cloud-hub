
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  avatar: string;
  bio: string;
  experience: string;
  specialization: string[];
  achievements: string[];
  education: string;
  certificates: string[];
  portfolio: {
    projectsCount: number;
    successfulCases: string[];
    avgConversion: string;
  };
  socialLinks: {
    telegram?: string;
    linkedin?: string;
    portfolio?: string;
  };
  rating: number;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "anna-kopeykina",
    name: "Анна Копейкина",
    position: "Ведущий копирайтер",
    avatar: "/api/placeholder/300/300",
    bio: "Специалист по психологии продаж и UX-копирайтингу. Создает тексты, которые увеличивают конверсию в 2-5 раз.",
    experience: "8+ лет в копирайтинге",
    specialization: ["Продающие лендинги", "Email-маркетинг", "UX-копирайтинг", "Психология продаж"],
    achievements: [
      "Автор 500+ продающих лендингов",
      "Средняя конверсия проектов 12%",
      "Сертифицированный специалист Google Analytics",
      "Спикер на 15+ маркетинговых конференциях"
    ],
    education: "МГУ, факультет психологии",
    certificates: [
      "Google Analytics Certified",
      "Facebook Blueprint Certification", 
      "Яндекс.Директ Сертификат",
      "Сертификат UX Writing"
    ],
    portfolio: {
      projectsCount: 250,
      successfulCases: [
        "Лендинг для IT-курсов: конверсия 18.5%",
        "Email-воронка для фитнес-студии: OR 45%",
        "Продуктовые страницы для SaaS: +280% продаж"
      ],
      avgConversion: "12.3%"
    },
    socialLinks: {
      telegram: "@anna_copywriter",
      linkedin: "linkedin.com/in/anna-kopeykina",
      portfolio: "kopeykina-copy.ru"
    },
    rating: 4.9
  },
  {
    id: "sergey-tekstov", 
    name: "Сергей Текстов",
    position: "SEO-копирайтер",
    avatar: "/api/placeholder/300/300",
    bio: "Эксперт по поисковому продвижению с опытом 10+ лет. Создает SEO-тексты, которые попадают в ТОП-3 по высокочастотным запросам.",
    experience: "10+ лет в SEO",
    specialization: ["SEO-статьи", "Техническое SEO", "Контент-маркетинг", "Семантическое продвижение"],
    achievements: [
      "200+ статей в ТОП-10 поисковой выдачи", 
      "Сертифицированный специалист Яндекс и Google",
      "Эксперт по алгоритмам поисковых систем",
      "Средний рост трафика клиентов +250%"
    ],
    education: "МГТУ им. Баумана, прикладная математика",
    certificates: [
      "Яндекс.Вебмастер Сертификат",
      "Google Search Console Expert",
      "SEMrush SEO Toolkit Certified",
      "Screaming Frog Certification"
    ],
    portfolio: {
      projectsCount: 180,
      successfulCases: [
        "Юридическая компания: 85% запросов в ТОП-10",
        "IT-блог: органический трафик +340%",
        "E-commerce: 50+ товарных категорий в ТОП-5"
      ],
      avgConversion: "Рост трафика +250%"
    },
    socialLinks: {
      telegram: "@seo_tekstov",
      linkedin: "linkedin.com/in/sergey-tekstov"
    },
    rating: 4.8
  },
  {
    id: "maria-emailer",
    name: "Мария Емельянова", 
    position: "Email-маркетолог",
    avatar: "/api/placeholder/300/300",
    bio: "Специалист по автоматизации продаж через email. Создает воронки с открываемостью 40%+ и конверсией 15%+.",
    experience: "6+ лет в email-маркетинге",
    specialization: ["Email-автоматизация", "CRM-маркетинг", "Сегментация", "Персонализация"],
    achievements: [
      "100+ email-воронок с конверсией 10%+",
      "Максимальная открываемость писем 67%",
      "Сертифицированный специалист MailChimp",
      "Эксперт по интеграциям CRM"
    ],
    education: "РЭУ им. Плеханова, маркетинг",
    certificates: [
      "MailChimp Email Marketing Certified",
      "GetResponse Certification",
      "HubSpot Email Marketing Certified",
      "Klaviyo Expert Certification"
    ],
    portfolio: {
      projectsCount: 120,
      successfulCases: [
        "E-commerce: средний OR 42%, CTR 8.5%",
        "B2B SaaS: конверсия trial-to-paid +180%",
        "Образовательные курсы: удержание 75%+"
      ],
      avgConversion: "12.8%"
    },
    socialLinks: {
      telegram: "@maria_email_expert",
      linkedin: "linkedin.com/in/maria-emelyanova"
    }, 
    rating: 4.9
  }
];
