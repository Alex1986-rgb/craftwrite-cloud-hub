
export interface ABTestResult {
  testId: string;
  variantA: {
    text: string;
    score: number;
    metrics: {
      readability: number;
      engagement: number;
      conversion: number;
    };
  };
  variantB: {
    text: string;
    score: number;
    metrics: {
      readability: number;
      engagement: number;
      conversion: number;
    };
  };
  winner: 'A' | 'B' | 'tie';
  confidence: number;
  recommendations: string[];
}

class ABTestingService {
  async performABTest(textA: string, textB: string): Promise<ABTestResult> {
    console.log('Performing A/B test between two text variants');
    
    const testId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Анализируем варианты
    const variantA = await this.analyzeVariant(textA);
    const variantB = await this.analyzeVariant(textB);
    
    // Определяем победителя
    const scoreDifference = Math.abs(variantA.score - variantB.score);
    let winner: 'A' | 'B' | 'tie';
    let confidence: number;
    
    if (scoreDifference < 5) {
      winner = 'tie';
      confidence = 50;
    } else if (variantA.score > variantB.score) {
      winner = 'A';
      confidence = Math.min(95, 60 + scoreDifference);
    } else {
      winner = 'B';
      confidence = Math.min(95, 60 + scoreDifference);
    }
    
    const recommendations = this.generateRecommendations(variantA, variantB, winner);
    
    return {
      testId,
      variantA,
      variantB,
      winner,
      confidence,
      recommendations
    };
  }

  private async analyzeVariant(text: string): Promise<ABTestResult['variantA']> {
    // Простой анализ текста
    const words = text.split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    
    const readability = this.calculateReadability(words, sentences);
    const engagement = this.calculateEngagement(text);
    const conversion = this.calculateConversionPotential(text);
    
    const score = (readability + engagement + conversion) / 3;
    
    return {
      text,
      score: Math.round(score),
      metrics: {
        readability: Math.round(readability),
        engagement: Math.round(engagement),
        conversion: Math.round(conversion)
      }
    };
  }

  private calculateReadability(words: string[], sentences: string[]): number {
    const avgWordsPerSentence = words.length / sentences.length;
    let score = 100;
    
    if (avgWordsPerSentence > 20) score -= 20;
    if (avgWordsPerSentence > 15) score -= 10;
    
    return Math.max(40, score);
  }

  private calculateEngagement(text: string): number {
    let score = 50;
    
    // Проверяем наличие вопросов
    if (text.includes('?')) score += 15;
    
    // Проверяем эмоциональные слова
    const emotionalWords = ['удивительный', 'невероятный', 'потрясающий', 'уникальный'];
    emotionalWords.forEach(word => {
      if (text.toLowerCase().includes(word)) score += 5;
    });
    
    // Проверяем призывы к действию
    const ctaWords = ['купить', 'заказать', 'получить', 'скачать'];
    ctaWords.forEach(word => {
      if (text.toLowerCase().includes(word)) score += 10;
    });
    
    return Math.min(100, score);
  }

  private calculateConversionPotential(text: string): number {
    let score = 40;
    
    // Проверяем структуру
    if (text.includes('выгода') || text.includes('преимущество')) score += 20;
    if (text.includes('гарантия') || text.includes('бесплатно')) score += 15;
    if (text.includes('ограниченное время') || text.includes('срочно')) score += 10;
    
    return Math.min(100, score);
  }

  private generateRecommendations(variantA: ABTestResult['variantA'], variantB: ABTestResult['variantB'], winner: 'A' | 'B' | 'tie'): string[] {
    const recommendations: string[] = [];
    
    if (winner === 'tie') {
      recommendations.push('Результаты близки - протестируйте с большей аудиторией');
    }
    
    if (variantA.metrics.readability < 70 && variantB.metrics.readability < 70) {
      recommendations.push('Упростите текст для лучшей читабельности');
    }
    
    if (variantA.metrics.conversion < 60 && variantB.metrics.conversion < 60) {
      recommendations.push('Добавьте более сильные призывы к действию');
    }
    
    if (variantA.metrics.engagement < 60 && variantB.metrics.engagement < 60) {
      recommendations.push('Сделайте текст более эмоциональным и вовлекающим');
    }
    
    return recommendations;
  }

  async getTestHistory(): Promise<ABTestResult[]> {
    // Здесь можно загружать историю тестов из базы данных
    return [];
  }
}

export const abTestingService = new ABTestingService();
