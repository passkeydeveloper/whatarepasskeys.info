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

// Native-language names, shown in the language selector regardless of the
// current locale (e.g. "Español" is always "Español", never "Spanish").
// Sourced from each locale file's own meta.nativeName so a new locale
// doesn't need to be registered anywhere else.
export const localeNames: Record<string, string> = Object.fromEntries(
  locales.map((code) => [code, translations[code].meta?.nativeName ?? code])
);

export function useTranslations(locale: string) {
  return translations[locale] ?? translations['en'];
}
