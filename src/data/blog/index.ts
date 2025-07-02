
import { BlogPost } from './types';
import { copywritingPosts } from './copywriting-posts';
import { seoPosts } from './seo-posts';
import { emailMarketingPosts } from './email-marketing-posts';
import { socialMediaPosts } from './social-media-posts';
import { designPosts } from './design-posts';
import { neuromarketingPosts } from './neuromarketing-posts';
import { generatedPosts } from './generated-posts';
import { advancedCopywritingPosts } from './advanced-copywriting-posts';
import { advancedSeoPosts } from './advanced-seo-posts';
import { caseStudiesPosts } from './case-studies-posts';
import { additionalPosts } from './additional-posts';
import { expertPosts } from './expert-posts';
import { advancedWebDesignPosts } from './advanced-web-design-posts';
import { conversionOptimizationPosts } from './conversion-optimization-posts';
import { homePageArticles } from '../articles/homePageArticles';

// Convert homePageArticles to BlogPost format
const convertedHomePageArticles: BlogPost[] = homePageArticles.map((article, index) => ({
  id: 9000 + index, // Use high IDs to avoid conflicts
  title: article.title,
  excerpt: article.excerpt,
  category: "Экспертные материалы",
  author: article.author,
  date: new Date().toLocaleDateString('ru-RU'),
  readTime: article.readTime,
  image: article.image,
  featured: true,
  tags: article.tags,
  relatedPosts: [],
  content: article.content,
  slug: article.slug
}));

export const expandedBlogPosts: BlogPost[] = [
  ...copywritingPosts,
  ...advancedCopywritingPosts,
  ...seoPosts,
  ...advancedSeoPosts,
  ...emailMarketingPosts,
  ...socialMediaPosts,
  ...designPosts,
  ...neuromarketingPosts,
  ...caseStudiesPosts,
  ...generatedPosts,
  ...additionalPosts,
  ...expertPosts,
  ...advancedWebDesignPosts,
  ...conversionOptimizationPosts,
  ...convertedHomePageArticles
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export type { BlogPost };
