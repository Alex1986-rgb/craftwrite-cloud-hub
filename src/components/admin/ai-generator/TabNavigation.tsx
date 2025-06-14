
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, Library, Bookmark, MessageSquare, History, Zap, Edit3, BarChart3 } from "lucide-react";
import GenerationForm from "./GenerationForm";
import ResultDisplay from "./ResultDisplay";
import TemplateLibrary from "./TemplateLibrary";
import PresetManager from "./PresetManager";
import PromptLibrary from "./PromptLibrary";
import GenerationHistory from "./GenerationHistory";
import QuickPresets from "./QuickPresets";
import BatchGeneration from "./BatchGeneration";
import TextRefiner from "./TextRefiner";
import QualityAnalyzer from "./QualityAnalyzer";

interface FormData {
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

interface TabNavigationProps {
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

export default function TabNavigation({
  formData,
  setFormData,
  generatedText,
  setGeneratedText,
  isGenerating,
  onGenerate,
  onBatchGenerate,
  onRefineText,
  onAnalyzeQuality,
  onApplyTemplate,
  onApplyPreset,
  onSavePreset,
  onSelectPrompt,
  selectedContentType,
  generationHistory,
  onSaveResult,
  onSelectHistoryResult,
  onSaveHistoryResult,
  onDeleteHistoryResult
}: TabNavigationProps) {
  return (
    <Tabs defaultValue="generator" className="w-full">
      <TabsList className="grid w-full grid-cols-8">
        <TabsTrigger value="generator" className="flex items-center gap-2">
          <Wand2 className="w-4 h-4" />
          Генератор
        </TabsTrigger>
        <TabsTrigger value="batch" className="flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Пакетная
        </TabsTrigger>
        <TabsTrigger value="refiner" className="flex items-center gap-2">
          <Edit3 className="w-4 h-4" />
          Доработка
        </TabsTrigger>
        <TabsTrigger value="analyzer" className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Анализ
        </TabsTrigger>
        <TabsTrigger value="templates" className="flex items-center gap-2">
          <Library className="w-4 h-4" />
          Шаблоны
        </TabsTrigger>
        <TabsTrigger value="presets" className="flex items-center gap-2">
          <Bookmark className="w-4 h-4" />
          Пресеты
        </TabsTrigger>
        <TabsTrigger value="prompts" className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Промпты
        </TabsTrigger>
        <TabsTrigger value="history" className="flex items-center gap-2">
          <History className="w-4 h-4" />
          История
        </TabsTrigger>
      </TabsList>

      <TabsContent value="generator" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GenerationForm
            formData={formData}
            setFormData={setFormData}
            onGenerate={onGenerate}
            isGenerating={isGenerating}
          />
          <ResultDisplay
            generatedText={generatedText}
            setGeneratedText={setGeneratedText}
            selectedContentType={selectedContentType}
            formData={formData}
            onSaveResult={onSaveResult}
            onRegenerate={onGenerate}
          />
        </div>
        <QuickPresets onApplyPreset={onApplyPreset} />
      </TabsContent>

      <TabsContent value="batch">
        {onBatchGenerate && (
          <BatchGeneration
            formData={formData}
            onGenerate={onBatchGenerate}
            isGenerating={isGenerating}
          />
        )}
      </TabsContent>

      <TabsContent value="refiner">
        {onRefineText && (
          <TextRefiner
            initialText={generatedText}
            onRefine={onRefineText}
            isRefining={isGenerating}
          />
        )}
      </TabsContent>

      <TabsContent value="analyzer">
        {onAnalyzeQuality && (
          <QualityAnalyzer
            text={generatedText}
            keywords={formData.keywords}
            onAnalyze={onAnalyzeQuality}
          />
        )}
      </TabsContent>

      <TabsContent value="templates">
        <TemplateLibrary onApplyTemplate={onApplyTemplate} />
      </TabsContent>

      <TabsContent value="presets">
        <PresetManager
          currentSettings={formData}
          onApplyPreset={onApplyPreset}
          onSavePreset={onSavePreset}
        />
      </TabsContent>

      <TabsContent value="prompts">
        <PromptLibrary onSelectPrompt={onSelectPrompt} />
      </TabsContent>

      <TabsContent value="history">
        <GenerationHistory
          history={generationHistory}
          onSelectResult={onSelectHistoryResult}
          onSaveResult={onSaveHistoryResult}
          onDeleteResult={onDeleteHistoryResult}
        />
      </TabsContent>
    </Tabs>
  );
}
