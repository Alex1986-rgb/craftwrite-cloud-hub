
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, BookOpen } from "lucide-react";

interface BlogHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function BlogHeader({ searchQuery, setSearchQuery }: BlogHeaderProps) {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5"></div>
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 px-6 py-3 text-lg font-semibold">
            <BookOpen className="w-5 h-5 mr-2" />
            Блог
          </Badge>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Экспертные знания в копирайтинге
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Полезные статьи, кейсы и советы от профессионалов индустрии. 
            Изучайте лучшие практики и развивайте свои навыки
          </p>
        </div>

        {/* Поиск */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Поиск по статьям..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
