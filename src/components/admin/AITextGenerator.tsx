
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Bot } from "lucide-react";
import TabNavigation from "./ai-generator/TabNavigation";
import ApiKeySetup from "./ai-generator/ApiKeySetup";
import GenerationProgress from "./ai-generator/GenerationProgress";
import { useTextGeneration } from "@/hooks/useTextGeneration";
import { 
  GenerationHistoryItem, 
  FormData 
} from "./ai-generator/AITextGeneratorTypes";
import { 
  contentTypes, 
  initialFormData 
} from "./ai-generator/AITextGeneratorData";
import { 
  createGenerationHandlers, 
  createTemplateHandlers 
} from "./ai-generator/AITextGeneratorHandlers";

export default function AITextGenerator() {
  const {
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
  } = useTextGeneration();

  const [generationHistory, setGenerationHistory] = useState<GenerationHistoryItem[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleGenerate = async () => {
    await generateText({
      ...formData,
      length: formData.length[0]
    });
  };

  const handleBatchGenerate = async (variants: number, temperature: number) => {
    return await generateBatch({
      ...formData,
      length: formData.length[0]
    }, variants, temperature);
  };

  const handleRefineText = async (text: string, instruction: string, preserveLength: boolean) => {
    return await refineText(text, instruction, preserveLength);
  };

  const handleAnalyzeQuality = async (text: string, keywords?: string) => {
    return await analyzeQuality(text, keywords);
  };

  const handleRetryGeneration = () => {
    clearError();
    handleGenerate();
  };

  const generationHandlers = createGenerationHandlers(
    generatedText,
    formData,
    setGenerationHistory,
    setGeneratedText
  );

  const templateHandlers = createTemplateHandlers(setFormData);

  const selectedContentType = contentTypes.find(type => type.value === formData.textType);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AI Генератор текстов</h1>
          <p className="text-slate-600">Создание профессиональных текстов с помощью искусственного интеллекта</p>
        </div>
        <Badge className="bg-purple-100 text-purple-800">
          <Bot className="w-4 h-4 mr-2" />
          GPT-4
        </Badge>
      </div>

      <ApiKeySetup 
        onApiKeySet={setApiKey}
        hasApiKey={hasApiKey}
      />

      <GenerationProgress
        isGenerating={isGenerating}
        error={error}
        onRetry={handleRetryGeneration}
      />

      {hasApiKey && (
        <TabNavigation
          formData={formData}
          setFormData={setFormData}
          generatedText={generatedText}
          setGeneratedText={setGeneratedText}
          isGenerating={isGenerating}
          onGenerate={handleGenerate}
          onBatchGenerate={handleBatchGenerate}
          onRefineText={handleRefineText}
          onAnalyzeQuality={handleAnalyzeQuality}
          onApplyTemplate={templateHandlers.handleApplyTemplate}
          onApplyPreset={templateHandlers.handleApplyPreset}
          onSavePreset={templateHandlers.handleSavePreset}
          onSelectPrompt={templateHandlers.handleSelectPrompt}
          selectedContentType={selectedContentType}
          generationHistory={generationHistory}
          onSaveResult={generationHandlers.handleSaveResult}
          onSelectHistoryResult={generationHandlers.handleSelectHistoryResult}
          onSaveHistoryResult={generationHandlers.handleSaveHistoryResult}
          onDeleteHistoryResult={generationHandlers.handleDeleteHistoryResult}
        />
      )}
    </div>
  );
}
