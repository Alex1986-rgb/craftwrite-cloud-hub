
class ConversionPredictionService {
  async predictConversion(text: string, audience: string): Promise<{ score: number; factors: string[] }> {
    // Mock ML prediction - would use actual ML model
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const factors = [];
    let score = 50;
    
    if (text.includes('CTA') || text.includes('действие')) {
      score += 15;
      factors.push('Наличие призыва к действию');
    }
    
    if (text.length > 500 && text.length < 1500) {
      score += 10;
      factors.push('Оптимальная длина текста');
    }
    
    if (text.includes('!') || text.includes('?')) {
      score += 5;
      factors.push('Эмоциональная окраска');
    }
    
    return {
      score: Math.min(score + Math.random() * 20, 95),
      factors
    };
  }
}

export const conversionPredictionService = new ConversionPredictionService();
