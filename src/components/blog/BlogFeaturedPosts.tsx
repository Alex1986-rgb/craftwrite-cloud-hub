
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
    <section className="py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-primary" />
          Рекомендуемые статьи
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-primary" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Badge>{post.category}</Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{post.author}</span>
                  </div>
                  
                  <Button asChild variant="ghost" size="sm">
                    <Link to={`/blog/${post.id}`} className="flex items-center gap-2">
                      Читать далее
                      <ArrowRight className="w-4 h-4" />
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
