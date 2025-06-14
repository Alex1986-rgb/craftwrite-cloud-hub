
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Clock, Zap, Rocket } from "lucide-react";

interface OrderFormDeadlineProps {
  selectedDeadline: string;
  onDeadlineChange: (deadline: string) => void;
}

const deadlineOptions = [
  {
    id: "standard",
    label: "Стандартный",
    description: "3-5 рабочих дней",
    icon: Clock,
    multiplier: "×1",
    popular: false,
  },
  {
    id: "urgent",
    label: "Срочный",
    description: "1-2 рабочих дня",
    icon: Zap,
    multiplier: "×1.5",
    popular: true,
  },
  {
    id: "express",
    label: "Экспресс",
    description: "24 часа",
    icon: Rocket,
    multiplier: "×2",
    popular: false,
  },
];

export default function OrderFormDeadline({ 
  selectedDeadline, 
  onDeadlineChange 
}: OrderFormDeadlineProps) {
  return (
    <div className="space-y-4 md:space-y-6">
      <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
        Сроки выполнения
      </h3>
      
      <RadioGroup value={selectedDeadline} onValueChange={onDeadlineChange}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {deadlineOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div key={option.id} className="relative">
                <Label
                  htmlFor={option.id}
                  className={`block p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedDeadline === option.id
                      ? "border-primary bg-primary/5 shadow-lg scale-105"
                      : "border-slate-200 hover:border-primary/50 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-5 h-5 ${
                          selectedDeadline === option.id ? "text-primary" : "text-slate-500"
                        }`} />
                        <span className="font-semibold">{option.label}</span>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          selectedDeadline === option.id 
                            ? "bg-primary text-white" 
                            : "bg-slate-100 text-slate-600"
                        }`}>
                          {option.multiplier}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{option.description}</p>
                    </div>
                  </div>
                </Label>
                
                {option.popular && (
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Популярный
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </RadioGroup>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700">
            <div className="font-semibold mb-1">Информация о сроках:</div>
            <p>Сроки указаны в рабочих днях (пн-пт, исключая праздники). Точное время зависит от сложности проекта.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
