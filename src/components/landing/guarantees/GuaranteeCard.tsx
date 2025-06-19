
import React from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface GuaranteeCardProps {
  guarantee: {
    id: string;
    icon: LucideIcon;
    title: string;
    shortDesc: string;
    color: string;
  };
  isActive: boolean;
  onClick: () => void;
  getColorClasses: (color: string, isActive?: boolean) => string;
}

export const GuaranteeCard = ({ guarantee, isActive, onClick, getColorClasses }: GuaranteeCardProps) => {
  return (
    <Card
      className={`p-6 cursor-pointer transition-all duration-300 border-2 ${
        getColorClasses(guarantee.color, isActive)
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          isActive 
            ? `bg-${guarantee.color}-100` 
            : `bg-${guarantee.color}-50`
        }`}>
          <guarantee.icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-800 mb-1">
            {guarantee.title}
          </h3>
          <p className="text-sm text-slate-600">
            {guarantee.shortDesc}
          </p>
          {isActive && (
            <ArrowRight className="w-4 h-4 mt-2 text-current" />
          )}
        </div>
      </div>
    </Card>
  );
};
