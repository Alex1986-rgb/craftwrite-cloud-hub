
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';

interface OrderNavigationCardProps {
  currentStep: number;
  totalSteps: number;
  getStepProgress: (stepIndex: number) => number;
  canProceedToNext: (stepIndex: number) => boolean;
  onNext: () => void;
  onPrevious: () => void;
}

export default function OrderNavigationCard({
  currentStep,
  totalSteps,
  getStepProgress,
  canProceedToNext,
  onNext,
  onPrevious
}: OrderNavigationCardProps) {
  if (currentStep >= totalSteps - 1) return null;

  const stepProgress = getStepProgress(currentStep);
  const canProceed = canProceedToNext(currentStep);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Прогресс шага:</span>
            <span>{stepProgress}%</span>
          </div>
          <Progress value={stepProgress} className="h-2" />
          
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" onClick={onPrevious} className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад
              </Button>
            )}
            
            <Button 
              onClick={onNext}
              disabled={!canProceed}
              className="flex-1"
            >
              Далее
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {!canProceed && (
            <div className="flex items-center gap-2 text-sm text-orange-600">
              <AlertCircle className="w-4 h-4" />
              <span>Заполните обязательные поля для продолжения</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
