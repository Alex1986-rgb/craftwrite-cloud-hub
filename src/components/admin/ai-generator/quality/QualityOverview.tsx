
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle } from "lucide-react";

interface QualityAnalysis {
  readabilityScore: number;
  seoScore: number;
  toneConsistency: number;
}

interface QualityOverviewProps {
  analysis: QualityAnalysis;
}

export default function QualityOverview({ analysis }: QualityOverviewProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const avgScore = Math.round(
    (analysis.readabilityScore + analysis.seoScore + analysis.toneConsistency) / 3
  );

  return (
    <div className="p-4 bg-slate-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium">Общая оценка качества</span>
        <div className="flex items-center gap-2">
          {avgScore >= 80 ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-yellow-600" />
          )}
          <span className={`text-lg font-bold ${getScoreColor(avgScore)}`}>
            {avgScore}%
          </span>
        </div>
      </div>
      <Progress value={avgScore} className="h-3" />
    </div>
  );
}
