
import { localizationContentArticle } from './localization-content';
import { b2bContentStrategyArticle } from './b2b-content-strategy';
import { seoCopywritingGuideArticle } from './seo-copywriting-guide';
import { emailMarketingGuideArticle } from './email-marketing-guide';
import { socialMediaCopywritingArticle } from './social-media-copywriting';
import { contentStrategyBusinessArticle } from './content-strategy-business';

// Интерфейс для статей должен совпадать с BlogPost
export interface ArticlePost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  relatedPosts: number[];
}

export const missingArticles: ArticlePost[] = [
  // Приводим все статьи к единому формату с правильными ID
  {
    ...localizationContentArticle,
    id: 16,
    featured: false,
    relatedPosts: [1, 4, 17]
  },
  {
    ...b2bContentStrategyArticle,
    id: 17,
    featured: false,
    relatedPosts: [1, 2, 16]
  },
  {
    ...seoCopywritingGuideArticle,
    id: 18,
    featured: false,
    relatedPosts: [4, 1, 19]
  },
  {
    ...emailMarketingGuideArticle,
    id: 19,
    featured: false,
    relatedPosts: [3, 18, 20]
  },
  {
    ...socialMediaCopywritingArticle,
    id: 20,
    featured: false,
    relatedPosts: [5, 19, 21]
  },
  {
    ...contentStrategyBusinessArticle,
    id: 21,
    featured: false,
    relatedPosts: [17, 20, 1]
  }
];
