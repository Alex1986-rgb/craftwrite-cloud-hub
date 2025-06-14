
import { BlogPost } from './types';

export const emailMarketingPosts: BlogPost[] = [
  {
    id: 3,
    title: "Email-маркетинг: как писать письма, которые открывают",
    excerpt: "Секреты создания email-рассылок с высоким Open Rate и Click Rate. Практические советы и примеры.",
    category: "Email-маркетинг",
    author: "Елена Смирнова",
    date: "10 мая 2024",
    readTime: "10 мин",
    image: "https://images.unsplash.com/photo-1586374579358-9d19d632b6df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tags: ["email", "рассылки", "конверсия"],
    relatedPosts: [1, 2, 4],
    content: `
      <div class="stats-box">
        <h3>📧 Email-маркетинг в цифрах</h3>
        <ul>
          <li><strong>4200%</strong> — ROI email-маркетинга ($42 на каждый $1)</li>
          <li><strong>81%</strong> компаний используют email как основной канал привлечения клиентов</li>
          <li><strong>22%</strong> — средний Open Rate в B2B сегменте</li>
          <li><strong>3.57%</strong> — средний Click Rate по всем отраслям</li>
        </ul>
      </div>

      <h2>Анатомия успешного email-письма</h2>
      
      <img src="https://images.unsplash.com/photo-1586374579358-9d19d632b6df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Email маркетинг" class="article-image">

      <p>Email-маркетинг остается одним из самых эффективных каналов цифрового маркетинга. Но в условиях переполненных почтовых ящиков создание писем, которые действительно читают, становится все сложнее.</p>

      <div class="cta-box">
        <h3>💌 Готовы создать email-рассылку, которая продает?</h3>
        <p>Используйте наши проверенные техники и увеличьте Open Rate до 40%</p>
        <p><strong>Начните создавать эффективные письма уже сегодня!</strong></p>
      </div>
    `
  }
];
