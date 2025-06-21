
import { ALL_SERVICES } from "@/data/allServices";
import ServiceCard from "./ServiceCard";

const ServiceGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
      {ALL_SERVICES.map((service, index) => (
        <ServiceCard key={service.slug} service={service} index={index} />
      ))}
    </div>
  );
};

export default ServiceGrid;
