
interface GenerationParams {
  prompt: string;
  textType: string;
  length: number;
  tone: string;
  audience: string;
  keywords: string;
  includeEmoji: boolean;
  includeCTA: boolean;
  seoOptimized: boolean;
}

interface QualityAnalysis {
  readabilityScore: number;
  seoScore: number;
  toneConsistency: number;
  keywordDensity: number;
  suggestions: string[];
}

class TextGenerationService {
  private apiKey: string | null = null;

  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem('openai_api_key', key);
  }

  getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem('openai_api_key');
    }
    return this.apiKey;
  }

  async validateApiKey(key: string): Promise<boolean> {
    try {
      // Mock validation - replace with actual OpenAI API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return key.startsWith('sk-') && key.length > 20;
    } catch (error) {
      return false;
    }
  }

  async generateText(params: GenerationParams): Promise<string> {
    if (!this.getApiKey()) {
      throw new Error('API ключ не установлен');
    }

    // Mock generation - replace with actual OpenAI API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return `Сгенерированный текст для типа "${params.textType}" с тоном "${params.tone}".\n\nЭто пример сгенерированного контента, который будет заменен реальным вызовом OpenAI API. Длина текста: ${params.length} символов. Аудитория: ${params.audience}.\n\n${params.keywords ? `Ключевые слова: ${params.keywords}` : ''}`;
  }

  async generateBatch(params: GenerationParams & { variants: number; temperature: number }): Promise<string[]> {
    if (!this.getApiKey()) {
      throw new Error('API ключ не установлен');
    }

    const results = [];
    for (let i = 0; i < params.variants; i++) {
      const result = await this.generateText(params);
      results.push(`${result} (Вариант ${i + 1})`);
    }
    
    return results;
  }

  async refineText(params: { originalText: string; instruction: string; preserveLength: boolean }): Promise<string> {
    if (!this.getApiKey()) {
      throw new Error('API ключ не установлен');
    }

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return `Улучшенный текст на основе инструкции: "${params.instruction}"\n\n${params.originalText}\n\n[Текст был улучшен согласно указаниям]`;
  }

  async analyzeQuality(text: string, keywords?: string): Promise<QualityAnalysis> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      readabilityScore: Math.floor(Math.random() * 40) + 60,
      seoScore: Math.floor(Math.random() * 30) + 70,
      toneConsistency: Math.floor(Math.random() * 20) + 80,
      keywordDensity: Math.floor(Math.random() * 15) + 5,
      suggestions: [
        "Увеличьте количество подзаголовков",
        "Добавьте больше ключевых слов",
        "Сократите длину предложений"
      ]
    };
  }
}

export const textGenerationService = new TextGenerationService();
