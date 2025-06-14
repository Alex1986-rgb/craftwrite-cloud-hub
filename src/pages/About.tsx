
import Seo from "@/components/Seo";
import { SEO_CONFIG, generateWebPageStructuredData, generateBreadcrumbStructuredData } from "@/utils/seoConfig";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import MissionSection from "@/components/about/MissionSection";
import ValuesSection from "@/components/about/ValuesSection";
import TeamExpertiseSection from "@/components/about/TeamExpertiseSection";
import AchievementsSection from "@/components/about/AchievementsSection";
import CompanyTimelineSection from "@/components/about/CompanyTimelineSection";
import CertificationsSection from "@/components/about/CertificationsSection";
import OfficeSection from "@/components/about/OfficeSection";

const seoData = {
  title: "О компании CopyPro Cloud | Профессиональная команда копирайтеров",
  description: "Узнайте больше о CopyPro Cloud - ведущем агентстве копирайтинга с более чем 5-летним опытом. Наша миссия, ценности, команда экспертов и достижения.",
  keywords: "о компании, копирайтинг агентство, команда копирайтеров, история компании, миссия, ценности, достижения",
  canonicalUrl: `${SEO_CONFIG.baseUrl}/about`,
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      generateWebPageStructuredData({
        title: "О компании CopyPro Cloud",
        description: "Информация о команде, миссии и достижениях компании",
        url: "/about",
        about: "Company Information",
        keywords: "о компании, команда, миссия, достижения",
        mainEntity: {
          "@type": "Organization",
          name: SEO_CONFIG.siteName,
          description: "Ведущее агентство копирайтинга в России",
          foundingDate: SEO_CONFIG.organization.foundingDate,
          address: SEO_CONFIG.organization.address,
          contactPoint: SEO_CONFIG.organization.contactPoint,
          sameAs: SEO_CONFIG.organization.sameAs,
          employees: {
            "@type": "QuantitativeValue", 
            "value": "30+"
          },
          awards: [
            "Лучшее копирайтинг агентство 2023",
            "ТОП-10 контент-агентств России"
          ]
        }
      }),
      generateBreadcrumbStructuredData([
        { name: "Главная", url: "/" },
        { name: "О компании", url: "/about" }
      ]),
      {
        "@type": "AboutPage",
        "name": "О компании CopyPro Cloud",
        "description": "Подробная информация о нашей компании, команде и достижениях",
        "url": `${SEO_CONFIG.baseUrl}/about`,
        "inLanguage": "ru",
        "mainEntity": {
          "@type": "Organization",
          "name": SEO_CONFIG.siteName,
          "alternateName": "КопиПро Клауд",
          "description": "Профессиональное агентство копирайтинга с командой из 30+ экспертов",
          "foundingDate": "2019-01-15",
          "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "value": "30"
          },
          "knowsAbout": [
            "SEO-копирайтинг",
            "Контент-маркетинг", 
            "Создание лендингов",
            "Email-маркетинг",
            "Социальные медиа"
          ],
          "hasCredential": [
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "certification",
              "name": "Google Ads сертификация"
            },
            {
              "@type": "EducationalOccupationalCredential", 
              "credentialCategory": "certification",
              "name": "Яндекс.Директ сертификация"
            }
          ]
        }
      }
    ]
  }
};

export default function About() {
  return (
    <>
      <Seo {...seoData} />
      
      <div className="min-h-screen bg-white" itemScope itemType="https://schema.org/AboutPage">
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
          aria-label="О компании CopyPro Cloud"
          itemProp="mainEntity"
          itemScope
          itemType="https://schema.org/Organization"
        >
          {/* Hero Section */}
          <section 
            aria-labelledby="about-hero-heading"
            role="banner"
          >
            <AboutHeroSection />
          </section>

          {/* Mission Section */}
          <section 
            aria-labelledby="mission-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <MissionSection />
          </section>

          {/* Values Section */}
          <section 
            aria-labelledby="values-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <ValuesSection />
          </section>

          {/* Team Section */}
          <section 
            aria-labelledby="team-expertise-heading"
            role="region"
            className="py-16 md:py-24"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <TeamExpertiseSection />
          </section>

          {/* Timeline Section */}
          <section 
            aria-labelledby="timeline-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <CompanyTimelineSection />
          </section>

          {/* Achievements Section */}
          <section 
            aria-labelledby="achievements-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <AchievementsSection />
          </section>

          {/* Certifications Section */}
          <section 
            aria-labelledby="certifications-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <CertificationsSection />
          </section>

          {/* Office Section */}
          <section 
            aria-labelledby="office-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <OfficeSection />
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
              <span itemProp="name">О компании</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
}
