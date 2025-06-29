
import { BlogPost } from './types';

export const seoPosts: BlogPost[] = [
  {
    id: 2,
    title: "SEO-тексты, которые ранжируются: секреты успеха",
    excerpt: "Изучите современные техники создания SEO-контента, который нравится как поисковикам, так и пользователям.",
    category: "SEO",
    author: "Дмитрий Новиков",
    date: "12 мая 2024",
    readTime: "12 мин",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tags: ["SEO", "контент", "ранжирование"],
    relatedPosts: [1, 3, 5],
    content: `
      <div class="stats-box">
        <h3>📈 SEO статистика 2024</h3>
        <ul>
          <li><strong>68%</strong> всех онлайн-активностей начинается с поисковых запросов</li>
          <li><strong>75%</strong> пользователей никогда не переходят на вторую страницу результатов</li>
          <li><strong>53%</strong> мобильных пользователей покидают сайт, если он загружается дольше 3 секунд</li>
          <li><strong>200%</strong> — средний рост трафика при правильной SEO-оптимизации</li>
        </ul>
      </div>

      <h2>Современный подход к SEO-копирайтингу</h2>
      
      <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="SEO оптимизация контента" class="article-image">

      <p>SEO-копирайтинг в 2024 году кардинально отличается от примитивного набивания ключевых слов. Современные алгоритмы поисковых систем фокусируются на пользовательском опыте, релевантности и качестве контента.</p>

      <div class="cta-box">
        <h3>📈 Хотите попасть в ТОП Google и Яндекс?</h3>
        <p>Создайте SEO-тексты, которые действительно ранжируются и приводят клиентов</p>
        <p><strong>Начните применять эти техники уже сегодня!</strong></p>
      </div>
    `
  }
];
