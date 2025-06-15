
import { TrendingUp, Star, Zap, MessageSquare, Building2, Heart, Lightbulb, Target } from "lucide-react";

export interface QuickPreset {
  id: string;
  name: string;
  icon: any;
  description: string;
  settings: any;
  popular: boolean;
  category: string;
  color: string;
}

export const quickPresetsData: QuickPreset[] = [
  {
    id: "ultra-quick-seo",
    name: "⚡ Быстрое SEO",
    icon: TrendingUp,
    description: "SEO-статья за 3 минуты с автооптимизацией",
    settings: {
      textType: "seo-article",
      length: [2000],
      tone: "informative",
      audience: "general",
      keywords: "",
      includeEmoji: false,
      includeCTA: false,
      seoOptimized: true
    },
    popular: true,
    category: "seo",
    color: "green"
  },
  {
    id: "viral-social",
    name: "🔥 Вирусный пост",
    icon: Star,
    description: "Контент для максимального охвата в соцсетях",
    settings: {
      textType: "social",
      length: [280],
      tone: "casual",
      audience: "general",
      keywords: "",
      includeEmoji: true,
      includeCTA: false,
      seoOptimized: false
    },
    popular: true,
    category: "social",
    color: "purple"
  },
  {
    id: "conversion-beast",
    name: "💰 Продающий лендинг",
    icon: Zap,
    description: "Максимальная конверсия для продаж",
    settings: {
      textType: "landing",
      length: [1500],
      tone: "persuasive",
      audience: "b2c",
      keywords: "",
      includeEmoji: false,
      includeCTA: true,
      seoOptimized: true
    },
    popular: true,
    category: "landing",
    color: "orange"
  },
  {
    id: "email-magnet",
    name: "📧 Email-магнит",
    icon: MessageSquare,
    description: "Письмо с высоким откликом",
    settings: {
      textType: "email",
      length: [600],
      tone: "friendly",
      audience: "b2c",
      keywords: "",
      includeEmoji: false,
      includeCTA: true,
      seoOptimized: false
    },
    popular: false,
    category: "email",
    color: "blue"
  },
  {
    id: "b2b-professional",
    name: "🏢 B2B Профи",
    icon: Building2,
    description: "Серьезный контент для бизнеса",
    settings: {
      textType: "blog",
      length: [2000],
      tone: "professional",
      audience: "b2b",
      keywords: "",
      includeEmoji: false,
      includeCTA: true,
      seoOptimized: true
    },
    popular: false,
    category: "business",
    color: "slate"
  },
  {
    id: "lifestyle-warm",
    name: "💖 Lifestyle теплый",
    icon: Heart,
    description: "Душевный контент для образа жизни",
    settings: {
      textType: "blog",
      length: [1200],
      tone: "warm",
      audience: "general",
      keywords: "",
      includeEmoji: true,
      includeCTA: false,
      seoOptimized: false
    },
    popular: false,
    category: "lifestyle",
    color: "pink"
  },
  {
    id: "startup-pitch",
    name: "🚀 Стартап питч",
    icon: Lightbulb,
    description: "Презентация идеи для инвесторов",
    settings: {
      textType: "presentation",
      length: [800],
      tone: "inspiring",
      audience: "investors",
      keywords: "",
      includeEmoji: false,
      includeCTA: true,
      seoOptimized: false
    },
    popular: false,
    category: "business",
    color: "indigo"
  },
  {
    id: "ecommerce-product",
    name: "🛍️ Товар E-com",
    icon: Target,
    description: "Описание товара для интернет-магазина",
    settings: {
      textType: "product",
      length: [500],
      tone: "persuasive",
      audience: "b2c",
      keywords: "",
      includeEmoji: false,
      includeCTA: true,
      seoOptimized: true
    },
    popular: true,
    category: "ecommerce",
    color: "emerald"
  }
];
