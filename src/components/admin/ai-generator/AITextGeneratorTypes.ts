
export interface GenerationHistoryItem {
  id: string;
  title: string;
  content: string;
  contentType: string;
  createdAt: Date;
  wordCount: number;
  parameters: {
    tone: string;
    audience: string;
    keywords: string;
  };
}

export interface FormData {
  prompt: string;
  textType: string;
  length: number[];
  tone: string;
  audience: string;
  keywords: string;
  language: string;
  includeEmoji: boolean;
  includeCTA: boolean;
  seoOptimized: boolean;
}

export interface ContentType {
  value: string;
  label: string;
  icon: any;
  description: string;
}

export interface Option {
  value: string;
  label: string;
}
