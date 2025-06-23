
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
