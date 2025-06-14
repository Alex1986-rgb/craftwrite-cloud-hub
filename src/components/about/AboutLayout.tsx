
import AboutContent from "./AboutContent";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function AboutLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AboutContent />
      <Footer />
    </div>
  );
}
