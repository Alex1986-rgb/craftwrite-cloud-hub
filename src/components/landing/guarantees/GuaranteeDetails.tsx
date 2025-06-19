
import React from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle, Shield } from "lucide-react";

interface GuaranteeDetailsProps {
  activeItem: {
    id: string;
    icon: any;
    title: string;
    fullDesc: string;
    features: string[];
    color: string;
  };
}

export const GuaranteeDetails = ({ activeItem }: GuaranteeDetailsProps) => {
  return (
    <Card className="p-8 h-full bg-gradient-to-br from-white to-slate-50/50 border-0 shadow-xl">
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-16 h-16 bg-gradient-to-r from-${activeItem.color}-500 to-${activeItem.color}-600 rounded-2xl flex items-center justify-center`}>
          <activeItem.icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            {activeItem.title}
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {activeItem.fullDesc}
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <h4 className="font-semibold text-slate-800 mb-4">
          Что входит в гарантию:
        </h4>
        {activeItem.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <CheckCircle className={`w-5 h-5 text-${activeItem.color}-500 flex-shrink-0`} />
            <span className="text-slate-700">{feature}</span>
          </div>
        ))}
      </div>

      <div className={`p-4 bg-gradient-to-r from-${activeItem.color}-50 to-${activeItem.color}-100/50 rounded-xl border border-${activeItem.color}-200/50`}>
        <div className="flex items-center gap-3 mb-2">
          <Shield className={`w-5 h-5 text-${activeItem.color}-600`} />
          <span className={`font-semibold text-${activeItem.color}-800`}>
            Юридическая защита
          </span>
        </div>
        <p className={`text-sm text-${activeItem.color}-700`}>
          Все гарантии закреплены в договоре. При нарушении обязательств предусмотрена компенсация.
        </p>
      </div>
    </Card>
  );
};
