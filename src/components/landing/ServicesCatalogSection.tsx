import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Globe, ShoppingCart, Mail, MessageCircle, Star, Zap, Target, CheckCircle } from "lucide-react";

// Filter options for the Order page
export const FILTERS = [
  { value: "all", label: "Все категории" },
  { value: "seo", label: "SEO-тексты" },
  { value: "commercial", label: "Коммерческие тексты" },
  { value: "social", label: "Соцсети" },
  { value: "corporate", label: "Корпоративные тексты" }
];

export const FORMATS = [
  { value: "all", label: "Все форматы" },
  { value: "article", label: "Статьи" },
  { value: "landing", label: "Лендинги" },
  { value: "product", label: "Карточки товаров" },
  { value: "email", label: "Email-рассылки" },
  { value: "social", label: "Посты для соцсетей" },
  { value: "corporate", label: "Корпоративные материалы" }
];

export const LANGS = [
  { value: "all", label: "Все языки" },
  { value: "ru", label: "Русский" },
  { value: "en", label: "Английский" },
  { value: "ua", label: "Украинский" }
];

export const TOPICS = [
  { value: "all", label: "Все тематики" },
  { value: "tech", label: "Технологии" },
  { value: "business", label: "Бизнес" },
  { value: "health", label: "Здоровье" },
  { value: "finance", label: "Финансы" },
  { value: "education", label: "Образование" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "marketing", label: "Маркетинг" }
];

const services = [
  {
    title: "SEO-статьи",
    desc: "Экспертные статьи с глубокой проработкой темы, 100% уникальность, полная SEO-оптимизация",
    features: ["Keyword research", "LSI-слова", "Мета-теги", "Структура H1-H6"],
    price: "от 1500₽",
    icon: FileText,
    gradient: "from-blue-500 to-indigo-600",
    slug: "seo-articles"
  },
  {
    title: "Лендинги",
    desc: "Продающие тексты для посадочных страниц с фокусом на конверсию и психологию покупателя",
    features: ["Структура AIDA", "Триггеры продаж", "CTA-блоки", "A/B тестирование"],
    price: "от 3000₽",
    icon: Globe,
    gradient: "from-emerald-500 to-green-600",
    slug: "landing-pages"
  },
  {
    title: "Карточки товаров",
    desc: "Уникальные описания для интернет-магазинов, увеличивающие продажи и конверсию",
    features: ["УТП товара", "Преимущества", "Характеристики", "SEO-оптимизация"],
    price: "от 300₽",
    icon: ShoppingCart,
    gradient: "from-purple-500 to-pink-600",
    slug: "product-cards"
  },
  {
    title: "Email-рассылки",
    desc: "Персонализированные письма для повышения открываемости и кликабельности",
    features: ["Цепляющие заголовки", "Персонализация", "Call-to-Action", "Сегментация"],
    price: "от 800₽",
    icon: Mail,
    gradient: "from-orange-500 to-red-600",
    slug: "email-campaigns"
  },
  {
    title: "Посты для соцсетей",
    desc: "Вирусный контент для Instagram, VK, Telegram с высоким engagement",
    features: ["Трендовые форматы", "Хештеги", "Storytelling", "Визуальные концепции"],
    price: "от 200₽",
    icon: MessageCircle,
    gradient: "from-pink-500 to-rose-600",
    slug: "social-media"
  },
  {
    title: "Корпоративные тексты",
    desc: "Презентации, отчеты, коммерческие предложения для B2B сегмента",
    features: ["Деловой стиль", "Структурированность", "Аналитика", "Экспертность"],
    price: "от 2000₽",
    icon: Target,
    gradient: "from-indigo-500 to-purple-600",
    slug: "corporate-texts"
  }
];

const ServicesCatalogSection = () => {
  return (
    <section id="services" className="py-16 md:py-24 relative overflow-hidden">
      {/* Modern background with glass morphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-purple-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-gradient-to-r from-emerald-400/10 to-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100/80 to-purple-100/80 text-blue-700 px-6 py-3 rounded-full text-sm font-bold mb-6 border border-blue-200/50 shadow-lg backdrop-blur-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <Star className="w-5 h-5" />
            <span>Премиум каталог услуг</span>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight tracking-tight">
            Каталог услуг
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">копирайтинга</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Полный спектр текстовых решений от команды элитных экспертов с гарантией качества и уникальности
          </p>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={service.slug}
              className="group relative bg-gradient-to-br from-white/90 via-white/70 to-white/50 backdrop-blur-lg rounded-2xl md:rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Enhanced Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${service.gradient} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                
                {/* Title and Price */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <div className={`bg-gradient-to-r ${service.gradient} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md`}>
                    {service.price}
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                  {service.desc}
                </p>
                
                {/* Features */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <Button 
                  asChild 
                  className={`w-full group/btn bg-gradient-to-r ${service.gradient} hover:opacity-90 border-0 rounded-xl py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  <Link to="/order" className="flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4" />
                    Заказать
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-white/80 via-blue-50/50 to-purple-50/30 backdrop-blur-lg rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-2xl border border-blue-200/30 relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Не нашли нужную услугу?
              </h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Мы создаем тексты любой сложности и тематики. Обсудим ваш проект индивидуально!
              </p>
              <Button 
                asChild 
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 border-0 rounded-full px-8 py-4 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Link to="/order" className="flex items-center gap-3">
                  <Target className="w-5 h-5" />
                  Обсудить проект
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCatalogSection;
