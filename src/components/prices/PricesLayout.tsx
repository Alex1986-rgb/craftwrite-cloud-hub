
import PricesContent from "./PricesContent";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function PricesLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PricesContent />
      <Footer />
    </div>
  );
}
