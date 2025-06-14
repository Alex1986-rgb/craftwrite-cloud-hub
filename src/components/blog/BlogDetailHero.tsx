
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Calendar, Clock, Share2 } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

interface BlogDetailHeroProps {
  post: BlogPost;
}

export default function BlogDetailHero({ post }: BlogDetailHeroProps) {
  return (
    <section className="py-20">
      <div className="container max-w-4xl mx-auto px-4">
        <Button variant="outline" asChild className="mb-8">
          <Link to="/blog" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Вернуться к блогу
          </Link>
        </Button>

        <div className="mb-8">
          <Badge className="mb-4">{post.category}</Badge>
          <h1 className="text-3xl md:text-5xl font-playfair font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Поделиться
            </Button>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
