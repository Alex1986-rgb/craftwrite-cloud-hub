
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/HomePage";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/ContactPage";
import Prices from "./pages/Prices";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/LoginPage";
import Register from "./pages/RegistrationPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogDetail";
import Order from "./pages/Order";
import SeoArticleOrder from "./pages/SeoArticleOrder";
import LandingOrder from "./pages/LandingPageOrder";
import EmailOrder from "./pages/EmailCampaignsOrder";
import TelegramOrder from "./pages/TelegramContentOrder";
import BotScriptsOrder from "./pages/ChatbotScriptsOrder";
import WebsiteTextsOrder from "./pages/order/WebsiteTextsOrder";
import InstagramOrder from "./pages/order/InstagramOrder";
import WildberriesOrder from "./pages/order/WildberriesOrder";
import OzonOrder from "./pages/order/OzonOrder";
import YouTubeOrder from "./pages/order/YouTubeOrder";
import LinkedInOrder from "./pages/order/LinkedInOrder";
import SpecializedOrderPage from "./pages/order/SpecializedOrderPage";
import ClientNewOrder from "./components/client/ClientNewOrder";
import BulkSeoOptimization from './pages/BulkSeoOptimization';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="prices" element={<Prices />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="order" element={<Order />} />
          <Route path="order/seo-article" element={<SeoArticleOrder />} />
          <Route path="order/bulk-seo" element={<BulkSeoOptimization />} />
          <Route path="order/landing" element={<LandingOrder />} />
          <Route path="order/email" element={<EmailOrder />} />
          <Route path="order/telegram" element={<TelegramOrder />} />
          <Route path="order/bot-scripts" element={<BotScriptsOrder />} />
          <Route path="order/website-texts" element={<WebsiteTextsOrder />} />
          <Route path="order/instagram" element={<InstagramOrder />} />
          <Route path="order/wildberries" element={<WildberriesOrder />} />
          <Route path="order/ozon" element={<OzonOrder />} />
          <Route path="order/youtube" element={<YouTubeOrder />} />
          <Route path="order/linkedin" element={<LinkedInOrder />} />
          <Route path="order/specialized/:serviceId" element={<SpecializedOrderPage />} />
          <Route path="client/new-order" element={<ClientNewOrder />} />
        </Route>

        <Route path="/admin" element={<p>Admin Layout</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
