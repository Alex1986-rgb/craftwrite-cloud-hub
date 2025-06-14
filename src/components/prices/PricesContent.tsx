
export default function PricesContent() {
  return (
    <main className="flex-1 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Цены на копирайтинг услуги</h1>
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600">
            Прозрачное ценообразование на все виды копирайтинг услуг
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">SEO-статьи</h3>
            <p className="text-3xl font-bold text-primary mb-4">от 500₽</p>
            <ul className="space-y-2 text-gray-600">
              <li>• Уникальный контент</li>
              <li>• SEO-оптимизация</li>
              <li>• Техническое задание</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Лендинги</h3>
            <p className="text-3xl font-bold text-primary mb-4">от 2000₽</p>
            <ul className="space-y-2 text-gray-600">
              <li>• Продающая структура</li>
              <li>• УТП и заголовки</li>
              <li>• Адаптация под аудиторию</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Описания товаров</h3>
            <p className="text-3xl font-bold text-primary mb-4">от 200₽</p>
            <ul className="space-y-2 text-gray-600">
              <li>• Привлекательные описания</li>
              <li>• Ключевые слова</li>
              <li>• Конверсионный подход</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
