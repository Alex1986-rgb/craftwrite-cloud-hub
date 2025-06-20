
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCTA: React.FC = () => {
  return (
    <div className="mt-16 text-center">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Не нашли подходящую услугу?
        </h3>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Мы создаем индивидуальные решения для любых задач. 
          Расскажите о вашем проекте, и мы предложим оптимальный вариант.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/contact" className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Обсудить проект
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          
          <Button variant="outline" size="lg" asChild>
            <Link to="tel:+7-800-123-45-67" className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Позвонить нам
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCTA;
