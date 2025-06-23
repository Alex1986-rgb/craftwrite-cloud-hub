import React, { useEffect } from 'react';

interface SeoMetaOptions {
  title: string;
  description: string;
  keywords?: string;
  robots?: string;
  canonical?: string;
}

export function useSeoMeta({
  title,
  description,
  keywords,
  robots = 'index,follow',
  canonical
}: SeoMetaOptions) {
  useEffect(() => {
    document.title = title;

    // Remove previous SEO meta tags
    Array.from(document.querySelectorAll("meta[data-seo-meta]")).forEach(m => m.remove());
    Array.from(document.querySelectorAll("link[data-seo-meta]")).forEach(l => l.remove());

    const setMeta = (name: string, content: string, property: boolean = false) => {
      const tag = document.createElement("meta");
      if (property) {
        tag.setAttribute("property", name);
      } else {
        tag.setAttribute("name", name);
      }
      tag.content = content;
      tag.setAttribute("data-seo-meta", "true");
      document.head.appendChild(tag);
    };

    const setLink = (rel: string, href: string) => {
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      link.setAttribute("data-seo-meta", "true");
      document.head.appendChild(link);
    };

    // Basic meta tags
    setMeta("description", description);
    setMeta("robots", robots);
    
    if (keywords) {
      setMeta("keywords", keywords);
    }

    if (canonical) {
      setLink("canonical", canonical);
    }

    return () => {
      Array.from(document.querySelectorAll("meta[data-seo-meta]")).forEach(m => m.remove());
      Array.from(document.querySelectorAll("link[data-seo-meta]")).forEach(l => l.remove());
    };
  }, [title, description, keywords, robots, canonical]);
}
