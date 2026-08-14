# Changelog

All notable changes to the Nexofy Digital site are documented here.

## [2.0.0] - 2026-08-14

### Changed
- **Full front-end redesign — "dark premium tech" direction.** Replaced the generic
  indigo/purple/pink glassmorphism + Inter look with an off-black canvas, a single
  controlled electric-lime accent (`#c6f24e`), fine grain overlay, and tabular
  monospace numerals.
- **Typography**: Space Grotesk (display) + Instrument Sans (body) + JetBrains Mono
  (numbers/labels), fluid `clamp()` type scale, negative tracking on display headers.
- **Layout**: hero rebuilt with grid-line backdrop + ambient glow; services moved from
  three equal columns to an asymmetric bento grid; work section rebuilt as full-width
  asymmetric rows (was a 3-card grid); added a numbered Process section and an About
  section with a sticky info/quote panel.
- **Content**: rewrote all copy to plain, specific language (removed AI clichés and
  fake round stats); stats now read 120+/50+/6yrs/4; portfolio links kept
  (ExpenseTrack live) with two capability showcases.
- **Interactivity**: staggered `IntersectionObserver` scroll reveals, cursor-tracked
  spotlight borders on service cards, scroll-spy active nav state, smooth mobile menu,
  full client-side form validation with inline errors + loading/success/error states.
- **Legal pages** (privacy/terms/data-deletion): navbar updated to the new wordmark +
  nav links; favicon + theme-color added. Inline light content styles untouched.

### Added
- CSS wordmark logo (`.logo-mark` + `.logo-word`) — no image dependency.
- `favicon.svg` (lime "N" mark) and `og-image.svg` social card; Open Graph / Twitter
  meta tags on the home page.
- Accessibility: skip-link, visible focus rings, `prefers-reduced-motion` handling,
  ARIA on the mobile menu and form status.

### Notes
- Stack unchanged: vanilla HTML/CSS/JS + `contact.php` (JSON `{name,email,service,message}`
  contract preserved). Deploy path and email flow unaffected.
- Old `logo.svg` / `logo-full.svg` left in place (no longer referenced by index).
