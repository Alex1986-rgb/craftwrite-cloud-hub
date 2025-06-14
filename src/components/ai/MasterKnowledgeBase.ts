
import { SERVICES } from "@/data/services";
import { portfolioProjects } from "@/data/portfolioProjects";
import { prices } from "@/data/prices";
import { SEO_TEXTS } from "@/data/content/seoTexts";

// Супер-база знаний с интеграцией всех данных проекта
export class MasterKnowledgeBase {
  // Детальная информация о каждой услуге
  static getServiceInfo(query: string): { service: any; seoText: string; relatedLinks: string[] } | null {
    const lowerQuery = query.toLowerCase();
    
    const service = SERVICES.find(s => 
      s.name.toLowerCase().includes(lowerQuery) ||
      s.desc.toLowerCase().includes(lowerQuery) ||
      s.tags.some(tag => lowerQuery.includes(tag.toLowerCase())) ||
      lowerQuery.includes(s.slug)
    );

    if (service) {
      const seoText = SEO_TEXTS[service.slug] || "";
      const relatedLinks = [
        `/service/${service.slug}`,
        `/order`,
        `/portfolio`
      ];

      return { service, seoText, relatedLinks };
    }

    return null;
  }

  // Поиск релевантного портфолио
  static findRelevantPortfolio(query: string): { projects: any[]; links: string[] } {
    const lowerQuery = query.toLowerCase();
    
    const relevantProjects = portfolioProjects.filter(project =>
      project.title.toLowerCase().includes(lowerQuery) ||
      project.category.toLowerCase().includes(lowerQuery) ||
      project.tags.some(tag => lowerQuery.includes(tag.toLowerCase())) ||
      project.description.toLowerCase().includes(lowerQuery)
    );

    const links = relevantProjects.map(p => `/portfolio/${p.id}`);
    links.push('/portfolio');

    return { projects: relevantProjects, links };
  }

  // Поиск в ценах с детальным объяснением
  static findPriceInfo(query: string): { priceInfo: any; explanation: string; orderLink: string } | null {
    const lowerQuery = query.toLowerCase();
    
    const price = prices.find(p => 
      p.service.toLowerCase().includes(lowerQuery)
    );

    if (price) {
      const service = SERVICES.find(s => s.name === price.service);
      const explanation = service ? 
        `${service.desc}. Включает: ${service.features.slice(0, 3).join(', ')}. Срок: ${service.deliveryTime.min}-${service.deliveryTime.max} ${service.deliveryTime.unit}.` :
        "Качественная услуга с гарантией результата.";

      return {
        priceInfo: price,
        explanation,
        orderLink: `/order`
      };
    }

    return null;
  }

