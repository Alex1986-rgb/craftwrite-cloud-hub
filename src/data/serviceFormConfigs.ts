
export interface FormFieldConfig {
  type: 'input' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'number' | 'date';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string; price?: number }[];
  description?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
  dependsOn?: string;
  dependsOnValue?: string;
  priceMultiplier?: number;
  additionalPrice?: number;
}

export interface ServiceFormConfig {
  serviceId: string;
  serviceName: string;
  basePrice: number;
  steps: {
    [stepNumber: number]: {
      title: string;
      fields: { [fieldName: string]: FormFieldConfig };
    };
  };
  additionalServices?: { [serviceId: string]: FormFieldConfig };
  deliveryOptions: { [optionId: string]: FormFieldConfig };
  priceCalculation: {
    volumeMultipliers?: { [range: string]: number };
    urgencyMultipliers?: { [urgency: string]: number };
    complexityMultipliers?: { [complexity: string]: number };
  };
}

export const serviceFormConfigs: { [serviceId: string]: ServiceFormConfig } = {
  'seo-article': {
    serviceId: 'seo-article',
    serviceName: 'SEO-статья',
    basePrice: 2500,
    steps: {
      2: {
        title: 'Параметры статьи',
        fields: {
          topic: {
            type: 'input',
            label: 'Тема статьи',
            placeholder: 'О чем должна быть статья?',
            required: true
          },
          wordCount: {
            type: 'select',
            label: 'Объем статьи',
            required: true,
            options: [
              { value: '1000', label: '1000 слов', price: 2500 },
              { value: '2000', label: '2000 слов', price: 4500 },
              { value: '3000', label: '3000 слов', price: 6500 },
              { value: '5000', label: '5000+ слов', price: 10000 }
            ]
          },
          keywords: {
            type: 'textarea',
            label: 'Ключевые слова',
            placeholder: 'Введите ключевые слова через запятую',
            description: 'Основные ключевые слова для SEO-оптимизации'
          },
          targetAudience: {
            type: 'input',
            label: 'Целевая аудитория',
            placeholder: 'Для кого предназначена статья?'
          }
        }
      },
      3: {
        title: 'Детали и требования',
        fields: {
          structure: {
            type: 'select',
            label: 'Структура статьи',
            options: [
              { value: 'standard', label: 'Стандартная (введение, основная часть, заключение)' },
              { value: 'listicle', label: 'Список (топ-10, советы и т.д.)' },
              { value: 'howto', label: 'Инструкция (пошаговое руководство)' },
              { value: 'comparison', label: 'Сравнение (обзор, анализ)' }
            ]
          },
          tone: {
            type: 'radio',
            label: 'Стиль изложения',
            options: [
              { value: 'professional', label: 'Профессиональный' },
              { value: 'friendly', label: 'Дружелюбный' },
              { value: 'academic', label: 'Академический' },
              { value: 'casual', label: 'Неформальный' }
            ]
          },
          sources: {
            type: 'textarea',
            label: 'Источники и ссылки',
            placeholder: 'Укажите источники, на которые нужно ссылаться'
          }
        }
      }
    },
    additionalServices: {
      metaTags: {
        type: 'checkbox',
        label: 'Мета-теги (Title, Description)',
        additionalPrice: 800
      },
      images: {
        type: 'checkbox',
        label: 'Подбор изображений',
        additionalPrice: 1200
      },
      competitor: {
        type: 'checkbox',
        label: 'Анализ конкурентов',
        additionalPrice: 1500
      }
    },
    deliveryOptions: {
      standard: {
        type: 'radio',
        label: 'Стандартные сроки (3-5 дней)',
        priceMultiplier: 1
      },
      express: {
        type: 'radio',
        label: 'Ускоренно (1-2 дня)',
        priceMultiplier: 1.5
      }
    },
    priceCalculation: {
      urgencyMultipliers: {
        standard: 1,
        express: 1.5
      }
    }
  },

  'landing-page': {
    serviceId: 'landing-page',
    serviceName: 'Лендинг-пейдж',
    basePrice: 5000,
    steps: {
      2: {
        title: 'Параметры лендинга',
        fields: {
          businessType: {
            type: 'select',
            label: 'Тип бизнеса',
            required: true,
            options: [
              { value: 'product', label: 'Продажа товара' },
              { value: 'service', label: 'Услуга' },
              { value: 'course', label: 'Обучающий курс' },
              { value: 'event', label: 'Мероприятие' },
              { value: 'app', label: 'Приложение/SaaS' }
            ]
          },
          targetAction: {
            type: 'input',
            label: 'Целевое действие',
            placeholder: 'Что должен сделать посетитель? (купить, заказать, записаться)',
            required: true
          },
          productDescription: {
            type: 'textarea',
            label: 'Описание продукта/услуги',
            placeholder: 'Подробно расскажите о вашем предложении',
            required: true
          }
        }
      },
      3: {
        title: 'Структура и контент',
        fields: {
          sections: {
            type: 'checkbox',
            label: 'Необходимые блоки',
            options: [
              { value: 'hero', label: 'Главный экран с предложением' },
              { value: 'benefits', label: 'Преимущества и выгоды' },
              { value: 'features', label: 'Функции и возможности' },
              { value: 'testimonials', label: 'Отзывы клиентов' },
              { value: 'pricing', label: 'Цены и тарифы' },
              { value: 'faq', label: 'Частые вопросы' },
              { value: 'guarantee', label: 'Гарантии' }
            ]
          },
          callToAction: {
            type: 'input',
            label: 'Текст кнопки CTA',
            placeholder: 'Например: Заказать сейчас, Получить консультацию'
          },
          urgencyElement: {
            type: 'select',
            label: 'Элемент срочности',
            options: [
              { value: 'none', label: 'Без элементов срочности' },
              { value: 'timer', label: 'Таймер обратного отсчета' },
              { value: 'limited', label: 'Ограниченное количество' },
              { value: 'discount', label: 'Временная скидка' }
            ]
          }
        }
      }
    },
    additionalServices: {
      copywriting: {
        type: 'checkbox',
        label: 'Продающие тексты',
        additionalPrice: 3000
      },
      seo: {
        type: 'checkbox',
        label: 'SEO-оптимизация',
        additionalPrice: 2000
      },
      ab_testing: {
        type: 'checkbox',
        label: 'A/B тестирование текстов',
        additionalPrice: 2500
      }
    },
    deliveryOptions: {
      standard: {
        type: 'radio',
        label: 'Стандартные сроки (5-7 дней)',
        priceMultiplier: 1
      },
      express: {
        type: 'radio',
        label: 'Ускоренно (2-3 дня)',
        priceMultiplier: 1.4
      }
    },
    priceCalculation: {
      urgencyMultipliers: {
        standard: 1,
        express: 1.4
      }
    }
  },

  'website-texts': {
    serviceId: 'website-texts',
    serviceName: 'Тексты для сайта',
    basePrice: 3000,
    steps: {
      2: {
        title: 'Параметры сайта',
        fields: {
          websiteType: {
            type: 'select',
            label: 'Тип сайта',
            required: true,
            options: [
              { value: 'corporate', label: 'Корпоративный сайт', price: 3000 },
              { value: 'ecommerce', label: 'Интернет-магазин', price: 5000 },
              { value: 'landing', label: 'Лендинг', price: 4000 },
              { value: 'blog', label: 'Блог/Медиа', price: 3500 },
              { value: 'portfolio', label: 'Портфолио', price: 2500 }
            ]
          },
          pageCount: {
            type: 'select',
            label: 'Количество страниц',
            required: true,
            options: [
              { value: '1-3', label: '1-3 страницы', price: 1 },
              { value: '4-7', label: '4-7 страниц', price: 1.5 },
              { value: '8-15', label: '8-15 страниц', price: 2.2 },
              { value: '16-30', label: '16-30 страниц', price: 3.5 },
              { value: '30+', label: 'Более 30 страниц', price: 5 }
            ]
          },
          websiteUrl: {
            type: 'input',
            label: 'URL сайта (если есть)',
            placeholder: 'https://example.com'
          }
        }
      },
      3: {
        title: 'Детали проекта',
        fields: {
          businessDescription: {
            type: 'textarea',
            label: 'Описание бизнеса',
            placeholder: 'Расскажите о вашей компании, продуктах или услугах',
            required: true
          },
          targetAudience: {
            type: 'input',
            label: 'Целевая аудитория',
            placeholder: 'Кто ваши клиенты?'
          },
          pagesList: {
            type: 'textarea',
            label: 'Список страниц для написания',
            placeholder: 'Например: Главная, О компании, Услуги, Контакты'
          },
          toneOfVoice: {
            type: 'radio',
            label: 'Стиль текста',
            options: [
              { value: 'professional', label: 'Деловой' },
              { value: 'friendly', label: 'Дружелюбный' },
              { value: 'creative', label: 'Креативный' },
              { value: 'technical', label: 'Технический' }
            ]
          }
        }
      }
    },
    additionalServices: {
      seo: {
        type: 'checkbox',
        label: 'SEO-оптимизация',
        additionalPrice: 1500
      },
      competitor: {
        type: 'checkbox',
        label: 'Анализ конкурентов',
        additionalPrice: 2000
      },
      copywriting: {
        type: 'checkbox',
        label: 'Продающие тексты',
        additionalPrice: 2500
      }
    },
    deliveryOptions: {
      standard: {
        type: 'radio',
        label: 'Стандартные сроки (5-7 дней)',
        priceMultiplier: 1
      },
      express: {
        type: 'radio',
        label: 'Ускоренно (3-4 дня)',
        priceMultiplier: 1.3
      },
      urgent: {
        type: 'radio',
        label: 'Срочно (1-2 дня)',
        priceMultiplier: 1.5
      }
    },
    priceCalculation: {
      urgencyMultipliers: {
        standard: 1,
        express: 1.3,
        urgent: 1.5
      }
    }
  },

  'social-media': {
    serviceId: 'social-media',
    serviceName: 'Контент для социальных сетей',
    basePrice: 2000,
    steps: {
      2: {
        title: 'Платформы и контент',
        fields: {
          platforms: {
            type: 'checkbox',
            label: 'Выберите платформы',
            required: true,
            options: [
              { value: 'instagram', label: 'Instagram' },
              { value: 'facebook', label: 'Facebook' },
              { value: 'vk', label: 'ВКонтакте' },
              { value: 'telegram', label: 'Telegram' },
              { value: 'linkedin', label: 'LinkedIn' },
              { value: 'youtube', label: 'YouTube' },
              { value: 'tiktok', label: 'TikTok' }
            ]
          },
          contentType: {
            type: 'checkbox',
            label: 'Типы контента',
            options: [
              { value: 'posts', label: 'Посты' },
              { value: 'stories', label: 'Сторис' },
              { value: 'reels', label: 'Reels/Shorts' },
              { value: 'captions', label: 'Подписи к фото' },
              { value: 'hashtags', label: 'Хештеги' }
            ]
          },
          postCount: {
            type: 'select',
            label: 'Количество постов',
            options: [
              { value: '10', label: '10 постов', price: 2000 },
              { value: '20', label: '20 постов', price: 3500 },
              { value: '30', label: '30 постов', price: 5000 },
              { value: '50', label: '50+ постов', price: 7500 }
            ]
          }
        }
      },
      3: {
        title: 'Стратегия и цели',
        fields: {
          businessGoals: {
            type: 'checkbox',
            label: 'Цели контента',
            options: [
              { value: 'awareness', label: 'Повышение узнаваемости бренда' },
              { value: 'engagement', label: 'Увеличение вовлеченности' },
              { value: 'sales', label: 'Продажи' },
              { value: 'traffic', label: 'Трафик на сайт' },
              { value: 'community', label: 'Построение сообщества' }
            ]
          },
          contentThemes: {
            type: 'textarea',
            label: 'Темы для контента',
            placeholder: 'Какие темы должны освещаться в постах?'
          },
          brandVoice: {
            type: 'select',
            label: 'Тон коммуникации',
            options: [
              { value: 'professional', label: 'Профессиональный' },
              { value: 'friendly', label: 'Дружелюбный' },
              { value: 'humorous', label: 'С юмором' },
              { value: 'inspiring', label: 'Вдохновляющий' },
              { value: 'educational', label: 'Образовательный' }
            ]
          }
        }
      }
    },
    additionalServices: {
      content_plan: {
        type: 'checkbox',
        label: 'Контент-план на месяц',
        additionalPrice: 1500
      },
      hashtag_research: {
        type: 'checkbox',
        label: 'Исследование хештегов',
        additionalPrice: 800
      },
      competitor_analysis: {
        type: 'checkbox',
        label: 'Анализ конкурентов',
        additionalPrice: 1200
      }
    },
    deliveryOptions: {
      standard: {
        type: 'radio',
        label: 'Стандартные сроки (3-5 дней)',
        priceMultiplier: 1
      },
      express: {
        type: 'radio',
        label: 'Ускоренно (1-2 дня)',
        priceMultiplier: 1.4
      }
    },
    priceCalculation: {
      urgencyMultipliers: {
        standard: 1,
        express: 1.4
      }
    }
  },

  'email-campaigns': {
    serviceId: 'email-campaigns',
    serviceName: 'Email-кампании',
    basePrice: 3500,
    steps: {
      2: {
        title: 'Параметры кампании',
        fields: {
          campaignType: {
            type: 'select',
            label: 'Тип кампании',
            required: true,
            options: [
              { value: 'welcome', label: 'Приветственная серия' },
              { value: 'promotional', label: 'Промо-рассылка' },
              { value: 'nurturing', label: 'Воспитание лидов' },
              { value: 'reactivation', label: 'Реактивация клиентов' },
              { value: 'newsletter', label: 'Новостная рассылка' }
            ]
          },
          emailCount: {
            type: 'select',
            label: 'Количество писем',
            options: [
              { value: '1', label: '1 письмо', price: 3500 },
              { value: '3', label: '3 письма', price: 8000 },
              { value: '5', label: '5 писем', price: 12000 },
              { value: '10', label: '10+ писем', price: 20000 }
            ]
          },
          audienceSize: {
            type: 'select',
            label: 'Размер аудитории',
            options: [
              { value: 'small', label: 'До 1000 подписчиков' },
              { value: 'medium', label: '1000-10000 подписчиков' },
              { value: 'large', label: 'Более 10000 подписчиков' }
            ]
          }
        }
      },
      3: {
        title: 'Цели и контент',
        fields: {
          campaignGoal: {
            type: 'radio',
            label: 'Основная цель кампании',
            options: [
              { value: 'sales', label: 'Продажи' },
              { value: 'engagement', label: 'Вовлеченность' },
              { value: 'education', label: 'Обучение' },
              { value: 'retention', label: 'Удержание клиентов' }
            ]
          },
          productInfo: {
            type: 'textarea',
            label: 'Информация о продукте/услуге',
            placeholder: 'Расскажите о том, что продвигаете'
          },
          audience: {
            type: 'textarea',
            label: 'Описание аудитории',
            placeholder: 'Кто ваши подписчики? Их интересы, потребности'
          }
        }
      }
    },
    additionalServices: {
      subject_testing: {
        type: 'checkbox',
        label: 'A/B тестирование тем писем',
        additionalPrice: 1500
      },
      automation: {
        type: 'checkbox',
        label: 'Настройка автоматизации',
        additionalPrice: 2000
      },
      analytics: {
        type: 'checkbox',
        label: 'Аналитика и отчеты',
        additionalPrice: 1000
      }
    },
    deliveryOptions: {
      standard: {
        type: 'radio',
        label: 'Стандартные сроки (5-7 дней)',
        priceMultiplier: 1
      },
      express: {
        type: 'radio',
        label: 'Ускоренно (2-3 дня)',
        priceMultiplier: 1.3
      }
    },
    priceCalculation: {
      urgencyMultipliers: {
        standard: 1,
        express: 1.3
      }
    }
  },

  // Маркетплейсы
  'wildberries-cards': {
    serviceId: 'wildberries-cards',
    serviceName: 'Карточки товаров для Wildberries',
    basePrice: 1500,
    steps: {
      2: {
        title: 'Параметры товара',
        fields: {
          productCategory: {
            type: 'select',
            label: 'Категория товара',
            required: true,
            options: [
              { value: 'clothing', label: 'Одежда' },
              { value: 'shoes', label: 'Обувь' },
              { value: 'accessories', label: 'Аксессуары' },
              { value: 'electronics', label: 'Электроника' },
              { value: 'beauty', label: 'Красота и здоровье' },
              { value: 'home', label: 'Дом и сад' },
              { value: 'children', label: 'Детские товары' },
              { value: 'sports', label: 'Спорт и отдых' }
            ]
          },
          productCount: {
            type: 'select',
            label: 'Количество карточек',
            required: true,
            options: [
              { value: '1', label: '1 карточка', price: 1500 },
              { value: '5', label: '5 карточек', price: 6000 },
              { value: '10', label: '10 карточек', price: 10000 },
              { value: '20', label: '20 карточек', price: 18000 },
              { value: '50', label: '50 карточек', price: 40000 }
            ]
          },
          productName: {
            type: 'input',
            label: 'Название товара',
            placeholder: 'Основное название вашего товара',
            required: true
          },
          brandName: {
            type: 'input',
            label: 'Название бренда',
            placeholder: 'Ваш бренд или торговая марка'
          }
        }
      },
      3: {
        title: 'Характеристики и описание',
        fields: {
          keyFeatures: {
            type: 'textarea',
            label: 'Ключевые характеристики',
            placeholder: 'Размеры, материалы, цвета, особенности',
            required: true
          },
          targetAudience: {
            type: 'select',
            label: 'Целевая аудитория',
            options: [
              { value: 'women', label: 'Женщины' },
              { value: 'men', label: 'Мужчины' },
              { value: 'children', label: 'Дети' },
              { value: 'unisex', label: 'Унисекс' },
              { value: 'elderly', label: 'Пожилые' }
            ]
          },
          competitorAnalysis: {
            type: 'textarea',
            label: 'Конкуренты',
            placeholder: 'Укажите похожие товары или бренды-конкуренты'
          },
          priceRange: {
            type: 'select',
            label: 'Ценовой сегмент',
            options: [
              { value: 'budget', label: 'Бюджетный (до 1000₽)' },
              { value: 'middle', label: 'Средний (1000-5000₽)' },
              { value: 'premium', label: 'Премиум (5000-15000₽)' },
              { value: 'luxury', label: 'Люкс (от 15000₽)' }
            ]
          }
        }
      }
    },
    additionalServices: {
      seo_optimization: {
        type: 'checkbox',
        label: 'SEO-оптимизация для поиска WB',
        additionalPrice: 800
      },
      competitor_analysis: {
        type: 'checkbox',
        label: 'Анализ конкурентов на WB',
        additionalPrice: 1200
      },
      keyword_research: {
        type: 'checkbox',
        label: 'Подбор ключевых слов',
        additionalPrice: 600
      }
    },
    deliveryOptions: {
      standard: {
        type: 'radio',
        label: 'Стандартные сроки (2-3 дня)',
        priceMultiplier: 1
      },
      express: {
        type: 'radio',
        label: 'Ускоренно (1 день)',
        priceMultiplier: 1.5
      }
    },
    priceCalculation: {
      urgencyMultipliers: {
        standard: 1,
        express: 1.5
      }
    }
  },

  'ozon-cards': {
    serviceId: 'ozon-cards',
    serviceName: 'Карточки товаров для Ozon',
    basePrice: 1600,
    steps: {
      2: {
        title: 'Параметры товара',
        fields: {
          productCategory: {
            type: 'select',
            label: 'Категория товара',
            required: true,
            options: [
              { value: 'electronics', label: 'Электроника' },
              { value: 'appliances', label: 'Бытовая техника' },
              { value: 'clothing', label: 'Одежда и обувь' },
              { value: 'beauty', label: 'Красота и здоровье' },
              { value: 'home', label: 'Дом и сад' },
              { value: 'books', label: 'Книги' },
              { value: 'auto', label: 'Автотовары' },
              { value: 'children', label: 'Детские товары' }
            ]
          },
          productCount: {
            type: 'select',
            label: 'Количество карточек',
            required: true,
            options: [
              { value: '1', label: '1 карточка', price: 1600 },
              { value: '5', label: '5 карточек', price: 6500 },
              { value: '10', label: '10 карточек', price: 11000 },
              { value: '20', label: '20 карточек', price: 20000 },
              { value: '50', label: '50 карточек', price: 45000 }
            ]
          },
          productName: {
            type: 'input',
            label: 'Название товара',
            placeholder: 'Полное название товара',
            required: true
          },
          ozonCategory: {
            type: 'input',
            label: 'Категория на Ozon',
            placeholder: 'Точная категория из каталога Ozon'
          }
        }
      },
      3: {
        title: 'Описание и особенности',
        fields: {
          productFeatures: {
            type: 'textarea',
            label: 'Описание товара',
            placeholder: 'Подробное описание, характеристики, преимущества',
            required: true
          },
          technicalSpecs: {
            type: 'textarea',
            label: 'Технические характеристики',
            placeholder: 'Размеры, вес, материалы, технические параметры'
          },
          usageScenarios: {
            type: 'textarea',
            label: 'Сценарии использования',
            placeholder: 'Где и как используется товар?'
          },
          advantages: {
            type: 'textarea',
            label: 'Преимущества товара',
            placeholder: 'Что выделяет ваш товар среди конкурентов?'
          }
        }
      }
    },
    additionalServices: {
      rich_content: {
        type: 'checkbox',
        label: 'Rich-контент для Ozon',
        additionalPrice: 1500
      },
      a_plus_content: {
        type: 'checkbox',
        label: 'A+ контент',
        additionalPrice: 2000
      },
      infographics: {
        type: 'checkbox',
        label: 'Инфографика',
        additionalPrice: 1200
      }
    },
    deliveryOptions: {
      standard: {
        type: 'radio',
        label: 'Стандартные сроки (2-4 дня)',
        priceMultiplier: 1
      },
      express: {
        type: 'radio',
        label: 'Ускоренно (1-2 дня)',
        priceMultiplier: 1.4
      }
    },
    priceCalculation: {
      urgencyMultipliers: {
        standard: 1,
        express: 1.4
      }
    }
  },

  // Социальные сети (детализированные)
  'instagram-posts': {
    serviceId: 'instagram-posts',
    serviceName: 'Посты для Instagram',
    basePrice: 1200,
    steps: {
      2: {
        title: 'Параметры контента',
        fields: {
          contentType: {
            type: 'checkbox',
            label: 'Типы контента',
            required: true,
            options: [
              { value: 'feed_posts', label: 'Посты в ленту' },
              { value: 'stories', label: 'Истории' },
              { value: 'reels', label: 'Reels' },
              { value: 'igtv', label: 'IGTV описания' },
              { value: 'captions', label: 'Подписи к фото' }
            ]
          },
          postCount: {
            type: 'select',
            label: 'Количество постов',
            required: true,
            options: [
              { value: '10', label: '10 постов', price: 1200 },
              { value: '20', label: '20 постов', price: 2200 },
              { value: '30', label: '30 постов', price: 3000 },
              { value: '50', label: '50 постов', price: 4500 }
            ]
          },
          niche: {
            type: 'select',
            label: 'Ниша/Тематика',
            required: true,
            options: [
              { value: 'beauty', label: 'Красота и уход' },
              { value: 'fashion', label: 'Мода и стиль' },
              { value: 'food', label: 'Еда и рецепты' },
              { value: 'travel', label: 'Путешествия' },
              { value: 'fitness', label: 'Фитнес и спорт' },
              { value: 'business', label: 'Бизнес' },
              { value: 'lifestyle', label: 'Лайфстайл' },
              { value: 'tech', label: 'Технологии' }
            ]
          }
        }
      },
      3: {
        title: 'Стиль и цели',
        fields: {
          brandTone: {
            type: 'radio',
            label: 'Тон коммуникации',
            options: [
              { value: 'friendly', label: 'Дружелюбный' },
              { value: 'professional', label: 'Профессиональный' },
              { value: 'playful', label: 'Игривый' },
              { value: 'inspiring', label: 'Вдохновляющий' },
              { value: 'educational', label: 'Обучающий' }
            ]
          },
          goals: {
            type: 'checkbox',
            label: 'Цели контента',
            options: [
              { value: 'engagement', label: 'Увеличение вовлеченности' },
              { value: 'followers', label: 'Рост подписчиков' },
              { value: 'sales', label: 'Продажи' },
              { value: 'brand_awareness', label: 'Узнаваемость бренда' },
              { value: 'traffic', label: 'Трафик на сайт' }
            ]
          },
          callToActions: {
            type: 'textarea',
            label: 'Призывы к действию',
            placeholder: 'Какие действия должны совершать подписчики?'
          }
        }
      }
    },
    additionalServices: {
      hashtag_research: {
        type: 'checkbox',
        label: 'Исследование хештегов',
        additionalPrice: 500
      },
      stories_highlights: {
        type: 'checkbox',
        label: 'Тексты для актуальных историй',
        additionalPrice: 800
      },
      content_calendar: {
        type: 'checkbox',
        label: 'Контент-календарь на месяц',
        additionalPrice: 1000
      }
    },
    deliveryOptions: {
      standard: {
        type: 'radio',
        label: 'Стандартные сроки (3-5 дней)',
        priceMultiplier: 1
      },
      express: {
        type: 'radio',
        label: 'Ускоренно (1-2 дня)',
        priceMultiplier: 1.5
      }
    },
    priceCalculation: {
      urgencyMultipliers: {
        standard: 1,
        express: 1.5
      }
    }
  },

  'linkedin-content': {
    serviceId: 'linkedin-content',
    serviceName: 'Контент для LinkedIn',
    basePrice: 2000,
    steps: {
      2: {
        title: 'Тип контента',
        fields: {
          contentFormat: {
            type: 'checkbox',
            label: 'Форматы контента',
            required: true,
            options: [
              { value: 'posts', label: 'Обычные посты' },
              { value: 'articles', label: 'Статьи LinkedIn' },
              { value: 'company_updates', label: 'Обновления компании' },
              { value: 'thought_leadership', label: 'Экспертные мнения' },
              { value: 'case_studies', label: 'Кейсы' }
            ]
          },
          contentCount: {
            type: 'select',
            label: 'Количество материалов',
            required: true,
            options: [
              { value: '5', label: '5 постов', price: 2000 },
              { value: '10', label: '10 постов', price: 3500 },
              { value: '15', label: '15 постов', price: 5000 },
              { value: '20', label: '20 постов', price: 6000 }
            ]
          },
          industry: {
            type: 'select',
            label: 'Отрасль',
            required: true,
            options: [
              { value: 'tech', label: 'IT и технологии' },
              { value: 'finance', label: 'Финансы' },
              { value: 'marketing', label: 'Маркетинг' },
              { value: 'consulting', label: 'Консалтинг' },
              { value: 'manufacturing', label: 'Производство' },
              { value: 'healthcare', label: 'Здравоохранение' },
              { value: 'education', label: 'Образование' },
              { value: 'real_estate', label: 'Недвижимость' }
            ]
          }
        }
      },
      3: {
        title: 'Цели и аудитория',
        fields: {
          businessGoals: {
            type: 'checkbox',
            label: 'Бизнес-цели',
            options: [
              { value: 'lead_generation', label: 'Генерация лидов' },
              { value: 'brand_awareness', label: 'Повышение узнаваемости' },
              { value: 'thought_leadership', label: 'Экспертность' },
              { value: 'recruitment', label: 'Привлечение кадров' },
              { value: 'partnerships', label: 'Поиск партнеров' }
            ]
          },
          targetAudience: {
            type: 'textarea',
            label: 'Целевая аудитория',
            placeholder: 'Кто ваша целевая аудитория? Должности, индустрии, интересы',
            required: true
          },
          keyMessages: {
            type: 'textarea',
            label: 'Ключевые сообщения',
            placeholder: 'Что важно донести до аудитории?'
          }
        }
      }
    },
    additionalServices: {
      personal_branding: {
        type: 'checkbox',
        label: 'Стратегия личного бренда',
        additionalPrice: 2500
      },
      engagement_strategy: {
        type: 'checkbox',
        label: 'Стратегия вовлечения',
        additionalPrice: 1500
      },
      competitor_analysis: {
        type: 'checkbox',
        label: 'Анализ конкурентов в LinkedIn',
        additionalPrice: 1800
      }
    },
    deliveryOptions: {
      standard: {
        type: 'radio',
        label: 'Стандартные сроки (5-7 дней)',
        priceMultiplier: 1
      },
      express: {
        type: 'radio',
        label: 'Ускоренно (2-3 дня)',
        priceMultiplier: 1.3
      }
    },
    priceCalculation: {
      urgencyMultipliers: {
        standard: 1,
        express: 1.3
      }
    }
  },

  // Специализированные услуги
  'chatbot-scripts': {
    serviceId: 'chatbot-scripts',
    serviceName: 'Сценарии для чат-ботов',
    basePrice: 3000,
    steps: {
      2: {
        title: 'Параметры чат-бота',
        fields: {
          platform: {
            type: 'select',
            label: 'Платформа',
            required: true,
            options: [
              { value: 'telegram', label: 'Telegram' },
              { value: 'whatsapp', label: 'WhatsApp' },
              { value: 'vk', label: 'ВКонтакте' },
              { value: 'website', label: 'Сайт (веб-чат)' },
              { value: 'facebook', label: 'Facebook Messenger' },
              { value: 'viber', label: 'Viber' }
            ]
          },
          botPurpose: {
            type: 'select',
            label: 'Назначение бота',
            required: true,
            options: [
              { value: 'support', label: 'Техподдержка' },
              { value: 'sales', label: 'Продажи' },
              { value: 'booking', label: 'Бронирование' },
              { value: 'info', label: 'Информационный' },
              { value: 'survey', label: 'Опросы' },
              { value: 'lead_generation', label: 'Сбор заявок' }
            ]
          },
          complexity: {
            type: 'select',
            label: 'Сложность сценария',
            options: [
              { value: 'simple', label: 'Простой (до 10 веток диалога)', price: 3000 },
              { value: 'medium', label: 'Средний (до 25 веток)', price: 5500 },
              { value: 'complex', label: 'Сложный (до 50 веток)', price: 8500 },
              { value: 'enterprise', label: 'Корпоративный (50+ веток)', price: 15000 }
            ]
          }
        }
      },
      3: {
        title: 'Функционал и интеграции',
        fields: {
          features: {
            type: 'checkbox',
            label: 'Необходимый функционал',
            options: [
              { value: 'faq', label: 'База знаний (FAQ)' },
              { value: 'human_handoff', label: 'Передача оператору' },
              { value: 'payments', label: 'Прием платежей' },
              { value: 'calendar', label: 'Запись на прием' },
              { value: 'quiz', label: 'Квизы и опросы' },
              { value: 'notifications', label: 'Push-уведомления' },
              { value: 'crm_integration', label: 'Интеграция с CRM' }
            ]
          },
          businessInfo: {
            type: 'textarea',
            label: 'Информация о бизнесе',
            placeholder: 'Расскажите о вашей компании, продуктах/услугах',
            required: true
          },
          mainScenarios: {
            type: 'textarea',
            label: 'Основные сценарии',
            placeholder: 'Опишите основные задачи, которые должен решать бот'
          },
          toneOfVoice: {
            type: 'radio',
            label: 'Стиль общения',
            options: [
              { value: 'formal', label: 'Официальный' },
              { value: 'friendly', label: 'Дружелюбный' },
              { value: 'professional', label: 'Профессиональный' },
              { value: 'casual', label: 'Неформальный' }
            ]
          }
        }
      }
    },
    additionalServices: {
      voice_menu: {
        type: 'checkbox',
        label: 'Голосовое меню',
        additionalPrice: 2000
      },
      multilingual: {
        type: 'checkbox',
        label: 'Многоязычность',
        additionalPrice: 2500
      },
      analytics_setup: {
        type: 'checkbox',
        label: 'Настройка аналитики',
        additionalPrice: 1500
      }
    },
    deliveryOptions: {
      standard: {
        type: 'radio',
        label: 'Стандартные сроки (5-7 дней)',
        priceMultiplier: 1
      },
      express: {
        type: 'radio',
        label: 'Ускоренно (2-3 дня)',
        priceMultiplier: 1.4
      }
    },
    priceCalculation: {
      urgencyMultipliers: {
        standard: 1,
        express: 1.4
      }
    }
  },

  'telegram-content': {
    serviceId: 'telegram-content',
    serviceName: 'Контент для Telegram-каналов',
    basePrice: 1800,
    steps: {
      2: {
        title: 'Параметры канала',
        fields: {
          channelType: {
            type: 'select',
            label: 'Тип канала',
            required: true,
            options: [
              { value: 'news', label: 'Новостной' },
              { value: 'business', label: 'Бизнес' },
              { value: 'education', label: 'Образовательный' },
              { value: 'entertainment', label: 'Развлекательный' },
              { value: 'crypto', label: 'Криптовалюты' },
              { value: 'tech', label: 'Технологии' },
              { value: 'lifestyle', label: 'Лайфстайл' }
            ]
          },
          postCount: {
            type: 'select',
            label: 'Количество постов',
            required: true,
            options: [
              { value: '15', label: '15 постов', price: 1800 },
              { value: '30', label: '30 постов', price: 3200 },
              { value: '50', label: '50 постов', price: 5000 },
              { value: '100', label: '100 постов', price: 8500 }
            ]
          },
          postFormat: {
            type: 'checkbox',
            label: 'Форматы постов',
            options: [
              { value: 'text', label: 'Текстовые посты' },
              { value: 'photo_caption', label: 'Подписи к фото' },
              { value: 'video_caption', label: 'Подписи к видео' },
              { value: 'polls', label: 'Опросы' },
              { value: 'stories', label: 'Истории/кейсы' }
            ]
          }
        }
      },
      3: {
        title: 'Контент-стратегия',
        fields: {
          contentThemes: {
            type: 'textarea',
            label: 'Основные темы',
            placeholder: 'Какие темы должны освещаться в канале?',
            required: true
          },
          targetAudience: {
            type: 'textarea',
            label: 'Целевая аудитория',
            placeholder: 'Кто ваши подписчики? Возраст, интересы, потребности'
          },
          uniqueValue: {
            type: 'textarea',
            label: 'Уникальная ценность',
            placeholder: 'Чем ваш канал отличается от конкурентов?'
          },
          engagementGoals: {
            type: 'checkbox',
            label: 'Цели по вовлечению',
            options: [
              { value: 'views', label: 'Увеличение просмотров' },
              { value: 'shares', label: 'Больше репостов' },
              { value: 'comments', label: 'Активные комментарии' },
              { value: 'subscribers', label: 'Рост подписчиков' },
              { value: 'traffic', label: 'Переходы на сайт' }
            ]
          }
        }
      }
    },
    additionalServices: {
      content_calendar: {
        type: 'checkbox',
        label: 'Контент-календарь',
        additionalPrice: 1200
      },
      viral_mechanics: {
        type: 'checkbox',
        label: 'Вирусные механики',
        additionalPrice: 1500
      },
      cross_promotion: {
        type: 'checkbox',
        label: 'Кросс-промо стратегия',
        additionalPrice: 1000
      }
    },
    deliveryOptions: {
      standard: {
        type: 'radio',
        label: 'Стандартные сроки (4-6 дней)',
        priceMultiplier: 1
      },
      express: {
        type: 'radio',
        label: 'Ускоренно (2-3 дня)',
        priceMultiplier: 1.3
      }
    },
    priceCalculation: {
      urgencyMultipliers: {
        standard: 1,
        express: 1.3
      }
    }
  },

  // Дополнительные услуги
  'product-descriptions': {
    serviceId: 'product-descriptions',
    serviceName: 'Описания товаров',
    basePrice: 800,
    steps: {
      2: {
        title: 'Параметры товаров',
        fields: {
          productType: {
            type: 'select',
            label: 'Тип товаров',
            required: true,
            options: [
              { value: 'electronics', label: 'Электроника' },
              { value: 'clothing', label: 'Одежда' },
              { value: 'home', label: 'Товары для дома' },
              { value: 'beauty', label: 'Красота и здоровье' },
              { value: 'food', label: 'Продукты питания' },
              { value: 'books', label: 'Книги' },
              { value: 'toys', label: 'Игрушки' },
              { value: 'sports', label: 'Спорт и отдых' }
            ]
          },
          productCount: {
            type: 'select',
            label: 'Количество описаний',
            required: true,
            options: [
              { value: '1', label: '1 товар', price: 800 },
              { value: '5', label: '5 товаров', price: 3500 },
              { value: '10', label: '10 товаров', price: 6000 },
              { value: '25', label: '25 товаров', price: 12000 },
              { value: '50', label: '50 товаров', price: 20000 }
            ]
          },
          descriptionLength: {
            type: 'select',
            label: 'Объем описания',
            options: [
              { value: 'short', label: 'Краткое (до 100 слов)', price: 1 },
              { value: 'medium', label: 'Среднее (100-200 слов)', price: 1.3 },
              { value: 'long', label: 'Подробное (200+ слов)', price: 1.6 }
            ]
          }
        }
      },
      3: {
        title: 'Требования к описаниям',
        fields: {
          platform: {
            type: 'checkbox',
            label: 'Где будут использоваться',
            options: [
              { value: 'website', label: 'Сайт компании' },
              { value: 'marketplace', label: 'Маркетплейсы' },
              { value: 'social', label: 'Социальные сети' },
              { value: 'catalog', label: 'Печатный каталог' },
              { value: 'email', label: 'Email-рассылки' }
            ]
          },
          keyFeatures: {
            type: 'textarea',
            label: 'Ключевые характеристики',
            placeholder: 'Что важно выделить в товарах?',
            required: true
          },
          targetAudience: {
            type: 'input',
            label: 'Целевая аудитория',
            placeholder: 'Для кого предназначены товары?'
          },
          writingStyle: {
            type: 'radio',
            label: 'Стиль написания',
            options: [
              { value: 'selling', label: 'Продающий' },
              { value: 'informative', label: 'Информативный' },
              { value: 'emotional', label: 'Эмоциональный' },
              { value: 'technical', label: 'Технический' }
            ]
          }
        }
      }
    },
    additionalServices: {
      seo_optimization: {
        type: 'checkbox',
        label: 'SEO-оптимизация',
        additionalPrice: 300
      },
      competitor_analysis: {
        type: 'checkbox',
        label: 'Анализ конкурентов',
        additionalPrice: 500
      },
      ab_testing: {
        type: 'checkbox',
        label: 'A/B тестирование',
        additionalPrice: 800
      }
    },
    deliveryOptions: {
      standard: {
        type: 'radio',
        label: 'Стандартные сроки (3-5 дней)',
        priceMultiplier: 1
      },
      express: {
        type: 'radio',
        label: 'Ускоренно (1-2 дня)',
        priceMultiplier: 1.5
      }
    },
    priceCalculation: {
      urgencyMultipliers: {
        standard: 1,
        express: 1.5
      }
    }
  },

  'youtube-scripts': {
    serviceId: 'youtube-scripts',
    serviceName: 'Сценарии для YouTube',
    basePrice: 2500,
    steps: {
      2: {
        title: 'Параметры видео',
        fields: {
          videoType: {
            type: 'select',
            label: 'Тип видео',
            required: true,
            options: [
              { value: 'educational', label: 'Обучающее' },
              { value: 'review', label: 'Обзор' },
              { value: 'vlog', label: 'Влог' },
              { value: 'tutorial', label: 'Туториал' },
              { value: 'presentation', label: 'Презентация' },
              { value: 'interview', label: 'Интервью' },
              { value: 'entertainment', label: 'Развлекательное' }
            ]
          },
          videoDuration: {
            type: 'select',
            label: 'Длительность видео',
            options: [
              { value: 'short', label: 'Короткое (до 5 минут)', price: 2500 },
              { value: 'medium', label: 'Среднее (5-15 минут)', price: 4000 },
              { value: 'long', label: 'Длинное (15-30 минут)', price: 6500 },
              { value: 'extended', label: 'Расширенное (30+ минут)', price: 10000 }
            ]
          },
          videoCount: {
            type: 'select',
            label: 'Количество сценариев',
            options: [
              { value: '1', label: '1 сценарий', price: 1 },
              { value: '3', label: '3 сценария', price: 2.5 },
              { value: '5', label: '5 сценариев', price: 4 },
              { value: '10', label: '10 сценариев', price: 7 }
            ]
          }
        }
      },
      3: {
        title: 'Контент и структура',
        fields: {
          topic: {
            type: 'input',
            label: 'Основная тема',
            placeholder: 'О чем будет видео?',
            required: true
          },
          targetAudience: {
            type: 'textarea',
            label: 'Целевая аудитория',
            placeholder: 'Кто будет смотреть ваши видео?',
            required: true
          },
          keyPoints: {
            type: 'textarea',
            label: 'Ключевые моменты',
            placeholder: 'Что важно донести до зрителей?'
          },
          callToAction: {
            type: 'input',
            label: 'Призыв к действию',
            placeholder: 'Что должны сделать зрители после просмотра?'
          },
          scriptStructure: {
            type: 'checkbox',
            label: 'Элементы сценария',
            options: [
              { value: 'hook', label: 'Цепляющее начало' },
              { value: 'intro', label: 'Представление' },
              { value: 'main_content', label: 'Основной контент' },
              { value: 'examples', label: 'Примеры/кейсы' },
              { value: 'cta', label: 'Призыв к действию' },
              { value: 'outro', label: 'Заключение' }
            ]
          }
        }
      }
    },
    additionalServices: {
      title_optimization: {
        type: 'checkbox',
        label: 'Оптимизация заголовков',
        additionalPrice: 800
      },
      description_seo: {
        type: 'checkbox',
        label: 'SEO-описания для видео',
        additionalPrice: 1200
      },
      thumbnail_text: {
        type: 'checkbox',
        label: 'Тексты для превью',
        additionalPrice: 600
      }
    },
    deliveryOptions: {
      standard: {
        type: 'radio',
        label: 'Стандартные сроки (4-6 дней)',
        priceMultiplier: 1
      },
      express: {
        type: 'radio',
        label: 'Ускоренно (2-3 дня)',
        priceMultiplier: 1.4
      }
    },
    priceCalculation: {
      urgencyMultipliers: {
        standard: 1,
        express: 1.4
      }
    }
  }
};

