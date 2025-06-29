
import { BlogPost } from './types';

export const designPosts: BlogPost[] = [
  {
    id: 6,
    title: "Психология цвета в веб-дизайне и тексте",
    excerpt: "Как цвета влияют на восприятие текста и конверсию. Научные исследования и практические рекомендации.",
    category: "Веб-дизайн",
    author: "Алексей Белов",
    date: "3 мая 2024",
    readTime: "9 мин",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tags: ["психология", "цвет", "дизайн", "конверсия"],
    relatedPosts: [4, 5, 7],
    content: `
      <div class="stats-box">
        <h3>🎨 Влияние цвета на поведение</h3>
        <ul>
          <li><strong>85%</strong> покупателей называют цвет основной причиной покупки</li>
          <li><strong>200%</strong> улучшение узнаваемости бренда при правильном использовании цвета</li>
          <li><strong>80%</strong> увеличение читабельности при оптимальном цветовом контрасте</li>
          <li><strong>42%</strong> пользователей формируют мнение о сайте основываясь на дизайне</li>
        </ul>
      </div>

      <h2>Основы психологии цвета</h2>
      
      <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Психология цвета" class="article-image">

      <p>Цвет воздействует на наше подсознание и влияет на принятие решений. В веб-дизайне и копирайтинге понимание психологии цвета может кардинально изменить эффективность проекта.</p>

      <div class="cta-box">
        <h3>🎨 Хотите увеличить конверсию с помощью цвета?</h3>
        <p>Создайте дизайн, который психологически мотивирует к покупке</p>
        <p><strong>Применяйте эти знания прямо сейчас!</strong></p>
      </div>
    `
  }
];
