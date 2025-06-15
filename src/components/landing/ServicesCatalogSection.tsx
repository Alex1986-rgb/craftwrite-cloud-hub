
import ServiceSectionHeader from "./services/ServiceSectionHeader";
import ServiceGrid from "./services/ServiceGrid";
import ServiceCTA from "./services/ServiceCTA";

// Re-export the filter data for other components that might need it
export { FILTERS, FORMATS, LANGS, TOPICS } from "./services/servicesData";

const ServicesCatalogSection = () => {
  return (
    <section id="services" className="py-16 md:py-24 relative overflow-hidden">
      {/* Modern background with glass morphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-purple-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-gradient-to-r from-emerald-400/10 to-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <ServiceSectionHeader />
        <ServiceGrid />
        <ServiceCTA />
      </div>
    </section>
  );
};

export default ServicesCatalogSection;
