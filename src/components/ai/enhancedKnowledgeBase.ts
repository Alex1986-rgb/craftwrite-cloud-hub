
import { SERVICES } from "@/data/services";
import { portfolioProjects } from "@/data/portfolioProjects";
import { prices } from "@/data/prices";
import { SERVICE_QUESTIONS } from "@/data/orderQuestions";

// Базовые знания о компании
export const baseKnowledge = {
  company: {
    name: "CopyPro Cloud",
    description: "Лидирующая платформа профессионального копирайтинга с командой из 30+ сертифицированных экспертов",
    founder: "Кырлан Александр Сергеевич",
    team: "30+ экспертов с опытом 5+ лет",
    projects: "2000+ выполненных проектов",
    guarantee: "100% уникальность по Text.ru",
    support: "24/7 поддержка, ответ в течение 15 минут"
  },
  contacts: {
    phone: "+7 (925) 733-86-48",
    email: "optteem@mail.ru",
    telegram: "@Koopeerayter",
    workHours: "24/7"
  }
};

// Генерация знаний из услуг
export const servicesKnowledge = SERVICES.reduce((acc, service) => {
  const keywords = [
    service.name.toLowerCase(),
    service.category.toLowerCase(),
    ...service.tags.map(tag => tag.toLowerCase()),
    service.slug
  ].join(',');
  
  const description = `${service.name} - ${service.desc}
  
  📝 Описание: ${service.detail}
  💰 Цена: от ${service.price.min}${service.price.currency} до ${service.price.max}${service.price.currency}
  ⏰ Срок: ${service.deliveryTime.min}-${service.deliveryTime.max} ${service.deliveryTime.unit}
  
  Что включено:
  ${service.features.map(f => `• ${f}`).join('\n')}
  
  Правила выполнения:
  ${service.rules.map(r => `✓ ${r}`).join('\n')}`;
  
  acc[keywords] = description;
  return acc;
}, {} as Record<string, string>);

// Генерация знаний из портфолио
export const portfolioKnowledge = portfolioProjects.reduce((acc, project) => {
  const keywords = [
    project.category.toLowerCase(),
    ...project.tags.map(tag => tag.toLowerCase()),
    "кейс",
    "проект",
    "результат"
  ].join(',');
  
  const description = `Кейс: ${project.title}
  
  🎯 Категория: ${project.category}
  📊 Результаты:
  ${project.results.map(r => `• ${r}`).join('\n')}
  
  📈 Метрики:
  ${Object.entries(project.metrics).map(([key, value]) => `• ${key}: ${value}`).join('\n')}
  
  🏷️ Теги: ${project.tags.join(', ')}`;
  
  acc[keywords] = description;
  return acc;
}, {} as Record<string, string>);

// Генерация знаний из цен
export const pricingKnowledge = prices.reduce((acc, price) => {
  const keywords = price.service.toLowerCase() + ",цена,стоимость,прайс";
  acc[keywords] = `${price.service}: ${price.price}`;
  return acc;
}, {} as Record<string, string>);

// Процесс заказа
export const orderProcessKnowledge = {
  "заказ,процесс,как заказать,этапы": `Процесс заказа в CopyPro Cloud:
  
  1️⃣ Выберите услугу на сайте или опишите задачу
  2️⃣ Заполните бриф с деталями проекта
  3️⃣ Получите расчет стоимости и сроков
  4️⃣ Подтвердите заказ и произведите оплату
  5️⃣ Наш эксперт приступает к работе
  6️⃣ Получите готовый текст с отчетом об уникальности
  7️⃣ Бесплатные правки в течение 30 дней
  
  Доступные услуги: ${SERVICES.map(s => s.name).join(', ')}`
};

