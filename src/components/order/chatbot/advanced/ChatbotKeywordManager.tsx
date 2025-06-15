
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Key, Search, Plus, X, Bot } from 'lucide-react';
import CompetitorAnalysis from '../../advanced/KeywordManager/CompetitorAnalysis';

interface ChatbotKeywordManagerProps {
  onKeywordsChange: (keywords: string[], mode: 'client' | 'auto') => void;
  onLSIKeywordsChange: (keywords: string[], mode: 'client' | 'auto') => void;
  onCompetitorAnalysisChange: (domains: string[]) => void;
  initialKeywords?: string[];
  initialMode?: 'client' | 'auto';
  initialLSIKeywords?: string[];
}

export default function ChatbotKeywordManager({
  onKeywordsChange,
  onLSIKeywordsChange,
  onCompetitorAnalysisChange,
  initialKeywords = [],
  initialMode = 'client',
  initialLSIKeywords = []
}: ChatbotKeywordManagerProps) {
  const [keywordMode, setKeywordMode] = useState<'client' | 'auto'>(initialMode);
  const [keywords, setKeywords] = useState<string[]>(initialKeywords);
  const [newKeyword, setNewKeyword] = useState('');
  
  const [lsiMode, setLSIMode] = useState<'client' | 'auto'>('client');
  const [lsiKeywords, setLSIKeywords] = useState<string[]>(initialLSIKeywords);
  const [newLSIKeyword, setNewLSIKeyword] = useState('');

  const handleKeywordModeChange = (isAuto: boolean) => {
    const mode = isAuto ? 'auto' : 'client';
    setKeywordMode(mode);
    onKeywordsChange(keywords, mode);
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      const updated = [...keywords, newKeyword.trim()];
      setKeywords(updated);
      onKeywordsChange(updated, keywordMode);
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    const updated = keywords.filter(k => k !== keyword);
    setKeywords(updated);
    onKeywordsChange(updated, keywordMode);
  };

  const handleLSIModeChange = (isAuto: boolean) => {
    const mode = isAuto ? 'auto' : 'client';
    setLSIMode(mode);
    onLSIKeywordsChange(lsiKeywords, mode);
  };

  const addLSIKeyword = () => {
    if (newLSIKeyword.trim() && !lsiKeywords.includes(newLSIKeyword.trim())) {
      const updated = [...lsiKeywords, newLSIKeyword.trim()];
      setLSIKeywords(updated);
      onLSIKeywordsChange(updated, lsiMode);
      setNewLSIKeyword('');
    }
  };

  const removeLSIKeyword = (keyword: string) => {
    const updated = lsiKeywords.filter(k => k !== keyword);
    setLSIKeywords(updated);
    onLSIKeywordsChange(updated, lsiMode);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="w-5 h-5" />
          Ключевые слова для чат-бота
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="keywords" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="keywords">Основные ключи</TabsTrigger>
            <TabsTrigger value="lsi">LSI ключи</TabsTrigger>
            <TabsTrigger value="competitors">Конкуренты</TabsTrigger>
          </TabsList>

          <TabsContent value="keywords" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="keyword-mode">Мы подбираем ключевые слова</Label>
              <Switch
                id="keyword-mode"
                checked={keywordMode === 'auto'}
                onCheckedChange={handleKeywordModeChange}
              />
            </div>

            {keywordMode === 'auto' ? (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Автоматический подбор ключевых слов</span>
                </div>
                <p className="text-sm text-blue-700">
                  Наши специалисты проанализируют вашу нишу и подберут оптимальные ключевые слова для чат-бота. 
                  Мы учтем специфику мессенджеров и поведение пользователей.
                </p>
                <ul className="text-sm text-blue-600 mt-2 space-y-1">
                  <li>• Анализ ниши и конкурентов</li>
                  <li>• Подбор триггерных фраз для ботов</li>
                  <li>• Оптимизация под алгоритмы мессенджеров</li>
                </ul>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Добавить ключевое слово"
                    onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                  />
                  <Button type="button" onClick={addKeyword} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {keywords.length > 0 && (
                  <div className="space-y-2">
                    <Label>Ваши ключевые слова ({keywords.length}):</Label>
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {keyword}
                          <button
                            type="button"
                            onClick={() => removeKeyword(keyword)}
                            className="ml-1 hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="lsi" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="lsi-mode">Мы подбираем LSI ключи</Label>
              <Switch
                id="lsi-mode"
                checked={lsiMode === 'auto'}
                onCheckedChange={handleLSIModeChange}
              />
            </div>

            {lsiMode === 'auto' ? (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">Автоматический подбор LSI ключей</span>
                </div>
                <p className="text-sm text-green-700">
                  LSI (Latent Semantic Indexing) ключи помогают боту лучше понимать контекст и намерения пользователей.
                  Мы подберем семантически связанные слова и фразы.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newLSIKeyword}
                    onChange={(e) => setNewLSIKeyword(e.target.value)}
                    placeholder="Добавить LSI ключ"
                    onKeyPress={(e) => e.key === 'Enter' && addLSIKeyword()}
                  />
                  <Button type="button" onClick={addLSIKeyword} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {lsiKeywords.length > 0 && (
                  <div className="space-y-2">
                    <Label>LSI ключевые слова ({lsiKeywords.length}):</Label>
                    <div className="flex flex-wrap gap-2">
                      {lsiKeywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          {keyword}
                          <button
                            type="button"
                            onClick={() => removeLSIKeyword(keyword)}
                            className="ml-1 hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="competitors">
            <CompetitorAnalysis onCompetitorAnalysisChange={onCompetitorAnalysisChange} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
