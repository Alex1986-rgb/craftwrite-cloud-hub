
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PaymentSuccessAnimation from "./PaymentSuccessAnimation";
import PaymentSuccessHeader from "./PaymentSuccessHeader";
import PaymentSuccessSteps from "./PaymentSuccessSteps";
import PaymentSuccessActions from "./PaymentSuccessActions";
import PaymentSuccessContact from "./PaymentSuccessContact";
import PaymentSuccessReceipt from "./PaymentSuccessReceipt";

export default function PaymentSuccessLayout() {
  return (
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
          <PaymentSuccessAnimation />
          <PaymentSuccessHeader />
          <PaymentSuccessSteps />
          <PaymentSuccessActions />
          <PaymentSuccessContact />
          <PaymentSuccessReceipt />
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
  );
}
