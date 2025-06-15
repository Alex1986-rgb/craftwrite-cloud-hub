
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface Step {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface OrderStepsIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
  getStepProgress: (stepIndex: number) => number;
}

export default function OrderStepsIndicator({
  steps,
  currentStep,
  onStepChange,
  getStepProgress
}: OrderStepsIndicatorProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const StepIcon = step.icon;
        const isActive = index === currentStep;
        const isCompleted = getStepProgress(index) >= 80;
        const isAccessible = index <= currentStep;

        return (
          <div key={step.id} className="flex items-center">
            <Button
              variant={isActive ? "default" : isCompleted ? "secondary" : "ghost"}
              size="sm"
              className={`flex items-center gap-2 ${!isAccessible ? 'opacity-50' : ''}`}
              onClick={() => isAccessible && onStepChange(index)}
              disabled={!isAccessible}
            >
              <StepIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{step.label}</span>
              {isCompleted && <CheckCircle className="w-3 h-3" />}
            </Button>
            {index < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 mx-2 text-muted-foreground" />
            )}
          </div>
        );
      })}
    </div>
  );
}