  // Генерация экспертного ответа на основе всех данных
  static generateExpertResponse(query: string): {
    answer: string;
    quickLinks: Array<{ title: string; url: string; description: string }>;
    recommendations: string[];
  } {
    const lowerQuery = query.toLowerCase();
    let answer = "";
    let quickLinks: Array<{ title: string; url: string; description: string }> = [];
    let recommendations: string[] = [];

    // Анализ типа вопроса
    if (lowerQuery.includes('seo') || lowerQuery.includes('сео')) {
      answer = "SEO-копирайтинг - это создание текстов, оптимизированных для поисковых систем. Ключевые принципы:\n\n• Исследование ключевых слов перед написанием\n• Естественное вплетение ключевиков в текст (плотность 2-4%)\n• Структурирование с помощью заголовков H1-H6\n• Написание цепляющих Title и Description\n• Создание полезного контента для пользователей\n\nМы создаем SEO-тексты, которые одновременно нравятся и поисковикам, и людям!";
      
      quickLinks = [
        { title: "SEO-статья", url: "/service/seo-article", description: "Заказать SEO-статью" },
        { title: "Наше портфолио", url: "/portfolio", description: "Примеры SEO-текстов" },
        { title: "Блог о SEO", url: "/blog", description: "Экспертные статьи" }
      ];
      
      recommendations = ["SEO-статья", "Веб-копирайтинг", "Контент-план"];
    }
    
    else if (lowerQuery.includes('лендинг') || lowerQuery.includes('продающ')) {
      answer = "Продающий лендинг - это искусство убеждения через текст! Структура эффективного лендинга:\n\n• 🎯 Цепляющий заголовок с болью или выгодой\n• 🔥 Описание проблемы клиента\n• ✨ Презентация решения (ваш продукт)\n• 💪 Доказательства и социальные гарантии\n• 🚀 Призыв к действию\n• ❓ Работа с возражениями\n\nИспользуем AIDA, PAS и другие проверенные формулы для максимальной конверсии!";
      
      quickLinks = [
        { title: "Продающий лендинг", url: "/service/landing-page", description: "Заказать лендинг" },
        { title: "Кейсы лендингов", url: "/portfolio", description: "Наши результаты" },
        { title: "Рассчитать стоимость", url: "/order", description: "Быстрый расчет" }
      ];
      
      recommendations = ["Продающий лендинг", "Коммерческое предложение", "Email-рассылка"];
    }
    
    else if (lowerQuery.includes('соцсет') || lowerQuery.includes('instagram') || lowerQuery.includes('контент')) {
      answer = "Контент для соцсетей - это особое искусство! Каждая платформа требует своего подхода:\n\n📱 Instagram: визуальность + эмоции + Stories\n💼 LinkedIn: экспертность + деловые кейсы\n🎥 TikTok: развлечение + тренды + динамика\n📢 ВКонтакте: сообщества + обсуждения\n💬 Telegram: информативность + оперативность\n\nСоздаем контент, который собирает лайки, комментарии и продает!";
      
      quickLinks = [
        { title: "Контент для соцсетей", url: "/service/social-media-post", description: "Заказать контент" },
        { title: "Примеры постов", url: "/portfolio", description: "Наши работы" },
        { title: "SMM-услуги", url: "/prices", description: "Все цены" }
      ];
      
      recommendations = ["Пост для соцсетей", "Контент-план", "SMM-стратегия"];
    }
    
    else if (lowerQuery.includes('цена') || lowerQuery.includes('стоимость') || lowerQuery.includes('сколько')) {
      const serviceInfo = this.getServiceInfo(query);
      if (serviceInfo) {
        answer = `Стоимость "${serviceInfo.service.name}": от ${serviceInfo.service.price.min}₽ до ${serviceInfo.service.price.max}₽\n\nЧто влияет на цену:\n• Объем работы\n• Сложность тематики\n• Срочность выполнения\n• Дополнительные требования\n\nСрок выполнения: ${serviceInfo.service.deliveryTime.min}-${serviceInfo.service.deliveryTime.max} ${serviceInfo.service.deliveryTime.unit}\n\nДля точного расчета нужно знать детали вашего проекта!`;
        
        quickLinks = [
          { title: "Рассчитать точно", url: "/order", description: "Персональный расчет" },
          { title: "Все цены", url: "/prices", description: "Прайс-лист" },
          { title: "Примеры работ", url: "/portfolio", description: "Портфолио" }
        ];
      } else {
        answer = "Стоимость зависит от типа услуги и сложности проекта:\n\n💰 Простые тексты: от 500₽\n💰 SEO-статьи: от 3000₽\n💰 Лендинги: от 8000₽\n💰 Комплексные проекты: от 15000₽\n\nДля точного расчета опишите ваш проект!";
        
        quickLinks = [
          { title: "Калькулятор стоимости", url: "/order", description: "Рассчитать цену" },
          { title: "Прайс-лист", url: "/prices", description: "Все цены" },
          { title: "Консультация", url: "/", description: "Бесплатная консультация" }
        ];
      }
      
      recommendations = ["Расчет стоимости", "Консультация", "Техническое задание"];
    }
    
    else {
      // Универсальный экспертный ответ
      answer = "Как ведущий эксперт CopyPro Cloud, помогу с любыми вопросами по копирайтингу! 💪\n\nМоя экспертиза:\n• 🎯 SEO-тексты и продвижение\n• 💰 Продающие тексты и лендинги\n• 📱 Контент для соцсетей\n• 📧 Email-маркетинг\n• 🏢 Корпоративные тексты\n• 📝 Любые виды копирайтинга\n\nЗадавайте конкретные вопросы - отвечу профессионально и с примерами!";
      
      quickLinks = [
        { title: "Все услуги", url: "/", description: "Каталог услуг" },
        { title: "Портфолио", url: "/portfolio", description: "Наши работы" },
        { title: "Заказать", url: "/order", description: "Оформить заказ" }
      ];
      
      recommendations = ["Консультация", "Обзор услуг", "Портфолио"];
    }

    return { answer, quickLinks, recommendations };
  }

  // Проверка на вопросы о компании
  static getCompanyInfo(query: string): string | null {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('о компани') || lowerQuery.includes('кто вы') || lowerQuery.includes('команда')) {
      return "CopyPro Cloud — лидирующая платформа профессионального копирайтинга! 🚀\n\n👨‍💼 Основатель: Кырлан Александр Сергеевич\n👥 Команда: 30+ сертифицированных экспертов\n📈 Опыт: более 5 лет на рынке\n🎯 Проектов: 2000+ выполненных заказов\n⭐ Гарантия: 100% уникальность по Text.ru\n🕐 Поддержка: 24/7, ответ в течение 15 минут\n\nМы не просто пишем тексты — мы создаем инструменты для роста вашего бизнеса!";
    }

    if (lowerQuery.includes('контакт') || lowerQuery.includes('связать') || lowerQuery.includes('телефон')) {
      return "Свяжитесь с нами прямо сейчас! 📞\n\n📱 Телефон: +7 (925) 733-86-48\n📧 Email: optteem@mail.ru\n💬 Telegram: @Koopeerayter\n\n⏰ Работаем 24/7\n🚀 Отвечаем в течение 15 минут\n🎁 Первая консультация бесплатно!";
    }

    return null;
  }
}
