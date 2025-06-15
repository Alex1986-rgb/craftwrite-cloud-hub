
import { openAIService } from './openai';

export interface PersonalizationData {
  userId: string;
  successfulTexts: string[];
  preferredPatterns: string[];
  conversionRates: { [key: string]: number };
  learningHistory: { topic: string; performance: number }[];
}

class PersonalizationService {
  private personalizationData: Map<string, PersonalizationData> = new Map();

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

  getUserProfile(userId: string): PersonalizationData | undefined {
    return this.personalizationData.get(userId);
  }
}

export const personalizationService = new PersonalizationService();
