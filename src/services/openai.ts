
import { 
  OpenAIMessage, 
  OpenAIResponse, 
  GenerationParams, 
  BatchGenerationParams, 
  RefineParams, 
  QualityAnalysis 
} from './openai/types';
import { PromptBuilder } from './openai/promptBuilder';
import { QualityAnalyzer } from './openai/qualityAnalyzer';

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

  async generateText(params: GenerationParams): Promise<string> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('API ключ OpenAI не установлен');
    }

    const messages: OpenAIMessage[] = [
      {
        role: 'system',
        content: PromptBuilder.buildSystemPrompt(params)
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
        model: 'gpt-4.1-2025-04-14',
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
          content: PromptBuilder.buildSystemPrompt(params) + `\n\nВариант ${index + 1}: Создай уникальный подход к теме.`
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
          model: 'gpt-4.1-2025-04-14',
          messages,
          max_tokens: Math.ceil(params.length * 1.5),
          temperature: params.temperature || (0.5 + index * 0.1),
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
        model: 'gpt-4.1-2025-04-14',
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
    return QualityAnalyzer.analyzeQuality(text, keywords);
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
