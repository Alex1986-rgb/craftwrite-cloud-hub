
import { useState } from "react";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import SmartFilters from "@/components/portfolio/SmartFilters";
import InteractiveProjectCard from "@/components/portfolio/InteractiveProjectCard";
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <PortfolioHero 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <div className="container mx-auto px-4 py-8 md:py-16">
        <SmartFilters
          categories={portfolioCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalProjects={portfolioProjects.length}
          filteredProjects={filteredProjects.length}
        />
        
        {/* Featured Projects для чистого состояния */}
        {searchQuery === "" && selectedCategory === "all" && (
          <FeaturedProjects projects={portfolioProjects.filter(p => p.featured)} />
        )}
        
        {/* All Projects Grid */}
        <section className="py-12">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-4 bg-gradient-to-r from-slate-900 via-primary to-purple-600 bg-clip-text text-transparent">
              {searchQuery || selectedCategory !== "all" ? "Результаты поиска" : "Все проекты"}
            </h2>
            <p className="text-xl text-slate-600 text-center max-w-2xl mx-auto">
              {filteredProjects.length === 0 
                ? "По вашему запросу ничего не найдено. Попробуйте изменить критерии поиска."
                : `Найдено ${filteredProjects.length} проектов, соответствующих вашим критериям`
              }
            </p>
          </div>

          {filteredProjects.length > 0 ? (
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 lg:grid-cols-2 gap-12'
            }`}>
              {filteredProjects.map((project, index) => (
                <div 
                  key={project.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <InteractiveProjectCard
                    id={project.id}
                    title={project.title}
                    category={project.category}
                    description={project.description}
                    metrics={project.metrics}
                    tags={project.tags}
                    featured={project.featured}
                    results={project.results}
                    image="photo-1498050108023-c5249f4df085"
                    onViewDetails={handleViewDetails}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Ничего не найдено</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Попробуйте изменить поисковый запрос или выбрать другую категорию
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
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
