
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Target, 
  Users, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Save,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

interface BriefData {
  projectType: string;
  businessInfo: {
    company: string;
    industry: string;
    website: string;
    description: string;
  };
  targetAudience: {
    primary: string;
    age: string;
    interests: string[];
    painPoints: string;
  };
  projectGoals: {
    primary: string;
    secondary: string[];
    metrics: string[];
  };
  contentRequirements: {
    tone: string;
    style: string;
    keyMessages: string[];
    restrictions: string[];
  };
  technicalRequirements: {
    wordCount: number;
    deadline: string;
    format: string;
    seoKeywords: string[];
  };
  budget: {
    range: string;
    priority: string;
  };
}

const steps = [
  { id: 'project', title: 'Тип проекта', icon: FileText },
  { id: 'business', title: 'О компании', icon: Target },
  { id: 'audience', title: 'Аудитория', icon: Users },
  { id: 'goals', title: 'Цели', icon: Lightbulb },
  { id: 'content', title: 'Контент', icon: FileText },
  { id: 'technical', title: 'Требования', icon: CheckCircle2 }
];

const projectTypes = {
  'seo-article': 'SEO-статья',
  'landing-page': 'Landing page',
  'email-campaign': 'Email-кампания',
  'social-media': 'SMM-контент',
  'sales-text': 'Продающий текст',
  'pr-article': 'PR-статья'
};

const industries = [
  'IT и технологии',
  'E-commerce',
  'Финтех',
  'Медицина',
  'Образование',
  'Недвижимость',
  'Производство',
  'Услуги',
  'B2B',
  'Другое'
];

