import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Progress } from './progress';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

interface WizardStep {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  optional?: boolean;
  validation?: () => boolean | Promise<boolean>;
}

interface FormWizardProps {
  steps: WizardStep[];
  onComplete: (data: Record<string, any>) => void;
  onStepChange?: (currentStep: number, data: Record<string, any>) => void;
  className?: string;
  showProgress?: boolean;
  allowSkipOptional?: boolean;
  data?: Record<string, any>;
  onDataChange?: (data: Record<string, any>) => void;
}

export const FormWizard: React.FC<FormWizardProps> = ({
  steps,
  onComplete,
  onStepChange,
  className,
  showProgress = true,
  allowSkipOptional = true,
  data: externalData,
  onDataChange
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isValidating, setIsValidating] = useState(false);
  const [internalData, setInternalData] = useState<Record<string, any>>({});
  
  const data = externalData || internalData;
  const updateData = onDataChange || setInternalData;

  const progress = ((currentStep + 1) / steps.length) * 100;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const currentStepData = steps[currentStep];

  // Validate current step
  const validateCurrentStep = async (): Promise<boolean> => {
    if (!currentStepData.validation) return true;
    
    setIsValidating(true);
    try {
      const isValid = await currentStepData.validation();
      return isValid;
    } catch (error) {
      console.error('Step validation failed:', error);
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  // Go to next step
  const goToNext = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    const newCompletedSteps = new Set(completedSteps);
    newCompletedSteps.add(currentStep);
    setCompletedSteps(newCompletedSteps);

    if (isLastStep) {
      onComplete(data);
    } else {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange?.(nextStep, data);
    }
  };

  // Go to previous step
  const goToPrevious = () => {
    if (!isFirstStep) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange?.(prevStep, data);
    }
  };

  // Go to specific step
  const goToStep = async (stepIndex: number) => {
    if (stepIndex === currentStep) return;
    
    // If going forward, validate current step
    if (stepIndex > currentStep) {
      const isValid = await validateCurrentStep();
      if (!isValid) return;
      
      const newCompletedSteps = new Set(completedSteps);
      newCompletedSteps.add(currentStep);
      setCompletedSteps(newCompletedSteps);
    }
    
    setCurrentStep(stepIndex);
    onStepChange?.(stepIndex, data);
  };

  // Skip optional step
  const skipStep = () => {
    if (currentStepData.optional && allowSkipOptional) {
      goToNext();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'ArrowLeft' && !isFirstStep) {
        goToPrevious();
      } else if (e.altKey && e.key === 'ArrowRight' && !isLastStep) {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, isFirstStep, isLastStep]);

  const getStepStatus = (stepIndex: number) => {
    if (completedSteps.has(stepIndex)) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'inactive';
  };

  return (
    <div className={cn("form-wizard", className)}>
      {/* Progress Bar */}
      {showProgress && (
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Шаг {currentStep + 1} из {steps.length}</span>
            <span>{Math.round(progress)}% завершено</span>
          </div>
          <Progress value={progress} className="progress-enhanced" />
        </div>
      )}

      {/* Step Indicators */}
      <div className="form-wizard-header">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isClickable = index <= currentStep || completedSteps.has(index);
          
          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <button
                onClick={() => isClickable && goToStep(index)}
                disabled={!isClickable}
                className={cn(
                  "form-wizard-step-circle",
                  status,
                  isClickable && "cursor-pointer hover:scale-110 transition-transform"
                )}
              >
                {status === 'completed' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </button>

              {/* Step Label */}
              <div className="ml-3 text-sm">
                <div className={cn(
                  "font-medium",
                  status === 'active' && "text-primary",
                  status === 'completed' && "text-success",
                  status === 'inactive' && "text-muted-foreground"
                )}>
                  {step.title}
                  {step.optional && (
                    <span className="text-xs text-muted-foreground ml-1">
                      (необязательно)
                    </span>
                  )}
                </div>
                {step.description && (
                  <div className="text-muted-foreground text-xs">
                    {step.description}
                  </div>
                )}
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className={cn(
                  "form-wizard-step-line mx-4",
                  completedSteps.has(index) && "completed"
                )} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="form-card-enter-active">
        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/50 min-h-[400px]">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              {currentStepData.title}
            </h2>
            {currentStepData.description && (
              <p className="text-muted-foreground">
                {currentStepData.description}
              </p>
            )}
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {React.isValidElement(currentStepData.content) 
              ? React.cloneElement(currentStepData.content as React.ReactElement, { 
                  data, 
                  updateData: (newData: Record<string, any>) => updateData({ ...data, ...newData })
                })
              : currentStepData.content
            }
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={goToPrevious}
              disabled={isFirstStep}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Назад
            </Button>

            <div className="flex items-center gap-3">
              {/* Skip button for optional steps */}
              {currentStepData.optional && allowSkipOptional && !isLastStep && (
                <Button
                  variant="ghost"
                  onClick={skipStep}
                  className="text-muted-foreground"
                >
                  Пропустить
                </Button>
              )}

              {/* Next/Finish button */}
              <Button
                onClick={goToNext}
                disabled={isValidating}
                className="flex items-center gap-2 submit-button-enhanced"
              >
                {isValidating ? (
                  <>
                    <div className="form-spinner" />
                    Проверка...
                  </>
                ) : isLastStep ? (
                  'Завершить'
                ) : (
                  <>
                    Далее
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Keyboard shortcuts hint */}
          <div className="mt-4 text-xs text-muted-foreground text-center">
            Используйте Alt + ← → для навигации между шагами
          </div>
        </div>
      </div>
    </div>
  );
};