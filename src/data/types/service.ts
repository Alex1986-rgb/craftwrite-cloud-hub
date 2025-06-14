
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
