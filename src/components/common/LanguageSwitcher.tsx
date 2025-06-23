
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(
    languages.find(lang => lang.code === i18n.language) || languages[0]
  );

  // Обновляем текущий язык при изменении в i18n
  useEffect(() => {
    const newLang = languages.find(lang => lang.code === i18n.language);
    if (newLang) {
      setCurrentLang(newLang);
    }
  }, [i18n.language]);

  const changeLanguage = async (langCode: string) => {
    try {
      await i18n.changeLanguage(langCode);
      localStorage.setItem('language', langCode);
      const newLang = languages.find(lang => lang.code === langCode);
      if (newLang) {
        setCurrentLang(newLang);
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLang.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`cursor-pointer ${
              currentLang.code === language.code ? 'bg-blue-50' : ''
            }`}
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
