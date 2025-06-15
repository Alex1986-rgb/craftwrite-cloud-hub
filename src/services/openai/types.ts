
export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export interface GenerationParams {
  prompt: string;
  textType: string;
  length: number;
  tone: string;
  audience: string;
  keywords: string;
  includeEmoji: boolean;
  includeCTA: boolean;
  seoOptimized: boolean;
}

export interface BatchGenerationParams extends GenerationParams {
  variants: number;
  temperature?: number;
}

export interface RefineParams {
  originalText: string;
  instruction: string;
  preserveLength?: boolean;
}

export interface QualityAnalysis {
  readabilityScore: number;
  seoScore: number;
  toneConsistency: number;
  keywordDensity: number;
  suggestions: string[];
}
