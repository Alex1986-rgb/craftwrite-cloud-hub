
export default function PaymentSuccessHeader() {
  return (
    <header className="mb-8">
      <h1 
        id="success-heading"
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
      >
        Оплата прошла успешно!
      </h1>
      <p className="text-lg text-gray-600 mb-2">
        Спасибо за ваш заказ! Мы получили оплату и уже приступили к обработке вашего запроса.
      </p>
      <p className="text-gray-500">
        Номер заказа: <span className="font-mono font-semibold text-gray-700">#CP{Date.now().toString().slice(-6)}</span>
      </p>
    </header>
  );
}
