import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface EstimateProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  completedTabs: number;
  totalTabs: number;
  isLoading?: boolean;
}

export default function EstimateProgressIndicator({
  currentStep,
  totalSteps,
  completedTabs,
  totalTabs,
  isLoading = false
}: EstimateProgressIndicatorProps) {
  const progressPercentage = (completedTabs / totalTabs) * 100;
  const isStepComplete = completedTabs >= 3;

  const getStatusIcon = () => {
    if (isLoading) return <Clock className="w-4 h-4 animate-spin" />;
    if (isStepComplete) return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    return <AlertCircle className="w-4 h-4 text-yellow-600" />;
  };

  const getStatusColor = () => {
    if (isStepComplete) return "default";
    return "secondary";
  };

  return (
    <div className="flex items-center justify-center gap-6">
      <Badge 
        variant={getStatusColor()} 
        className="text-sm font-medium flex items-center gap-2"
      >
        {getStatusIcon()}
        Заполнено: {completedTabs}/{totalTabs} разделов
      </Badge>
      
      <div className="flex items-center gap-3">
        <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
          <Progress 
            value={progressPercentage} 
            className={`h-full transition-all duration-500 ${
              isStepComplete ? 'bg-green-500' : ''
            }`} 
          />
        </div>
        <span className="text-sm text-muted-foreground font-medium">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      
      {isLoading && (
        <Badge variant="outline" className="text-xs">
          Сохранение...
        </Badge>
      )}
    </div>
  );
}