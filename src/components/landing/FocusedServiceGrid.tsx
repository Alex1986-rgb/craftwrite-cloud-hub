import { FOCUSED_SERVICES } from "@/data/focusedServices";
import ServiceCard from "./services/ServiceCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Grid3x3 } from "lucide-react";

const FocusedServiceGrid = () => {
  return (
    <div className="space-y-8">
      {/* Main services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FOCUSED_SERVICES.map((service, index) => (
          <ServiceCard key={service.slug} service={service} index={index} />
        ))}
      </div>

      {/* Other services CTA */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
        <div className="max-w-2xl mx-auto">
          <Grid3x3 className="w-12 h-12 mx-auto mb-4 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Нужна другая услуга?
          </h3>
          <p className="text-gray-600 mb-6">
            У нас есть ещё 20+ специализированных услуг: от соцсетей до технических текстов. 
            Посмотрите полный каталог на отдельной странице.
          </p>
          <Button asChild size="lg" variant="outline" className="border-blue-200 hover:bg-blue-50">
            <Link to="/services">
              Все услуги
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FocusedServiceGrid;
