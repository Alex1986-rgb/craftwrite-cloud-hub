
import { personalizationService, PersonalizationData } from './personalizationService';
import { competitorAnalysisService, CompetitorAnalysis } from './competitorAnalysisService';
import { abTestingService, ABTestResult } from './abTestingService';
import { conversionPredictionService } from './conversionPredictionService';
import { apiConfigService, APIConfig } from './apiConfigService';

class EnhancedOpenAIService {
  setAPIKeys(config: APIConfig) {
    apiConfigService.setAPIKeys(config);
  }

  async generateWithPersonalization(params: any, userId: string): Promise<string> {
    return await personalizationService.generateWithPersonalization(params, userId);
  }

  async checkUniqueness(text: string): Promise<{ score: number; sources: string[] }> {
    return await competitorAnalysisService.checkUniqueness(text);
  }

  async analyzeCompetitors(keywords: string[], industry: string): Promise<CompetitorAnalysis> {
    return await competitorAnalysisService.analyzeCompetitors(keywords, industry);
  }

  async performABTest(textA: string, textB: string): Promise<ABTestResult> {
    return await abTestingService.performABTest(textA, textB);
  }

  async predictConversion(text: string, audience: string): Promise<{ score: number; factors: string[] }> {
    return await conversionPredictionService.predictConversion(text, audience);
  }

  updatePersonalizationData(userId: string, text: string, performance: number) {
    personalizationService.updatePersonalizationData(userId, text, performance);
  }

  getUserProfile(userId: string): PersonalizationData | undefined {
    return personalizationService.getUserProfile(userId);
  }
}

export const enhancedOpenAIService = new EnhancedOpenAIService();
