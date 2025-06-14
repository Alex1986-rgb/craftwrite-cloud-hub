
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
CopyPro Cloud — ведущая платформа профессионального копирайтинга в России и СНГ. 
Мы предоставляем услуги высококачественного контент-маркетинга для бизнеса любого масштаба.

Наши ключевые преимущества:
- Команда из 50+ сертифицированных SEO-копирайтеров с профильным образованием и многолетним опытом
- Гарантия 100% уникальности по всем основным сервисам проверки с официальными отчетами
- Экспресс-доставка от 24 часов без компромиссов по качеству содержания
- Глубокая SEO-оптимизация с детальным анализом конкурентов и подбором LSI-фраз
- Круглосуточная техническая поддержка и бесплатные правки в течение 14 дней

Полный спектр услуг CopyPro Cloud:
- SEO-статьи и экспертные блог-посты для органического продвижения
- Коммерческие тексты и высококонверсионные продающие лендинги
- Контент для социальных сетей и персонализированных email-рассылок
- Детальные описания товаров для интернет-магазинов и маркетплейсов
- Технические тексты, инструкции и корпоративная документация
- Пресс-релизы, новостные материалы и PR-контент

Работаем с клиентами из IT, e-commerce, финансов, медицины, образования, недвижимости и многих других сфер.
Создаем контент, который не только соответствует всем требованиям поисковых систем, 
но и эффективно конвертирует посетителей в лояльных клиентов.

Закажите профессиональный копирайтинг на CopyPro Cloud уже сегодня и получите результат, который превзойдет ваши ожидания!
`;

export default function Index() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden">
        {/* Современная hero-секция */}
        <HeroSection />
        
        {/* Социальные доказательства */}
        <SocialProofSection />
        
        {/* Преимущества с улучшенным дизайном */}
        <BenefitsSection />
        
        {/* Демонстрация экспертизы */}
        <ExpertiseShowcaseSection />
        
        {/* Каталог услуг */}
        <ServicesCatalogSection />
        
        {/* Современная секция цен */}
        <ModernPricingSection />
        
        {/* Процесс работы */}
        <ProcessSection />
        
        {/* Инновационное портфолио */}
        <InnovativePortfolioSection />
        
        {/* Профессиональная статистика */}
        <ProfessionalStatsSection />
        
        {/* Отзывы клиентов */}
        <TestimonialsSection />
        
        {/* Команда экспертов */}
        <TeamSection />
        
        {/* Доверие и сертификаты */}
        <TrustSection />
        
        {/* FAQ секция */}
        <FaqSection />
        
        {/* Контакты и форма связи */}
        <ContactSection />
        
        {/* SEO-оптимизированный текст */}
        <div className="container mx-auto px-4 py-16 bg-gradient-to-br from-slate-50/50 to-transparent">
          <SeoTextExpandable text={seoText} />
        </div>
      </main>
      <Footer />
    </>
  );
}
