
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart3, TrendingUp, Eye, AlertCircle } from 'lucide-react';
import QualityMetrics from './quality/QualityMetrics';
import QualityOverview from './quality/QualityOverview';
import QualityStats from './quality/QualityStats';

interface QualityAnalysis {
  readabilityScore: number;
  seoScore: number;
  toneConsistency: number;
  keywordDensity: number;
  suggestions: string[];
}

interface QualityAnalyzerProps {
  text: string;
  keywords?: string;
  onAnalyze: (text: string, keywords?: string) => Promise<QualityAnalysis>;
}

export default function QualityAnalyzer({ 
  text, 
  keywords, 
  onAnalyze 
}: QualityAnalyzerProps) {
  const [analysis, setAnalysis] = useState<QualityAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const result = await onAnalyze(text, keywords);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (!text.trim()) {
      setAnalysis(null);
      return;
    }

    const timer = setTimeout(() => {
      handleAnalyze();
    }, 1000);

    return () => clearTimeout(timer);
  }, [text, keywords]);

  if (!text.trim()) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-slate-500">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <p>Введите текст для анализа качества</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          Анализ качества
          {isAnalyzing && (
            <Badge variant="outline" className="animate-pulse">
              Анализирую...
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {analysis && (
          <>
            <QualityMetrics analysis={analysis} />
            <QualityOverview analysis={analysis} />

            {analysis.suggestions.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Рекомендации по улучшению
                </h4>
                {analysis.suggestions.map((suggestion, index) => (
                  <Alert key={index}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{suggestion}</AlertDescription>
                  </Alert>
                ))}
              </div>
            )}

            <QualityStats text={text} />
          </>
        )}

        <Button 
          onClick={handleAnalyze} 
          disabled={isAnalyzing || !text.trim()}
          variant="outline"
          className="w-full"
        >
          {isAnalyzing ? (
            <>
              <BarChart3 className="w-4 h-4 mr-2 animate-pulse" />
              Анализирую качество...
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Повторить анализ
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
