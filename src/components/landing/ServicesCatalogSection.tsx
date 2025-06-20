
import React from 'react';
import { 
  PenTool, 
  Search, 
  Mail, 
  MessageSquare,
  Instagram,
  ShoppingBag,
  FileText,
  Megaphone,
  Users,
  BarChart3,
  Globe,
  Zap
} from 'lucide-react';
import ServiceSectionHeader from './services/ServiceSectionHeader';
import ServiceGrid from './services/ServiceGrid';
import ServiceCTA from './services/ServiceCTA';

const services = [
  {
    id: 'seo-article',
    title: 'SEO-статьи',
    description: 'Экспертные тексты для поискового продвижения',
    icon: Search,
    features: [
      'Глубокий анализ конкурентов',
      'LSI-оптимизация',
      'Проверка уникальности',
      'Техническое задание'
    ],
    price: 'от 1 200₽',
    popular: true,
    color: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    id: 'landing-page',
    title: 'Продающие лендинги',
    description: 'Тексты, которые конвертируют посетителей в клиентов',
    icon: Zap,
    features: [
      'Психологические триггеры',
      'A/B тестирование',
      'Анализ целевой аудитории',
      'Гарантия конверсии'
    ],
    price: 'от 8 000₽',
    popular: true,
    color: 'bg-gradient-to-br from-purple-500 to-purple-600'
  },
  {
    id: 'email-campaigns',
    title: 'Email-рассылки',
    description: 'Персонализированные письма для email-маркетинга',
    icon: Mail,
    features: [
      'Сегментация аудитории',
      'Автоматизация воронок',
      'Персонализация',
      'Аналитика открытий'
    ],
    price: 'от 3 500₽',
    color: 'bg-gradient-to-br from-green-500 to-green-600'
  },
  {
    id: 'telegram-content',
    title: 'Telegram-контент',
    description: 'Контент для каналов и чат-ботов в Telegram',
    icon: MessageSquare,
    features: [
      'Контент-планы',
      'Сценарии ботов',
      'Вирусные посты',
      'Анализ метрик'
    ],
    price: 'от 2 500₽',
    color: 'bg-gradient-to-br from-cyan-500 to-cyan-600'
  },
  {
    id: 'instagram-posts',
    title: 'Instagram-посты',
    description: 'Креативный контент для социальных сетей',
    icon: Instagram,
    features: [
      'Визуальные концепции',
      'Хештег-стратегии',
      'Stories-контент',
      'Reels-сценарии'
    ],
    price: 'от 1 800₽',
    color: 'bg-gradient-to-br from-pink-500 to-pink-600'
  },
  {
    id: 'wildberries-cards',
    title: 'Карточки Wildberries',
    description: 'Описания товаров для маркетплейсов',
    icon: ShoppingBag,
    features: [
      'SEO-оптимизация',
      'Ключевые слова',
      'Конверсионные описания',
      'A+ контент'
    ],
    price: 'от 800₽',
    color: 'bg-gradient-to-br from-orange-500 to-orange-600'
  },
  {
    id: 'website-texts',
    title: 'Тексты для сайтов',
    description: 'Полноценное наполнение корпоративных сайтов',
    icon: Globe,
    features: [
      'Структура сайта',
      'SEO-тексты',
      'Конверсионные блоки',
      'Юзабилити-аудит'
    ],
    price: 'от 15 000₽',
    color: 'bg-gradient-to-br from-indigo-500 to-indigo-600'
  },
  {
    id: 'press-releases',
    title: 'Пресс-релизы',
    description: 'Профессиональные материалы для СМИ',
    icon: Megaphone,
    features: [
      'Медиа-формат',
      'Распространение',
      'PR-стратегия',
      'Мониторинг упоминаний'
    ],
    price: 'от 5 000₽',
    color: 'bg-gradient-to-br from-red-500 to-red-600'
  },
  {
    id: 'business-proposals',
    title: 'Коммерческие предложения',
    description: 'Документы, которые заключают сделки',
    icon: FileText,
    features: [
      'Структурированный подход',
      'Конкурентные преимущества',
      'Расчеты ROI',
      'Персонализация'
    ],
    price: 'от 4 000₽',
    color: 'bg-gradient-to-br from-teal-500 to-teal-600'
  }
];

const ServicesCatalogSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-slate-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-to-tr from-blue-500/5 to-emerald-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <ServiceSectionHeader
          title="Полный спектр копирайтинга"
          description="От SEO-статей до комплексных маркетинговых кампаний — создаем контент, который работает на ваш бизнес"
          badgeText="Профессиональные услуги"
        />
        
        <ServiceGrid services={services} />
        
        <ServiceCTA />
      </div>
    </section>
  );
};

export default ServicesCatalogSection;
