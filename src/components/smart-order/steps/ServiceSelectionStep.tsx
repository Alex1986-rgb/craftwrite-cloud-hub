
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp, Clock, Star, FileText, Globe, Mail, Share2 } from 'lucide-react';

interface ServiceSelectionStepProps {
  selectedService: string;
  onServiceSelect: (service: string, subtype?: string) => void;
}

const SERVICES = [
  {
    id: 'seo-article',
    icon: FileText,
    title: 'SEO-статья',
    subtitle: 'Для продвижения сайта',
    description: 'Оптимизированные статьи для роста в поиске',
    price: 'от 2 000₽',
    time: '3-5 дней',
    popular: true,
    examples: ['Как выбрать...', 'ТОП-10 лучших...', 'Полное руководство по...'],
    subtypes: ['Информационная', 'Коммерческая', 'Обзорная', 'Экспертная']
  },
  {
    id: 'landing-page',
    icon: Globe,
    title: 'Лендинг',
    subtitle: 'Продающая страница',
    description: 'Конвертирующие тексты для посадочных страниц',
    price: 'от 15 000₽',
    time: '5-7 дней',
    popular: true,
    examples: ['Заголовок + оффер', 'Преимущества', 'Призывы к действию'],
    subtypes: ['Классический', 'Квизовый', 'Видео-лендинг', 'Мини-лендинг']
  },
  {
    id: 'sales-letter',
    icon: Mail,
    title: 'Продающее письмо',
    subtitle: 'Для email-маркетинга',
    description: 'Письма, которые продают и удерживают внимание',
    price: 'от 5 000₽',
    time: '2-3 дня',
    popular: false,
    examples: ['Welcome-серия', 'Продажа товара', 'Реактивация'],
    subtypes: ['Приветственное', 'Продающее', 'Реактивационное', 'Информационное']
  },
  {
    id: 'product-description',
    icon: Star,
    title: 'Описания товаров',
    subtitle: 'Для интернет-магазинов',
    description: 'Продающие описания для карточек товаров',
    price: 'от 300₽',
    time: '1-2 дня',
    popular: true,
    examples: ['Характеристики', 'Преимущества', 'Применение'],
    subtypes: ['Краткое', 'Подробное', 'SEO-оптимизированное', 'Эмоциональное']
  },
  {
    id: 'blog-post',
    icon: FileText,
    title: 'Статья для блога',
    subtitle: 'Экспертный контент',
    description: 'Качественные статьи для вашего блога',
    price: 'от 2 500₽',
    time: '3-4 дня',
    popular: false,
    examples: ['Кейсы', 'Инструкции', 'Тренды отрасли'],
    subtypes: ['Кейс-стади', 'Инструкция', 'Новости', 'Мнение эксперта']
  },
  {
    id: 'social-media',
    icon: Share2,
    title: 'Контент для соцсетей',
    subtitle: 'Посты и сторис',
    description: 'Вирусный контент для социальных сетей',
    price: 'от 500₽',
    time: '1-2 дня',
    popular: true,
    examples: ['Посты ВК/Телеграм', 'Сторис', 'Рилс-сценарии'],
    subtypes: ['Пост ВКонтакте', 'Пост Telegram', 'Instagram Stories', 'Reels-сценарий']
  }
];

export default function ServiceSelectionStep({ selectedService, onServiceSelect }: ServiceSelectionStepProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubtype, setSelectedSubtype] = useState('');

  const filteredServices = SERVICES.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedServiceData = SERVICES.find(s => s.id === selectedService);

  const handleServiceSelect = (serviceId: string) => {
    onServiceSelect(serviceId);
    setSelectedSubtype('');
  };

  const handleSubtypeSelect = (subtype: string) => {
    setSelectedSubtype(subtype);
    onServiceSelect(selectedService, subtype);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Какой контент вам нужен?
        </h2>
        <p className="text-gray-600 mb-6">
          Выберите тип текста из нашего каталога
        </p>
        
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Поиск по услугам..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedService === service.id
                ? 'ring-2 ring-blue-500 bg-blue-50'
                : 'hover:shadow-md'
            }`}
            onClick={() => handleServiceSelect(service.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  selectedService === service.id ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <service.icon className={`w-5 h-5 ${
                    selectedService === service.id ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{service.title}</h3>
                  <p className="text-sm text-gray-500">{service.subtitle}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="text-xs mb-1">
                  {service.price}
                </Badge>
                {service.popular && (
                  <div className="flex items-center gap-1 text-orange-500">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs">Популярно</span>
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{service.description}</p>
            
            <div className="space-y-2">
              <div className="text-xs text-gray-500">Примеры:</div>
              <div className="flex flex-wrap gap-1">
                {service.examples.map((example, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {example}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1 text-gray-500">
                <Clock className="w-3 h-3" />
                <span className="text-xs">{service.time}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Subtype selection */}
      {selectedServiceData && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-3">
            Уточните тип: {selectedServiceData.title}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {selectedServiceData.subtypes.map((subtype) => (
              <button
                key={subtype}
                onClick={() => handleSubtypeSelect(subtype)}
                className={`p-2 text-sm rounded-lg border transition-colors ${
                  selectedSubtype === subtype
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                }`}
              >
                {subtype}
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* No results */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            Услуги не найдены по запросу "{searchTerm}"
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="text-blue-600 hover:text-blue-800"
          >
            Показать все услуги
          </button>
        </div>
      )}
    </div>
  );
}
