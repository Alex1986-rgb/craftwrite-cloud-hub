
import { Link } from "react-router-dom";
import { Sparkles, Mail, Clock, Shield, Award, Phone } from "lucide-react";
import SocialLinks from "./SocialLinks";
import DeveloperInfo from "./DeveloperInfo";

const footerLinks = [
  { label: "Главная", to: "/" },
  { label: "Услуги", to: "/#services" },
  { label: "Цены", to: "/prices" },
  { label: "Портфолио", to: "/portfolio" },
  { label: "Блог", to: "/blog" },
  { label: "О нас", to: "/about" },
  { label: "Заказ", to: "/order" },
  { label: "Политика", to: "/privacy" },
];

const trustIndicators = [
  {
    icon: Shield,
    text: "100% уникальность",
    desc: "Гарантия качества"
  },
  {
    icon: Award,
    text: "30+ экспертов",
    desc: "Дипломированные специалисты"
  },
  {
    icon: Clock,
    text: "24/7 поддержка",
    desc: "Всегда на связи"
  }
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/50 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-400/10 to-pink-400/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link 
                to="/" 
                className="flex items-center gap-3 font-bold text-2xl text-primary mb-6 group w-fit"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CopyPro<span className="text-slate-600">Cloud</span>
                </span>
              </Link>
              
              <p className="text-slate-600 leading-relaxed mb-6 max-w-md">
                Элитная команда из 30+ дипломированных SEO-копирайтеров. 
                Создаем уникальный контент с гарантией качества и официальными проверками Text.ru.
              </p>

              {/* Trust Indicators */}
              <div className="space-y-3 mb-6">
                {trustIndicators.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800">{item.text}</span>
                      <span className="text-slate-500 ml-2">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-slate-800 mb-4 text-sm">Мы в соцсетях</h4>
                <SocialLinks variant="default" />
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-bold text-slate-800 mb-6">Навигация</h3>
              <nav className="space-y-3">
                {footerLinks.slice(0, 4).map((link) => (
                  <Link
                    to={link.to}
                    key={link.to}
                    className="block text-slate-600 hover:text-blue-600 transition-colors duration-300 text-sm hover:translate-x-1 transform transition-transform"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact & More Links */}
            <div>
              <h3 className="font-bold text-slate-800 mb-6">Контакты</h3>
              
              <div className="space-y-3 mb-6">
                <a 
                  href="tel:+79257338648"
                  className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors duration-300 text-sm"
                >
                  <Phone className="w-4 h-4" />
                  +7 (925) 733-86-48
                </a>
                
                <a 
                  href="mailto:optteem@mail.ru"
                  className="flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors duration-300 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  optteem@mail.ru
                </a>
              </div>

              <div className="space-y-3">
                {footerLinks.slice(4).map((link) => (
                  <Link
                    to={link.to}
                    key={link.to}
                    className="block text-slate-600 hover:text-blue-600 transition-colors duration-300 text-sm hover:translate-x-1 transform transition-transform"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Developer Info Section */}
          <div className="mt-12 pt-8 border-t border-slate-200/50">
            <DeveloperInfo variant="compact" className="mb-8" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200/50 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <span className="font-semibold">CopyProCloud</span>
              <span>© {new Date().getFullYear()}</span>
              <span className="hidden sm:inline">Все права защищены.</span>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="hidden sm:inline">Работаем 24/7</span>
              <span>•</span>
              <span>100% уникальность</span>
              <span>•</span>
              <span className="hidden sm:inline">Команда экспертов</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
