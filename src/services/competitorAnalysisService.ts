
export interface CompetitorAnalysis {
  competitors: {
    domain: string;
    title: string;
    snippet: string;
    keywords: string[];
    readabilityScore: number;
  }[];
  gaps: string[];
  opportunities: string[];
  recommendations: string[];
  commonKeywords: string[]; // Add this property
  contentGaps: string[]; // Add this property
}

class CompetitorAnalysisService {
  async analyzeCompetitors(keywords: string[], industry: string): Promise<CompetitorAnalysis> {
    console.log('Analyzing competitors for keywords:', keywords);
    
    // Заглушка для анализа конкурентов
    const mockCompetitors = [
      {
        domain: 'competitor1.com',
        title: 'Лучшие решения в ' + industry,
        snippet: 'Мы предлагаем качественные услуги...',
        keywords: keywords.slice(0, 3),
        readabilityScore: 75
      },
      {
        domain: 'competitor2.com', 
        title: 'Профессиональные услуги ' + industry,
        snippet: 'Опытная команда специалистов...',
        keywords: keywords.slice(1, 4),
        readabilityScore: 82
      }
    ];
    
    const gaps = [
      'Недостаточно внимания к ' + keywords[0],
      'Слабая проработка темы ' + keywords[1]
    ];
    
    const opportunities = [
      'Создать более детальный контент по ' + keywords[0],
      'Добавить экспертные мнения',
      'Улучшить техническую оптимизацию'
    ];
    
    const recommendations = [
      'Сфокусируйтесь на уникальных преимуществах',
      'Используйте более длинные ключевые фразы',
      'Добавьте больше внутренних ссылок'
    ];

    const commonKeywords = keywords.slice(0, 5); // Add common keywords
    const contentGaps = gaps; // Use gaps as content gaps
    
    return {
      competitors: mockCompetitors,
      gaps,
      opportunities,
      recommendations,
      commonKeywords,
      contentGaps
    };
  }

  async checkUniqueness(text: string): Promise<{ score: number; sources: string[] }> {
    console.log('Checking text uniqueness');
    
    // Заглушка проверки уникальности
    const score = 85 + Math.random() * 10; // 85-95%
    const sources = score < 90 ? ['example.com', 'competitor.org'] : [];
    
    return { score: Math.round(score), sources };
  }

  async getSEOInsights(keywords: string[]): Promise<{
    difficulty: number;
    volume: number;
    suggestions: string[];
  }> {
    console.log('Getting SEO insights for:', keywords);
    
    return {
      difficulty: Math.floor(Math.random() * 100),
      volume: Math.floor(Math.random() * 10000),
      suggestions: [
        'Добавьте LSI-ключевые слова',
        'Увеличьте длину контента',
        'Оптимизируйте мета-теги'
      ]
    };
  }
}

export const competitorAnalysisService = new CompetitorAnalysisService();
