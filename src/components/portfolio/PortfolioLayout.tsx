
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PortfolioHero from "./PortfolioHero";
import PortfolioCTASection from "./PortfolioCTASection";
import PortfolioContent from "./PortfolioContent";

interface PortfolioLayoutProps {
  children?: React.ReactNode;
}

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return (
    <div className="min-h-screen bg-white" itemScope itemType="https://schema.org/CollectionPage">
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
        role="main" 
        aria-label="Портфолио CopyPro Cloud"
        itemProp="mainEntity"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        {/* Hero Section */}
        <section 
          aria-labelledby="portfolio-hero-heading"
          role="banner"
        >
          <PortfolioHero />
        </section>

        {/* Main Content */}
        {children || <PortfolioContent />}

        {/* CTA Section */}
        <section 
          aria-labelledby="portfolio-cta-heading"
          role="region"
          className="py-16 md:py-24"
        >
          <PortfolioCTASection />
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
            <span itemProp="name">Портфолио</span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>
    </div>
  );
}
