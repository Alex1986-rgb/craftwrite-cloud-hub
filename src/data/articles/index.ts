
import { localizationContentArticle } from './localization-content';
import { b2bContentStrategyArticle } from './b2b-content-strategy';
import { seoCopywritingGuideArticle } from './seo-copywriting-guide';
import { emailMarketingGuideArticle } from './email-marketing-guide';
import { socialMediaCopywritingArticle } from './social-media-copywriting';
import { contentStrategyBusinessArticle } from './content-strategy-business';

// Transform articles to have consistent author object structure
const transformArticle = (article: any) => ({
  ...article,
  author: typeof article.author === 'string' 
    ? {
        name: article.author,
        avatar: '/placeholder.svg',
        bio: 'Эксперт по копирайтингу с многолетним опытом работы в сфере цифрового маркетинга'
      }
    : article.author
});

export const missingArticles = [
  localizationContentArticle,
  b2bContentStrategyArticle,
  seoCopywritingGuideArticle,
  emailMarketingGuideArticle,
  socialMediaCopywritingArticle,
  contentStrategyBusinessArticle
].map(transformArticle);
