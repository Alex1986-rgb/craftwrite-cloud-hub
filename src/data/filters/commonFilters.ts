
import { SmartFilter } from '@/types/advancedOrder';

export const COMMON_FILTERS: SmartFilter[] = [
  {
    id: 'topic',
    name: 'Тематика',
    type: 'select',
    description: 'Выберите основную тематику вашего проекта',
    options: [
      { value: 'business', label: 'Бизнес и финансы', description: 'Корпоративные тексты, финансовые услуги' },
      { value: 'tech', label: 'IT и технологии', description: 'Стартапы, SaaS, технические продукты' },
      { value: 'health', label: 'Здоровье и медицина', description: 'Медицинские услуги, фармацевтика' },
      { value: 'ecommerce', label: 'E-commerce', description: 'Интернет-магазины, маркетплейсы' },
      { value: 'education', label: 'Образование', description: 'Онлайн-курсы, образовательные платформы' },
      { value: 'realestate', label: 'Недвижимость', description: 'Агентства, застройщики, аренда' },
      { value: 'beauty', label: 'Красота и здоровье', description: 'Салоны красоты, косметика, фитнес' },
      { value: 'travel', label: 'Туризм', description: 'Турагентства, отели, экскурсии' },
      { value: 'auto', label: 'Автомобили', description: 'Автосалоны, автосервисы, запчасти' },
      { value: 'other', label: 'Другое', description: 'Укажите в комментариях' }
    ],
    recommendations: [
      'Четко определенная тематика поможет создать более релевантный контент',
      'Мы учитываем специфику отрасли при написании текстов',
      'Для каждой ниши есть свои особенности подачи информации'
    ]
  },
  {
    id: 'textLength',
    name: 'Объем текста',
    type: 'range',
    min: 500,
    max: 15000,
    defaultValue: 3000,
    description: 'Укажите желаемый объем в символах',
    recommendations: [
      'Для SEO-статей оптимальный объем: 3000-5000 символов',
      'Для описаний товаров: 500-1500 символов',
      'Для лендингов: 5000-10000 символов'
    ]
  },
  {
    id: 'writingStyle',
    name: 'Стиль написания',
    type: 'select',
    description: 'Выберите тон и стиль текста',
    options: [
      { value: 'professional', label: 'Профессиональный', description: 'Деловой, формальный стиль' },
      { value: 'friendly', label: 'Дружелюбный', description: 'Теплый, располагающий тон' },
      { value: 'expert', label: 'Экспертный', description: 'Авторитетный, компетентный стиль' },
      { value: 'casual', label: 'Неформальный', description: 'Простой, разговорный язык' },
      { value: 'luxury', label: 'Премиальный', description: 'Изысканный, статусный стиль' },
      { value: 'urgent', label: 'Побуждающий', description: 'Мотивирующий к действию' }
    ],
    recommendations: [
      'Стиль должен соответствовать вашей целевой аудитории',
      'B2B тексты лучше писать профессиональным стилем',
      'Для молодой аудитории подходит дружелюбный стиль'
    ]
  },
  {
    id: 'targetAudience',
    name: 'Целевая аудитория',
    type: 'multiselect',
    description: 'Выберите характеристики вашей аудитории',
    options: [
      { value: 'b2b', label: 'B2B клиенты', description: 'Бизнес-клиенты, компании' },
      { value: 'b2c', label: 'B2C клиенты', description: 'Конечные потребители' },
      { value: 'young', label: 'Молодая аудитория (18-30)', description: 'Студенты, молодые специалисты' },
      { value: 'middle', label: 'Средний возраст (30-50)', description: 'Состоявшиеся профессионалы' },
      { value: 'senior', label: 'Старшая группа (50+)', description: 'Опытные специалисты, руководители' },
      { value: 'mass', label: 'Массовая аудитория', description: 'Широкий круг потребителей' }
    ],
    recommendations: [
      'Понимание аудитории - основа эффективного текста',
      'Возраст влияет на стиль и способ подачи информации',
      'B2B и B2C требуют разного подхода в копирайтинге'
    ]
  },
  {
    id: 'priority',
    name: 'Приоритет выполнения',
    type: 'select',
    description: 'Выберите срочность выполнения заказа',
    options: [
      { value: 'standard', label: 'Стандартный (5-7 дней)', priceMultiplier: 1.0, description: 'Обычные сроки' },
      { value: 'urgent', label: 'Срочный (2-3 дня)', priceMultiplier: 1.5, description: '+50% к стоимости' },
      { value: 'express', label: 'Экспресс (24 часа)', priceMultiplier: 2.0, description: '+100% к стоимости' }
    ],
    recommendations: [
      'Стандартные сроки обеспечивают лучшее качество',
      'Срочные заказы требуют больше ресурсов',
      'Экспресс-заказы доступны не для всех типов текстов'
    ]
  },
  {
    id: 'brandVoice',
    name: 'Голос бренда',
    type: 'select',
    description: 'Определите характер коммуникации бренда',
    options: [
      { value: 'authoritative', label: 'Авторитетный', description: 'Экспертный, компетентный' },
      { value: 'innovative', label: 'Инновационный', description: 'Современный, технологичный' },
      { value: 'caring', label: 'Заботливый', description: 'Понимающий, поддерживающий' },
      { value: 'playful', label: 'Игривый', description: 'Веселый, креативный' },
      { value: 'sophisticated', label: 'Утонченный', description: 'Элегантный, премиальный' }
    ],
    recommendations: [
      'Голос бренда должен отражать ценности компании',
      'Последовательность в коммуникации укрепляет узнаваемость',
      'Выбор зависит от специфики бизнеса и аудитории'
    ]
  }
];
