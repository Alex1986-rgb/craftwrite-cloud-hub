import React, { useEffect } from 'react';

interface SocialMetaOptions {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: string;
}

export function useSocialMeta({
  title,
  description,
  image,
  url,
  type = 'website'
}: SocialMetaOptions) {
  useEffect(() => {
    // Remove previous social meta tags
    Array.from(document.querySelectorAll("meta[data-social-meta]")).forEach(m => m.remove());

    const setMeta = (name: string, content: string, property: boolean = false) => {
      const tag = document.createElement("meta");
      if (property) {
        tag.setAttribute("property", name);
      } else {
        tag.setAttribute("name", name);
      }
      tag.content = content;
      tag.setAttribute("data-social-meta", "true");
      document.head.appendChild(tag);
    };

    // Open Graph tags
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", type, true);
    setMeta("og:url", url, true);
    setMeta("og:image", image, true);
    setMeta("og:site_name", "CopyPro Cloud", true);

    // Twitter Card tags
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);

    return () => {
      Array.from(document.querySelectorAll("meta[data-social-meta]")).forEach(m => m.remove());
    };
  }, [title, description, image, url, type]);
}
