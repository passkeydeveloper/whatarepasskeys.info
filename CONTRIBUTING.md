# Contributing to whatarepasskeys.info

Thanks for your interest in improving this site. This project is maintained by the passkey community, and contributions of all kinds are welcome — content fixes, new FAQ entries, accessibility improvements, credential manager updates, translations, and code changes.

## Ways to Contribute

Most contributions start as a GitHub issue, using one of the templates under [.github/ISSUE_TEMPLATE](.github/ISSUE_TEMPLATE):

| Template | Use it for |
| :-- | :-- |
| **Bug report** | Something on the site is broken or behaving incorrectly |
| **Content request** | Wording, accuracy, or clarity changes to existing copy |
| **Missing FAQ** | A question you think the FAQ should answer but doesn't |
| **Docs fix** | Corrections to this repo's own documentation |
| **Accessibility** | Anything that makes the site harder to use with assistive technology |
| **Internationalization** | Translation issues or requests for a new locale |
| **Request credential manager** | Ask that a credential manager be added, updated, or rescored |

Blank issues are disabled — please pick the template that fits.

If you'd rather just open a pull request directly, that's fine too, especially for small, obvious fixes (typos, broken links).

## Development Setup

1. Fork and clone the repo:

   ```sh
   git clone https://github.com/<your-username>/whatarepasskeys.info.git
   cd whatarepasskeys.info
   npm run setup
   ```

   `npm run setup` installs project dependencies, wires up the Git pre-commit hook, and installs the [cspell](https://cspell.org) language dictionaries used to spell-check translated content. Plain `npm install` also works — the dictionaries are regular dev dependencies, so it installs the same things.

2. Start the dev server:

   ```sh
   npm run dev
   ```

   The site runs at `localhost:4321`.

3. Make your changes, then verify the production build still works:

   ```sh
   npm run build
   npm run preview
   ```

See the [README](README.md#project-structure) for an overview of where things live. Most content changes only touch `src/i18n/en.json`; translation changes touch the corresponding `src/i18n/<code>.json`.

## Making Changes

### Content

Almost all page copy — headlines, body text, FAQ questions and answers, and credential manager descriptions — lives in `src/i18n/en.json`, which is the English source of truth. If you're fixing wording or adding an FAQ entry, edit that file directly rather than the `.astro` components. New content should be added to `en.json` first — other locales fall back to English for anything they don't yet have translated.

Content follows the site's two-tier structure: a **Basic** version for general readers, and an **Advanced** version (`techCallout` fields) that adds the underlying technical detail. When adding new content, try to match this pattern — plain-language first, technical detail as an addition, not a replacement.

Spelling is checked with [cspell](https://cspell.org) — run `npm run spellcheck` to check the whole repo. English content is checked against `.cspell/dict.txt`; if you use a legitimate term (a product name, a technical acronym) that isn't recognized, add it to that dictionary rather than working around it.

Non-English locale files are checked against their own language dictionary (see `overrides` in `cspell.json`), installed via `npm run setup` / `npm run setup:languages`. Japanese (`ja.json`) is excluded from spellcheck — cspell has no Japanese dictionary package, since it checks whitespace-delimited words and Japanese doesn't tokenize that way. If you add a new locale that has a `@cspell/dict-<lang>` package available, add it to the `import` list and an `overrides` entry in `cspell.json`, and add its package to the `setup:languages` script in `package.json`.

### Translations

See the [README](README.md#localization) for how localization works — each language is a `src/i18n/<code>.json` file, and adding one is enough to make it live, with no other file to register it in.

When translating or updating a locale file:

- Match the structure of `en.json` exactly (same keys, same nesting) — that's what `en.json` is: the reference to translate against, and it should stay in sync with it.
- Set `meta.nativeName` to how the language names itself (e.g. `"Español"`, not "Spanish") — that's what shows up in the language switcher.
- Keep the `[label](url)` inline-link syntax (see `src/i18n/richText.ts`) rather than adding HTML or Markdown links.
- Don't change `credentialManagers` scores as part of a translation — those should stay consistent with `en.json`; propose a score change separately (see below).
- If you're adding a brand-new locale, open an **Internationalization** issue first so it can be discussed before a full-file PR.

### Credential Manager Scores

Credential manager comparisons and scores live in the `credentialManagers` section of `src/i18n/en.json`. If you're proposing a score change, please open a **Request credential manager** issue first, describing what changed and linking to a source (official docs, changelog, etc.) — scores should be verifiable, not based on personal preference.

### Code

- Keep changes scoped to the section/component you're touching; avoid unrelated refactors in the same PR.
- New pages/sections should follow the existing pattern in `src/components/sections/` and pull their copy from `src/i18n/en.json` rather than hardcoding text.
- A native Git pre-commit hook (set up automatically by `npm install`) validates that staged `.json` files are syntactically valid. It doesn't run tests or linting beyond that.

### Accessibility

This is an education site meant to work for everyone. If you're contributing UI changes, check that they work with keyboard navigation and a screen reader, and maintain sufficient color contrast.

## Submitting a Pull Request

1. Create a branch for your change.
2. Keep PRs focused — one fix or feature per PR makes review much faster.
3. Reference the issue your PR addresses, if one exists.
4. Make sure `npm run build` succeeds before opening the PR.

## License

By contributing, you agree that your contributions to this repository's content are licensed under [CC BY 4.0](LICENSE.md), the same license the rest of the site's content uses.
