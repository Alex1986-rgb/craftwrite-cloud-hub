
interface HumanizationSettings {
  level: 'low' | 'medium' | 'high';
  variability: number;
}

class AntiAiProcessor {
  private humanPatterns = {
    // Паттерны для замены AI-шаблонов на более человечные варианты
    aiPhrases: [
      { ai: 'В заключение', human: ['Подводя итог', 'В итоге', 'Резюмируя'] },
      { ai: 'Важно отметить', human: ['Стоит упомянуть', 'Нельзя не сказать', 'Отмечу'] },
      { ai: 'Следует подчеркнуть', human: ['Хочется выделить', 'Обращу внимание', 'Подчеркну'] },
      { ai: 'Необходимо понимать', human: ['Важно знать', 'Стоит помнить', 'Учтите'] },
      { ai: 'В данном контексте', human: ['В этом случае', 'Здесь', 'В данной ситуации'] },
      { ai: 'Таким образом', human: ['Так', 'Поэтому', 'Следовательно'] },
      { ai: 'В современном мире', human: ['Сегодня', 'В наше время', 'Сейчас'] },
      { ai: 'Безусловно', human: ['Конечно', 'Несомненно', 'Очевидно'] }
    ],
    
    // Естественные переходы между предложениями
    transitions: [
      'Кстати', 'К слову', 'Между прочим', 'Да и', 'К тому же',
      'Более того', 'Плюс к этому', 'А еще', 'Не говоря уже о том, что'
    ],
    
    // Вводные конструкции для создания живости
    introductions: [
      'Честно говоря', 'По опыту знаю', 'Скажу прямо',
      'Из практики', 'Как показывает опыт', 'На самом деле'
    ]
  };

  async humanizeText(text: string, settings: HumanizationSettings): Promise<string> {
    console.log(`🤖➡️👤 Начинаем гуманизацию текста (уровень: ${settings.level})`);
    
    let humanizedText = text;
    
    // 1. Заменяем AI-шаблоны на человечные варианты
    humanizedText = this.replaceAiPhrases(humanizedText, settings.level);
    
    // 2. Добавляем естественные переходы
    humanizedText = this.addNaturalTransitions(humanizedText, settings.variability);
    
    // 3. Разбавляем структуру предложений
    humanizedText = this.varysentenceStructure(humanizedText, settings.level);
    
    // 4. Добавляем человеческие особенности
    humanizedText = this.addHumanTouches(humanizedText, settings.level);
    
    // 5. Создаем небольшие "естественные" ошибки (только для high уровня)
    if (settings.level === 'high') {
      humanizedText = this.addSubtleHumanErrors(humanizedText);
    }
    
    console.log('✅ Гуманизация завершена');
    return humanizedText;
  }

  private replaceAiPhrases(text: string, level: HumanizationSettings['level']): string {
    let result = text;
    
    const replacementCount = level === 'high' ? 0.8 : level === 'medium' ? 0.5 : 0.3;
    
    this.humanPatterns.aiPhrases.forEach(pattern => {
      if (Math.random() < replacementCount) {
        const regex = new RegExp(pattern.ai, 'gi');
        const randomReplacement = pattern.human[Math.floor(Math.random() * pattern.human.length)];
        result = result.replace(regex, randomReplacement);
      }
    });
    
    return result;
  }

  private addNaturalTransitions(text: string, variability: number): string {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    for (let i = 1; i < sentences.length; i++) {
      if (Math.random() < variability * 0.3) {
        const transition = this.humanPatterns.transitions[
          Math.floor(Math.random() * this.humanPatterns.transitions.length)
        ];
        sentences[i] = ` ${transition}, ${sentences[i].trim()}`;
      }
    }
    
    return sentences.join('.') + '.';
  }

  private varysentenceStructure(text: string, level: HumanizationSettings['level']): string {
    let result = text;
    
    // Разбиваем длинные предложения
    result = this.breakLongSentences(result);
    
    // Объединяем короткие предложения
    result = this.combineShortSentences(result);
    
    // Добавляем вариативность в начала предложений
    if (level !== 'low') {
      result = this.varySentenceBeginnings(result);
    }
    
    return result;
  }

  private breakLongSentences(text: string): string {
    return text.replace(/([^.!?]{120,}?),\s+([а-яё])/gi, (match, part1, part2) => {
      return `${part1}. ${part2.toUpperCase()}`;
    });
  }

  private combineShortSentences(text: string): string {
    return text.replace(/([.!?])\s+([А-ЯЁ][а-яё]{1,20}[.!?])/g, (match, punct1, sentence2) => {
      if (Math.random() < 0.3) {
        return `, ${sentence2.charAt(0).toLowerCase()}${sentence2.slice(1)}`;
      }
      return match;
    });
  }

  private varySentenceBeginnings(text: string): string {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    for (let i = 0; i < sentences.length; i++) {
      if (Math.random() < 0.2 && sentences[i].trim().length > 50) {
        const intro = this.humanPatterns.introductions[
          Math.floor(Math.random() * this.humanPatterns.introductions.length)
        ];
        sentences[i] = ` ${intro}, ${sentences[i].trim().charAt(0).toLowerCase()}${sentences[i].trim().slice(1)}`;
      }
    }
    
    return sentences.join('.') + '.';
  }

  private addHumanTouches(text: string, level: HumanizationSettings['level']): string {
    let result = text;
    
    // Добавляем эмоциональные акценты
    const emotionalWords = [
      { neutral: 'хорошо', emotional: 'отлично' },
      { neutral: 'плохо', emotional: 'ужасно' },
      { neutral: 'много', emotional: 'масса' },
      { neutral: 'быстро', emotional: 'моментально' },
      { neutral: 'важно', emotional: 'крайне важно' }
    ];
    
    if (level !== 'low') {
      emotionalWords.forEach(pair => {
        if (Math.random() < 0.3) {
          const regex = new RegExp(`\\b${pair.neutral}\\b`, 'gi');
          result = result.replace(regex, pair.emotional);
        }
      });
    }
    
    // Добавляем личные местоимения
    if (level === 'high') {
      result = this.addPersonalTouch(result);
    }
    
    return result;
  }

  private addPersonalTouch(text: string): string {
    let result = text;
    
    // Заменяем безличные конструкции на личные
    const personalizations = [
      { impersonal: 'можно сказать', personal: 'я бы сказал' },
      { impersonal: 'следует отметить', personal: 'отмечу' },
      { impersonal: 'рекомендуется', personal: 'рекомендую' },
      { impersonal: 'стоит упомянуть', personal: 'упомяну' }
    ];
    
    personalizations.forEach(pair => {
      if (Math.random() < 0.4) {
        const regex = new RegExp(pair.impersonal, 'gi');
        result = result.replace(regex, pair.personal);
      }
    });
    
    return result;
  }

  private addSubtleHumanErrors(text: string): string {
    let result = text;
    
    // Добавляем незначительные "человеческие" особенности
    // Повторение слов (редко)
    if (Math.random() < 0.1) {
      const words = result.split(' ');
      const randomIndex = Math.floor(Math.random() * words.length);
      if (words[randomIndex] && words[randomIndex].length > 4) {
        words[randomIndex] = `${words[randomIndex]}, ${words[randomIndex]}`;
        result = words.join(' ');
      }
    }
    
    // Незначительные стилистические вариации
    result = result.replace(/\bи\b/g, (match, offset) => {
      return Math.random() < 0.05 ? 'а также' : match;
    });
    
    return result;
  }
}

export const antiAiProcessor = new AntiAiProcessor();
