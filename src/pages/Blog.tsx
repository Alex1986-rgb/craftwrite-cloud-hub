
import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogCategories from "@/components/blog/BlogCategories";
import BlogFeaturedPosts from "@/components/blog/BlogFeaturedPosts";
import BlogPostGrid from "@/components/blog/BlogPostGrid";
import BlogEmptyState from "@/components/blog/BlogEmptyState";
import BlogCTA from "@/components/blog/BlogCTA";

const categories = [
  { name: "Все статьи", count: 48, color: "bg-primary" },
  { name: "SEO", count: 15, color: "bg-emerald-500" },
  { name: "Копирайтинг", count: 12, color: "bg-blue-500" },
  { name: "Контент-маркетинг", count: 10, color: "bg-purple-500" },
  { name: "Кейсы", count: 8, color: "bg-orange-500" },
  { name: "Советы", count: 6, color: "bg-cyan-500" }
];

const featuredPosts = [
  {
    id: 1,
    title: "10 секретов эффективного SEO-копирайтинга в 2024 году",
    excerpt: "Узнайте, как писать тексты, которые не только нравятся людям, но и высоко ранжируются в поисковых системах.",
    category: "SEO",
    author: "Анна Петрова",
    date: "15 мар 2024",
    readTime: "8 мин",
    image: "/placeholder.svg",
    featured: true
  },
  {
    id: 2,
    title: "Кейс: Как мы увеличили конверсию лендинга на 340%",
    excerpt: "Подробный разбор реального проекта - от постановки задачи до впечатляющих результатов.",
    category: "Кейсы",
    author: "Михаил Сидоров",
    date: "12 мар 2024",
    readTime: "12 мин",
    image: "/placeholder.svg",
    featured: true
  }
];

const regularPosts = [
  {
    id: 3,
    title: "Психология продающих текстов: как влиять на решения клиентов",
    excerpt: "Разбираем психологические триггеры и приемы, которые заставляют покупать.",
    category: "Копирайтинг",
    author: "Елена Козлова",
    date: "10 мар 2024",
    readTime: "6 мин",
    image: "/placeholder.svg",
    featured: false
  },
  {
    id: 4,
    title: "Контент-план для социальных сетей: пошаговое руководство",
    excerpt: "Создаем эффективную контент-стратегию для Instagram, Facebook и других платформ.",
    category: "Контент-маркетинг",
    author: "Дмитрий Волков",
    date: "8 мар 2024",
    readTime: "10 мин",
    image: "/placeholder.svg",
    featured: false
  },
  {
    id: 5,
    title: "Email-маркетинг 2024: тренды и лучшие практики",
    excerpt: "Что работает в email-маркетинге сегодня и как повысить открываемость писем.",
    category: "Контент-маркетинг",
    author: "Анна Петрова",
    date: "5 мар 2024",
    readTime: "7 мин",
    image: "/placeholder.svg",
    featured: false
  },
  {
    id: 6,
    title: "ТОП-10 ошибок в текстах для сайта",
    excerpt: "Разбираем самые частые ошибки, которые убивают конверсию и отпугивают клиентов.",
    category: "Советы",
    author: "Елена Козлова",
    date: "3 мар 2024",
    readTime: "5 мин",
    image: "/placeholder.svg",
    featured: false
  }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("Все статьи");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = [...featuredPosts, ...regularPosts].filter(post => {
    const matchesCategory = selectedCategory === "Все статьи" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedFeaturedPosts = selectedCategory === "Все статьи" 
    ? featuredPosts 
    : featuredPosts.filter(post => post.category === selectedCategory);

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
