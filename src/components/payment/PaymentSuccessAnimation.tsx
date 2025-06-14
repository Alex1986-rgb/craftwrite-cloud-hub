
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessAnimation() {
  return (
    <div className="mb-8 relative" role="img" aria-label="Иконка успешной оплаты">
      <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
        <CheckCircle className="w-12 h-12 text-green-500" aria-hidden="true" />
      </div>
      <div className="absolute inset-0 w-24 h-24 mx-auto bg-green-200 rounded-full animate-ping opacity-20"></div>
    </div>
  );
}
