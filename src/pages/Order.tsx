
import { useState } from "react";
import { SERVICES } from "@/data/services";
import Seo from "@/components/Seo";
import { SEO_CONFIG, generateBreadcrumbStructuredData } from "@/utils/seoConfig";
import OrderPageLayout from "@/components/order/OrderPageLayout";
import OrderCatalogView from "@/components/order/OrderCatalogView";
import OrderFormView from "@/components/order/OrderFormView";

const seoData = {
  title: "Заказать тексты онлайн | CopyPro Cloud - Быстро и качественно",
  description: "Заказать профессиональные тексты любого формата: SEO-статьи, лендинги, описания товаров, контент для соцсетей. Более 10 000 довольных клиентов. Гарантия качества 14 дней.",
  keywords: "заказать тексты, копирайтинг услуги, seo статьи заказать, продающие тексты, контент для сайта заказать, лендинг тексты",
  canonicalUrl: `${SEO_CONFIG.baseUrl}/order`,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Заказ текстов",
    description: "Профессиональные копирайтинг услуги онлайн",
    url: `${SEO_CONFIG.baseUrl}/order`,
    inLanguage: "ru",
    isPartOf: {
      "@type": "WebSite",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.baseUrl
    },
    breadcrumb: generateBreadcrumbStructuredData([
      { name: "Главная", url: "/" },
      { name: "Заказать тексты", url: "/order" }
    ]),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: SERVICES.length,
      itemListElement: SERVICES.slice(0, 5).map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.name,
          description: service.desc,
          provider: {
            "@type": "Organization",
            name: SEO_CONFIG.siteName,
            url: SEO_CONFIG.baseUrl
          },
          offers: {
            "@type": "Offer",
            price: service.price.min,
            priceCurrency: "RUB",
            availability: "https://schema.org/InStock"
          },
          category: service.category,
          serviceType: "Copywriting"
        }
      }))
    }
  }
};

export default function Order() {
  const [showServiceCatalog, setShowServiceCatalog] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [popularity, setPopularity] = useState("all");

  const handleQuickOrder = () => {
    setShowServiceCatalog(false);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setCategory("all");
    setDifficulty("all");
    setPriceRange("all");
    setPopularity("all");
  };

  const handleServiceSelect = (serviceName: string) => {
    setShowServiceCatalog(false);
  };

  const handleLearnMore = (serviceSlug: string) => {
    window.open(`/service/${serviceSlug}`, '_blank');
  };

  return (
    <>
      <Seo {...seoData} />
      <OrderPageLayout>
        {showServiceCatalog ? (
          <OrderCatalogView
            services={SERVICES}
            searchQuery={searchQuery}
            category={category}
            difficulty={difficulty}
            priceRange={priceRange}
            popularity={popularity}
            onSearchChange={setSearchQuery}
            onCategoryChange={setCategory}
            onDifficultyChange={setDifficulty}
            onPriceRangeChange={setPriceRange}
            onPopularityChange={setPopularity}
            onClearFilters={handleClearFilters}
            onQuickOrder={handleQuickOrder}
            onServiceSelect={handleServiceSelect}
            onLearnMore={handleLearnMore}
          />
        ) : (
          <OrderFormView onBackToCatalog={() => setShowServiceCatalog(true)} />
        )}
      </OrderPageLayout>
    </>
  );
}
