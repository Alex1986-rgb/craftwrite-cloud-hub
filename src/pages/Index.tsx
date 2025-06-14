
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import HeroSection from "@/components/landing/HeroSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import ServicesCatalogSection from "@/components/landing/ServicesCatalogSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FaqSection from "@/components/landing/FaqSection";
import ContactSection from "@/components/landing/ContactSection";
import Seo from "@/components/Seo";

const Index = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background flex flex-col gap-10 pb-8">
        <Seo
          title="CopyPro Cloud — SaaS-платформа для копирайтинга"
          description="Платформа для заказа текстов: статьи, тексты для сайтов, продающие лендинги, быстро и профессионально. Копирайтеры, SEO-оптимизация, контроль качества!"
        />
        <HeroSection />
        <BenefitsSection />
        <ServicesCatalogSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
