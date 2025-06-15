
import { useEffect } from 'react';

interface StructuredDataProps {
  data: any | any[];
  id?: string;
}

export function StructuredData({ data, id = 'structured-data' }: StructuredDataProps) {
  useEffect(() => {
    // Удаляем предыдущие structured data с тем же id
    const existingScript = document.getElementById(id);
    if (existingScript) {
      existingScript.remove();
    }

    // Создаем новый script элемент
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    
    // Обрабатываем массив данных или одиночный объект
    const structuredData = Array.isArray(data) ? data : [data];
    script.innerHTML = JSON.stringify(structuredData.filter(Boolean), null, 0);
    
    document.head.appendChild(script);

    return () => {
      const scriptElement = document.getElementById(id);
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, [data, id]);

  return null;
}

export default StructuredData;
