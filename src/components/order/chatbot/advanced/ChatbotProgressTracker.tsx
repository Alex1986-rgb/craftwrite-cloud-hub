
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ArrowLeft,
  MessageSquare,
  Bot,
  Users,
  Zap,
  TestTube,
  FileText,
  Rocket
} from 'lucide-react';

interface ProgressStep {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  estimatedHours: number;
  actualHours?: number;
  details?: string[];
}

const CHATBOT_PROGRESS_STEPS: ProgressStep[] = [
  {
    id: 'analysis',
    name: 'Анализ требований',
    description: 'Изучение ТЗ, целевой аудитории и платформ',
    icon: <Users className="w-5 h-5" />,
    status: 'completed',
    estimatedHours: 4,
    actualHours: 3,
    details: [
      'Анализ целевой аудитории',
      'Определение ключевых сценариев',
      'Выбор тональности общения',
      'Планирование структуры диалогов'
    ]
  },
  {
    id: 'platform-setup',
    name: 'Настройка платформ',
    description: 'Подготовка технической части для выбранных платформ',
    icon: <Bot className="w-5 h-5" />,
    status: 'in-progress',
    estimatedHours: 6,
    actualHours: 4,
    details: [
      'Создание бота в Telegram',
      'Настройка Webhook',
      'Подключение дополнительных платформ',
      'Базовая конфигурация'
    ]
  },
  {
    id: 'script-writing',
    name: 'Написание сценариев',
    description: 'Создание диалогов и логики общения',
    icon: <MessageSquare className="w-5 h-5" />,
    status: 'pending',
    estimatedHours: 12,
    details: [
      'Приветственные сообщения',
      'Основные диалоговые ветки',
      'Обработка исключений',
      'Финальные сообщения'
    ]
  },
  {
    id: 'flow-testing',
    name: 'Тестирование логики',
    description: 'Проверка всех сценариев и исправление ошибок',
    icon: <TestTube className="w-5 h-5" />,
    status: 'pending',
    estimatedHours: 8,
    details: [
      'Тестирование всех сценариев',
      'Проверка граничных случаев',
      'Оптимизация ответов',
      'Исправление найденных ошибок'
    ]
  },
  {
    id: 'optimization',
    name: 'Оптимизация конверсий',
    description: 'Настройка для максимальной эффективности',
    icon: <Zap className="w-5 h-5" />,
    status: 'pending',
    estimatedHours: 6,
    details: [
      'Анализ узких мест',
      'A/B тестирование сообщений',
      'Настройка CTA кнопок',
      'Улучшение конверсии'
    ]
  },
  {
    id: 'documentation',
    name: 'Документация',
    description: 'Создание инструкций и передача проекта',
    icon: <FileText className="w-5 h-5" />,
    status: 'pending',
    estimatedHours: 4,
    details: [
      'Техническая документация',
      'Инструкция для администраторов',
      'Руководство по модерации',
      'Рекомендации по развитию'
    ]
  },
  {
    id: 'deployment',
    name: 'Запуск и передача',
    description: 'Финальный запуск и обучение команды',
    icon: <Rocket className="w-5 h-5" />,
    status: 'pending',
    estimatedHours: 2,
    details: [
      'Финальная проверка',
      'Запуск в продакшн',
      'Обучение команды клиента',
      'Постановка на поддержку'
    ]
  }
];

interface ChatbotProgressTrackerProps {
  orderData: any;
  onBack: () => void;
}

