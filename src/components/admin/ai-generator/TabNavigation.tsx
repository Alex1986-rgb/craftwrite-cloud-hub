import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, Library, Bookmark, MessageSquare, History } from "lucide-react";
import GenerationForm from "./GenerationForm";
import ResultDisplay from "./ResultDisplay";
import TemplateLibrary from "./TemplateLibrary";
import PresetManager from "./PresetManager";
import PromptLibrary from "./PromptLibrary";
import GenerationHistory from "./GenerationHistory";
import QuickPresets from "./QuickPresets";

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
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="generator" className="flex items-center gap-2">
          <Wand2 className="w-4 h-4" />
          Генератор
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
        {/* Добавляем QuickPresets в основную вкладку */}
        <QuickPresets onApplyPreset={onApplyPreset} />
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
