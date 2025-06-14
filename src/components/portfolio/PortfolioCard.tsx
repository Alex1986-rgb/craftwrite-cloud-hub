
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image } from "lucide-react";

type PortfolioCardProps = {
  title: string;
  desc: string;
  image?: string;
  tag: string;
};

const TAG_COLORS: Record<string, string> = {
  "SEO": "text-blue-700 border-blue-400",
  "Карточки": "text-purple-700 border-purple-400",
  "Лендинг": "text-green-700 border-green-400",
  "Другое": "text-gray-600 border-gray-400",
};

export default function PortfolioCard({ title, desc, image, tag }: PortfolioCardProps) {
  return (
    <Card className="overflow-hidden bg-card shadow-md border-primary/15 animate-fade-in transition-all hover-scale">
      <div className="relative aspect-[16/9] bg-muted flex items-center justify-center overflow-hidden">
        {image ? (
          // декор. рендер изображения
          <img
            src={`https://images.unsplash.com/${image}?auto=format&fit=facearea&w=600&q=80`}
            alt={title}
            className="w-full h-full object-cover transition-all hover:scale-105 duration-300"
            loading="lazy"
          />
        ) : (
          <Image className="text-muted-foreground w-12 h-12" />
        )}
        <span className="absolute top-3 left-3">
          <Badge variant="outline" className={TAG_COLORS[tag] || "text-gray-600"}>
            {tag}
          </Badge>
        </span>
      </div>
      <CardContent className="py-4 px-5 flex flex-col gap-2">
        <div className="font-semibold text-lg">{title}</div>
        <div className="text-muted-foreground text-sm">{desc}</div>
      </CardContent>
    </Card>
  );
}
