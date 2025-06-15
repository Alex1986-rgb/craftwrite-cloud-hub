
import ChatbotCharacterCalculator from '../advanced/ChatbotCharacterCalculator';
import ChatbotContentStructure from '../advanced/ChatbotContentStructure';
import ChatbotKeywordManager from '../advanced/ChatbotKeywordManager';
import ChatbotMetaDataManager from '../advanced/ChatbotMetaDataManager';

interface AdvancedStepProps {
  characterCount: number;
  contentQuestions: string[];
  keywords: string[];
  keywordMode: 'client' | 'auto';
  lsiKeywords: string[];
  competitorDomains: string[];
  metaData: any;
  onCharacterCountChange: (count: number) => void;
  onContentQuestionsChange: (questions: string[]) => void;
  onKeywordsChange: (keywords: string[], mode: 'client' | 'auto') => void;
  onLSIKeywordsChange: (keywords: string[], mode: 'client' | 'auto') => void;
  onCompetitorAnalysisChange: (domains: string[]) => void;
  onMetaDataChange: (metaData: any) => void;
}

export default function AdvancedStep({
  characterCount,
  contentQuestions,
  keywords,
  keywordMode,
  lsiKeywords,
  competitorDomains,
  metaData,
  onCharacterCountChange,
  onContentQuestionsChange,
  onKeywordsChange,
  onLSIKeywordsChange,
  onCompetitorAnalysisChange,
  onMetaDataChange
}: AdvancedStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Детальная настройка</h3>
        <p className="text-gray-600">Настройте параметры для идеального результата</p>
      </div>
      
      <ChatbotCharacterCalculator
        onCharacterCountChange={onCharacterCountChange}
        initialCount={characterCount}
      />
      
      <ChatbotContentStructure
        onQuestionsChange={onContentQuestionsChange}
        initialQuestions={contentQuestions}
      />
      
      <ChatbotKeywordManager
        onKeywordsChange={onKeywordsChange}
        onLSIKeywordsChange={onLSIKeywordsChange}
        onCompetitorAnalysisChange={onCompetitorAnalysisChange}
        initialKeywords={keywords}
        initialMode={keywordMode}
        initialLSIKeywords={lsiKeywords}
      />
      
      <ChatbotMetaDataManager
        onMetaDataChange={onMetaDataChange}
        initialMetaData={metaData}
      />
    </div>
  );
}
