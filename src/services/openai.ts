
interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

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
  temperature?: number;
}

interface RefineParams {
  originalText: string;
  instruction: string;
  preserveLength?: boolean;
}

interface QualityAnalysis {
  readabilityScore: number;
  seoScore: number;
  toneConsistency: number;
  keywordDensity: number;
  suggestions: string[];
}

class OpenAIService {
  private apiKey: string | null = null;
  private baseURL = 'https://api.openai.com/v1';

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

  private buildSystemPrompt(params: GenerationParams): string {
    const typeMap: Record<string, string> = {
      'seo-article': 'SEO-оптимизированную статью',
      'landing': 'продающий текст для лендинга',
      'email': 'текст для email-рассылки',
      'social': 'пост для социальных сетей',
      'product': 'описание товара',
      'blog': 'статью для блога',
      'press-release': 'пресс-релиз'
    };

    const toneMap: Record<string, string> = {
      'professional': 'профессиональном',
      'friendly': 'дружелюбном',
      'formal': 'официальном',
      'casual': 'неформальном',
      'persuasive': 'убедительном',
      'informative': 'информативном'
    };

    const audienceMap: Record<string, string> = {
      'b2b': 'бизнес-аудитории (B2B)',
      'b2c': 'потребителей (B2C)',
      'experts': 'экспертов в области',
      'beginners': 'новичков',
      'general': 'широкой аудитории'
    };

    let systemPrompt = `Ты профессиональный копирайтер. Создай ${typeMap[params.textType] || 'текст'} в ${toneMap[params.tone] || 'нейтральном'} тоне для ${audienceMap[params.audience] || 'целевой аудитории'}.

Требования:
- Объем: примерно ${params.length} символов
- Язык: русский`;

    if (params.keywords) {
      systemPrompt += `\n- Ключевые слова для включения: ${params.keywords}`;
    }

    if (params.seoOptimized) {
      systemPrompt += '\n- Оптимизируй для поисковых систем (SEO)';
    }

    if (params.includeCTA) {
      systemPrompt += '\n- Включи призыв к действию (CTA)';
    }

    if (params.includeEmoji) {
      systemPrompt += '\n- Используй эмодзи для повышения вовлеченности';
    }

    systemPrompt += '\n\nСоздай качественный, уникальный текст, который будет эффективно решать поставленную задачу.';

    return systemPrompt;
  }

  async generateText(params: GenerationParams): Promise<string> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('API ключ OpenAI не установлен');
    }

    const messages: OpenAIMessage[] = [
      {
        role: 'system',
        content: this.buildSystemPrompt(params)
      },
      {
        role: 'user',
        content: params.prompt
      }
    ];

    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages,
        max_tokens: Math.ceil(params.length * 1.5),
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.3,
        presence_penalty: 0.1
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data: OpenAIResponse = await response.json();
    const generatedText = data.choices[0]?.message?.content;

    if (!generatedText) {
      throw new Error('Не удалось получить ответ от API');
    }

    return generatedText.trim();
  }

  async generateBatch(params: BatchGenerationParams): Promise<string[]> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('API ключ OpenAI не установлен');
    }

    const promises = Array.from({ length: params.variants }, async (_, index) => {
      const messages: OpenAIMessage[] = [
        {
          role: 'system',
          content: this.buildSystemPrompt(params) + `\n\nВариант ${index + 1}: Создай уникальный подход к теме.`
        },
        {
          role: 'user',
          content: params.prompt
        }
      ];

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages,
          max_tokens: Math.ceil(params.length * 1.5),
          temperature: params.temperature || (0.5 + index * 0.1), // Разная креативность для вариантов
          top_p: 0.9,
          frequency_penalty: 0.3,
          presence_penalty: 0.1
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data: OpenAIResponse = await response.json();
      const generatedText = data.choices[0]?.message?.content;

      if (!generatedText) {
        throw new Error(`Не удалось получить вариант ${index + 1}`);
      }

      return generatedText.trim();
    });

    return await Promise.all(promises);
  }

  async refineText(params: RefineParams): Promise<string> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('API ключ OpenAI не установлен');
    }

    let systemPrompt = `Ты редактор-профессионал. Улучши предоставленный текст согласно инструкции.

Требования:
- Сохрани основную идею и структуру
- Улучши качество и читабельность
- Следуй инструкции по доработке`;

    if (params.preserveLength) {
      systemPrompt += `\n- Сохрани примерно тот же объем текста (${params.originalText.length} символов)`;
    }

    const messages: OpenAIMessage[] = [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: `Исходный текст:\n${params.originalText}\n\nИнструкция по доработке:\n${params.instruction}`
      }
    ];

    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages,
        max_tokens: Math.ceil(params.originalText.length * 1.5),
        temperature: 0.3,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data: OpenAIResponse = await response.json();
    const refinedText = data.choices[0]?.message?.content;

    if (!refinedText) {
      throw new Error('Не удалось получить улучшенный текст');
    }

    return refinedText.trim();
  }

  async analyzeQuality(text: string, keywords?: string): Promise<QualityAnalysis> {
    // Базовый анализ без API (для экономии токенов)
    const words = text.split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgWordsPerSentence = words.length / sentences.length;
    
    // Оценка читабельности (упрощенная формула)
    const readabilityScore = Math.max(0, Math.min(100, 100 - (avgWordsPerSentence - 15) * 2));
    
    // SEO анализ
    let seoScore = 50; // Базовая оценка
    if (keywords) {
      const keywordList = keywords.toLowerCase().split(',').map(k => k.trim());
      const textLower = text.toLowerCase();
      const foundKeywords = keywordList.filter(keyword => textLower.includes(keyword));
      seoScore += (foundKeywords.length / keywordList.length) * 30;
    }
    
    // Анализ структуры
    const hasHeadings = /^#|\n#/m.test(text);
    const hasList = /^[-*•]|\n[-*•]/m.test(text);
    if (hasHeadings) seoScore += 10;
    if (hasList) seoScore += 10;
    
    // Плотность ключевых слов
    let keywordDensity = 0;
    if (keywords) {
      const keywordList = keywords.toLowerCase().split(',').map(k => k.trim());
      const totalKeywordOccurrences = keywordList.reduce((count, keyword) => {
        const regex = new RegExp(keyword, 'gi');
        return count + (text.match(regex) || []).length;
      }, 0);
      keywordDensity = (totalKeywordOccurrences / words.length) * 100;
    }
    
    // Генерация рекомендаций
    const suggestions: string[] = [];
    if (readabilityScore < 60) {
      suggestions.push('Упростите предложения для лучшей читабельности');
    }
    if (seoScore < 70) {
      suggestions.push('Добавьте больше ключевых слов и улучшите структуру');
    }
    if (keywordDensity > 3) {
      suggestions.push('Снизьте плотность ключевых слов (сейчас слишком высокая)');
    }
    if (keywordDensity < 0.5 && keywords) {
      suggestions.push('Увеличьте использование ключевых слов');
    }
    
    return {
      readabilityScore: Math.round(readabilityScore),
      seoScore: Math.round(Math.min(100, seoScore)),
      toneConsistency: 85, // Заглушка, требует более сложного анализа
      keywordDensity: Math.round(keywordDensity * 100) / 100,
      suggestions
    };
  }

  async validateApiKey(key: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/models`, {
        headers: {
          'Authorization': `Bearer ${key}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const openAIService = new OpenAIService();
