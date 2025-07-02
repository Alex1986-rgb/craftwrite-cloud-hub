interface LSIKeyword {
  keyword: string;
  relevance: number;
  category: string;
}

interface MetaTags {
  title: string;
  description: string;
  length: {
    title: number;
    description: number;
  };
}

interface ContentAnalysis {
  lsiKeywords: LSIKeyword[];
  metaTags: MetaTags;
  suggestions: string[];
}

export class AIContentEnhancer {
  private static async callAI(action: string, data: any): Promise<any> {
    try {
      const response = await fetch('https://yotunjzgomkuuwpyftqr.supabase.co/functions/v1/ai-content-enhancer', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdHVuanpnb21rdXV3cHlmdHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0Mjk4NTMsImV4cCI6MjA2NjAwNTg1M30.bFCR2HIpdG_4L_ZCuojseZfqbMHaLAco3SFdPqDKkqU`
        },
        body: JSON.stringify({ action, data })
      });
      
      if (!response.ok) throw new Error('AI service unavailable');
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'AI service error');
      }
      
      return result.result;
    } catch (error) {
      console.error('AI Enhancement Error:', error);
      throw error;
    }
  }

  static async generateLSIKeywords(
    mainKeywords: string[],
    topic: string,
    maxKeywords: number = 15
  ): Promise<LSIKeyword[]> {
    const prompt = `
      Анализируй тему "${topic}" и основные ключевые слова: ${mainKeywords.join(', ')}.
      
      Сгенерируй ${maxKeywords} LSI-ключевых слов (семантически связанных) в формате JSON:
      [
        {"keyword": "ключевое слово", "relevance": 0.9, "category": "основные"},
        {"keyword": "синоним", "relevance": 0.8, "category": "синонимы"},
        {"keyword": "смежная тема", "relevance": 0.7, "category": "смежные"}
      ]
      
      Категории: основные, синонимы, смежные, технические, коммерческие
      Relevance: от 0.5 до 1.0
    `;

    try {
      const result = await this.callAI('generate-lsi-keywords', {
        mainKeywords,
        topic,
        maxKeywords
      });
      return Array.isArray(result) ? result : [];
    } catch (error) {
      console.error('LSI Keywords generation failed:', error);
      return this.getFallbackLSI(mainKeywords, topic);
    }
  }

  static async generateMetaTags(
    topic: string,
    keywords: string[],
    characterCount: number,
    targetAudience?: string
  ): Promise<MetaTags> {
    const prompt = `
      Создай SEO-оптимизированные мета-теги для статьи:
      
      Тема: "${topic}"
      Ключевые слова: ${keywords.join(', ')}
      Объем статьи: ${characterCount} символов
      ${targetAudience ? `Целевая аудитория: ${targetAudience}` : ''}
      
      Требования:
      - Title: максимум 60 символов, включи главное ключевое слово
      - Description: максимум 160 символов, призыв к действию
      
      Ответ в JSON:
      {
        "title": "SEO-заголовок",
        "description": "SEO-описание с призывом к действию"
      }
    `;

    try {
      const result = await this.callAI('generate-meta-tags', {
        topic,
        keywords,
        characterCount,
        targetAudience
      });
      
      return result;
    } catch (error) {
      console.error('Meta tags generation failed:', error);
      return this.getFallbackMetaTags(topic, keywords);
    }
  }

  static async analyzeContent(
    topic: string,
    keywords: string[],
    characterCount: number,
    targetAudience?: string
  ): Promise<ContentAnalysis> {
    try {
      const result = await this.callAI('analyze-content', {
        topic,
        keywords,
        characterCount,
        targetAudience
      });
      
      return result;
    } catch (error) {
      console.error('Content analysis failed:', error);
      
      // Fallback to individual calls
      const [lsiKeywords, metaTags] = await Promise.all([
        this.generateLSIKeywords(keywords, topic),
        this.generateMetaTags(topic, keywords, characterCount, targetAudience)
      ]);

      const suggestions = this.generateContentSuggestions(topic, characterCount, keywords);

      return {
        lsiKeywords,
        metaTags,
        suggestions
      };
    }
  }

  // Fallback методы для случаев, когда AI недоступен
  private static getFallbackLSI(mainKeywords: string[], topic: string): LSIKeyword[] {
    const fallbackKeywords = [
      ...mainKeywords.map(k => ({ keyword: `${k} цена`, relevance: 0.8, category: 'коммерческие' })),
      ...mainKeywords.map(k => ({ keyword: `как ${k}`, relevance: 0.7, category: 'смежные' })),
      { keyword: `${topic} отзывы`, relevance: 0.6, category: 'коммерческие' },
      { keyword: `${topic} советы`, relevance: 0.7, category: 'смежные' }
    ];
    
    return fallbackKeywords.slice(0, 10);
  }

  private static generateFallbackTitle(topic: string, mainKeyword: string): string {
    return `${topic}: ${mainKeyword} - полное руководство 2024`;
  }

  private static generateFallbackDescription(topic: string, keywords: string[]): string {
    return `Узнайте всё о ${topic}. ${keywords.slice(0, 2).join(', ')} и многое другое. Экспертные советы и практические рекомендации.`;
  }

  private static getFallbackMetaTags(topic: string, keywords: string[]): MetaTags {
    const title = this.generateFallbackTitle(topic, keywords[0] || topic);
    const description = this.generateFallbackDescription(topic, keywords);
    
    return {
      title,
      description,
      length: {
        title: title.length,
        description: description.length
      }
    };
  }

  private static generateContentSuggestions(
    topic: string,
    characterCount: number,
    keywords: string[]
  ): string[] {
    const suggestions = [
      `Рекомендуем включить статистику по теме "${topic}"`,
      `Добавьте примеры использования для: ${keywords.slice(0, 2).join(', ')}`,
      `При объеме ${characterCount} символов оптимально 3-5 подзаголовков`,
      'Не забудьте про призыв к действию в конце статьи',
      'Рекомендуем добавить FAQ раздел для лучшего SEO'
    ];

    return suggestions.filter((_, index) => index < 3); // Возвращаем первые 3 совета
  }
}