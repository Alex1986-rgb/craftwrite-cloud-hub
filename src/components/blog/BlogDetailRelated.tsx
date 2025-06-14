
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, Clock } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
}

interface BlogDetailRelatedProps {
  relatedPosts: BlogPost[];
}

export default function BlogDetailRelated({ relatedPosts }: BlogDetailRelatedProps) {
  if (relatedPosts.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
          <Lightbulb className="w-8 h-8 text-primary" />
          Похожие статьи
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((relatedPost) => (
            <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-32 overflow-hidden">
                <img 
                  src={relatedPost.image} 
                  alt={relatedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <Badge className="mb-3">{relatedPost.category}</Badge>
                <h3 className="font-semibold mb-2 line-clamp-2">
                  {relatedPost.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {relatedPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {relatedPost.readTime}
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/blog/${relatedPost.id}`}>Читать</Link>
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
