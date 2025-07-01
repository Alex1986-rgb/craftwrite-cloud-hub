
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Globe, Lightbulb, Users, Target } from 'lucide-react';

interface ProjectDetailsStepProps {
  data: {
    projectTitle: string;
    targetAudience: string;
    projectGoals: string;
    competitorUrls: string[];
  };
  onUpdate: (data: Partial<ProjectDetailsStepProps['data']>) => void;
}

const AUDIENCE_TEMPLATES = [
  'B2B клиенты', 'Интернет-маркетологи', 'Владельцы малого бизнеса',
  'IT-специалисты', 'Руководители компаний', 'Частные клиенты',
  'Студенты', 'Молодые мамы', 'Пенсионеры'
];

const GOAL_TEMPLATES = [
  'Увеличить продажи', 'Повысить узнаваемость бренда', 'Привлечь трафик',
  'Генерировать лиды', 'Обучить аудиторию', 'Повысить доверие',
  'Улучшить SEO-позиции', 'Запустить новый продукт'
];

export default function ProjectDetailsStep({ data, onUpdate }: ProjectDetailsStepProps) {
  const addCompetitorUrl = () => {
    onUpdate({
      competitorUrls: [...data.competitorUrls, '']
    });
  };

  const updateCompetitorUrl = (index: number, url: string) => {
    const newUrls = [...data.competitorUrls];
    newUrls[index] = url;
    onUpdate({ competitorUrls: newUrls });
  };

  const removeCompetitorUrl = (index: number) => {
    const newUrls = data.competitorUrls.filter((_, i) => i !== index);
    onUpdate({ competitorUrls: newUrls });
  };

  const addTemplate = (field: 'targetAudience' | 'projectGoals', template: string) => {
    const currentValue = data[field];
    const newValue = currentValue ? `${currentValue}, ${template}` : template;
    onUpdate({ [field]: newValue });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Расскажите о вашем проекте
        </h2>
        <p className="text-gray-600">
          Чем больше деталей, тем точнее будет результат
        </p>
      </div>

      {/* Project Title */}
      <div className="space-y-2">
        <Label htmlFor="projectTitle" className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          Название проекта или краткое описание *
        </Label>
        <Input
          id="projectTitle"
          value={data.projectTitle}
          onChange={(e) => onUpdate({ projectTitle: e.target.value })}
          placeholder="Например: Лендинг для онлайн-курса по маркетингу"
          className="text-base"
        />
        <p className="text-xs text-gray-500">
          Помогает понять контекст и подобрать подходящий стиль
        </p>
      </div>

      {/* Target Audience */}
      <div className="space-y-3">
        <Label htmlFor="targetAudience" className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          Целевая аудитория *
        </Label>
        <Textarea
          id="targetAudience"
          value={data.targetAudience}
          onChange={(e) => onUpdate({ targetAudience: e.target.value })}
          placeholder="Опишите, кто ваша целевая аудитория: возраст, интересы, профессия, проблемы..."
          rows={3}
          className="text-base"
        />
        
        {/* Quick templates */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500">Быстрые шаблоны:</p>
          <div className="flex flex-wrap gap-2">
            {AUDIENCE_TEMPLATES.map((template, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="cursor-pointer hover:bg-blue-50"
                onClick={() => addTemplate('targetAudience', template)}
              >
                <Plus className="w-3 h-3 mr-1" />
                {template}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Project Goals */}
      <div className="space-y-3">
        <Label htmlFor="projectGoals" className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4" />
          Цели проекта *
        </Label>
        <Textarea
          id="projectGoals"
          value={data.projectGoals}
          onChange={(e) => onUpdate({ projectGoals: e.target.value })}
          placeholder="Что хотите достичь с помощью этого текста? Какие задачи решить?"
          rows={3}
          className="text-base"
        />
        
        {/* Goal templates */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500">Популярные цели:</p>
          <div className="flex flex-wrap gap-2">
            {GOAL_TEMPLATES.map((template, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="cursor-pointer hover:bg-green-50"
                onClick={() => addTemplate('projectGoals', template)}
              >
                <Plus className="w-3 h-3 mr-1" />
                {template}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Competitor Analysis */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Конкуренты для анализа (необязательно)
        </Label>
        <p className="text-sm text-gray-600">
          Добавьте ссылки на сайты конкурентов для анализа их подхода
        </p>
        
        {data.competitorUrls.map((url, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={url}
              onChange={(e) => updateCompetitorUrl(index, e.target.value)}
              placeholder="https://example.com"
              className="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeCompetitorUrl(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        
        <Button
          variant="outline"
          onClick={addCompetitorUrl}
          className="w-full flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Добавить конкурента
        </Button>
        
        {data.competitorUrls.length > 0 && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Бонус:</strong> Мы проанализируем конкурентов и создадим 
              уникальное предложение, которое выделит вас на рынке
            </p>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
        <h4 className="font-semibold text-purple-900 mb-2">💡 Советы для лучшего результата:</h4>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Опишите болевые точки вашей аудитории</li>
          <li>• Укажите уникальные преимущества вашего продукта</li>
          <li>• Расскажите о желаемом стиле общения (официальный/дружелюбный)</li>
          <li>• Добавьте примеры успешных проектов в вашей нише</li>
        </ul>
      </div>
    </div>
  );
}
