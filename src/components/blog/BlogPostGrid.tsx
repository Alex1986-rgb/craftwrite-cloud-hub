
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight,
  BookOpen,
  TrendingUp,
  Eye,
  Heart
} from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}

interface BlogPostGridProps {
  posts: BlogPost[];
}

export default function BlogPostGrid({ posts }: BlogPostGridProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50/50 to-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            Все статьи
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Полная коллекция экспертных материалов для вашего роста в маркетинге
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-md">
              <div className="relative">
                <div className="h-40 bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary/90 backdrop-blur-sm text-white text-xs">
                    {post.category}
                  </Badge>
                </div>
                {post.featured && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-yellow-500/90 text-white text-xs flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Топ
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                </div>
                
                <h3 className="text-base font-bold mb-2 hover:text-primary transition-colors line-clamp-2 leading-tight min-h-[3rem]">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="w-3 h-3" />
                    <span className="truncate max-w-[80px]">{post.author}</span>
                  </div>
                  <Button asChild variant="outline" size="sm" className="group/btn text-xs h-7 px-3">
                    <Link to={`/blog/${post.id}`} className="flex items-center gap-1">
                      Читать
                      <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Статистика блога */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 via-blue-50/50 to-purple-50/50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Наш блог в цифрах</h3>
            <p className="text-muted-foreground">Статистика, которая говорит сама за себя</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">{posts.length}</div>
              <div className="text-sm text-muted-foreground">Статей</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-full mx-auto mb-3">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600">2.1M+</div>
              <div className="text-sm text-muted-foreground">Просмотров</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-full mx-auto mb-3">
                <Heart className="w-6 h-6 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-red-500">150K+</div>
              <div className="text-sm text-muted-foreground">Лайков</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-full mx-auto mb-3">
                <User className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-blue-500">85K+</div>
              <div className="text-sm text-muted-foreground">Подписчиков</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
