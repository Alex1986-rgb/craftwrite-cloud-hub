
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";

const seoText = `
Блог CopyPro Cloud — свежие статьи о копирайтинге, SEO, маркетинге и бизнесе онлайн.
Секреты эффективных текстов, аналитика, новые форматы, разбор ошибок и рекомендации для развития бизнеса через контент.

Что вы найдёте в нашем блоге:
- Инструкции и советы по заказу и проверке текстов.
- Реальные истории клиентов и примеры работ.
- Разбор актуальных трендов рынка копирайтинга.
- Лайфхаки для SEO-продвижения и повышения конверсии.

Читайте наш блог и внедряйте лучшее в свои проекты!
`;

const blogPosts = [
  {
    title: "5 причин доверять контент профессионалам",
    desc: "Почему качественный текст критически важен для вашего бизнеса?",
    date: "05.2024",
  },
  {
    title: "Как заказать SEO-статью и не ошибиться",
    desc: "Главные советы по брифу, поиску исполнителя и проверке результата.",
    date: "04.2024",
  },
  {
    title: "Роль уникальности текста в SEO",
    desc: "Объясняем, почему уникальность — это не просто процент по сервису проверки.",
    date: "03.2024",
  },
];

const Blog = () => (
  <>
    <Header />
    <main className="min-h-screen flex flex-col items-center py-10 px-4 bg-background">
      <Seo
        title="Блог CopyPro Cloud"
        description="Статьи по копирайтингу, маркетингу, SEO и эффективному бизнесу онлайн."
      />
      <section className="max-w-2xl w-full mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">Блог</h1>
        <div className="space-y-6">
          {blogPosts.map((post, idx) => (
            <article key={idx} className="bg-card rounded-xl p-5 shadow">
              <div className="flex justify-between mb-1 text-muted-foreground text-xs">
                <span>{post.date}</span>
              </div>
              <div className="text-lg font-semibold mb-2">{post.title}</div>
              <div className="">{post.desc}</div>
            </article>
          ))}
        </div>
      </section>
      <SeoTextExpandable text={seoText} />
    </main>
    <Footer />
  </>
);

export default Blog;
