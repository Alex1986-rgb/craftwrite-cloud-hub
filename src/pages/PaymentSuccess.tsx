
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";
import { CheckCircle2 } from "lucide-react";

const PaymentSuccess = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-10 px-4 bg-background text-center">
      <Seo
        title="Оплата прошла успешно — CopyPro Cloud"
        description="Спасибо за ваш заказ! Ваш платеж успешно обработан."
      />
      <div className="max-w-md mx-auto">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Оплата прошла успешно!</h1>
        <p className="text-muted-foreground mb-6">
          Спасибо за ваш заказ. Мы скоро свяжемся с вами для уточнения деталей.
        </p>
        <Button asChild>
          <Link to="/">Вернуться на главную</Link>
        </Button>
      </div>
    </main>
  );
};

export default PaymentSuccess;
