
import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioFilters from "@/components/portfolio/PortfolioFilters";
import FeaturedProjects from "@/components/portfolio/FeaturedProjects";
import AllProjects from "@/components/portfolio/AllProjects";
import PortfolioCTASection from "@/components/portfolio/PortfolioCTASection";
import { portfolioProjects, portfolioCategories } from "@/data/portfolioProjects";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Фильтруем проекты
  const filteredProjects = portfolioProjects.filter(project => {
    const matchesCategory = activeFilter === "all" || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Получаем избранные проекты
  const featuredProjects = portfolioProjects.filter(project => project.featured);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        <PortfolioHero 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <div className="container mx-auto px-4 py-8 md:py-16">
          <PortfolioFilters
            categories={portfolioCategories}
            selectedCategory={activeFilter}
            onCategoryChange={setActiveFilter}
          />
          
          {searchQuery === "" && activeFilter === "all" && (
            <FeaturedProjects projects={featuredProjects} />
          )}
          
          <AllProjects projects={filteredProjects} />
          
          <PortfolioCTASection />
        </div>
      </main>
      <Footer />
    </>
  );
}
