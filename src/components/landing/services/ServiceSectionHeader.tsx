
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface ServiceSectionHeaderProps {
  title: string;
  description: string;
  badgeText?: string;
}

const ServiceSectionHeader: React.FC<ServiceSectionHeaderProps> = ({ 
  title, 
  description, 
  badgeText = "Наши услуги" 
}) => {
  return (
    <div className="text-center mb-16">
      <Badge variant="secondary" className="mb-6 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <Sparkles className="w-5 h-5 mr-2" />
        {badgeText}
      </Badge>
      <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
        {title}
      </h2>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ServiceSectionHeader;
