
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import AboutContent from "./AboutContent";

export default function AboutLayout() {
  return (
    <div className="min-h-screen bg-white" itemScope itemType="https://schema.org/AboutPage">
      {/* Skip to content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-50"
      >
        Перейти к основному содержанию
      </a>
      
      <Header />
      <AboutContent />
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
            <span itemProp="name">О компании</span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>
    </div>
  );
}
