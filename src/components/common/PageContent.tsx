
import { ReactNode } from "react";

interface PageContentProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  maxWidth?: "4xl" | "6xl" | "7xl";
}

export default function PageContent({ 
  children, 
  title, 
  subtitle,
  maxWidth = "4xl" 
}: PageContentProps) {
  const maxWidthClass = {
    "4xl": "max-w-4xl",
    "6xl": "max-w-6xl", 
    "7xl": "max-w-7xl"
  }[maxWidth];

  return (
    <div className="py-16 px-4">
      <div className={`${maxWidthClass} mx-auto`}>
        <h1 className="text-4xl font-bold text-center mb-8">{title}</h1>
        {subtitle && (
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600">{subtitle}</p>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
