
import React from 'react';
import ServiceCard from './ServiceCard';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  price: string;
  popular?: boolean;
  color: string;
}

interface ServiceGridProps {
  services: Service[];
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ services }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServiceGrid;
