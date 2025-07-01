
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail,
  Clock,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Star,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import UnifiedHeader from '@/components/navigation/UnifiedHeader';
import EnhancedFooter from '@/components/common/EnhancedFooter';
import { useSeoMeta } from '@/hooks/useSeoMeta';

const faqCategories = [
  {
    id: 'general',
    name: 'Общие вопросы',
    icon: HelpCircle,
    color: 'blue'
  },
  {
    id: 'pricing',
    name: 'Цены и оплата',
    icon: Star,
    color: 'green'
  },
  {
    id: 'process',
    name: 'Процесс работы',
    icon: CheckCircle2,
    color: 'purple'
  },
  {
    id: 'quality',
    name: 'Качество и гарантии',
    icon: Shield,
    color: 'orange'
  }
];

const faqData = {
  general: [
    {
      question: 'Что такое CopyPro Cloud?',
      answer: 'CopyPro Cloud — это профессиональная платформа копирайтинга с командой из 50+ сертифицированных экспертов. Мы создаем тексты для сайтов, рекламы, соцсетей и других маркетинговых материалов.',
      popular: true
    },
    {
      question: 'Какие услуги вы предоставляете?',
      answer: 'Мы предлагаем полный спектр копирайтинговых услуг: SEO-статьи, лендинги, email-кампании, контент для соцсетей, описания товаров, корпоративные тексты и многое другое.',
      popular: true
    },
    {
      question: 'Работаете ли вы с моей тематикой?',
      answer: 'Да, наши эксперты имеют опыт работы в различных нишах: IT, e-commerce, медицина, финансы, образование, недвижимость и другие. У нас есть специалисты для любой тематики.',
      popular: false
    }
  ],
  pricing: [
    {
      question: 'Сколько стоят ваши услуги?',
      answer: 'Стоимость зависит от типа и сложности текста. SEO-статьи от 1 200₽, лендинги от 15 000₽, email-кампании от 5 000₽. Точную цену можно рассчитать в нашем калькуляторе.',
      popular: true
    },
    {
      question: 'Как происходит оплата?',
      answer: 'Мы принимаем оплату картой, переводом или по счету для юридических лиц. Предоплата 50%, остальное после сдачи работы. Все платежи безопасны и защищены.',
      popular: true
    },
    {
      question: 'Предоставляете ли вы скидки?',
      answer: 'Да, у нас есть система скидок для постоянных клиентов, объемных заказов и студентов. Также регулярно проводим акции и предлагаем промокоды.',
      popular: false
    }
  ],
  process: [
    {
      question: 'Как долго выполняется заказ?',
      answer: 'Стандартные сроки: SEO-статьи 3-5 дней, лендинги 7-14 дней, email-кампании 5-7 дней. Для срочных заказов предлагаем экспресс-доставку за 24-48 часов.',
      popular: true
    },
    {
      question: 'Могу ли я вносить правки?',
      answer: 'Конечно! В стоимость включены 2 бесплатные правки. Дополнительные правки — 500₽ за итерацию. Правки выполняются в течение 24 часов.',
      popular: true
    },
    {
      question: 'Как отслеживать статус заказа?',
      answer: 'После оформления заказа вы получите доступ в личный кабинет, где можете отслеживать статус, общаться с автором и получать уведомления о готовности.',
      popular: false
    }
  ],
  quality: [
    {
      question: 'Гарантируете ли вы уникальность текстов?',
      answer: 'Да, мы гарантируем 100% уникальность всех текстов. Каждый текст проверяется в нескольких сервисах: Text.ru, Advego, eTXT. Предоставляем отчеты о проверке.',
      popular: true
    },
    {
      question: 'Что если результат меня не устроит?',
      answer: 'Мы даем 100% гарантию качества. Если текст не соответствует техническому заданию, мы переделаем его бесплатно или вернем деньги в течение 30 дней.',
      popular: true
    },
    {
      question: 'Кто ваши авторы?',
      answer: 'Наша команда состоит из 50+ дипломированных копирайтеров с опытом от 5 лет. Все авторы проходят строгий отбор и постоянно повышают квалификацию.',
      popular: false
    }
  ]
};

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');

  useSeoMeta({
    title: 'Часто задаваемые вопросы - CopyPro Cloud',
    description: 'Ответы на популярные вопросы о копирайтинге, ценах, процессе работы и гарантиях качества. Быстрая поддержка 24/7.',
    keywords: 'FAQ, вопросы, ответы, копирайтинг, поддержка'
  });

  const filteredFaqs = faqData[selectedCategory as keyof typeof faqData].filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <UnifiedHeader />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Часто задаваемые вопросы
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Найдите ответы на популярные вопросы о наших услугах, ценах и процессе работы
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Поиск по вопросам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Категории</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {faqCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <category.icon className="w-4 h-4 mr-2" />
                    {category.name}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {faqCategories.find(cat => cat.id === selectedCategory)?.name}
              </h2>
              <p className="text-gray-600">
                {filteredFaqs.length} вопрос{filteredFaqs.length === 1 ? '' : filteredFaqs.length < 5 ? 'а' : 'ов'}
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white rounded-lg shadow-sm border"
                >
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      {faq.popular && (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                          Популярный
                        </Badge>
                      )}
                      <span className="font-semibold">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Вопросы не найдены
                </h3>
                <p className="text-gray-500">
                  Попробуйте изменить поисковый запрос или выберите другую категорию
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Не нашли ответ на свой вопрос?
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Наша команда поддержки работает 24/7 и всегда готова помочь. 
                Свяжитесь с нами любым удобным способом.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                  <MessageCircle className="w-8 h-8 text-blue-600 mb-3" />
                  <h4 className="font-semibold mb-2">Онлайн-чат</h4>
                  <p className="text-sm text-gray-600 mb-4">Мгновенные ответы</p>
                  <Button size="sm" className="w-full">
                    Написать в чат
                  </Button>
                </div>

                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                  <Phone className="w-8 h-8 text-green-600 mb-3" />
                  <h4 className="font-semibold mb-2">Телефон</h4>
                  <p className="text-sm text-gray-600 mb-4">+7 (800) 555-0199</p>
                  <Button size="sm" variant="outline" className="w-full">
                    Позвонить
                  </Button>
                </div>

                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
                  <Mail className="w-8 h-8 text-purple-600 mb-3" />
                  <h4 className="font-semibold mb-2">Email</h4>
                  <p className="text-sm text-gray-600 mb-4">info@copyprocloud.ru</p>
                  <Button size="sm" variant="outline" className="w-full">
                    Написать email
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Link to="/contact">
                    Связаться с нами
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/smart-order">
                    Сделать заказ
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <EnhancedFooter />
    </div>
  );
}
