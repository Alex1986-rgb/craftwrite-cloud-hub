
import React from "react";
import { LucideIcon } from "lucide-react";

interface ProcessAdvantageCardProps {
  advantage: {
    icon: LucideIcon;
    title: string;
    desc: string;
  };
  index: number;
}

export const ProcessAdvantageCard = ({ advantage, index }: ProcessAdvantageCardProps) => {
  return (
    <div 
      key={index}
      className="flex items-start gap-4 p-4 bg-white/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/80 group"
    >
      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
        <advantage.icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h4 className="font-bold text-slate-900 mb-1">{advantage.title}</h4>
        <p className="text-sm text-slate-600 leading-relaxed">{advantage.desc}</p>
      </div>
    </div>
  );
};
