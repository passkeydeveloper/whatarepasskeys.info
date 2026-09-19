# What Are Passkeys?

[whatarepasskeys.info](https://whatarepasskeys.info) is a public education site that explains passkeys — what they are, how they work, and why they're safer than passwords — in plain language, without requiring any technical background.

The site walks through a single scroll-driven story: what a passkey is, how signing in works, why passwords keep failing, how passkeys resist phishing, and where passkeys are actually stored (your device or a credential manager like Apple Passwords, Google Password Manager, or a third-party app). It also includes an FAQ and a scored comparison of popular credential managers to help people pick one.

Every section has two reading levels, toggled at the top of the page:

- **Basic** — a plain-language explanation for anyone, regardless of technical background.
- **Advanced** — the same section with an added technical callout (cryptography, WebAuthn/FIDO2 details, protocol behavior) for readers who want the underlying mechanics.

This project exists because most sites that offer passkeys explain them poorly, if at all. It's maintained by the passkey community, for the public.

## Tech Stack

- [Astro](https://astro.build) (static output)
- [Tailwind CSS v4](https://tailwindcss.com)
- [GSAP](https://gsap.com) for scroll-driven animation
- [lucide-astro](https://lucide.dev) and [simple-icons](https://simpleicons.org) for iconography
- Deployed as a static site on [Cloudflare Pages](https://pages.cloudflare.com)

## Getting Started

### Prerequisites

- Node.js 22.12 or later (the repo's `.mise.toml` pins Node 24 if you use [mise](https://mise.jdx.dev))
- npm

### Setup

```sh
git clone https://github.com/passkeydeveloper/whatarepasskeys.info.git
cd whatarepasskeys.info
npm install
```

Running `npm install` also wires up a native Git pre-commit hook (via the `prepare` script) that validates any staged `.json` files are syntactically valid before allowing a commit. The hook lives at `.githooks/pre-commit`.

### Commands

All commands are run from the root of the project:

| Command             | Action                                        |
| :------------------- | :--------------------------------------------- |
| `npm run dev`         | Starts the local dev server at `localhost:4321` |
| `npm run build`       | Builds the production site to `./dist/`        |
| `npm run preview`     | Previews the production build locally          |
| `npm run astro ...`   | Runs Astro CLI commands (e.g. `astro check`)   |

## Project Structure

```text
/
├── src/
│   ├── components/
│   │   ├── layout/       # Header, footer, section-dot navigation
│   │   ├── sections/     # One component per page section (Hero, WhatIsAPasskey, FAQ, etc.)
│   │   └── icons/        # Credential manager brand icons
│   ├── i18n/
│   │   └── en.json       # All page copy, FAQ content, and credential manager scoring data
│   ├── layouts/          # Base page layout
│   ├── pages/            # Astro routes (locale-prefixed, e.g. /en/)
│   └── styles/           # Global Tailwind styles
├── functions/            # Cloudflare Pages Functions (analytics proxy)
├── public/               # Static assets (favicons, images, manifest)
└── .github/
    └── ISSUE_TEMPLATE/    # Structured issue forms for content, accessibility, i18n, etc.
```

Nearly all of the site's actual content — headlines, body copy, FAQ questions/answers, and credential manager descriptions and scores — lives in `src/i18n/en.json` rather than scattered across components. If you want to fix or improve wording, that file is almost always where to look first.

## Localization

Locales are just JSON files in `src/i18n/` — there's no config list to update. Every `<code>.json` in that directory (e.g. `en.json`, `es.json`, `fr.json`, `de.json`, `ja.json`) is automatically:

- picked up as an active locale at build time (`astro.config.mjs` reads the directory to build the `i18n.locales` list),
- routed at `/` for the default locale (`en`) and under `/<code>/` for every other locale (`src/pages/[locale]/index.astro` generates one static page per non-default locale), and
- listed in the language switcher in the header, labeled with that file's own `meta.nativeName` (e.g. `"Español"`, not "Spanish").

So adding a new language is just adding a new `src/i18n/<code>.json` file — no other file needs to change.

Each locale file mirrors the full structure of `en.json` (`meta`, `site`, `nav`, `hero`, `whatIsAPasskey`, `faq`, `credentialManagers`, etc.) — `en.json` is the reference to translate against, and `useTranslations()` in `src/i18n/utils.ts` falls back to it for any locale that isn't found. A few things worth knowing when translating:

- Inline links inside copy use a minimal `[label](url)` syntax (parsed by `src/i18n/richText.ts`) instead of raw HTML or Markdown, so translators can freely rewrite surrounding prose without risking broken markup.
- If a locale's routing code isn't already valid BCP-47 (used for `hreflang` and Open Graph locale tags), add a mapping in `bcp47LanguageMap` in `src/i18n/utils.ts`.
- Credential manager scores and comparisons in the `credentialManagers` section should stay consistent with `en.json` — see [CONTRIBUTING.md](CONTRIBUTING.md) if you're proposing a score change rather than a straight translation.

To report a translation issue or request a new locale, open an **Internationalization** issue from the [issue templates](https://github.com/passkeydeveloper/whatarepasskeys.info/issues/new/choose).

## Contributing

Contributions of all kinds are welcome — content corrections, new FAQ entries, accessibility fixes, credential manager updates, translations, and code improvements. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to get set up and submit changes, and [create an issue](https://github.com/passkeydeveloper/whatarepasskeys.info/issues/new/choose) to report problems or suggest content.

## License

- **Content** (all text, FAQ answers, comparisons, and credential manager scoring data) is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). You're free to share and adapt it, including commercially, as long as you give appropriate credit — for example: *"Content from whatarepasskeys.info, licensed under CC BY 4.0."*
- The full license text is in [LICENSE.md](LICENSE.md).

## Feedback

Have feedback on the site itself? Use the [feedback link](https://whatarepasskeys.info/feedback) on the site, or open an issue.
