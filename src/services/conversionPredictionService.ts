
interface ConversionFactors {
  trustSignals: number;
  urgency: number;
  valueProposition: number;
  socialProof: number;
  clarity: number;
  emotionalAppeal: number;
}

class ConversionPredictionService {
  async predictConversion(text: string, audience: string): Promise<{ score: number; factors: string[] }> {
    console.log(`Predicting conversion for ${audience} audience`);
    
    const factors = this.analyzeConversionFactors(text);
    const audienceMultiplier = this.getAudienceMultiplier(audience);
    
    // Рассчитываем общий скор конверсии
    const baseScore = (
      factors.trustSignals * 0.2 +
      factors.urgency * 0.15 +
      factors.valueProposition * 0.25 +
      factors.socialProof * 0.15 +
      factors.clarity * 0.15 +
      factors.emotionalAppeal * 0.1
    );
    
    const finalScore = Math.min(100, baseScore * audienceMultiplier);
    
    const factorDescriptions = this.generateFactorDescriptions(factors);
    
    return {
      score: Math.round(finalScore),
      factors: factorDescriptions
    };
  }

  private analyzeConversionFactors(text: string): ConversionFactors {
    const lowerText = text.toLowerCase();
    
    // Анализ доверительных сигналов
    const trustWords = ['гарантия', 'сертификат', 'опыт', 'профессионал', 'эксперт'];
    const trustSignals = this.calculatePresence(lowerText, trustWords) * 100;
    
    // Анализ срочности
    const urgencyWords = ['сегодня', 'сейчас', 'ограниченное время', 'срочно', 'только'];
    const urgency = this.calculatePresence(lowerText, urgencyWords) * 100;
    
    // Анализ ценностного предложения
    const valueWords = ['выгода', 'экономия', 'бесплатно', 'скидка', 'преимущество'];
    const valueProposition = this.calculatePresence(lowerText, valueWords) * 100;
    
    // Анализ социальных доказательств
    const socialWords = ['клиент', 'отзыв', 'рекомендуют', 'выбирают', 'довольны'];
    const socialProof = this.calculatePresence(lowerText, socialWords) * 100;
    
    // Анализ ясности
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    const avgSentenceLength = text.split(' ').length / sentences.length;
    const clarity = Math.max(0, 100 - (avgSentenceLength - 10) * 5);
    
    // Анализ эмоциональной привлекательности
    const emotionalWords = ['удивительный', 'невероятный', 'восхитительный', 'потрясающий'];
    const emotionalAppeal = this.calculatePresence(lowerText, emotionalWords) * 100;
    
    return {
      trustSignals: Math.min(100, trustSignals),
      urgency: Math.min(100, urgency),
      valueProposition: Math.min(100, valueProposition),
      socialProof: Math.min(100, socialProof),
      clarity: Math.min(100, clarity),
      emotionalAppeal: Math.min(100, emotionalAppeal)
    };
  }

  private calculatePresence(text: string, words: string[]): number {
    let count = 0;
    words.forEach(word => {
      if (text.includes(word)) count++;
    });
    return Math.min(1, count / words.length);
  }

  private getAudienceMultiplier(audience: string): number {
    const multipliers: Record<string, number> = {
      'b2b': 0.9,      // B2B аудитория более консервативна
      'b2c': 1.1,      // B2C аудитория более импульсивна
      'experts': 0.8,   // Эксперты требуют больше фактов
      'beginners': 1.2, // Новички более доверчивы
      'general': 1.0    // Обычная аудитория
    };
    
    return multipliers[audience] || 1.0;
  }

  private generateFactorDescriptions(factors: ConversionFactors): string[] {
    const descriptions: string[] = [];
    
    if (factors.trustSignals > 70) {
      descriptions.push('Высокий уровень доверия (гарантии, сертификаты)');
    } else if (factors.trustSignals < 30) {
      descriptions.push('Низкий уровень доверия - добавьте гарантии');
    }
    
    if (factors.urgency > 60) {
      descriptions.push('Хорошее создание срочности');
    } else if (factors.urgency < 20) {
      descriptions.push('Слабая мотивация к действию - добавьте срочность');
    }
    
    if (factors.valueProposition > 70) {
      descriptions.push('Четкое ценностное предложение');
    } else if (factors.valueProposition < 30) {
      descriptions.push('Неясные выгоды - подчеркните преимущества');
    }
    
    if (factors.socialProof < 30) {
      descriptions.push('Отсутствуют социальные доказательства');
    }
    
    if (factors.clarity < 50) {
      descriptions.push('Сложный для восприятия текст');
    }
    
    return descriptions;
  }

  async getConversionBenchmarks(industry: string): Promise<{
    averageScore: number;
    topPerformers: number;
    recommendations: string[];
  }> {
    // Заглушка для бенчмарков по отраслям
    const benchmarks: Record<string, { average: number; top: number }> = {
      'ecommerce': { average: 65, top: 85 },
      'saas': { average: 58, top: 78 },
      'consulting': { average: 72, top: 88 },
      'education': { average: 63, top: 81 }
    };
    
    const benchmark = benchmarks[industry] || { average: 60, top: 80 };
    
    return {
      averageScore: benchmark.average,
      topPerformers: benchmark.top,
      recommendations: [
        'Добавьте конкретные цифры и статистику',
        'Используйте отзывы клиентов',
        'Создайте ощущение срочности',
        'Подчеркните уникальные преимущества'
      ]
    };
  }
}

export const conversionPredictionService = new ConversionPredictionService();
