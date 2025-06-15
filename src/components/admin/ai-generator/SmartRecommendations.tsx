
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Lightbulb, 
  Target, 
  TrendingUp, 
  BookOpen, 
  CheckCircle, 
  AlertTriangle,
  Info,
  Zap
} from 'lucide-react';
import { AIAssistantService } from '@/services/aiAssistantService';

interface SmartRecommendation {
  id: string;
  type: 'improvement' | 'optimization' | 'learning' | 'style';
  title: string;
  description: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  category: 'seo' | 'readability' | 'conversion' | 'style' | 'structure';
  suggestion: string;
  example?: string;
  learnMore?: string;
}

interface SmartRecommendationsProps {
  text: string;
  textType: string;
  qualityAnalysis?: any;
  onApplyRecommendation?: (recommendationId: string, suggestion: string) => void;
}

export default function SmartRecommendations({ 
  text, 
  textType, 
  qualityAnalysis,
  onApplyRecommendation 
}: SmartRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([]);
  const [appliedRecommendations, setAppliedRecommendations] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (text.trim()) {
      const newRecommendations = AIAssistantService.generateSmartRecommendations(
        text, 
        textType, 
        qualityAnalysis
      );
      setRecommendations(newRecommendations);
    }
  }, [text, textType, qualityAnalysis]);

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'high': return <TrendingUp className="w-4 h-4 text-orange-600" />;
      case 'medium': return <Target className="w-4 h-4 text-yellow-600" />;
      case 'low': return <Info className="w-4 h-4 text-blue-600" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getImportanceBadgeColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <Zap className="w-4 h-4" />;
      case 'learning': return <BookOpen className="w-4 h-4" />;
      case 'improvement': return <TrendingUp className="w-4 h-4" />;
      case 'style': return <Target className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const handleApplyRecommendation = (recommendation: SmartRecommendation) => {
    if (onApplyRecommendation) {
      onApplyRecommendation(recommendation.id, recommendation.suggestion);
    }
    setAppliedRecommendations(prev => new Set(prev).add(recommendation.id));
  };

  if (recommendations.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-slate-500">
          <Lightbulb className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <p>Введите текст для получения умных рекомендаций</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          Умные рекомендации
          <Badge variant="outline" className="ml-auto">
            {recommendations.length} советов
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((recommendation) => {
          const isApplied = appliedRecommendations.has(recommendation.id);
          
          return (
            <Alert key={recommendation.id} className={`relative ${isApplied ? 'bg-green-50' : ''}`}>
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-2 mt-1">
                  {getImportanceIcon(recommendation.importance)}
                  {getTypeIcon(recommendation.type)}
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{recommendation.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge className={getImportanceBadgeColor(recommendation.importance)}>
                        {recommendation.importance}
                      </Badge>
                      {isApplied && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  </div>
                  
                  <AlertDescription className="text-sm text-slate-600">
                    {recommendation.description}
                  </AlertDescription>
                  
                  <div className="bg-slate-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-slate-700 mb-1">
                      Рекомендация:
                    </p>
                    <p className="text-sm text-slate-600">
                      {recommendation.suggestion}
                    </p>
                  </div>

                  {recommendation.example && (
                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="text-sm font-medium text-blue-700 mb-1">
                        Пример:
                      </p>
                      <p className="text-sm text-blue-600 font-mono">
                        {recommendation.example}
                      </p>
                    </div>
                  )}

                  {recommendation.learnMore && (
                    <div className="bg-yellow-50 p-3 rounded-md">
                      <p className="text-sm font-medium text-yellow-700 mb-1">
                        Узнать больше:
                      </p>
                      <p className="text-sm text-yellow-600">
                        {recommendation.learnMore}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant={isApplied ? "secondary" : "default"}
                      onClick={() => handleApplyRecommendation(recommendation)}
                      disabled={isApplied}
                    >
                      {isApplied ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Применено
                        </>
                      ) : (
                        'Применить'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Alert>
          );
        })}
      </CardContent>
    </Card>
  );
}
