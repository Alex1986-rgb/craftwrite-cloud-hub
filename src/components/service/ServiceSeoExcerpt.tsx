
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ServiceSeoExcerptEnhanced } from "./ServiceSeoExcerptEnhanced";

interface ServiceSeoExcerptProps {
  seoText: string;
  serviceName?: string;
}

export const ServiceSeoExcerpt = ({ seoText, serviceName = "услуги" }: ServiceSeoExcerptProps) => {
  // Проверяем, содержит ли текст расширенную разметку
  const hasEnhancedContent = seoText.includes('📊') || seoText.includes('```') || seoText.includes('**');
  
  if (hasEnhancedContent) {
    return <ServiceSeoExcerptEnhanced seoText={seoText} serviceName={serviceName} />;
  }

  // Fallback для простых текстов
  const [expanded, setExpanded] = useState(false);
  const firstPara = seoText.split(/\n\s*\n/)[0];
  const rest = seoText.substring(firstPara.length).trim();

  return (
    <div className="bg-muted/60 rounded-md p-4 mt-6">
      <div className="text-muted-foreground text-sm">
        <span>{firstPara}</span>
        {!expanded && rest && (
          <span className="opacity-60">... </span>
        )}
        {expanded && rest && (
          <span className="block mt-2 whitespace-pre-line">{rest}</span>
        )}
      </div>
      {rest && (
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Скрыть" : "Далее"}
        </Button>
      )}
    </div>
  );
};
