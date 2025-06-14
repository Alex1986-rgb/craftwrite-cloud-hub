
import { SERVICES } from "@/data/services";
import { ConversationState, ProjectDetails } from "./ConversationContext";

export interface PriceComponent {
  name: string;
  basePrice: number;
  multiplier?: number;
  description: string;
}

export interface Discount {
  name: string;
  percentage: number;
  condition: string;
  applicable: boolean;
}

export interface PriceCalculation {
  basePrice: number;
  components: PriceComponent[];
  discounts: Discount[];
  finalPrice: number;
  breakdown: string;
  recommendations: string[];
  timeline: string;
}

export class AdvancedPriceCalculator {
  static calculateServicePrice(serviceType: string, details: ProjectDetails, clientType: string): PriceCalculation {
    const service = SERVICES.find(s => 
      s.name.toLowerCase().includes(serviceType.toLowerCase()) ||
      s.category.toLowerCase().includes(serviceType.toLowerCase())
    );

    if (!service) {
      return this.getCustomQuote(details);
    }

    const components: PriceComponent[] = [];
    let basePrice = service.price.min;

    // Базовая цена услуги
    components.push({
      name: service.name,
      basePrice: service.price.min,
      description: `Базовая стоимость ${service.name}`
    });

    // Коэффициенты сложности
    if (details.complexity === 'сложная') {
      const complexityMultiplier = 1.5;
      components.push({
        name: 'Сложность',
        basePrice: service.price.min * 0.5,
        multiplier: complexityMultiplier,
        description: 'Надбавка за высокую сложность'
      });
      basePrice *= complexityMultiplier;
    } else if (details.complexity === 'средняя') {
      const complexityMultiplier = 1.2;
      components.push({
        name: 'Сложность',
        basePrice: service.price.min * 0.2,
        multiplier: complexityMultiplier,
        description: 'Надбавка за среднюю сложность'
      });
      basePrice *= complexityMultiplier;
    }

    // Объем работ
    if (details.volume && details.volume > 1) {
      const volumePrice = (details.volume - 1) * service.price.min;
      components.push({
        name: `Дополнительный объем (${details.volume - 1} ед.)`,
        basePrice: volumePrice,
        description: `Стоимость дополнительных ${details.volume - 1} единиц`
      });
      basePrice += volumePrice;
    }

    // Срочность
    if (details.deadline) {
      const urgencyMultiplier = this.getUrgencyMultiplier(details.deadline);
      if (urgencyMultiplier > 1) {
        const urgencyPrice = basePrice * (urgencyMultiplier - 1);
        components.push({
          name: 'Срочность',
          basePrice: urgencyPrice,
          multiplier: urgencyMultiplier,
          description: 'Доплата за срочное выполнение'
        });
        basePrice *= urgencyMultiplier;
      }
    }

    // Дополнительные требования
    if (details.additionalRequirements?.length) {
      const additionalPrice = details.additionalRequirements.length * 500;
      components.push({
        name: 'Дополнительные требования',
        basePrice: additionalPrice,
        description: `Стоимость ${details.additionalRequirements.length} доп. требований`
      });
      basePrice += additionalPrice;
    }

    // Расчет скидок
    const discounts = this.calculateDiscounts(basePrice, details, clientType);
    const totalDiscount = discounts.reduce((sum, d) => sum + (d.applicable ? (basePrice * d.percentage / 100) : 0), 0);
    const finalPrice = Math.max(basePrice - totalDiscount, service.price.min);

    return {
      basePrice,
      components,
      discounts,
      finalPrice,
      breakdown: this.generateBreakdown(components, discounts, finalPrice),
      recommendations: this.generateRecommendations(service, details, clientType),
      timeline: this.calculateTimeline(service, details)
    };
  }

