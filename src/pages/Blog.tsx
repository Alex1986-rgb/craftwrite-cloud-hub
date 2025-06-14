import { useState } from "react";
import { blogPosts } from "@/data/blogPosts";
import { missingArticles } from "@/data/articles";
import { expandedBlogPosts } from "@/data/blog";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogCategories from "@/components/blog/BlogCategories";
import BlogPostGrid from "@/components/blog/BlogPostGrid";
import BlogFeaturedPosts from "@/components/blog/BlogFeaturedPosts";
import BlogEmptyState from "@/components/blog/BlogEmptyState";
import BlogCTA from "@/components/blog/BlogCTA";

// Combine all posts
const allPosts = [...blogPosts, ...missingArticles, ...expandedBlogPosts];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique categories with counts
  const uniqueCategories = ["all", ...new Set(allPosts.map(post => post.category))];
  const categories = uniqueCategories.map(cat => ({
    name: cat,
    count: cat === "all" ? allPosts.length : allPosts.filter(post => post.category === cat).length,
    color: "blue"
  }));

  // Filter posts
  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get featured posts (first 3 from all posts)
  const featuredPosts = allPosts.slice(0, 3);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <BlogHeader 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          
          {searchQuery === "" && selectedCategory === "all" && (
            <BlogFeaturedPosts posts={featuredPosts} />
          )}
          
          <BlogCategories
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {filteredPosts.length > 0 ? (
            <BlogPostGrid posts={filteredPosts} />
          ) : (
            <BlogEmptyState 
              onReset={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
            />
          )}
          
          <BlogCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
