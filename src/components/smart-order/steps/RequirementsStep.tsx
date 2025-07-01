
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X, Type, Key, Brain, List } from 'lucide-react';

interface RequirementsStepProps {
  data: {
    characterCount: number;
    keywordsMode: 'client' | 'auto' | 'ai';
    keywords: string[];
    toneOfVoice: string;
    contentStructure: string[];
  };
  onUpdate: (data: Partial<RequirementsStepProps['data']>) => void;
}

const TONE_OPTIONS = [
  { id: 'professional', label: 'Профессиональный', description: 'Деловой, экспертный тон' },
  { id: 'friendly', label: 'Дружелюбный', description: 'Близкий к читателю, теплый' },
  { id: 'authoritative', label: 'Авторитетный', description: 'Уверенный, экспертный' },
  { id: 'conversational', label: 'Разговорный', description: 'Как живое общение' },
  { id: 'sales', label: 'Продающий', description: 'Мотивирующий к действию' },
  { id: 'educational', label: 'Обучающий', description: 'Понятный, структурированный' }
];

const STRUCTURE_TEMPLATES = [
  'Введение', 'Проблема', 'Решение', 'Преимущества', 'Доказательства',
  'Отзывы', 'Призыв к действию', 'FAQ', 'Заключение', 'Контакты'
];

export default function RequirementsStep({ data, onUpdate }: RequirementsStepProps) {
  const [newKeyword, setNewKeyword] = useState('');

  const addKeyword = () => {
    if (newKeyword.trim()) {
      onUpdate({
        keywords: [...data.keywords, newKeyword.trim()]
      });
      setNewKeyword('');
    }
  };

  const removeKeyword = (index: number) => {
    onUpdate({
      keywords: data.keywords.filter((_, i) => i !== index)
    });
  };

  const addStructureElement = (element: string) => {
    if (!data.contentStructure.includes(element)) {
      onUpdate({
        contentStructure: [...data.contentStructure, element]
      });
    }
  };

  const removeStructureElement = (element: string) => {
    onUpdate({
      contentStructure: data.contentStructure.filter(item => item !== element)
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Технические требования
        </h2>
        <p className="text-gray-600">
          Настройте параметры для идеального результата
        </p>
      </div>

      {/* Character Count */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2">
          <Type className="w-4 h-4" />
          Объём текста: {data.characterCount.toLocaleString()} символов
        </Label>
        
        <div className="px-3">
          <Slider
            value={[data.characterCount]}
            onValueChange={([value]) => onUpdate({ characterCount: value })}
            min={500}
            max={20000}
            step={500}
            className="w-full"
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>500 символов</span>
          <span>~{Math.round(data.characterCount / 1000)} тыс. знаков</span>
          <span>20 000 символов</span>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Примерный объём:</strong> {Math.round(data.characterCount / 1800)} страниц A4 
            (~{Math.round(data.characterCount / 6)} слов)
          </p>
        </div>
      </div>

      {/* Keywords Mode */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2">
          <Key className="w-4 h-4" />
          Ключевые слова
        </Label>
        
        <RadioGroup
          value={data.keywordsMode}
          onValueChange={(value: 'client' | 'auto' | 'ai') => onUpdate({ keywordsMode: value })}
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="client" id="client" />
              <Label htmlFor="client" className="flex-1">
                <div>
                  <div className="font-medium">Я укажу ключевые слова</div>
                  <div className="text-sm text-gray-500">Вы знаете, по каким запросам продвигаться</div>
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="auto" id="auto" />
              <Label htmlFor="auto" className="flex-1">
                <div>
                  <div className="font-medium">Автоматический подбор <Badge className="ml-2">+2000₽</Badge></div>
                  <div className="text-sm text-gray-500">Мы найдём лучшие ключевые слова для вашей ниши</div>
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ai" id="ai" />
              <Label htmlFor="ai" className="flex-1">
                <div>
                  <div className="font-medium">ИИ-анализ конкурентов <Badge className="ml-2">+3000₽</Badge></div>
                  <div className="text-sm text-gray-500">Анализ конкурентов + семантическое ядро</div>
                </div>
              </Label>
            </div>
          </div>
        </RadioGroup>

        {/* Manual keywords input */}
        {data.keywordsMode === 'client' && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="Введите ключевое слово"
                onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
              />
              <Button onClick={addKeyword} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {data.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {keyword}
                    <button onClick={() => removeKeyword(index)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tone of Voice */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2">
          <Brain className="w-4 h-4" />
          Стиль и тон текста
        </Label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {TONE_OPTIONS.map((tone) => (
            <Card
              key={tone.id}
              className={`p-3 cursor-pointer transition-colors ${
                data.toneOfVoice === tone.id
                  ? 'ring-2 ring-blue-500 bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onUpdate({ toneOfVoice: tone.id })}
            >
              <div className="font-medium text-sm">{tone.label}</div>
              <div className="text-xs text-gray-500">{tone.description}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Content Structure */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2">
          <List className="w-4 h-4" />
          Структура контента (необязательно)
        </Label>
        <p className="text-sm text-gray-600">
          Выберите разделы, которые должны быть в тексте
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {STRUCTURE_TEMPLATES.map((template) => (
            <button
              key={template}
              onClick={() => 
                data.contentStructure.includes(template)
                  ? removeStructureElement(template)
                  : addStructureElement(template)
              }
              className={`p-2 text-sm rounded-lg border transition-colors ${
                data.contentStructure.includes(template)
                  ? 'bg-green-100 border-green-300 text-green-800'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              {template}
            </button>
          ))}
        </div>
        
        {data.contentStructure.length > 0 && (
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm text-green-800 mb-2">
              <strong>Выбранная структура:</strong>
            </p>
            <div className="text-sm text-green-700">
              {data.contentStructure.map((item, index) => (
                <span key={item}>
                  {index + 1}. {item}
                  {index < data.contentStructure.length - 1 ? ' → ' : ''}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AI Enhancement Tip */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
        <h4 className="font-semibold text-purple-900 mb-2">🤖 ИИ-улучшения:</h4>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Автоматический подбор синонимов и LSI-ключевых слов</li>
          <li>• Оптимизация под голосовой поиск</li>
          <li>• Анализ тональности и читабельности</li>
          <li>• Проверка на соответствие E-A-T принципам Google</li>
        </ul>
      </div>
    </div>
  );
}
