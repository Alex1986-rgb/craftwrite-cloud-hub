
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  BarChart3,
  Globe,
  Eye,
  Target
} from 'lucide-react';
import { enhancedOpenAIService } from '@/services/enhancedOpenAIService';

interface CompetitorData {
  domain: string;
  contentScore: number;
  keywordOverlap: string[];
  contentGaps: string[];
  strengths: string[];
  opportunities: string[];
}

export default function CompetitorAnalysis() {
  const [competitors, setCompetitors] = useState<CompetitorData[]>([]);
  const [industry, setIndustry] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!industry || !keywords) return;
    
    setIsAnalyzing(true);
    
    try {
      const keywordList = keywords.split(',').map(k => k.trim());
      const analysis = await enhancedOpenAIService.analyzeCompetitors(keywordList, industry);
      
      // Transform analysis into competitor data
      const competitorData: CompetitorData[] = analysis.competitors.map((domain, index) => ({
        domain,
        contentScore: Math.floor(Math.random() * 30) + 70,
        keywordOverlap: analysis.commonKeywords.slice(index, index + 3),
        contentGaps: analysis.contentGaps.slice(index, index + 2),
        strengths: ['SEO-оптимизация', 'Регулярность публикаций', 'Социальные сигналы'].slice(0, 2),
        opportunities: analysis.recommendations.slice(index, index + 2)
      }));
      
      setCompetitors(competitorData);
    } catch (error) {
      console.error('Competitor analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-red-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 85) return 'bg-red-100 text-red-800';
    if (score >= 75) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" />
            Анализ конкурентов
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Отрасль</label>
              <Input
                placeholder="Например: интернет-маркетинг, IT, образование"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Ключевые слова</label>
              <Input
                placeholder="копирайтинг, контент-маркетинг, SEO"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleAnalyze} 
            disabled={!industry || !keywords || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Анализируем конкурентов...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Проанализировать
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {competitors.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Найдено конкурентов</span>
                </div>
                <div className="text-2xl font-bold">{competitors.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Средний балл</span>
                </div>
                <div className="text-2xl font-bold">
                  {Math.round(competitors.reduce((sum, c) => sum + c.contentScore, 0) / competitors.length)}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">Возможности</span>
                </div>
                <div className="text-2xl font-bold">
                  {competitors.reduce((sum, c) => sum + c.opportunities.length, 0)}
                </div>
              </CardContent>
            </Card>
          </div>

          {competitors.map((competitor, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    {competitor.domain}
                  </CardTitle>
                  <Badge className={getScoreBadge(competitor.contentScore)}>
                    {competitor.contentScore}/100
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Контентная сила</span>
                    <span className={`text-sm font-medium ${getScoreColor(competitor.contentScore)}`}>
                      {competitor.contentScore}/100
                    </span>
                  </div>
                  <Progress value={competitor.contentScore} className="h-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="flex items-center gap-2 font-medium mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      Сильные стороны
                    </h4>
                    <div className="space-y-1">
                      {competitor.strengths.map((strength, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {strength}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 font-medium mb-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      Возможности
                    </h4>
                    <div className="space-y-1">
                      {competitor.opportunities.map((opportunity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Eye className="w-3 h-3 text-yellow-500" />
                          {opportunity}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Пересечение по ключевым словам</h4>
                  <div className="flex flex-wrap gap-1">
                    {competitor.keywordOverlap.map((keyword, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Контентные пробелы</h4>
                  <div className="flex flex-wrap gap-1">
                    {competitor.contentGaps.map((gap, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {gap}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
