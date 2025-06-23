import React from 'react';
import { Link } from 'react-router-dom';
import ComprehensiveSeo from '@/components/seo/ComprehensiveSeo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Mail,
  MessageCircle,
  Bot,
  Globe,
  Instagram,
  ShoppingBag,
  Package,
  Video,
  Linkedin,
  ArrowRight,
  Zap // Добавляем импорт Zap
} from 'lucide-react';

const services = [
  {
    id: 'seo-article',
    name: 'SEO-статьи',
    desc: 'Профессиональные SEO-статьи для продвижения сайта в поисковых системах',
    icon: <FileText className="w-8 h-8" />,
    price: { min: 2500, max: 9000 },
    orderPath: '/order/seo-article'
  },
  {
    id: 'bulk-seo',
    name: 'Массовая SEO-оптимизация',
    desc: 'Оптимизация сотен страниц автоматически. Загрузка файлов и экспорт в Excel',
    icon: <Zap className="w-8 h-8" />,
    price: { min: 50, max: 60 },
    orderPath: '/order/bulk-seo',
    isNew: true
  },
  {
    id: 'landing',
    name: 'Лендинги',
    desc: 'Продающие лендинги для привлечения клиентов и увеличения конверсии',
    icon: <Globe className="w-8 h-8" />,
    price: { min: 5000, max: 25000 },
    orderPath: '/order/landing'
  },
  {
    id: 'email',
    name: 'Email-рассылки',
    desc: 'Эффективные email-рассылки для удержания клиентов и продвижения продуктов',
    icon: <Mail className="w-8 h-8" />,
    price: { min: 1500, max: 7500 },
    orderPath: '/order/email'
  },
  {
    id: 'telegram',
    name: 'Контент для Telegram',
    desc: 'Вовлекающий контент для Telegram-каналов: посты, статьи, опросы',
    icon: <MessageCircle className="w-8 h-8" />,
    price: { min: 1000, max: 5000 },
    orderPath: '/order/telegram'
  },
  {
    id: 'bot-scripts',
    name: 'Скрипты для чат-ботов',
    desc: 'Интеллектуальные скрипты для чат-ботов: ответы на вопросы, консультации, продажи',
    icon: <Bot className="w-8 h-8" />,
    price: { min: 2000, max: 10000 },
    orderPath: '/order/bot-scripts'
  },
  {
    id: 'website-texts',
    name: 'Тексты для сайта',
    desc: 'Уникальные тексты для вашего сайта: главная, о компании, услуги, контакты',
    icon: <FileText className="w-8 h-8" />,
    price: { min: 3000, max: 15000 },
    orderPath: '/order/website-texts'
  },
  {
    id: 'instagram',
    name: 'Посты для Instagram',
    desc: 'Привлекательные посты для Instagram: фото, видео, тексты, хэштеги',
    icon: <Instagram className="w-8 h-8" />,
    price: { min: 800, max: 4000 },
    orderPath: '/order/instagram'
  },
  {
    id: 'wildberries',
    name: 'Карточки Wildberries',
    desc: 'Продающие карточки товаров для Wildberries: фото, описание, характеристики',
    icon: <ShoppingBag className="w-8 h-8" />,
    price: { min: 1200, max: 6000 },
    orderPath: '/order/wildberries'
  },
  {
    id: 'ozon',
    name: 'Карточки Ozon',
    desc: 'Оптимизированные карточки товаров для Ozon: фото, описание, характеристики',
    icon: <Package className="w-8 h-8" />,
    price: { min: 1200, max: 6000 },
    orderPath: '/order/ozon'
  },
  {
    id: 'youtube',
    name: 'Скрипты для YouTube',
    desc: 'Интересные скрипты для YouTube-каналов: обзоры, интервью, истории',
    icon: <Video className="w-8 h-8" />,
    price: { min: 2000, max: 10000 },
    orderPath: '/order/youtube'
  },
  {
    id: 'linkedin',
    name: 'Посты для LinkedIn',
    desc: 'Профессиональные посты для LinkedIn: статьи, новости, мнения',
    icon: <Linkedin className="w-8 h-8" />,
    price: { min: 1000, max: 5000 },
    orderPath: '/order/linkedin'
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30">
      <ComprehensiveSeo
        title="Услуги копирайтинга | Заказать текст онлайн"
        description="Профессиональные услуги копирайтинга: SEO-статьи, лендинги, email-рассылки и многое другое. Закажите текст онлайн!"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Услуги копирайтинга
          </h1>
          <p className="text-gray-600 text-lg">
            Закажите профессиональный текст для вашего бизнеса
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="glass-card hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {service.icon}
                  {service.name}
                  {service.isNew && (
                    <Badge variant="secondary" className="ml-auto">New</Badge>
                  )}
                </CardTitle>
                <CardDescription>{service.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    Цена: от {service.price.min.toLocaleString()} до {service.price.max.toLocaleString()} ₽
                  </span>
                  <Link to={service.orderPath} className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center gap-1">
                    Заказать <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
