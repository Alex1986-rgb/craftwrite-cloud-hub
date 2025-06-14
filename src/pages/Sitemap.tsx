
import Seo from "@/components/Seo";
import SitemapLayout from "@/components/sitemap/SitemapLayout";
import { getSitemapSeoData } from "@/components/sitemap/SitemapSEO";

export default function Sitemap() {
  const seoData = getSitemapSeoData();

  return (
    <>
      <Seo {...seoData} />
      <SitemapLayout />
    </>
  );
}
