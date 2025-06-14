
import AboutHeroSection from "./AboutHeroSection";
import MissionSection from "./MissionSection";
import ValuesSection from "./ValuesSection";
import TeamExpertiseSection from "./TeamExpertiseSection";
import AchievementsSection from "./AchievementsSection";
import CompanyTimelineSection from "./CompanyTimelineSection";
import CertificationsSection from "./CertificationsSection";
import OfficeSection from "./OfficeSection";

export default function AboutContent() {
  return (
    <main 
      id="main-content"
      role="main" 
      aria-label="О компании CopyPro Cloud"
      itemProp="mainEntity"
      itemScope
      itemType="https://schema.org/Organization"
    >
      {/* Hero Section */}
      <section 
        aria-labelledby="about-hero-heading"
        role="banner"
      >
        <AboutHeroSection />
      </section>

      {/* Mission Section */}
      <section 
        aria-labelledby="mission-heading"
        role="region"
        className="py-16 md:py-24"
      >
        <MissionSection />
      </section>

      {/* Values Section */}
      <section 
        aria-labelledby="values-heading"
        role="region"
        className="py-16 md:py-24"
      >
        <ValuesSection />
      </section>

      {/* Team Section */}
      <section 
        aria-labelledby="team-expertise-heading"
        role="region"
        className="py-16 md:py-24"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <TeamExpertiseSection />
      </section>

      {/* Timeline Section */}
      <section 
        aria-labelledby="timeline-heading"
        role="region"
        className="py-16 md:py-24"
      >
        <CompanyTimelineSection />
      </section>

      {/* Achievements Section */}
      <section 
        aria-labelledby="achievements-heading"
        role="region"
        className="py-16 md:py-24"
      >
        <AchievementsSection />
      </section>

      {/* Certifications Section */}
      <section 
        aria-labelledby="certifications-heading"
        role="region"
        className="py-16 md:py-24"
      >
        <CertificationsSection />
      </section>

      {/* Office Section */}
      <section 
        aria-labelledby="office-heading"
        role="region"
        className="py-16 md:py-24"
      >
        <OfficeSection />
      </section>
    </main>
  );
}
