
import { useState, useMemo } from "react";
import { portfolioProjects } from "@/data/portfolioProjects";
import PortfolioFilters from "./PortfolioFilters";
import FeaturedProjects from "./FeaturedProjects";
import AllProjects from "./AllProjects";

export default function PortfolioContent() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(portfolioProjects.map(project => project.category)));
    const categoriesWithCount = ["all", ...cats].map(cat => ({
      name: cat,
      count: cat === "all" ? portfolioProjects.length : portfolioProjects.filter(p => p.category === cat).length
    }));
    return categoriesWithCount;
  }, []);

  const industries = useMemo(() => {
    const inds = Array.from(new Set(portfolioProjects.map(project => project.category)));
    const industriesWithCount = ["all", ...inds].map(ind => ({
      name: ind,
      count: ind === "all" ? portfolioProjects.length : portfolioProjects.filter(p => p.category === ind).length
    }));
    return industriesWithCount;
  }, []);

  const filteredProjects = useMemo(() => {
    return portfolioProjects.filter(project => {
      const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
      const matchesIndustry = selectedIndustry === "all" || project.category === selectedIndustry;
      const matchesSearch = !searchQuery || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesIndustry && matchesSearch;
    });
  }, [selectedCategory, selectedIndustry, searchQuery]);

  const featuredProjects = useMemo(() => {
    return portfolioProjects.filter(project => project.featured).slice(0, 3);
  }, []);

  return (
    <>
      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section 
          aria-labelledby="featured-projects-heading"
          role="region"
          className="py-16 md:py-24"
        >
          <div className="container mx-auto px-4">
            <header className="text-center mb-12">
              <h2 
                id="featured-projects-heading"
                className="text-2xl md:text-3xl font-bold mb-4"
              >
                Рекомендуемые проекты
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Наши лучшие работы, которые принесли максимальный результат клиентам
              </p>
            </header>
            <FeaturedProjects projects={featuredProjects} />
          </div>
        </section>
      )}

      {/* Filters */}
      <section 
        aria-labelledby="filters-heading"
        role="region"
        className="py-8 bg-slate-50"
      >
        <div className="container mx-auto px-4">
          <PortfolioFilters
            categories={categories}
            industries={industries}
            selectedCategory={selectedCategory}
            selectedIndustry={selectedIndustry}
            searchQuery={searchQuery}
            onCategoryChange={setSelectedCategory}
            onIndustryChange={setSelectedIndustry}
            onSearchChange={setSearchQuery}
            totalProjects={portfolioProjects.length}
            filteredCount={filteredProjects.length}
          />
        </div>
      </section>

      {/* All Projects */}
      <section 
        aria-labelledby="all-projects-heading"
        role="region"
        className="py-16 md:py-24"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="container mx-auto px-4">
          <div className="sr-only" aria-live="polite">
            Найдено {filteredProjects.length} проектов из {portfolioProjects.length}
          </div>
          
          <AllProjects 
            projects={filteredProjects}
          />
        </div>
      </section>
    </>
  );
}
