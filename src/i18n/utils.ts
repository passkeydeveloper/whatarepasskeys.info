import en from './en.json';

const translations: Record<string, typeof en> = { en };

export function useTranslations(locale: string) {
  const t = translations[locale] ?? translations['en'];
  return t;
}
