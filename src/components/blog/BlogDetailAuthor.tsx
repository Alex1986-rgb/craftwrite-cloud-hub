
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, TrendingUp } from "lucide-react";

interface BlogPost {
  author: string;
  category: string;
}

interface BlogDetailAuthorProps {
  post: BlogPost;
}

export default function BlogDetailAuthor({ post }: BlogDetailAuthorProps) {
  const authorBio = `Эксперт в области ${post.category.toLowerCase()}, автор более 50 статей по цифровому маркетингу и копирайтингу. Помогает брендам создавать эффективный контент уже более 8 лет.`;

  return (
    <section className="py-16 bg-slate-50/50">
      <div className="container max-w-4xl mx-auto px-4">
        <Card className="p-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{post.author}</h3>
              <p className="text-muted-foreground mb-4">
                {authorBio}
              </p>
              <div className="flex items-center gap-4">
                <Badge variant="outline">
                  <BookOpen className="w-3 h-3 mr-1" />
                  50+ статей
                </Badge>
                <Badge variant="outline">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  500+ клиентов
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
