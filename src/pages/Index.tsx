
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Globe, 
  Mail, 
  MessageCircle, 
  Bot, 
  Search,
  ArrowRight,
  Check,
  Star,
  Users,
  Award
} from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SupportWidget from "@/components/common/SupportWidget";
import HumanLikeAiAssistant from "@/components/ai/HumanLikeAiAssistant";

const services = [
  {
    id: 'seo-article',
    title: 'SEO-статьи',
    price: 'от 1 200 ₽',
    description: 'Профессиональные SEO-тексты с гарантией уникальности и высокими позициями в поисковых системах.',
    icon: FileText,
    color: 'bg-blue-600 hover:bg-blue-700',
    features: ['100% уникальность', 'LSI-оптимизация', 'Анализ конкурентов']
  },
  {
    id: 'landing-page',
    title: 'Лендинги',
    price: 'от 2 500 ₽',
    description: 'Продающие тексты для посадочных страниц с высокой конверсией и убедительными призывами к действию.',
    icon: Globe,
    color: 'bg-green-600 hover:bg-green-700',
    features: ['Высокая конверсия', 'A/B тестирование', 'Анализ целевой аудитории']
  },
  {
    id: 'email-campaigns',
    title: 'Email-рассылки',
    price: 'от 800 ₽',
    description: 'Эффективные email-кампании для увеличения продаж и удержания клиентов.',
    icon: Mail,
    color: 'bg-purple-600 hover:bg-purple-700',
    features: ['Персонализация', 'Автоматизация', 'Сегментация аудитории']
  },
  {
    id: 'telegram-content',
    title: 'Telegram-контент',
    price: 'от 600 ₽',
    description: 'Контент для Telegram-каналов и чат-ботов с высоким уровнем вовлеченности.',
    icon: MessageCircle,
    color: 'bg-indigo-600 hover:bg-indigo-700',
    features: ['Вирусный контент', 'Автопостинг', 'Аналитика охватов']
  }
];

const trustIndicators = [
  { value: '2000+', label: 'выполненных проектов' },
  { value: '100%', label: 'уникальность текстов' },
  { value: '30+', label: 'экспертов в команде' },
  { value: '24ч', label: 'от заказа до готовности' }
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-white py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center items-center gap-4 mb-6">
              <Badge variant="outline" className="text-sm font-medium">
                <Users className="w-4 h-4 mr-1" />
                30+ экспертов
              </Badge>
              <Badge variant="outline" className="text-sm font-medium">
                <Award className="w-4 h-4 mr-1" />
                100% качество
              </Badge>
              <Badge variant="outline" className="text-sm font-medium">
                <Star className="w-4 h-4 mr-1" />
                2000+ проектов
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              CopyPro Cloud — профессиональный копирайтинг
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Создаём качественный контент с командой из 30+ дипломированных SEO-копирайтеров. 
              Гарантия уникальности, экспресс-доставка, бесплатные правки.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="px-8 py-4 text-lg" asChild>
                <Link to="/order">
                  Заказать контент
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                Посмотреть примеры работ
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {trustIndicators.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{item.value}</div>
                  <div className="text-sm text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                Наши услуги — входи и выбирай
              </h2>
              <p className="text-xl text-gray-600">
                Профессиональный контент для роста вашего бизнеса
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {services.map((service) => (
                <Card key={service.id} className="border-2 hover:border-blue-200 transition-all duration-300 bg-white">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gray-100">
                          <service.icon className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold text-gray-900">
                            {service.title}
                          </CardTitle>
                          <div className="text-2xl font-bold text-blue-600 mt-1">
                            {service.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="mb-6">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      className={`w-full ${service.color} text-white font-medium`}
                      asChild
                    >
                      <Link to={`/order/${service.id}`}>
                        {service.id === 'seo-article' && 'Заказать статью'}
                        {service.id === 'landing-page' && 'Создать лендинг'}
                        {service.id === 'email-campaigns' && 'Запустить кампанию'}
                        {service.id === 'telegram-content' && 'Заказать контент'}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Все услуги компании CopyPro Cloud доступны через единую панель управления. 
                Полный контроль проектов с возможностями отслеживания, коммуникации с экспертами, 
                доступом к аналитике и историей заказов.
              </p>
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Дополнительные услуги
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border hover:border-blue-200 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    Чат-бот скрипты
                    <Badge variant="secondary" className="ml-auto">от 1 500 ₽</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Профессиональные диалоги для чат-ботов с высокой конверсией
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/order/chatbot-scripts">Заказать скрипты</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border hover:border-blue-200 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Тексты для сайтов
                    <Badge variant="secondary" className="ml-auto">от 900 ₽</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    SEO-оптимизированные тексты для всех разделов сайта
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/order/website-texts">Заказать тексты</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border hover:border-blue-200 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Соцсети
                    <Badge variant="secondary" className="ml-auto">от 500 ₽</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Контент для Instagram, LinkedIn, YouTube и других платформ
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/order">Выбрать платформу</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <SupportWidget />
      <HumanLikeAiAssistant />
    </div>
  );
}
