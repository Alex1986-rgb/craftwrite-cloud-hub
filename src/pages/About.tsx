
import Seo from "@/components/Seo";
import AboutLayout from "@/components/about/AboutLayout";
import { getAboutSeoData } from "@/components/about/AboutSEO";

export default function About() {
  const seoData = getAboutSeoData();

  return (
    <>
      <Seo {...seoData} />
      <AboutLayout />
    </>
  );
}
