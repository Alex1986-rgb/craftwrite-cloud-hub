
import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioFilters from "@/components/portfolio/PortfolioFilters";
import FeaturedProjects from "@/components/portfolio/FeaturedProjects";
import AllProjects from "@/components/portfolio/AllProjects";
import PortfolioCTASection from "@/components/portfolio/PortfolioCTASection";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
          
          {searchQuery === "" && activeFilter === "all" && (
            <FeaturedProjects />
          )}
          
          <AllProjects 
            filter={activeFilter}
            searchQuery={searchQuery}
          />
          
          <PortfolioCTASection />
        </div>
      </main>
      <Footer />
    </>
  );
}
