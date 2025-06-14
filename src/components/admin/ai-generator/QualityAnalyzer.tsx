
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart3, TrendingUp, Eye, AlertCircle, CheckCircle } from 'lucide-react';

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

  // Автоматический анализ при изменении текста (с задержкой)
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

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
            {/* Основные метрики */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Читабельность</span>
                  <Badge className={getScoreBadge(analysis.readabilityScore)}>
                    {analysis.readabilityScore}%
                  </Badge>
                </div>
                <Progress value={analysis.readabilityScore} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">SEO-оптимизация</span>
                  <Badge className={getScoreBadge(analysis.seoScore)}>
                    {analysis.seoScore}%
                  </Badge>
                </div>
                <Progress value={analysis.seoScore} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Тон текста</span>
                  <Badge className={getScoreBadge(analysis.toneConsistency)}>
                    {analysis.toneConsistency}%
                  </Badge>
                </div>
                <Progress value={analysis.toneConsistency} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Плотность ключевых слов</span>
                  <Badge className={getScoreBadge(
                    analysis.keywordDensity >= 0.5 && analysis.keywordDensity <= 3 ? 80 : 40
                  )}>
                    {analysis.keywordDensity}%
                  </Badge>
                </div>
                <Progress 
                  value={Math.min(100, analysis.keywordDensity * 33)} 
                  className="h-2" 
                />
              </div>
            </div>

            {/* Общая оценка */}
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Общая оценка качества</span>
                <div className="flex items-center gap-2">
                  {(() => {
                    const avgScore = Math.round(
                      (analysis.readabilityScore + analysis.seoScore + analysis.toneConsistency) / 3
                    );
                    return (
                      <>
                        {avgScore >= 80 ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                        )}
                        <span className={`text-lg font-bold ${getScoreColor(avgScore)}`}>
                          {avgScore}%
                        </span>
                      </>
                    );
                  })()}
                </div>
              </div>
              <Progress 
                value={Math.round((analysis.readabilityScore + analysis.seoScore + analysis.toneConsistency) / 3)} 
                className="h-3" 
              />
            </div>

            {/* Рекомендации */}
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

            {/* Детальная статистика */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-900">{text.length}</div>
                <div className="text-sm text-blue-700">Символов</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-900">{text.split(' ').length}</div>
                <div className="text-sm text-blue-700">Слов</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-900">
                  {Math.round(text.split(' ').length / (text.split(/[.!?]+/).length - 1) || 0)}
                </div>
                <div className="text-sm text-blue-700">Слов/предложение</div>
              </div>
            </div>
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
