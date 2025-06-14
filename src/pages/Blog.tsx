
import Seo from "@/components/Seo";
import BlogLayout from "@/components/blog/BlogLayout";
import { getBlogSeoData } from "@/components/blog/BlogSEO";

export default function Blog() {
  const seoData = getBlogSeoData();

  return (
    <>
      <Seo {...seoData} />
      <BlogLayout />
    </>
  );
}
