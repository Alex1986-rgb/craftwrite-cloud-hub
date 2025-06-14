
import { Check, Clock, FileText, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderProgressIndicatorProps {
  currentStep: number;
  className?: string;
}

const steps = [
  { icon: FileText, label: "Основная информация", description: "Имя и email" },
  { icon: Clock, label: "Выбор услуги", description: "Тип контента" },
  { icon: FileText, label: "Детали проекта", description: "Описание задачи" },
  { icon: Send, label: "Отправка", description: "Готово к отправке" }
];

export default function OrderProgressIndicator({ currentStep, className }: OrderProgressIndicatorProps) {
  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="flex items-center justify-between mb-3">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const StepIcon = step.icon;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                isCompleted 
                  ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                  : isCurrent 
                    ? "bg-primary/20 text-primary border-2 border-primary animate-pulse" 
                    : "bg-muted text-muted-foreground"
              )}>
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <StepIcon className="w-5 h-5" />
                )}
              </div>
              <div className="text-center mt-2">
                <div className={cn(
                  "text-xs font-medium",
                  isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.label}
                </div>
                <div className="text-xs text-muted-foreground hidden sm:block">
                  {step.description}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "h-0.5 w-full mt-5 transition-colors duration-300",
                  isCompleted ? "bg-primary" : "bg-muted"
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
