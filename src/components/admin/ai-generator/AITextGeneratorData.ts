
import { FileText, Users, Mail, MessageSquare } from "lucide-react";
import { ContentType, Option } from "./AITextGeneratorTypes";

export const contentTypes: ContentType[] = [
  { value: "seo-article", label: "SEO-статья", icon: FileText, description: "Статья для поискового продвижения" },
  { value: "landing", label: "Лендинг", icon: Users, description: "Продающая страница" },
  { value: "email", label: "Email-рассылка", icon: Mail, description: "Письмо для подписчиков" },
  { value: "social", label: "Соцсети", icon: MessageSquare, description: "Пост для социальных сетей" },
  { value: "product", label: "Описание товара", icon: FileText, description: "Коммерческое описание" },
  { value: "blog", label: "Блог-пост", icon: FileText, description: "Информационная статья" },
  { value: "press-release", label: "Пресс-релиз", icon: FileText, description: "Новостное сообщение" }
];

export const toneOptions: Option[] = [
  { value: "professional", label: "Профессиональный" },
  { value: "friendly", label: "Дружелюбный" },
  { value: "formal", label: "Официальный" },
  { value: "casual", label: "Неформальный" },
  { value: "persuasive", label: "Убедительный" },
  { value: "informative", label: "Информативный" }
];

export const audienceOptions: Option[] = [
  { value: "b2b", label: "B2B (бизнес)" },
  { value: "b2c", label: "B2C (потребители)" },
  { value: "experts", label: "Эксперты" },
  { value: "beginners", label: "Новички" },
  { value: "general", label: "Широкая аудитория" }
];

export const initialFormData = {
  prompt: "",
  textType: "",
  length: [3000],
  tone: "",
  audience: "",
  keywords: "",
  language: "russian",
  includeEmoji: false,
  includeCTA: true,
  seoOptimized: true
};
