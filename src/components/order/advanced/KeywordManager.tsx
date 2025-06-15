
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Search, Wand2, Zap } from 'lucide-react';
import KeywordInput from './KeywordManager/KeywordInput';
import CompetitorAnalysis from './KeywordManager/CompetitorAnalysis';

interface KeywordManagerProps {
  onKeywordsChange: (keywords: string[], mode: 'client' | 'auto') => void;
  onCompetitorAnalysisChange: (domains: string[]) => void;
  onLSIKeywordsChange: (lsiKeywords: string[], mode: 'client' | 'auto') => void;
  initialKeywords?: string[];
  initialMode?: 'client' | 'auto';
  initialLSIKeywords?: string[];
}

export default function KeywordManager({ 
  onKeywordsChange, 
  onCompetitorAnalysisChange,
  onLSIKeywordsChange,
  initialKeywords = [],
  initialMode = 'client',
  initialLSIKeywords = []
}: KeywordManagerProps) {
  const [mode, setMode] = useState<'client' | 'auto'>(initialMode);
  const [keywords, setKeywords] = useState<string[]>(initialKeywords);
  const [topicDescription, setTopicDescription] = useState('');
  
  // LSI keywords state
  const [lsiMode, setLSIMode] = useState<'client' | 'auto'>('client');
  const [lsiKeywords, setLSIKeywords] = useState<string[]>(initialLSIKeywords);
  const [includeLSI, setIncludeLSI] = useState(false);

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

  const handleLSIModeChange = (newMode: 'client' | 'auto') => {
    setLSIMode(newMode);
    onLSIKeywordsChange(lsiKeywords, newMode);
  };

  const handleLSIKeywordsChange = (newLSIKeywords: string[]) => {
    setLSIKeywords(newLSIKeywords);
    onLSIKeywordsChange(newLSIKeywords, lsiMode);
  };

  return (
    <div className="space-y-6">
      {/* Main Keywords */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Основные ключевые слова
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

      {/* LSI Keywords */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              LSI-ключевые слова
              <Badge variant="secondary" className="ml-2">Опционально</Badge>
            </CardTitle>
            <Switch
              checked={includeLSI}
              onCheckedChange={setIncludeLSI}
            />
          </div>
        </CardHeader>
        {includeLSI && (
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              LSI-ключи (Latent Semantic Indexing) - семантически связанные слова, которые помогают поисковым системам лучше понять контекст
            </p>

            <div className="flex gap-2">
              <Button
                type="button"
                variant={lsiMode === 'client' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleLSIModeChange('client')}
              >
                Клиент предоставляет
              </Button>
              <Button
                type="button"
                variant={lsiMode === 'auto' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleLSIModeChange('auto')}
              >
                <Wand2 className="w-4 h-4 mr-1" />
                Автоматический подбор
              </Button>
            </div>

            {lsiMode === 'client' && (
              <KeywordInput 
                keywords={lsiKeywords}
                onKeywordsChange={handleLSIKeywordsChange}
              />
            )}

            {lsiMode === 'auto' && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Автоматический подбор LSI-ключей включает:</strong>
                  <br />• Семантически связанные термины
                  <br />• Синонимы и вариации основных ключей
                  <br />• Длинные хвосты (long tail keywords)
                  <br />• Отраслевую терминологию
                </p>
              </div>
            )}

            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
              <strong>Совет:</strong> LSI-ключи помогают тексту выглядеть более естественно для поисковых систем 
              и улучшают позиции по широкому спектру связанных запросов.
            </div>
          </CardContent>
        )}
      </Card>

      <CompetitorAnalysis onCompetitorAnalysisChange={onCompetitorAnalysisChange} />
    </div>
  );
}
