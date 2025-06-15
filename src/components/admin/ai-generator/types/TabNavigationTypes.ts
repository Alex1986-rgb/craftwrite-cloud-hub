
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

export interface TabNavigationProps {
  formData: FormData;
  setFormData: (data: FormData | ((prev: FormData) => FormData)) => void;
  generatedText: string;
  setGeneratedText: (text: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  onBatchGenerate?: (variants: number, temperature: number) => Promise<string[]>;
  onRefineText?: (text: string, instruction: string, preserveLength: boolean) => Promise<string>;
  onAnalyzeQuality?: (text: string, keywords?: string) => Promise<any>;
  onApplyTemplate: (template: any) => void;
  onApplyPreset: (preset: any) => void;
  onSavePreset: (preset: any) => void;
  onSelectPrompt: (prompt: string) => void;
  selectedContentType?: any;
  generationHistory: GenerationHistoryItem[];
  onSaveResult: (title: string) => void;
  onSelectHistoryResult: (content: string) => void;
  onSaveHistoryResult: (item: Omit<GenerationHistoryItem, 'id' | 'createdAt'>) => void;
  onDeleteHistoryResult: (id: string) => void;
}
