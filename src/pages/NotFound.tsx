
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Home, 
  Search, 
  ArrowLeft, 
  FileText, 
  Calculator,
  MessageCircle,
  Mail,
  Phone,
  ExternalLink,
  TrendingUp
} from 'lucide-react';
import { useSeoMeta } from '@/hooks/useSeoMeta';

const popularPages = [
  { title: 'Главная страница', href: '/', icon: Home, desc: 'Вернуться на главную' },
  { title: 'Умный заказ', href: '/smart-order', icon: FileText, desc: 'Быстрое создание заказа' },
  { title: 'Калькулятор стоимости', href: '/interactive', icon: Calculator, desc: 'Рассчитать цену' },
  { title: 'Портфолио', href: '/portfolio', icon: TrendingUp, desc: 'Примеры наших работ' },
  { title: 'Блог', href: '/blog', icon: FileText, desc: 'Полезные статьи' },
  { title: 'Контакты', href: '/contact', icon: Phone, desc: 'Связаться с нами' }
];

const quickActions = [
  { 
    title: 'Заказать SEO-статью', 
    href: '/order/seo-article', 
    price: 'от 1 200₽',
    popular: true 
  },
  { 
    title: 'Создать лендинг', 
    href: '/order/landing-page', 
    price: 'от 15 000₽',
    popular: true 
  },
  { 
    title: 'Email-кампания', 
    href: '/order/email-campaigns', 
    price: 'от 5 000₽',
    popular: false 
  }
];

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useSeoMeta({
    title: 'Страница не найдена - CopyPro Cloud',
    description: 'Запрашиваемая страница не найдена. Воспользуйтесь поиском или перейдите на главную страницу.',
    robots: 'noindex,nofollow'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // В реальном приложении здесь был бы поиск
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-8">
            <span className="text-6xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              404
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Страница не найдена
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Кажется, вы заблудились. Страница, которую вы ищете, была перемещена, 
            удалена или не существует.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Поиск по сайту..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-12 text-lg"
              />
              <Button type="submit" size="lg" className="h-12 px-6">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </form>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Link to="/">
                <Home className="w-5 h-5 mr-2" />
                На главную
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <button onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Назад
              </button>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                <MessageCircle className="w-5 h-5 mr-2" />
                Поддержка
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Popular Pages */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Популярные страницы</h2>
            <div className="space-y-4">
              {popularPages.map((page) => (
                <Card key={page.href} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <Link to={page.href} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <page.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {page.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{page.desc}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Быстрые действия</h2>
            <div className="space-y-4">
              {quickActions.map((action) => (
                <Card key={action.href} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <Link to={action.href} className="block group">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {action.title}
                        </h3>
                        {action.popular && (
                          <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                            Популярно
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-600">{action.price}</span>
                        <Button size="sm" className="group-hover:scale-105 transition-transform">
                          Заказать
                        </Button>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Info */}
            <Card className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Нужна помощь?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span>+7 (800) 555-0199</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>info@copyprocloud.ru</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    <span>Telegram: @copyprocloud</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Работаем 24/7. Ответим в течение 15 минут.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* SEO Text */}
        <div className="bg-white rounded-lg p-8 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Почему возникает ошибка 404?
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-4">
              Ошибка 404 возникает, когда запрашиваемая страница не найдена на сервере. 
              Это может произойти по нескольким причинам:
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Страница была перемещена или удалена</li>
              <li>• Неправильно введен URL адрес</li>
              <li>• Ссылка устарела или содержит ошибку</li>
              <li>• Временные технические проблемы</li>
            </ul>
            <p className="text-gray-600 mt-4">
              Не волнуйтесь! Воспользуйтесь поиском выше или перейдите на нужную страницу 
              через навигационное меню. Если проблема повторяется, обратитесь в нашу поддержку.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
