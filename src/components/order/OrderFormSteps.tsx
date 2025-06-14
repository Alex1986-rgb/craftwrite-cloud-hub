
import { CheckCircle, Circle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderFormStepsProps {
  currentStep: number;
  completedSteps: number[];
}

const steps = [
  { id: 1, title: "Контакты", desc: "Имя и email" },
  { id: 2, title: "Услуга", desc: "Выбор типа работы" },
  { id: 3, title: "Детали", desc: "Техническое задание" },
  { id: 4, title: "Параметры", desc: "Сроки и доп. услуги" },
  { id: 5, title: "Подтверждение", desc: "Финальная проверка" }
];

export default function OrderFormSteps({ currentStep, completedSteps }: OrderFormStepsProps) {
  return (
    <div className="mb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Progress line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-200 -z-10">
            <div 
              className="h-full bg-gradient-to-r from-primary to-blue-600 transition-all duration-700 ease-in-out"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = currentStep === step.id;
            
            return (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 mb-3",
                  isCompleted 
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 border-green-500 text-white shadow-lg scale-110" 
                    : isCurrent 
                      ? "bg-gradient-to-r from-primary to-blue-600 border-primary text-white shadow-lg animate-pulse scale-110" 
                      : "bg-white border-slate-300 text-slate-400"
                )}>
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Circle className="w-6 h-6" fill={isCurrent ? "currentColor" : "none"} />
                  )}
                </div>
                
                <div className="text-center">
                  <div className={cn(
                    "text-sm font-semibold transition-colors duration-300",
                    isCompleted ? "text-green-600" : isCurrent ? "text-primary" : "text-slate-500"
                  )}>
                    {step.title}
                  </div>
                  <div className="text-xs text-slate-400 hidden sm:block mt-1">
                    {step.desc}
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <ArrowRight className={cn(
                    "absolute top-6 -right-6 w-4 h-4 transition-colors duration-300 hidden md:block",
                    isCompleted ? "text-green-500" : "text-slate-300"
                  )} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
