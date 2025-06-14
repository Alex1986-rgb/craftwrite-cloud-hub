
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
          <div className="rounded-lg overflow-hidden shadow-lg">
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
          <Card className="p-8 md:p-12 shadow-lg">
            <div className="article-content max-w-none
                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:border-b-2 [&_h2]:border-blue-500 [&_h2]:pb-2
                [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:text-blue-600
                [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-foreground [&_h4]:mt-6 [&_h4]:mb-3 [&_h4]:text-purple-600
                [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-6 [&_p]:text-base
                [&_ul]:text-muted-foreground [&_ul]:mb-6 [&_ul]:ml-6
                [&_ol]:text-muted-foreground [&_ol]:mb-6 [&_ol]:ml-6
                [&_li]:mb-2 [&_li]:list-disc [&_ol_li]:list-decimal [&_li]:leading-relaxed
                [&_strong]:text-foreground [&_strong]:font-semibold [&_strong]:text-blue-700
                [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-6 [&_blockquote]:py-4 [&_blockquote]:mb-6 [&_blockquote]:bg-blue-50 [&_blockquote]:rounded-r-lg [&_blockquote]:shadow-sm
                [&_blockquote_p]:text-lg [&_blockquote_p]:italic [&_blockquote_p]:text-blue-800 [&_blockquote_p]:mb-0 [&_blockquote_p]:font-medium
                [&_table]:w-full [&_table]:border-collapse [&_table]:mb-8 [&_table]:shadow-lg [&_table]:rounded-lg [&_table]:overflow-hidden [&_table]:border [&_table]:border-gray-200
                [&_thead]:bg-gradient-to-r [&_thead]:from-blue-500 [&_thead]:to-purple-600
                [&_th]:border [&_th]:border-gray-200 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-white [&_th]:text-sm
                [&_td]:border [&_td]:border-gray-200 [&_td]:px-4 [&_td]:py-3 [&_td]:text-muted-foreground [&_td]:text-sm
                [&_tbody_tr:nth-child(even)]:bg-gray-50 [&_tbody_tr:hover]:bg-blue-50 [&_tbody_tr]:transition-colors
                [&_.highlight-box]:bg-gradient-to-r [&_.highlight-box]:from-green-50 [&_.highlight-box]:to-emerald-50 [&_.highlight-box]:border [&_.highlight-box]:border-green-200 [&_.highlight-box]:rounded-lg [&_.highlight-box]:p-6 [&_.highlight-box]:mb-6 [&_.highlight-box]:shadow-sm
                [&_.warning-box]:bg-gradient-to-r [&_.warning-box]:from-yellow-50 [&_.warning-box]:to-orange-50 [&_.warning-box]:border [&_.warning-box]:border-yellow-200 [&_.warning-box]:rounded-lg [&_.warning-box]:p-6 [&_.warning-box]:mb-6 [&_.warning-box]:shadow-sm
                [&_.info-box]:bg-gradient-to-r [&_.info-box]:from-cyan-50 [&_.info-box]:to-blue-50 [&_.info-box]:border [&_.info-box]:border-cyan-200 [&_.info-box]:rounded-lg [&_.info-box]:p-6 [&_.info-box]:mb-6 [&_.info-box]:shadow-sm
                [&_.success-box]:bg-gradient-to-r [&_.success-box]:from-green-50 [&_.success-box]:to-teal-50 [&_.success-box]:border [&_.success-box]:border-green-300 [&_.success-box]:rounded-lg [&_.success-box]:p-6 [&_.success-box]:mb-6 [&_.success-box]:shadow-sm
                [&_.article-image]:w-full [&_.article-image]:rounded-lg [&_.article-image]:shadow-lg [&_.article-image]:mb-6 [&_.article-image]:border [&_.article-image]:border-gray-200"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Card>
        </div>
      </section>
    </>
  );
}
