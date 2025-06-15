
interface SynonymDatabase {
  [word: string]: string[];
}

class SynonymReplacer {
  private synonyms: SynonymDatabase = {
    // Базовый словарь синонимов
    'создать': ['разработать', 'сформировать', 'построить', 'сделать', 'изготовить'],
    'важно': ['значимо', 'существенно', 'принципиально', 'критично', 'необходимо'],
    'компания': ['организация', 'предприятие', 'фирма', 'бизнес', 'корпорация'],
    'услуга': ['сервис', 'предложение', 'продукт', 'решение'],
    'качественный': ['превосходный', 'отличный', 'профессиональный', 'высококлассный'],
    'быстро': ['оперативно', 'срочно', 'незамедлительно', 'моментально'],
    'эффективный': ['результативный', 'продуктивный', 'действенный', 'успешный'],
    'клиент': ['заказчик', 'покупатель', 'потребитель', 'пользователь'],
    'работа': ['деятельность', 'труд', 'процесс', 'выполнение', 'функционирование'],
    'результат': ['итог', 'исход', 'достижение', 'эффект', 'плод'],
    'решение': ['выход', 'способ', 'метод', 'вариант', 'подход'],
    'проблема': ['вопрос', 'задача', 'трудность', 'сложность', 'препятствие'],
    'получить': ['приобрести', 'обрести', 'добиться', 'достичь', 'заполучить'],
    'использовать': ['применять', 'задействовать', 'эксплуатировать', 'привлекать'],
    'современный': ['актуальный', 'новейший', 'передовой', 'инновационный'],
    'популярный': ['востребованный', 'известный', 'распространенный', 'модный'],
    'специалист': ['эксперт', 'профессионал', 'мастер', 'знаток'],
    'помочь': ['содействовать', 'способствовать', 'поддержать', 'выручить'],
    'предоставить': ['дать', 'обеспечить', 'предложить', 'снабдить'],
    'необходимо': ['нужно', 'требуется', 'следует', 'важно'],
    'позволяет': ['дает возможность', 'обеспечивает', 'способствует', 'помогает'],
    'увеличить': ['повысить', 'нарастить', 'поднять', 'расширить', 'усилить'],
    'улучшить': ['усовершенствовать', 'оптимизировать', 'модернизировать', 'развить']
  };

  async improvePlainText(text: string, duplicateFragments: Array<{text: string, sources: string[], percentage: number}>): Promise<string> {
    console.log('🔄 Начинаем синонимизацию текста...');
    
    let improvedText = text;
    
    // Заменяем слова из дублирующихся фрагментов
    for (const fragment of duplicateFragments) {
      if (fragment.percentage > 10) { // Обрабатываем фрагменты с высоким процентом совпадения
        improvedText = this.replaceWordsInFragment(improvedText, fragment.text);
      }
    }
    
    // Дополнительная общая синонимизация
    improvedText = this.performGeneralSynonymization(improvedText);
    
    console.log('✅ Синонимизация завершена');
    return improvedText;
  }

  private replaceWordsInFragment(text: string, duplicateFragment: string): string {
    let result = text;
    
    // Разбиваем фрагмент на слова и ищем синонимы
    const words = duplicateFragment.toLowerCase().match(/\b[а-яё]+\b/gi) || [];
    
    for (const word of words) {
      const synonyms = this.synonyms[word.toLowerCase()];
      if (synonyms && synonyms.length > 0) {
        // Выбираем случайный синоним
        const randomSynonym = synonyms[Math.floor(Math.random() * synonyms.length)];
        
        // Заменяем с учетом регистра
        const regex = new RegExp(`\\b${this.escapeRegExp(word)}\\b`, 'gi');
        result = result.replace(regex, (match) => {
          return this.preserveCase(match, randomSynonym);
        });
      }
    }
    
    return result;
  }

  private performGeneralSynonymization(text: string): string {
    let result = text;
    
    // Проходим по всем словам в словаре синонимов
    Object.entries(this.synonyms).forEach(([originalWord, synonyms]) => {
      if (synonyms.length > 0) {
        // Используем вероятность замены 30%
        if (Math.random() < 0.3) {
          const randomSynonym = synonyms[Math.floor(Math.random() * synonyms.length)];
          const regex = new RegExp(`\\b${this.escapeRegExp(originalWord)}\\b`, 'gi');
          
          result = result.replace(regex, (match) => {
            return this.preserveCase(match, randomSynonym);
          });
        }
      }
    });
    
    return result;
  }

  private preserveCase(original: string, replacement: string): string {
    if (original === original.toUpperCase()) {
      return replacement.toUpperCase();
    }
    if (original === original.toLowerCase()) {
      return replacement.toLowerCase();
    }
    if (original[0] === original[0].toUpperCase()) {
      return replacement.charAt(0).toUpperCase() + replacement.slice(1).toLowerCase();
    }
    return replacement.toLowerCase();
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Метод для добавления новых синонимов
  addSynonyms(word: string, synonyms: string[]): void {
    this.synonyms[word.toLowerCase()] = synonyms;
  }

  // Получение синонимов для слова
  getSynonyms(word: string): string[] {
    return this.synonyms[word.toLowerCase()] || [];
  }
}

export const synonymReplacer = new SynonymReplacer();
