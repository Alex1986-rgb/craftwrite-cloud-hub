
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
            <div className="article-content max-w-none
                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:mb-6
                [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-4
                [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-foreground [&_h4]:mt-6 [&_h4]:mb-3
                [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-6
                [&_ul]:text-muted-foreground [&_ul]:mb-6 [&_ul]:ml-6
                [&_ol]:text-muted-foreground [&_ol]:mb-6 [&_ol]:ml-6
                [&_li]:mb-2 [&_li]:list-disc [&_ol_li]:list-decimal
                [&_strong]:text-foreground [&_strong]:font-semibold
                [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:py-4 [&_blockquote]:mb-6 [&_blockquote]:bg-slate-50 [&_blockquote]:rounded-r-lg
                [&_blockquote_p]:text-lg [&_blockquote_p]:italic [&_blockquote_p]:text-slate-700 [&_blockquote_p]:mb-0
                [&_table]:w-full [&_table]:border-collapse [&_table]:mb-8 [&_table]:shadow-sm [&_table]:rounded-lg [&_table]:overflow-hidden
                [&_thead]:bg-slate-100
                [&_th]:border [&_th]:border-slate-200 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground
                [&_td]:border [&_td]:border-slate-200 [&_td]:px-4 [&_td]:py-3 [&_td]:text-muted-foreground
                [&_tbody_tr:nth-child(even)]:bg-slate-50"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Card>
        </div>
      </section>
    </>
  );
}
