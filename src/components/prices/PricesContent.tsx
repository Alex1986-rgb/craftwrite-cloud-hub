
import PageContent from "@/components/common/PageContent";

export default function PricesContent() {
  return (
    <PageContent 
      title="Цены на копирайтинг услуги"
      subtitle="Прозрачное ценообразование на все виды копирайтинг услуг"
      maxWidth="6xl"
    >
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
    </PageContent>
  );
}
