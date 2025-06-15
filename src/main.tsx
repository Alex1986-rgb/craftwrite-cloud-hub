
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import PerformanceMonitor from "./components/performance/PerformanceMonitor";
import CriticalCSS from "./components/performance/CriticalCSS";
import { initializeSeo } from "./utils/advancedSeoUtils";

// Инициализация SEO при загрузке приложения
initializeSeo();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CriticalCSS />
    <PerformanceMonitor>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PerformanceMonitor>
  </StrictMode>
);
