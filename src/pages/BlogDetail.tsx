
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2,
  BookOpen,
  TrendingUp,
  Lightbulb,
  CheckCircle
} from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const blogPosts = {
  1: {
    title: "SEO-копирайтинг в 2024: Новые тренды и стратегии",
    category: "SEO",
    author: "Елена Смирнова",
    date: "15 марта 2024",
    readTime: "8 мин",
    excerpt: "Как изменились требования к SEO-текстам и какие подходы работают сейчас",
    content: `
      <h2>Введение</h2>
      <p>SEO-копирайтинг в 2024 году кардинально отличается от того, что было даже 2-3 года назад. Поисковые алгоритмы стали умнее, пользователи — требовательнее, а конкуренция — жёстче.</p>
      
      <h3>Основные изменения в 2024 году</h3>
      <p>Главное изменение — это фокус на пользовательском опыте и экспертности контента. Google всё больше ценит E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).</p>
      
      <h3>Новые тренды</h3>
      <ul>
        <li><strong>Семантическое ядро 2.0:</strong> Теперь важны не только ключевые слова, но и контекст, синонимы и LSI-фразы</li>
        <li><strong>Голосовой поиск:</strong> Оптимизация под естественную речь и вопросы</li>
        <li><strong>Мобильная оптимизация:</strong> Mobile-first индексация стала стандартом</li>
        <li><strong>Скорость загрузки:</strong> Core Web Vitals влияют на ранжирование</li>
      </ul>
      
      <h3>Практические рекомендации</h3>
      <p>1. <strong>Создавайте экспертный контент.</strong> Показывайте свою компетентность через детальные разборы, кейсы и примеры.</p>
      <p>2. <strong>Структурируйте текст.</strong> Используйте заголовки, списки, выделения — так текст легче воспринимается.</p>
      <p>3. <strong>Отвечайте на вопросы пользователей.</strong> Анализируйте поисковые запросы и создавайте контент, который закрывает потребности аудитории.</p>
      
      <h3>Заключение</h3>
      <p>SEO-копирайтинг в 2024 году — это искусство создания контента, который одновременно нравится людям и поисковым системам. Фокусируйтесь на качестве, экспертности и пользе для читателей.</p>
    `,
    tags: ["SEO", "Копирайтинг", "Маркетинг", "2024"],
    relatedPosts: [2, 3, 4]
  },
  2: {
    title: "Психология продаж в копирайтинге: 7 мощных триггеров",
    category: "Продажи",
    author: "Михаил Петров",
    date: "10 марта 2024",
    readTime: "12 мин",
    excerpt: "Разбираем психологические приёмы, которые заставляют покупать",
    content: `
      <h2>Введение</h2>
      <p>Продающий текст — это не просто описание товара или услуги. Это инструмент воздействия на психику человека, который помогает принять решение о покупке.</p>
      
      <h3>7 ключевых триггеров</h3>
      
      <h4>1. Триггер дефицита</h4>
      <p>Люди больше ценят то, что может исчезнуть. "Только 3 товара в наличии" работает лучше, чем "Много товаров в наличии".</p>
      
      <h4>2. Социальное доказательство</h4>
      <p>Отзывы, рейтинги, количество клиентов — всё это показывает, что другие люди уже сделали выбор в пользу вашего предложения.</p>
      
      <h4>3. Триггер авторитета</h4>
      <p>Рекомендации экспертов, сертификаты, награды повышают доверие к бренду.</p>
      
      <h4>4. Принцип взаимности</h4>
      <p>Дайте что-то бесплатно, и люди почувствуют обязательство что-то дать взамен.</p>
      
      <h4>5. Триггер срочности</h4>
      <p>Ограниченное время действия предложения заставляет действовать быстрее.</p>
      
      <h4>6. Эмоциональное воздействие</h4>
      <p>Люди покупают эмоциями, а потом оправдывают логикой. Создавайте эмоциональную связь.</p>
      
      <h4>7. Принцип контраста</h4>
      <p>Показывайте разницу между "до" и "после" использования вашего продукта.</p>
      
      <h3>Как применять на практике</h3>
      <p>Комбинируйте несколько триггеров в одном тексте, но не переусердствуйте. Главное — искренность и польза для клиента.</p>
    `,
    tags: ["Психология", "Продажи", "Триггеры", "Копирайтинг"],
    relatedPosts: [1, 3, 5]
  },
  3: {
    title: "Email-маркетинг 2024: Как повысить открываемость до 50%",
    category: "Email-маркетинг",
    author: "Анна Коваленко",
    date: "5 марта 2024",
    readTime: "10 мин",
    excerpt: "Проверенные методы создания email-рассылок, которые читают",
    content: `
      <h2>Состояние email-маркетинга в 2024</h2>
      <p>Email остается одним из самых эффективных каналов коммуникации с ROI до 4200%. Но открываемость писем падает — средний показатель всего 21,5%.</p>
      
      <h3>Секреты высокой открываемости</h3>
      
      <h4>1. Идеальная тема письма</h4>
      <ul>
        <li>Длина 30-50 символов</li>
        <li>Персонализация (имя получателя)</li>
        <li>Интрига без спама</li>
        <li>Цифры и конкретика</li>
      </ul>
      
      <h4>2. Имя отправителя</h4>
      <p>Лучше всего работает комбинация: "Имя Фамилия из Компания". Это создает личную связь.</p>
      
      <h4>3. Время отправки</h4>
      <p>Оптимальное время: вторник-четверг, 10:00-11:00 и 14:00-15:00. Но тестируйте для своей аудитории.</p>
      
      <h4>4. Превью текст</h4>
      <p>Дополняет тему письма, не повторяя её. Должен интриговать и мотивировать открыть.</p>
      
      <h3>Структура эффективного письма</h3>
      <ol>
        <li><strong>Цепляющий заголовок</strong> — повторяет или развивает тему</li>
        <li><strong>Персональное обращение</strong> — показываем, что письмо именно для получателя</li>
        <li><strong>Основной контент</strong> — польза, ценность, решение проблемы</li>
        <li><strong>Четкий CTA</strong> — одно действие, яркая кнопка</li>
        <li><strong>Подпись</strong> — живой человек, контакты</li>
      </ol>
      
      <h3>Технические моменты</h3>
      <p>Адаптивность под мобильные устройства — критически важно. Более 60% писем читают на смартфонах.</p>
    `,
    tags: ["Email", "Маркетинг", "Открываемость", "Рассылки"],
    relatedPosts: [1, 2, 4]
  }
};

