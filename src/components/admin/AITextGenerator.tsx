import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Bot, FileText, Mail, MessageSquare, Users } from "lucide-react";
import TabNavigation from "./ai-generator/TabNavigation";
import ApiKeySetup from "./ai-generator/ApiKeySetup";
import GenerationProgress from "./ai-generator/GenerationProgress";
import { useTextGeneration } from "@/hooks/useTextGeneration";

interface GenerationHistoryItem {
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

export default function AITextGenerator() {
  const {
    isGenerating,
    generatedText,
    error,
    generateText,
    setGeneratedText,
    clearError,
    hasApiKey,
    setApiKey
  } = useTextGeneration();

  const [generationHistory, setGenerationHistory] = useState<GenerationHistoryItem[]>([]);
  const [formData, setFormData] = useState({
    prompt: "",
    textType: "",
    length: [3000],
    tone: "",
    audience: "",
    keywords: "",
    language: "russian",
    includeEmoji: false,
    includeCTA: true,
    seoOptimized: true
  });

  const contentTypes = [
    { value: "seo-article", label: "SEO-статья", icon: FileText, description: "Статья для поискового продвижения" },
    { value: "landing", label: "Лендинг", icon: Users, description: "Продающая страница" },
    { value: "email", label: "Email-рассылка", icon: Mail, description: "Письмо для подписчиков" },
    { value: "social", label: "Соцсети", icon: MessageSquare, description: "Пост для социальных сетей" },
    { value: "product", label: "Описание товара", icon: FileText, description: "Коммерческое описание" },
    { value: "blog", label: "Блог-пост", icon: FileText, description: "Информационная статья" },
    { value: "press-release", label: "Пресс-релиз", icon: FileText, description: "Новостное сообщение" }
  ];

  const toneOptions = [
    { value: "professional", label: "Профессиональный" },
    { value: "friendly", label: "Дружелюбный" },
    { value: "formal", label: "Официальный" },
    { value: "casual", label: "Неформальный" },
    { value: "persuasive", label: "Убедительный" },
    { value: "informative", label: "Информативный" }
  ];

  const audienceOptions = [
    { value: "b2b", label: "B2B (бизнес)" },
    { value: "b2c", label: "B2C (потребители)" },
    { value: "experts", label: "Эксперты" },
    { value: "beginners", label: "Новички" },
    { value: "general", label: "Широкая аудитория" }
  ];

  const handleGenerate = async () => {
    await generateText({
      ...formData,
      length: formData.length[0] // Extract the first value from the array
    });
  };

  const handleRetryGeneration = () => {
    clearError();
    handleGenerate();
  };

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

      {/* API Key Setup */}
      <ApiKeySetup 
        onApiKeySet={setApiKey}
        hasApiKey={hasApiKey}
      />

      {/* Generation Progress */}
      <GenerationProgress
        isGenerating={isGenerating}
        error={error}
        onRetry={handleRetryGeneration}
      />

      {/* Main Interface - only show if API key is set */}
      {hasApiKey && (
        <TabNavigation
          formData={formData}
          setFormData={setFormData}
          generatedText={generatedText}
          setGeneratedText={setGeneratedText}
          isGenerating={isGenerating}
          onGenerate={handleGenerate}
          onApplyTemplate={handleApplyTemplate}
          onApplyPreset={handleApplyPreset}
          onSavePreset={handleSavePreset}
          onSelectPrompt={handleSelectPrompt}
          selectedContentType={selectedContentType}
          generationHistory={generationHistory}
          onSaveResult={handleSaveResult}
          onSelectHistoryResult={handleSelectHistoryResult}
          onSaveHistoryResult={handleSaveHistoryResult}
          onDeleteHistoryResult={handleDeleteHistoryResult}
        />
      )}
    </div>
  );
}
