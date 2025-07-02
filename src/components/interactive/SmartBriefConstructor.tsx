
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Download,
  Globe,
  Mail,
  User,
  Calendar,
  Hash
} from 'lucide-react';
import { toast } from 'sonner';
import { EnhancedFormField } from '@/components/ui/enhanced-form-field';
import { ProgressiveTextarea } from '@/components/ui/progressive-textarea';
import { ModernSelect } from '@/components/ui/modern-select';

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

  const updateBriefData = (section: keyof BriefData, data: any) => {
    setBriefData(prev => {
      const newData = {
        ...prev,
        [section]: typeof prev[section] === 'object' && prev[section] !== null
          ? { ...prev[section], ...data }
          : data
      };
      console.log('Brief data updated:', { section, data, newData }); // Debug log
      return newData;
    });
    setIsSaved(false);
  };

  const getProgress = () => {
    return Math.round(((currentStep + 1) / steps.length) * 100);
  };

  const canProceed = () => {
    const result = (() => {
      switch (currentStep) {
        case 0: return briefData.projectType.trim() !== '';
        case 1: return briefData.businessInfo.company.trim() !== '' && briefData.businessInfo.industry.trim() !== '';
        case 2: return briefData.targetAudience.primary.trim() !== '';
        case 3: return briefData.projectGoals.primary.trim() !== '';
        case 4: return briefData.contentRequirements.tone.trim() !== '';
        case 5: return briefData.technicalRequirements.deadline.trim() !== '';
        default: return true;
      }
    })();
    console.log('canProceed check:', { currentStep, result, briefData }); // Debug log
    return result;
  };

  const handleNext = () => {
    console.log('handleNext called, canProceed:', canProceed()); // Debug log
    if (canProceed()) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep]);
      }
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
      toast.success(`Шаг ${currentStep + 1} завершен!`);
    } else {
      toast.error('Пожалуйста, заполните обязательные поля для продолжения');
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
                    onClick={() => {
                      console.log('Project type selected:', key); // Debug log
                      setBriefData(prev => ({ ...prev, projectType: key }));
                    }}
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
              <EnhancedFormField
                id="company"
                name="company"
                type="text"
                label="Название компании"
                placeholder="ООО 'Ваша компания'"
                icon={User}
                value={briefData.businessInfo.company}
                onChange={(e) => updateBriefData('businessInfo', { company: e.target.value })}
                required
                validationRules={[
                  (value) => !value.trim() ? 'Название компании обязательно' : null,
                  (value) => value.length < 2 ? 'Название должно содержать минимум 2 символа' : null
                ]}
                realTimeValidation
                autoSave
                onAutoSave={(value) => localStorage.setItem('brief_company', value)}
                tooltip="Укажите полное или сокращенное название компании"
              />

              <ModernSelect
                options={industries.map(industry => ({ 
                  value: industry, 
                  label: industry,
                  description: industry === 'Другое' ? 'Опишите вашу отрасль' : undefined
                }))}
                value={briefData.businessInfo.industry}
                onValueChange={(value) => updateBriefData('businessInfo', { industry: value as string })}
                label="Отрасль"
                placeholder="Выберите отрасль"
                searchable
              />

              <EnhancedFormField
                id="website"
                name="website"
                type="url"
                label="Веб-сайт"
                placeholder="https://yoursite.com"
                icon={Globe}
                value={briefData.businessInfo.website}
                onChange={(e) => updateBriefData('businessInfo', { website: e.target.value })}
                validationRules={[
                  (value) => {
                    if (!value) return null;
                    try {
                      new URL(value);
                      return null;
                    } catch {
                      return 'Введите корректный URL';
                    }
                  }
                ]}
                realTimeValidation
                autoSave
                onAutoSave={(value) => localStorage.setItem('brief_website', value)}
                tooltip="Адрес сайта компании (если есть)"
              />

              <ProgressiveTextarea
                id="description"
                name="description"
                label="Описание компании"
                placeholder="Расскажите о своей компании, продуктах или услугах..."
                value={briefData.businessInfo.description}
                onChange={(e) => updateBriefData('businessInfo', { description: e.target.value })}
                characterLimit={1000}
                showWordCount
                autoResize
                minRows={4}
                maxRows={8}
                suggestions={[
                  "Мы разрабатываем IT-решения для бизнеса",
                  "Производим качественную мебель на заказ",
                  "Оказываем юридические услуги для компаний",
                  "Предоставляем консалтинговые услуги в области маркетинга",
                  "Разрабатываем мобильные приложения"
                ]}
                autoSave
                onAutoSave={(value) => localStorage.setItem('brief_description', value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <ProgressiveTextarea
              id="primary-audience"
              name="primary-audience"
              label="Основная целевая аудитория"
              placeholder="Опишите вашу основную аудиторию: кто они, чем занимаются, какие у них потребности..."
              value={briefData.targetAudience.primary}
              onChange={(e) => updateBriefData('targetAudience', { primary: e.target.value })}
              required
              characterLimit={500}
              showWordCount
              autoResize
              minRows={3}
              maxRows={6}
              suggestions={[
                "Предприниматели и владельцы малого бизнеса, 30-50 лет",
                "IT-специалисты и разработчики, работающие в стартапах",
                "Маркетологи и SMM-специалисты в компаниях среднего звена",
                "Руководители отделов продаж в B2B сегменте",
                "Собственники интернет-магазинов и e-commerce проектов"
              ]}
              autoSave
              onAutoSave={(value) => localStorage.setItem('brief_audience', value)}
            />

            <EnhancedFormField
              id="age"
              name="age"
              type="text"
              label="Возрастная группа"
              placeholder="25-45 лет"
              value={briefData.targetAudience.age}
              onChange={(e) => updateBriefData('targetAudience', { age: e.target.value })}
              validationRules={[
                (value) => {
                  if (!value) return null;
                  const agePattern = /^\d+(-\d+)?(\s*лет)?$/;
                  return agePattern.test(value) ? null : 'Укажите возраст в формате "25-45" или "30 лет"';
                }
              ]}
              realTimeValidation
              autoSave
              onAutoSave={(value) => localStorage.setItem('brief_age', value)}
              tooltip="Укажите возрастной диапазон целевой аудитории"
            />

            <ProgressiveTextarea
              id="pain-points"
              name="pain-points"
              label="Основные проблемы и потребности аудитории"
              placeholder="Какие проблемы решает ваш продукт? Что беспокоит вашу аудиторию?"
              value={briefData.targetAudience.painPoints}
              onChange={(e) => updateBriefData('targetAudience', { painPoints: e.target.value })}
              characterLimit={500}
              showWordCount
              autoResize
              minRows={3}
              maxRows={6}
              suggestions={[
                "Нехватка времени на рутинные задачи",
                "Сложности с привлечением новых клиентов",
                "Высокие расходы на маркетинг при низкой отдаче",
                "Проблемы с автоматизацией бизнес-процессов",
                "Недостаток экспертизы в digital-сфере"
              ]}
              autoSave
              onAutoSave={(value) => localStorage.setItem('brief_pain_points', value)}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <ProgressiveTextarea
              id="primary-goal"
              name="primary-goal"
              label="Основная цель проекта"
              placeholder="Что должен достичь этот контент? Увеличить продажи, повысить узнаваемость, привлечь трафик?"
              value={briefData.projectGoals.primary}
              onChange={(e) => updateBriefData('projectGoals', { primary: e.target.value })}
              required
              characterLimit={300}
              showWordCount
              autoResize
              minRows={3}
              maxRows={5}
              suggestions={[
                "Увеличить конверсию сайта на 25% за 3 месяца",
                "Привлечь 1000 новых подписчиков в соцсетях",
                "Повысить узнаваемость бренда в целевом сегменте",
                "Генерировать 50+ качественных лидов в месяц",
                "Улучшить позиции сайта в поисковой выдаче"
              ]}
              autoSave
              onAutoSave={(value) => localStorage.setItem('brief_primary_goal', value)}
            />

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
            <ModernSelect
              options={[
                { value: 'professional', label: 'Профессиональный', description: 'Деловой, экспертный тон' },
                { value: 'friendly', label: 'Дружелюбный', description: 'Теплый, располагающий' },
                { value: 'authoritative', label: 'Авторитетный', description: 'Уверенный, экспертный' },
                { value: 'casual', label: 'Неформальный', description: 'Простой, разговорный' },
                { value: 'inspiring', label: 'Вдохновляющий', description: 'Мотивирующий, энергичный' }
              ]}
              value={briefData.contentRequirements.tone}
              onValueChange={(value) => updateBriefData('contentRequirements', { tone: value as string })}
              label="Тон коммуникации"
              placeholder="Выберите тон"
              searchable={false}
            />

            <ModernSelect
              options={[
                { value: 'informative', label: 'Информативный', description: 'Факты, данные, объяснения' },
                { value: 'storytelling', label: 'Storytelling', description: 'Истории, кейсы, примеры' },
                { value: 'problem-solution', label: 'Проблема-решение', description: 'Выявление проблемы и её решение' },
                { value: 'benefits-focused', label: 'Фокус на выгодах', description: 'Акцент на преимуществах' }
              ]}
              value={briefData.contentRequirements.style}
              onValueChange={(value) => updateBriefData('contentRequirements', { style: value as string })}
              label="Стиль изложения"
              placeholder="Выберите стиль"
              searchable={false}
            />

            <ProgressiveTextarea
              id="key-messages"
              name="key-messages"
              label="Ключевые сообщения"
              placeholder="Перечислите основные идеи, которые должны быть в тексте (по одной на строку)"
              value={briefData.contentRequirements.keyMessages.join('\n')}
              onChange={(e) => updateBriefData('contentRequirements', { 
                keyMessages: e.target.value.split('\n').filter(msg => msg.trim())
              })}
              characterLimit={800}
              showWordCount
              autoResize
              minRows={4}
              maxRows={8}
              suggestions={[
                "Наша компания - лидер в отрасли",
                "Высокое качество продукции по доступной цене",
                "Индивидуальный подход к каждому клиенту",
                "Быстрое решение задач клиента",
                "Экспертность и многолетний опыт"
              ]}
              autoSave
              onAutoSave={(value) => localStorage.setItem('brief_key_messages', value)}
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EnhancedFormField
                id="word-count"
                name="word-count"
                type="number"
                label="Примерный объем (слов)"
                placeholder="1000"
                icon={Hash}
                value={briefData.technicalRequirements.wordCount.toString()}
                onChange={(e) => updateBriefData('technicalRequirements', { 
                  wordCount: parseInt(e.target.value) || 0 
                })}
                validationRules={[
                  (value) => {
                    const num = parseInt(value);
                    if (isNaN(num) || num < 100) return 'Минимум 100 слов';
                    if (num > 50000) return 'Максимум 50,000 слов';
                    return null;
                  }
                ]}
                realTimeValidation
                autoSave
                onAutoSave={(value) => localStorage.setItem('brief_word_count', value)}
                tooltip="Укажите желаемый объем текста"
              />

              <EnhancedFormField
                id="deadline"
                name="deadline"
                type="date"
                label="Дедлайн"
                icon={Calendar}
                value={briefData.technicalRequirements.deadline}
                onChange={(e) => updateBriefData('technicalRequirements', { deadline: e.target.value })}
                required
                validationRules={[
                  (value) => {
                    if (!value) return 'Дедлайн обязателен';
                    const deadline = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (deadline < today) return 'Дедлайн не может быть в прошлом';
                    return null;
                  }
                ]}
                realTimeValidation
                autoSave
                onAutoSave={(value) => localStorage.setItem('brief_deadline', value)}
                tooltip="Укажите желаемую дату получения готового контента"
              />
            </div>

            <ModernSelect
              options={[
                { value: 'article', label: 'Статья', description: 'Информационная или SEO-статья' },
                { value: 'landing', label: 'Лендинг', description: 'Посадочная страница' },
                { value: 'email', label: 'Email', description: 'Email-рассылка' },
                { value: 'social-post', label: 'Пост в соцсети', description: 'Контент для социальных сетей' },
                { value: 'description', label: 'Описание', description: 'Описание товара или услуги' }
              ]}
              value={briefData.technicalRequirements.format}
              onValueChange={(value) => updateBriefData('technicalRequirements', { format: value as string })}
              label="Формат контента"
              placeholder="Выберите формат"
              searchable={false}
            />

            <ProgressiveTextarea
              id="seo-keywords"
              name="seo-keywords"
              label="SEO-ключевые слова"
              placeholder="Перечислите ключевые слова для SEO-оптимизации (по одному на строку)"
              value={briefData.technicalRequirements.seoKeywords.join('\n')}
              onChange={(e) => updateBriefData('technicalRequirements', { 
                seoKeywords: e.target.value.split('\n').filter(keyword => keyword.trim())
              })}
              characterLimit={500}
              showWordCount
              autoResize
              minRows={3}
              maxRows={6}
              suggestions={[
                "купить товар москва",
                "услуги компании недорого",
                "лучший сервис отзывы",
                "доставка заказ быстро",
                "качественный продукт цена"
              ]}
              autoSave
              onAutoSave={(value) => localStorage.setItem('brief_seo_keywords', value)}
            />

            <ModernSelect
              options={[
                { value: '5000-15000', label: '5 000 - 15 000 ₽', description: 'Базовый контент' },
                { value: '15000-30000', label: '15 000 - 30 000 ₽', description: 'Стандартный проект' },
                { value: '30000-50000', label: '30 000 - 50 000 ₽', description: 'Премиум качество' },
                { value: '50000+', label: 'От 50 000 ₽', description: 'Комплексный проект' }
              ]}
              value={briefData.budget.range}
              onValueChange={(value) => updateBriefData('budget', { range: value as string })}
              label="Бюджет проекта"
              placeholder="Выберите диапазон"
              searchable={false}
            />
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
                  className={`submit-button-enhanced ${
                    !canProceed() 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  } flex items-center gap-2`}
                  title={!canProceed() ? 'Заполните обязательные поля для продолжения' : 'Перейти к следующему шагу'}
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
