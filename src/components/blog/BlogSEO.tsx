
import { blogPosts } from "@/data/blogPosts";
import { SEO_CONFIG, generateWebPageStructuredData, generateBreadcrumbStructuredData } from "@/utils/seoConfig";

export const getBlogSeoData = () => ({
  title: "Блог о копирайтинге | CopyPro Cloud - Советы экспертов и кейсы",
  description: "Профессиональные статьи о копирайтинге, SEO-оптимизации, контент-маркетинге и продающих текстах. Практические советы от экспертов CopyPro Cloud.",
  keywords: "блог копирайтинга, seo статьи, контент маркетинг, продающие тексты, советы копирайтера, кейсы копирайтинга",
  canonicalUrl: `${SEO_CONFIG.baseUrl}/blog`,
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      generateWebPageStructuredData({
        title: "Блог CopyPro Cloud",
        description: "Экспертные статьи о копирайтинге и контент-маркетинге",
        url: "/blog",
        about: "Copywriting Blog",
        keywords: "блог, копирайтинг, контент маркетинг",
        mainEntity: {
          "@type": "Blog",
          name: "Блог CopyPro Cloud",
          description: "Профессиональные статьи о копирайтинге",
          publisher: {
            "@type": "Organization",
            name: SEO_CONFIG.siteName
          }
        }
      }),
      generateBreadcrumbStructuredData([
        { name: "Главная", url: "/" },
        { name: "Блог", url: "/blog" }
      ]),
      {
        "@type": "Blog",
        "name": "Блог CopyPro Cloud",
        "description": "Экспертные материалы о копирайтинге и контент-маркетинге",
        "url": `${SEO_CONFIG.baseUrl}/blog`,
        "inLanguage": "ru",
        "publisher": {
          "@type": "Organization",
          "name": SEO_CONFIG.siteName,
          "logo": {
            "@type": "ImageObject",
            "url": SEO_CONFIG.organization.logo
          }
        },
        "blogPost": blogPosts.slice(0, 10).map(post => ({
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "url": `${SEO_CONFIG.baseUrl}/blog/${post.id}`,
          "datePublished": post.date,
          "dateModified": post.date,
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "image": post.image,
          "articleSection": post.category,
          "keywords": post.tags.join(", "),
          "wordCount": parseInt(post.readTime) * 250
        }))
      },
      {
        "@type": "ItemList",
        "name": "Статьи блога",
        "numberOfItems": blogPosts.length,
        "itemListElement": blogPosts.slice(0, 20).map((post, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "BlogPosting",
            "name": post.title,
            "url": `${SEO_CONFIG.baseUrl}/blog/${post.id}`
          }
        }))
      }
    ]
  }
});
