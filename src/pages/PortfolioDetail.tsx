
import { useParams } from "react-router-dom";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PortfolioDetailLayout from "@/components/portfolio/PortfolioDetailLayout";
import NotFoundPortfolio from "@/components/portfolio/NotFoundPortfolio";
import { portfolioDetails } from "@/data/portfolioDetails";

export default function PortfolioDetail() {
  const { id } = useParams();
  const projectId = id ? parseInt(id, 10) : null;
  const project = projectId && projectId in portfolioDetails ? portfolioDetails[projectId as keyof typeof portfolioDetails] : null;

  if (!project) {
    return (
      <>
        <Header />
        <NotFoundPortfolio />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <PortfolioDetailLayout project={project} />
      <Footer />
    </>
  );
}
