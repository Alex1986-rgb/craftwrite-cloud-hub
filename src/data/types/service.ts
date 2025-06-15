
export interface TextExample {
  title: string;
  content: string;
  metrics: {
    [key: string]: string | number | boolean;
  };
}

export interface SeoMetrics {
  averageRanking: string;
  trafficIncrease: string;
  conversionRate: string;
  organicGrowth: string;
}

export interface Service {
  slug: string;
  name: string;
  desc: string;
  detail: string;
  category: string;
  difficulty: string;
  price: {
    min: number;
    max: number;
    currency: string;
  };
  deliveryTime: {
    min: number;
    max: number;
    unit: string;
  };
  features: string[];
  tags: string[];
  popularity: number;
  rules: string[];
  recs: string[];
  seoText: string;
  format: string;
  textExamples?: TextExample[];
  seoMetrics?: SeoMetrics;
  hasEnhancedExamples?: boolean; // Новое поле для определения наличия расширенных примеров
}

export type ServiceCategory = 
  | "Контент-маркетинг"
  | "Продающие тексты"
  | "E-commerce"
  | "Социальные сети"
  | "Email-маркетинг"
  | "Бизнес-документы";

export type ServiceDifficulty = 
  | "Простая"
  | "Средняя"
  | "Сложная"
  | "Экспертная";
