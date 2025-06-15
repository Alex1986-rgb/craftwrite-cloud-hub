import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Bot, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TabNavigation from "./ai-generator/TabNavigation";
import ApiKeySetup from "./ai-generator/ApiKeySetup";
import GenerationProgress from "./ai-generator/GenerationProgress";
import { useTextGeneration } from "@/hooks/useTextGeneration";
import { enhancedOpenAIService } from "@/services/enhancedOpenAIService";
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
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [enhancedMode, setEnhancedMode] = useState(true);

  useEffect(() => {
    // Initialize enhanced service with existing API key
    if (hasApiKey) {
      const apiKey = localStorage.getItem('openai_api_key');
      if (apiKey) {
        enhancedOpenAIService.setAPIKeys({ openai: apiKey });
      }
    }
  }, [hasApiKey]);

  const handleGenerate = async () => {
    if (enhancedMode) {
      // Use enhanced generation with personalization
      const userId = 'default-user'; // In real app, get from auth
      try {
        const result = await enhancedOpenAIService.generateWithPersonalization({
          ...formData,
          length: formData.length[0]
        }, userId);
        setGeneratedText(result);
      } catch (error) {
        console.error('Enhanced generation failed, falling back to basic:', error);
        await generateText({
          ...formData,
          length: formData.length[0]
        });
      }
    } else {
      await generateText({
        ...formData,
        length: formData.length[0]
      });
    }
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
        <div className="flex items-center gap-3">
          <Badge className="bg-purple-100 text-purple-800">
            <Bot className="w-4 h-4 mr-2" />
            GPT-4.1
          </Badge>
          {enhancedMode && (
            <Badge className="bg-green-100 text-green-800">
              Enhanced AI
            </Badge>
          )}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {showAdvancedSettings && (
        <Card>
          <CardHeader>
            <CardTitle>Расширенные настройки</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Enhanced AI режим</h4>
                <p className="text-sm text-slate-600">
                  Персонализация, анализ конкурентов и улучшенные алгоритмы
                </p>
              </div>
              <Button
                variant={enhancedMode ? "default" : "outline"}
                onClick={() => setEnhancedMode(!enhancedMode)}
              >
                {enhancedMode ? 'Включен' : 'Выключен'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <ApiKeySetup 
        onApiKeySet={(key) => {
          setApiKey(key);
          enhancedOpenAIService.setAPIKeys({ openai: key });
        }}
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
