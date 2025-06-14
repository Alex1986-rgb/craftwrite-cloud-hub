
import { useState, useMemo } from "react";
import { portfolioProjects } from "@/data/portfolioProjects";
import Seo from "@/components/Seo";
import { SEO_CONFIG, generateWebPageStructuredData, generateBreadcrumbStructuredData } from "@/utils/seoConfig";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioFilters from "@/components/portfolio/PortfolioFilters";
import FeaturedProjects from "@/components/portfolio/FeaturedProjects";
import AllProjects from "@/components/portfolio/AllProjects";
import PortfolioCTASection from "@/components/portfolio/PortfolioCTASection";

const seoData = {
  title: "Портфолио CopyPro Cloud | Примеры работ и кейсы копирайтинга",
  description: "Посмотрите на результаты работы CopyPro Cloud: успешные кейсы, примеры SEO-статей, лендингов и коммерческих текстов. Более 500 реализованных проектов.",
  keywords: "портфолио копирайтер, примеры работ, кейсы копирайтинга, seo статьи примеры, лендинги портфолио, коммерческие тексты",
  canonicalUrl: `${SEO_CONFIG.baseUrl}/portfolio`,
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      generateWebPageStructuredData({
        title: "Портфолио CopyPro Cloud",
        description: "Примеры работ и успешные кейсы копирайтинга",
        url: "/portfolio",
        about: "Portfolio",
        keywords: "портфолио, примеры работ, кейсы",
        mainEntity: {
          "@type": "CollectionPage",
          name: "Портфолио проектов",
          description: "Коллекция успешных копирайтинг проектов"
        }
      }),
      generateBreadcrumbStructuredData([
        { name: "Главная", url: "/" },
        { name: "Портфолио", url: "/portfolio" }
      ]),
      {
        "@type": "CollectionPage",
        "name": "Портфолио CopyPro Cloud",
        "description": "Примеры успешных копирайтинг проектов и кейсы",
        "url": `${SEO_CONFIG.baseUrl}/portfolio`,
        "inLanguage": "ru",
        "mainEntity": {
          "@type": "ItemList",
          "name": "Проекты портфолио",
          "numberOfItems": portfolioProjects.length,
          "itemListElement": portfolioProjects.slice(0, 12).map((project, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "CreativeWork",
              "name": project.title,
              "description": project.description,
              "url": `${SEO_CONFIG.baseUrl}/portfolio/${project.id}`,
              "creator": {
                "@type": "Organization",
                "name": SEO_CONFIG.siteName
              },
              "genre": project.category,
              "keywords": project.tags.join(", "),
              "hasPart": Object.entries(project.metrics).map(([key, value]) => ({
                "@type": "QuantitativeValue",
                "name": key,
                "value": value
              }))
            }
          }))
        },
        "author": {
          "@type": "Organization",
          "name": SEO_CONFIG.siteName,
          "url": SEO_CONFIG.baseUrl
        }
      },
      {
        "@type": "WebSite",
        "name": SEO_CONFIG.siteName,
        "url": SEO_CONFIG.baseUrl,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${SEO_CONFIG.baseUrl}/portfolio?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  }
};

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(portfolioProjects.map(project => project.category)));
    return ["all", ...cats];
  }, []);

  const industries = useMemo(() => {
    const inds = Array.from(new Set(portfolioProjects.map(project => project.category))); // Using category as industry since industry doesn't exist
    return ["all", ...inds];
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
      <Seo {...seoData} />
      
      <div className="min-h-screen bg-white" itemScope itemType="https://schema.org/CollectionPage">
        {/* Skip to content link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-50"
        >
          Перейти к основному содержанию
        </a>
        
        <Header />
        
        <main 
          id="main-content"
          role="main" 
          aria-label="Портфолио CopyPro Cloud"
          itemProp="mainEntity"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          {/* Hero Section */}
          <section 
            aria-labelledby="portfolio-hero-heading"
            role="banner"
          >
            <PortfolioHero 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </section>

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

          {/* CTA Section */}
          <section 
            aria-labelledby="portfolio-cta-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <PortfolioCTASection />
          </section>
        </main>

        <Footer />
        
        {/* Breadcrumb navigation */}
        <nav aria-label="Навигация по сайту" className="sr-only">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a itemProp="item" href="/">
                <span itemProp="name">Главная</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name">Портфолио</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
}
