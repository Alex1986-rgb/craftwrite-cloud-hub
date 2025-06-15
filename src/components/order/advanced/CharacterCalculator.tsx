
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Info, Calculator } from 'lucide-react';

interface CharacterCalculatorProps {
  serviceType: string;
  onCharacterCountChange: (count: number) => void;
  initialCount?: number;
}

const SERVICE_RECOMMENDATIONS = {
  'seo-article': { min: 5000, max: 15000, optimal: 8000 },
  'product-description': { min: 800, max: 2500, optimal: 1500 },
  'landing-page': { min: 12000, max: 35000, optimal: 20000 },
  'social-media': { min: 280, max: 1000, optimal: 500 },
  'email-campaign': { min: 2000, max: 6000, optimal: 3500 },
  'chatbot-scripts': { min: 3000, max: 10000, optimal: 6000 },
  'sales-letter': { min: 8000, max: 25000, optimal: 15000 },
  'press-release': { min: 2500, max: 5000, optimal: 3500 },
  'blog-post': { min: 4000, max: 12000, optimal: 7000 },
  'default': { min: 2000, max: 10000, optimal: 5000 }
};

export default function CharacterCalculator({ 
  serviceType, 
  onCharacterCountChange, 
  initialCount 
}: CharacterCalculatorProps) {
  const recommendations = SERVICE_RECOMMENDATIONS[serviceType as keyof typeof SERVICE_RECOMMENDATIONS] || SERVICE_RECOMMENDATIONS.default;
  const [characterCount, setCharacterCount] = useState(initialCount || recommendations.optimal);
  const [useSlider, setUseSlider] = useState(false);

  useEffect(() => {
    onCharacterCountChange(characterCount);
  }, [characterCount, onCharacterCountChange]);

  const handleSliderChange = (value: number[]) => {
    setCharacterCount(value[0]);
  };

  const handleInputChange = (value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 100 && numValue <= 100000) {
      setCharacterCount(numValue);
    }
  };

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

  const getReadingTime = () => {
    // Средняя скорость чтения: 1200-1500 символов в минуту (русский текст)
    return Math.ceil(characterCount / 1300);
  };

  const getWordsEstimate = () => {
    // Примерно 6-7 символов на слово в русском языке
    return Math.round(characterCount / 6.5);
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
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <Label htmlFor="character-count">Количество символов</Label>
            <button
              type="button"
              onClick={() => setUseSlider(!useSlider)}
              className="text-sm text-blue-600 hover:underline"
            >
              {useSlider ? 'Ввести точно' : 'Использовать слайдер'}
            </button>
          </div>

          {useSlider ? (
            <div className="space-y-2">
              <Slider
                value={[characterCount]}
                onValueChange={handleSliderChange}
                min={recommendations.min}
                max={recommendations.max}
                step={500}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{recommendations.min.toLocaleString()}</span>
                <span className="font-semibold">{characterCount.toLocaleString()}</span>
                <span>{recommendations.max.toLocaleString()}</span>
              </div>
            </div>
          ) : (
            <Input
              id="character-count"
              type="number"
              min="100"
              max="100000"
              value={characterCount}
              onChange={(e) => handleInputChange(e.target.value)}
              className="text-lg font-semibold"
            />
          )}
        </div>

        <div className={`p-3 rounded-lg border ${getRecommendationColor()}`}>
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4" />
            <span className="font-medium">Рекомендации для {serviceType}:</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <button
              type="button"
              onClick={() => handleRecommendationClick(recommendations.min)}
              className="p-2 bg-white rounded border hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium">Минимум</div>
              <div>{recommendations.min.toLocaleString()}</div>
            </button>
            <button
              type="button"
              onClick={() => handleRecommendationClick(recommendations.optimal)}
              className="p-2 bg-white rounded border hover:bg-gray-50 transition-colors ring-2 ring-blue-200"
            >
              <div className="font-medium">Оптимально</div>
              <div>{recommendations.optimal.toLocaleString()}</div>
            </button>
            <button
              type="button"
              onClick={() => handleRecommendationClick(recommendations.max)}
              className="p-2 bg-white rounded border hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium">Максимум</div>
              <div>{recommendations.max.toLocaleString()}</div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Примерно слов:</span>
            <Badge variant="secondary">
              ~{getWordsEstimate().toLocaleString()}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Время чтения:</span>
            <Badge variant="secondary">
              ~{getReadingTime()} мин
            </Badge>
          </div>
        </div>

        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
          <strong>Совет:</strong> Оптимальный объем учитывает требования поисковых систем и 
          удобство восприятия для читателей. Больше текста не всегда лучше для SEO.
        </div>
      </CardContent>
    </Card>
  );
}
