
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
import SpecializedOrderPage from "./pages/SpecializedOrderPage";
import ClientNewOrder from "./components/client/ClientNewOrder";
import AIGenerator from "./pages/AIGenerator";
import TextGenerator from "./pages/TextGenerator";
import ImageGenerator from "./pages/ImageGenerator";
import VideoGenerator from "./pages/VideoGenerator";
import RewriteGenerator from "./pages/RewriteGenerator";
import CopywritingGenerator from "./pages/CopywritingGenerator";
import EmailGenerator from "./pages/EmailGenerator";
import SocialGenerator from "./pages/SocialGenerator";
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
          <Route path="ai-generator" element={<AIGenerator />} />
          <Route path="ai-generator/text" element={<TextGenerator />} />
          <Route path="ai-generator/image" element={<ImageGenerator />} />
          <Route path="ai-generator/video" element={<VideoGenerator />} />
          <Route path="ai-generator/rewrite" element={<RewriteGenerator />} />
          <Route path="ai-generator/copywriting" element={<CopywritingGenerator />} />
          <Route path="ai-generator/email" element={<EmailGenerator />} />
          <Route path="ai-generator/social" element={<SocialGenerator />} />
        </Route>

        <Route path="/admin" element={<p>Admin Layout</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
