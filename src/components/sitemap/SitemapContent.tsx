
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ShoppingCart, Users, DollarSign, Briefcase, BookOpen, Shield, CreditCard } from "lucide-react";

export default function SitemapContent() {
  const sitemapSections = [
    {
      title: "Основные страницы",
      icon: <FileText className="h-5 w-5" />,
      links: [
        { name: "Главная", url: "/", description: "Главная страница с услугами и информацией о компании" },
        { name: "О компании", url: "/about", description: "Информация о нашей команде и миссии" },
        { name: "Цены", url: "/prices", description: "Прайс-лист на все услуги копирайтинга" },
        { name: "Политика конфиденциальности", url: "/privacy", description: "Условия обработки персональных данных" }
      ]
    },
    {
      title: "Заказы и оплата",
      icon: <ShoppingCart className="h-5 w-5" />,
      links: [
        { name: "Оформить заказ", url: "/order", description: "Форма для заказа копирайтинг услуг" },
        { name: "Успешная оплата", url: "/payment-success", description: "Страница подтверждения оплаты" },
        { name: "Отмененная оплата", url: "/payment-cancelled", description: "Страница отмененной оплаты" }
      ]
    },
    {
      title: "Портфолио",
      icon: <Briefcase className="h-5 w-5" />,
      links: [
        { name: "Портфолио", url: "/portfolio", description: "Примеры наших работ и кейсы" },
        { name: "Детали проектов", url: "/portfolio/:id", description: "Подробная информация о конкретных проектах", badge: "Динамическая" }
      ]
    },
    {
      title: "Блог",
      icon: <BookOpen className="h-5 w-5" />,
      links: [
        { name: "Блог", url: "/blog", description: "Статьи о копирайтинге и маркетинге" },
        { name: "Статьи блога", url: "/blog/:id", description: "Отдельные статьи блога", badge: "Динамическая" }
      ]
    },
    {
      title: "Услуги",
      icon: <Users className="h-5 w-5" />,
      links: [
        { name: "Детали услуг", url: "/service/:slug", description: "Подробное описание конкретных услуг", badge: "Динамическая" },
        { name: "Форматы текстов", url: "/format/:slug", description: "Информация о различных форматах текстов", badge: "Динамическая" }
      ]
    }
  ];

  const serviceExamples = [
    "SEO-статьи", "Лендинги", "Email-рассылки", "Описания товаров", 
    "Контент для социальных сетей", "Пресс-релизы", "Технические тексты"
  ];

  const formatExamples = [
    "Продающие тексты", "Информационные статьи", "Обзоры", "Инструкции",
    "Новости", "Интервью", "Аналитические материалы"
  ];

  return (
    <div className="container max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Карта сайта
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Полная структура нашего сайта для удобной навигации и быстрого поиска нужной информации
        </p>
      </div>

      {/* Sitemap sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {sitemapSections.map((section, index) => (
          <Card key={index} className="h-full border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                {section.icon}
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <div className="flex items-center justify-between mb-1">
                      <Link 
                        to={link.url.includes(':') ? '#' : link.url}
                        className="font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        {link.name}
                      </Link>
                      {link.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {link.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Examples sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Users className="h-5 w-5" />
              Примеры услуг
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-600 mb-4">
              Примеры страниц услуг, доступных по адресу /service/[название-услуги]:
            </p>
            <div className="flex flex-wrap gap-2">
              {serviceExamples.map((service, index) => (
                <Badge key={index} variant="outline" className="bg-white border-blue-200 text-blue-700">
                  {service}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <FileText className="h-5 w-5" />
              Примеры форматов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-600 mb-4">
              Примеры страниц форматов, доступных по адресу /format/[название-формата]:
            </p>
            <div className="flex flex-wrap gap-2">
              {formatExamples.map((format, index) => (
                <Badge key={index} variant="outline" className="bg-white border-green-200 text-green-700">
                  {format}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer note */}
      <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-lg border border-primary/20">
        <h3 className="text-lg font-semibold mb-2 text-primary">Примечание</h3>
        <p className="text-muted-foreground">
          Страницы с динамическими URL (содержащие :id или :slug) генерируются автоматически на основе данных. 
          Для просмотра конкретных страниц перейдите в соответствующие разделы сайта.
        </p>
      </div>
    </div>
  );
}
