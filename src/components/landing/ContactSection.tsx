
import ContactHeader from "./contact/ContactHeader";
import ContactForm from "./contact/ContactForm";
import ContactMethods from "./contact/ContactMethods";
import BusinessInfo from "@/components/common/BusinessInfo";
import FloatingParticles from "@/components/ui/floating-particles";

const ContactSection = () => {
  return (
    <section id="contact-form" className="py-20 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Animated Background Blobs */}
        <div className="absolute top-1/4 left-1/6 w-[400px] h-[400px] bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-[500px] h-[500px] bg-gradient-to-r from-emerald-400/8 to-cyan-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Floating Particles */}
        <FloatingParticles count={25} />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.03)_1px,transparent_0)] [background-size:50px_50px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ContactHeader />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Contact Form - Enhanced */}
          <div className="lg:col-span-3">
            <div className="relative">
              {/* Form Enhancement Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur opacity-25"></div>
              <div className="relative">
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Contact Methods - Enhanced */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 space-y-6">
              <ContactMethods />
              <BusinessInfo variant="compact" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
