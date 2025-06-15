
export interface TextBlock {
  type: 'heading' | 'subheading' | 'paragraph' | 'quote' | 'list' | 'table' | 'cta' | 'stats' | 'testimonial';
  content?: string; // Made optional since lists, tables, and stats might not need it
  level?: number; // для заголовков H1-H6
  items?: string[]; // для списков
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  author?: string; // для цитат и отзывов
  position?: string; // должность автора
  color?: string;
  icon?: string;
  highlighted?: boolean;
}

export interface EnhancedTextExample {
  title: string;
  description: string;
  blocks: TextBlock[];
  category: string;
  metrics: {
    [key: string]: string | number | boolean;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface TextExample {
  title: string;
  content: string;
  metrics: {
    [key: string]: string | number | boolean;
  };
}
