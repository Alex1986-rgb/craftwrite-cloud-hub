import { ALL_SERVICES } from "@/data/allServices";
import ServiceCard from "@/components/landing/services/ServiceCard";
import UnifiedHeader from "@/components/navigation/UnifiedHeader";
import EnhancedFooter from "@/components/common/EnhancedFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Grid3x3, Filter } from "lucide-react";
import { useState } from "react";

const AllServices = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "Все услуги", count: ALL_SERVICES.length },
    { id: "SEO-контент", name: "SEO-контент", count: ALL_SERVICES.filter(s => s.category === "SEO-контент").length },
    { id: "Продающий контент", name: "Продающий контент", count: ALL_SERVICES.filter(s => s.category === "Продающий контент").length },
    { id: "Социальные сети", name: "Социальные сети", count: ALL_SERVICES.filter(s => s.category === "Социальные сети").length },
    { id: "Маркетплейс", name: "Маркетплейсы", count: ALL_SERVICES.filter(s => s.category === "Маркетплейс").length },
    { id: "Email-маркетинг", name: "Email-маркетинг", count: ALL_SERVICES.filter(s => s.category === "Email-маркетинг").length }
  ];

  const filteredServices = selectedCategory === "all" 
    ? ALL_SERVICES 
    : ALL_SERVICES.filter(service => service.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
      <UnifiedHeader />
      
      <div className="container max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Button asChild variant="outline" className="mb-6">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              На главную
            </Link>
          </Button>
          
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Grid3x3 className="w-4 h-4 mr-2" />
            Полный каталог
          </Badge>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Все наши услуги
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Расширенный каталог всех направлений работы. Основные услуги представлены на главной странице, 
            здесь вы найдете полный спектр наших возможностей.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Filter className="w-5 h-5 text-gray-400 mt-2" />
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="text-sm"
            >
              {category.name}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredServices.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-2">
            Не нашли нужную услугу?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Свяжитесь с нами для обсуждения индивидуального проекта. 
            Мы всегда готовы взяться за нестандартные задачи.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link to="/contact">
              Обсудить проект
            </Link>
          </Button>
        </div>
      </div>

      <EnhancedFooter />
    </main>
  );
};

export default AllServices;