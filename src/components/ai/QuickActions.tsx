
import { Button } from "@/components/ui/button";
import { Calculator, FileText, Sparkles, MessageCircle, LucideIcon } from "lucide-react";

interface QuickAction {
  label: string;
  message: string;
  icon: LucideIcon;
}

const quickActions: QuickAction[] = [
  { label: "Рассчитать стоимость", message: "Рассчитайте стоимость моего проекта", icon: Calculator },
  { label: "Узнать о услугах", message: "Расскажите подробно о ваших услугах", icon: FileText },
  { label: "Посмотреть портфолио", message: "Покажите примеры ваших работ", icon: Sparkles },
  { label: "Процесс работы", message: "Как вы работаете с клиентами?", icon: MessageCircle }
];

interface QuickActionsProps {
  onActionClick: (message: string) => void;
}

export const QuickActions = ({ onActionClick }: QuickActionsProps) => {
  return (
    <div className="p-3 border-b border-slate-100 bg-slate-50">
      <div className="grid grid-cols-2 gap-2">
        {quickActions.map((action) => (
          <Button
            key={action.label}
            onClick={() => onActionClick(action.message)}
            variant="outline"
            size="sm"
            className="text-xs h-8 bg-white hover:bg-blue-50 border-slate-200"
          >
            <action.icon className="w-3 h-3 mr-1" />
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
