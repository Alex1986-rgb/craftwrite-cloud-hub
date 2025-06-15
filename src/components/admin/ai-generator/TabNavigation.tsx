
import { Tabs, TabsContent } from "@/components/ui/tabs";
import TabList from "./TabList";
import GenerationForm from "./GenerationForm";
import ResultDisplay from "./ResultDisplay";
import TemplateLibrary from "./TemplateLibrary";
import PresetManager from "./PresetManager";
import PromptLibrary from "./PromptLibrary";
import GenerationHistory from "./GenerationHistory";
import QuickPresets from "./QuickPresets";
import BatchGeneration from "./BatchGeneration";
import TextRefiner from "./TextRefiner";
import ExportManager from "./ExportManager";
import EnhancedQualityAnalyzer from "./EnhancedQualityAnalyzer";
import AIAssistantTab from "./AIAssistantTab";
import AdvancedPersonalization from "./AdvancedPersonalization";
import CompetitorAnalysis from "./CompetitorAnalysis";
import ABTestManager from "./ABTestManager";
import ConversionPredictor from "./ConversionPredictor";
import CMSIntegration from "./CMSIntegration";
import { TabNavigationProps } from "./types/TabNavigationTypes";

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
      <TabList />

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
        <EnhancedQualityAnalyzer
          text={generatedText}
          keywords={formData.keywords}
        />
      </TabsContent>

      <TabsContent value="assistant">
        <AIAssistantTab
          text={generatedText}
          textType={formData.textType}
          onApplyRecommendation={(id, suggestion) => {
            console.log('Applying recommendation:', id, suggestion);
          }}
        />
      </TabsContent>

      <TabsContent value="personalization">
        <AdvancedPersonalization />
      </TabsContent>

      <TabsContent value="competitors">
        <CompetitorAnalysis />
      </TabsContent>

      <TabsContent value="abtest">
        <ABTestManager />
      </TabsContent>

      <TabsContent value="prediction">
        <ConversionPredictor />
      </TabsContent>

      <TabsContent value="cms">
        <CMSIntegration />
      </TabsContent>

      <TabsContent value="export">
        <ExportManager
          text={generatedText}
          title={`Сгенерированный ${selectedContentType?.label || 'текст'}`}
          contentType={selectedContentType?.label}
        />
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
