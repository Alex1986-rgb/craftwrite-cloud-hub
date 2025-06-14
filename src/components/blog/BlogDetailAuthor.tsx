
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, TrendingUp } from "lucide-react";

interface BlogPost {
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: string;
}

interface BlogDetailAuthorProps {
  post: BlogPost;
}

export default function BlogDetailAuthor({ post }: BlogDetailAuthorProps) {
  return (
    <section className="py-16 bg-slate-50/50">
      <div className="container max-w-4xl mx-auto px-4">
        <Card className="p-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {post.author.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{post.author.name}</h3>
              <p className="text-muted-foreground mb-4">
                {post.author.bio}
              </p>
              <div className="flex items-center gap-4">
                <Badge variant="outline">
                  <BookOpen className="w-3 h-3 mr-1" />
                  15+ статей
                </Badge>
                <Badge variant="outline">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  200+ клиентов
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
