
import ContactHeader from "./contact/ContactHeader";
import ContactForm from "./contact/ContactForm";
import ContactMethods from "./contact/ContactMethods";

const ContactSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <ContactHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Contact Methods Only */}
          <div>
            <ContactMethods />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
