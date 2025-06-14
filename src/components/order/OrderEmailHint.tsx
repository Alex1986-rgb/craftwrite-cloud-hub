
import { Mail, Shield, Clock } from "lucide-react";

export default function OrderEmailHint() {
  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-start gap-2 text-xs text-slate-500">
        <Mail className="w-3 h-3 mt-0.5 text-blue-500 flex-shrink-0" />
        <span>На этот email мы отправим расчет стоимости и детали проекта</span>
      </div>
      
      <div className="flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
          <Shield className="w-3 h-3" />
          <span>Защищен</span>
        </div>
        <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
          <Clock className="w-3 h-3" />
          <span>Ответ в течение часа</span>
        </div>
      </div>
    </div>
  );
}
