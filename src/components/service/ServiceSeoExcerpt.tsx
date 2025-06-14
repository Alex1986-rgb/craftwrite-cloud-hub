
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ServiceSeoExcerptProps {
  seoText: string;
}

export const ServiceSeoExcerpt = ({ seoText }: ServiceSeoExcerptProps) => {
  const [expanded, setExpanded] = useState(false);

  // Первый абзац — до первой двойной новой строки/абзаца
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
