# SuhanVerse portfolio

Personal portfolio for Suhan Khadka, a Computer Engineering student focused on embedded systems and intelligent software.

Live site: https://suhanverse.github.io/

## Local development

Use Node.js 20 or newer and npm. Install the locked dependencies with `npm ci`, then run `npm run dev`.

- `npm run lint`: check JavaScript syntax, section links, local asset references, and duplicate IDs.
- `npm run build`: compile the source into `docs/` without source maps.
- `npm run preview`: serve the compiled site locally.
- `npm run clean`: remove local Parcel cache and generated `docs/` files.
- `npm run deploy`: build only; it does not commit, push, or publish.

## Structure

- `src/index.html`: semantic page content and project descriptions.
- `src/css/site.css`: current layout, themes, responsive rules, and focus styles.
- `src/js/index.js`: theme preference, dialog navigation, contact feedback, and year.
- `src/compressed/profile.webp` and `profile.jpg`: resized portrait served by the page.
- `src/cv.pdf`: downloadable résumé.
- `scripts/check-site.mjs`: dependency-free source checks.
- `docs/`: committed production build for GitHub Pages.
- `src/scss/` and `backup.html`: legacy layout material, not imported by the current page.

Edit source files, run the checks, rebuild `docs/`, and review the generated changes in a pull request. Confirm the Pages publishing configuration before merging; updating the publishing branch may deploy the site. Do not edit generated files directly. `.parcel-cache/` is local build state and must not be committed.

## Content and verification

Project summaries are based on the linked repositories. Update them when the underlying work changes; do not add unmeasured accuracy, speed, or reliability claims.

Before release, check keyboard navigation, the theme toggle with Enter/Space, menu opening/closing with Escape, section focus, both themes, reduced motion, and mobile widths from 320px upward. Check the CV download and external project links.

The contact form uses Formspree and retains a normal POST fallback without JavaScript. The enhanced form reports server acceptance or errors and preserves input on failure. Mocked tests cannot confirm email delivery: a real test submission and recipient confirmation are still required.

The image originals and older assets are retained for reference. Only the resized portrait is referenced by the current page. The old image conversion script is not part of the production build.

## License

Apache-2.0; see LICENSE.
