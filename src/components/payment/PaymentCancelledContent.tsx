
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, Home, RefreshCw, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentCancelledContent() {
  return (
    <main 
      id="main-content"
      className="flex-1 flex items-center justify-center px-4 py-16"
      role="main"
      aria-labelledby="cancelled-heading"
    >
      <section className="text-center max-w-2xl mx-auto">
        {/* Cancelled Animation */}
        <div className="mb-8 relative" role="img" aria-label="Иконка отмененной оплаты">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="w-12 h-12 text-red-500" aria-hidden="true" />
          </div>
        </div>

        <header className="mb-8">
          <h1 
            id="cancelled-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Оплата отменена
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Процесс оплаты был прерван. Ваш заказ не был обработан.
          </p>
          <p className="text-gray-500">
            Не переживайте — никакие средства с вашего счета не были списаны.
          </p>
        </header>

        {/* Possible Reasons */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8" aria-labelledby="reasons-heading">
          <h2 id="reasons-heading" className="text-xl font-semibold text-gray-900 mb-4">
            Возможные причины отмены
          </h2>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-gray-600">Вы нажали кнопку "Отмена" в платежной форме</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-gray-600">Произошла техническая ошибка в процессе оплаты</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-gray-600">Недостаточно средств на карте</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-gray-600">Банк заблокировал транзакцию по соображениям безопасности</p>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <nav className="flex flex-col sm:flex-row gap-4 justify-center mb-8" aria-label="Возможные действия">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link to="/order" className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" aria-hidden="true" />
              Попробовать снова
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" aria-hidden="true" />
              На главную
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <button 
              onClick={() => window.history.back()} 
              className="flex items-center gap-2"
              aria-label="Вернуться назад"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              Назад
            </button>
          </Button>
        </nav>

        {/* Alternative Payment Methods */}
        <section className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-8" aria-labelledby="alternatives-heading">
          <h2 id="alternatives-heading" className="text-lg font-semibold text-gray-900 mb-4">
            Альтернативные способы оплаты
          </h2>
          <p className="text-gray-600 mb-4">
            Если у вас возникли проблемы с онлайн-оплатой, мы можем предложить другие варианты:
          </p>
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Банковский перевод</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Оплата по счету для юридических лиц</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Постоплата (для постоянных клиентов)</span>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="bg-yellow-50 rounded-lg p-6 border border-yellow-200" aria-labelledby="support-heading">
          <h2 id="support-heading" className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-yellow-600" aria-hidden="true" />
            Нужна помощь?
          </h2>
          <p className="text-gray-600 mb-4">
            Если проблема повторяется или у вас есть вопросы, обратитесь в нашу службу поддержки:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@copypro.cloud" 
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              aria-label="Написать в службу поддержки"
            >
              <span>support@copypro.cloud</span>
            </a>
            <a 
              href="tel:+74951234567" 
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              aria-label="Позвонить в службу поддержки"
            >
              +7 (495) 123-45-67
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Режим работы: пн-пт с 9:00 до 18:00 (МСК)
          </p>
        </section>
      </section>
    </main>
  );
}
