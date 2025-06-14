
import { memo } from "react";
import { Helmet } from "react-helmet-async";

interface OrderPagePerformanceProps {
  children: React.ReactNode;
}

const OrderPagePerformance = memo(function OrderPagePerformance({ children }: OrderPagePerformanceProps) {
  return (
    <>
      <Helmet>
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Critical CSS inline for above-the-fold content */}
        <style>{`
          .hero-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .animate-fade-in {
            animation: fadeIn 0.6s ease-out forwards;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        
        {/* Resource hints for better performance */}
        <link rel="prefetch" href="/api/services" />
        <link rel="prefetch" href="/api/pricing" />
        
        {/* Optimize rendering */}
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#667eea" />
        
        {/* Performance monitoring */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "CopyPro Cloud",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://copypro.cloud/order?search={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>
      
      {/* Performance observer for Core Web Vitals */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if ('PerformanceObserver' in window) {
              const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  if (entry.entryType === 'largest-contentful-paint') {
                    console.log('LCP:', entry.startTime);
                  }
                  if (entry.entryType === 'first-input') {
                    console.log('FID:', entry.processingStart - entry.startTime);
                  }
                  if (entry.entryType === 'layout-shift') {
                    if (!entry.hadRecentInput) {
                      console.log('CLS:', entry.value);
                    }
                  }
                }
              });
              
              observer.observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
            }
          `
        }}
      />
      
      {children}
    </>
  );
});

export default OrderPagePerformance;
