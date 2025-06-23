
export interface PersonalizationData {
  userId: string;
  preferences: {
    tone: string;
    style: string;
    length: number;
    topics: string[];
  };
  history: {
    textId: string;
    content: string;
    rating: number;
    feedback: string;
    timestamp: Date;
  }[];
  performance: {
    averageRating: number;
    totalTexts: number;
    preferredKeywords: string[];
  };
}

class PersonalizationService {
  private userProfiles: Map<string, PersonalizationData> = new Map();

  async generateWithPersonalization(params: any, userId: string): Promise<string> {
    const profile = this.getUserProfile(userId);
    
    if (profile) {
      // Адаптируем параметры под предпочтения пользователя
      const adaptedParams = {
        ...params,
        tone: profile.preferences.tone || params.tone,
        length: profile.preferences.length || params.length,
        keywords: this.enhanceKeywords(params.keywords, profile.performance.preferredKeywords)
      };
      
      console.log('Generating with personalization for user:', userId);
      // Здесь должен быть вызов к основному генератору
      return `Персонализированный текст для пользователя ${userId}`;
    }
    
    return `Стандартный текст без персонализации`;
  }

  updatePersonalizationData(userId: string, text: string, performance: number): void {
    let profile = this.userProfiles.get(userId);
    
    if (!profile) {
      profile = this.createDefaultProfile(userId);
    }
    
    // Обновляем историю
    profile.history.push({
      textId: `text_${Date.now()}`,
      content: text.substring(0, 100) + '...',
      rating: performance,
      feedback: '',
      timestamp: new Date()
    });
    
    // Обновляем метрики производительности
    profile.performance.totalTexts++;
    profile.performance.averageRating = 
      (profile.performance.averageRating * (profile.performance.totalTexts - 1) + performance) / 
      profile.performance.totalTexts;
    
    // Сохраняем профиль
    this.userProfiles.set(userId, profile);
    
    console.log(`Updated personalization for user ${userId}, avg rating: ${profile.performance.averageRating}`);
  }

  getUserProfile(userId: string): PersonalizationData | undefined {
    return this.userProfiles.get(userId);
  }

  private createDefaultProfile(userId: string): PersonalizationData {
    return {
      userId,
      preferences: {
        tone: 'professional',
        style: 'informative',
        length: 500,
        topics: []
      },
      history: [],
      performance: {
        averageRating: 0,
        totalTexts: 0,
        preferredKeywords: []
      }
    };
  }

  private enhanceKeywords(originalKeywords: string, preferredKeywords: string[]): string {
    if (!preferredKeywords.length) return originalKeywords;
    
    const enhanced = originalKeywords + ', ' + preferredKeywords.slice(0, 3).join(', ');
    return enhanced;
  }

  async getPersonalizationInsights(userId: string): Promise<{
    strengths: string[];
    recommendations: string[];
    trends: any;
  }> {
    const profile = this.getUserProfile(userId);
    
    if (!profile) {
      return {
        strengths: [],
        recommendations: ['Создайте больше текстов для анализа'],
        trends: {}
      };
    }
    
    const strengths = [];
    const recommendations = [];
    
    if (profile.performance.averageRating > 4) {
      strengths.push('Высокое качество генерируемых текстов');
    }
    
    if (profile.performance.totalTexts > 10) {
      strengths.push('Активное использование платформы');
    }
    
    if (profile.performance.averageRating < 3) {
      recommendations.push('Попробуйте изменить стиль или тональность');
    }
    
    return {
      strengths,
      recommendations,
      trends: {
        textsThisMonth: profile.history.filter(h => 
          h.timestamp > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        ).length
      }
    };
  }
}

export const personalizationService = new PersonalizationService();
