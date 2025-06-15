
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface QualityAnalysis {
  readabilityScore: number;
  seoScore: number;
  toneConsistency: number;
  keywordDensity: number;
}

interface QualityMetricsProps {
  analysis: QualityAnalysis;
}

export default function QualityMetrics({ analysis }: QualityMetricsProps) {
  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
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
  );
}
