
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface UniquenessAnalysis {
  uniquenessScore: number;
  duplicateContent: number;
  commonPhrases: string[];
  originalityLevel: 'high' | 'medium' | 'low';
  potentialIssues: {
    type: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }[];
  recommendations: string[];
}

interface UniquenessAnalysisCardProps {
  analysis: UniquenessAnalysis;
}

export default function UniquenessAnalysisCard({ analysis }: UniquenessAnalysisCardProps) {
  const getUniquenessColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getOriginalityBadge = (level: string) => {
    switch (level) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOriginalityText = (level: string) => {
    switch (level) {
      case 'high': return 'Высокая';
      case 'medium': return 'Средняя';
      case 'low': return 'Низкая';
      default: return 'Неопределенная';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          Анализ уникальности
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Общий балл уникальности */}
        <div className="p-4 bg-indigo-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Уникальность текста</span>
            <Badge className={analysis.uniquenessScore >= 80 ? 'bg-green-100 text-green-800' : 
                              analysis.uniquenessScore >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}>
              {analysis.uniquenessScore}%
            </Badge>
          </div>
          <Progress value={analysis.uniquenessScore} className="h-3 mb-2" />
          <div className="flex items-center justify-between text-sm">
            <span>Оригинальность: 
              <Badge className={`ml-2 ${getOriginalityBadge(analysis.originalityLevel)}`}>
                {getOriginalityText(analysis.originalityLevel)}
              </Badge>
            </span>
            <span className="text-slate-600">
              Дублированный контент: {analysis.duplicateContent}%
            </span>
          </div>
        </div>

        {/* Потенциальные проблемы */}
        {analysis.potentialIssues.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Потенциальные проблемы</h4>
            <div className="space-y-2">
              {analysis.potentialIssues.map((issue, index) => (
                <Alert key={index} className={
                  issue.severity === 'high' ? 'border-red-200 bg-red-50' :
                  issue.severity === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                  'border-green-200 bg-green-50'
                }>
                  <div className="flex items-start gap-2">
                    {getSeverityIcon(issue.severity)}
                    <div className="flex-1">
                      <div className="font-medium text-sm">{issue.type}</div>
                      <AlertDescription className="text-xs mt-1">
                        {issue.description}
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {/* Часто встречающиеся фразы */}
        {analysis.commonPhrases.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Часто встречающиеся фразы</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.commonPhrases.slice(0, 6).map((phrase, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  "{phrase}"
                </Badge>
              ))}
              {analysis.commonPhrases.length > 6 && (
                <Badge variant="outline" className="text-xs">
                  +{analysis.commonPhrases.length - 6} еще
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Рекомендации */}
        {analysis.recommendations.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Рекомендации по улучшению</h4>
            <div className="space-y-2">
              {analysis.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-2 text-sm p-2 bg-blue-50 rounded">
                  <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>{recommendation}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
