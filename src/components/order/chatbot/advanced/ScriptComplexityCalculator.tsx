
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calculator, Info, Lightbulb } from 'lucide-react';

interface ComplexityLevel {
  id: string;
  name: string;
  scenarioRange: { min: number; max: number };
  pricePerScenario: number;
  features: string[];
  examples: string[];
  recommended?: boolean;
}

const COMPLEXITY_LEVELS: ComplexityLevel[] = [
  {
    id: 'simple',
    name: 'Простые сценарии',
    scenarioRange: { min: 3, max: 10 },
    pricePerScenario: 250,
    features: ['Линейные диалоги', 'Простые условия', 'Базовые ответы'],
    examples: ['FAQ бот', 'Простая поддержка', 'Информационный бот']
  },
  {
    id: 'medium',
    name: 'Средние сценарии',
    scenarioRange: { min: 10, max: 25 },
    pricePerScenario: 200,
    features: ['Ветвления', 'Условная логика', 'Сбор данных', 'Интеграции'],
    examples: ['Лидогенерация', 'Заказ услуг', 'Квиз-бот'],
    recommended: true
  },
  {
    id: 'complex',
    name: 'Сложные сценарии',
    scenarioRange: { min: 25, max: 50 },
    pricePerScenario: 180,
    features: ['Многоуровневые диалоги', 'CRM интеграция', 'Персонализация', 'Аналитика'],
    examples: ['Продажи', 'Техподдержка', 'Консультант']
  },
  {
    id: 'enterprise',
    name: 'Корпоративные',
    scenarioRange: { min: 50, max: 100 },
    pricePerScenario: 150,
    features: ['AI интеграция', 'Сложная логика', 'Мультиплатформенность', 'API'],
    examples: ['Умный ассистент', 'Комплексные продажи', 'HR бот']
  }
];

interface ScriptComplexityCalculatorProps {
  onComplexityChange: (scenarios: number, totalPrice: number, level: string) => void;
  initialScenarios?: number;
}

export default function ScriptComplexityCalculator({
  onComplexityChange,
  initialScenarios = 15
}: ScriptComplexityCalculatorProps) {
  const [scenarios, setScenarios] = useState(initialScenarios);
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  useEffect(() => {
    // Determine complexity level based on scenario count
    const level = COMPLEXITY_LEVELS.find(
      l => scenarios >= l.scenarioRange.min && scenarios <= l.scenarioRange.max
    ) || COMPLEXITY_LEVELS[1];
    
    setSelectedLevel(level.id);
    
    const totalPrice = scenarios * level.pricePerScenario;
    onComplexityChange(scenarios, totalPrice, level.id);
  }, [scenarios, onComplexityChange]);

  const handleScenarioChange = (value: number) => {
    setScenarios(Math.max(1, Math.min(100, value)));
  };

  const handleLevelSelect = (levelId: string) => {
    const level = COMPLEXITY_LEVELS.find(l => l.id === levelId);
    if (level) {
      setScenarios(Math.floor((level.scenarioRange.min + level.scenarioRange.max) / 2));
    }
  };

  const currentLevel = COMPLEXITY_LEVELS.find(l => l.id === selectedLevel) || COMPLEXITY_LEVELS[1];
  const estimatedPrice = scenarios * currentLevel.pricePerScenario;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Калькулятор сложности скриптов
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="scenarios">Количество сценариев</Label>
          <Input
            id="scenarios"
            type="number"
            min="1"
            max="100"
            value={scenarios}
            onChange={(e) => handleScenarioChange(Number(e.target.value))}
            className="text-lg font-semibold"
          />
          <p className="text-sm text-gray-600">
            Один сценарий = завершенный диалоговый поток (например, "Оформление заказа")
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {COMPLEXITY_LEVELS.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => handleLevelSelect(level.id)}
              className={`p-4 border rounded-lg text-left transition-all ${
                selectedLevel === level.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold">{level.name}</h4>
                {level.recommended && (
                  <Badge variant="outline" className="text-xs">Популярный</Badge>
                )}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {level.scenarioRange.min}-{level.scenarioRange.max} сценариев
              </div>
              <div className="text-lg font-bold text-blue-600 mb-2">
                {level.pricePerScenario}₽ за сценарий
              </div>
              <div className="space-y-1">
                {level.features.slice(0, 2).map((feature, index) => (
                  <div key={index} className="text-xs text-gray-500">• {feature}</div>
                ))}
              </div>
            </button>
          ))}
        </div>

        {currentLevel && (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800">Текущий уровень: {currentLevel.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium">Возможности:</div>
                  {currentLevel.features.map((feature, index) => (
                    <div key={index} className="text-gray-600">• {feature}</div>
                  ))}
                </div>
                <div>
                  <div className="font-medium">Примеры использования:</div>
                  {currentLevel.examples.map((example, index) => (
                    <div key={index} className="text-gray-600">• {example}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div>
                <div className="font-semibold text-green-800">Расчет стоимости:</div>
                <div className="text-sm text-green-700">
                  {scenarios} сценариев × {currentLevel.pricePerScenario}₽
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {estimatedPrice.toLocaleString()}₽
              </div>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-1">
                <Lightbulb className="w-4 h-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">Рекомендация</span>
              </div>
              <p className="text-sm text-yellow-700">
                Для оптимального соотношения цена-качество рекомендуем начинать с {COMPLEXITY_LEVELS[1].scenarioRange.min}-{COMPLEXITY_LEVELS[1].scenarioRange.max} сценариев
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
