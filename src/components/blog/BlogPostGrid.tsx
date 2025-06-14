
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  User, 
  Clock, 
  Target,
  Lightbulb
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
    <section className="py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Lightbulb className="w-8 h-8 text-primary" />
          Все статьи
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <Target className="w-12 h-12 text-slate-400" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <Badge variant="outline">{post.category}</Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
