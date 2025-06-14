
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
  Star,
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
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 flex items-center justify-center gap-4">
            <Zap className="w-10 h-10 text-primary" />
            Рекомендуемые статьи
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Самые популярные и актуальные материалы от наших экспертов. 
            Тщательно отобранный контент для вашего профессионального роста
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <Card key={post.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 border-0 shadow-lg">
              <div className="relative overflow-hidden">
                <div className="h-56 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary/90 backdrop-blur-sm text-white shadow-lg">
                    {post.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm shadow-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    Топ {index + 1}
                  </Badge>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    Популярная
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 hover:text-primary transition-colors line-clamp-2 leading-tight">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                
                <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed text-base">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{post.author}</span>
                  </div>
                  <Button asChild size="lg" className="group/btn">
                    <Link to={`/blog/${post.id}`} className="flex items-center gap-2">
                      Читать далее
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
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
