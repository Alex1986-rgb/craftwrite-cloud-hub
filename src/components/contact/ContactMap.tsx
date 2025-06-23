
import { MapPin, Clock, Phone, Mail } from "lucide-react";

export default function ContactMap() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 mb-4">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-semibold text-sm">Наш офис</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-slate-800 mb-4">
            Где нас найти
          </h2>
          
          <p className="text-slate-600 max-w-2xl mx-auto">
            Мы работаем удаленно, но всегда на связи для наших клиентов
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200/50">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Контактная информация</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Телефон</h4>
                    <p className="text-slate-600">+7 (925) 733-86-48</p>
                    <p className="text-sm text-slate-500">Звонки принимаем с 9:00 до 21:00 МСК</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Email</h4>
                    <p className="text-slate-600">optteem@mail.ru</p>
                    <p className="text-sm text-slate-500">Отвечаем в течение часа</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Режим работы</h4>
                    <p className="text-slate-600">Пн-Пт: 9:00 - 21:00</p>
                    <p className="text-slate-600">Сб-Вс: 10:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Срочные вопросы?</h3>
              <p className="mb-4 opacity-90">
                Для срочных вопросов используйте Telegram - отвечаем мгновенно!
              </p>
              <a 
                href="https://t.me/Koopeerayter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 rounded-full px-6 py-3 transition-colors duration-300"
              >
                <span>Написать в Telegram</span>
              </a>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-slate-100 rounded-3xl h-96 flex items-center justify-center border border-slate-200">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">Удаленная работа</h3>
              <p className="text-slate-500">
                Мы работаем с клиентами по всей России и СНГ
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
