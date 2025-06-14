
import { GenerationHistoryItem, FormData } from "./AITextGeneratorTypes";
import { contentTypes, toneOptions, audienceOptions } from "./AITextGeneratorData";

export const createGenerationHandlers = (
  generatedText: string,
  formData: FormData,
  setGenerationHistory: React.Dispatch<React.SetStateAction<GenerationHistoryItem[]>>,
  setGeneratedText: (text: string) => void
) => {
  const handleSaveResult = (title: string) => {
    const newHistoryItem: GenerationHistoryItem = {
      id: Date.now().toString(),
      title,
      content: generatedText,
      contentType: contentTypes.find(t => t.value === formData.textType)?.label || 'Неизвестный тип',
      createdAt: new Date(),
      wordCount: generatedText.split(' ').length,
      parameters: {
        tone: toneOptions.find(t => t.value === formData.tone)?.label || 'не указан',
        audience: audienceOptions.find(a => a.value === formData.audience)?.label || 'не указана',
        keywords: formData.keywords
      }
    };

    setGenerationHistory(prev => [newHistoryItem, ...prev]);
  };

  const handleSelectHistoryResult = (content: string) => {
    setGeneratedText(content);
  };

  const handleSaveHistoryResult = (item: Omit<GenerationHistoryItem, 'id' | 'createdAt'>) => {
    const updatedItem: GenerationHistoryItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    setGenerationHistory(prev => [updatedItem, ...prev]);
  };

  const handleDeleteHistoryResult = (id: string) => {
    setGenerationHistory(prev => prev.filter(item => item.id !== id));
  };

  return {
    handleSaveResult,
    handleSelectHistoryResult,
    handleSaveHistoryResult,
    handleDeleteHistoryResult
  };
};

export const createTemplateHandlers = (
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
) => {
  const handleApplyTemplate = (template: any) => {
    setFormData(prev => ({
      ...prev,
      textType: template.settings.textType,
      length: [template.settings.length],
      tone: template.settings.tone,
      audience: template.settings.audience,
      seoOptimized: template.settings.seoOptimized,
      includeCTA: template.settings.includeCTA,
      prompt: template.prompt
    }));
  };

  const handleApplyPreset = (preset: any) => {
    setFormData(prev => ({
      ...prev,
      ...preset.settings
    }));
  };

  const handleSavePreset = (preset: any) => {
    console.log('Saving preset:', preset);
  };

  const handleSelectPrompt = (prompt: string) => {
    setFormData(prev => ({
      ...prev,
      prompt: prompt
    }));
  };

  return {
    handleApplyTemplate,
    handleApplyPreset,
    handleSavePreset,
    handleSelectPrompt
  };
};
