
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ModernHeroSection from "@/components/landing/ModernHeroSection";
import ModernServicesSection from "@/components/landing/ModernServicesSection";
import ModernPricingSection from "@/components/landing/ModernPricingSection";
import PaymentForm from "@/components/payments/PaymentForm";
import ComprehensiveSeo from "@/components/seo/ComprehensiveSeo";

export default function Index() {
  return (
    <>
      <ComprehensiveSeo />
      <Header />
      <main className="min-h-screen">
        <ModernHeroSection />
        <ModernServicesSection />
        <ModernPricingSection />
        <PaymentForm />
      </main>
      <Footer />
    </>
  );
}
