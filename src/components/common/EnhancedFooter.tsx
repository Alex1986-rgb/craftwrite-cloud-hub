
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
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 text-sm">
          
          {/* Company Info */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <div>
                <h3 className="font-bold">CopyPro Cloud</h3>
                <p className="text-slate-400 text-xs">Профессиональный копирайтинг</p>
              </div>
            </div>
            
            <p className="text-slate-300 text-xs leading-relaxed">
              Ведущая платформа копирайтинга с командой из 50+ экспертов.
            </p>

            {/* Key Stats */}
            <div className="flex gap-3">
              <div className="text-center">
                <div className="text-sm font-bold text-blue-400">5000+</div>
                <div className="text-xs text-slate-400">Проектов</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-green-400">98%</div>
                <div className="text-xs text-slate-400">Довольных</div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-2">
            <h4 className="font-semibold text-xs flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-blue-400" />
              Услуги
            </h4>
            <ul className="space-y-1">
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
          </div>

          {/* E-commerce */}
          <div className="space-y-2">
            <h4 className="font-semibold text-xs">Маркетплейсы</h4>
            <ul className="space-y-1">
              {[
                { name: 'Ozon', href: '/order/ozon' },
                { name: 'Wildberries', href: '/order/wildberries' },
                { name: 'YouTube', href: '/order/youtube' },
                { name: 'LinkedIn', href: '/order/linkedin' }
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
          <div className="space-y-2">
            <h4 className="font-semibold text-xs flex items-center gap-1">
              <Users className="w-3 h-3 text-purple-400" />
              Инструменты
            </h4>
            <ul className="space-y-1">
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
          <div className="space-y-2">
            <h4 className="font-semibold text-xs">Информация</h4>
            <ul className="space-y-1">
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
          <div className="space-y-2">
            <h4 className="font-semibold text-xs flex items-center gap-1">
              <Phone className="w-3 h-3 text-green-400" />
              Контакты
            </h4>
            <div className="space-y-1">
              <div className="text-xs text-slate-300">+7 (925) 733-86-48</div>
              <div className="text-xs text-slate-300">optteem@mail.ru</div>
              <div className="text-xs text-slate-300">@Koopeerayter</div>
              <div className="text-xs text-slate-300">24/7</div>
            </div>
          </div>

          {/* Legal & Newsletter */}
          <div className="col-span-2 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Newsletter */}
              <div className="space-y-2">
                <h4 className="font-semibold text-xs flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  Email рассылка
                </h4>
                <form onSubmit={handleNewsletterSubmit} className="space-y-1">
                  <Input 
                    placeholder="Ваш email" 
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 text-xs h-8"
                  />
                  <Button type="submit" size="sm" className="w-full bg-blue-600 hover:bg-blue-700 h-7 text-xs">
                    Подписаться
                  </Button>
                </form>
              </div>

              {/* Legal */}
              <div className="space-y-2">
                <h4 className="font-semibold text-xs flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-orange-400" />
                  Документы
                </h4>
                <BusinessInfo variant="footer" />
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link to="/privacy" className="text-slate-300 hover:text-blue-400">Политика</Link>
                  <Link to="/terms" className="text-slate-300 hover:text-blue-400">Условия</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-slate-700">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-green-400" />
                <span className="text-slate-300">100% Гарантия</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-3 h-3 text-blue-400" />
                <span className="text-slate-300">50+ Экспертов</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3 text-purple-400" />
                <span className="text-slate-300">5000+ Проектов</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-orange-400" />
                <span className="text-slate-300">5 лет работы</span>
              </div>
            </div>

            {/* Social & Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
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
              <div className="text-xs text-slate-400 text-center">
                © {currentYear} CopyPro Cloud. Все права защищены.
              </div>
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
