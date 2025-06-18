
import React from "react";
import { ProcessStepCard } from "./ProcessStepCard";

interface ProcessStepsProps {
  steps: Array<{
    icon: any;
    title: string;
    description: string;
    time: string;
    details: string;
    color: string;
    bgColor: string;
  }>;
  activeStep: number | null;
  isPlaying: boolean;
  onStepHover: (index: number) => void;
  onStepLeave: () => void;
}

export const ProcessSteps = ({ steps, activeStep, isPlaying, onStepHover, onStepLeave }: ProcessStepsProps) => {
  return (
    <div className="relative mb-20">
      {/* Анимированная линия соединения */}
      <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-300 to-green-200 transform -translate-y-1/2 z-0 rounded-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full opacity-30 animate-pulse"></div>
      </div>
      
      <div className="grid lg:grid-cols-4 gap-8 relative z-10">
        {steps.map((step, index) => (
          <ProcessStepCard
            key={index}
            step={step}
            index={index}
            isActive={activeStep === index}
            onHover={() => !isPlaying && onStepHover(index)}
            onLeave={() => !isPlaying && onStepLeave()}
          />
        ))}
      </div>
    </div>
  );
};
