
import { SERVICES } from "@/data/services";
import Seo from "@/components/Seo";
import { SEO_CONFIG, generateBreadcrumbStructuredData } from "@/utils/seoConfig";
import HeroSection from "@/components/landing/HeroSection";
import ServicesCatalogSection from "@/components/landing/ServicesCatalogSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import ProcessSection from "@/components/landing/ProcessSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ModernPricingSection from "@/components/landing/ModernPricingSection";
import FaqSection from "@/components/landing/FaqSection";
import ContactSection from "@/components/landing/ContactSection";
import NewsletterSection from "@/components/landing/NewsletterSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import TrustSection from "@/components/landing/TrustSection";
import ProfessionalStatsSection from "@/components/landing/ProfessionalStatsSection";
import TeamSection from "@/components/landing/TeamSection";
import CaseStudiesSection from "@/components/landing/CaseStudiesSection";
import InteractiveGuaranteesSection from "@/components/landing/InteractiveGuaranteesSection";
import ExpertiseShowcaseSection from "@/components/landing/ExpertiseShowcaseSection";
import InnovativePortfolioSection from "@/components/landing/InnovativePortfolioSection";

const seoData = {
  title: "CopyPro Cloud - Профессиональный копирайтинг и SEO-тексты от экспертов",
  description: "Заказать качественные SEO-тексты, лендинги, описания товаров и контент для соцсетей. Более 10 000 довольных клиентов. Гарантия качества 14 дней. Уникальность 100%.",
  keywords: "копирайтинг, seo тексты, продающие тексты, контент маркетинг, рерайтинг, статьи для сайта, описания товаров, лендинги, тексты для соцсетей",
  canonicalUrl: SEO_CONFIG.baseUrl,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.baseUrl,
    logo: `${SEO_CONFIG.baseUrl}/logo.png`,
    description: "Профессиональные копирайтинг услуги и SEO-тексты для бизнеса",
    address: {
      "@type": "PostalAddress",
      addressCountry: "RU",
      addressLocality: "Москва"
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Russian"
    },
    sameAs: [
      "https://t.me/copypro_cloud",
      "https://vk.com/copypro_cloud"
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Копирайтинг услуги",
      itemListElement: SERVICES.slice(0, 8).map((service, index) => ({
        "@type": "Offer",
        name: service.name,
        description: service.desc,
        price: service.price.min,
        priceCurrency: "RUB",
        availability: "https://schema.org/InStock",
        category: service.category
      }))
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1247",
      bestRating: "5",
      worstRating: "1"
    },
    breadcrumb: generateBreadcrumbStructuredData([
      { name: "Главная", url: "/" }
    ])
  }
};

export default function Index() {
  return (
    <>
      <Seo {...seoData} />
      <main role="main">
        <HeroSection />
        <SocialProofSection />
        <ServicesCatalogSection />
        <BenefitsSection />
        <ProfessionalStatsSection />
        <ProcessSection />
        <ExpertiseShowcaseSection />
        <CaseStudiesSection />
        <InnovativePortfolioSection />
        <TestimonialsSection />
        <InteractiveGuaranteesSection />
        <TrustSection />
        <ModernPricingSection />
        <TeamSection />
        <FaqSection />
        <ContactSection />
        <NewsletterSection />
      </main>
    </>
  );
}
