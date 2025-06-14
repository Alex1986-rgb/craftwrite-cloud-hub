
import Seo from "@/components/Seo";
import { SEO_CONFIG, generateBreadcrumbStructuredData } from "@/utils/seoConfig";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import MissionSection from "@/components/about/MissionSection";
import ValuesSection from "@/components/about/ValuesSection";
import TeamExpertiseSection from "@/components/about/TeamExpertiseSection";
import AchievementsSection from "@/components/about/AchievementsSection";
import CompanyTimelineSection from "@/components/about/CompanyTimelineSection";
import CertificationsSection from "@/components/about/CertificationsSection";
import OfficeSection from "@/components/about/OfficeSection";

const seoData = {
  title: "О компании CopyPro Cloud - Эксперты копирайтинга и контент-маркетинга",
  description: "Узнайте больше о команде CopyPro Cloud. 30+ экспертов копирайтинга, 5 лет на рынке, более 10 000 успешных проектов. Наша миссия - качественный контент для вашего бизнеса.",
  keywords: "о компании, команда копирайтеров, эксперты seo, copyPro cloud история, профессиональный копирайтинг команда, сертифицированные копирайтеры",
  canonicalUrl: `${SEO_CONFIG.baseUrl}/about`,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "О компании CopyPro Cloud",
    description: "Информация о команде и истории компании CopyPro Cloud",
    mainEntity: {
      "@type": "Organization",
      name: SEO_CONFIG.siteName,
      foundingDate: "2019",
      numberOfEmployees: "30+",
      description: "Профессиональная команда копирайтеров и SEO-специалистов",
      knowsAbout: [
        "SEO копирайтинг",
        "Контент-маркетинг", 
        "Продающие тексты",
        "Email-маркетинг",
        "Социальные сети",
        "E-commerce контент"
      ],
      award: [
        "Лучшее агентство копирайтинга 2023",
        "Топ-10 контент-агентств России"
      ]
    },
    breadcrumb: generateBreadcrumbStructuredData([
      { name: "Главная", url: "/" },
      { name: "О нас", url: "/about" }
    ])
  }
};

export default function About() {
  return (
    <>
      <Seo {...seoData} />
      <main role="main" className="min-h-screen">
        <AboutHeroSection />
        <MissionSection />
        <ValuesSection />
        <TeamExpertiseSection />
        <AchievementsSection />
        <CompanyTimelineSection />
        <CertificationsSection />
        <OfficeSection />
      </main>
    </>
  );
}
