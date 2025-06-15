
export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Свяжитесь с нами</h1>
      <div className="max-w-2xl mx-auto">
        <p className="text-gray-600 mb-8">
          Готовы обсудить ваш проект? Мы всегда рады помочь с созданием качественного контента.
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Телефон</h3>
            <p>+7 (999) 123-45-67</p>
          </div>
          <div>
            <h3 className="font-semibold">Email</h3>
            <p>hello@copypro.ru</p>
          </div>
          <div>
            <h3 className="font-semibold">Адрес</h3>
            <p>Москва, ул. Примерная, 123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
