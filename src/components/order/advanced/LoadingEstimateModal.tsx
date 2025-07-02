import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Loader2, FileText, Calculator, CheckCircle } from 'lucide-react';

interface LoadingEstimateModalProps {
  isOpen: boolean;
  progress: number;
  currentStep: string;
}

export default function LoadingEstimateModal({ 
  isOpen, 
  progress, 
  currentStep 
}: LoadingEstimateModalProps) {
  const steps = [
    { id: 'analyzing', label: 'Анализ технического задания', icon: FileText },
    { id: 'calculating', label: 'Расчет стоимости', icon: Calculator },
    { id: 'finalizing', label: 'Формирование сметы', icon: CheckCircle }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-md">
        <div className="text-center space-y-6 p-6">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Создание детальной сметы</h3>
            <p className="text-sm text-muted-foreground">
              Пожалуйста, подождите...
            </p>
          </div>

          <div className="space-y-4">
            <Progress value={progress} className="h-2" />
            
            <div className="space-y-3">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = step.id === currentStep;
                const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
                
                return (
                  <div 
                    key={step.id}
                    className={`flex items-center gap-3 text-sm ${
                      isActive ? 'text-primary font-medium' : 
                      isCompleted ? 'text-green-600' : 'text-muted-foreground'
                    }`}
                  >
                    <StepIcon className={`w-4 h-4 ${
                      isActive ? 'animate-pulse' : ''
                    }`} />
                    <span>{step.label}</span>
                    {isCompleted && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}