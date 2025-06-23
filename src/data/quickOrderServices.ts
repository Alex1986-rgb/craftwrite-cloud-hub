
import { Service } from '@/data/types/service';

export interface QuickOrderService {
  id: string;
  name: string;
  basePrice: number;
  priceRange: string;
  popular?: boolean;
  urgent?: boolean;
  category: string;
  description?: string;
  estimatedTime?: string;
}

export const QUICK_ORDER_SERVICES: QuickOrderService[] = [
  {
    id: 'seo-article',
    name: 'SEO-статья',
    basePrice: 1500,
    priceRange: 'от 1500₽',
    popular: true,
    category: 'content',
    description: 'Оптимизированная статья для поисковых систем',
    estimatedTime: '2-3 дня'
  },
  {
    id: 'landing',
    name: 'Лендинг',
    basePrice: 5000,
    priceRange: 'от 5000₽',
    urgent: true,
    category: 'sales',
    description: 'Продающая посадочная страница',
    estimatedTime: '3-5 дней'
  },
  {
    id: 'email-campaign',
    name: 'Email-рассылка',
    basePrice: 2000,
    priceRange: 'от 2000₽',
    category: 'email',
    description: 'Серия писем для email-маркетинга',
    estimatedTime: '1-2 дня'
  },
  {
    id: 'smm-content',
    name: 'SMM-контент',
    basePrice: 800,
    priceRange: 'от 800₽',
    category: 'social',
    description: 'Посты для социальных сетей',
    estimatedTime: '1 день'
  },
  {
    id: 'telegram-content',
    name: 'Контент для Telegram',
    basePrice: 1200,
    priceRange: 'от 1200₽',
    category: 'social',
    description: 'Посты и материалы для Telegram-канала',
    estimatedTime: '1-2 дня'
  },
  {
    id: 'chatbot-scripts',
    name: 'Скрипты для чат-бота',
    basePrice: 3000,
    priceRange: 'от 3000₽',
    category: 'automation',
    description: 'Диалоги и сценарии для чат-ботов',
    estimatedTime: '2-4 дня'
  },
  {
    id: 'website-texts',
    name: 'Тексты для сайта',
    basePrice: 2500,
    priceRange: 'от 2500₽',
    category: 'web',
    description: 'Контент для корпоративного сайта',
    estimatedTime: '2-3 дня'
  },
  {
    id: 'product-descriptions',
    name: 'Описания товаров',
    basePrice: 500,
    priceRange: 'от 500₽',
    popular: true,
    category: 'ecommerce',
    description: 'Описания для интернет-магазинов',
    estimatedTime: '1 день'
  }
];

export const SERVICE_CATEGORIES = [
  { id: 'all', name: 'Все услуги', icon: '📋' },
  { id: 'content', name: 'Контент', icon: '📝' },
  { id: 'sales', name: 'Продажи', icon: '💰' },
  { id: 'email', name: 'Email', icon: '📧' },
  { id: 'social', name: 'Соцсети', icon: '📱' },
  { id: 'web', name: 'Веб-сайты', icon: '🌐' },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
  { id: 'automation', name: 'Автоматизация', icon: '🤖' }
];
