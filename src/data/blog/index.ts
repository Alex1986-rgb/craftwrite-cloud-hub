
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
  ...expertPosts
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export type { BlogPost };
