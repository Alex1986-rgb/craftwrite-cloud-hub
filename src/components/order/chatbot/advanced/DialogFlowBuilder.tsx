
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageSquare, ArrowRight, Zap, Target, Bot, Users } from 'lucide-react';

interface DialogType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  scenarios: string[];
  complexity: 'simple' | 'medium' | 'complex';
  price: number;
  features: string[];
}

const DIALOG_TYPES: DialogType[] = [
  {
    id: 'sales',
    name: 'Продающие диалоги',
    description: 'Сценарии для конверсии и продаж',
    icon: <Target className="w-5 h-5" />,
    scenarios: ['Презентация товара', 'Работа с возражениями', 'Закрытие сделки', 'Дополнительные продажи'],
    complexity: 'complex',
    price: 3500,
    features: ['Воронка продаж', 'Персонализация', 'A/B тестирование']
  },
  {
    id: 'support',
    name: 'Техподдержка',
    description: 'Решение проблем и консультации',
    icon: <Users className="w-5 h-5" />,
    scenarios: ['FAQ', 'Диагностика проблем', 'Пошаговые инструкции', 'Эскалация'],
    complexity: 'medium',
    price: 2500,
    features: ['База знаний', 'Умная маршрутизация', 'История обращений']
  },
  {
    id: 'lead-generation',
    name: 'Лидогенерация',
    description: 'Сбор контактов и квалификация',
    icon: <Zap className="w-5 h-5" />,
    scenarios: ['Квалификация лидов', 'Сбор контактов', 'Опросы', 'Запись на встречу'],
    complexity: 'medium',
    price: 3000,
    features: ['CRM интеграция', 'Скоринг лидов', 'Автонуртуринг']
  },
  {
    id: 'informational',
    name: 'Информационные',
    description: 'Предоставление информации и FAQ',
    icon: <MessageSquare className="w-5 h-5" />,
    scenarios: ['Ответы на вопросы', 'Информация о компании', 'Часы работы', 'Контакты'],
    complexity: 'simple',
    price: 1500,
    features: ['Быстрые ответы', 'Поиск по базе', 'Простая навигация']
  },
  {
    id: 'booking',
    name: 'Запись и бронирование',
    description: 'Онлайн запись на услуги',
    icon: <Bot className="w-5 h-5" />,
    scenarios: ['Выбор услуги', 'Свободное время', 'Подтверждение', 'Напоминания'],
    complexity: 'complex',
    price: 4000,
    features: ['Календарная интеграция', 'SMS уведомления', 'Отмена/перенос']
  },
  {
    id: 'entertainment',
    name: 'Развлекательные',
    description: 'Игры, викторины, развлечения',
    icon: <Zap className="w-5 h-5" />,
    scenarios: ['Викторины', 'Игры', 'Конкурсы', 'Ежедневный контент'],
    complexity: 'medium',
    price: 2800,
    features: ['Геймификация', 'Рейтинги', 'Награды']
  }
];

interface DialogFlowBuilderProps {
  onDialogTypesChange: (types: string[], totalPrice: number) => void;
  onCustomScenariosChange: (scenarios: string) => void;
  initialTypes?: string[];
}

export default function DialogFlowBuilder({
  onDialogTypesChange,
  onCustomScenariosChange,
  initialTypes = []
}: DialogFlowBuilderProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialTypes);
  const [customScenarios, setCustomScenarios] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const handleTypeToggle = (typeId: string) => {
    const newSelected = selectedTypes.includes(typeId)
      ? selectedTypes.filter(id => id !== typeId)
      : [...selectedTypes, typeId];
    
    setSelectedTypes(newSelected);
    
    const totalPrice = newSelected.reduce((sum, id) => {
      const type = DIALOG_TYPES.find(t => t.id === id);
      return sum + (type?.price || 0);
    }, 0);
    
    onDialogTypesChange(newSelected, totalPrice);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'complex': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplexityLabel = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'Простой';
      case 'medium': return 'Средний';
      case 'complex': return 'Сложный';
      default: return 'Неизвестно';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Типы диалогов и сценарии
        </CardTitle>
        <p className="text-sm text-gray-600">
          Выберите типы диалогов, которые должен поддерживать ваш чат-бот
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          {DIALOG_TYPES.map((type) => (
            <div
              key={type.id}
              className={`border rounded-lg p-4 transition-all cursor-pointer ${
                selectedTypes.includes(type.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleTypeToggle(type.id)}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selectedTypes.includes(type.id)}
                  onChange={() => handleTypeToggle(type.id)}
                />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {type.icon}
                    <h4 className="font-semibold">{type.name}</h4>
                    <Badge className={`text-xs ${getComplexityColor(type.complexity)}`}>
                      {getComplexityLabel(type.complexity)}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {type.price.toLocaleString()}₽
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs font-medium text-gray-700 mb-1">Включенные сценарии:</div>
                      <div className="flex flex-wrap gap-1">
                        {type.scenarios.map((scenario, index) => (
                          <span
                            key={index}
                            className="inline-block text-xs bg-gray-100 px-2 py-1 rounded"
                          >
                            {scenario}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs font-medium text-gray-700 mb-1">Особенности:</div>
                      <div className="flex flex-wrap gap-1">
                        {type.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowCustom(!showCustom)}
          >
            {showCustom ? 'Скрыть' : 'Добавить'} дополнительные сценарии
          </Button>
          
          {showCustom && (
            <div className="space-y-2">
              <Label htmlFor="custom-scenarios">Дополнительные сценарии</Label>
              <Textarea
                id="custom-scenarios"
                value={customScenarios}
                onChange={(e) => {
                  setCustomScenarios(e.target.value);
                  onCustomScenariosChange(e.target.value);
                }}
                placeholder="Опишите специфические сценарии, которые нужны именно для вашего бизнеса..."
                rows={3}
              />
            </div>
          )}
        </div>

        {selectedTypes.length > 0 && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <ArrowRight className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-800">Выбранные типы диалогов:</span>
            </div>
            <div className="space-y-1">
              {selectedTypes.map(typeId => {
                const type = DIALOG_TYPES.find(t => t.id === typeId);
                return type ? (
                  <div key={typeId} className="flex justify-between items-center text-sm text-blue-700">
                    <span>{type.name}</span>
                    <span>{type.price.toLocaleString()}₽</span>
                  </div>
                ) : null;
              })}
              <div className="border-t pt-2 flex justify-between items-center font-semibold">
                <span>Итого:</span>
                <span>
                  {selectedTypes.reduce((sum, id) => {
                    const type = DIALOG_TYPES.find(t => t.id === id);
                    return sum + (type?.price || 0);
                  }, 0).toLocaleString()}₽
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
