
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Clock, 
  Users, 
  Target,
  BarChart3,
  Eye,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface FunnelAnalyticsDisplayProps {
  sessionMetrics: {
    sessionId: string;
    totalTime: number;
    completedSteps: number;
    totalSteps: number;
    completionRate: number;
    averageStepTime: number;
    currentStep: number;
    stepHistory: Array<{
      stepNumber: number;
      stepName: string;
      enteredAt: Date;
      timeSpent?: number;
      completed: boolean;
    }>;
  };
  showDetails?: boolean;
}

export default function FunnelAnalyticsDisplay({ 
  sessionMetrics, 
  showDetails = false 
}: FunnelAnalyticsDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [realTimeMetrics, setRealTimeMetrics] = useState(sessionMetrics);

  useEffect(() => {
    setRealTimeMetrics(sessionMetrics);
  }, [sessionMetrics]);

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (minutes > 0) {
      return `${minutes}м ${seconds % 60}с`;
    }
    return `${seconds}с`;
  };

  const getStepStatus = (stepNumber: number) => {
    const step = realTimeMetrics.stepHistory.find(s => s.stepNumber === stepNumber);
    
    if (!step) return 'not-started';
    if (step.completed) return 'completed';
    if (stepNumber === realTimeMetrics.currentStep) return 'current';
    return 'visited';
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'current': return 'bg-blue-500';
      case 'visited': return 'bg-yellow-500';
      default: return 'bg-gray-300';
    }
  };

  if (!showDetails) {
    // Компактное отображение для боковой панели
    return (
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            Прогресс сессии
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Завершено шагов</span>
            <Badge variant="secondary">
              {realTimeMetrics.completedSteps}/{realTimeMetrics.totalSteps}
            </Badge>
          </div>
          
          <Progress 
            value={realTimeMetrics.completionRate} 
            className="h-2"
          />
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Время в форме</span>
            <span className="font-medium">{formatTime(realTimeMetrics.totalTime)}</span>
          </div>

          <div className="grid grid-cols-5 gap-1 mt-3">
            {[1, 2, 3, 4, 5].map(stepNum => (
              <div
                key={stepNum}
                className={`h-2 rounded-full ${getStepColor(getStepStatus(stepNum))}`}
                title={`Шаг ${stepNum}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Детальное отображение
  return (
    <div className="space-y-6">
      {/* Основные метрики */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">
              {realTimeMetrics.completionRate.toFixed(0)}%
            </div>
            <div className="text-xs text-gray-600">Прогресс</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {formatTime(realTimeMetrics.totalTime)}
            </div>
            <div className="text-xs text-gray-600">Общее время</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {realTimeMetrics.currentStep}
            </div>
            <div className="text-xs text-gray-600">Текущий шаг</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600">
              {realTimeMetrics.averageStepTime}с
            </div>
            <div className="text-xs text-gray-600">Среднее время/шаг</div>
          </CardContent>
        </Card>
      </div>

      {/* Детали по шагам */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Детали по шагам
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Скрыть' : 'Показать детали'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(stepNum => {
              const step = realTimeMetrics.stepHistory.find(s => s.stepNumber === stepNum);
              const status = getStepStatus(stepNum);
              
              return (
                <div
                  key={stepNum}
                  className="flex items-center gap-4 p-3 rounded-lg bg-gray-50"
                >
                  <div className={`w-3 h-3 rounded-full ${getStepColor(status)}`} />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Шаг {stepNum}</span>
                      <Badge variant="outline" className="text-xs">
                        {step?.stepName || 'Не посещён'}
                      </Badge>
                    </div>
                    
                    {isExpanded && step && (
                      <div className="text-xs text-gray-600 mt-1 space-y-1">
                        <div>Вход: {step.enteredAt.toLocaleTimeString()}</div>
                        {step.timeSpent && (
                          <div>Время: {formatTime(step.timeSpent)}</div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right">
                    {status === 'completed' && (
                      <Badge className="bg-green-100 text-green-800">
                        Завершён
                      </Badge>
                    )}
                    {status === 'current' && (
                      <Badge className="bg-blue-100 text-blue-800">
                        Текущий
                      </Badge>
                    )}
                    {status === 'visited' && (
                      <Badge variant="outline">
                        Посещён
                      </Badge>
                    )}
                  </div>
                  
                  {stepNum < 5 && (
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Сессионная информация */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Информация о сессии
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">ID сессии:</span>
              <div className="font-mono text-xs break-all">
                {realTimeMetrics.sessionId}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Начало сессии:</span>
              <div>{new Date(Date.now() - realTimeMetrics.totalTime).toLocaleString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
