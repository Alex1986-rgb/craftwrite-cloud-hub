
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Package } from 'lucide-react';
import { Service } from '@/data/types/service';
import OrderStepsIndicator from './OrderStepsIndicator';

interface Step {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface OrderProgressHeaderProps {
  selectedService: Service;
  onClose?: () => void;
  overallProgress: number;
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
  getStepProgress: (stepIndex: number) => number;
}

export default function OrderProgressHeader({
  selectedService,
  onClose,
  overallProgress,
  steps,
  currentStep,
  onStepChange,
  getStepProgress
}: OrderProgressHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl font-bold mb-2">
              <Package className="w-6 h-6" />
              Заказ: {selectedService.name}
            </CardTitle>
            <p className="text-muted-foreground">{selectedService.desc}</p>
          </div>
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Закрыть
            </Button>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Общий прогресс</span>
            <span>{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
          
          <OrderStepsIndicator
            steps={steps}
            currentStep={currentStep}
            onStepChange={onStepChange}
            getStepProgress={getStepProgress}
          />
        </div>
      </CardHeader>
    </Card>
  );
}
