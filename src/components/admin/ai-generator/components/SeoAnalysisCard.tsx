
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Target, Hash, Link } from "lucide-react";

interface SeoAnalysis {
  keywordDensity: Record<string, number>;
  metaScore: number;
  structureScore: number;
  headingStructure: {
    h1Count: number;
    h2Count: number;
    h3Count: number;
  };
  internalLinks: number;
  externalLinks: number;
  imageAltTags: number;
  readingTime: number;
}

interface SeoAnalysisCardProps {
  text: string;
  keywords?: string;
  analysis: SeoAnalysis;
}

export default function SeoAnalysisCard({ text, keywords, analysis }: SeoAnalysisCardProps) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-600" />
          SEO Анализ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Общий SEO балл */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Общий SEO балл</span>
            <Badge className={getScoreBadge(analysis.metaScore)}>
              {analysis.metaScore}%
            </Badge>
          </div>
          <Progress value={analysis.metaScore} className="h-2" />
        </div>

        {/* Плотность ключевых слов */}
        <div>
          <h4 className="font-medium flex items-center gap-2 mb-3">
            <Hash className="w-4 h-4" />
            Плотность ключевых слов
          </h4>
          {Object.entries(analysis.keywordDensity).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(analysis.keywordDensity).map(([keyword, density]) => (
                <div key={keyword} className="flex items-center justify-between">
                  <span className="text-sm">{keyword}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={Math.min(100, density * 33)} className="w-16 h-2" />
                    <Badge variant="outline" className="text-xs">
                      {density.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Ключевые слова не указаны</p>
          )}
        </div>

        {/* Структура заголовков */}
        <div>
          <h4 className="font-medium flex items-center gap-2 mb-3">
            <Target className="w-4 h-4" />
            Структура заголовков
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-slate-50 rounded">
              <div className="text-lg font-bold text-slate-900">{analysis.headingStructure.h1Count}</div>
              <div className="text-xs text-slate-600">H1</div>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded">
              <div className="text-lg font-bold text-slate-900">{analysis.headingStructure.h2Count}</div>
              <div className="text-xs text-slate-600">H2</div>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded">
              <div className="text-lg font-bold text-slate-900">{analysis.headingStructure.h3Count}</div>
              <div className="text-xs text-slate-600">H3</div>
            </div>
          </div>
        </div>

        {/* Ссылки */}
        <div>
          <h4 className="font-medium flex items-center gap-2 mb-3">
            <Link className="w-4 h-4" />
            Анализ ссылок
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 rounded">
              <div className="text-lg font-bold text-green-900">{analysis.internalLinks}</div>
              <div className="text-xs text-green-700">Внутренние ссылки</div>
            </div>
            <div className="p-3 bg-purple-50 rounded">
              <div className="text-lg font-bold text-purple-900">{analysis.externalLinks}</div>
              <div className="text-xs text-purple-700">Внешние ссылки</div>
            </div>
          </div>
        </div>

        {/* Время чтения */}
        <div className="p-3 bg-amber-50 rounded flex items-center justify-between">
          <span className="text-sm font-medium text-amber-800">Время чтения</span>
          <Badge className="bg-amber-100 text-amber-800">
            {analysis.readingTime} мин
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
