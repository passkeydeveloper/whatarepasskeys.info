// Minimal inline-link syntax for translation strings: `[label](url)`.
// Deliberately not full markdown and not raw HTML — translators can edit
// the surrounding prose freely without risking broken tags, and there's
// no need to trust/sanitize HTML from the locale JSON files.
const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

export type RichTextSegment = { text: string } | { link: string; href: string };

export function parseRichText(text: string): RichTextSegment[] {
  const segments: RichTextSegment[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(LINK_PATTERN)) {
    if (match.index! > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index) });
    }
    segments.push({ link: match[1], href: match[2] });
    lastIndex = match.index! + match[0].length;
  }
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex) });
  }
  return segments;
}

// For contexts that need plain text (e.g. schema.org Answer.text) — keeps
// the link label, drops the `[...](...)` syntax around it.
export function stripRichTextLinks(text: string): string {
  return text.replace(LINK_PATTERN, '$1');
}