// Специальные предложения и рекомендации
export const recommendationsKnowledge = {
  "скидка,акция,предложение": "🎉 Специальные предложения CopyPro Cloud:\n• Скидка 15% при заказе от 10 статей\n• Скидка 20% для постоянных клиентов\n• Бесплатная консультация по контент-стратегии\n• Экспресс-доставка от 12 часов",
  
  "начинающий,новичок,старт": "Для начинающих рекомендуем:\n• SEO-статья на 1000 знаков (от 400₽)\n• Описание товара (от 350₽)\n• Консультация по контент-стратегии\n• Пакет 'Старт' - 5 статей со скидкой 10%",
  
  "бизнес,компания,b2b": "Для бизнеса предлагаем:\n• Комплексную контент-стратегию\n• Корпоративный блог\n• Лендинги и продающие страницы\n• Email-маркетинг\n• Персонального менеджера\n• Скидки до 25% при долгосрочном сотрудничестве"
};

// Объединение всех знаний
export const enhancedKnowledgeBase: Record<string, string> = {
  // Базовые знания
  "привет,здравствуйте,добро пожаловать": `Добро пожаловать в ${baseKnowledge.company.name}! Я Александр, ваш AI-помощник. ${baseKnowledge.company.description}. Чем могу помочь?`,
  
  "о компании,кто вы,расскажите о себе": `${baseKnowledge.company.name} — ${baseKnowledge.company.description}. Наш основатель — ${baseKnowledge.company.founder}. Мы выполнили ${baseKnowledge.company.projects} с гарантией ${baseKnowledge.company.guarantee}.`,
  
  "контакты,телефон,связаться": `Связаться с нами: 📞 ${baseKnowledge.contacts.phone}, 📧 ${baseKnowledge.contacts.email}, 💬 Telegram ${baseKnowledge.contacts.telegram}. Работаем ${baseKnowledge.contacts.workHours}!`,
  
  // Услуги из базы данных
  ...servicesKnowledge,
  
  // Портфолио и кейсы
  ...portfolioKnowledge,
  
  // Цены
  ...pricingKnowledge,
  
  // Процесс заказа
  ...orderProcessKnowledge,
  
  // Рекомендации
  ...recommendationsKnowledge,
  
  // Дополнительные знания
  "качество,гарантия,уникальность": `Мы гарантируем ${baseKnowledge.company.guarantee} с официальными отчетами. Бесплатные правки в течение 30 дней. ${baseKnowledge.company.team}.`,
  
  "сроки,быстро,срочно": "Стандартные сроки: от 24 часов. Экспресс-доставка: от 12 часов. Крупные проекты обсуждаются индивидуально.",
  
  "результаты,эффективность": "Результаты наших клиентов: рост трафика на 120-300%, увеличение конверсии на 40-180%, ROI контент-маркетинга 300-800%."
};

// Функция для получения рекомендаций услуг
export const getServiceRecommendations = (userMessage: string): string[] => {
  const message = userMessage.toLowerCase();
  const recommendations: string[] = [];
  
  // Анализ потребностей и рекомендации
  if (message.includes('сайт') || message.includes('интернет-магазин')) {
    recommendations.push('SEO-статьи', 'Лендинг', 'Описания товаров');
  }
  
  if (message.includes('соцсети') || message.includes('instagram') || message.includes('вконтакте')) {
    recommendations.push('Контент для соцсетей', 'SMM-стратегия');
  }
  
  if (message.includes('продажи') || message.includes('клиенты') || message.includes('конверсия')) {
    recommendations.push('Продающие тексты', 'Email-рассылки', 'Лендинг');
  }
  
  return recommendations;
};

// Функция расчета примерной стоимости
export const calculateEstimate = (serviceType: string, details: string): string => {
  const service = SERVICES.find(s => 
    s.name.toLowerCase().includes(serviceType.toLowerCase()) ||
    s.category.toLowerCase().includes(serviceType.toLowerCase())
  );
  
  if (service) {
    return `Примерная стоимость ${service.name}: от ${service.price.min}${service.price.currency} до ${service.price.max}${service.price.currency}. Срок выполнения: ${service.deliveryTime.min}-${service.deliveryTime.max} ${service.deliveryTime.unit}. Для точного расчета нужно обсудить детали проекта.`;
  }
  
  return "Для расчета стоимости мне нужно больше информации о вашем проекте. Опишите подробнее ваши задачи.";
};
