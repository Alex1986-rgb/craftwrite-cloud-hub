import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Search, Users, Target, Zap, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import KeywordManager from './KeywordManager';
import ContentStructureBuilder from './ContentStructureBuilder';
import EstimateProgressIndicator from './EstimateProgressIndicator';
import EstimateSummaryCard from './EstimateSummaryCard';

interface ModernTechnicalTaskStepProps {
  formData: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function ModernTechnicalTaskStep({ 
  formData, 
  onUpdate, 
  onNext, 
  onPrevious 
}: ModernTechnicalTaskStepProps) {
  const [activeTab, setActiveTab] = useState('keywords');
  const [keywords, setKeywords] = useState<string[]>(formData.keywords || []);
  const [lsiKeywords, setLsiKeywords] = useState<string[]>(formData.lsiKeywords || []);
  const [contentStructure, setContentStructure] = useState(formData.contentStructure || []);
  const [competitorUrls, setCompetitorUrls] = useState<string[]>(formData.competitorUrls || []);
  const [targetAudience, setTargetAudience] = useState(formData.targetAudience || '');
  const [contentGoals, setContentGoals] = useState(formData.contentGoals || '');
  const [totalWordCount, setTotalWordCount] = useState(formData.totalWordCount || 3000);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // Auto-save functionality with debounce
  useEffect(() => {
    if (!autoSaveEnabled) return;
    
    const timeoutId = setTimeout(() => {
      const updatedData = {
        keywords,
        lsiKeywords,
        contentStructure,
        competitorUrls,
        targetAudience,
        contentGoals,
        totalWordCount
      };
      
      // Only save if there's actual data
      if (keywords.length > 0 || targetAudience.trim() || contentGoals.trim()) {
        onUpdate(updatedData);
        console.log('Auto-saved technical task data');
      }
    }, 2000); // Увеличили время до 2 секунд для меньшего количества сохранений

    return () => clearTimeout(timeoutId);
  }, [keywords, lsiKeywords, contentStructure, competitorUrls, targetAudience, contentGoals, totalWordCount, autoSaveEnabled, onUpdate]);

  const handleKeywordsChange = (newKeywords: string[], mode: 'client' | 'auto') => {
    console.log('Keywords updated:', newKeywords.length, 'keywords');
    setKeywords(newKeywords);
    onUpdate({ keywords: newKeywords, keywordMode: mode });
  };

  const handleLSIKeywordsChange = (newLSIKeywords: string[], mode: 'client' | 'auto') => {
    console.log('LSI Keywords updated:', newLSIKeywords.length, 'keywords');
    setLsiKeywords(newLSIKeywords);
    onUpdate({ lsiKeywords: newLSIKeywords, lsiKeywordMode: mode });
  };

  const handleCompetitorAnalysisChange = (urls: string[]) => {
    console.log('Competitor URLs updated:', urls.length, 'URLs');
    setCompetitorUrls(urls);
    onUpdate({ competitorUrls: urls });
  };

  const handleStructureChange = (structure: any[], wordCount: number) => {
    console.log('Content structure updated:', structure.length, 'sections,', wordCount, 'words');
    setContentStructure(structure);
    setTotalWordCount(wordCount);
    onUpdate({ 
      contentStructure: structure, 
      totalWordCount: wordCount 
    });
  };

  const handleTargetAudienceChange = (value: string) => {
    console.log('Target audience updated:', value.length, 'characters');
    setTargetAudience(value);
    onUpdate({ targetAudience: value });
  };

  const handleContentGoalsChange = (value: string) => {
    console.log('Content goals updated:', value.length, 'characters');
    setContentGoals(value);
    onUpdate({ contentGoals: value });
  };

  const isTabComplete = (tab: string) => {
    switch (tab) {
      case 'keywords':
        return keywords.length > 0;
      case 'structure':
        return contentStructure.length > 0;
      case 'audience':
        return targetAudience.trim().length > 20; // минимум 20 символов
      case 'goals':
        return contentGoals.trim().length > 20; // минимум 20 символов
      default:
        return false;
    }
  };

  const getTabCompletionStatus = (tab: string) => {
    const isComplete = isTabComplete(tab);
    const isEmpty = (() => {
      switch (tab) {
        case 'keywords': return keywords.length === 0;
        case 'structure': return contentStructure.length === 0;
        case 'audience': return targetAudience.trim().length === 0;
        case 'goals': return contentGoals.trim().length === 0;
        default: return true;
      }
    })();

    if (isComplete) return 'complete';
    if (isEmpty) return 'empty';
    return 'partial';
  };

  const completedTabs = ['keywords', 'structure', 'audience', 'goals'].filter(isTabComplete).length;
  const totalTabs = 4;
  const progressPercentage = (completedTabs / totalTabs) * 100;
  const isStepComplete = completedTabs >= 3; // минимум 3 из 4 табов

  const handleNext = () => {
    if (isStepComplete) {
      console.log('Moving to next step with technical task data:', {
        keywords: keywords.length,
        lsiKeywords: lsiKeywords.length,
        contentStructure: contentStructure.length,
        totalWordCount,
        targetAudience: targetAudience.length,
        contentGoals: contentGoals.length
      });
      onNext();
    } else {
      toast({
        title: "Необходимо заполнить больше разделов",
        description: `Заполните минимум 3 из 4 разделов (сейчас: ${completedTabs}/4)`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-semibold">Создание технического задания</h3>
        <p className="text-muted-foreground">
          Определите детали проекта для создания точной сметы
        </p>
        
        <EstimateProgressIndicator
          currentStep={3}
          totalSteps={5}
          completedTabs={completedTabs}
          totalTabs={totalTabs}
          isLoading={false}
        />

        {autoSaveEnabled && (
          <Alert className="max-w-md mx-auto">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Ваши данные автоматически сохраняются
            </AlertDescription>
          </Alert>
        )}
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Техническое задание
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50">
              {[
                { id: 'keywords', icon: Search, label: 'Ключевые слова' },
                { id: 'structure', icon: FileText, label: 'Структура' },
                { id: 'audience', icon: Users, label: 'Аудитория' },
                { id: 'goals', icon: Target, label: 'Цели' }
              ].map((tab) => {
                const status = getTabCompletionStatus(tab.id);
                return (
                  <TabsTrigger 
                    key={tab.id}
                    value={tab.id} 
                    className="relative data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                    
                    {status === 'complete' && (
                      <CheckCircle2 className="absolute -top-1 -right-1 w-4 h-4 text-green-600 bg-background rounded-full" />
                    )}
                    {status === 'partial' && (
                      <AlertCircle className="absolute -top-1 -right-1 w-4 h-4 text-yellow-600 bg-background rounded-full" />
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value="keywords" className="space-y-6">
              <KeywordManager
                onKeywordsChange={handleKeywordsChange}
                onLSIKeywordsChange={handleLSIKeywordsChange}
                onCompetitorAnalysisChange={handleCompetitorAnalysisChange}
                initialKeywords={keywords}
                initialLSIKeywords={lsiKeywords}
              />
            </TabsContent>

            <TabsContent value="structure" className="space-y-6">
              <ContentStructureBuilder
                onStructureChange={handleStructureChange}
                initialStructure={contentStructure}
                targetWordCount={3000}
              />
            </TabsContent>

            <TabsContent value="audience" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Целевая аудитория
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="target-audience" className="text-base font-medium">
                      Опишите вашу целевую аудиторию *
                    </Label>
                    <Textarea
                      id="target-audience"
                      value={targetAudience}
                      onChange={(e) => handleTargetAudienceChange(e.target.value)}
                      placeholder="Например: предприниматели 25-40 лет, интересующиеся автоматизацией бизнеса, со средним доходом от 100k рублей в месяц..."
                      className="min-h-32 mt-2"
                      required
                    />
                    <div className="mt-1 text-xs text-muted-foreground">
                      Символов: {targetAudience.length} (минимум 20)
                    </div>
                  </div>
                  
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-1 text-sm">
                        <div className="font-medium">💡 Что указать в описании аудитории:</div>
                        <div>• Возраст и пол</div>
                        <div>• Профессия или сфера деятельности</div>
                        <div>• Интересы и потребности</div>
                        <div>• Уровень дохода</div>
                        <div>• Проблемы, которые решает ваш продукт/услуга</div>
                        <div>• Где они ищут информацию (соцсети, поисковики, форумы)</div>
                      </div>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Цели контента
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="content-goals" className="text-base font-medium">
                      Какие цели должен достигать контент? *
                    </Label>
                    <Textarea
                      id="content-goals"
                      value={contentGoals}
                      onChange={(e) => handleContentGoalsChange(e.target.value)}
                      placeholder="Например: увеличить продажи услуг автоматизации на 30%, повысить узнаваемость бренда, привлечь 500 новых клиентов в месяц..."
                      className="min-h-32 mt-2"
                      required
                    />
                    <div className="mt-1 text-xs text-muted-foreground">
                      Символов: {contentGoals.length} (минимум 20)
                    </div>
                  </div>
                  
                  <Alert className="border-green-200 bg-green-50">
                    <Target className="h-4 w-4 text-green-600" />
                    <AlertDescription>
                      <div className="space-y-1 text-sm text-green-800">
                        <div className="font-medium">🎯 Примеры целей контента:</div>
                        <div>• Увеличить продажи на X%</div>
                        <div>• Привлечь новых клиентов</div>
                        <div>• Повысить узнаваемость бренда</div>
                        <div>• Улучшить позиции в поиске</div>
                        <div>• Увеличить трафик на сайт</div>
                        <div>• Стать экспертом в области</div>
                        <div>• Информировать аудиторию о продукте</div>
                      </div>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <EstimateSummaryCard
        keywordsCount={keywords.length}
        lsiKeywordsCount={lsiKeywords.length}
        sectionsCount={contentStructure.length}
        totalWordCount={totalWordCount}
        isComplete={isStepComplete}
      />

      {/* Навигация */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={onPrevious} className="flex-1">
          Назад
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!isStepComplete}
          className="flex-1"
          size="lg"
        >
          {isStepComplete ? (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Создать детальную смету
            </>
          ) : (
            <>
              Заполните {4 - completedTabs} раздел{4 - completedTabs === 1 ? '' : (4 - completedTabs < 5 ? 'а' : 'ов')}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}