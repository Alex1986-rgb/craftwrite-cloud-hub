
import { useState, useMemo } from "react";
import { blogPosts } from "@/data/blogPosts";
import BlogHeader from "./BlogHeader";
import BlogCategories from "./BlogCategories";
import BlogPostGrid from "./BlogPostGrid";
import BlogFeaturedPosts from "./BlogFeaturedPosts";
import BlogEmptyState from "./BlogEmptyState";

export default function BlogContent() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(blogPosts.map(post => post.category)));
    const categoriesWithCount = ["all", ...cats].map(cat => ({
      name: cat,
      count: cat === "all" ? blogPosts.length : blogPosts.filter(p => p.category === cat).length
    }));
    return categoriesWithCount;
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
            setSelectedCategory={setSelectedCategory}
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
    </>
  );
}
