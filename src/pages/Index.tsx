
import { useState, useEffect } from "react";
import { SERVICES } from "@/data/services";
import Seo from "@/components/Seo";
import { SEO_CONFIG, generateWebPageStructuredData, generateLocalBusinessStructuredData } from "@/utils/seoConfig";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import HeroSection from "@/components/landing/HeroSection";
import ServicesCatalogSection from "@/components/landing/ServicesCatalogSection";
import ExpertiseShowcaseSection from "@/components/landing/ExpertiseShowcaseSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import ProcessSection from "@/components/landing/ProcessSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ModernPricingSection from "@/components/landing/ModernPricingSection";
import InnovativePortfolioSection from "@/components/landing/InnovativePortfolioSection";
import TrustSection from "@/components/landing/TrustSection";
import ProfessionalStatsSection from "@/components/landing/ProfessionalStatsSection";
import FaqSection from "@/components/landing/FaqSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import TeamSection from "@/components/landing/TeamSection";
import InteractiveGuaranteesSection from "@/components/landing/InteractiveGuaranteesSection";
import ContactSection from "@/components/landing/ContactSection";
import NewsletterSection from "@/components/landing/NewsletterSection";
import CaseStudiesSection from "@/components/landing/CaseStudiesSection";

const seoData = {
  title: "CopyPro Cloud - Профессиональные тексты для вашего бизнеса | SEO-копирайтинг",
  description: "Закажите качественные тексты для сайта, рекламы и социальных сетей. SEO-статьи, лендинги, описания товаров от экспертов копирайтинга. Более 10 000 довольных клиентов.",
  keywords: "копирайтинг, seo тексты, контент маркетинг, продающие тексты, рерайтинг, статьи для сайта, лендинги, описания товаров",
  canonicalUrl: SEO_CONFIG.baseUrl,
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      generateWebPageStructuredData({
        title: "CopyPro Cloud - Главная страница",
        description: "Профессиональные копирайтинг услуги для бизнеса",
        url: "/",
        about: "Copywriting Services",
        keywords: "копирайтинг, seo тексты, контент маркетинг",
        mainEntity: {
          "@type": "Organization",
          name: SEO_CONFIG.siteName,
          url: SEO_CONFIG.baseUrl
        }
      }),
      generateLocalBusinessStructuredData(),
      {
        "@type": "WebSite",
        "name": SEO_CONFIG.siteName,
        "url": SEO_CONFIG.baseUrl,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${SEO_CONFIG.baseUrl}/order?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        },
        "sameAs": SEO_CONFIG.organization.sameAs
      },
      {
        "@type": "ItemList",
        "name": "Наши услуги",
        "numberOfItems": SERVICES.length,
        "itemListElement": SERVICES.slice(0, 8).map((service, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Service",
            "name": service.name,
            "description": service.desc,
            "provider": {
              "@type": "Organization",
              "name": SEO_CONFIG.siteName
            },
            "offers": {
              "@type": "Offer",
              "price": service.price.min,
              "priceCurrency": "RUB"
            }
          }
        }))
      }
    ]
  }
};

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Performance monitoring
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('Home Page LCP:', entry.startTime);
          }
        }
      });
      observer.observe({entryTypes: ['largest-contentful-paint']});
    }
  }, []);

  return (
    <>
      <Seo {...seoData} />
      
      <div className="min-h-screen bg-white" itemScope itemType="https://schema.org/WebPage">
        {/* Skip to content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-50"
          tabIndex={1}
        >
          Перейти к основному содержанию
        </a>
        
        <Header />
        
        <main 
          id="main-content"
          role="main" 
          aria-label="Главная страница CopyPro Cloud"
          className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          itemProp="mainEntity"
          itemScope
          itemType="https://schema.org/Organization"
        >
          {/* Hero Section */}
          <section 
            aria-labelledby="hero-heading"
            role="banner"
            className="relative"
          >
            <HeroSection />
          </section>

          {/* Services Section */}
          <section 
            aria-labelledby="services-heading"
            role="region"
            className="py-16 md:py-24"
            itemScope
            itemType="https://schema.org/ItemList"
          >
            <ServicesCatalogSection />
          </section>

          {/* Expertise Section */}
          <section 
            aria-labelledby="expertise-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <ExpertiseShowcaseSection />
          </section>

          {/* Benefits Section */}
          <section 
            aria-labelledby="benefits-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <BenefitsSection />
          </section>

          {/* Process Section */}
          <section 
            aria-labelledby="process-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <ProcessSection />
          </section>

          {/* Stats Section */}
          <section 
            aria-labelledby="stats-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <ProfessionalStatsSection />
          </section>

          {/* Case Studies Section */}
          <section 
            aria-labelledby="case-studies-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <CaseStudiesSection />
          </section>

          {/* Portfolio Section */}
          <section 
            aria-labelledby="portfolio-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <InnovativePortfolioSection />
          </section>

          {/* Testimonials Section */}
          <section 
            aria-labelledby="testimonials-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <TestimonialsSection />
          </section>

          {/* Social Proof Section */}
          <section 
            aria-labelledby="social-proof-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <SocialProofSection />
          </section>

          {/* Pricing Section */}
          <section 
            aria-labelledby="pricing-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <ModernPricingSection />
          </section>

          {/* Team Section */}
          <section 
            aria-labelledby="team-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <TeamSection />
          </section>

          {/* Trust Section */}
          <section 
            aria-labelledby="trust-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <TrustSection />
          </section>

          {/* Guarantees Section */}
          <section 
            aria-labelledby="guarantees-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <InteractiveGuaranteesSection />
          </section>

          {/* FAQ Section */}
          <section 
            aria-labelledby="faq-heading"
            role="region"
            className="py-16 md:py-24"
            itemScope
            itemType="https://schema.org/FAQPage"
          >
            <FaqSection />
          </section>

          {/* Contact Section */}
          <section 
            aria-labelledby="contact-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <ContactSection />
          </section>

          {/* Newsletter Section */}
          <section 
            aria-labelledby="newsletter-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <NewsletterSection />
          </section>
        </main>

        <Footer />
        
        {/* Breadcrumb navigation for SEO */}
        <nav aria-label="Навигация по сайту" className="sr-only">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name">Главная</span>
              <meta itemProp="position" content="1" />
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
}