export default function BlogDetail() {
  const { id } = useParams();
  const post = blogPosts[id as keyof typeof blogPosts];

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-background to-slate-50/50 py-20">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Статья не найдена</h1>
            <p className="text-muted-foreground mb-8">Извините, запрашиваемая статья не существует.</p>
            <Button asChild>
              <Link to="/blog">Вернуться к блогу</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-slate-50/50">
        {/* Hero секция */}
        <section className="py-20">
          <div className="container max-w-4xl mx-auto px-4">
            <Button variant="outline" asChild className="mb-8">
              <Link to="/blog" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Вернуться к блогу
              </Link>
            </Button>

            <div className="mb-8">
              <Badge className="mb-4">{post.category}</Badge>
              <h1 className="text-3xl md:text-5xl font-playfair font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Поделиться
                </Button>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Контент статьи */}
        <section className="py-16">
          <div className="container max-w-4xl mx-auto px-4">
            <Card className="p-8 md:p-12">
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:text-foreground prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                  prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                  prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                  prose-li:mb-2 prose-strong:text-foreground prose-strong:font-semibold"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </Card>
          </div>
        </section>

        {/* Автор */}
        <section className="py-16 bg-slate-50/50">
          <div className="container max-w-4xl mx-auto px-4">
            <Card className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{post.author}</h3>
                  <p className="text-muted-foreground mb-4">
                    Эксперт по {post.category.toLowerCase()} с 8-летним опытом. 
                    Помог более чем 200 компаниям улучшить свои результаты.
                  </p>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">
                      <BookOpen className="w-3 h-3 mr-1" />
                      15+ статей
                    </Badge>
                    <Badge variant="outline">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      200+ клиентов
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Похожие статьи */}
        <section className="py-16">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
              <Lightbulb className="w-8 h-8 text-primary" />
              Похожие статьи
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {post.relatedPosts.map((relatedId) => {
                const relatedPost = blogPosts[relatedId as keyof typeof blogPosts];
                if (!relatedPost) return null;
                
                return (
                  <Card key={relatedId} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-32 bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-primary" />
                    </div>
                    <div className="p-6">
                      <Badge className="mb-3">{relatedPost.category}</Badge>
                      <h3 className="font-semibold mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {relatedPost.readTime}
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/blog/${relatedId}`}>Читать</Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Нужны тексты для вашего бизнеса?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Получите профессиональный контент, который приводит клиентов
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/order">Заказать контент</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/#contact">Получить консультацию</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
