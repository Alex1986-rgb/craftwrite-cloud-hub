
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Plus, MessageCircle } from 'lucide-react';

interface ChatbotContentStructureProps {
  onQuestionsChange: (questions: string[]) => void;
  initialQuestions?: string[];
}

const CONTENT_CATEGORIES = {
  sales: {
    label: 'Продажи',
    questions: [
      'Как бот будет квалифицировать лиды?',
      'Какие возражения чаще всего возникают у клиентов?',
      'Какие этапы воронки продаж нужно автоматизировать?',
      'Как бот будет собирать контактные данные?',
      'Какие триггеры для закрытия сделки использовать?'
    ]
  },
  support: {
    label: 'Поддержка',
    questions: [
      'Какие частые вопросы задают клиенты?',
      'Как бот будет эскалировать сложные случаи?',
      'Какие статусы заказов должен отслеживать бот?',
      'Как организовать базу знаний для бота?',
      'Какие документы бот должен уметь предоставлять?'
    ]
  },
  lead_generation: {
    label: 'Лидогенерация',
    questions: [
      'Какие данные о лидах нужно собирать?',
      'Как бот будет сегментировать аудиторию?',
      'Какие магниты для привлечения лидов использовать?',
      'Как бот будет интегрироваться с CRM?',
      'Какие показатели конверсии отслеживать?'
    ]
  },
  entertainment: {
    label: 'Развлечения',
    questions: [
      'Какой тип интерактива предпочитает аудитория?',
      'Как бот будет поддерживать вовлеченность?',
      'Какие игровые механики интегрировать?',
      'Как организовать систему наград и достижений?',
      'Какой контент будет генерировать бот?'
    ]
  },
  consultation: {
    label: 'Консультации',
    questions: [
      'Какие экспертные знания должен демонстрировать бот?',
      'Как бот будет диагностировать потребности клиента?',
      'Какие рекомендации бот может давать?',
      'Как организовать запись на консультации?',
      'Какие документы бот должен предоставлять?'
    ]
  }
};

export default function ChatbotContentStructure({ 
  onQuestionsChange, 
  initialQuestions = [] 
}: ChatbotContentStructureProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>(initialQuestions);
  const [customQuestion, setCustomQuestion] = useState('');

  const handleQuestionToggle = (question: string) => {
    const updated = selectedQuestions.includes(question)
      ? selectedQuestions.filter(q => q !== question)
      : [...selectedQuestions, question];
    
    setSelectedQuestions(updated);
    onQuestionsChange(updated);
  };

  const addCustomQuestion = () => {
    if (customQuestion.trim() && !selectedQuestions.includes(customQuestion.trim())) {
      const updated = [...selectedQuestions, customQuestion.trim()];
      setSelectedQuestions(updated);
      onQuestionsChange(updated);
      setCustomQuestion('');
    }
  };

  const addAllFromCategory = () => {
    if (selectedCategory) {
      const categoryQuestions = CONTENT_CATEGORIES[selectedCategory as keyof typeof CONTENT_CATEGORIES].questions;
      const newQuestions = categoryQuestions.filter(q => !selectedQuestions.includes(q));
      const updated = [...selectedQuestions, ...newQuestions];
      setSelectedQuestions(updated);
      onQuestionsChange(updated);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Ключевые вопросы для раскрытия темы
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-gray-600">
          Выберите ключевые вопросы, которые помогут создать эффективные сценарии для вашего чат-бота
        </p>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Выберите категорию вопросов" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CONTENT_CATEGORIES).map(([key, category]) => (
                  <SelectItem key={key} value={key}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              type="button" 
              onClick={addAllFromCategory}
              disabled={!selectedCategory}
              variant="outline"
            >
              Добавить все
            </Button>
          </div>

          {selectedCategory && (
            <div className="space-y-2">
              <h4 className="font-medium">
                Вопросы категории "{CONTENT_CATEGORIES[selectedCategory as keyof typeof CONTENT_CATEGORIES].label}":
              </h4>
              {CONTENT_CATEGORIES[selectedCategory as keyof typeof CONTENT_CATEGORIES].questions.map((question, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`question-${index}`}
                    checked={selectedQuestions.includes(question)}
                    onCheckedChange={() => handleQuestionToggle(question)}
                  />
                  <label 
                    htmlFor={`question-${index}`} 
                    className="text-sm cursor-pointer flex-1"
                  >
                    {question}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Добавить свой вопрос:</h4>
          <div className="flex gap-2">
            <input
              type="text"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder="Введите свой вопрос"
              className="flex-1 px-3 py-2 border rounded-md"
              onKeyPress={(e) => e.key === 'Enter' && addCustomQuestion()}
            />
            <Button type="button" onClick={addCustomQuestion} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {selectedQuestions.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Выбранные вопросы ({selectedQuestions.length}):
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {selectedQuestions.map((question, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded border">
                  <span className="text-sm">{question}</span>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => handleQuestionToggle(question)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          {Object.entries(CONTENT_CATEGORIES).map(([key, category]) => (
            <Button
              key={key}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSelectedCategory(key)}
              className={selectedCategory === key ? 'border-blue-500 bg-blue-50' : ''}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
