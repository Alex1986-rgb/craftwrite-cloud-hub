
import { Card } from "@/components/ui/card";

interface BlogPost {
  id: number;
  title: string;
  image: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
}

interface BlogDetailContentProps {
  post: BlogPost;
}

export default function BlogDetailContent({ post }: BlogDetailContentProps) {
  return (
    <>
      {/* Изображение статьи */}
      <section className="py-8">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Контент статьи */}
      <section className="py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <Card className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none
                prose-headings:text-foreground prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                prose-li:mb-2 prose-strong:text-foreground prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Card>
        </div>
      </section>
    </>
  );
}
