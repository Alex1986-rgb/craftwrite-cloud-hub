
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Target } from 'lucide-react';

interface ScriptComplexityCalculatorProps {
  onComplexityChange: (scenarios: number, price: number, level: string) => void;
  initialScenarios?: number;
}

const COMPLEXITY_LEVELS = {
  simple: {
    label: 'Простой',
    scenarios: [5, 15],
    pricePerScenario: 200,
    description: 'Базовые сценарии: приветствие, FAQ, контакты',
    features: ['Линейные диалоги', 'Простые условия', 'Базовые команды'],
    color: 'bg-green-100 text-green-800 border-green-300'
  },
  medium: {
    label: 'Средний',
    scenarios: [16, 40],
    pricePerScenario: 350,
    description: 'Продвинутые сценарии с условиями и ветвлениями',
    features: ['Условная логика', 'Сбор данных', 'Интеграции'],
    color: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  complex: {
    label: 'Сложный',
    scenarios: [41, 100],
    pricePerScenario: 500,
    description: 'Многоуровневые сценарии с AI и внешними API',
    features: ['AI-интеграция', 'Сложная логика', 'CRM интеграция'],
    color: 'bg-purple-100 text-purple-800 border-purple-300'
  }
};

export default function ScriptComplexityCalculator({ 
  onComplexityChange, 
  initialScenarios = 15 
}: ScriptComplexityCalculatorProps) {
  const [scenarios, setScenarios] = useState(initialScenarios);

  const getComplexityLevel = (scenarioCount: number) => {
    if (scenarioCount <= 15) return 'simple';
    if (scenarioCount <= 40) return 'medium';
    return 'complex';
  };

  const handleScenariosChange = (value: number[]) => {
    const newScenarios = value[0];
    setScenarios(newScenarios);
    
    const level = getComplexityLevel(newScenarios);
    const complexity = COMPLEXITY_LEVELS[level as keyof typeof COMPLEXITY_LEVELS];
    const price = newScenarios * complexity.pricePerScenario;
    
    onComplexityChange(newScenarios, price, complexity.label);
  };

  const currentLevel = getComplexityLevel(scenarios);
  const currentComplexity = COMPLEXITY_LEVELS[currentLevel as keyof typeof COMPLEXITY_LEVELS];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Сложность сценариев
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Количество сценариев</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-lg font-bold">
                {scenarios}
              </Badge>
              <Badge className={currentComplexity.color}>
                {currentComplexity.label}
              </Badge>
            </div>
          </div>
          
          <Slider
            value={[scenarios]}
            onValueChange={handleScenariosChange}
            min={5}
            max={100}
            step={5}
            className="w-full"
          />
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>5 (минимум)</span>
            <span>100 (максимум)</span>
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${currentComplexity.color}`}>
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4" />
            <span className="font-medium">{currentComplexity.label} уровень</span>
          </div>
          <p className="text-sm mb-3">{currentComplexity.description}</p>
          
          <div className="space-y-1">
            {currentComplexity.features.map((feature, index) => (
              <div key={index} className="text-sm flex items-center gap-1">
                <Zap className="w-3 h-3" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          {Object.entries(COMPLEXITY_LEVELS).map(([key, level]) => (
            <button
              key={key}
              type="button"
              onClick={() => handleScenariosChange([level.scenarios[0]])}
              className={`p-3 rounded-lg border transition-all hover:shadow-md ${
                key === currentLevel ? level.color : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="font-medium text-sm">{level.label}</div>
              <div className="text-xs text-gray-600">
                {level.scenarios[0]}-{level.scenarios[1]} сценариев
              </div>
              <div className="text-xs font-medium mt-1">
                {level.pricePerScenario}₽/сценарий
              </div>
            </button>
          ))}
        </div>

        <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="text-lg font-bold text-blue-600">
            Стоимость: {(scenarios * currentComplexity.pricePerScenario).toLocaleString()}₽
          </div>
          <div className="text-sm text-gray-600">
            {scenarios} сценариев × {currentComplexity.pricePerScenario}₽
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
