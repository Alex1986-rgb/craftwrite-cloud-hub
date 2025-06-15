
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Sparkles, RefreshCw } from 'lucide-react';
import { enhancedQualityAnalysisService } from '@/services/enhancedQualityAnalysis';
import SeoAnalysisCard from './components/SeoAnalysisCard';
import ReadabilityAnalysisCard from './components/ReadabilityAnalysisCard';
import ToneAnalysisCard from './components/ToneAnalysisCard';
import UniquenessAnalysisCard from './components/UniquenessAnalysisCard';
import ConversionAnalysisCard from './components/ConversionAnalysisCard';

interface EnhancedQualityAnalyzerProps {
  text: string;
  keywords?: string;
}

export default function EnhancedQualityAnalyzer({ 
  text, 
  keywords 
}: EnhancedQualityAnalyzerProps) {
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const result = await enhancedQualityAnalysisService.analyzeText(text, keywords);
      setAnalysis(result);
    } catch (error) {
      console.error('Enhanced analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Автоматический анализ при изменении текста
  useEffect(() => {
    if (!text.trim()) {
      setAnalysis(null);
      return;
    }

    const timer = setTimeout(() => {
      handleAnalyze();
    }, 2000);

    return () => clearTimeout(timer);
  }, [text, keywords]);

  const getOverallScore = () => {
    if (!analysis) return 0;
    return Math.round((
      analysis.seo.metaScore +
      analysis.readability.fleschReadingEase +
      analysis.uniqueness.uniquenessScore +
      analysis.conversion.conversionScore
    ) / 4);
  };

  if (!text.trim()) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-slate-500">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <p>Введите текст для расширенного анализа качества</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Расширенный анализ качества
            {isAnalyzing && (
              <Badge variant="outline" className="animate-pulse">
                Анализирую...
              </Badge>
            )}
          </CardTitle>
          {analysis && (
            <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800">
              Общий балл: {getOverallScore()}%
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {analysis ? (
          <Tabs defaultValue="seo" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="readability">Читаемость</TabsTrigger>
              <TabsTrigger value="tone">Тональность</TabsTrigger>
              <TabsTrigger value="uniqueness">Уникальность</TabsTrigger>
              <TabsTrigger value="conversion">Конверсия</TabsTrigger>
            </TabsList>

            <TabsContent value="seo" className="mt-6">
              <SeoAnalysisCard 
                text={text}
                keywords={keywords}
                analysis={analysis.seo}
              />
            </TabsContent>

            <TabsContent value="readability" className="mt-6">
              <ReadabilityAnalysisCard analysis={analysis.readability} />
            </TabsContent>

            <TabsContent value="tone" className="mt-6">
              <ToneAnalysisCard analysis={analysis.tone} />
            </TabsContent>

            <TabsContent value="uniqueness" className="mt-6">
              <UniquenessAnalysisCard analysis={analysis.uniqueness} />
            </TabsContent>

            <TabsContent value="conversion" className="mt-6">
              <ConversionAnalysisCard analysis={analysis.conversion} />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-8">
            <RefreshCw className="w-8 h-8 mx-auto mb-4 text-slate-300 animate-spin" />
            <p className="text-slate-500">Выполняется анализ качества...</p>
          </div>
        )}

        <div className="mt-6">
          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing || !text.trim()}
            variant="outline"
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Анализирую...
              </>
            ) : (
              <>
                <BarChart3 className="w-4 h-4 mr-2" />
                Повторить анализ
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
