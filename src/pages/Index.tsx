
import HeroSection from "@/components/landing/HeroSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import ServicesCatalogSection from "@/components/landing/ServicesCatalogSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FaqSection from "@/components/landing/FaqSection";
import ContactSection from "@/components/landing/ContactSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background flex flex-col gap-10 pb-8">
      <HeroSection />
      <BenefitsSection />
      <ServicesCatalogSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
};

export default Index;
