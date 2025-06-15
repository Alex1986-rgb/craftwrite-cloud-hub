
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Plus, Zap } from 'lucide-react';

interface DialogFlowBuilderProps {
  onDialogTypesChange: (types: string[], price: number) => void;
  onCustomScenariosChange: (scenarios: string) => void;
  initialTypes?: string[];
}

const DIALOG_TYPES = [
  {
    id: 'faq',
    name: 'FAQ и поддержка',
    description: 'Ответы на частые вопросы',
    price: 0,
    scenarios: ['Часто задаваемые вопросы', 'Техническая поддержка', 'Инструкции по использованию'],
    included: true
  },
  {
    id: 'lead_generation',
    name: 'Генерация лидов',
    description: 'Сбор контактов потенциальных клиентов',
    price: 2500,
    scenarios: ['Квалификация лидов', 'Сбор контактных данных', 'Предварительная оценка потребностей']
  },
  {
    id: 'sales',
    name: 'Продажи',
    description: 'Консультации и продажи товаров/услуг',
    price: 3500,
    scenarios: ['Презентация продуктов', 'Расчет стоимости', 'Оформление заказов', 'Обработка возражений']
  },
  {
    id: 'booking',
    name: 'Бронирование и записи',
    description: 'Запись на услуги, бронирование',
    price: 2000,
    scenarios: ['Проверка доступности', 'Выбор времени', 'Подтверждение записи', 'Напоминания']
  },
  {
    id: 'feedback',
    name: 'Обратная связь',
    description: 'Сбор отзывов и предложений',
    price: 1500,
    scenarios: ['Оценка качества', 'Сбор предложений', 'Анкетирование', 'NPS опросы']
  },
  {
    id: 'onboarding',
    name: 'Онбординг',
    description: 'Знакомство новых пользователей',
    price: 2000,
    scenarios: ['Приветствие новичков', 'Настройка профиля', 'Обучение функциям', 'Первые шаги']
  },
  {
    id: 'notifications',
    name: 'Уведомления',
    description: 'Информирование о событиях и новостях',
    price: 1000,
    scenarios: ['Статусы заказов', 'Новости компании', 'Акции и скидки', 'Системные уведомления']
  },
  {
    id: 'analytics',
    name: 'Аналитика и отчеты',
    description: 'Предоставление данных и статистики',
    price: 3000,
    scenarios: ['Персональная статистика', 'Отчеты по периодам', 'Сравнительный анализ', 'Рекомендации']
  }
];

export default function DialogFlowBuilder({ 
  onDialogTypesChange, 
  onCustomScenariosChange,
  initialTypes = ['faq'] 
}: DialogFlowBuilderProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialTypes);
  const [customScenarios, setCustomScenarios] = useState('');

  const handleTypeToggle = (typeId: string) => {
    const type = DIALOG_TYPES.find(t => t.id === typeId);
    if (type?.included) return; // Нельзя отключить базовые типы

    let newTypes: string[];
    if (selectedTypes.includes(typeId)) {
      newTypes = selectedTypes.filter(id => id !== typeId);
    } else {
      newTypes = [...selectedTypes, typeId];
    }
    
    setSelectedTypes(newTypes);
    
    // Рассчитываем общую стоимость
    const totalPrice = newTypes.reduce((total, id) => {
      const dialogType = DIALOG_TYPES.find(t => t.id === id);
      return total + (dialogType?.price || 0);
    }, 0);
    
    onDialogTypesChange(newTypes, totalPrice);
  };

  const handleCustomScenariosChange = (value: string) => {
    setCustomScenarios(value);
    onCustomScenariosChange(value);
  };

  const getSelectedScenarios = () => {
    return selectedTypes.flatMap(typeId => {
      const type = DIALOG_TYPES.find(t => t.id === typeId);
      return type?.scenarios || [];
    });
  };

  const totalPrice = selectedTypes.reduce((total, id) => {
    const type = DIALOG_TYPES.find(t => t.id === id);
    return total + (type?.price || 0);
  }, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Типы диалогов
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-gray-600">
          Выберите типы диалогов, которые должен поддерживать ваш бот
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {DIALOG_TYPES.map((type) => {
            const isSelected = selectedTypes.includes(type.id);
            const isIncluded = type.included;
            
            return (
              <div
                key={type.id}
                className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${isIncluded ? 'ring-2 ring-green-200' : ''}`}
                onClick={() => handleTypeToggle(type.id)}
              >
                {isIncluded && (
                  <Badge className="absolute -top-2 -right-2 bg-green-500">
                    Включено
                  </Badge>
                )}
                
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={isSelected}
                    disabled={isIncluded}
                    onChange={() => handleTypeToggle(type.id)}
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{type.name}</h3>
                      {type.price > 0 && (
                        <Badge variant="outline">
                          +{type.price.toLocaleString()}₽
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      {type.description}
                    </p>
                    
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-gray-700">Сценарии:</div>
                      {type.scenarios.map((scenario, index) => (
                        <div key={index} className="text-xs text-gray-500">
                          • {scenario}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Выбранные сценарии */}
        {selectedTypes.length > 0 && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Выбранные сценарии ({getSelectedScenarios().length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {getSelectedScenarios().map((scenario, index) => (
                <div key={index} className="text-blue-800">
                  • {scenario}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Кастомные сценарии */}
        <div className="space-y-2">
          <Label htmlFor="custom-scenarios" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Дополнительные сценарии
          </Label>
          <Textarea
            id="custom-scenarios"
            value={customScenarios}
            onChange={(e) => handleCustomScenariosChange(e.target.value)}
            placeholder="Опишите специфические сценарии для вашего бизнеса..."
            rows={3}
          />
          <p className="text-xs text-gray-500">
            Укажите особые сценарии, которые не входят в стандартные типы диалогов
          </p>
        </div>

        {/* Итоговая стоимость */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium">Стоимость типов диалогов:</span>
            <span className="text-lg font-bold text-blue-600">
              {totalPrice.toLocaleString()}₽
            </span>
          </div>
          <div className="text-xs text-gray-600 mt-1">
            Выбрано типов: {selectedTypes.length}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
