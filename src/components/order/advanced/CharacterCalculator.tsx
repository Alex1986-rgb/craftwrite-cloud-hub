
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Info, Calculator } from 'lucide-react';

interface CharacterCalculatorProps {
  serviceType: string;
  onCharacterCountChange: (count: number) => void;
  initialCount?: number;
}

const SERVICE_RECOMMENDATIONS = {
  'seo-article': { min: 3000, max: 8000, optimal: 5000 },
  'product-description': { min: 500, max: 1500, optimal: 800 },
  'landing-page': { min: 8000, max: 20000, optimal: 12000 },
  'social-media': { min: 100, max: 500, optimal: 280 },
  'email-campaign': { min: 1000, max: 3000, optimal: 1500 },
  'chatbot-scripts': { min: 2000, max: 6000, optimal: 3500 },
  'default': { min: 1000, max: 5000, optimal: 2500 }
};

export default function CharacterCalculator({ 
  serviceType, 
  onCharacterCountChange, 
  initialCount 
}: CharacterCalculatorProps) {
  const recommendations = SERVICE_RECOMMENDATIONS[serviceType as keyof typeof SERVICE_RECOMMENDATIONS] || SERVICE_RECOMMENDATIONS.default;
  const [characterCount, setCharacterCount] = useState(initialCount || recommendations.optimal);

  useEffect(() => {
    onCharacterCountChange(characterCount);
  }, [characterCount, onCharacterCountChange]);

  const handleRecommendationClick = (count: number) => {
    setCharacterCount(count);
  };

  const getRecommendationLevel = () => {
    if (characterCount < recommendations.min) return 'low';
    if (characterCount > recommendations.max) return 'high';
    if (characterCount >= recommendations.optimal * 0.8 && characterCount <= recommendations.optimal * 1.2) return 'optimal';
    return 'good';
  };

  const getRecommendationColor = () => {
    const level = getRecommendationLevel();
    switch (level) {
      case 'optimal': return 'bg-green-100 text-green-800 border-green-300';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'low': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Объем текста (символы)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="character-count">Количество символов</Label>
          <Input
            id="character-count"
            type="number"
            min="100"
            max="50000"
            value={characterCount}
            onChange={(e) => setCharacterCount(Number(e.target.value))}
            className="text-lg font-semibold"
          />
        </div>

        <div className={`p-3 rounded-lg border ${getRecommendationColor()}`}>
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4" />
            <span className="font-medium">Рекомендации для {serviceType}:</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <button
              onClick={() => handleRecommendationClick(recommendations.min)}
              className="p-2 bg-white rounded border hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium">Минимум</div>
              <div>{recommendations.min.toLocaleString()}</div>
            </button>
            <button
              onClick={() => handleRecommendationClick(recommendations.optimal)}
              className="p-2 bg-white rounded border hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium">Оптимально</div>
              <div>{recommendations.optimal.toLocaleString()}</div>
            </button>
            <button
              onClick={() => handleRecommendationClick(recommendations.max)}
              className="p-2 bg-white rounded border hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium">Максимум</div>
              <div>{recommendations.max.toLocaleString()}</div>
            </button>
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Примерное время чтения:</span>
          <Badge variant="secondary">
            ~{Math.ceil(characterCount / 1200)} мин
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
