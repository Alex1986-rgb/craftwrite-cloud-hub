
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { SEO_CONFIG, generateWebPageStructuredData, generateBreadcrumbStructuredData } from "@/utils/seoConfig";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const seoData = {
  title: "Страница не найдена | CopyPro Cloud - 404 Ошибка",
  description: "Запрашиваемая страница не найдена. Вернитесь на главную страницу CopyPro Cloud или воспользуйтесь навигацией по сайту.",
  keywords: "404, страница не найдена, ошибка, копирайтинг",
  canonicalUrl: `${SEO_CONFIG.baseUrl}/404`,
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      generateWebPageStructuredData({
        title: "Страница не найдена",
        description: "404 ошибка - страница не существует",
        url: "/404",
        about: "Error Page",
        keywords: "404, ошибка, не найдена"
      }),
      generateBreadcrumbStructuredData([
        { name: "Главная", url: "/" },
        { name: "404", url: "/404" }
      ])
    ]
  }
};

export default function NotFound() {
  return (
    <>
      <Seo {...seoData} />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col" itemScope itemType="https://schema.org/WebPage">
        {/* Skip to content link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-50"
        >
          Перейти к основному содержанию
        </a>

        <Header />
        
        <main 
          id="main-content"
          className="flex-1 flex items-center justify-center px-4 py-16"
          role="main"
          aria-labelledby="error-heading"
        >
          <section className="text-center max-w-2xl mx-auto">
            {/* Error Animation */}
            <div className="mb-8 relative" role="img" aria-label="Иллюстрация ошибки 404">
              <div className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text animate-pulse">
                404
              </div>
              <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-blue-100 -z-10 blur-sm">
                404
              </div>
            </div>

            <header className="mb-8">
              <h1 
                id="error-heading"
                className="text-2xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Страница не найдена
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                К сожалению, запрашиваемая страница не существует или была перемещена.
              </p>
              <p className="text-gray-500">
                Возможно, вы перешли по устаревшей ссылке или ввели неверный URL.
              </p>
            </header>

            {/* Action Buttons */}
            <nav className="flex flex-col sm:flex-row gap-4 justify-center mb-12" aria-label="Навигация по ошибке">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/" className="flex items-center gap-2">
                  <Home className="w-5 h-5" aria-hidden="true" />
                  На главную
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <button 
                  onClick={() => window.history.back()} 
                  className="flex items-center gap-2"
                  aria-label="Вернуться на предыдущую страницу"
                >
                  <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                  Назад
                </button>
              </Button>
            </nav>

            {/* Helpful Links */}
            <section aria-labelledby="helpful-links-heading">
              <h2 id="helpful-links-heading" className="text-xl font-semibold text-gray-900 mb-6">
                Полезные ссылки
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link 
                  to="/order" 
                  className="group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-300"
                  aria-label="Перейти к заказу услуг"
                >
                  <Search className="w-6 h-6 text-blue-500 mb-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <h3 className="font-medium text-gray-900 mb-1">Заказать тексты</h3>
                  <p className="text-sm text-gray-600">Оформить заказ на копирайтинг</p>
                </Link>

                <Link 
                  to="/portfolio" 
                  className="group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-300"
                  aria-label="Посмотреть наше портфолио"
                >
                  <Mail className="w-6 h-6 text-green-500 mb-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <h3 className="font-medium text-gray-900 mb-1">Портфолио</h3>
                  <p className="text-sm text-gray-600">Примеры наших работ</p>
                </Link>

                <Link 
                  to="/blog" 
                  className="group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-300"
                  aria-label="Читать наш блог"
                >
                  <Home className="w-6 h-6 text-purple-500 mb-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <h3 className="font-medium text-gray-900 mb-1">Блог</h3>
                  <p className="text-sm text-gray-600">Статьи о копирайтинге</p>
                </Link>

                <Link 
                  to="/prices" 
                  className="group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-300"
                  aria-label="Посмотреть цены на услуги"
                >
                  <ArrowLeft className="w-6 h-6 text-orange-500 mb-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <h3 className="font-medium text-gray-900 mb-1">Цены</h3>
                  <p className="text-sm text-gray-600">Стоимость услуг</p>
                </Link>
              </div>
            </section>

            {/* Contact Info */}
            <section className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200" aria-labelledby="contact-info-heading">
              <h2 id="contact-info-heading" className="text-lg font-semibold text-gray-900 mb-4">
                Нужна помощь?
              </h2>
              <p className="text-gray-600 mb-4">
                Если вы не можете найти нужную информацию, свяжитесь с нами:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:info@copypro.cloud" 
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  aria-label="Написать нам на email"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  info@copypro.cloud
                </a>
                <a 
                  href="tel:+74951234567" 
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  aria-label="Позвонить нам"
                >
                  +7 (495) 123-45-67
                </a>
              </div>
            </section>
          </section>
        </main>

        <Footer />

        {/* Breadcrumb navigation */}
        <nav aria-label="Навигация по сайту" className="sr-only">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a itemProp="item" href="/">
                <span itemProp="name">Главная</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name">404</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
}
