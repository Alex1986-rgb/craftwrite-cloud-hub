
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
  TrendingUp,
  Flame
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
    <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Flame className="w-4 h-4" />
            Горячие статьи
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
            Рекомендуемые статьи
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Самые популярные и актуальные материалы от наших экспертов. 
            Тщательно отобранный контент для вашего профессионального роста
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card key={post.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 border-0 shadow-lg">
              <div className="relative overflow-hidden">
                <div className="h-56 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                
                {/* Бейджи */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary/90 backdrop-blur-sm text-white shadow-lg">
                    {post.category}
                  </Badge>
                </div>
                
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    Топ {index + 1}
                  </Badge>
                </div>

                {/* Мета-информация поверх изображения */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-4 text-white text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      Популярная
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
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
                  <Button asChild size="lg" className="group/btn bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
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

        {/* CTA секция */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-blue-50/50 to-purple-50/50 rounded-3xl p-8 md:p-12">
            <h3 className="text-3xl font-bold mb-4">Не пропустите новые статьи!</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Подпишитесь на наш блог и получайте свежие материалы о маркетинге и копирайтинге прямо на почту
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
              <Zap className="w-5 h-5 mr-2" />
              Подписаться на обновления
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
