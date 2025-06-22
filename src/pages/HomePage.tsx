
import HeroSection from '@/components/landing/HeroSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import ServicesCatalogSection from '@/components/landing/ServicesCatalogSection';
import ProcessSection from '@/components/landing/ProcessSection';
import ModernPricingSection from '@/components/landing/ModernPricingSection';
import ContactSection from '@/components/landing/ContactSection';
import FaqSection from '@/components/landing/FaqSection';
import PortfolioShowcase from '@/components/portfolio/PortfolioShowcase';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <ServicesCatalogSection />

      <BenefitsSection />

      <ProcessSection />

      <ModernPricingSection />

      <ContactSection />

      <FaqSection />
      
      {/* Добавляем новые секции */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <PortfolioShowcase maxItems={6} />
        </div>
      </section>

      <TestimonialsSection />
    </div>
  );
}
