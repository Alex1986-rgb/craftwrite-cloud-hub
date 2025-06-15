
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Plus, X, Wand2 } from 'lucide-react';

interface KeywordManagerProps {
  onKeywordsChange: (keywords: string[], mode: 'client' | 'auto') => void;
  onCompetitorAnalysisChange: (domains: string[]) => void;
  initialKeywords?: string[];
  initialMode?: 'client' | 'auto';
}

export default function KeywordManager({ 
  onKeywordsChange, 
  onCompetitorAnalysisChange,
  initialKeywords = [],
  initialMode = 'client'
}: KeywordManagerProps) {
  const [mode, setMode] = useState<'client' | 'auto'>(initialMode);
  const [keywords, setKeywords] = useState<string[]>(initialKeywords);
  const [newKeyword, setNewKeyword] = useState('');
  const [competitorDomains, setCompetitorDomains] = useState<string[]>([]);
  const [newDomain, setNewDomain] = useState('');
  const [topicDescription, setTopicDescription] = useState('');

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      const updatedKeywords = [...keywords, newKeyword.trim()];
      setKeywords(updatedKeywords);
      onKeywordsChange(updatedKeywords, mode);
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    const updatedKeywords = keywords.filter(k => k !== keyword);
    setKeywords(updatedKeywords);
    onKeywordsChange(updatedKeywords, mode);
  };

  const addCompetitorDomain = () => {
    if (newDomain.trim() && competitorDomains.length < 5 && !competitorDomains.includes(newDomain.trim())) {
      const updatedDomains = [...competitorDomains, newDomain.trim()];
      setCompetitorDomains(updatedDomains);
      onCompetitorAnalysisChange(updatedDomains);
      setNewDomain('');
    }
  };

  const removeDomain = (domain: string) => {
    const updatedDomains = competitorDomains.filter(d => d !== domain);
    setCompetitorDomains(updatedDomains);
    onCompetitorAnalysisChange(updatedDomains);
  };

  const handleModeChange = (newMode: 'client' | 'auto') => {
    setMode(newMode);
    onKeywordsChange(keywords, newMode);
  };

  const handleTopicChange = (value: string) => {
    setTopicDescription(value);
    if (mode === 'auto') {
      onKeywordsChange([], mode);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Ключевые слова
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={mode === 'client' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleModeChange('client')}
            >
              Клиент предоставляет
            </Button>
            <Button
              type="button"
              variant={mode === 'auto' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleModeChange('auto')}
            >
              <Wand2 className="w-4 h-4 mr-1" />
              Мы подберем
            </Button>
          </div>

          {mode === 'client' && (
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
                  <Label>Добавленные ключевые слова:</Label>
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

          {mode === 'auto' && (
            <div className="space-y-2">
              <Label htmlFor="topic-description">Тематика контента</Label>
              <Textarea
                id="topic-description"
                value={topicDescription}
                onChange={(e) => handleTopicChange(e.target.value)}
                placeholder="Опишите тематику вашего контента, продукт или услугу. На основе этого мы подберем релевантные ключевые слова."
                rows={3}
              />
              <p className="text-xs text-gray-500">
                Наши специалисты проанализируют тематику и подберут оптимальные ключевые слова
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Анализ конкурентов
            <Badge variant="secondary" className="ml-2">Опционально</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Добавьте до 5 доменов конкурентов для анализа их ключевых слов и контент-стратегии
          </p>

          <div className="flex gap-2">
            <Input
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              placeholder="example.com"
              disabled={competitorDomains.length >= 5}
              onKeyPress={(e) => e.key === 'Enter' && addCompetitorDomain()}
            />
            <Button 
              type="button" 
              onClick={addCompetitorDomain} 
              size="sm"
              disabled={competitorDomains.length >= 5 || !newDomain.trim()}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {competitorDomains.length > 0 && (
            <div className="space-y-2">
              <Label>Домены для анализа ({competitorDomains.length}/5):</Label>
              <div className="space-y-2">
                {competitorDomains.map((domain, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                    <span className="text-sm">{domain}</span>
                    <button
                      type="button"
                      onClick={() => removeDomain(domain)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Что включает анализ:</strong>
                  <br />• Ключевые слова конкурентов
                  <br />• Структура контента
                  <br />• Мета-теги и заголовки
                  <br />• Рекомендации по улучшению
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
