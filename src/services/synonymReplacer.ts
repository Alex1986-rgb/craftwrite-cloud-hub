
interface SynonymReplacement {
  original: string;
  synonym: string;
  context: string;
}

class SynonymReplacer {
  private synonyms: Record<string, string[]> = {
    'создать': ['разработать', 'сформировать', 'построить', 'организовать'],
    'улучшить': ['усовершенствовать', 'оптимизировать', 'модернизировать', 'повысить'],
    'получить': ['приобрести', 'достичь', 'обрести', 'заполучить'],
    'использовать': ['применять', 'задействовать', 'эксплуатировать', 'внедрять'],
    'помочь': ['содействовать', 'поддержать', 'способствовать', 'ассистировать'],
    'увеличить': ['повысить', 'расширить', 'нарастить', 'приумножить'],
    'решить': ['устранить', 'разрешить', 'урегулировать', 'ликвидировать'],
    'важный': ['значимый', 'существенный', 'ключевой', 'критический'],
    'хороший': ['качественный', 'превосходный', 'отличный', 'замечательный'],
    'большой': ['значительный', 'крупный', 'масштабный', 'обширный']
  };

  async improvePlainText(text: string, duplicateFragments: any[] = []): Promise<string> {
    let improvedText = text;
    
    // Заменяем слова синонимами для повышения уникальности
    Object.entries(this.synonyms).forEach(([original, synonyms]) => {
      const regex = new RegExp(`\\b${original}\\b`, 'gi');
      const matches = improvedText.match(regex);
      
      if (matches && matches.length > 1) {
        // Заменяем только повторяющиеся вхождения
        let replacementCount = 0;
        improvedText = improvedText.replace(regex, (match) => {
          replacementCount++;
          if (replacementCount > 1 && Math.random() > 0.5) {
            const randomSynonym = synonyms[Math.floor(Math.random() * synonyms.length)];
            return match.toLowerCase() === original.toLowerCase() 
              ? randomSynonym 
              : this.capitalizeFirst(randomSynonym);
          }
          return match;
        });
      }
    });

    // Заменяем фрагменты из дубликатов
    duplicateFragments.forEach(fragment => {
      if (fragment.text && fragment.text.length > 20) {
        improvedText = this.paraphraseFragment(improvedText, fragment.text);
      }
    });
    
    return improvedText;
  }

  private paraphraseFragment(text: string, fragment: string): string {
    // Упрощенная парафразировка - меняем структуру предложений
    const fragmentWords = fragment.split(' ');
    if (fragmentWords.length > 5) {
      const paraphrased = this.restructureSentence(fragment);
      return text.replace(fragment, paraphrased);
    }
    return text;
  }

  private restructureSentence(sentence: string): string {
    // Простая реструктуризация предложения
    const words = sentence.split(' ');
    if (words.length > 8) {
      // Разбиваем длинное предложение на два
      const midPoint = Math.floor(words.length / 2);
      return words.slice(0, midPoint).join(' ') + '. ' + 
             this.capitalizeFirst(words.slice(midPoint).join(' '));
    }
    return sentence;
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async getSynonyms(word: string): Promise<string[]> {
    return this.synonyms[word.toLowerCase()] || [];
  }
}

export const synonymReplacer = new SynonymReplacer();
