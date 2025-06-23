
import { Badge } from '@/components/ui/badge';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1;
        return (
          <Badge 
            key={step}
            variant={currentStep >= step ? "default" : "outline"}
            className={currentStep === step ? "bg-blue-600" : ""}
          >
            {step}
          </Badge>
        );
      })}
    </div>
  );
}
