
// Интеллигентная система навигации с контекстными ссылками
export interface QuickLink {
  title: string;
  url: string;
  description: string;
  icon?: string;
}

export class IntelligentNavigator {
  // Генерация быстрых ссылок на основе контекста беседы
  static generateQuickLinks(userMessage: string, conversationContext: string[]): QuickLink[] {
    const lowerMessage = userMessage.toLowerCase();
    const contextWords = conversationContext.join(' ').toLowerCase();
    
    const links: QuickLink[] = [];

    // Анализ намерений пользователя
    if (lowerMessage.includes('заказ') || lowerMessage.includes('купить') || lowerMessage.includes('оформить')) {
      links.push({
        title: "🛒 Оформить заказ",
        url: "/order",
        description: "Быстрое оформление заказа",
        icon: "🛒"
      });
    }

    if (lowerMessage.includes('цена') || lowerMessage.includes('стоимость') || lowerMessage.includes('рассчита')) {
      links.push({
        title: "💰 Калькулятор цен",
        url: "/prices",
        description: "Рассчитать стоимость",
        icon: "💰"
      });
    }

    if (lowerMessage.includes('портфолио') || lowerMessage.includes('работы') || lowerMessage.includes('примеры')) {
      links.push({
        title: "🎨 Портфолио",
        url: "/portfolio",
        description: "Наши лучшие работы",
        icon: "🎨"
      });
    }

    if (lowerMessage.includes('seo') || lowerMessage.includes('сео') || lowerMessage.includes('статья')) {
      links.push({
        title: "📝 SEO-статьи",
        url: "/service/seo-article",
        description: "Подробнее об SEO-статьях",
        icon: "📝"
      });
    }

    if (lowerMessage.includes('лендинг') || lowerMessage.includes('продающ')) {
      links.push({
        title: "🚀 Лендинги",
        url: "/service/landing-page",
        description: "Создание продающих лендингов",
        icon: "🚀"
      });
    }

    if (lowerMessage.includes('соцсет') || lowerMessage.includes('instagram') || lowerMessage.includes('контент')) {
      links.push({
        title: "📱 Контент для соцсетей",
        url: "/service/social-media-post",
        description: "Контент для всех площадок",
        icon: "📱"
      });
    }

    if (lowerMessage.includes('email') || lowerMessage.includes('рассылк') || lowerMessage.includes('письм')) {
      links.push({
        title: "📧 Email-маркетинг",
        url: "/service/email-campaign",
        description: "Эффективные рассылки",
        icon: "📧"
      });
    }

    if (lowerMessage.includes('блог') || lowerMessage.includes('стать') || lowerMessage.includes('материал')) {
      links.push({
        title: "📚 Блог",
        url: "/blog",
        description: "Полезные статьи о копирайтинге",
        icon: "📚"
      });
    }

    // Если нет специфических ссылок, добавляем базовые
    if (links.length === 0) {
      links.push(
        {
          title: "🏠 Главная",
          url: "/",
          description: "Все наши услуги",
          icon: "🏠"
        },
        {
          title: "📋 Заказать",
          url: "/order",
          description: "Оформить заказ",
          icon: "📋"
        },
        {
          title: "💬 О компании",
          url: "/about",
          description: "Узнать больше о нас",
          icon: "💬"
        }
      );
    }

    return links;
  }

  // Генерация ссылок для завершения разговора
  static generateClosingLinks(conversationTopic: string): QuickLink[] {
    const links: QuickLink[] = [
      {
        title: "📞 Связаться напрямую",
        url: "tel:+79257338648",
        description: "+7 (925) 733-86-48",
        icon: "📞"
      },
      {
        title: "💬 Telegram",
        url: "https://t.me/Koopeerayter",
        description: "Быстрая связь в Telegram",
        icon: "💬"
      },
      {
        title: "📧 Email",
        url: "mailto:optteem@mail.ru",
        description: "optteem@mail.ru",
        icon: "📧"
      }
    ];

    return links;
  }

  // Определение наиболее релевантной страницы для перехода
  static getSuggestedPage(userMessage: string): { url: string; reason: string } | null {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('хочу заказать') || lowerMessage.includes('готов заказать')) {
      return {
        url: "/order",
        reason: "Для оформления заказа"
      };
    }

    if (lowerMessage.includes('увидеть работы') || lowerMessage.includes('показать примеры')) {
      return {
        url: "/portfolio",
        reason: "Посмотреть наше портфолио"
      };
    }

    if (lowerMessage.includes('узнать больше о') && lowerMessage.includes('seo')) {
      return {
        url: "/service/seo-article",
        reason: "Подробная информация об SEO-статьях"
      };
    }

    if (lowerMessage.includes('рассчитать точно') || lowerMessage.includes('персональный расчет')) {
      return {
        url: "/order",
        reason: "Для точного расчета стоимости"
      };
    }

    return null;
  }
}
