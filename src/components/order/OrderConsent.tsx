
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Shield, Lock, FileText } from "lucide-react";

interface OrderConsentProps {
  variant?: 'public' | 'client';
}

export default function OrderConsent({ variant = 'public' }: OrderConsentProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
        <Checkbox id="consent" className="mt-1" />
        <div className="flex-1">
          <Label htmlFor="consent" className="text-sm cursor-pointer">
            Я согласен с{" "}
            <a href="/privacy" className="text-primary hover:underline">
              политикой конфиденциальности
            </a>{" "}
            и{" "}
            <a href="/terms" className="text-primary hover:underline">
              условиями обслуживания
            </a>
          </Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-500" />
          <span>Безопасная обработка данных</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-500" />
          <span>Конфиденциальность гарантирована</span>
        </div>
        
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-500" />
          <span>Соблюдение авторских прав</span>
        </div>
      </div>
    </div>
  );
}
