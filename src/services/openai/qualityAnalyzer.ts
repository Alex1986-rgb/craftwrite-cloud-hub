
import { QualityAnalysis } from './types';

export class QualityAnalyzer {
  static analyzeQuality(text: string, keywords?: string): QualityAnalysis {
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
}
