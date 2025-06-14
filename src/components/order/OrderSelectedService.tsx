
import { CheckCircle, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderSelectedServiceProps {
  serviceName: string;
}

export default function OrderSelectedService({ serviceName }: OrderSelectedServiceProps) {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200/60 rounded-xl p-4 md:p-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-sm font-medium text-green-700 mb-1">Выбранная услуга:</div>
            <div className="text-lg font-bold text-green-800">{serviceName}</div>
          </div>
        </div>
        
        <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-100">
          <Edit3 className="w-4 h-4 mr-2" />
          Изменить
        </Button>
      </div>
      
      <div className="mt-4 text-sm text-green-600 bg-green-100/50 rounded-lg p-3">
        💡 <strong>Совет:</strong> Чем подробнее вы опишете задачу, тем точнее будет результат
      </div>
    </div>
  );
}
