
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  Search, 
  Users, 
  Layout, 
  PenTool, 
  Shield, 
  Eye 
} from 'lucide-react';

interface OrderStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  estimatedTime: string;
  completedAt?: string;
}

interface OrderProgressTrackerProps {
  orderData: any;
  onBack?: () => void;
}

export default function OrderProgressTracker({ orderData, onBack }: OrderProgressTrackerProps) {
  const [steps, setSteps] = useState<OrderStep[]>([
    {
      id: 'analysis',
      title: 'Анализ технического задания',
      description: 'Изучение требований и параметров заказа',
      icon: FileText,
      status: 'completed',
      estimatedTime: '30 мин',
      completedAt: new Date().toLocaleString()
    },
    {
      id: 'keywords',
      title: 'Исследование ключевых слов',
      description: 'Подбор и анализ релевантных запросов',
      icon: Search,
      status: 'in-progress',
      estimatedTime: '2-4 часа'
    },
    {
      id: 'competitors',
      title: 'Анализ конкурентов',
      description: 'Изучение стратегий и контента конкурентов',
      icon: Users,
      status: 'pending',
      estimatedTime: '3-6 часов'
    },
    {
      id: 'structure',
      title: 'Создание структуры',
      description: 'Разработка плана и структуры текста',
      icon: Layout,
      status: 'pending',
      estimatedTime: '1-2 часа'
    },
    {
      id: 'writing',
      title: 'Написание текста',
      description: 'Создание основного контента',
      icon: PenTool,
      status: 'pending',
      estimatedTime: '4-8 часов'
    },
    {
      id: 'uniqueness',
      title: 'Проверка уникальности',
      description: 'Проверка на плагиат и уникальность',
      icon: Shield,
      status: 'pending',
      estimatedTime: '30 мин'
    },
    {
      id: 'review',
      title: 'Финальная вычитка',
      description: 'Редактура и финальная проверка',
      icon: Eye,
      status: 'pending',
      estimatedTime: '1-2 часа'
    }
  ]);

  const getOverallProgress = () => {
    const completed = steps.filter(step => step.status === 'completed').length;
    const inProgress = steps.filter(step => step.status === 'in-progress').length;
    return Math.round(((completed + inProgress * 0.5) / steps.length) * 100);
  };

  const getStatusIcon = (status: OrderStep['status']) => {
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

  const getStatusColor = (status: OrderStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'blocked':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300';
    }
  };

  // Simulate progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSteps(prev => {
        const updated = [...prev];
        const inProgressIndex = updated.findIndex(step => step.status === 'in-progress');
        
        if (inProgressIndex !== -1 && Math.random() > 0.7) {
          updated[inProgressIndex].status = 'completed';
          updated[inProgressIndex].completedAt = new Date().toLocaleString();
          
          if (inProgressIndex + 1 < updated.length) {
            updated[inProgressIndex + 1].status = 'in-progress';
          }
        }
        
        return updated;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Процесс создания текста</CardTitle>
              <p className="text-gray-600 mt-2">
                Заказ: {orderData?.serviceName || 'Текстовый контент'}
              </p>
            </div>
            {onBack && (
              <Button variant="outline" onClick={onBack}>
                Назад к заказам
              </Button>
            )}
          </div>
          
          <div className="space-y-4 mt-6">
            <div className="flex justify-between text-sm">
              <span>Общий прогресс</span>
              <span>{getOverallProgress()}%</span>
            </div>
            <Progress value={getOverallProgress()} className="h-3" />
          </div>
        </CardHeader>
      </Card>

      {/* Order Parameters Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Параметры заказа</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Услуга:</span>
                <span className="font-medium">{orderData?.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Объем:</span>
                <span className="font-medium">{orderData?.filters?.characterCount || 'Не указано'} символов</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Срок:</span>
                <span className="font-medium">{orderData?.timeline?.estimatedDays || 3} дня</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Стоимость:</span>
                <span className="font-medium">{orderData?.pricing?.totalPrice?.toLocaleString()} ₽</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Целевая аудитория:</span>
                <span className="font-medium text-sm">{orderData?.filters?.target_audience ? 'Указана' : 'Не указана'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ключевые слова:</span>
                <span className="font-medium text-sm">{orderData?.filters?.keywords ? 'Есть' : 'Подберем'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Анализ конкурентов:</span>
                <span className="font-medium text-sm">{orderData?.competitorDomains?.length > 0 ? `${orderData.competitorDomains.length} доменов` : 'Не требуется'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          
          return (
            <Card key={step.id} className={`transition-all ${step.status === 'in-progress' ? 'ring-2 ring-blue-200' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(step.status)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold flex items-center gap-2">
                        <StepIcon className="w-4 h-4" />
                        {step.title}
                      </h3>
                      <Badge className={getStatusColor(step.status)}>
                        {step.status === 'completed' ? 'Завершено' :
                         step.status === 'in-progress' ? 'В работе' :
                         step.status === 'blocked' ? 'Заблокировано' : 'Ожидает'}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Время выполнения: {step.estimatedTime}</span>
                      {step.completedAt && (
                        <span>Завершено: {step.completedAt}</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Estimated Completion */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Ожидаемое завершение</h3>
          <p className="text-gray-600">
            Ваш заказ будет готов в течение {orderData?.timeline?.estimatedDays || 3} рабочих дней
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Мы уведомим вас о каждом этапе выполнения заказа
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
