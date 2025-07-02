import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, TrendingUp } from 'lucide-react';

interface EstimateSummaryCardProps {
  keywordsCount: number;
  lsiKeywordsCount: number;
  sectionsCount: number;
  totalWordCount: number;
  estimatedPrice?: number;
  isComplete: boolean;
}

export default function EstimateSummaryCard({
  keywordsCount,
  lsiKeywordsCount,
  sectionsCount,
  totalWordCount,
  estimatedPrice,
  isComplete
}: EstimateSummaryCardProps) {
  const calculatedPrice = estimatedPrice || (totalWordCount * 3);

  if (!isComplete) return null;

  return (
    <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <Zap className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h4 className="font-semibold text-green-800">Предварительная оценка готова!</h4>
            <p className="text-sm text-green-600">Все основные параметры определены</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center p-3 bg-white/60 rounded-lg hover-scale">
            <div className="text-gray-600 text-xs uppercase tracking-wide">Ключевые слова</div>
            <div className="font-bold text-lg">{keywordsCount + lsiKeywordsCount}</div>
            {keywordsCount > 0 && (
              <Badge variant="secondary" className="text-xs mt-1">
                +{lsiKeywordsCount} LSI
              </Badge>
            )}
          </div>
          
          <div className="text-center p-3 bg-white/60 rounded-lg hover-scale">
            <div className="text-gray-600 text-xs uppercase tracking-wide">Разделов</div>
            <div className="font-bold text-lg">{sectionsCount}</div>
          </div>
          
          <div className="text-center p-3 bg-white/60 rounded-lg hover-scale">
            <div className="text-gray-600 text-xs uppercase tracking-wide">Объем</div>
            <div className="font-bold text-lg">{totalWordCount.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">слов</div>
          </div>
          
          <div className="text-center p-3 bg-white/60 rounded-lg hover-scale">
            <div className="text-gray-600 text-xs uppercase tracking-wide">Примерная цена</div>
            <div className="font-bold text-lg text-green-600 flex items-center justify-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {calculatedPrice.toLocaleString()}₽
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}