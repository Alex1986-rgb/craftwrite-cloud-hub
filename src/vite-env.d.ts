
/// <reference types="vite/client" />

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: any) => void;
    dataLayer?: any[];
    ym?: (id: number, action: string, params?: any) => void;
  }
}

export {};
