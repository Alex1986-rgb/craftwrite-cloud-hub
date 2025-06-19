
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import { GuaranteeCard } from "./guarantees/GuaranteeCard";
import { GuaranteeDetails } from "./guarantees/GuaranteeDetails";
import { TrustIndicators } from "./guarantees/TrustIndicators";
import { guarantees } from "./guarantees/guaranteesData";

export default function InteractiveGuaranteesSection() {
  const [activeGuarantee, setActiveGuarantee] = useState(guarantees[0].id);

  const activeItem = guarantees.find(g => g.id === activeGuarantee) || guarantees[0];

  const getColorClasses = (color: string, isActive = false) => {
    const colors = {
      blue: isActive ? "border-blue-500 bg-blue-50 text-blue-700" : "border-blue-200 hover:border-blue-300 text-blue-600",
      green: isActive ? "border-green-500 bg-green-50 text-green-700" : "border-green-200 hover:border-green-300 text-green-600",
      purple: isActive ? "border-purple-500 bg-purple-50 text-purple-700" : "border-purple-200 hover:border-purple-300 text-purple-600",
      orange: isActive ? "border-orange-500 bg-orange-50 text-orange-700" : "border-orange-200 hover:border-orange-300 text-orange-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Shield className="w-4 h-4 mr-2" />
            Гарантии качества
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
            Наши обязательства перед клиентами
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Мы берем на себя полную ответственность за качество, сроки и результат. 
            Ваша уверенность в сотрудничестве - наш главный приоритет.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Guarantee Tabs */}
            <div className="space-y-4">
              {guarantees.map((guarantee) => (
                <GuaranteeCard
                  key={guarantee.id}
                  guarantee={guarantee}
                  isActive={activeGuarantee === guarantee.id}
                  onClick={() => setActiveGuarantee(guarantee.id)}
                  getColorClasses={getColorClasses}
                />
              ))}
            </div>

            {/* Active Guarantee Details */}
            <div className="lg:col-span-2">
              <GuaranteeDetails activeItem={activeItem} />
            </div>
          </div>

          <TrustIndicators />
        </div>
      </div>
    </section>
  );
}
