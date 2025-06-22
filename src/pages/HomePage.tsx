
import Hero from '@/components/landing/Hero';
import Services from '@/components/landing/Services';
import WhyChooseUs from '@/components/landing/WhyChooseUs';
import HowItWorks from '@/components/landing/HowItWorks';
import Pricing from '@/components/landing/Pricing';
import ContactForm from '@/components/landing/ContactForm';
import FAQ from '@/components/landing/FAQ';
import PortfolioShowcase from '@/components/portfolio/PortfolioShowcase';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <Pricing />
      <ContactForm />
      <FAQ />
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <PortfolioShowcase maxItems={6} />
        </div>
      </section>
      
      <TestimonialsSection />
    </div>
  );
}
