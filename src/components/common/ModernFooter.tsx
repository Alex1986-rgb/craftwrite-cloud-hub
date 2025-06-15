
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import SocialLinks from "./SocialLinks";

export default function ModernFooter() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "SEO-копирайтинг", href: "/services/seo-copywriting" },
    { name: "Email-маркетинг", href: "/services/email-marketing" },
    { name: "Лендинг-пейджи", href: "/services/landing-pages" },
    { name: "Контент-маркетинг", href: "/services/content-marketing" },
    { name: "SMM-тексты", href: "/services/smm" },
    { name: "Продающие тексты", href: "/services/sales-copy" }
  ];

  const company = [
    { name: "О компании", href: "/about" },
    { name: "Портфолио", href: "/portfolio" },
    { name: "Команда", href: "/about#team" },
    { name: "Отзывы", href: "/about#testimonials" },
    { name: "Блог", href: "/blog" },
    { name: "Карьера", href: "/career" }
  ];

  const support = [
    { name: "Центр поддержки", href: "/support" },
    { name: "FAQ", href: "/faq" },
    { name: "Техподдержка", href: "/support/technical" },
    { name: "Обучение", href: "/education" },
    { name: "API документация", href: "/docs/api" },
    { name: "Статус сервисов", href: "/status" }
  ];

  const legal = [
    { name: "Пользовательское соглашение", href: "/terms" },
    { name: "Политика конфиденциальности", href: "/privacy" },
    { name: "Договор оферты", href: "/offer" },
    { name: "Реквизиты", href: "/requisites" }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Основной контент */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Информация о компании */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">CopyPro</h3>
                <p className="text-slate-400 text-sm">Профессиональные тексты</p>
              </div>
            </div>
            
            <p className="text-slate-300 mb-6 leading-relaxed">
              Создаем продающие тексты, которые превращают посетителей в клиентов. 
              Более 500 успешных проектов и 98% довольных клиентов.
            </p>
            
            {/* Контактная информация */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+7 (999) 123-45-67</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>hello@copypro.ru</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Москва, ул. Примерная, 123</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Пн-Пт: 9:00-18:00 (МСК)</span>
              </div>
            </div>
          </div>

          {/* Услуги */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Услуги</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <a 
                    href={service.href} 
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Компания */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Компания</h4>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Поддержка */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Поддержка</h4>
            <ul className="space-y-2">
              {support.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Статистика компании */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-slate-800">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">500+</div>
            <div className="text-sm text-slate-400">Проектов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">98%</div>
            <div className="text-sm text-slate-400">Довольных клиентов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">5 лет</div>
            <div className="text-sm text-slate-400">На рынке</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">24/7</div>
            <div className="text-sm text-slate-400">Поддержка</div>
          </div>
        </div>
      </div>

      {/* Нижняя часть */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Копирайт */}
            <div className="text-sm text-slate-400">
              © {currentYear} CopyPro. Все права защищены.
            </div>

            {/* Юридические ссылки */}
            <div className="flex flex-wrap gap-4 text-sm">
              {legal.map((item, index) => (
                <span key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                  {index < legal.length - 1 && (
                    <span className="text-slate-600 ml-4">•</span>
                  )}
                </span>
              ))}
            </div>

            {/* Социальные сети */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400">Мы в соцсетях:</span>
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
