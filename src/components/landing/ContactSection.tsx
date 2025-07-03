
import ContactHeader from "./contact/ContactHeader";
import ContactForm from "./contact/ContactForm";
import ContactMethods from "./contact/ContactMethods";
import BusinessInfo from "@/components/common/BusinessInfo";

const ContactSection = () => {
  return (
    <section id="contact-form" className="py-20 bg-gradient-to-br from-background via-muted/30 to-accent/10 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-gradient-to-r from-primary/20 to-accent/15 rounded-full blur-3xl animate-pulse opacity-60"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-gradient-to-r from-accent/20 to-primary/15 rounded-full blur-3xl animate-pulse opacity-40" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-muted/30 to-primary/10 rounded-full blur-2xl animate-pulse opacity-30" style={{ animationDelay: '0.8s' }}></div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

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
