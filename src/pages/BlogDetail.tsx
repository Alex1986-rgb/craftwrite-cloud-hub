
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BlogDetailHero from "@/components/blog/BlogDetailHero";
import BlogDetailContent from "@/components/blog/BlogDetailContent";
import BlogDetailAuthor from "@/components/blog/BlogDetailAuthor";
import BlogDetailRelated from "@/components/blog/BlogDetailRelated";
import BlogDetailCTA from "@/components/blog/BlogDetailCTA";
import { expandedBlogPosts } from "@/data/blog";

export default function BlogDetail() {
  const { id } = useParams();
  const postId = id ? parseInt(id, 10) : null;
  const post = postId ? expandedBlogPosts.find(p => p.id === postId) : null;

  if (!post) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background to-slate-50/50 py-20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Статья не найдена</h1>
          <p className="text-muted-foreground mb-8">Извините, запрашиваемая статья не существует.</p>
          <Button asChild>
            <Link to="/blog">Вернуться к блогу</Link>
          </Button>
        </div>
      </main>
    );
  }

  const relatedPosts = post.relatedPosts
    .map(id => expandedBlogPosts.find(p => p.id === id))
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-slate-50/50">
      <BlogDetailHero post={post} />
      <BlogDetailContent post={post} />
      <BlogDetailAuthor post={post} />
      <BlogDetailRelated relatedPosts={relatedPosts} />
      <BlogDetailCTA />
    </main>
  );
}
