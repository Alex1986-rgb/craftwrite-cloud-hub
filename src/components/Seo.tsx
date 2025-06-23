
import React, { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  ogImage?: string;
};

const DEFAULT_OG = "https://lovable.dev/opengraph-image-p98pqg.png";

const Seo = ({
  title,
  description,
  ogImage = DEFAULT_OG,
}: SeoProps) => {
  useEffect(() => {
    document.title = title;

    // Remove all meta we could have created earlier
    Array.from(document.querySelectorAll("meta[data-seo]")).forEach(m => m.remove());

    const setMeta = (name: string, content: string, property: boolean = false) => {
      const tag = document.createElement("meta");
      if (property) {
        tag.setAttribute("property", name);
      } else {
        tag.setAttribute("name", name);
      }
      tag.content = content;
      tag.setAttribute("data-seo", "true");
      document.head.appendChild(tag);
    };

    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("og:image", ogImage, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    return () => {
      Array.from(document.querySelectorAll("meta[data-seo]")).forEach(m => m.remove());
    };
  }, [title, description, ogImage]);
  return null;
};

export default Seo;

