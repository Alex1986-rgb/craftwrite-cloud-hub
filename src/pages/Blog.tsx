
import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogCategories from "@/components/blog/BlogCategories";
import BlogFeaturedPosts from "@/components/blog/BlogFeaturedPosts";
import BlogPostGrid from "@/components/blog/BlogPostGrid";
import BlogEmptyState from "@/components/blog/BlogEmptyState";
import BlogCTA from "@/components/blog/BlogCTA";
import { blogPosts, categories, featuredPosts as initialFeaturedPosts } from "@/data/blogPosts";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("Все статьи");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "Все статьи" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedFeaturedPosts = selectedCategory === "Все статьи" 
    ? initialFeaturedPosts 
    : initialFeaturedPosts.filter(post => post.category === selectedCategory);

  const displayedRegularPosts = filteredPosts.filter(post => !post.featured || selectedCategory !== "Все статьи");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-slate-50/50">
        <BlogHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <BlogCategories 
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {selectedCategory === "Все статьи" && displayedFeaturedPosts.length > 0 && (
          <BlogFeaturedPosts posts={displayedFeaturedPosts} />
        )}

        {displayedRegularPosts.length > 0 ? (
          <BlogPostGrid posts={displayedRegularPosts} />
        ) : (
          <BlogEmptyState />
        )}

        <BlogCTA />
      </main>
      <Footer />
    </>
  );
}
