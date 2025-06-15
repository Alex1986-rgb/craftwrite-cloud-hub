
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Zap, Users, DollarSign, Clock } from "lucide-react";

interface ConversionAnalysis {
  conversionScore: number;
  callToActionStrength: number;
  urgencyLevel: number;
  benefitClarity: number;
  socialProof: number;
  riskReduction: number;
  emotionalTriggers: string[];
  persuasionTechniques: {
    name: string;
    strength: number;
    description: string;
  }[];
  improvements: string[];
}

interface ConversionAnalysisCardProps {
  analysis: ConversionAnalysis;
}

export default function ConversionAnalysisCard({ analysis }: ConversionAnalysisCardProps) {
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

  const getTriggerIcon = (trigger: string) => {
    switch (trigger.toLowerCase()) {
      case 'дефицит': return '⏰';
      case 'авторитет': return '👑';
      case 'социальное доказательство': return '👥';
      case 'выгода': return '💰';
      case 'страх упустить': return '🔥';
      default: return '⚡';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          Конверсионный анализ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Общий конверсионный балл */}
        <div className="p-4 bg-emerald-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Конверсионный потенциал</span>
            <Badge className={getScoreBadge(analysis.conversionScore)}>
              {analysis.conversionScore}%
            </Badge>
          </div>
          <Progress value={analysis.conversionScore} className="h-3" />
        </div>

        {/* Ключевые метрики */}
        <div>
          <h4 className="font-medium mb-3">Ключевые метрики</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  CTA сила
                </span>
                <Badge variant="outline">{analysis.callToActionStrength}%</Badge>
              </div>
              <Progress value={analysis.callToActionStrength} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Срочность
                </span>
                <Badge variant="outline">{analysis.urgencyLevel}%</Badge>
              </div>
              <Progress value={analysis.urgencyLevel} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  Польза
                </span>
                <Badge variant="outline">{analysis.benefitClarity}%</Badge>
              </div>
              <Progress value={analysis.benefitClarity} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  Соц. доказательства
                </span>
                <Badge variant="outline">{analysis.socialProof}%</Badge>
              </div>
              <Progress value={analysis.socialProof} className="h-2" />
            </div>
          </div>
        </div>

        {/* Эмоциональные триггеры */}
        {analysis.emotionalTriggers.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Эмоциональные триггеры</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.emotionalTriggers.map((trigger, index) => (
                <Badge key={index} className="bg-purple-100 text-purple-800">
                  <span className="mr-1">{getTriggerIcon(trigger)}</span>
                  {trigger}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Техники убеждения */}
        {analysis.persuasionTechniques.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Техники убеждения</h4>
            <div className="space-y-3">
              {analysis.persuasionTechniques.map((technique, index) => (
                <div key={index} className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{technique.name}</span>
                    <Badge className={getScoreBadge(technique.strength)}>
                      {technique.strength}%
                    </Badge>
                  </div>
                  <Progress value={technique.strength} className="h-2 mb-2" />
                  <p className="text-xs text-slate-600">{technique.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Рекомендации по улучшению */}
        {analysis.improvements.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Рекомендации по улучшению</h4>
            <div className="space-y-2">
              {analysis.improvements.map((improvement, index) => (
                <div key={index} className="flex items-start gap-2 text-sm p-2 bg-emerald-50 rounded">
                  <TrendingUp className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{improvement}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
