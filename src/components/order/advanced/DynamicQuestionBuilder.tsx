import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, FileText, HelpCircle } from 'lucide-react';
import { DynamicQuestion } from '@/types/advancedOrder';
import { SERVICE_SPECIFIC_QUESTIONS } from '@/data/orderFiltersConfig';
import QuestionInput from './questions/QuestionInput';

interface DynamicQuestionBuilderProps {
  serviceSlug: string;
  answers: Record<string, any>;
  onAnswersChange: (answers: Record<string, any>) => void;
  className?: string;
}

export default function DynamicQuestionBuilder({
  serviceSlug,
  answers,
  onAnswersChange,
  className
}: DynamicQuestionBuilderProps) {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const questions = SERVICE_SPECIFIC_QUESTIONS[serviceSlug] || [];

  const updateAnswer = (questionId: string, value: any) => {
    const newAnswers = {
      ...answers,
      [questionId]: value
    };
    onAnswersChange(newAnswers);
    
    if (validationErrors[questionId]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const validateQuestion = (question: DynamicQuestion, value: any): string | null => {
    if (question.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return 'Это поле обязательно для заполнения';
    }

    if (question.validation && value) {
      const { min, max, pattern } = question.validation;
      
      if (typeof value === 'string') {
        if (min && value.length < min) {
          return `Минимальная длина: ${min} символов`;
        }
        if (max && value.length > max) {
          return `Максимальная длина: ${max} символов`;
        }
        if (pattern && !new RegExp(pattern).test(value)) {
          return 'Неверный формат данных';
        }
      }
      
      if (typeof value === 'number') {
        if (min && value < min) {
          return `Минимальное значение: ${min}`;
        }
        if (max && value > max) {
          return `Максимальное значение: ${max}`;
        }
      }
    }

    return null;
  };

  const shouldShowQuestion = (question: DynamicQuestion): boolean => {
    if (!question.dependsOn || !question.showWhen) {
      return true;
    }
    return answers[question.dependsOn] === question.showWhen;
  };

  const getProgress = (): number => {
    const visibleQuestions = questions.filter(shouldShowQuestion);
    if (visibleQuestions.length === 0) return 100;
    
    const answeredQuestions = visibleQuestions.filter(q => {
      const value = answers[q.id];
      return value !== undefined && value !== null && value !== '';
    });
    
    return Math.round((answeredQuestions.length / visibleQuestions.length) * 100);
  };

  const getRequiredQuestionsCount = (): { answered: number; total: number } => {
    const requiredQuestions = questions.filter(q => q.required && shouldShowQuestion(q));
    const answeredRequired = requiredQuestions.filter(q => {
      const value = answers[q.id];
      return value !== undefined && value !== null && value !== '';
    });
    
    return {
      answered: answeredRequired.length,
      total: requiredQuestions.length
    };
  };

  const progress = getProgress();
  const requiredStats = getRequiredQuestionsCount();

  if (questions.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-8 text-center">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Для этой услуги не требуются дополнительные вопросы
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Детали заказа
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={progress === 100 ? "default" : "secondary"}>
              {requiredStats.answered}/{requiredStats.total} обязательных
            </Badge>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Прогресс заполнения</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((question) => {
          if (!shouldShowQuestion(question)) return null;
          
          const error = validationErrors[question.id];
          const isAnswered = answers[question.id] !== undefined && answers[question.id] !== null && answers[question.id] !== '';

          return (
            <div key={question.id} className="space-y-3">
              <div className="flex items-center gap-2">
                <Label className="font-medium flex items-center gap-2">
                  {isAnswered ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : question.required ? (
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                  ) : (
                    <div className="w-4 h-4" />
                  )}
                  {question.label}
                  {question.required && <span className="text-red-500">*</span>}
                </Label>
              </div>

              {question.description && (
                <p className="text-sm text-muted-foreground">{question.description}</p>
              )}

              <QuestionInput
                question={question}
                value={answers[question.id]}
                onChange={(value) => updateAnswer(question.id, value)}
                hasError={!!error}
              />

              {error && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
