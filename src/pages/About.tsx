
import AboutHeroSection from "@/components/about/AboutHeroSection";
import MissionSection from "@/components/about/MissionSection";
import TeamExpertiseSection from "@/components/about/TeamExpertiseSection";
import CompanyTimelineSection from "@/components/about/CompanyTimelineSection";
import ValuesSection from "@/components/about/ValuesSection";
import AchievementsSection from "@/components/about/AchievementsSection";
import CertificationsSection from "@/components/about/CertificationsSection";
import OfficeSection from "@/components/about/OfficeSection";

export default function About() {
  return (
    <main className="relative overflow-hidden">
      <AboutHeroSection />
      <MissionSection />
      <TeamExpertiseSection />
      <CompanyTimelineSection />
      <ValuesSection />
      <AchievementsSection />
      <CertificationsSection />
      <OfficeSection />
    </main>
  );
}
