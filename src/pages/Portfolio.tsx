
import Seo from "@/components/Seo";
import PortfolioLayout from "@/components/portfolio/PortfolioLayout";
import { getPortfolioSeoData } from "@/components/portfolio/PortfolioSEO";

export default function Portfolio() {
  const seoData = getPortfolioSeoData();

  return (
    <>
      <Seo {...seoData} />
      <PortfolioLayout />
    </>
  );
}
