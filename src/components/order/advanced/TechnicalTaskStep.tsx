import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, Users, Target, Zap } from 'lucide-react';
import KeywordManager from './KeywordManager';
import ContentStructureBuilder from './ContentStructureBuilder';

interface TechnicalTaskStepProps {
  formData: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function TechnicalTaskStep({ 
  formData, 
  onUpdate, 
  onNext, 
  onPrevious 
}: TechnicalTaskStepProps) {
  const [activeTab, setActiveTab] = useState('keywords');
  const [keywords, setKeywords] = useState<string[]>(formData.keywords || []);
  const [lsiKeywords, setLsiKeywords] = useState<string[]>(formData.lsiKeywords || []);
  const [contentStructure, setContentStructure] = useState(formData.contentStructure || []);
  const [competitorUrls, setCompetitorUrls] = useState<string[]>(formData.competitorUrls || []);
  const [targetAudience, setTargetAudience] = useState(formData.targetAudience || '');
  const [contentGoals, setContentGoals] = useState(formData.contentGoals || '');
  const [totalWordCount, setTotalWordCount] = useState(formData.totalWordCount || 3000);

  const handleKeywordsChange = (newKeywords: string[], mode: 'client' | 'auto') => {
    setKeywords(newKeywords);
    onUpdate({ keywords: newKeywords, keywordMode: mode });
  };

  const handleLSIKeywordsChange = (newLSIKeywords: string[], mode: 'client' | 'auto') => {
    setLsiKeywords(newLSIKeywords);
    onUpdate({ lsiKeywords: newLSIKeywords, lsiKeywordMode: mode });
  };

  const handleCompetitorAnalysisChange = (urls: string[]) => {
    setCompetitorUrls(urls);
    onUpdate({ competitorUrls: urls });
  };

  const handleStructureChange = (structure: any[], wordCount: number) => {
    setContentStructure(structure);
    setTotalWordCount(wordCount);
    onUpdate({ 
      contentStructure: structure, 
      totalWordCount: wordCount 
    });
  };

  const handleTargetAudienceChange = (value: string) => {
    setTargetAudience(value);
    onUpdate({ targetAudience: value });
  };

  const handleContentGoalsChange = (value: string) => {
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
        return targetAudience.trim().length > 0;
      case 'goals':
        return contentGoals.trim().length > 0;
      default:
        return false;
    }
  };

  const completedTabs = ['keywords', 'structure', 'audience', 'goals'].filter(isTabComplete).length;
  const isStepComplete = completedTabs >= 3; // минимум 3 из 4 табов

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-semibold">Создание технического задания</h3>
        <p className="text-muted-foreground">
          Определите детали проекта для создания точной сметы
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <Badge variant={completedTabs >= 3 ? "default" : "secondary"} className="text-sm">
            Заполнено: {completedTabs}/4 разделов
          </Badge>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedTabs / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Техническое задание
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="keywords" className="relative">
                <Search className="w-4 h-4 mr-2" />
                Ключевые слова
                {isTabComplete('keywords') && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
                )}
              </TabsTrigger>
              
              <TabsTrigger value="structure" className="relative">
                <FileText className="w-4 h-4 mr-2" />
                Структура
                {isTabComplete('structure') && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
                )}
              </TabsTrigger>
              
              <TabsTrigger value="audience" className="relative">
                <Users className="w-4 h-4 mr-2" />
                Аудитория
                {isTabComplete('audience') && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
                )}
              </TabsTrigger>
              
              <TabsTrigger value="goals" className="relative">
                <Target className="w-4 h-4 mr-2" />
                Цели
                {isTabComplete('goals') && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
                )}
              </TabsTrigger>
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
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                    <div className="text-sm font-medium text-blue-800 mb-2">💡 Что указать в описании аудитории:</div>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div>• Возраст и пол</div>
                      <div>• Профессия или сфера деятельности</div>
                      <div>• Интересы и потребности</div>
                      <div>• Уровень дохода</div>
                      <div>• Проблемы, которые решает ваш продукт/услуга</div>
                      <div>• Где они ищут информацию (соцсети, поисковики, форумы)</div>
                    </div>
                  </div>
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
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 space-y-2">
                    <div className="text-sm font-medium text-green-800 mb-2">🎯 Примеры целей контента:</div>
                    <div className="text-sm text-green-700 space-y-1">
                      <div>• Увеличить продажи на X%</div>
                      <div>• Привлечь новых клиентов</div>
                      <div>• Повысить узнаваемость бренда</div>
                      <div>• Улучшить позиции в поиске</div>
                      <div>• Увеличить трафик на сайт</div>
                      <div>• Стать экспертом в области</div>
                      <div>• Информировать аудиторию о продукте</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Предварительный просмотр */}
      {isStepComplete && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">Предварительная оценка готова!</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-gray-600">Ключевые слова:</div>
                <div className="font-medium">{keywords.length + lsiKeywords.length}</div>
              </div>
              
              <div>
                <div className="text-gray-600">Разделов:</div>
                <div className="font-medium">{contentStructure.length}</div>
              </div>
              
              <div>
                <div className="text-gray-600">Объем:</div>
                <div className="font-medium">{totalWordCount.toLocaleString()} слов</div>
              </div>
              
              <div>
                <div className="text-gray-600">Примерная цена:</div>
                <div className="font-medium text-green-600">
                  {(totalWordCount * 3).toLocaleString()}₽
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Навигация */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={onPrevious} className="flex-1">
          Назад
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!isStepComplete}
          className="flex-1"
        >
          Создать детальную смету
        </Button>
      </div>
    </div>
  );
}