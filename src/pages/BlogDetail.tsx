
import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BlogDetailHero from "@/components/blog/BlogDetailHero";
import BlogDetailContent from "@/components/blog/BlogDetailContent";
import BlogDetailAuthor from "@/components/blog/BlogDetailAuthor";
import BlogDetailRelated from "@/components/blog/BlogDetailRelated";
import BlogDetailCTA from "@/components/blog/BlogDetailCTA";
import { expandedBlogPosts } from "@/data/blog";
import { fullExpertArticles } from "@/data/articles/fullExpertArticles";

export default function BlogDetail() {
  const { id } = useParams();
  
  console.log('BlogDetail - Looking for slug:', id);
  console.log('BlogDetail - Available posts count:', expandedBlogPosts.length);
  console.log('BlogDetail - Expert articles count:', fullExpertArticles.length);
  console.log('BlogDetail - Posts with slugs:', expandedBlogPosts.filter(p => p.slug).map(p => ({id: p.id, slug: p.slug, title: p.title})));
  
  // Try to find in expert articles first
  let expertArticle = fullExpertArticles.find(a => a.slug === id);
  if (expertArticle) {
    // Redirect to proper expert article page
    return <Navigate to={`/article/${expertArticle.slug}`} replace />;
  }
  
  // Try to find by slug first, then by numeric ID for backward compatibility
  let post = expandedBlogPosts.find(p => p.slug === id);
  console.log('BlogDetail - Found by slug:', post ? post.title : 'Not found');
  
  if (!post) {
    const postId = id ? parseInt(id, 10) : null;
    post = postId ? expandedBlogPosts.find(p => p.id === postId) : null;
    console.log('BlogDetail - Found by ID:', post ? post.title : 'Not found');
  }

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
