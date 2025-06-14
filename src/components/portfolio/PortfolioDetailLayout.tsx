
import SmartNavigation from "@/components/portfolio/SmartNavigation";
import ModernProjectHero from "@/components/portfolio/ModernProjectHero";
import OptimizedProjectMetrics from "@/components/portfolio/OptimizedProjectMetrics";
import ProjectTextExamples from "@/components/portfolio/ProjectTextExamples";
import ProjectDetails from "@/components/portfolio/ProjectDetails";
import ProjectResults from "@/components/portfolio/ProjectResults";
import ProjectTechnologies from "@/components/portfolio/ProjectTechnologies";
import ProjectTestimonial from "@/components/portfolio/ProjectTestimonial";
import MinimalProjectCTA from "@/components/portfolio/MinimalProjectCTA";
import { PortfolioProject } from "@/data/portfolioDetails";

type PortfolioDetailLayoutProps = {
  project: PortfolioProject;
};

export default function PortfolioDetailLayout({ project }: PortfolioDetailLayoutProps) {
  return (
    <>
      <SmartNavigation />
      <main className="min-h-screen bg-white">
        <ModernProjectHero project={project} />
        <OptimizedProjectMetrics metrics={project.metrics} />
        <ProjectTextExamples />
        <ProjectDetails challenge={project.challenge} solution={project.solution} />
        <ProjectResults results={project.results} />
        <ProjectTechnologies technologies={project.technologies} />
        <ProjectTestimonial testimonial={project.testimonial} />
        <MinimalProjectCTA />
      </main>
    </>
  );
}
