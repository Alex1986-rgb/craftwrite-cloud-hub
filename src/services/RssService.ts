
export interface RssPost {
  title: string;
  description: string;
  slug: string;
  date: string;
  author?: string;
  category?: string;
  tags?: string[];
  image?: string;
}

export class RssService {
  private static instance: RssService;
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL || 'https://copypro-cloud.lovable.app';
  }

  static getInstance(): RssService {
    if (!RssService.instance) {
      RssService.instance = new RssService();
    }
    return RssService.instance;
  }

  generateRssFeed(posts: RssPost[]): string {
    const currentDate = new Date().toUTCString();

    let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CopyPro Cloud Blog - Профессиональный копирайтинг</title>
    <description>Экспертные статьи о копирайтинге, контент-маркетинге и SEO-продвижении</description>
    <link>${this.baseUrl}/blog</link>
    <language>ru-RU</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${this.baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>`;

    posts.forEach(post => {
      const postUrl = `${this.baseUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      
      rss += `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>`;
      
      if (post.author) {
        rss += `
      <author>hello@copypro-cloud.com (${post.author})</author>`;
      }
      
      if (post.category) {
        rss += `
      <category><![CDATA[${post.category}]]></category>`;
      }
      
      rss += `
    </item>`;
    });

    rss += `
  </channel>
</rss>`;

    return rss;
  }
}