export default function SmartBriefConstructor() {
  const [currentStep, setCurrentStep] = useState(0);
  const [briefData, setBriefData] = useState<BriefData>({
    projectType: '',
    businessInfo: {
      company: '',
      industry: '',
      website: '',
      description: ''
    },
    targetAudience: {
      primary: '',
      age: '',
      interests: [],
      painPoints: ''
    },
    projectGoals: {
      primary: '',
      secondary: [],
      metrics: []
    },
    contentRequirements: {
      tone: '',
      style: '',
      keyMessages: [],
      restrictions: []
    },
    technicalRequirements: {
      wordCount: 1000,
      deadline: '',
      format: '',
      seoKeywords: []
    },
    budget: {
      range: '',
      priority: ''
    }
  });

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  // Автосохранение
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('smartBrief', JSON.stringify(briefData));
      setIsSaved(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [briefData]);

  // Загрузка сохраненных данных
  useEffect(() => {
    const saved = localStorage.getItem('smartBrief');
    if (saved) {
      try {
        setBriefData(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved brief:', error);
      }
    }
  }, []);

  const updateBriefData = (section: string, data: any) => {
    setBriefData(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof BriefData], ...data }
    }));
    setIsSaved(false);
  };

  const getProgress = () => {
    return Math.round(((currentStep + 1) / steps.length) * 100);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return briefData.projectType !== '';
      case 1: return briefData.businessInfo.company !== '' && briefData.businessInfo.industry !== '';
      case 2: return briefData.targetAudience.primary !== '';
      case 3: return briefData.projectGoals.primary !== '';
      case 4: return briefData.contentRequirements.tone !== '';
      case 5: return briefData.technicalRequirements.deadline !== '';
      default: return true;
    }
  };

  const handleNext = () => {
    if (canProceed()) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep]);
      }
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const generateBrief = () => {
    const briefText = `
# ТЕХНИЧЕСКОЕ ЗАДАНИЕ

## Тип проекта
${projectTypes[briefData.projectType as keyof typeof projectTypes]}

## Информация о компании
- **Компания:** ${briefData.businessInfo.company}
- **Отрасль:** ${briefData.businessInfo.industry}
- **Сайт:** ${briefData.businessInfo.website}
- **Описание:** ${briefData.businessInfo.description}

## Целевая аудитория
- **Основная аудитория:** ${briefData.targetAudience.primary}
- **Возраст:** ${briefData.targetAudience.age}
- **Интересы:** ${briefData.targetAudience.interests.join(', ')}
- **Боли:** ${briefData.targetAudience.painPoints}

## Цели проекта
- **Основная цель:** ${briefData.projectGoals.primary}
- **Дополнительные цели:** ${briefData.projectGoals.secondary.join(', ')}
- **Метрики успеха:** ${briefData.projectGoals.metrics.join(', ')}

## Требования к контенту
- **Тон:** ${briefData.contentRequirements.tone}
- **Стиль:** ${briefData.contentRequirements.style}
- **Ключевые сообщения:** ${briefData.contentRequirements.keyMessages.join(', ')}

## Технические требования
- **Объем:** ${briefData.technicalRequirements.wordCount} слов
- **Дедлайн:** ${briefData.technicalRequirements.deadline}
- **Формат:** ${briefData.technicalRequirements.format}
- **SEO-ключи:** ${briefData.technicalRequirements.seoKeywords.join(', ')}

## Бюджет
- **Диапазон:** ${briefData.budget.range}
- **Приоритет:** ${briefData.budget.priority}
    `;

    const blob = new Blob([briefText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brief-${briefData.businessInfo.company || 'project'}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success('Бриф успешно сгенерирован и скачан!');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold">Выберите тип проекта</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {Object.entries(projectTypes).map(([key, name]) => (
                  <Card 
                    key={key}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      briefData.projectType === key 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => updateBriefData('projectType', key)}
                  >
                    <CardContent className="p-4 text-center">
                      <h4 className="font-semibold text-lg">{name}</h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="company">Название компании *</Label>
                <Input
                  id="company"
                  value={briefData.businessInfo.company}
                  onChange={(e) => updateBriefData('businessInfo', { company: e.target.value })}
                  placeholder="ООО 'Ваша компания'"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="industry">Отрасль *</Label>
                <Select value={briefData.businessInfo.industry} onValueChange={(value) => updateBriefData('businessInfo', { industry: value })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Выберите отрасль" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="website">Веб-сайт</Label>
                <Input
                  id="website"
                  value={briefData.businessInfo.website}
                  onChange={(e) => updateBriefData('businessInfo', { website: e.target.value })}
                  placeholder="https://yoursite.com"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="description">Описание компании</Label>
                <Textarea
                  id="description"
                  value={briefData.businessInfo.description}
                  onChange={(e) => updateBriefData('businessInfo', { description: e.target.value })}
                  placeholder="Расскажите о своей компании, продуктах или услугах..."
                  className="mt-2"
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="primary-audience">Основная целевая аудитория *</Label>
              <Textarea
                id="primary-audience"
                value={briefData.targetAudience.primary}
                onChange={(e) => updateBriefData('targetAudience', { primary: e.target.value })}
                placeholder="Опишите вашу основную аудиторию: кто они, чем занимаются, какие у них потребности..."
                className="mt-2"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="age">Возрастная группа</Label>
              <Input
                id="age"
                value={briefData.targetAudience.age}
                onChange={(e) => updateBriefData('targetAudience', { age: e.target.value })}
                placeholder="25-45 лет"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="pain-points">Основные проблемы и потребности аудитории</Label>
              <Textarea
                id="pain-points"
                value={briefData.targetAudience.painPoints}
                onChange={(e) => updateBriefData('targetAudience', { painPoints: e.target.value })}
                placeholder="Какие проблемы решает ваш продукт? Что беспокоит вашу аудиторию?"
                className="mt-2"
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="primary-goal">Основная цель проекта *</Label>
              <Textarea
                id="primary-goal"
                value={briefData.projectGoals.primary}
                onChange={(e) => updateBriefData('projectGoals', { primary: e.target.value })}
                placeholder="Что должен достичь этот контент? Увеличить продажи, повысить узнаваемость, привлечь трафик?"
                className="mt-2"
                rows={3}
              />
            </div>

            <div>
              <Label>Дополнительные цели</Label>
              <div className="mt-2 space-y-2">
                {['Увеличить конверсию', 'Повысить лояльность', 'Улучшить SEO', 'Развить бренд'].map(goal => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox 
                      id={goal}
                      checked={briefData.projectGoals.secondary.includes(goal)}
                      onCheckedChange={(checked) => {
                        const secondary = checked 
                          ? [...briefData.projectGoals.secondary, goal]
                          : briefData.projectGoals.secondary.filter(g => g !== goal);
                        updateBriefData('projectGoals', { secondary });
                      }}
                    />
                    <Label htmlFor={goal}>{goal}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label>Тон коммуникации *</Label>
              <Select value={briefData.contentRequirements.tone} onValueChange={(value) => updateBriefData('contentRequirements', { tone: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Выберите тон" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Профессиональный</SelectItem>
                  <SelectItem value="friendly">Дружелюбный</SelectItem>
                  <SelectItem value="authoritative">Авторитетный</SelectItem>
                  <SelectItem value="casual">Неформальный</SelectItem>
                  <SelectItem value="inspiring">Вдохновляющий</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Стиль изложения</Label>
              <Select value={briefData.contentRequirements.style} onValueChange={(value) => updateBriefData('contentRequirements', { style: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Выберите стиль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="informative">Информативный</SelectItem>
                  <SelectItem value="storytelling">Storytelling</SelectItem>
                  <SelectItem value="problem-solution">Проблема-решение</SelectItem>
                  <SelectItem value="benefits-focused">Фокус на выгодах</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="key-messages">Ключевые сообщения</Label>
              <Textarea
                id="key-messages"
                placeholder="Перечислите основные идеи, которые должны быть в тексте (по одной на строку)"
                className="mt-2"
                rows={4}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="word-count">Примерный объем (слов)</Label>
                <Input
                  id="word-count"
                  type="number"
                  value={briefData.technicalRequirements.wordCount}
                  onChange={(e) => updateBriefData('technicalRequirements', { wordCount: parseInt(e.target.value) })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="deadline">Дедлайн *</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={briefData.technicalRequirements.deadline}
                  onChange={(e) => updateBriefData('technicalRequirements', { deadline: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label>Формат контента</Label>
              <Select value={briefData.technicalRequirements.format} onValueChange={(value) => updateBriefData('technicalRequirements', { format: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Выберите формат" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="article">Статья</SelectItem>
                  <SelectItem value="landing">Лендинг</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="social-post">Пост в соцсети</SelectItem>
                  <SelectItem value="description">Описание</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="seo-keywords">SEO-ключевые слова</Label>
              <Textarea
                id="seo-keywords"
                placeholder="Перечислите ключевые слова для SEO-оптимизации (по одному на строку)"
                className="mt-2"
                rows={3}
              />
            </div>

            <div>
              <Label>Бюджет проекта</Label>
              <Select value={briefData.budget.range} onValueChange={(value) => updateBriefData('budget', { range: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Выберите диапазон" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5000-15000">5 000 - 15 000 ₽</SelectItem>
                  <SelectItem value="15000-30000">15 000 - 30 000 ₽</SelectItem>
                  <SelectItem value="30000-50000">30 000 - 50 000 ₽</SelectItem>
                  <SelectItem value="50000+">От 50 000 ₽</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-purple-50/30">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <FileText className="w-8 h-8" />
            Конструктор технического задания
          </CardTitle>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm opacity-90">
              Шаг {currentStep + 1} из {steps.length}: {steps[currentStep].title}
            </div>
            <div className="flex items-center gap-2 text-sm">
              {isSaved ? (
                <>
                  <Save className="w-4 h-4" />
                  <span>Сохранено</span>
                </>
              ) : (
                <span className="opacity-70">Сохранение...</span>
              )}
            </div>
          </div>
          <Progress value={getProgress()} className="mt-3" />
        </CardHeader>

        <CardContent className="p-8">
          {/* Навигация по шагам */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex items-center gap-2 ${
                  index === currentStep 
                    ? 'text-blue-600 font-semibold' 
                    : completedSteps.includes(index)
                    ? 'text-green-600'
                    : 'text-gray-400'
                }`}
              >
                <step.icon className="w-5 h-5" />
                <span className="hidden md:inline">{step.title}</span>
                {completedSteps.includes(index) && (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                )}
              </div>
            ))}
          </div>

          {/* Контент шага */}
          <div className="min-h-[400px]">
            {renderStepContent()}
          </div>

          {/* Навигация */}
          <div className="flex justify-between items-center pt-8 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад
            </Button>

            <div className="flex gap-4">
              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={generateBrief}
                  className="bg-gradient-to-r from-green-600 to-green-700 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Скачать ТЗ
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 flex items-center gap-2"
                >
                  Далее
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
