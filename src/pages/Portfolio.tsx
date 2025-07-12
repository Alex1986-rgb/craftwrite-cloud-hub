
import { useState } from "react";
import ModernPortfolioHero from "@/components/portfolio/ModernPortfolioHero";
import CompactFilters from "@/components/portfolio/CompactFilters";
import ModernProjectCard from "@/components/portfolio/ModernProjectCard";
import ProjectModal from "@/components/portfolio/ProjectModal";
import FeaturedProjects from "@/components/portfolio/FeaturedProjects";
import PortfolioCTASection from "@/components/portfolio/PortfolioCTASection";
import { portfolioProjects, portfolioCategories } from "@/data/portfolioProjects";

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProject, setSelectedProject] = useState<typeof portfolioProjects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Фильтруем проекты
  const filteredProjects = portfolioProjects.filter(project => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleViewDetails = (projectId: number) => {
    const project = portfolioProjects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <main className="min-h-screen bg-white">
      <ModernPortfolioHero 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <div className="container mx-auto px-4">
        <CompactFilters
          categories={portfolioCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        
        {/* All Projects Grid */}
        <section className="py-8">
          {filteredProjects.length > 0 && (
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                {searchQuery || selectedCategory !== "all" ? "Результаты поиска" : "Все проекты"}
              </h2>
              <p className="text-lg text-slate-600">
                {filteredProjects.length} проектов
              </p>
            </div>
          )}

          {filteredProjects.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 lg:grid-cols-2'
            }`}>
              {filteredProjects.map((project) => (
                <ModernProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  category={project.category}
                  description={project.description}
                  metrics={project.metrics}
                  tags={project.tags}
                  featured={project.featured}
                  image="photo-1498050108023-c5249f4df085"
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Ничего не найдено</h3>
              <p className="text-lg text-slate-600 mb-8">
                Попробуйте изменить поисковый запрос или выбрать другую категорию
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </section>
        
        <PortfolioCTASection />
      </div>
      
      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </main>
  );
}
