
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ValidationItem {
  field: string;
  message: string;
  isValid: boolean;
}

interface OrderFormValidationProps {
  validations: ValidationItem[];
  showSuccess?: boolean;
}

export default function OrderFormValidation({ validations, showSuccess = false }: OrderFormValidationProps) {
  const errors = validations.filter(v => !v.isValid);
  const successes = validations.filter(v => v.isValid);

  if (errors.length === 0 && !showSuccess) return null;

  return (
    <div className="space-y-2">
      {errors.length > 0 && (
        <Alert variant="destructive" className="animate-fade-in">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              {errors.map((error, index) => (
                <div key={index} className="flex items-center gap-2">
                  <XCircle className="h-3 w-3 flex-shrink-0" />
                  <span className="text-sm">{error.message}</span>
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      {showSuccess && successes.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 animate-fade-in">
          <div className="space-y-1">
            {successes.map((success, index) => (
              <div key={index} className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-3 w-3 flex-shrink-0" />
                <span className="text-sm">{success.field} заполнено корректно</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
