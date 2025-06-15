
export interface SeoMetrics {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversionRate: number;
}

export interface CoreWebVitals {
  lcp: number;
  fid: number;
  cls: number;
}

export class SeoAnalyticsService {
  private static instance: SeoAnalyticsService;

  static getInstance(): SeoAnalyticsService {
    if (!SeoAnalyticsService.instance) {
      SeoAnalyticsService.instance = new SeoAnalyticsService();
    }
    return SeoAnalyticsService.instance;
  }

  async measureWebVitals(): Promise<CoreWebVitals> {
    try {
      const webVitals = await import('web-vitals');
      const metrics: CoreWebVitals = { lcp: 0, fid: 0, cls: 0 };
      
      return new Promise((resolve) => {
        webVitals.onLCP((metric) => {
          metrics.lcp = metric.value;
        });
        
        webVitals.onFID((metric) => {
          metrics.fid = metric.value;
        });
        
        webVitals.onCLS((metric) => {
          metrics.cls = metric.value;
          resolve(metrics);
        });
      });
    } catch (error) {
      console.warn('Web Vitals not available:', error);
      return { lcp: 0, fid: 0, cls: 0 };
    }
  }

  analyzePageSeo(element: HTMLElement) {
    const h1Elements = element.querySelectorAll('h1');
    const metaDescription = document.querySelector('meta[name="description"]');
    const imagesWithoutAlt = element.querySelectorAll('img:not([alt])');
    const internalLinks = element.querySelectorAll('a[href^="/"], a[href*="copypro-cloud"]');
    const externalLinks = element.querySelectorAll('a[href^="http"]:not([href*="copypro-cloud"])');
    
    const textContent = element.textContent || '';
    const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
    
    return {
      hasH1: h1Elements.length > 0,
      h1Count: h1Elements.length,
      hasMetaDescription: !!metaDescription,
      metaDescriptionLength: metaDescription?.getAttribute('content')?.length || 0,
      imageWithoutAlt: imagesWithoutAlt.length,
      internalLinks: internalLinks.length,
      externalLinks: externalLinks.length,
      wordCount
    };
  }
}
