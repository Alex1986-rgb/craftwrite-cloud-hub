
import { useState, useMemo } from "react";
import { blogPosts } from "@/data/blogPosts";
import Seo from "@/components/Seo";
import { SEO_CONFIG, generateWebPageStructuredData, generateBreadcrumbStructuredData } from "@/utils/seoConfig";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogCategories from "@/components/blog/BlogCategories";
import BlogPostGrid from "@/components/blog/BlogPostGrid";
import BlogFeaturedPosts from "@/components/blog/BlogFeaturedPosts";
import BlogEmptyState from "@/components/blog/BlogEmptyState";
import BlogCTA from "@/components/blog/BlogCTA";

const seoData = {
  title: "Блог о копирайтинге | CopyPro Cloud - Советы экспертов и кейсы",
  description: "Профессиональные статьи о копирайтинге, SEO-оптимизации, контент-маркетинге и продающих текстах. Практические советы от экспертов CopyPro Cloud.",
  keywords: "блог копирайтинга, seo статьи, контент маркетинг, продающие тексты, советы копирайтера, кейсы копирайтинга",
  canonicalUrl: `${SEO_CONFIG.baseUrl}/blog`,
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      generateWebPageStructuredData({
        title: "Блог CopyPro Cloud",
        description: "Экспертные статьи о копирайтинге и контент-маркетинге",
        url: "/blog",
        about: "Copywriting Blog",
        keywords: "блог, копирайтинг, контент маркетинг",
        mainEntity: {
          "@type": "Blog",
          name: "Блог CopyPro Cloud",
          description: "Профессиональные статьи о копирайтинге",
          publisher: {
            "@type": "Organization",
            name: SEO_CONFIG.siteName
          }
        }
      }),
      generateBreadcrumbStructuredData([
        { name: "Главная", url: "/" },
        { name: "Блог", url: "/blog" }
      ]),
      {
        "@type": "Blog",
        "name": "Блог CopyPro Cloud",
        "description": "Экспертные материалы о копирайтинге и контент-маркетинге",
        "url": `${SEO_CONFIG.baseUrl}/blog`,
        "inLanguage": "ru",
        "publisher": {
          "@type": "Organization",
          "name": SEO_CONFIG.siteName,
          "logo": {
            "@type": "ImageObject",
            "url": SEO_CONFIG.organization.logo
          }
        },
        "blogPost": blogPosts.slice(0, 10).map(post => ({
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "url": `${SEO_CONFIG.baseUrl}/blog/${post.id}`,
          "datePublished": post.date,
          "dateModified": post.date,
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "image": post.image,
          "articleSection": post.category,
          "keywords": post.tags.join(", "),
          "wordCount": parseInt(post.readTime) * 250
        }))
      },
      {
        "@type": "ItemList",
        "name": "Статьи блога",
        "numberOfItems": blogPosts.length,
        "itemListElement": blogPosts.slice(0, 20).map((post, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "BlogPosting",
            "name": post.title,
            "url": `${SEO_CONFIG.baseUrl}/blog/${post.id}`
          }
        }))
      }
    ]
  }
};

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(blogPosts.map(post => post.category)));
    return ["all", ...cats];
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPosts = useMemo(() => {
    return blogPosts.filter(post => post.featured).slice(0, 3);
  }, []);

  return (
    <>
      <Seo {...seoData} />
      
      <div className="min-h-screen bg-white" itemScope itemType="https://schema.org/Blog">
        {/* Skip to content link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-50"
        >
          Перейти к основному содержанию
        </a>
        
        <Header />
        
        <main 
          id="main-content"
          role="main" 
          aria-label="Блог CopyPro Cloud"
          itemProp="mainEntity"
          itemScope
          itemType="https://schema.org/Blog"
        >
          {/* Header Section */}
          <section 
            aria-labelledby="blog-header-heading"
            role="banner"
          >
            <BlogHeader 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </section>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section 
              aria-labelledby="featured-posts-heading"
              role="region"
              className="py-8 md:py-12"
            >
              <div className="container mx-auto px-4">
                <header className="mb-8">
                  <h2 
                    id="featured-posts-heading"
                    className="text-2xl md:text-3xl font-bold text-center mb-4"
                  >
                    Рекомендуемые статьи
                  </h2>
                </header>
                <BlogFeaturedPosts posts={featuredPosts} />
              </div>
            </section>
          )}

          {/* Categories */}
          <section 
            aria-labelledby="categories-heading"
            role="navigation"
            aria-label="Категории блога"
            className="py-8"
          >
            <div className="container mx-auto px-4">
              <BlogCategories
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                postCounts={categories.reduce((acc, cat) => {
                  acc[cat] = cat === "all" ? blogPosts.length : blogPosts.filter(p => p.category === cat).length;
                  return acc;
                }, {} as Record<string, number>)}
              />
            </div>
          </section>

          {/* Blog Posts */}
          <section 
            aria-labelledby="blog-posts-heading"
            role="region"
            className="py-8 md:py-12"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="container mx-auto px-4">
              <div className="sr-only" aria-live="polite">
                Найдено {filteredPosts.length} статей
              </div>
              
              {filteredPosts.length > 0 ? (
                <BlogPostGrid 
                  posts={filteredPosts}
                />
              ) : (
                <BlogEmptyState 
                  onReset={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                />
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section 
            aria-labelledby="blog-cta-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <BlogCTA />
          </section>
        </main>

        <Footer />
        
        {/* Breadcrumb navigation */}
        <nav aria-label="Навигация по сайту" className="sr-only">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a itemProp="item" href="/">
                <span itemProp="name">Главная</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name">Блог</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
}
