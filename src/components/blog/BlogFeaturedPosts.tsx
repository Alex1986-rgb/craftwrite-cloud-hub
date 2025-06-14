
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight,
  Zap,
  TrendingUp
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

interface BlogFeaturedPostsProps {
  posts: BlogPost[];
}

export default function BlogFeaturedPosts({ posts }: BlogFeaturedPostsProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Zap className="w-8 h-8 text-primary" />
            Рекомендуемые статьи
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Самые популярные и актуальные материалы от наших экспертов
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-slate-50/50 border-0 shadow-lg">
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-primary/10 via-blue-500/10 to-purple-500/10 flex items-center justify-center">
                  <TrendingUp className="w-16 h-16 text-primary" />
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary/90 backdrop-blur-sm">
                    {post.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                    Топ {index + 1}
                  </Badge>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 hover:text-primary transition-colors line-clamp-2">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                
                <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <Button asChild className="group">
                    <Link to={`/blog/${post.id}`} className="flex items-center gap-2">
                      Читать далее
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