  private static getUrgencyMultiplier(deadline: string): number {
    const lower = deadline.toLowerCase();
    if (lower.includes('сегодня') || lower.includes('завтра') || lower.includes('12 час')) {
      return 2.0; // 100% надбавка
    }
    if (lower.includes('2 дня') || lower.includes('48 час')) {
      return 1.5; // 50% надбавка
    }
    if (lower.includes('неделя') || lower.includes('7 дней')) {
      return 1.2; // 20% надбавка
    }
    return 1.0;
  }

  private static calculateDiscounts(basePrice: number, details: ProjectDetails, clientType: string): Discount[] {
    const discounts: Discount[] = [
      {
        name: 'Скидка для новых клиентов',
        percentage: 10,
        condition: 'Первый заказ',
        applicable: clientType === 'новичок'
      },
      {
        name: 'Скидка постоянного клиента',
        percentage: 15,
        condition: 'Постоянный клиент',
        applicable: clientType === 'постоянный'
      },
      {
        name: 'Пакетная скидка',
        percentage: 20,
        condition: 'Заказ от 10 единиц',
        applicable: (details.volume || 0) >= 10
      },
      {
        name: 'Корпоративная скидка',
        percentage: 25,
        condition: 'Корпоративный клиент',
        applicable: clientType === 'бизнес' && basePrice > 10000
      }
    ];

    return discounts;
  }

  private static generateBreakdown(components: PriceComponent[], discounts: Discount[], finalPrice: number): string {
    let breakdown = "💰 Подробный расчет стоимости:\n\n";
    
    components.forEach(component => {
      breakdown += `• ${component.name}: ${component.basePrice}₽\n`;
      if (component.description) {
        breakdown += `  ${component.description}\n`;
      }
    });

    const applicableDiscounts = discounts.filter(d => d.applicable);
    if (applicableDiscounts.length > 0) {
      breakdown += "\n🎉 Применяемые скидки:\n";
      applicableDiscounts.forEach(discount => {
        breakdown += `• ${discount.name}: -${discount.percentage}%\n`;
      });
    }

    breakdown += `\n✨ Итоговая стоимость: ${finalPrice}₽`;
    
    return breakdown;
  }

  private static generateRecommendations(service: any, details: ProjectDetails, clientType: string): string[] {
    const recommendations: string[] = [];

    if (clientType === 'новичок') {
      recommendations.push("📚 Рекомендую начать с пакета 'Старт' - 3 статьи со скидкой");
      recommendations.push("🎯 Бесплатная консультация по SEO-стратегии в подарок");
    }

    if (details.volume && details.volume > 5) {
      recommendations.push("📦 При заказе пакета экономия составит до 30%");
      recommendations.push("⚡ Персональный менеджер для крупных проектов");
    }

    if (service.category === 'Контент-маркетинг') {
      recommendations.push("📈 Дополнительно: разработка контент-стратегии (+2000₽)");
      recommendations.push("🔍 SEO-аудит конкурентов в подарок при заказе от 10 статей");
    }

    return recommendations;
  }

  private static calculateTimeline(service: any, details: ProjectDetails): string {
    let baseDays = service.deliveryTime.max;
    
    if (details.volume && details.volume > 1) {
      baseDays += Math.ceil(details.volume / 3); // +1 день на каждые 3 единицы
    }

    if (details.complexity === 'сложная') {
      baseDays *= 1.5;
    }

    return `⏰ Срок выполнения: ${Math.ceil(baseDays)} дней`;
  }

  private static getCustomQuote(details: ProjectDetails): PriceCalculation {
    return {
      basePrice: 5000,
      components: [{
        name: 'Индивидуальный проект',
        basePrice: 5000,
        description: 'Стоимость рассчитывается индивидуально'
      }],
      discounts: [],
      finalPrice: 5000,
      breakdown: "Для точного расчета стоимости индивидуального проекта необходима консультация с экспертом.",
      recommendations: ["📞 Бесплатная консультация с экспертом", "📋 Составление ТЗ в подарок"],
      timeline: "⏰ Срок: обсуждается индивидуально"
    };
  }
}
