
import { BlogPost } from './types';
import { copywritingPosts } from './copywriting-posts';
import { seoPosts } from './seo-posts';
import { emailMarketingPosts } from './email-marketing-posts';
import { socialMediaPosts } from './social-media-posts';
import { designPosts } from './design-posts';
import { neuromarketingPosts } from './neuromarketing-posts';
import { generatedPosts } from './generated-posts';

export const expandedBlogPosts: BlogPost[] = [
  ...copywritingPosts,
  ...seoPosts,
  ...emailMarketingPosts,
  ...socialMediaPosts,
  ...designPosts,
  ...neuromarketingPosts,
  ...generatedPosts
];

export type { BlogPost };
