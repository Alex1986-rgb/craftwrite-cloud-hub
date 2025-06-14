
import { Link } from "react-router-dom";
import { Shield, FileText } from "lucide-react";

export default function OrderConsent() {
  return (
    <div className="text-xs text-muted-foreground space-y-3 bg-slate-50/50 rounded-lg p-4 border border-slate-200/50">
      <div className="flex items-start gap-2">
        <Shield className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
        <div className="space-y-2">
          <p className="font-medium text-slate-700">
            Гарантия конфиденциальности и безопасности
          </p>
          <p className="leading-relaxed">
            Отправляя заказ, вы соглашаетесь с{" "}
            <Link to="/privacy" className="text-primary hover:text-primary/80 underline-offset-2 hover:underline font-medium">
              политикой конфиденциальности
            </Link>{" "}
            и{" "}
            <Link to="/terms" className="text-primary hover:text-primary/80 underline-offset-2 hover:underline font-medium">
              условиями обслуживания
            </Link>
            . Ваши данные защищены и не передаются третьим лицам.
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
        <FileText className="w-3 h-3 text-blue-500" />
        <span className="text-slate-600">
          Мы обработаем ваш запрос в течение 1 рабочего дня
        </span>
      </div>
    </div>
  );
}
