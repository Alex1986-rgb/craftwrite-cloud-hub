
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface GenerationRequest {
  prompt: string;
  service_type: string;
  target_audience?: string;
  tone?: string;
  length?: number;
  keywords?: string[];
  additional_requirements?: string;
}

interface GenerationResponse {
  text: string;
  metadata: {
    model: string;
    tokens_used?: number;
    service_type: string;
  };
}

export function useSecureAIGeneration() {
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState<string>('');

  const generateText = async (request: GenerationRequest): Promise<string | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-text-generation', {
        body: request
      });

      if (error) throw error;

      const result = data as GenerationResponse;
      setGeneratedText(result.text);
      
      toast.success('Текст успешно сгенерирован!', {
        description: `Использована модель: ${result.metadata.model}`
      });

      return result.text;
    } catch (error: any) {
      console.error('Error generating text:', error);
      toast.error('Ошибка генерации текста', {
        description: error.message || 'Попробуйте еще раз'
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateText,
    loading,
    generatedText,
    setGeneratedText
  };
}
