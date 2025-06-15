
export default function OrderTrackingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Отслеживание заказа</h1>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Номер заказа</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите номер заказа"
          />
        </div>
        <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
          Найти заказ
        </button>
      </div>
    </div>
  );
}
