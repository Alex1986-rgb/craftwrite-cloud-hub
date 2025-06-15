
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Search, Wand2 } from 'lucide-react';
import KeywordInput from './KeywordManager/KeywordInput';
import CompetitorAnalysis from './KeywordManager/CompetitorAnalysis';

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
  const [topicDescription, setTopicDescription] = useState('');

  const handleModeChange = (newMode: 'client' | 'auto') => {
    setMode(newMode);
    onKeywordsChange(keywords, newMode);
  };

  const handleKeywordsChange = (newKeywords: string[]) => {
    setKeywords(newKeywords);
    onKeywordsChange(newKeywords, mode);
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
            <KeywordInput 
              keywords={keywords}
              onKeywordsChange={handleKeywordsChange}
            />
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

      <CompetitorAnalysis onCompetitorAnalysisChange={onCompetitorAnalysisChange} />
    </div>
  );
}
