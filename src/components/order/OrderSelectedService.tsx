
import React from "react";

interface OrderSelectedServiceProps {
  serviceName: string;
}

export default function OrderSelectedService({ serviceName }: OrderSelectedServiceProps) {
  return (
    <div className="mx-auto flex flex-col items-center -mt-3 mb-6 animate-fade-in">
      <span
        className="
          rounded-full border border-muted bg-muted/30 text-foreground
          px-4 py-2 text-sm font-semibold shadow-lg flex items-center gap-2
          hover:scale-105 transition-transform duration-200 animate-scale-in
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
        "
        aria-label={`Выбрана услуга: ${serviceName}`}
        tabIndex={0}
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="inline-block text-green-500">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M15 8l-5.5 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {serviceName}
      </span>
    </div>
  );
}
