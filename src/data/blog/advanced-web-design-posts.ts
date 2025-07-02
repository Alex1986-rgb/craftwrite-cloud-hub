import { BlogPost } from './types';

export const advancedWebDesignPosts: BlogPost[] = [
  {
    id: 31,
    title: "UX-письмо: как дизайн влияет на восприятие текста",
    excerpt: "Принципы UX/UI дизайна для создания читаемого и конвертирующего контента. Типографика, композиция, визуальная иерархия.",
    category: "Веб-дизайн",
    author: "Мария Дизайнова",
    date: "28 января 2024",
    readTime: "15 мин",
    image: "https://images.unsplash.com/photo-1558655146-364adaf768db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: true,
    tags: ["UX", "UI", "типографика", "дизайн", "конверсия"],
    relatedPosts: [32, 33, 6],
    content: `
      <div class="stats-box">
        <h3>📐 Статистика влияния дизайна на текст</h3>
        <ul>
          <li><strong>95%</strong> первого впечатления о сайте связано с дизайном</li>
          <li><strong>200%</strong> улучшение читаемости при правильной типографике</li>
          <li><strong>38%</strong> пользователей покинут сайт из-за плохого дизайна</li>
          <li><strong>67%</strong> увеличение конверсии при оптимизации визуальной иерархии</li>
        </ul>
      </div>

      <h2>Основы типографики для веба</h2>
      
      <img src="https://images.unsplash.com/photo-1558655146-364adaf768db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Веб-типографика" class="article-image">

      <h3>Выбор шрифтов</h3>
      
      <div class="font-guide">
        <h4>🔤 Классификация веб-шрифтов:</h4>
        <ul>
          <li><strong>Serif (с засечками):</strong> Times, Georgia - для длинных текстов</li>
          <li><strong>Sans-serif (без засечек):</strong> Arial, Helvetica - для заголовков и интерфейса</li>
          <li><strong>Monospace (моноширинные):</strong> Courier - для кода</li>
          <li><strong>Script (рукописные):</strong> для декоративных элементов</li>
        </ul>
      </div>

      <h3>Размеры и интервалы</h3>
      
      <table>
        <thead>
          <tr>
            <th>Элемент</th>
            <th>Размер (px)</th>
            <th>Интерлиньяж</th>
            <th>Применение</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>H1</td>
            <td>32-48</td>
            <td>1.2</td>
            <td>Основной заголовок</td>
          </tr>
          <tr>
            <td>H2</td>
            <td>24-32</td>
            <td>1.3</td>
            <td>Заголовки разделов</td>
          </tr>
          <tr>
            <td>H3</td>
            <td>20-24</td>
            <td>1.4</td>
            <td>Подзаголовки</td>
          </tr>
          <tr>
            <td>Body</td>
            <td>16-18</td>
            <td>1.5-1.6</td>
            <td>Основной текст</td>
          </tr>
          <tr>
            <td>Caption</td>
            <td>12-14</td>
            <td>1.4</td>
            <td>Подписи, сноски</td>
          </tr>
        </tbody>
      </table>

      <h2>Визуальная иерархия</h2>
      
      <h3>Принципы создания иерархии</h3>
      
      <div class="hierarchy-principles">
        <h4>📊 Инструменты визуальной иерархии:</h4>
        <ol>
          <li><strong>Размер:</strong> Большие элементы привлекают больше внимания</li>
          <li><strong>Цвет:</strong> Яркие и контрастные цвета выделяются</li>
          <li><strong>Контраст:</strong> Разница в яркости и насыщенности</li>
          <li><strong>Позиция:</strong> Элементы вверху и слева замечают первыми</li>
          <li><strong>Белое пространство:</strong> Изоляция важных элементов</li>
          <li><strong>Типографика:</strong> Жирность, курсив, подчеркивание</li>
        </ol>
      </div>

      <h3>F-паттерн чтения</h3>
      <p>Исследования eye-tracking показывают, что пользователи сканируют контент по F-образной траектории.</p>

      <div class="f-pattern">
        <h4>👁️ Зоны внимания на странице:</h4>
        <ul>
          <li><strong>Горизонтальная полоса сверху:</strong> Заголовок и навигация</li>
          <li><strong>Левая вертикальная полоса:</strong> Начало абзацев и списков</li>
          <li><strong>Вторая горизонтальная полоса:</strong> Подзаголовки</li>
          <li><strong>Правый нижний угол:</strong> Призывы к действию</li>
        </ul>
      </div>

      <h2>Композиция и сетки</h2>
      
      <h3>Сеточная система</h3>
      
      <div class="grid-system">
        <h4>📐 Популярные сетки:</h4>
        <ul>
          <li><strong>12-колоночная:</strong> Гибкость для разных устройств</li>
          <li><strong>16-колоночная:</strong> Для сложных макетов</li>
          <li><strong>Базовая линия:</strong> Вертикальный ритм для текста</li>
          <li><strong>Модульная сетка:</strong> Для карточек и блоков</li>
        </ul>
      </div>

      <h3>Золотое сечение в веб-дизайне</h3>
      <p>Соотношение 1:1.618 создает гармоничные пропорции в композиции.</p>

      <div class="golden-ratio">
        <h4>✨ Применение золотого сечения:</h4>
        <ul>
          <li>Ширина контентной области к сайдбару</li>
          <li>Размеры заголовков к основному тексту</li>
          <li>Пропорции изображений</li>
          <li>Отступы и поля</li>
        </ul>
      </div>

      <h2>Цвет и контрастность</h2>
      
      <h3>Доступность и читаемость</h3>
      
      <div class="accessibility-guide">
        <h4>♿ Стандарты контрастности (WCAG):</h4>
        <ul>
          <li><strong>AA уровень:</strong> Контраст 4.5:1 для обычного текста</li>
          <li><strong>AAA уровень:</strong> Контраст 7:1 для обычного текста</li>
          <li><strong>Крупный текст:</strong> Контраст 3:1 (18pt+ или 14pt+ жирный)</li>
          <li><strong>Интерфейсные элементы:</strong> Контраст 3:1</li>
        </ul>
      </div>

      <h3>Цветовая схема для текста</h3>
      
      <table>
        <thead>
          <tr>
            <th>Тип контента</th>
            <th>Рекомендуемые цвета</th>
            <th>Избегать</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Основной текст</td>
            <td>#333, #2c2c2c, #1a1a1a</td>
            <td>Чистый черный #000</td>
          </tr>
          <tr>
            <td>Заголовки</td>
            <td>#000, #1a1a1a, бренд-цвет</td>
            <td>Светлые цвета</td>
          </tr>
          <tr>
            <td>Второстепенный текст</td>
            <td>#666, #777, #999</td>
            <td>Красный, зеленый</td>
          </tr>
          <tr>
            <td>Ссылки</td>
            <td>#0066cc, #1a73e8</td>
            <td>Черный, как основной текст</td>
          </tr>
        </tbody>
      </table>

      <h2>Мобильная оптимизация текста</h2>
      
      <h3>Принципы Mobile-first</h3>
      
      <div class="mobile-principles">
        <h4>📱 Особенности мобильного дизайна:</h4>
        <ul>
          <li><strong>Увеличенные шрифты:</strong> Минимум 16px для основного текста</li>
          <li><strong>Больше интерлиньяжа:</strong> 1.6-1.8 для лучшей читаемости</li>
          <li><strong>Короткие строки:</strong> 50-75 символов максимум</li>
          <li><strong>Четкие заголовки:</strong> Явная иерархия на маленьком экране</li>
          <li><strong>Удобные кнопки:</strong> Минимум 44x44px для касания</li>
        </ul>
      </div>

      <h2>Инструменты для дизайнеров</h2>
      
      <div class="design-tools">
        <h4>🛠️ Полезные инструменты:</h4>
        <ul>
          <li><strong>Figma:</strong> Дизайн интерфейсов и прототипирование</li>
          <li><strong>Adobe XD:</strong> UX/UI дизайн</li>
          <li><strong>Sketch:</strong> Векторный дизайн (только Mac)</li>
          <li><strong>InVision:</strong> Прототипирование и коллаборация</li>
          <li><strong>Zeplin:</strong> Передача дизайна разработчикам</li>
          <li><strong>Coolors:</strong> Генератор цветовых палитр</li>
          <li><strong>Contrast Checker:</strong> Проверка контрастности</li>
          <li><strong>Google Fonts:</strong> Веб-шрифты</li>
        </ul>
      </div>

      <div class="cta-box">
        <h3>🎨 Готовы создать дизайн, который продает?</h3>
        <p>Применяйте принципы UX/UI для текста и увеличивайте конверсию на 200%</p>
        <p><strong>Начните с типографики - основы всего дизайна!</strong></p>
      </div>
    `
  },
  {
    id: 32,
    title: "Микротипографика: детали, которые влияют на конверсию",
    excerpt: "Продвинутые техники типографики: кернинг, трекинг, висячие строки. Как мелкие детали создают большую разницу.",
    category: "Веб-дизайн",
    author: "Дмитрий Типограф",
    date: "25 января 2024",
    readTime: "12 мин",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tags: ["микротипографика", "детали", "кернинг", "типографика"],
    relatedPosts: [31, 33, 6],
    content: `
      <div class="stats-box">
        <h3>🔍 Влияние микротипографики</h3>
        <ul>
          <li><strong>23%</strong> улучшение читаемости при правильном кернинге</li>
          <li><strong>15%</strong> увеличение времени на странице</li>
          <li><strong>31%</strong> снижение показателя отказов</li>
          <li><strong>12%</strong> рост конверсии при идеальной типографике</li>
        </ul>
      </div>

      <h2>Что такое микротипографика?</h2>
      
      <p>Микротипографика - это искусство настройки мельчайших деталей в тексте: межбуквенных расстояний, висячих строк, переносов. Эти нюансы незаметны на первый взгляд, но кардинально влияют на восприятие.</p>

      <h3>Основные элементы микротипографики</h3>
      
      <div class="micro-elements">
        <h4>🔤 Ключевые понятия:</h4>
        <ul>
          <li><strong>Кернинг (Kerning):</strong> Расстояние между конкретными парами букв</li>
          <li><strong>Трекинг (Tracking):</strong> Общее межбуквенное расстояние</li>
          <li><strong>Лигатуры:</strong> Соединенные буквы (fi, fl, ff)</li>
          <li><strong>Висячие строки:</strong> Одинокие слова в конце абзаца</li>
          <li><strong>Оптические размеры:</strong> Адаптация шрифта под размер</li>
        </ul>
      </div>

      <h2>Кернинг и трекинг</h2>
      
      <h3>Проблемные пары букв</h3>
      
      <div class="kerning-pairs">
        <h4>⚠️ Требующие внимания комбинации:</h4>
        <ul>
          <li><strong>В русском:</strong> Та, То, Ту, Ра, Ро, Гл, Дл</li>
          <li><strong>В английском:</strong> AV, AW, AY, FA, LT, LY, PA, TA, VA, WA, YA</li>
          <li><strong>Цифры:</strong> 11, 17, 71, 77</li>
          <li><strong>Знаки:</strong> .,« »:" '</li>
        </ul>
      </div>

      <h3>Настройка трекинга</h3>
      
      <table>
        <thead>
          <tr>
            <th>Размер шрифта</th>
            <th>Рекомендуемый трекинг</th>
            <th>Применение</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>8-12px</td>
            <td>+0.02em - +0.05em</td>
            <td>Мелкий текст, подписи</td>
          </tr>
          <tr>
            <td>14-18px</td>
            <td>0em</td>
            <td>Основной текст</td>
          </tr>
          <tr>
            <td>20-32px</td>
            <td>-0.01em - -0.03em</td>
            <td>Заголовки</td>
          </tr>
          <tr>
            <td>36px+</td>
            <td>-0.03em - -0.05em</td>
            <td>Большие заголовки</td>
          </tr>
        </tbody>
      </table>

      <h2>Обработка висячих строк</h2>
      
      <h3>Типы проблем с переносами</h3>
      
      <div class="hanging-issues">
        <h4>🚫 Что нужно исправлять:</h4>
        <ul>
          <li><strong>Висячие строки (Widows):</strong> Короткая строка в конце абзаца</li>
          <li><strong>Сироты (Orphans):</strong> Одна строка абзаца на новой странице</li>
          <li><strong>Короткие слова:</strong> Предлоги и союзы в конце строки</li>
          <li><strong>Неудачные переносы:</strong> Разрыв в середине важного слова</li>
        </ul>
      </div>

      <h3>Методы исправления</h3>
      
      <div class="fixing-methods">
        <h4>🔧 Способы решения:</h4>
        <ol>
          <li><strong>Неразрывный пробел (&nbsp;):</strong> Между коротким словом и следующим</li>
          <li><strong>Мягкий перенос (&shy;):</strong> Подсказка браузеру о месте переноса</li>
          <li><strong>Изменение ширины колонки:</strong> Корректировка длины строк</li>
          <li><strong>Редактирование текста:</strong> Добавление/удаление слов</li>
          <li><strong>CSS свойства:</strong> orphans, widows, break-inside</li>
        </ol>
      </div>

      <h2>Лигатуры и специальные символы</h2>
      
      <h3>Использование лигатур</h3>
      
      <div class="ligatures-guide">
        <h4>🔗 Когда использовать лигатуры:</h4>
        <ul>
          <li><strong>В печатном дизайне:</strong> Всегда включать</li>
          <li><strong>В веб-дизайне:</strong> С осторожностью, может влиять на поиск</li>
          <li><strong>В заголовках:</strong> Улучшает визуальный вид</li>
          <li><strong>В кодах:</strong> Специальные лигатуры для программирования</li>
        </ul>
      </div>

      <h3>Типографские символы</h3>
      
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Символ</th>
            <th>HTML</th>
            <th>Когда использовать</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Длинное тире</td>
            <td>—</td>
            <td>&mdash;</td>
            <td>Вводные слова, диалоги</td>
          </tr>
          <tr>
            <td>Короткое тире</td>
            <td>–</td>
            <td>&ndash;</td>
            <td>Диапазоны чисел</td>
          </tr>
          <tr>
            <td>Многоточие</td>
            <td>…</td>
            <td>&hellip;</td>
            <td>Незавершенная мысль</td>
          </tr>
          <tr>
            <td>Неразрывный пробел</td>
            <td> </td>
            <td>&nbsp;</td>
            <td>Предотвращение переносов</td>
          </tr>
        </tbody>
      </table>

      <h2>Настройка интерлиньяжа</h2>
      
      <h3>Оптимальные значения</h3>
      
      <div class="line-height-guide">
        <h4>📏 Рекомендации по интерлиньяжу:</h4>
        <ul>
          <li><strong>Короткие строки (до 50 символов):</strong> 1.3-1.4</li>
          <li><strong>Средние строки (50-75 символов):</strong> 1.4-1.6</li>
          <li><strong>Длинные строки (75+ символов):</strong> 1.6-1.8</li>
          <li><strong>Заголовки:</strong> 1.1-1.3</li>
          <li><strong>Мелкий текст:</strong> 1.2-1.4</li>
        </ul>
      </div>

      <h2>Тестирование микротипографики</h2>
      
      <h3>Инструменты проверки</h3>
      
      <div class="testing-tools">
        <h4>🔍 Полезные инструменты:</h4>
        <ul>
          <li><strong>Type Sample:</strong> Тестирование шрифтов в браузере</li>
          <li><strong>Kern Type:</strong> Игра для тренировки кернинга</li>
          <li><strong>Typetester:</strong> Сравнение шрифтов</li>
          <li><strong>WhatFont:</strong> Определение шрифтов на сайтах</li>
          <li><strong>CSS Lint:</strong> Проверка типографических свойств</li>
        </ul>
      </div>

      <h3>Чек-лист микротипографики</h3>
      
      <div class="checklist">
        <h4>✅ Проверьте перед публикацией:</h4>
        <ul>
          <li>[ ] Нет висячих строк и сирот</li>
          <li>[ ] Правильные тире и кавычки</li>
          <li>[ ] Неразрывные пробелы там, где нужно</li>
          <li>[ ] Оптимальный интерлиньяж</li>
          <li>[ ] Настроен кернинг для заголовков</li>
          <li>[ ] Используются правильные символы</li>
          <li>[ ] Читаемость на всех устройствах</li>
        </ul>
      </div>

      <div class="cta-box">
        <h3>🎯 Совершенство в деталях</h3>
        <p>Настройте микротипографику и создайте идеальный пользовательский опыт</p>
        <p><strong>Каждая деталь имеет значение!</strong></p>
      </div>
    `
  },
  {
    id: 33,
    title: "Адаптивная типографика: текст для всех устройств",
    excerpt: "Создание отзывчивого дизайна текста. Fluid typography, переменные шрифты и оптимизация для разных экранов.",
    category: "Веб-дизайн",
    author: "Анна Адаптивная",
    date: "22 января 2024",
    readTime: "14 мин",
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    featured: false,
    tags: ["адаптивность", "responsive", "mobile", "typography"],
    relatedPosts: [31, 32, 34],
    content: `
      <div class="stats-box">
        <h3>📱 Статистика мобильного трафика</h3>
        <ul>
          <li><strong>58%</strong> всего веб-трафика приходится на мобильные устройства</li>
          <li><strong>53%</strong> пользователей покидают сайт, если он загружается дольше 3 секунд</li>
          <li><strong>61%</strong> пользователей не вернутся на сайт с плохой мобильной версией</li>
          <li><strong>74%</strong> пользователей скорее вернутся на mobile-friendly сайт</li>
        </ul>
      </div>

      <h2>Принципы адаптивной типографики</h2>
      
      <p>Адаптивная типографика - это подход к дизайну текста, который обеспечивает оптимальную читаемость на любом устройстве, от смартфона до настольного монитора.</p>

      <h3>Ключевые принципы</h3>
      
      <div class="adaptive-principles">
        <h4>📐 Основы адаптивности:</h4>
        <ul>
          <li><strong>Масштабируемость:</strong> Шрифты должны увеличиваться/уменьшаться плавно</li>
          <li><strong>Читаемость:</strong> Сохранение читаемости на всех размерах экрана</li>
          <li><strong>Производительность:</strong> Быстрая загрузка шрифтов</li>
          <li><strong>Доступность:</strong> Поддержка различных потребностей пользователей</li>
        </ul>
      </div>

      <h2>Breakpoints для типографики</h2>
      
      <h3>Стандартные точки перелома</h3>
      
      <table>
        <thead>
          <tr>
            <th>Устройство</th>
            <th>Размер экрана</th>
            <th>H1 размер</th>
            <th>Body размер</th>
            <th>Line height</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mobile</td>
            <td>320-767px</td>
            <td>24-32px</td>
            <td>16px</td>
            <td>1.5</td>
          </tr>
          <tr>
            <td>Tablet</td>
            <td>768-1023px</td>
            <td>32-40px</td>
            <td>16-18px</td>
            <td>1.5</td>
          </tr>
          <tr>
            <td>Desktop</td>
            <td>1024-1439px</td>
            <td>40-48px</td>
            <td>18px</td>
            <td>1.6</td>
          </tr>
          <tr>
            <td>Large Desktop</td>
            <td>1440px+</td>
            <td>48-64px</td>
            <td>18-20px</td>
            <td>1.6</td>
          </tr>
        </tbody>
      </table>

      <h2>Fluid Typography (Плавная типографика)</h2>
      
      <h3>CSS функция clamp()</h3>
      
      <div class="clamp-example">
        <h4>🔧 Синтаксис clamp():</h4>
        <code>font-size: clamp(minimum, preferred, maximum);</code>
        
        <h5>Примеры использования:</h5>
        <ul>
          <li><strong>H1:</strong> <code>clamp(2rem, 5vw, 4rem)</code></li>
          <li><strong>H2:</strong> <code>clamp(1.5rem, 4vw, 3rem)</code></li>
          <li><strong>Body:</strong> <code>clamp(1rem, 2.5vw, 1.25rem)</code></li>
        </ul>
      </div>

      <h3>Переменные CSS для типографики</h3>
      
      <div class="css-variables">
        <h4>📝 Пример настройки:</h4>
        <pre><code>:root {
  --font-size-base: clamp(1rem, 2.5vw, 1.25rem);
  --font-size-lg: clamp(1.25rem, 3vw, 1.5rem);
  --font-size-xl: clamp(1.5rem, 4vw, 2rem);
  --font-size-2xl: clamp(2rem, 5vw, 3rem);
  --font-size-3xl: clamp(2.5rem, 6vw, 4rem);
  
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}</code></pre>
      </div>

      <h2>Переменные шрифты (Variable Fonts)</h2>
      
      <h3>Преимущества переменных шрифтов</h3>
      
      <div class="variable-fonts-benefits">
        <h4>✨ Преимущества:</h4>
        <ul>
          <li><strong>Размер файла:</strong> Один файл вместо множества</li>
          <li><strong>Гибкость:</strong> Бесконечное количество вариаций</li>
          <li><strong>Производительность:</strong> Меньше HTTP-запросов</li>
          <li><strong>Анимации:</strong> Плавные переходы между стилями</li>
        </ul>
      </div>

      <h3>Оси вариации</h3>
      
      <table>
        <thead>
          <tr>
            <th>Ось</th>
            <th>CSS свойство</th>
            <th>Описание</th>
            <th>Диапазон</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Weight (wght)</td>
            <td>font-weight</td>
            <td>Толщина шрифта</td>
            <td>100-900</td>
          </tr>
          <tr>
            <td>Width (wdth)</td>
            <td>font-stretch</td>
            <td>Ширина символов</td>
            <td>50%-200%</td>
          </tr>
          <tr>
            <td>Slant (slnt)</td>
            <td>font-style: oblique</td>
            <td>Наклон</td>
            <td>-15deg - 0deg</td>
          </tr>
          <tr>
            <td>Optical Size (opsz)</td>
            <td>font-optical-sizing</td>
            <td>Оптический размер</td>
            <td>6pt-72pt</td>
          </tr>
        </tbody>
      </table>

      <h2>Оптимизация для мобильных устройств</h2>
      
      <h3>Особенности мобильной типографики</h3>
      
      <div class="mobile-typography">
        <h4>📱 Ключевые моменты:</h4>
        <ul>
          <li><strong>Минимальный размер:</strong> 16px для основного текста</li>
          <li><strong>Контрастность:</strong> Высокий контраст для чтения на солнце</li>
          <li><strong>Длина строки:</strong> 45-75 символов оптимально</li>
          <li><strong>Межстрочный интервал:</strong> 1.4-1.6 для комфортного чтения</li>
          <li><strong>Размер касания:</strong> Минимум 44x44px для ссылок</li>
        </ul>
      </div>

      <h3>Тестирование на устройствах</h3>
      
      <div class="device-testing">
        <h4>🧪 Чек-лист тестирования:</h4>
        <ul>
          <li>[ ] iPhone SE (320px ширина)</li>
          <li>[ ] iPhone 12/13 (390px ширина)</li>
          <li>[ ] iPad (768px ширина)</li>
          <li>[ ] Android планшет (различные размеры)</li>
          <li>[ ] Десктоп 1920px</li>
          <li>[ ] Ультраширокий монитор 2560px+</li>
        </ul>
      </div>

      <h2>Производительность и загрузка шрифтов</h2>
      
      <h3>Стратегии загрузки шрифтов</h3>
      
      <div class="font-loading">
        <h4>⚡ Оптимизация загрузки:</h4>
        <ul>
          <li><strong>font-display: swap;</strong> - быстрое отображение с заменой</li>
          <li><strong>Предзагрузка:</strong> &lt;link rel="preload"&gt; для критичных шрифтов</li>
          <li><strong>Системные шрифты:</strong> Fallback на встроенные шрифты</li>
          <li><strong>Subset шрифтов:</strong> Загрузка только нужных символов</li>
        </ul>
      </div>

      <h3>Font-display стратегии</h3>
      
      <table>
        <thead>
          <tr>
            <th>Значение</th>
            <th>Поведение</th>
            <th>Когда использовать</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>auto</td>
            <td>По умолчанию браузера</td>
            <td>Обычно не рекомендуется</td>
          </tr>
          <tr>
            <td>block</td>
            <td>Блокировка рендера до загрузки</td>
            <td>Критично важные шрифты</td>
          </tr>
          <tr>
            <td>swap</td>
            <td>Мгновенное отображение fallback</td>
            <td>Большинство случаев</td>
          </tr>
          <tr>
            <td>fallback</td>
            <td>Краткая блокировка, затем fallback</td>
            <td>Компромиссное решение</td>
          </tr>
          <tr>
            <td>optional</td>
            <td>Загрузка только при хорошем соединении</td>
            <td>Декоративные шрифты</td>
          </tr>
        </tbody>
      </table>

      <h2>Инструменты для адаптивной типографики</h2>
      
      <div class="responsive-tools">
        <h4>🛠️ Полезные инструменты:</h4>
        <ul>
          <li><strong>Modular Scale:</strong> Создание типографических масштабов</li>
          <li><strong>Fluid Typography Calculator:</strong> Расчет clamp() значений</li>
          <li><strong>ResponsivelyApp:</strong> Тестирование на разных экранах</li>
          <li><strong>Chrome DevTools:</strong> Эмуляция устройств</li>
          <li><strong>Variable Fonts Inspector:</strong> Работа с переменными шрифтами</li>
        </ul>
      </div>

      <div class="cta-box">
        <h3>📱 Создайте типографику для всех устройств</h3>
        <p>Внедрите адаптивную типографику и обеспечьте идеальный UX на любом экране</p>
        <p><strong>Каждый пользователь заслуживает идеального чтения!</strong></p>
      </div>
    `
  }
];