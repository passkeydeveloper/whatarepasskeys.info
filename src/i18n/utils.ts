import en from './en.json';
import es from './es.json';

const translations: Record<string, typeof en> = { en, es };

export function useTranslations(locale: string) {
  const t = translations[locale] ?? translations['en'];
  return t;
}

// Native-language names, shown in the language selector regardless of
// the current locale (e.g. "Español" is always "Español", never "Spanish").
export const localeNames: Record<string, string> = {
  en: 'English',
  es: 'Español',
};

export const locales = Object.keys(translations);
