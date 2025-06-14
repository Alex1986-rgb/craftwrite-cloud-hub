
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
        max_tokens: Math.ceil(params.length * 1.5), // Запрашиваем больше токенов для гарантии
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
