
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Search, Plus, X } from 'lucide-react';

interface CompetitorAnalysisProps {
  onCompetitorAnalysisChange: (domains: string[]) => void;
}

export default function CompetitorAnalysis({ onCompetitorAnalysisChange }: CompetitorAnalysisProps) {
  const [competitorDomains, setCompetitorDomains] = useState<string[]>([]);
  const [newDomain, setNewDomain] = useState('');

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

  return (
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
  );
}
