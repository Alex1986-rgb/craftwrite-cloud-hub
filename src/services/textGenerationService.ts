
import { openAIService } from './openai';
import { textRuService } from './textRuService';
import { seoOptimizer } from './seoOptimizer';

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

interface BatchGenerationParams extends GenerationParams {
  variants: number;
  temperature: number;
}

interface RefineParams {
  originalText: string;
  instruction: string;
  preserveLength: boolean;
}

interface QualityAnalysis {
  readabilityScore: number;
  seoScore: number;
  toneConsistency: number;
  keywordDensity: number;
  suggestions: string[];
}

class TextGenerationService {
  async generateText(params: GenerationParams): Promise<string> {
    console.log('Генерация текста с параметрами:', params);
    
    let generatedText = await openAIService.generateText(params);
    
    // Если включена SEO-оптимизация
    if (params.seoOptimized && params.keywords) {
      generatedText = await seoOptimizer.optimizeContent(generatedText, {
        keywords: params.keywords,
        keywordDensity: 2,
        addHeadings: true,
        addInternalLinks: false
      });
    }
    
    return generatedText;
  }

  async generateBatch(params: BatchGenerationParams): Promise<string[]> {
    console.log('Пакетная генерация текстов:', params.variants);
    return await openAIService.generateBatch(params);
  }

  async refineText(params: RefineParams): Promise<string> {
    console.log('Улучшение текста');
    return await openAIService.refineText(params);
  }

  async analyzeQuality(text: string, keywords?: string): Promise<QualityAnalysis> {
    console.log('Анализ качества текста');
    return await openAIService.analyzeQuality(text, keywords);
  }

  async checkUniqueness(text: string) {
    console.log('Проверка уникальности текста');
    return await textRuService.checkUniqueness(text);
  }

  setApiKey(key: string): void {
    openAIService.setApiKey(key);
  }

  getApiKey(): string | null {
    return openAIService.getApiKey();
  }

  async validateApiKey(key: string): Promise<boolean> {
    return await openAIService.validateApiKey(key);
  }
}

export const textGenerationService = new TextGenerationService();
