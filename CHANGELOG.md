# Changelog

All notable changes to the Nexofy Digital site are documented here.

## [2.3.1] - 2026-08-15

### Fixed
- Compact icon-left service cards only kicked in at ≤560px, but cards go single-column
  at ≤720px — so at 561–720px (larger phones, landscape, resized windows) they still
  showed icon-on-top and looked unchanged. Extended the compact layout to ≤720px.

## [2.3.0] - 2026-08-15

### Added
- **Mobile enhancement pass.** Service cards go compact on phones — icon on the left,
  title beside it, description/tags/CTA full-width below; the decorative 01–06 index is
  hidden and the cursor-spotlight is disabled on touch. Applied to home, the /services
  hub and the service-page feature grids.
- Phone-tuned hero (smaller display type, full-width stacked CTAs), tighter section
  padding, smaller work visuals, and compact FAQ / CTA-band / about-panel spacing.
- Global `overflow-wrap: break-word` guard on display headings.

### Changed
- Asset cache-bust bumped to `?v=2.3.0`.

## [2.2.1] - 2026-08-14

### Fixed
- **Legal pages were unreadable on the dark theme.** Their inline styles used
  light-theme text colors (`#374151`, `#1f2937`, `#6b7280`) on the now-dark body —
  dark-on-dark. Rethemed the privacy/terms/data-deletion content for the dark palette
  (light text, lime headings, dark surfaces for info/step/warning boxes, lime links).

## [2.2.0] - 2026-08-14

### Added
- **Step-by-step "How we work" animation.** The four process steps now reveal
  sequentially on scroll — a lime progress rail fills across each step, the number
  lights up and the text slides in, 380ms apart (1→2→3→4). Same treatment on the
  service pages' "Who it's for" steps. Respects `prefers-reduced-motion` and degrades
  gracefully without JS.

### Changed
- Asset cache-bust bumped to `?v=2.2.0`.

## [2.1.3] - 2026-08-14

### Fixed
- **Legal pages had a stale footer** with a dead `/#portfolio` link and none of the new
  structure. Replaced all three (privacy/terms/data-deletion) with the standard footer
  (service links, "All services", Studio/Legal columns, social links).
- Legal-page nav "Services" pointed at the home `#services` anchor — now `/services`.
- Made asset paths root-relative (`/styles.css`, `/favicon.svg`, `/script.js`) on the
  home and legal pages so they resolve correctly at any URL depth.
- Full internal-link audit across all 12 pages: 0 broken links. Disallowed the stray
  `/responsive-test` dev page in robots.txt.

## [2.1.2] - 2026-08-14

### Changed
- Nav "Services" now links to the `/services` hub site-wide (was the home `#services`
  anchor) so the new service pages are reachable from the primary nav, not just by
  scrolling the landing page. Added a "View all services" link to the home services
  section header.

## [2.1.1] - 2026-08-14

### Added
- **`/services` hub page** listing all six services with cards, cross-links and its own
  `BreadcrumbList` + `ItemList` JSON-LD. Added to `sitemap.xml` and linked from every
  footer ("All services").

### Changed
- Service-page breadcrumbs and "All services" buttons now point to `/services` (a real
  page) instead of the home `#services` anchor. Regenerated via `build/gen-services.mjs`.

## [2.1.0] - 2026-08-14

### Added
- **Six per-service SEO landing pages** at clean, keyword-rich URLs:
  `/web-application-development`, `/android-app-development`, `/crm-cms-development`,
  `/epos-system`, `/restaurant-management-system`, `/inventory-management-software`.
  Each has a unique title/description/keywords, hero, "what you get" grid, "who it's
  for", tech tags, an FAQ accordion, a CTA band and cross-links to the other services.
- Structured data per page: `Service` + `BreadcrumbList` + `FAQPage` JSON-LD.
- `build/gen-services.mjs` — a dev-only static generator (content config + template)
  that emits the six pages. The site stays fully static.
- "Learn more" links on the home service cards, home footer now points to the real
  service pages, and all six URLs added to `sitemap.xml`.

### Changed
- New service-page styles (FAQ, CTA band, cross-link grid) in `styles.css`; asset
  cache-bust bumped to `?v=2.1.0`.

## [2.0.3] - 2026-08-14

### Added
- Google Analytics 4 (`gtag.js`, `G-3HV72B62E1`) on all pages.

### Changed
- CSP updated to allow GA: `script-src` gains `www.googletagmanager.com`; `connect-src`
  gains `www.googletagmanager.com`, `www.google-analytics.com` and its regional
  subdomains.

## [2.0.2] - 2026-08-14

### Added
- **SEO pass.** JSON-LD structured data (`ProfessionalService` + `WebSite`),
  `robots.txt`, `sitemap.xml` (clean URLs), `<link rel="canonical">` on every page,
  and a raster `og-image.png` (1200×630) so social previews actually render (SVG OG
  images don't). Expanded Open Graph + Twitter Card tags (site_name, locale, image
  dimensions/alt, explicit twitter title/description/image), `robots` directives with
  `max-image-preview:large`, `author`, and `apple-touch-icon`.

### Changed
- Keyword-optimized `<title>`, meta description and keywords across the home page and
  all three legal pages.

## [2.0.1] - 2026-08-14

### Fixed
- **Nav "Start a project" CTA rendered blank when scrolled to the contact section.**
  The scroll-spy added `.active` to the `#contact` link (which is the CTA), and
  `.nav-menu a.active` painted its text lime — lime-on-lime. Now the CTA is excluded
  from the scroll-spy and forced to `--accent-ink` even when active.
- **CSP blocked Cloudflare's analytics beacon** (`static.cloudflareinsights.com`).
  Added it to `script-src` and `cloudflareinsights.com` to `connect-src`.

### Added
- Per-character blink sweep on the logo wordmark and every "Start a project" CTA —
  a staggered start→end shimmer (respects `prefers-reduced-motion`).

### Changed
- Bumped asset cache-bust to `?v=2.0.1`.

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
