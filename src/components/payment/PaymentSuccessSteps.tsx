
export default function PaymentSuccessSteps() {
  const steps = [
    {
      number: "1",
      title: "Подтверждение заказа",
      description: "В течение 30 минут вы получите email с деталями заказа"
    },
    {
      number: "2", 
      title: "Назначение менеджера",
      description: "Персональный менеджер свяжется с вами в течение 2 часов"
    },
    {
      number: "3",
      title: "Начало работы", 
      description: "После согласования всех деталей мы приступим к выполнению"
    }
  ];

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8" aria-labelledby="next-steps-heading">
      <h2 id="next-steps-heading" className="text-xl font-semibold text-gray-900 mb-4">
        Что происходит дальше?
      </h2>
      <div className="space-y-4 text-left">
        {steps.map((step) => (
          <div key={step.number} className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-blue-600 font-semibold text-sm">{step.number}</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
