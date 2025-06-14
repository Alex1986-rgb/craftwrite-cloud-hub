
import { useState, useCallback } from 'react';
import { openAIService } from '@/services/openai';
import { useToast } from '@/hooks/use-toast';

interface GenerationParams {
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

interface QualityAnalysis {
  readabilityScore: number;
  seoScore: number;
  toneConsistency: number;
  keywordDensity: number;
  suggestions: string[];
}

interface UseTextGenerationReturn {
  isGenerating: boolean;
  generatedText: string;
  error: string | null;
  generateText: (params: GenerationParams) => Promise<void>;
  generateBatch: (params: GenerationParams, variants: number, temperature: number) => Promise<string[]>;
  refineText: (text: string, instruction: string, preserveLength: boolean) => Promise<string>;
  analyzeQuality: (text: string, keywords?: string) => Promise<QualityAnalysis>;
  setGeneratedText: (text: string) => void;
  clearError: () => void;
  hasApiKey: boolean;
  setApiKey: (key: string) => Promise<boolean>;
}

export function useTextGeneration(): UseTextGenerationReturn {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(!!openAIService.getApiKey());
  const { toast } = useToast();

  const generateText = useCallback(async (params: GenerationParams) => {
    if (!openAIService.getApiKey()) {
      setError('API ключ OpenAI не установлен');
      toast({
        title: "Ошибка",
        description: "Необходимо установить API ключ OpenAI",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const result = await openAIService.generateText(params);
      setGeneratedText(result);
      toast({
        title: "Текст сгенерирован",
        description: "Генерация успешно завершена"
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      setError(errorMessage);
      toast({
        title: "Ошибка генерации",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  }, [toast]);

  const generateBatch = useCallback(async (
    params: GenerationParams, 
    variants: number, 
    temperature: number
  ): Promise<string[]> => {
    if (!openAIService.getApiKey()) {
      throw new Error('API ключ OpenAI не установлен');
    }

    setIsGenerating(true);
    setError(null);

    try {
      const results = await openAIService.generateBatch({
        ...params,
        variants,
        temperature
      });
      
      toast({
        title: "Пакетная генерация завершена",
        description: `Создано ${results.length} вариантов текста`
      });
      
      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      setError(errorMessage);
      toast({
        title: "Ошибка пакетной генерации",
        description: errorMessage,
        variant: "destructive"
      });
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, [toast]);

  const refineText = useCallback(async (
    text: string, 
    instruction: string, 
    preserveLength: boolean
  ): Promise<string> => {
    if (!openAIService.getApiKey()) {
      throw new Error('API ключ OpenAI не установлен');
    }

    setIsGenerating(true);
    setError(null);

    try {
      const result = await openAIService.refineText({
        originalText: text,
        instruction,
        preserveLength
      });
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      setError(errorMessage);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const analyzeQuality = useCallback(async (
    text: string, 
    keywords?: string
  ): Promise<QualityAnalysis> => {
    try {
      return await openAIService.analyzeQuality(text, keywords);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка анализа';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const setApiKey = useCallback(async (key: string): Promise<boolean> => {
    try {
      const isValid = await openAIService.validateApiKey(key);
      if (isValid) {
        openAIService.setApiKey(key);
        setHasApiKey(true);
        setError(null);
        toast({
          title: "API ключ установлен",
          description: "OpenAI API успешно подключен"
        });
        return true;
      } else {
        setError('Недействительный API ключ');
        toast({
          title: "Ошибка",
          description: "Недействительный API ключ OpenAI",
          variant: "destructive"
        });
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка проверки API ключа';
      setError(errorMessage);
      toast({
        title: "Ошибка",
        description: errorMessage,
        variant: "destructive"
      });
      return false;
    }
  }, [toast]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isGenerating,
    generatedText,
    error,
    generateText,
    generateBatch,
    refineText,
    analyzeQuality,
    setGeneratedText,
    clearError,
    hasApiKey,
    setApiKey
  };
}
