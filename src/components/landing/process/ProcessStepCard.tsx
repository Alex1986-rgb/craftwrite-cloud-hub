
import React from "react";
import { LucideIcon } from "lucide-react";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProcessStepCardProps {
  step: {
    icon: LucideIcon;
    title: string;
    description: string;
    time: string;
    details: string;
    color: string;
    bgColor: string;
  };
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}

export const ProcessStepCard = ({ step, index, isActive, onHover, onLeave }: ProcessStepCardProps) => {
  return (
    <Card 
      className={`p-8 group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-0 ${
        isActive 
          ? 'shadow-2xl scale-105 ring-4 ring-blue-200' 
          : 'shadow-lg hover:shadow-xl'
      } ${step.bgColor}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="text-center relative">
        {/* Иконка с анимацией */}
        <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-all duration-300 ${
          isActive ? 'animate-pulse scale-110' : ''
        }`}>
          <step.icon className="w-10 h-10 text-white" />
        </div>
        
        {/* Номер шага */}
        <div className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r ${step.color} text-white text-sm font-bold rounded-full flex items-center justify-center shadow-lg ${
          isActive ? 'animate-bounce' : ''
        }`}>
          {index + 1}
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-slate-900">{step.title}</h3>
        <p className="text-slate-600 mb-4 min-h-[48px] leading-relaxed">{step.description}</p>
        
        {/* Время выполнения */}
        <div className={`inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-md mb-4 ${
          isActive ? 'ring-2 ring-blue-300' : ''
        }`}>
          <Clock className="w-4 h-4 text-blue-500" />
          <span className="text-slate-700">{step.time}</span>
        </div>

        {/* Детали (показываются при наведении) */}
        <div className={`transition-all duration-300 overflow-hidden ${
          isActive ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <p className="text-sm text-slate-500 bg-white/50 rounded-lg p-3 backdrop-blur-sm">
            {step.details}
          </p>
        </div>
      </div>
    </Card>
  );
};
