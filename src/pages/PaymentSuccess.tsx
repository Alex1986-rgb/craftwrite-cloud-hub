
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, ArrowRight, Home, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { SEO_CONFIG, generateWebPageStructuredData, generateBreadcrumbStructuredData } from "@/utils/seoConfig";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const seoData = {
  title: "Оплата прошла успешно | CopyPro Cloud - Заказ принят",
  description: "Спасибо за заказ! Оплата прошла успешно. Мы свяжемся с вами в ближайшее время для уточнения деталей и начала работы над вашим проектом.",
  keywords: "оплата успешна, заказ принят, копирайтинг услуги, спасибо за заказ",
  canonicalUrl: `${SEO_CONFIG.baseUrl}/payment-success`,
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      generateWebPageStructuredData({
        title: "Оплата успешна",
        description: "Страница подтверждения успешной оплаты",
        url: "/payment-success",
        about: "Payment Success",
        keywords: "оплата, успех, заказ"
      }),
      generateBreadcrumbStructuredData([
        { name: "Главная", url: "/" },
        { name: "Заказ", url: "/order" },
        { name: "Оплата успешна", url: "/payment-success" }
      ])
    ]
  }
};

export default function PaymentSuccess() {
  return (
    <>
      <Seo {...seoData} />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col" itemScope itemType="https://schema.org/WebPage">
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
          aria-labelledby="success-heading"
        >
          <section className="text-center max-w-2xl mx-auto">
            {/* Success Animation */}
            <div className="mb-8 relative" role="img" aria-label="Иконка успешной оплаты">
              <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle className="w-12 h-12 text-green-500" aria-hidden="true" />
              </div>
              <div className="absolute inset-0 w-24 h-24 mx-auto bg-green-200 rounded-full animate-ping opacity-20"></div>
            </div>

            <header className="mb-8">
              <h1 
                id="success-heading"
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Оплата прошла успешно!
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                Спасибо за ваш заказ! Мы получили оплату и уже приступили к обработке вашего запроса.
              </p>
              <p className="text-gray-500">
                Номер заказа: <span className="font-mono font-semibold text-gray-700">#CP{Date.now().toString().slice(-6)}</span>
              </p>
            </header>

            {/* Next Steps */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8" aria-labelledby="next-steps-heading">
              <h2 id="next-steps-heading" className="text-xl font-semibold text-gray-900 mb-4">
                Что происходит дальше?
              </h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Подтверждение заказа</h3>
                    <p className="text-gray-600 text-sm">В течение 30 минут вы получите email с деталями заказа</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Назначение менеджера</h3>
                    <p className="text-gray-600 text-sm">Персональный менеджер свяжется с вами в течение 2 часов</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Начало работы</h3>
                    <p className="text-gray-600 text-sm">После согласования всех деталей мы приступим к выполнению</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <nav className="flex flex-col sm:flex-row gap-4 justify-center mb-8" aria-label="Дальнейшие действия">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/" className="flex items-center gap-2">
                  <Home className="w-5 h-5" aria-hidden="true" />
                  На главную
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/portfolio" className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  Посмотреть примеры работ
                </Link>
              </Button>
            </nav>

            {/* Contact Info */}
            <section className="bg-blue-50 rounded-lg p-6 border border-blue-200" aria-labelledby="contact-info-heading">
              <h2 id="contact-info-heading" className="text-lg font-semibold text-gray-900 mb-4">
                Остались вопросы?
              </h2>
              <p className="text-gray-600 mb-4">
                Если у вас есть дополнительные вопросы по заказу, свяжитесь с нами любым удобным способом:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:orders@copypro.cloud" 
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  aria-label="Написать в отдел заказов"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  orders@copypro.cloud
                </a>
                <a 
                  href="tel:+74951234567" 
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  aria-label="Позвонить в отдел заказов"
                >
                  +7 (495) 123-45-67
                </a>
              </div>
            </section>

            {/* Download Receipt Button */}
            <div className="mt-6">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  // Implement receipt download logic
                  console.log('Downloading receipt...');
                }}
                className="text-gray-600 hover:text-gray-800"
                aria-label="Скачать чек об оплате"
              >
                <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                Скачать чек
              </Button>
            </div>
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
              <a itemProp="item" href="/order">
                <span itemProp="name">Заказ</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name">Оплата успешна</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
}
