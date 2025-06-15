
interface SEOOptimizationParams {
  keywords: string;
  keywordDensity: number;
  addHeadings: boolean;
  addInternalLinks: number;
}

interface SEOAnalysis {
  currentDensity: number;
  headingStructure: string[];
  recommendedChanges: string[];
}

class SEOOptimizer {
  async optimizeContent(text: string, params: SEOOptimizationParams): Promise<string> {
    console.log('🎯 Начинаем SEO-оптимизацию...');
    
    let optimizedText = text;
    
    // 1. Анализируем текущее состояние
    const analysis = this.analyzeContent(text, params.keywords);
    console.log('📊 Текущая плотность ключевых слов:', analysis.currentDensity + '%');
    
    // 2. Оптимизируем плотность ключевых слов
    if (analysis.currentDensity < params.keywordDensity) {
      optimizedText = this.improveKeywordDensity(optimizedText, params.keywords, params.keywordDensity);
    }
    
    // 3. Улучшаем структуру заголовков
    if (params.addHeadings) {
      optimizedText = this.improveHeadingStructure(optimizedText);
    }
    
    // 4. Добавляем внутренние ссылки
    if (params.addInternalLinks > 0) {
      optimizedText = this.addInternalLinks(optimizedText, params.addInternalLinks);
    }
    
    console.log('✅ SEO-оптимизация завершена');
    return optimizedText;
  }

  private analyzeContent(text: string, keywords: string): SEOAnalysis {
    const words = text.toLowerCase().match(/\b[а-яё]+\b/gi) || [];
    const totalWords = words.length;
    
    const keywordList = keywords.toLowerCase().split(',').map(k => k.trim());
    let keywordCount = 0;
    
    keywordList.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = text.match(regex) || [];
      keywordCount += matches.length;
    });
    
    const currentDensity = totalWords > 0 ? (keywordCount / totalWords) * 100 : 0;
    
    const headingStructure = text.match(/^#+\s.+$/gm) || [];
    
    return {
      currentDensity: Math.round(currentDensity * 100) / 100,
      headingStructure,
      recommendedChanges: []
    };
  }

  private improveKeywordDensity(text: string, keywords: string, targetDensity: number): string {
    const keywordList = keywords.split(',').map(k => k.trim());
    let result = text;
    
    // Находим места для естественного добавления ключевых слов
    const sentences = result.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const wordsCount = result.split(/\s+/).length;
    const targetKeywordCount = Math.ceil((wordsCount * targetDensity) / 100);
    
    // Добавляем ключевые слова в случайные предложения
    const keywordVariations = this.generateKeywordVariations(keywordList);
    
    for (let i = 0; i < Math.min(targetKeywordCount, sentences.length); i++) {
      const randomSentenceIndex = Math.floor(Math.random() * sentences.length);
      const randomKeyword = keywordVariations[Math.floor(Math.random() * keywordVariations.length)];
      
      // Добавляем ключевое слово естественным образом
      if (!sentences[randomSentenceIndex].toLowerCase().includes(randomKeyword.toLowerCase())) {
        sentences[randomSentenceIndex] = this.insertKeywordNaturally(sentences[randomSentenceIndex], randomKeyword);
      }
    }
    
    return sentences.join('. ') + '.';
  }

  private generateKeywordVariations(keywords: string[]): string[] {
    const variations: string[] = [];
    
    keywords.forEach(keyword => {
      variations.push(keyword);
      
      // Добавляем вариации с предлогами
      variations.push(`в сфере ${keyword}`);
      variations.push(`для ${keyword}`);
      variations.push(`по ${keyword}`);
      
      // Добавляем LSI-вариации
      if (keyword.includes('копирайтинг')) {
        variations.push('написание текстов', 'создание контента', 'текстовый контент');
      }
      if (keyword.includes('seo')) {
        variations.push('поисковая оптимизация', 'продвижение в поисковиках');
      }
    });
    
    return variations;
  }

  private insertKeywordNaturally(sentence: string, keyword: string): string {
    const insertionPoints = [
      `${sentence.trim()}, включая ${keyword}`,
      `${sentence.trim()} в области ${keyword}`,
      `Особенно это касается ${keyword}. ${sentence.trim()}`,
      `${sentence.trim()}, связанное с ${keyword}`
    ];
    
    return insertionPoints[Math.floor(Math.random() * insertionPoints.length)];
  }

  private improveHeadingStructure(text: string): string {
    const paragraphs = text.split(/\n\s*\n/);
    let result = '';
    
    // Если нет заголовков, добавляем структуру
    if (!text.includes('#')) {
      // Первый абзац становится H1
      if (paragraphs.length > 0) {
        result += `# ${this.extractTitleFromText(paragraphs[0])}\n\n`;
        result += paragraphs[0] + '\n\n';
        
        // Добавляем H2 заголовки к крупным абзацам
        for (let i = 1; i < paragraphs.length; i++) {
          if (paragraphs[i].length > 200) {
            result += `## ${this.generateHeadingFromParagraph(paragraphs[i])}\n\n`;
          }
          result += paragraphs[i] + '\n\n';
        }
      }
    } else {
      result = text;
    }
    
    return result.trim();
  }

  private extractTitleFromText(text: string): string {
    const firstSentence = text.split(/[.!?]/)[0];
    return firstSentence.length > 60 ? firstSentence.substring(0, 60) + '...' : firstSentence;
  }

  private generateHeadingFromParagraph(paragraph: string): string {
    const firstSentence = paragraph.split(/[.!?]/)[0];
    
    // Извлекаем ключевые слова для заголовка
    const words = firstSentence.split(' ').filter(word => word.length > 3);
    const heading = words.slice(0, 4).join(' ');
    
    return heading.length > 5 ? heading : 'Основные моменты';
  }

  private addInternalLinks(text: string, linkCount: number): string {
    const linkTemplates = [
      '[подробнее о наших услугах](/services)',
      '[узнать больше](/pricing)',
      '[связаться с нами](/contact)',
      '[примеры работ](/portfolio)',
      '[начать заказ](/order)'
    ];
    
    let result = text;
    const sentences = result.split(/[.!?]+/);
    
    for (let i = 0; i < Math.min(linkCount, sentences.length); i++) {
      const randomSentenceIndex = Math.floor(Math.random() * sentences.length);
      const randomLink = linkTemplates[Math.floor(Math.random() * linkTemplates.length)];
      
      if (!sentences[randomSentenceIndex].includes('[')) {
        sentences[randomSentenceIndex] += ` ${randomLink}`;
      }
    }
    
    return sentences.join('. ') + '.';
  }
}

export const seoOptimizer = new SEOOptimizer();
