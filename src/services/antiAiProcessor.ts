
interface AntiAISettings {
  level: 'light' | 'medium' | 'aggressive';
  variability: number;
}

interface HumanizationResult {
  humanizedText: string;
  changes: string[];
  confidence: number;
}

class AntiAIProcessor {
  private humanPatterns = {
    connectors: [
      'кстати', 'между прочим', 'к слову', 'надо сказать',
      'стоит отметить', 'важно понимать', 'дело в том'
    ],
    transitions: [
      'с другой стороны', 'тем не менее', 'в то же время',
      'помимо этого', 'более того', 'в дополнение'
    ],
    personalizations: [
      'на мой взгляд', 'я считаю', 'мне кажется',
      'по моему опыту', 'как показывает практика'
    ]
  };

  async humanizeText(text: string, settings: AntiAISettings): Promise<string> {
    console.log(`Humanizing text with ${settings.level} level`);
    
    let humanizedText = text;
    const changes: string[] = [];
    
    // 1. Добавляем человеческие коннекторы
    if (settings.level !== 'light') {
      humanizedText = this.addHumanConnectors(humanizedText);
      changes.push('Добавлены естественные связки');
    }
    
    // 2. Варьируем структуру предложений
    humanizedText = this.varyTenceStructure(humanizedText, settings.variability);
    changes.push('Изменена структура предложений');
    
    // 3. Добавляем персонализацию
    if (settings.level === 'aggressive') {
      humanizedText = this.addPersonalization(humanizedText);
      changes.push('Добавлена персонализация');
    }
    
    // 4. Убираем повторяющиеся фразы
    humanizedText = this.removeRepetitions(humanizedText);
    changes.push('Устранены повторения');
    
    return humanizedText;
  }

  private addHumanConnectors(text: string): string {
    const sentences = text.split('. ');
    const result: string[] = [];
    
    sentences.forEach((sentence, index) => {
      if (index > 0 && Math.random() < 0.3) {
        const connector = this.humanPatterns.connectors[
          Math.floor(Math.random() * this.humanPatterns.connectors.length)
        ];
        sentence = `${connector}, ${sentence.toLowerCase()}`;
      }
      result.push(sentence);
    });
    
    return result.join('. ');
  }

  private varyTenceStructure(text: string, variability: number): string {
    const sentences = text.split('. ');
    
    return sentences.map(sentence => {
      if (Math.random() < variability / 100) {
        return this.restructureSentence(sentence);
      }
      return sentence;
    }).join('. ');
  }

  private restructureSentence(sentence: string): string {
    // Простая реструктуризация - меняем порядок частей предложения
    const parts = sentence.split(', ');
    if (parts.length > 1 && Math.random() < 0.5) {
      return parts.reverse().join(', ');
    }
    return sentence;
  }

  private addPersonalization(text: string): string {
    const sentences = text.split('. ');
    
    if (sentences.length > 2) {
      const randomIndex = Math.floor(Math.random() * sentences.length);
      const personalization = this.humanPatterns.personalizations[
        Math.floor(Math.random() * this.humanPatterns.personalizations.length)
      ];
      
      sentences[randomIndex] = `${personalization}, ${sentences[randomIndex].toLowerCase()}`;
    }
    
    return sentences.join('. ');
  }

  private removeRepetitions(text: string): string {
    const words = text.split(' ');
    const seen = new Set<string>();
    const result: string[] = [];
    
    words.forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, '');
      if (!seen.has(cleanWord) || cleanWord.length < 4) {
        result.push(word);
        seen.add(cleanWord);
      }
    });
    
    return result.join(' ');
  }

  async analyzeAIDetection(text: string): Promise<{ score: number; indicators: string[] }> {
    const indicators: string[] = [];
    let score = 0;
    
    // Проверяем на AI-паттерны
    const aiPhrases = [
      'в заключение', 'подводя итог', 'таким образом',
      'важно отметить', 'стоит подчеркнуть', 'следует отметить'
    ];
    
    aiPhrases.forEach(phrase => {
      if (text.toLowerCase().includes(phrase)) {
        score += 15;
        indicators.push(`Обнаружена AI-фраза: "${phrase}"`);
      }
    });
    
    // Проверяем структуру
    const sentences = text.split('. ');
    const avgLength = sentences.reduce((sum, s) => sum + s.length, 0) / sentences.length;
    
    if (avgLength > 100) {
      score += 20;
      indicators.push('Слишком длинные предложения');
    }
    
    return { score: Math.min(100, score), indicators };
  }
}

export const antiAiProcessor = new AntiAIProcessor();
