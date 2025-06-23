
interface SEOOptimizationParams {
  keywords: string;
  keywordDensity: number;
  addHeadings: boolean;
  addInternalLinks: boolean;
}

interface SEOAnalysis {
  keywordDensity: number;
  headingStructure: boolean;
  readabilityScore: number;
  recommendations: string[];
}

class SEOOptimizer {
  async optimizeContent(text: string, params: SEOOptimizationParams): Promise<string> {
    let optimizedText = text;
    
    // Добавляем заголовки если нужно
    if (params.addHeadings && !this.hasHeadings(text)) {
      optimizedText = this.addHeadings(optimizedText);
    }
    
    // Оптимизируем плотность ключевых слов
    optimizedText = this.optimizeKeywordDensity(optimizedText, params.keywords, params.keywordDensity);
    
    return optimizedText;
  }

  async analyzeContent(text: string, keywords: string): Promise<SEOAnalysis> {
    const keywordDensity = this.calculateKeywordDensity(text, keywords);
    const headingStructure = this.hasHeadings(text);
    const readabilityScore = this.calculateReadabilityScore(text);
    
    const recommendations = [];
    if (keywordDensity < 1) recommendations.push('Увеличьте плотность ключевых слов');
    if (!headingStructure) recommendations.push('Добавьте заголовки для лучшей структуры');
    if (readabilityScore < 60) recommendations.push('Упростите текст для лучшей читабельности');
    
    return {
      keywordDensity,
      headingStructure,
      readabilityScore,
      recommendations
    };
  }

  private hasHeadings(text: string): boolean {
    return /^#{1,6}\s/.test(text);
  }

  private addHeadings(text: string): string {
    const paragraphs = text.split('\n\n');
    if (paragraphs.length > 1) {
      return `# ${paragraphs[0]}\n\n${paragraphs.slice(1).join('\n\n')}`;
    }
    return text;
  }

  private calculateKeywordDensity(text: string, keywords: string): number {
    const words = text.toLowerCase().split(/\s+/);
    const keywordList = keywords.toLowerCase().split(',').map(k => k.trim());
    
    let keywordCount = 0;
    keywordList.forEach(keyword => {
      keywordCount += (text.toLowerCase().match(new RegExp(`\\b${keyword}\\b`, 'g')) || []).length;
    });
    
    return (keywordCount / words.length) * 100;
  }

  private optimizeKeywordDensity(text: string, keywords: string, targetDensity: number): string {
    const currentDensity = this.calculateKeywordDensity(text, keywords);
    
    if (currentDensity < targetDensity) {
      // Добавляем ключевые слова естественным образом
      const keywordList = keywords.split(',').map(k => k.trim());
      const sentences = text.split('. ');
      
      if (sentences.length > 2) {
        const middleIndex = Math.floor(sentences.length / 2);
        sentences[middleIndex] += ` ${keywordList[0]}`;
      }
      
      return sentences.join('. ');
    }
    
    return text;
  }

  private calculateReadabilityScore(text: string): number {
    const words = text.split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    const avgWordsPerSentence = words.length / sentences.length;
    
    // Упрощенная формула читабельности
    let score = 100;
    if (avgWordsPerSentence > 20) score -= 20;
    if (avgWordsPerSentence > 15) score -= 10;
    
    return Math.max(0, score);
  }
}

export const seoOptimizer = new SEOOptimizer();
