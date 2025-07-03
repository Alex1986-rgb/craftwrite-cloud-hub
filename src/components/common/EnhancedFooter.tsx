
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import BusinessInfo from '@/components/common/BusinessInfo';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MessageCircle, 
  Clock,
  Shield,
  Award,
  Users,
  TrendingUp,
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Building2
} from 'lucide-react';
import { toast } from 'sonner';

const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Спасибо за подписку!');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-6">
          
          {/* Company Info */}
          <div className="md:col-span-2 lg:col-span-2 xl:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">CopyPro Cloud</h3>
                <p className="text-slate-400 text-xs">Профессиональный копирайтинг</p>
              </div>
            </div>
            
            <p className="text-slate-300 text-sm leading-relaxed">
              Ведущая платформа копирайтинга с командой из 50+ экспертов.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                <div className="text-lg font-bold text-blue-400">5000+</div>
                <div className="text-xs text-slate-400">Проектов</div>
              </div>
              <div className="text-center p-2 bg-slate-800/50 rounded-lg">
                <div className="text-lg font-bold text-green-400">98%</div>
                <div className="text-xs text-slate-400">Довольных</div>
              </div>
            </div>
          </div>

          {/* Main Services */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <TrendingUp className="w-3 h-3 text-blue-400" />
              Услуги
            </h4>
            <ul className="space-y-1.5">
              {[
                { name: 'SEO-статьи', href: '/order/seo-article' },
                { name: 'Лендинги', href: '/order/landing-page' },
                { name: 'Email-кампании', href: '/order/email-campaigns' },
                { name: 'Соцсети', href: '/order/instagram' },
                { name: 'Тексты сайтов', href: '/order/website-texts' }
              ].map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.href}
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-xs block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link 
              to="/services" 
              className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-medium"
            >
              Все услуги <ExternalLink className="w-2 h-2" />
            </Link>
          </div>

          {/* E-commerce */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">E-commerce</h4>
            <ul className="space-y-1.5">
              {[
                { name: 'Ozon', href: '/order/ozon' },
                { name: 'Wildberries', href: '/order/wildberries' },
                { name: 'Описания товаров', href: '/order/website-texts' },
                { name: 'Карточки товаров', href: '/order/ozon' }
              ].map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.href}
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-xs block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <Users className="w-3 h-3 text-purple-400" />
              Инструменты
            </h4>
            <ul className="space-y-1.5">
              {[
                { name: 'Калькулятор', href: '/interactive' },
                { name: 'Конструктор ТЗ', href: '/interactive?tab=brief' },
                { name: 'Примеры работ', href: '/interactive?tab=examples' },
                { name: 'Отслеживание', href: '/track-order' }
              ].map((tool) => (
                <li key={tool.name}>
                  <Link 
                    to={tool.href}
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-xs block"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Информация</h4>
            <ul className="space-y-1.5">
              {[
                { name: 'О нас', href: '/about' },
                { name: 'Блог', href: '/blog' },
                { name: 'Портфолио', href: '/portfolio' },
                { name: 'FAQ', href: '/faq' },
                { name: 'Цены', href: '/prices' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-xs block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <Phone className="w-3 h-3 text-green-400" />
              Контакты
            </h4>
            <div className="space-y-2">
              <div className="text-xs text-slate-300">
                <Phone className="w-3 h-3 inline mr-1" />
                +7 (925) 733-86-48
              </div>
              <div className="text-xs text-slate-300">
                <Mail className="w-3 h-3 inline mr-1" />
                optteem@mail.ru
              </div>
              <div className="text-xs text-slate-300">
                <MessageCircle className="w-3 h-3 inline mr-1" />
                @Koopeerayter
              </div>
              <div className="text-xs text-slate-300">
                <Clock className="w-3 h-3 inline mr-1" />
                24/7
              </div>
            </div>
          </div>

          {/* Legal & Social */}
          <div className="md:col-span-1 lg:col-span-2 xl:col-span-2 space-y-3">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <Building2 className="w-3 h-3 text-orange-400" />
              Документы
            </h4>
            
            <BusinessInfo variant="footer" />
            
            <div className="space-y-1">
              {[
                { name: 'Политика конфиденциальности', href: '/privacy' },
                { name: 'Условия использования', href: '/terms' }
              ].map((link) => (
                <Link 
                  key={link.name}
                  to={link.href}
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-xs block"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              {[
                { icon: Facebook, href: '#', name: 'Facebook' },
                { icon: Instagram, href: '#', name: 'Instagram' },
                { icon: Linkedin, href: '#', name: 'LinkedIn' }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="max-w-md mx-auto text-center">
            <h4 className="font-semibold text-sm mb-3 flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Email рассылка
            </h4>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input 
                placeholder="Ваш email" 
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 text-sm"
              />
              <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                Подписаться
              </Button>
            </form>
            <p className="text-xs text-slate-400 mt-2">
              Советы по копирайтингу и новости
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-6 border-t border-slate-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-xs">
              <Shield className="w-4 h-4 text-green-400" />
              <div>
                <div className="font-semibold">100% Гарантия</div>
                <div className="text-slate-400">Качество или возврат</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Award className="w-4 h-4 text-blue-400" />
              <div>
                <div className="font-semibold">50+ Экспертов</div>
                <div className="text-slate-400">Команда профессионалов</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Users className="w-4 h-4 text-purple-400" />
              <div>
                <div className="font-semibold">5000+ Проектов</div>
                <div className="text-slate-400">Выполнено успешно</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              <div>
                <div className="font-semibold">5 лет</div>
                <div className="text-slate-400">На рынке</div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Bottom Footer */}
      <div className="border-t border-slate-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-400">
              © {currentYear} CopyPro Cloud. Все права защищены. | 
              <Link to="/privacy" className="hover:text-blue-400 ml-1">Политика конфиденциальности</Link> | 
              <Link to="/terms" className="hover:text-blue-400 ml-1">Условия использования</Link>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[
                { icon: Facebook, href: '#', name: 'Facebook' },
                { icon: Twitter, href: '#', name: 'Twitter' },
                { icon: Instagram, href: '#', name: 'Instagram' },
                { icon: Linkedin, href: '#', name: 'LinkedIn' },
                { icon: Youtube, href: '#', name: 'YouTube' }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Float */}
      <div className="fixed bottom-6 left-6 z-40 hidden lg:block">
        <div className="space-y-3">
          <Button 
            asChild
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
          >
            <Link to="/smart-order">
              Быстрый заказ
            </Link>
          </Button>
          <Button 
            asChild
            size="sm"
            variant="outline"
            className="bg-white hover:bg-gray-50 shadow-lg"
          >
            <Link to="/track-order">
              Статус заказа
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
