
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Eye, BarChart3 } from "lucide-react";

interface ReadabilityAnalysis {
  fleschKincaidScore: number;
  fleschReadingEase: number;
  averageWordsPerSentence: number;
  averageSyllablesPerWord: number;
  complexWords: number;
  passiveVoice: number;
  readingLevel: string;
  sentenceComplexity: 'low' | 'medium' | 'high';
}

interface ReadabilityAnalysisCardProps {
  analysis: ReadabilityAnalysis;
}

export default function ReadabilityAnalysisCard({ analysis }: ReadabilityAnalysisCardProps) {
  const getReadabilityColor = (score: number) => {
    if (score >= 60) return 'text-green-600';
    if (score >= 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-600" />
          Анализ читаемости
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Индекс Флеша */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Индекс удобочитаемости Флеша</span>
              <Badge className={analysis.fleschReadingEase >= 60 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {analysis.fleschReadingEase.toFixed(1)}
              </Badge>
            </div>
            <Progress value={Math.min(100, analysis.fleschReadingEase)} className="h-2" />
            <p className="text-xs text-slate-600 mt-1">
              {analysis.fleschReadingEase >= 90 ? 'Очень легко читать' :
               analysis.fleschReadingEase >= 80 ? 'Легко читать' :
               analysis.fleschReadingEase >= 70 ? 'Довольно легко читать' :
               analysis.fleschReadingEase >= 60 ? 'Стандартный уровень' :
               analysis.fleschReadingEase >= 50 ? 'Довольно трудно читать' :
               analysis.fleschReadingEase >= 30 ? 'Трудно читать' : 'Очень трудно читать'}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Уровень Флеша-Кинкейда</span>
              <Badge variant="outline">
                {analysis.fleschKincaidScore.toFixed(1)} класс
              </Badge>
            </div>
            <p className="text-xs text-slate-600">Уровень образования: {analysis.readingLevel}</p>
          </div>
        </div>

        {/* Структурный анализ */}
        <div>
          <h4 className="font-medium flex items-center gap-2 mb-3">
            <BarChart3 className="w-4 h-4" />
            Структурный анализ
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50 rounded">
              <div className="text-lg font-bold text-blue-900">{analysis.averageWordsPerSentence.toFixed(1)}</div>
              <div className="text-xs text-blue-700">Слов в предложении</div>
            </div>
            <div className="p-3 bg-purple-50 rounded">
              <div className="text-lg font-bold text-purple-900">{analysis.averageSyllablesPerWord.toFixed(1)}</div>
              <div className="text-xs text-purple-700">Слогов в слове</div>
            </div>
            <div className="p-3 bg-orange-50 rounded">
              <div className="text-lg font-bold text-orange-900">{analysis.complexWords}</div>
              <div className="text-xs text-orange-700">Сложных слов</div>
            </div>
            <div className="p-3 bg-red-50 rounded">
              <div className="text-lg font-bold text-red-900">{analysis.passiveVoice}%</div>
              <div className="text-xs text-red-700">Пассивный залог</div>
            </div>
          </div>
        </div>

        {/* Сложность предложений */}
        <div className="p-3 bg-slate-50 rounded">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Сложность предложений</span>
            <Badge className={getComplexityColor(analysis.sentenceComplexity)}>
              {analysis.sentenceComplexity === 'low' ? 'Низкая' :
               analysis.sentenceComplexity === 'medium' ? 'Средняя' : 'Высокая'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
