
import { useState } from "react";
import { blogPosts } from "@/data/blogPosts";
import Seo from "@/components/Seo";
import { SEO_CONFIG, generateBreadcrumbStructuredData } from "@/utils/seoConfig";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogCategories from "@/components/blog/BlogCategories";
import BlogFeaturedPosts from "@/components/blog/BlogFeaturedPosts";
import BlogPostGrid from "@/components/blog/BlogPostGrid";
import BlogEmptyState from "@/components/blog/BlogEmptyState";
import BlogCTA from "@/components/blog/BlogCTA";

const seoData = {
  title: "Блог о копирайтинге и контент-маркетинге | CopyPro Cloud",
  description: "Экспертные статьи о копирайтинге, SEO-текстах, контент-маркетинге и продающих текстах. Советы от профессионалов, кейсы, тренды индустрии. Повышайте эффективность контента.",
  keywords: "блог копирайтинг, статьи seo тексты, контент маркетинг советы, как писать продающие тексты, копирайтинг обучение, seo статьи советы",
  canonicalUrl: `${SEO_CONFIG.baseUrl}/blog`,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Блог CopyPro Cloud",
    description: "Экспертные статьи о копирайтинге и контент-маркетинге",
    url: `${SEO_CONFIG.baseUrl}/blog`,
    publisher: {
      "@type": "Organization",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.baseUrl
    },
    blogPost: blogPosts.slice(0, 10).map(post => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: post.author
      },
      articleSection: post.category,
      keywords: post.tags?.join(", ")
    })),
    breadcrumb: generateBreadcrumbStructuredData([
      { name: "Главная", url: "/" },
      { name: "Блог", url: "/blog" }
    ])
  }
};

// Get unique categories from blog posts
const getCategories = () => {
  const categoryCount: Record<string, number> = {};
  blogPosts.forEach(post => {
    categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
  });
  
  return [
    { name: "Все статьи", count: blogPosts.length },
    ...Object.entries(categoryCount).map(([name, count]) => ({ name, count }))
  ];
};

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("Все статьи");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "Все статьи" || post.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3);
  const categories = getCategories();

  return (
    <>
      <Seo {...seoData} />
      <main role="main" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <BlogHeader 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          
          <BlogCategories
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {featuredPosts.length > 0 && (
            <section aria-label="Рекомендуемые статьи">
              <BlogFeaturedPosts posts={featuredPosts} />
            </section>
          )}

          <section aria-label="Все статьи блога">
            {filteredPosts.length > 0 ? (
              <BlogPostGrid posts={filteredPosts} />
            ) : (
              <BlogEmptyState 
                onReset={() => {
                  setSelectedCategory("Все статьи");
                  setSearchQuery("");
                }}
              />
            )}
          </section>

          <BlogCTA />
        </div>
      </main>
    </>
  );
}
