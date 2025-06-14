
import { Mail } from "lucide-react";

export default function PaymentSuccessContact() {
  return (
    <section className="bg-blue-50 rounded-lg p-6 border border-blue-200" aria-labelledby="contact-info-heading">
      <h2 id="contact-info-heading" className="text-lg font-semibold text-gray-900 mb-4">
        Остались вопросы?
      </h2>
      <p className="text-gray-600 mb-4">
        Если у вас есть дополнительные вопросы по заказу, свяжитесь с нами любым удобным способом:
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="mailto:orders@copypro.cloud" 
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          aria-label="Написать в отдел заказов"
        >
          <Mail className="w-4 h-4" aria-hidden="true" />
          orders@copypro.cloud
        </a>
        <a 
          href="tel:+74951234567" 
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          aria-label="Позвонить в отдел заказов"
        >
          +7 (495) 123-45-67
        </a>
      </div>
    </section>
  );
}
