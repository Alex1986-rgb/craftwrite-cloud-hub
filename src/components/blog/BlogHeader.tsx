
import { Search, TrendingUp, Users, BookOpen, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface BlogHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function BlogHeader({ searchQuery, onSearchChange }: BlogHeaderProps) {
  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl"></div>
      </div>
      
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          {/* Главный заголовок */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-5xl md:text-6xl font-playfair font-bold">
              Блог CopyPro
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Экспертные знания в области маркетинга, копирайтинга и цифрового продвижения. 
            Практические советы от профессионалов индустрии.
          </p>

          {/* Поиск */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Поиск статей..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-300 rounded-full text-lg"
              />
            </div>
          </div>

          {/* Статистика блога */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-full mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-blue-300" />
              </div>
              <div className="text-2xl font-bold mb-1">49</div>
              <div className="text-sm text-blue-200">Экспертных статей</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-green-300" />
              </div>
              <div className="text-2xl font-bold mb-1">2.1M+</div>
              <div className="text-sm text-green-200">Просмотров</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-full mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-300" />
              </div>
              <div className="text-2xl font-bold mb-1">85K+</div>
              <div className="text-sm text-purple-200">Подписчиков</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-500/20 rounded-full mx-auto mb-3">
                <Award className="w-6 h-6 text-yellow-300" />
              </div>
              <div className="text-2xl font-bold mb-1">15+</div>
              <div className="text-sm text-yellow-200">Экспертов</div>
            </div>
          </div>

          {/* Популярные теги */}
          <div className="mt-8">
            <p className="text-sm text-blue-200 mb-4">Популярные темы:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "копирайтинг", "контент-маркетинг", "SEO", "SMM", 
                "email-маркетинг", "автоматизация", "аналитика", "стратегия"
              ].map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors cursor-pointer"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