export const getServiceConfig = (serviceId: string): ServiceFormConfig | null => {
  return serviceFormConfigs[serviceId] || null;
};

export const calculateServicePrice = (serviceId: string, formData: any, additionalServices: string[] = [], deliveryOption: string = 'standard'): number => {
  const config = getServiceConfig(serviceId);
  if (!config) return 0;

  let basePrice = config.basePrice;
  
  // Расчет базовой цены на основе выбранных опций
  Object.entries(formData).forEach(([fieldName, value]) => {
    const fieldConfig = Object.values(config.steps).reduce((acc, step) => {
      return { ...acc, ...step.fields };
    }, {} as { [key: string]: FormFieldConfig });

    const field = fieldConfig[fieldName];
    if (field && field.options) {
      const selectedOption = field.options.find(opt => opt.value === value);
      if (selectedOption && selectedOption.price) {
        if (field.priceMultiplier) {
          basePrice *= selectedOption.price;
        } else {
          basePrice = selectedOption.price;
        }
      }
    }
  });

  // Добавляем стоимость дополнительных услуг
  const additionalServicesPrice = additionalServices.reduce((sum, serviceId) => {
    const service = config.additionalServices?.[serviceId];
    return sum + (service?.additionalPrice || 0);
  }, 0);

  // Применяем множитель за срочность
  const urgencyMultiplier = config.priceCalculation.urgencyMultipliers?.[deliveryOption] || 1;

  return Math.round((basePrice + additionalServicesPrice) * urgencyMultiplier);
};
