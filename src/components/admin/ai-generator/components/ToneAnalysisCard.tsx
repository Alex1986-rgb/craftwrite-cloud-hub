
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Zap, Shield, Star, TrendingUp } from "lucide-react";

interface ToneAnalysis {
  emotionalTone: {
    positive: number;
    negative: number;
    neutral: number;
  };
  brandAlignment: number;
  persuasionLevel: number;
  urgency: number;
  trust: number;
  dominantEmotion: string;
  communicationStyle: 'formal' | 'informal' | 'professional' | 'friendly' | 'authoritative';
  targetAudienceMatch: number;
}

interface ToneAnalysisCardProps {
  analysis: ToneAnalysis;
}

export default function ToneAnalysisCard({ analysis }: ToneAnalysisCardProps) {
  const getEmotionIcon = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case 'радость': return '😊';
      case 'доверие': return '🤝';
      case 'волнение': return '⚡';
      case 'спокойствие': return '😌';
      case 'энтузиазм': return '🚀';
      default: return '😐';
    }
  };

  const getStyleColor = (style: string) => {
    switch (style) {
      case 'formal': return 'bg-blue-100 text-blue-800';
      case 'informal': return 'bg-green-100 text-green-800';
      case 'professional': return 'bg-purple-100 text-purple-800';
      case 'friendly': return 'bg-orange-100 text-orange-800';
      case 'authoritative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStyleName = (style: string) => {
    switch (style) {
      case 'formal': return 'Формальный';
      case 'informal': return 'Неформальный';
      case 'professional': return 'Профессиональный';
      case 'friendly': return 'Дружелюбный';
      case 'authoritative': return 'Авторитетный';
      default: return 'Нейтральный';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-600" />
          Анализ тональности
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Эмоциональная окраска */}
        <div>
          <h4 className="font-medium mb-3">Эмоциональная окраска</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Позитивная</span>
              <div className="flex items-center gap-2">
                <Progress value={analysis.emotionalTone.positive} className="w-20 h-2" />
                <Badge className="bg-green-100 text-green-800 text-xs">
                  {analysis.emotionalTone.positive}%
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Негативная</span>
              <div className="flex items-center gap-2">
                <Progress value={analysis.emotionalTone.negative} className="w-20 h-2" />
                <Badge className="bg-red-100 text-red-800 text-xs">
                  {analysis.emotionalTone.negative}%
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Нейтральная</span>
              <div className="flex items-center gap-2">
                <Progress value={analysis.emotionalTone.neutral} className="w-20 h-2" />
                <Badge className="bg-gray-100 text-gray-800 text-xs">
                  {analysis.emotionalTone.neutral}%
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Доминирующая эмоция */}
        <div className="p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Доминирующая эмоция</span>
            <div className="flex items-center gap-2">
              <span className="text-lg">{getEmotionIcon(analysis.dominantEmotion)}</span>
              <Badge variant="outline">{analysis.dominantEmotion}</Badge>
            </div>
          </div>
        </div>

        {/* Стиль коммуникации */}
        <div className="p-3 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Стиль коммуникации</span>
            <Badge className={getStyleColor(analysis.communicationStyle)}>
              {getStyleName(analysis.communicationStyle)}
            </Badge>
          </div>
        </div>

        {/* Метрики влияния */}
        <div>
          <h4 className="font-medium flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4" />
            Метрики влияния
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Убедительность
                </span>
                <Badge variant="outline">{analysis.persuasionLevel}%</Badge>
              </div>
              <Progress value={analysis.persuasionLevel} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Доверие
                </span>
                <Badge variant="outline">{analysis.trust}%</Badge>
              </div>
              <Progress value={analysis.trust} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Соответствие бренду
                </span>
                <Badge variant="outline">{analysis.brandAlignment}%</Badge>
              </div>
              <Progress value={analysis.brandAlignment} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Целевая аудитория</span>
                <Badge variant="outline">{analysis.targetAudienceMatch}%</Badge>
              </div>
              <Progress value={analysis.targetAudienceMatch} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
