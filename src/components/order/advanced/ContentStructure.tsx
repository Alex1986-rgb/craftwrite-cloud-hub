
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, X } from 'lucide-react';

interface ContentStructureProps {
  onQuestionsChange: (questions: string[]) => void;
  initialQuestions?: string[];
}

const QUESTION_CATEGORIES = {
  'business': [
    'Какие основные проблемы решает ваш продукт/услуга?',
    'Чем вы отличаетесь от конкурентов?',
    'Какие результаты получают ваши клиенты?',
    'Сколько времени требуется для получения результата?',
    'Какова стоимость ваших услуг?'
  ],
  'education': [
    'Для кого предназначен этот курс/материал?',
    'Какие знания получит ученик?',
    'Какой уровень подготовки требуется?',
    'Сколько времени займет обучение?',
    'Как проверяется усвоение материала?'
  ],
  'health': [
    'Какие симптомы указывают на проблему?',
    'Какие методы лечения/профилактики существуют?',
    'Какие противопоказания нужно учесть?',
    'Как долго длится лечение/восстановление?',
    'Какие побочные эффекты возможны?'
  ],
  'tech': [
    'Какие технологии используются?',
    'Как происходит интеграция с существующими системами?',
    'Какие требования к безопасности?',
    'Какие возможности масштабирования?',
    'Какая техническая поддержка предоставляется?'
  ],
  'retail': [
    'Из каких материалов изготовлен товар?',
    'Какие размеры/варианты доступны?',
    'Какие гарантии предоставляются?',
    'Как происходит доставка и возврат?',
    'Какие отзывы оставляют покупатели?'
  ]
};

export default function ContentStructure({ onQuestionsChange, initialQuestions = [] }: ContentStructureProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>(initialQuestions);
  const [customQuestion, setCustomQuestion] = useState('');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const addPredefinedQuestion = (question: string) => {
    if (!selectedQuestions.includes(question)) {
      const updatedQuestions = [...selectedQuestions, question];
      setSelectedQuestions(updatedQuestions);
      onQuestionsChange(updatedQuestions);
    }
  };

  const addCustomQuestion = () => {
    if (customQuestion.trim() && !selectedQuestions.includes(customQuestion.trim())) {
      const updatedQuestions = [...selectedQuestions, customQuestion.trim()];
      setSelectedQuestions(updatedQuestions);
      onQuestionsChange(updatedQuestions);
      setCustomQuestion('');
    }
  };

  const removeQuestion = (question: string) => {
    const updatedQuestions = selectedQuestions.filter(q => q !== question);
    setSelectedQuestions(updatedQuestions);
    onQuestionsChange(updatedQuestions);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Структура контента
          <Badge variant="secondary" className="ml-2">Опционально</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Выберите ключевые вопросы, которые должны быть раскрыты в тексте
        </p>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Категория вопросов</Label>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите тематику" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="business">Бизнес и услуги</SelectItem>
                <SelectItem value="education">Образование</SelectItem>
                <SelectItem value="health">Здоровье и медицина</SelectItem>
                <SelectItem value="tech">IT и технологии</SelectItem>
                <SelectItem value="retail">Товары и ритейл</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedCategory && (
            <div className="space-y-2">
              <Label>Готовые вопросы для раскрытия темы</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {QUESTION_CATEGORIES[selectedCategory as keyof typeof QUESTION_CATEGORIES]?.map((question, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => addPredefinedQuestion(question)}
                    disabled={selectedQuestions.includes(question)}
                    className={`w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors text-sm ${
                      selectedQuestions.includes(question) ? 'border-green-300 bg-green-50 text-green-700' : 'border-gray-200'
                    }`}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="custom-question">Добавить свой вопрос</Label>
            <div className="flex gap-2">
              <Textarea
                id="custom-question"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="Введите ваш вопрос..."
                rows={2}
              />
              <Button 
                type="button" 
                onClick={addCustomQuestion} 
                size="sm"
                disabled={!customQuestion.trim()}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {selectedQuestions.length > 0 && (
          <div className="space-y-2">
            <Label>Выбранные вопросы ({selectedQuestions.length}):</Label>
            <div className="space-y-2">
              {selectedQuestions.map((question, index) => (
                <div key={index} className="flex items-start justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-sm text-blue-800 flex-1">{question}</span>
                  <button
                    type="button"
                    onClick={() => removeQuestion(question)}
                    className="text-red-600 hover:text-red-800 ml-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