export default function ChatbotProgressTracker({ orderData, onBack }: ChatbotProgressTrackerProps) {
  const [steps, setSteps] = useState<ProgressStep[]>(CHATBOT_PROGRESS_STEPS);
  const [currentStepIndex, setCurrentStepIndex] = useState(1);

  useEffect(() => {
    // Simulate progress updates
    const interval = setInterval(() => {
      setSteps(prevSteps => {
        const newSteps = [...prevSteps];
        const currentStep = newSteps[currentStepIndex];
        
        if (currentStep && currentStep.status === 'in-progress') {
          if (currentStep.actualHours && currentStep.actualHours < currentStep.estimatedHours) {
            currentStep.actualHours += 0.5;
          } else {
            currentStep.status = 'completed';
            currentStep.actualHours = currentStep.estimatedHours;
            
            if (currentStepIndex < newSteps.length - 1) {
              newSteps[currentStepIndex + 1].status = 'in-progress';
              newSteps[currentStepIndex + 1].actualHours = 0;
              setCurrentStepIndex(currentStepIndex + 1);
            }
          }
        }
        
        return newSteps;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentStepIndex]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600 animate-pulse" />;
      case 'blocked':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 border-green-300';
      case 'in-progress':
        return 'bg-blue-100 border-blue-300';
      case 'blocked':
        return 'bg-red-100 border-red-300';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const totalHours = steps.reduce((sum, step) => sum + step.estimatedHours, 0);
  const completedHours = steps.reduce((sum, step) => {
    return sum + (step.status === 'completed' ? step.estimatedHours : (step.actualHours || 0));
  }, 0);
  const progressPercentage = (completedHours / totalHours) * 100;

  const completedSteps = steps.filter(step => step.status === 'completed').length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-6 h-6" />
                Создание чат-бота: {orderData?.service || 'Скрипты для чат-ботов'}
              </CardTitle>
              <p className="text-gray-600">
                Отслеживание прогресса разработки • Заказ от {orderData?.name || 'Клиент'}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {completedSteps}/{steps.length} этапов
                </div>
                <div className="text-sm text-gray-600">
                  {completedHours.toFixed(1)}/{totalHours} часов
                </div>
              </div>
              <Badge variant={progressPercentage === 100 ? 'default' : 'secondary'} className="text-lg px-4 py-2">
                {Math.round(progressPercentage)}% готово
              </Badge>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Progress Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card key={step.id} className={`${getStatusColor(step.status)} transition-all`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border">
                    {step.icon}
                  </div>
                  {getStatusIcon(step.status)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{step.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      Этап {index + 1}
                    </Badge>
                    {step.status === 'in-progress' && (
                      <Badge variant="default" className="text-xs animate-pulse">
                        В работе
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-3">{step.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium mb-2">Что включает:</div>
                      <ul className="space-y-1">
                        {step.details?.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className={`w-2 h-2 rounded-full ${
                              step.status === 'completed' ? 'bg-green-500' : 
                              step.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                            }`} />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Прогресс:</span>
                        <span>
                          {step.status === 'completed' ? step.estimatedHours : (step.actualHours || 0).toFixed(1)}/
                          {step.estimatedHours} ч
                        </span>
                      </div>
                      <Progress 
                        value={
                          step.status === 'completed' ? 100 : 
                          step.status === 'in-progress' ? ((step.actualHours || 0) / step.estimatedHours) * 100 : 0
                        } 
                        className="h-2"
                      />
                      
                      {step.status === 'in-progress' && (
                        <div className="text-xs text-blue-600">
                          Примерное время завершения: {Math.ceil(step.estimatedHours - (step.actualHours || 0))} часов
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Параметры проекта</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <div className="font-medium">Платформы:</div>
                <div className="text-sm text-gray-600">
                  {orderData?.platform || 'Telegram, WhatsApp Business'}
                </div>
              </div>
              <div>
                <div className="font-medium">Сложность:</div>
                <div className="text-sm text-gray-600">
                  {orderData?.complexity || 'Средние сценарии (10-25 диалогов)'}
                </div>
              </div>
              <div>
                <div className="font-medium">Целевая аудитория:</div>
                <div className="text-sm text-gray-600">
                  {orderData?.targetAudience || 'Покупатели интернет-магазинов'}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="font-medium">Дополнительные услуги:</div>
                <div className="text-sm text-gray-600">
                  {orderData?.additionalServices?.length > 0 
                    ? orderData.additionalServices.join(', ')
                    : 'AI-интеграция, Аналитика диалогов'
                  }
                </div>
              </div>
              <div>
                <div className="font-medium">Срок выполнения:</div>
                <div className="text-sm text-gray-600">
                  {orderData?.deadline || '1-2 недели'}
                </div>
              </div>
              <div>
                <div className="font-medium">Стоимость:</div>
                <div className="text-lg font-bold text-blue-600">
                  {orderData?.estimatedPrice?.toLocaleString() || '15,000'}₽
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
