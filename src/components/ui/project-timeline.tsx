
import React from 'react';
import { Clock, CheckCircle, AlertCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EnhancedProgress } from './enhanced-progress';

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  date?: string;
  progress?: number;
}

interface ProjectTimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export function ProjectTimeline({ steps, className }: ProjectTimelineProps) {
  const getStepIcon = (status: TimelineStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'current':
        return <Clock className="w-5 h-5 text-blue-600 animate-pulse" />;
      case 'upcoming':
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStepClasses = (status: TimelineStep['status'], isLast: boolean) => {
    const baseClasses = "relative pb-8";
    if (!isLast) {
      switch (status) {
        case 'completed':
          return cn(baseClasses, "after:absolute after:left-2.5 after:top-8 after:w-0.5 after:h-full after:bg-green-200 dark:after:bg-green-800");
        case 'current':
          return cn(baseClasses, "after:absolute after:left-2.5 after:top-8 after:w-0.5 after:h-full after:bg-blue-200 dark:after:bg-blue-800 after:animate-pulse");
        case 'upcoming':
          return cn(baseClasses, "after:absolute after:left-2.5 after:top-8 after:w-0.5 after:h-full after:bg-gray-200 dark:after:bg-gray-700");
      }
    }
    return baseClasses;
  };

  return (
    <div className={cn("space-y-0", className)}>
      {steps.map((step, index) => (
        <div 
          key={step.id} 
          className={cn(
            getStepClasses(step.status, index === steps.length - 1),
            "stagger-item"
          )}
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="flex items-start gap-4">
            <div className={cn(
              "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
              step.status === 'completed' ? "bg-green-100 border-green-200 dark:bg-green-900/30 dark:border-green-700" :
              step.status === 'current' ? "bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700 animate-pulse" :
              "bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-600"
            )}>
              {getStepIcon(step.status)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="glass-card p-4 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={cn(
                    "font-medium transition-colors duration-300",
                    step.status === 'completed' ? "text-green-700 dark:text-green-400" :
                    step.status === 'current' ? "text-blue-700 dark:text-blue-400" :
                    "text-gray-600 dark:text-gray-400"
                  )}>
                    {step.title}
                  </h3>
                  {step.date && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {step.date}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {step.description}
                </p>

                {step.status === 'current' && step.progress !== undefined && (
                  <div className="space-y-2">
                    <EnhancedProgress 
                      value={step.progress} 
                      variant="animated"
                      size="sm"
                      showValue
                      label="Прогресс"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
