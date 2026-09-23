// Locale files are discovered automatically: drop a new `<code>.json` in
// this directory (with a `meta.nativeName` field) and it becomes available
// as a locale on the next build, no code changes required.
const localeModules = import.meta.glob<{ default: Record<string, any> }>('./*.json', {
  eager: true,
});

const translations: Record<string, Record<string, any>> = {};
for (const path in localeModules) {
  const code = path.replace('./', '').replace('.json', '');
  translations[code] = localeModules[path].default;
}

export const locales = Object.keys(translations).sort();

// The default locale is served unprefixed at "/" (no redirect); the rest
// live under their own "/<code>/" prefix. See localeHref below.
export const defaultLocale = 'en';

// Native-language names, shown in the language selector regardless of the
// current locale (e.g. "Español" is always "Español", never "Spanish").
// Sourced from each locale file's own meta.nativeName so a new locale
// doesn't need to be registered anywhere else.
export const localeNames: Record<string, string> = Object.fromEntries(
  locales.map((code) => [code, translations[code].meta?.nativeName ?? code])
);

// Maps our routing codes to real BCP-47 language codes, for contexts that
// require the latter (hreflang, Open Graph locale). Only needed if a future
// locale's routing code isn't already valid BCP-47.
export const bcp47LanguageMap: Record<string, string> = {
  'zh-cn': 'zh-CN',
};

export function bcp47Language(locale: string): string {
  return bcp47LanguageMap[locale] ?? locale;
}

export function useTranslations(locale: string) {
  return translations[locale] ?? translations['en'];
}

// URL path for a given locale: the default locale is unprefixed, others get
// a "/<code>/" prefix.
export function localeHref(locale: string): string {
  return locale === defaultLocale ? '/' : `/${locale}/`;
}
