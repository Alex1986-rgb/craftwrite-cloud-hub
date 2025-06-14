
import HeroSection from "@/components/landing/HeroSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import ServicesCatalogSection from "@/components/landing/ServicesCatalogSection";
import ProcessSection from "@/components/landing/ProcessSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ProfessionalStatsSection from "@/components/landing/ProfessionalStatsSection";
import FaqSection from "@/components/landing/FaqSection";
import TeamSection from "@/components/landing/TeamSection";
import TrustSection from "@/components/landing/TrustSection";
import ContactSection from "@/components/landing/ContactSection";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ModernPricingSection from "@/components/landing/ModernPricingSection";
import InnovativePortfolioSection from "@/components/landing/InnovativePortfolioSection";
import ExpertiseShowcaseSection from "@/components/landing/ExpertiseShowcaseSection";
import SocialProofSection from "@/components/landing/SocialProofSection";

const seoText = `
CopyPro Cloud — ведущая платформа профессионального копирайтинга в России. 
Мы предоставляем услуги высококачественного контент-маркетинга для бизнеса любого масштаба.

Наши преимущества:
- Команда из 30+ дипломированных SEO-копирайтеров с профильным образованием
- Гарантия 100% уникальности по Text.ru с предоставлением официальных ссылок
- Экспресс-доставка от 24 часов без компромиссов по качеству
- Глубокая SEO-оптимизация с анализом конкурентов и подбором LSI
- Техническая поддержка и бесплатные правки в течение 7 дней

Услуги CopyPro Cloud:
- SEO-статьи и блог-посты для продвижения сайтов
- Коммерческие тексты и продающие лендинги
- Контент для социальных сетей и email-рассылок
- Описания товаров для интернет-магазинов
- Технические тексты и инструкции
- Пресс-релизы и новостные материалы

Работаем с клиентами из IT, e-commerce, финансов, медицины, образования и других сфер.
Создаем контент, который не только соответствует требованиям поисковых систем, 
но и эффективно конвертирует посетителей в клиентов.

Закажите профессиональный копирайтинг на CopyPro Cloud уже сегодня!
`;

export default function Index() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden">
        {/* Hero Section - улучшенный */}
        <HeroSection />
        
        {/* Новая секция социальных доказательств */}
        <SocialProofSection />
        
        {/* Benefits Section - существующий */}
        <BenefitsSection />
        
        {/* Новая секция демонстрации экспертизы */}
        <ExpertiseShowcaseSection />
        
        {/* Services Catalog - существующий */}
        <ServicesCatalogSection />
        
        {/* Новая современная секция цен */}
        <ModernPricingSection />
        
        {/* Process Section - существующий */}
        <ProcessSection />
        
        {/* Новая инновационная секция портфолио */}
        <InnovativePortfolioSection />
        
        {/* Professional Stats - существующий */}
        <ProfessionalStatsSection />
        
        {/* Testimonials - существующий */}
        <TestimonialsSection />
        
        {/* Team Section - существующий */}
        <TeamSection />
        
        {/* Trust Section - существующий */}
        <TrustSection />
        
        {/* FAQ Section - существующий */}
        <FaqSection />
        
        {/* Contact Section - существующий */}
        <ContactSection />
        
        {/* SEO текст */}
        <div className="container mx-auto px-4 py-16">
          <SeoTextExpandable text={seoText} />
        </div>
      </main>
      <Footer />
    </>
  );
}
