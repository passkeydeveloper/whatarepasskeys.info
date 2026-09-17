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
   npm install
   ```

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

See the [README](README.md#project-structure) for an overview of where things live. Most content changes only touch `src/i18n/en.json`.

## Making Changes

### Content

Almost all page copy — headlines, body text, FAQ questions and answers, and credential manager descriptions — lives in `src/i18n/en.json`. If you're fixing wording or adding an FAQ entry, edit that file directly rather than the `.astro` components.

Content follows the site's two-tier structure: a **Basic** version for general readers, and an **Advanced** version (`techCallout` fields) that adds the underlying technical detail. When adding new content, try to match this pattern — plain-language first, technical detail as an addition, not a replacement.

Spelling is checked with [cspell](https://cspell.org) against `.cspell/dict.txt`. If you use a legitimate term (a product name, a technical acronym) that isn't recognized, add it to that dictionary rather than working around it.

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
