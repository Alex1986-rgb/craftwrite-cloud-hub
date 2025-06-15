
export class ImageOptimizationService {
  private static instance: ImageOptimizationService;

  static getInstance(): ImageOptimizationService {
    if (!ImageOptimizationService.instance) {
      ImageOptimizationService.instance = new ImageOptimizationService();
    }
    return ImageOptimizationService.instance;
  }

  optimizeImageForSeo(src: string, alt: string, title?: string): Record<string, string> {
    return {
      src,
      alt,
      title: title || alt,
      loading: 'lazy',
      decoding: 'async',
      itemProp: 'image',
      'data-seo-optimized': 'true'
    };
  }

  generateAltFromFilename(src: string): string {
    const filename = src.split('/').pop()?.split('.')[0] || '';
    return filename
      .replace(/[-_]/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, l => l.toUpperCase())
      .trim();
  }

  initializeAutoAltGeneration(): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const images = element.querySelectorAll('img:not([alt])');
            images.forEach((img: Element) => {
              const htmlImg = img as HTMLImageElement;
              const alt = this.generateAltFromFilename(htmlImg.src);
              htmlImg.alt = alt;
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}
