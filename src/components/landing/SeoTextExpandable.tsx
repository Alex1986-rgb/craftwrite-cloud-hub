
import { useState } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type SeoTextExpandableProps = {
  text: string;
  title?: string;
  limit?: number; // по умолчанию 5000 символов
};

export const SeoTextExpandable = ({
  text,
  title = "CopyPro Cloud — экспертные тексты под ваши задачи",
  limit = 5000,
}: SeoTextExpandableProps) => {
  const [open, setOpen] = useState(false);

  // Обрезаем весь текст по лимиту длины
  const limitedText = text.length > limit ? text.slice(0, limit) : text;

  // Берём первый абзац (до двойного переноса строки)
  const [firstPara, ...restParas] = limitedText.split(/\n\s*\n/);
  const rest = restParas.join("\n\n").trim();

  return (
    <section className="bg-muted/40 rounded-xl p-6 mb-10 shadow text-base text-muted-foreground leading-relaxed border border-primary/10 max-w-3xl mx-auto mt-12">
      <h2 className="text-xl font-bold mb-3 text-primary/80">{title}</h2>
      <div className="whitespace-pre-line">
        <span>{firstPara}</span>
        {!open && rest && (
          <span className="inline-flex items-center ml-2 cursor-pointer text-primary" onClick={() => setOpen(true)}>
            ... <ArrowDown className="w-4 h-4 inline-block ml-1" />
          </span>
        )}
        {open && rest && (
          <span className="block mt-4 whitespace-pre-line">{rest}</span>
        )}
      </div>
    </section>
  );
};
