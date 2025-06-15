
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Bot, 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  Settings,
  FileText,
  TestTube,
  Rocket
} from 'lucide-react';

interface ChatbotProgressTrackerProps {
  orderData: any;
  onBack: () => void;
}

const ORDER_STAGES = [
  {
    id: 'analysis',
    title: 'Анализ требований',
    description: 'Изучаем ваши потребности и аудиторию',
    icon: Settings,
    duration: '1-2 дня',
    status: 'completed'
  },
  {
    id: 'architecture',
    title: 'Проектирование архитектуры',
    description: 'Создаем структуру диалогов и сценариев',
    icon: FileText,
    duration: '2-3 дня',
    status: 'current'
  },
  {
    id: 'development',
    title: 'Разработка сценариев',
    description: 'Пишем и настраиваем диалоги бота',
    icon: MessageSquare,
    duration: '3-5 дней',
    status: 'pending'
  },
  {
    id: 'testing',
    title: 'Тестирование',
    description: 'Проверяем работу всех сценариев',
    icon: TestTube,
    duration: '1-2 дня',
    status: 'pending'
  },
  {
    id: 'deployment',
    title: 'Запуск и настройка',
    description: 'Развертываем бота на выбранных платформах',
    icon: Rocket,
    duration: '1 день',
    status: 'pending'
  }
];

export default function ChatbotProgressTracker({ orderData, onBack }: ChatbotProgressTrackerProps) {
  const [currentProgress, setCurrentProgress] = useState(35);
  const [timeRemaining, setTimeRemaining] = useState('5-7 дней');

  useEffect(() => {
    // Симуляция обновления прогресса
    const interval = setInterval(() => {
      setCurrentProgress(prev => {
        if (prev < 100) {
          return prev + Math.random() * 2;
        }
        return prev;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'current': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'current': return Clock;
      default: return Clock;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад
              </Button>
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-blue-600" />
                <CardTitle>Отслеживание заказа чат-бота</CardTitle>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              В работе
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2">Тип проекта</h3>
              <p className="text-gray-600">{orderData.selectedType || 'Продающие скрипты'}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Платформы</h3>
              <p className="text-gray-600">{orderData.platforms?.join(', ') || 'Telegram'}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Сложность</h3>
              <p className="text-gray-600">{orderData.complexity || 'Средний'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Общий прогресс</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Готовность: {Math.round(currentProgress)}%</span>
              <span className="text-sm text-gray-600">Осталось: {timeRemaining}</span>
            </div>
            <Progress value={currentProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Stages */}
      <div className="space-y-4">
        {ORDER_STAGES.map((stage, index) => {
          const StatusIcon = getStatusIcon(stage.status);
          
          return (
            <Card 
              key={stage.id} 
              className={`transition-all ${
                stage.status === 'current' ? 'ring-2 ring-blue-200 bg-blue-50/30' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${getStatusColor(stage.status)}`}>
                    <stage.icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{stage.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{stage.duration}</Badge>
                        <StatusIcon className={`w-5 h-5 ${
                          stage.status === 'completed' ? 'text-green-600' : 
                          stage.status === 'current' ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                      </div>
                    </div>
                    <p className="text-gray-600">{stage.description}</p>
                    
                    {stage.status === 'current' && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 text-blue-800">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">Текущий этап в работе</span>
                        </div>
                        <p className="text-sm text-blue-700 mt-1">
                          Наши специалисты создают архитектуру диалогов на основе ваших требований
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Contact Information */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Есть вопросы по заказу?</h3>
            <p className="text-gray-600 mb-4">
              Свяжитесь с нашим менеджером для получения актуальной информации
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Написать в чат
              </Button>
              <Button>
                Связаться с менеджером
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
