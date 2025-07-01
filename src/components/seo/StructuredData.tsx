
import { useEffect } from 'react';

interface StructuredDataProps {
  data: any | any[];
  id?: string;
}

export default function StructuredData({ data, id = 'structured-data' }: StructuredDataProps) {
  useEffect(() => {
    // Remove existing script if it exists
    const existingScript = document.getElementById(id);
    if (existingScript) {
      existingScript.remove();
    }

    // Create new script element
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    
    // Handle both single object and array
    const jsonData = Array.isArray(data) ? data : [data];
    script.textContent = JSON.stringify(jsonData, null, 0);
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(id);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data, id]);

  return null;
}
