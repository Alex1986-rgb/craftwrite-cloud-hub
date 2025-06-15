
import { openAIService } from './openai';

interface APIConfig {
  openai?: string;
  claude?: string;
  copyscape?: string;
  semrush?: string;
}

interface PersonalizationData {
  userId: string;
  successfulTexts: string[];
  preferredPatterns: string[];
  conversionRates: { [key: string]: number };
  learningHistory: { topic: string; performance: number }[];
}

interface CompetitorAnalysis {
  competitors: string[];
  commonKeywords: string[];
  contentGaps: string[];
  recommendations: string[];
}

interface ABTestResult {
  variantA: string;
  variantB: string;
  performance: { a: number; b: number };
  winner: 'A' | 'B' | 'tie';
  confidence: number;
}

class EnhancedOpenAIService {
  private apiKeys: APIConfig = {};
  private personalizationData: Map<string, PersonalizationData> = new Map();

  setAPIKeys(config: APIConfig) {
    this.apiKeys = { ...this.apiKeys, ...config };
    if (config.openai) {
      openAIService.setApiKey(config.openai);
    }
  }

  async generateWithPersonalization(params: any, userId: string): Promise<string> {
    const userProfile = this.personalizationData.get(userId);
    
    if (userProfile) {
      // Enhance prompt with user's successful patterns
      const enhancedParams = {
        ...params,
        prompt: this.enhancePromptWithPersonalization(params.prompt, userProfile)
      };
      
      return await openAIService.generateText(enhancedParams);
    }
    
    return await openAIService.generateText(params);
  }

  private enhancePromptWithPersonalization(prompt: string, profile: PersonalizationData): string {
    let enhancedPrompt = prompt;
    
    if (profile.preferredPatterns.length > 0) {
      enhancedPrompt += `\n\nПреференции пользователя: ${profile.preferredPatterns.join(', ')}`;
    }
    
    if (profile.successfulTexts.length > 0) {
      const bestPattern = this.extractSuccessfulPattern(profile.successfulTexts);
      enhancedPrompt += `\n\nИспользуй стиль похожий на: ${bestPattern}`;
    }
    
    return enhancedPrompt;
  }

  private extractSuccessfulPattern(texts: string[]): string {
    // Simplified pattern extraction - in real implementation would use ML
    const commonWords = this.findCommonWords(texts);
    return `Структура с акцентом на: ${commonWords.slice(0, 3).join(', ')}`;
  }

  private findCommonWords(texts: string[]): string[] {
    const wordCount = new Map<string, number>();
    
    texts.forEach(text => {
      const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 3);
      words.forEach(word => {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
      });
    });
    
    return Array.from(wordCount.entries())
      .sort(([,a], [,b]) => b - a)
      .map(([word]) => word);
  }

  async checkUniqueness(text: string): Promise<{ score: number; sources: string[] }> {
    // Mock implementation - would integrate with Copyscape or similar
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      score: Math.random() * 30 + 70, // 70-100% uniqueness
      sources: Math.random() > 0.8 ? ['example-site.com'] : []
    };
  }

  async analyzeCompetitors(keywords: string[], industry: string): Promise<CompetitorAnalysis> {
    // Mock implementation - would integrate with SEMrush, Ahrefs
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      competitors: ['competitor1.com', 'competitor2.com', 'competitor3.com'],
      commonKeywords: keywords.slice(0, 3).map(k => k + ' related'),
      contentGaps: ['long-tail keywords', 'seasonal content', 'local SEO'],
      recommendations: [
        'Добавьте больше длинных хвостов',
        'Создайте сезонный контент',
        'Оптимизируйте под локальный поиск'
      ]
    };
  }

  async performABTest(textA: string, textB: string): Promise<ABTestResult> {
    // Mock A/B test simulation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const performanceA = Math.random() * 100;
    const performanceB = Math.random() * 100;
    const difference = Math.abs(performanceA - performanceB);
    
    return {
      variantA: textA,
      variantB: textB,
      performance: { a: performanceA, b: performanceB },
      winner: performanceA > performanceB ? 'A' : performanceB > performanceA ? 'B' : 'tie',
      confidence: Math.min(difference * 2, 95)
    };
  }

  updatePersonalizationData(userId: string, text: string, performance: number) {
    const existing = this.personalizationData.get(userId) || {
      userId,
      successfulTexts: [],
      preferredPatterns: [],
      conversionRates: {},
      learningHistory: []
    };

    if (performance > 0.7) { // Good performance threshold
      existing.successfulTexts.push(text);
      existing.learningHistory.push({ topic: 'generated_text', performance });
    }

    this.personalizationData.set(userId, existing);
  }

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

export const enhancedOpenAIService = new EnhancedOpenAIService();
