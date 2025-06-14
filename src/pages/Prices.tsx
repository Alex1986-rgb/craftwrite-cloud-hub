
import Seo from "@/components/Seo";
import PricesLayout from "@/components/prices/PricesLayout";
import { getPricesSeoData } from "@/components/prices/PricesSEO";

export default function Prices() {
  const seoData = getPricesSeoData();

  return (
    <>
      <Seo {...seoData} />
      <PricesLayout />
    </>
  );
}
