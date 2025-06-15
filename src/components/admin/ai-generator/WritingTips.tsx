
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Target, 
  Zap, 
  Users, 
  TrendingUp,
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import { AIAssistantService } from '@/services/aiAssistantService';

interface WritingTipsProps {
  textType: string;
  currentText?: string;
}

export default function WritingTips({ textType, currentText = '' }: WritingTipsProps) {
  const [tips, setTips] = useState<string[]>([]);
  const [styleAnalysis, setStyleAnalysis] = useState<any>(null);
  const [checkedTips, setCheckedTips] = useState<Set<number>>(new Set());

  useEffect(() => {
    const newTips = AIAssistantService.getWritingTips(textType);
    setTips(newTips);
  }, [textType]);

  useEffect(() => {
    if (currentText.trim()) {
      const analysis = AIAssistantService.analyzeWritingStyle(currentText);
      setStyleAnalysis(analysis);
    }
  }, [currentText]);

  const toggleTipCheck = (index: number) => {
    setCheckedTips(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const getTypeSpecificIcon = () => {
    switch (textType) {
      case 'seo-article': return <Target className="w-5 h-5 text-green-600" />;
      case 'landing': return <Zap className="w-5 h-5 text-orange-600" />;
      case 'email': return <Users className="w-5 h-5 text-blue-600" />;
      case 'social': return <TrendingUp className="w-5 h-5 text-purple-600" />;
      default: return <BookOpen className="w-5 h-5 text-slate-600" />;
    }
  };

  const getComplexityBadgeColor = (complexity: string) => {
    switch (complexity) {
      case 'простой': return 'bg-green-100 text-green-800';
      case 'средний': return 'bg-yellow-100 text-yellow-800';
      case 'сложный': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getToneBadgeColor = (tone: string) => {
    switch (tone) {
      case 'формальный': return 'bg-blue-100 text-blue-800';
      case 'неформальный': return 'bg-purple-100 text-purple-800';
      case 'нейтральный': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getTypeSpecificIcon()}
          Советы по написанию
          <Badge variant="outline" className="ml-auto">
            {textType}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tips" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tips">Советы</TabsTrigger>
            <TabsTrigger value="analysis">Анализ стиля</TabsTrigger>
          </TabsList>

          <TabsContent value="tips" className="space-y-3 mt-4">
            <div className="space-y-2">
              {tips.map((tip, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    checkedTips.has(index) 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                  onClick={() => toggleTipCheck(index)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {checkedTips.has(index) ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                      )}
                    </div>
                    <span className={`text-sm ${
                      checkedTips.has(index) 
                        ? 'text-green-700 line-through' 
                        : 'text-slate-700'
                    }`}>
                      {tip}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center text-sm text-slate-600">
                <span>Прогресс: {checkedTips.size}/{tips.length}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCheckedTips(new Set())}
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Сбросить
                </Button>
              </div>
              {checkedTips.size > 0 && (
                <div className="mt-2 bg-green-100 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${(checkedTips.size / tips.length) * 100}%` }}
                  />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4 mt-4">
            {styleAnalysis ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <Badge className={getComplexityBadgeColor(styleAnalysis.complexity)}>
                      {styleAnalysis.complexity}
                    </Badge>
                    <p className="text-sm text-slate-600 mt-1">Сложность</p>
                  </div>
                  <div className="text-center">
                    <Badge className={getToneBadgeColor(styleAnalysis.tone)}>
                      {styleAnalysis.tone}
                    </Badge>
                    <p className="text-sm text-slate-600 mt-1">Тональность</p>
                  </div>
                </div>

                {styleAnalysis.suggestions.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Рекомендации по стилю:</h4>
                    {styleAnalysis.suggestions.map((suggestion: string, index: number) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-slate-500 py-8">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p>Введите текст для анализа стиля</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
