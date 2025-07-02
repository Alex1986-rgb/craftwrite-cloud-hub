
/// <reference types="vite/client" />

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: any) => void;
    ym?: (id: number, action: string, params?: any) => void;
    dataLayer?: any[];
  }
}

export {};
