
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const Icon = service.icon;

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
      service.popular ? 'ring-2 ring-blue-500 ring-offset-2' : ''
    }`}>
      {service.popular && (
        <Badge className="absolute top-4 right-4 bg-blue-500 text-white">
          Популярно
        </Badge>
      )}
      
      <CardHeader className="text-center pb-4">
        <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${service.color}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-xl font-bold mb-2">{service.title}</CardTitle>
        <p className="text-muted-foreground">{service.description}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="mb-6">
          <div className="text-3xl font-bold text-center mb-4">{service.price}</div>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button asChild className="w-full">
          <Link to={`/order/${service.id}`} className="flex items-center justify-center gap-2">
            Заказать
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
