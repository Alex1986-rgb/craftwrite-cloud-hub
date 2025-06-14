
import { useState } from "react";
import { portfolioProjects, portfolioCategories } from "@/data/portfolioProjects";
import Seo from "@/components/Seo";
import { SEO_CONFIG, generateBreadcrumbStructuredData } from "@/utils/seoConfig";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioFilters from "@/components/portfolio/PortfolioFilters";
import FeaturedProjects from "@/components/portfolio/FeaturedProjects";
import AllProjects from "@/components/portfolio/AllProjects";
import PortfolioCTASection from "@/components/portfolio/PortfolioCTASection";

const seoData = {
  title: "Портфолио копирайтинг проектов | CopyPro Cloud - Примеры работ",
  description: "Изучите наши лучшие копирайтинг проекты: SEO-статьи, лендинги, описания товаров, контент для соцсетей. Реальные кейсы с результатами. Более 500 успешных проектов.",
  keywords: "портфолио копирайтинг, примеры seo текстов, кейсы лендингов, образцы описаний товаров, примеры работ копирайтера, копирайтинг проекты",
  canonicalUrl: `${SEO_CONFIG.baseUrl}/portfolio`,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Портфолио копирайтинг проектов",
    description: "Коллекция выполненных проектов в области копирайтинга и контент-маркетинга",
    url: `${SEO_CONFIG.baseUrl}/portfolio`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: portfolioProjects.length,
      itemListElement: portfolioProjects.slice(0, 12).map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          creator: {
            "@type": "Organization",
            name: SEO_CONFIG.siteName
          },
          genre: project.category,
          keywords: project.tags?.join(", ")
        }
      }))
    },
    breadcrumb: generateBreadcrumbStructuredData([
      { name: "Главная", url: "/" },
      { name: "Портфолио", url: "/portfolio" }
    ])
  }
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = portfolioProjects.filter(project => {
    const categoryMatch = activeCategory === "all" || project.category === activeCategory;
    const searchMatch = !searchQuery || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const featuredProjects = portfolioProjects.filter(project => project.featured);

  return (
    <>
      <Seo {...seoData} />
      <main role="main" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <PortfolioHero 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          
          <PortfolioFilters
            categories={portfolioCategories}
            selectedCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {featuredProjects.length > 0 && (
            <section aria-label="Избранные проекты">
              <FeaturedProjects projects={featuredProjects} />
            </section>
          )}

          <section aria-label="Все проекты портфолио">
            <AllProjects projects={filteredProjects} />
          </section>

          <PortfolioCTASection />
        </div>
      </main>
    </>
  );
}
