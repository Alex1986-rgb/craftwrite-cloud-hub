
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Company Info & Trust */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">CopyPro Cloud</h3>
                <p className="text-slate-400 text-sm">Профессиональный копирайтинг</p>
              </div>
            </div>
            
            <p className="text-slate-300 leading-relaxed">
              Ведущая платформа копирайтинга с командой из 50+ экспертов. 
              Создаем контент, который продает и привлекает клиентов.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                <div className="text-xl font-bold text-blue-400">5000+</div>
                <div className="text-xs text-slate-400">Проектов</div>
              </div>
              <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                <div className="text-xl font-bold text-green-400">98%</div>
                <div className="text-xs text-slate-400">Довольных клиентов</div>
              </div>
            </div>

            {/* Trust Badges - Integrated */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700">
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
            </div>
          </div>

          {/* Main Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              Основные услуги
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'SEO-статьи', href: '/order/seo-article' },
                { name: 'Лендинги', href: '/order/landing-page' },
                { name: 'Email-кампании', href: '/order/email-campaigns' },
                { name: 'Контент для соцсетей', href: '/order/instagram' },
                { name: 'Тексты для сайтов', href: '/order/website-texts' },
                { name: 'Описания товаров', href: '/order/ozon' }
              ].map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.href}
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link 
              to="/services" 
              className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              Все услуги <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {/* Tools & Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              Инструменты и ресурсы
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'Калькулятор стоимости', href: '/interactive' },
                { name: 'Конструктор ТЗ', href: '/interactive?tab=brief' },
                { name: 'Примеры работ', href: '/interactive?tab=examples' },
                { name: 'Отслеживание заказов', href: '/track-order' },
                { name: 'FAQ', href: '/faq' },
                { name: 'Блог', href: '/blog' },
                { name: 'О нас', href: '/about' },
                { name: 'Портфолио', href: '/portfolio' }
              ].map((tool) => (
                <li key={tool.name}>
                  <Link 
                    to={tool.href}
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm block"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-400" />
              Связаться с нами
            </h4>
            
            {/* Contact Methods */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Phone className="w-4 h-4 text-green-400" />
                <span>+7 (925) 733-86-48</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>optteem@mail.ru</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <MessageCircle className="w-4 h-4 text-blue-400" />
                <span>@Koopeerayter</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Clock className="w-4 h-4" />
                <span>Работаем 24/7</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-3 pt-4 border-t border-slate-700">
              <h5 className="font-medium text-sm">Email рассылка</h5>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <Input 
                  placeholder="Ваш email" 
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 text-sm"
                />
                <Button type="submit" size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                  Подписаться
                </Button>
              </form>
              <p className="text-xs text-slate-400">
                Советы по копирайтингу и новости
              </p>
            </div>
          </div>

          {/* Legal Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Building2 className="w-4 h-4 text-orange-400" />
              Юридическая информация
            </h4>
            
            <BusinessInfo variant="footer" />
            
            {/* Legal Links */}
            <div className="space-y-2 pt-4 border-t border-slate-700">
              {[
                { name: 'Политика конфиденциальности', href: '/privacy' },
                { name: 'Условия использования', href: '/terms' },
                { name: 'Контакты', href: '/contact' }
              ].map((link) => (
                <Link 
                  key={link.name}
                  to={link.href}
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm block"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4">
              {[
                { icon: Facebook, href: '#', name: 'Facebook' },
                { icon: Twitter, href: '#', name: 'Twitter' },
                { icon: Instagram, href: '#', name: 'Instagram' },
                { icon: Linkedin, href: '#', name: 'LinkedIn' }
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
