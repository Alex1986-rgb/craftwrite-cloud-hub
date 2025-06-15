
import { useParams } from "react-router-dom";
import { SERVICES } from "@/data/services";
import { ENHANCED_TEXT_EXAMPLES } from "@/data/services/enhancedTextExamples";
import ServiceTextExamples from "@/components/service/ServiceTextExamples";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  DollarSign, 
  Star, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  Target,
  Zap
} from "lucide-react";
import Footer from "@/components/common/Footer";

export default function EnhancedServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find(s => s.slug === slug);
  const examples = ENHANCED_TEXT_EXAMPLES[slug || ""] || [];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Услуга не найдена</h1>
          <p className="text-slate-600">Запрашиваемая услуга не существует</p>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Простая": return "bg-green-100 text-green-700 border-green-200";
      case "Средняя": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Сложная": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Экспертная": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatPrice = () => {
    if (service.price.min === service.price.max) {
      return `${service.price.min.toLocaleString()} ${service.price.currency}`;
    }
    return `${service.price.min.toLocaleString()}-${service.price.max.toLocaleString()} ${service.price.currency}`;
  };

  const formatDeliveryTime = () => {
    if (service.deliveryTime.min === service.deliveryTime.max) {
      return `${service.deliveryTime.min} ${service.deliveryTime.unit}`;
    }
    return `${service.deliveryTime.min}-${service.deliveryTime.max} ${service.deliveryTime.unit}`;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              {service.category}
            </Badge>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              {service.name}
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              {service.detail}
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <DollarSign className="w-5 h-5" />
                <span>{formatPrice()}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <Clock className="w-5 h-5" />
                <span>{formatDeliveryTime()}</span>
              </div>
              <div className={`rounded-full px-4 py-2 border ${getDifficultyColor(service.difficulty)}`}>
                <span>{service.difficulty}</span>
              </div>
            </div>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold">
              <Zap className="w-5 h-5 mr-2" />
              Заказать сейчас
            </Button>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Features */}
            <Card className="p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Что входит в услугу
              </h3>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Requirements */}
            <Card className="p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-orange-500" />
                Требования к работе
              </h3>
              <ul className="space-y-3">
                {service.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{rule}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Recommendations */}
            <Card className="p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-blue-500" />
                Рекомендации
              </h3>
              <ul className="space-y-3">
                {service.recs.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Text Examples */}
      <ServiceTextExamples examples={examples} serviceName={service.name} />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Готовы заказать профессиональный текст?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Получите качественный контент от наших экспертов. 
            Гарантируем уникальность и соответствие всем требованиям.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 text-lg font-semibold">
              Заказать "{service.name}"
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 text-lg font-semibold">
              Получить консультацию
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
