
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { MessageSquare, Calculator, Target } from 'lucide-react';

interface ChatbotCharacterCalculatorProps {
  onCharacterCountChange: (count: number) => void;
  initialCount?: number;
}

export default function ChatbotCharacterCalculator({ 
  onCharacterCountChange, 
  initialCount = 3000 
}: ChatbotCharacterCalculatorProps) {
  const [characterCount, setCharacterCount] = useState(initialCount);
  const [isManualInput, setIsManualInput] = useState(false);
  const [manualInput, setManualInput] = useState(initialCount.toString());

  useEffect(() => {
    onCharacterCountChange(characterCount);
  }, [characterCount, onCharacterCountChange]);

  const getScriptComplexity = (count: number) => {
    if (count <= 2000) return { level: 'Простой', color: 'bg-green-100 text-green-800', dialogs: '5-10' };
    if (count <= 5000) return { level: 'Средний', color: 'bg-blue-100 text-blue-800', dialogs: '10-25' };
    return { level: 'Сложный', color: 'bg-purple-100 text-purple-800', dialogs: '25-50' };
  };

  const handleSliderChange = (value: number[]) => {
    setCharacterCount(value[0]);
    setManualInput(value[0].toString());
  };

  const handleManualInputChange = (value: string) => {
    setManualInput(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 1000 && numValue <= 20000) {
      setCharacterCount(numValue);
    }
  };

  const complexity = getScriptComplexity(characterCount);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Объем скриптов чат-бота
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="manual-input">Ручной ввод количества символов</Label>
          <Switch
            id="manual-input"
            checked={isManualInput}
            onCheckedChange={setIsManualInput}
          />
        </div>

        {isManualInput ? (
          <div className="space-y-2">
            <Label>Количество символов (1000-20000)</Label>
            <Input
              type="number"
              value={manualInput}
              onChange={(e) => handleManualInputChange(e.target.value)}
              min={1000}
              max={20000}
              placeholder="Введите количество символов"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Объем скриптов: {characterCount.toLocaleString()} символов</Label>
              <Badge className={complexity.color}>
                {complexity.level}
              </Badge>
            </div>
            
            <Slider
              value={[characterCount]}
              onValueChange={handleSliderChange}
              min={1000}
              max={20000}
              step={500}
              className="w-full"
            />
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>1000 (минимум)</span>
              <span>20000 (максимум)</span>
            </div>
          </div>
        )}

        <div className={`p-4 rounded-lg border ${complexity.color}`}>
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4" />
            <span className="font-medium">{complexity.level} скрипт</span>
          </div>
          <div className="text-sm space-y-1">
            <div>• Примерно {complexity.dialogs} диалогов</div>
            <div>• {Math.round(characterCount / 100)} сценариев взаимодействия</div>
            <div>• Время разработки: {Math.ceil(characterCount / 2000)} дня</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">{Math.round(characterCount / 500)}</div>
            <div className="text-xs text-gray-600">Ответов бота</div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">{Math.round(characterCount / 200)}</div>
            <div className="text-xs text-gray-600">Ключевых фраз</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
