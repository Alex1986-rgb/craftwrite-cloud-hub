
import { AlertCircle, ArrowLeft, RefreshCw, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function PaymentCancelledContent() {
  return (
    <main 
      id="main-content"
      className="flex-1 flex items-center justify-center py-16 px-4"
      role="main"
      aria-label="Оплата отменена"
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Оплата отменена
        </h1>

        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Ваш платеж был отменен. Не волнуйтесь — никакие средства не были списаны с вашего счета.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="lg" className="min-w-48">
            <Link to="/order" className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Попробовать снова
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="min-w-48">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              На главную
            </Link>
          </Button>
        </div>

        {/* Help section */}
        <Card className="p-6 bg-gray-50 border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Нужна помощь?
          </h3>
          <p className="text-gray-600 mb-4">
            Если у вас возникли проблемы с оплатой, наша команда поддержки готова помочь вам 24/7.
          </p>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <a href="mailto:support@copyprocloud.ru" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Связаться с поддержкой
            </a>
          </Button>
        </Card>
      </div>
    </main>
  );
}
