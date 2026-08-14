// Static generator for Nexofy Digital per-service SEO landing pages.
// Run: node build/gen-services.mjs   → writes <slug>.html at the repo root.
// The site itself stays 100% static; this is a dev-only tool (like router.php).
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const V = '2.1.0'; // asset cache-bust version (keep in sync with styles.css/script.js)
const ORIGIN = 'https://nexofydigital.com';

const ICONS = {
  web: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  android: '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/>',
  crm: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/>',
  epos: '<rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/>',
  restaurant: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  inventory: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7L12 12l8.7-5M12 22V12"/>',
};

const SERVICES = [
  {
    slug: 'web-application-development', icon: 'web', nav: 'Web apps',
    name: 'Custom Web Application Development',
    title: 'Custom Web Application Development | Nexofy Digital',
    desc: 'We design and build fast, scalable custom web applications — dashboards, portals and internal tools — with modern stacks, tests and full handover. No lock-in.',
    keywords: 'custom web application development, web app development company, saas development, dashboard development, internal tools, react next.js developers',
    lead: 'Dashboards, customer portals and internal tools that stay fast as they grow — built on modern stacks, tested, and handed over with docs instead of a mystery box.',
    features: [
      ['Built to scale', 'Architecture that holds up as your data and traffic grow — no rewrite at 10,000 rows.'],
      ['Modern stack', 'React / Next.js on the front, Node, Go or PHP on the back, Postgres for data.'],
      ['Tested & documented', 'Automated tests and real docs so the next developer (or ours) can move fast.'],
      ['Role-based access', 'Granular permissions and audit trails baked in from the start, not bolted on.'],
      ['API-first', 'Clean APIs so your app talks to the tools you already use — payments, CRMs, email.'],
      ['Yours to own', 'You get the code, the pipeline and the servers. No vendor lock-in, ever.'],
    ],
    forWho: [
      ['Growing businesses', 'Replacing spreadsheets and manual processes with one system that scales.'],
      ['Startups', 'A production-ready MVP that won’t need a rebuild the moment it gets traction.'],
      ['Operations teams', 'Internal tools that fit the exact way your team works, not an off-the-shelf compromise.'],
    ],
    tags: ['React / Next.js', 'Node · Go · PHP', 'PostgreSQL', 'REST / GraphQL', 'Docker'],
    faqs: [
      ['How long does a custom web app take?', 'Most builds run 4–12 weeks depending on scope. We give you a fixed plan and timeline before any code is written.'],
      ['What does it cost?', 'Fixed-scope, fixed-price. After a short scoping call you get a real number — no open-ended hourly surprises.'],
      ['Do I own the code?', 'Yes. You get the full source, deployment pipeline and infrastructure access. There is no lock-in.'],
      ['Can you integrate with our existing systems?', 'Yes — payments, CRMs, ERPs, email and third-party APIs. Integration is a core part of most builds.'],
    ],
  },
  {
    slug: 'android-app-development', icon: 'android', nav: 'Android apps',
    name: 'Android App Development',
    title: 'Android App Development | Nexofy Digital',
    desc: 'Native Kotlin and cross-platform Android apps that feel right on the device, work offline and ship to the Play Store. Custom mobile app development from Nexofy Digital.',
    keywords: 'android app development, kotlin app development, mobile app development company, cross-platform apps, play store app development, offline mobile apps',
    lead: 'Native Kotlin and cross-platform Android apps that feel right on the device, behave offline, and ship to the Play Store without drama.',
    features: [
      ['Native feel', 'Kotlin builds that respect Android conventions — gestures, back-stack, material motion.'],
      ['Works offline', 'Local-first data with background sync so the app keeps working without signal.'],
      ['Play Store ready', 'We handle signing, store listing, releases and staged rollouts.'],
      ['Hardware access', 'Camera, GPS, barcode scanning, Bluetooth and notifications wired in properly.'],
      ['Secure by default', 'Encrypted storage, certificate pinning and least-privilege permissions.'],
      ['One backend', 'The app and your web dashboard can share a single API and source of truth.'],
    ],
    forWho: [
      ['Field teams', 'Apps for staff on the move — delivery, inventory counts, on-site data capture.'],
      ['Product owners', 'A polished consumer app with a roadmap, not a one-off throwaway.'],
      ['Retailers', 'A mobile companion to your POS — stock checks, orders, loyalty in one place.'],
    ],
    tags: ['Kotlin', 'Jetpack Compose', 'Offline sync', 'REST APIs', 'Play Store'],
    faqs: [
      ['Native or cross-platform?', 'We advise per project. Native Kotlin for performance-heavy or hardware-heavy apps; cross-platform when speed-to-market and a shared codebase matter more.'],
      ['Do you publish to the Play Store?', 'Yes — signing, store listing, review submission and staged rollouts are all handled.'],
      ['Can it work without internet?', 'Yes. We build local-first with background sync so the app stays usable offline and reconciles when it reconnects.'],
      ['Do you do iOS too?', 'Our focus is Android. For cross-platform builds an iOS target is often achievable — ask us during scoping.'],
    ],
  },
  {
    slug: 'crm-cms-development', icon: 'crm', nav: 'CRM / CMS',
    name: 'CRM & CMS Development',
    title: 'Custom CRM & CMS Development | Nexofy Digital',
    desc: 'Custom CRM and CMS platforms shaped around how your team actually works — sales pipelines, customer records and content management, without the bloat of off-the-shelf tools.',
    keywords: 'custom crm development, custom cms development, crm software company, sales pipeline software, content management system, customer management software',
    lead: 'Customer, sales and content systems shaped around how your team actually works — not a generic tool you bend your process around.',
    features: [
      ['Your pipeline, your way', 'Stages, fields and automations that match how you actually sell and support.'],
      ['One customer record', 'Contacts, deals, tickets and history in one place — no more scattered spreadsheets.'],
      ['Content management', 'Structured, editor-friendly CMS so non-technical staff update the site safely.'],
      ['Automation', 'Follow-ups, reminders and hand-offs that run themselves.'],
      ['Roles & permissions', 'Reps see their accounts, managers see the whole board — controlled to the field.'],
      ['Reports that matter', 'Dashboards built around your KPIs, not a vendor’s idea of them.'],
    ],
    forWho: [
      ['Sales teams', 'A pipeline they’ll actually use because it fits their day, not the other way round.'],
      ['Agencies', 'A CMS clients can edit without breaking, plus a CRM to run the account.'],
      ['Service businesses', 'Tickets, follow-ups and customer history in one honest source of truth.'],
    ],
    tags: ['Custom fields', 'Automations', 'Role-based access', 'Reporting', 'API integrations'],
    faqs: [
      ['Why not just use an off-the-shelf CRM?', 'If a standard tool fits, use it. We build custom when your process is the product — unusual pipelines, tight integrations, or per-seat pricing that stops making sense at scale.'],
      ['Can you migrate our existing data?', 'Yes — importing contacts, deals and content from spreadsheets or another platform is part of the build.'],
      ['Will non-technical staff be able to use it?', 'That’s the point. The CMS and CRM are built for the people using them daily, with sensible defaults and guardrails.'],
      ['Does it integrate with email and payments?', 'Yes — email, calendars, payment providers and other APIs connect into the same system.'],
    ],
  },
  {
    slug: 'epos-system', icon: 'epos', nav: 'ePOS',
    name: 'ePOS System Development',
    title: 'ePOS & Point of Sale System Development | Nexofy Digital',
    desc: 'Modern ePOS and point-of-sale systems with live inventory, split payments, receipts and reporting — for a single counter or a chain. Built and maintained by Nexofy Digital.',
    keywords: 'epos system, point of sale software, pos system development, retail pos, custom epos, inventory pos system, cloud pos',
    lead: 'Point of sale with live inventory, split payments, receipts and end-of-day reporting — for one counter or fifty, all sharing one source of truth.',
    features: [
      ['Fast at the counter', 'A till that keeps up at peak — barcode scan, quick keys, no lag.'],
      ['Live inventory', 'Every sale updates stock in real time, across every register and location.'],
      ['Split & mixed payments', 'Cash, card, wallet and split tenders handled cleanly with a printed or emailed receipt.'],
      ['Back office on the web', 'Products, prices, staff and reports managed from anywhere.'],
      ['End-of-day reporting', 'Z-reports, takings and variance you can trust at close.'],
      ['Multi-location', 'Run several branches from one dashboard with per-store stock and pricing.'],
    ],
    forWho: [
      ['Retail shops', 'A modern till with real inventory instead of a cash drawer and guesswork.'],
      ['Multi-branch stores', 'One system across locations with a single back office.'],
      ['Hardware & grocery', 'High-SKU counts, barcodes and fast throughput handled properly.'],
    ],
    tags: ['Barcode / SKU', 'Live inventory', 'Split payments', 'Receipts', 'Multi-location'],
    faqs: [
      ['Does it work on a tablet?', 'Yes — the till runs on a tablet at the counter and the back office runs on the web, sharing one database.'],
      ['Can it handle multiple stores?', 'Yes. Per-store stock and pricing roll up into one dashboard so you see the whole business.'],
      ['Does inventory update automatically?', 'Every sale, return and stock movement updates inventory in real time across all registers.'],
      ['Can we keep our receipt printer / scanner?', 'Usually — standard barcode scanners and receipt printers are supported. Tell us your hardware during scoping.'],
    ],
  },
  {
    slug: 'restaurant-management-system', icon: 'restaurant', nav: 'Restaurant',
    name: 'Restaurant Management System',
    title: 'Restaurant Management System Development | Nexofy Digital',
    desc: 'A complete restaurant management system — orders from table to kitchen display, menus, modifiers, tables and staff shifts in one screen. Built for a floor that never stops.',
    keywords: 'restaurant management system, restaurant pos, kitchen display system, table management software, restaurant ordering system, cafe management software',
    lead: 'Orders flow from table to kitchen display without paper. Menus, modifiers, tables and staff shifts in one system, built for a floor that doesn’t stop moving.',
    features: [
      ['Table to kitchen', 'Orders go straight to a kitchen display — no runners, no lost tickets.'],
      ['Menus & modifiers', 'Full menu control with modifiers, combos and 86’d items in real time.'],
      ['Table management', 'Floor plan, covers and status at a glance so the front of house flows.'],
      ['Split & merge bills', 'Split by item or guest, merge tables, and take mixed payments cleanly.'],
      ['Staff & shifts', 'Roles, clock-in and per-staff sales for accountability.'],
      ['Live reporting', 'Sales by item, hour and server — know what’s working while service is on.'],
    ],
    forWho: [
      ['Restaurants', 'One system for orders, kitchen, tables and payments instead of three.'],
      ['Cafes & QSR', 'Fast ordering and a kitchen display that keeps up at the rush.'],
      ['Small chains', 'Consistent menus and reporting across every location.'],
    ],
    tags: ['Kitchen display', 'Table plan', 'Modifiers', 'Split bills', 'Shift management'],
    faqs: [
      ['Does it include a kitchen display?', 'Yes — orders route from the table or till straight to a kitchen display screen, no printed tickets required.'],
      ['Can we split and merge bills?', 'Yes — split by item or guest, merge tables, and take partial and mixed payments.'],
      ['Can staff use it on tablets at the table?', 'Yes — take orders tableside on a tablet and they hit the kitchen instantly.'],
      ['Does it handle multiple branches?', 'Yes — shared menus and consolidated reporting across locations.'],
    ],
  },
  {
    slug: 'inventory-management-software', icon: 'inventory', nav: 'Inventory',
    name: 'Inventory Management Software',
    title: 'Inventory Management Software Development | Nexofy Digital',
    desc: 'Real-time inventory management software for hardware shops, retail and warehouses — barcode in, low-stock alerts out, and numbers you can trust at close. Built by Nexofy Digital.',
    keywords: 'inventory management software, stock management system, warehouse management software, barcode inventory system, stock control software, multi-location inventory',
    lead: 'Real-time stock for hardware shops, retail and warehouses — barcode in, low-stock alerts out, and numbers you can trust at close.',
    features: [
      ['Real-time stock', 'Every sale, return and transfer updates quantities instantly — no end-of-day guesswork.'],
      ['Barcode & SKU', 'Scan in, scan out. Fast counts and receiving with proper SKU management.'],
      ['Low-stock alerts', 'Automatic reorder points so you never run out of your best sellers.'],
      ['Multi-location', 'Track stock across shops and warehouses with transfers between them.'],
      ['Movement history', 'A full audit trail — opening stock, adjustments, sales — per item.'],
      ['Reports & valuation', 'Stock value, dead stock and fast-movers surfaced when you need them.'],
    ],
    forWho: [
      ['Hardware shops', 'High-SKU counts and barcodes handled without the spreadsheet chaos.'],
      ['Warehouses', 'Receiving, transfers and counts with a real audit trail.'],
      ['Retailers', 'Stock that stays accurate across every till and location.'],
    ],
    tags: ['Barcode / SKU', 'Low-stock alerts', 'Multi-location', 'Transfers', 'Audit trail'],
    faqs: [
      ['Does it connect to our POS?', 'Yes — our inventory and ePOS share one database, so sales decrement stock automatically. It can also integrate with an existing till.'],
      ['Can it track multiple warehouses?', 'Yes — per-location stock with transfers between shops and warehouses, all in one dashboard.'],
      ['Do we get low-stock alerts?', 'Yes — set reorder points per item and get alerted before you run out.'],
      ['Is there an audit trail?', 'Every stock movement is logged — opening stock, adjustments, sales and transfers — viewable per item.'],
    ],
  },
];

const NAV = `
    <nav class="navbar" id="navbar">
        <div class="container">
            <div class="nav-wrapper">
                <a href="/" class="logo" aria-label="Nexofy Digital home">
                    <span class="logo-mark" aria-hidden="true">N</span>
                    <span class="logo-word">Nexofy<span class="logo-dim">Digital</span></span>
                </a>
                <ul class="nav-menu">
                    <li><a href="/services">Services</a></li>
                    <li><a href="/#work">Work</a></li>
                    <li><a href="/#process">Process</a></li>
                    <li><a href="/#about">About</a></li>
                    <li><a href="/#contact" class="nav-cta">Start a project</a></li>
                </ul>
                <button class="mobile-menu-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-menu">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </div>
    </nav>`;

const FOOTER = `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section footer-brand">
                    <a href="/" class="logo" aria-label="Nexofy Digital home">
                        <span class="logo-mark" aria-hidden="true">N</span>
                        <span class="logo-word">Nexofy<span class="logo-dim">Digital</span></span>
                    </a>
                    <p>A software studio that ships. Web, mobile and the systems that run real businesses.</p>
                    <a href="/#contact" class="btn btn-ghost btn-sm">Start a project<span class="arrow">→</span></a>
                </div>
                <div class="footer-section">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="/web-application-development">Web applications</a></li>
                        <li><a href="/android-app-development">Android apps</a></li>
                        <li><a href="/crm-cms-development">CRM / CMS</a></li>
                        <li><a href="/inventory-management-software">ePOS &amp; inventory</a></li>
                        <li><a href="/services">All services</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Studio</h4>
                    <ul>
                        <li><a href="/#work">Work</a></li>
                        <li><a href="/#process">Process</a></li>
                        <li><a href="/#about">About</a></li>
                        <li><a href="/#contact">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="/privacy">Privacy policy</a></li>
                        <li><a href="/terms">Terms of service</a></li>
                        <li><a href="/data-deletion">Data deletion</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© 2026 Nexofy Digital. All rights reserved.</p>
                <div class="social-links">
                    <a href="https://www.linkedin.com/in/hamza-younas-10bb0562/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                    <a href="https://github.com/hamza-younas94" target="_blank" rel="noopener" aria-label="GitHub"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                </div>
            </div>
        </div>
    </footer>`;

const GA = `    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-3HV72B62E1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-3HV72B62E1');
    </script>`;

const icon = (key, cls) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${ICONS[key]}</svg>`;
const cardTitle = (s) => s.name.replace(' Development', '').replace(' System', '').replace(' Software', '');

function hubPage() {
  const url = `${ORIGIN}/services`;
  const title = 'Our Services — Custom Software, Web &amp; Android App Development | Nexofy Digital';
  const desc = 'Everything Nexofy Digital designs and builds: custom web apps, Android apps, CRM/CMS platforms, ePOS, restaurant management and inventory systems.';
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: url },
        ],
      },
      {
        '@type': 'ItemList',
        itemListElement: SERVICES.map((s, i) => ({
          '@type': 'ListItem', position: i + 1, name: s.name, url: `${ORIGIN}/${s.slug}`,
        })),
      },
    ],
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
${GA}
    <title>${title}</title>
    <meta name="description" content="${desc}">
    <meta name="keywords" content="software development services, custom software, web development, android app development, crm cms, epos, inventory management, Nexofy Digital">
    <meta name="author" content="Nexofy Digital">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <meta name="theme-color" content="#0a0b0d">
    <link rel="canonical" href="${url}">

    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Nexofy Digital">
    <meta property="og:locale" content="en_US">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${ORIGIN}/og-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${desc}">
    <meta name="twitter:image" content="${ORIGIN}/og-image.png">

    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="apple-touch-icon" href="/favicon.svg">
    <link rel="stylesheet" href="/styles.css?v=${V}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

    <script type="application/ld+json">
${JSON.stringify(jsonld, null, 2)}
    </script>
</head>
<body>
    <a href="#grid" class="skip-link">Skip to content</a>
${NAV}

    <main>
    <section class="hero svc-hero">
        <div class="hero-grid-lines" aria-hidden="true"></div>
        <div class="hero-glow" aria-hidden="true"></div>
        <div class="container">
            <div class="hero-inner reveal">
                <p class="eyebrow"><span class="pulse"></span>What we do</p>
                <h1 class="hero-title">Everything we <span class="accent-text">build</span>.</h1>
                <p class="hero-subtitle">Six things we're genuinely good at. Pick one, or hand us the whole stack — each is a system we've shipped to production and still maintain.</p>
                <div class="hero-buttons">
                    <a href="/#contact" class="btn btn-primary">Start a project</a>
                    <a href="/#work" class="btn btn-ghost">See recent work<span class="arrow">→</span></a>
                </div>
            </div>
        </div>
    </section>

    <section id="grid" class="services section" style="padding-top:0">
        <div class="container">
            <div class="services-grid">
                ${SERVICES.map((s, i) => `<article class="service-card reveal">
                    <div class="service-index">${String(i + 1).padStart(2, '0')}</div>
                    <div class="service-icon" aria-hidden="true">${icon(s.icon)}</div>
                    <h3>${cardTitle(s)}</h3>
                    <p>${s.lead}</p>
                    <a class="service-more" href="/${s.slug}">Learn more<span class="arrow">→</span></a>
                </article>`).join('\n                ')}
            </div>
        </div>
    </section>

    <section class="section" style="padding-top:0">
        <div class="container">
            <div class="cta-band reveal">
                <h2>Not sure which one you need?</h2>
                <p>Tell us the problem in a sentence or two. We'll point you at the right fit — or tell you honestly if it's not us.</p>
                <a href="/#contact" class="btn btn-primary">Start a project</a>
            </div>
        </div>
    </section>
    </main>
${FOOTER}

    <div class="grain" aria-hidden="true"></div>
    <script src="/script.js?v=${V}"></script>
</body>
</html>
`;
}

function page(s) {
  const url = `${ORIGIN}/${s.slug}`;
  const others = SERVICES.filter((x) => x.slug !== s.slug);
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service', '@id': `${url}#service`, name: s.name, serviceType: s.name,
        description: s.desc, url,
        provider: { '@type': 'ProfessionalService', name: 'Nexofy Digital', url: `${ORIGIN}/` },
        areaServed: 'Worldwide',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${ORIGIN}/services` },
          { '@type': 'ListItem', position: 3, name: s.name, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: s.faqs.map(([q, a]) => ({
          '@type': 'Question', name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
${GA}
    <title>${s.title}</title>
    <meta name="description" content="${s.desc}">
    <meta name="keywords" content="${s.keywords}">
    <meta name="author" content="Nexofy Digital">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <meta name="theme-color" content="#0a0b0d">
    <link rel="canonical" href="${url}">

    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Nexofy Digital">
    <meta property="og:locale" content="en_US">
    <meta property="og:title" content="${s.title}">
    <meta property="og:description" content="${s.desc}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${ORIGIN}/og-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${s.title}">
    <meta name="twitter:description" content="${s.desc}">
    <meta name="twitter:image" content="${ORIGIN}/og-image.png">

    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="apple-touch-icon" href="/favicon.svg">
    <link rel="stylesheet" href="/styles.css?v=${V}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

    <script type="application/ld+json">
${JSON.stringify(jsonld, null, 2)}
    </script>
</head>
<body>
    <a href="#what" class="skip-link">Skip to content</a>
${NAV}

    <main>
    <section class="hero svc-hero">
        <div class="hero-grid-lines" aria-hidden="true"></div>
        <div class="hero-glow" aria-hidden="true"></div>
        <div class="container">
            <div class="hero-inner reveal">
                <p class="eyebrow breadcrumb"><a href="/services">Services</a> · ${s.nav}</p>
                <h1 class="hero-title">${s.name.replace(/ ([^ ]+)$/, ' <span class="accent-text">$1</span>')}</h1>
                <p class="hero-subtitle">${s.lead}</p>
                <div class="hero-buttons">
                    <a href="/#contact" class="btn btn-primary">Start a project</a>
                    <a href="/services" class="btn btn-ghost">All services<span class="arrow">→</span></a>
                </div>
            </div>
        </div>
    </section>

    <section id="what" class="services section">
        <div class="container">
            <header class="section-header reveal">
                <p class="eyebrow">What you get</p>
                <h2>Built around your ${s.nav.toLowerCase()}, not a template.</h2>
            </header>
            <div class="services-grid">
                ${s.features.map((f, i) => `<article class="service-card reveal">
                    <div class="service-index">${String(i + 1).padStart(2, '0')}</div>
                    <div class="service-icon" aria-hidden="true">${icon(s.icon)}</div>
                    <h3>${f[0]}</h3>
                    <p>${f[1]}</p>
                </article>`).join('\n                ')}
            </div>
        </div>
    </section>

    <section class="process section">
        <div class="container">
            <header class="section-header reveal">
                <p class="eyebrow">Who it’s for</p>
                <h2>Made for teams that need it to just work.</h2>
            </header>
            <ol class="process-steps">
                ${s.forWho.map((w, i) => `<li class="process-step reveal">
                    <span class="step-num">${String(i + 1).padStart(2, '0')}</span>
                    <h3>${w[0]}</h3>
                    <p>${w[1]}</p>
                </li>`).join('\n                ')}
            </ol>
        </div>
    </section>

    <section class="section" style="padding-top:0">
        <div class="container">
            <ul class="service-tags reveal">${s.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
        </div>
    </section>

    <section class="section" style="padding-top:0">
        <div class="container">
            <header class="section-header reveal">
                <p class="eyebrow">FAQ</p>
                <h2>Questions, answered.</h2>
            </header>
            <div class="faq reveal">
                ${s.faqs.map(([q, a]) => `<details class="faq-item">
                    <summary class="faq-q">${q}</summary>
                    <div class="faq-a">${a}</div>
                </details>`).join('\n                ')}
            </div>
        </div>
    </section>

    <section class="section" style="padding-top:0">
        <div class="container">
            <div class="cta-band reveal">
                <h2>Let’s build your ${s.nav.toLowerCase()}.</h2>
                <p>Tell us what you need in a sentence or two. We’ll reply within a day with questions or a call.</p>
                <a href="/#contact" class="btn btn-primary">Start a project</a>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <header class="section-header reveal">
                <p class="eyebrow">More services</p>
                <h2>Explore what else we build.</h2>
            </header>
            <div class="svc-cross reveal">
                ${others.map((o) => `<a href="/${o.slug}">
                    <span class="ic" aria-hidden="true">${icon(o.icon)}</span>
                    <b>${o.name.replace(' Development', '').replace(' System', '').replace(' Software', '')}</b>
                    <span class="arrow" aria-hidden="true">→</span>
                </a>`).join('\n                ')}
            </div>
        </div>
    </section>
    </main>
${FOOTER}

    <div class="grain" aria-hidden="true"></div>
    <script src="/script.js?v=${V}"></script>
</body>
</html>
`;
}

for (const s of SERVICES) {
  const out = resolve(ROOT, `${s.slug}.html`);
  writeFileSync(out, page(s));
  console.log('wrote', `${s.slug}.html`);
}
writeFileSync(resolve(ROOT, 'services.html'), hubPage());
console.log('wrote services.html (hub)');
console.log(`\n${SERVICES.length} service pages + 1 hub generated (v${V}).`);
console.log('Slugs:', SERVICES.map((s) => '/' + s.slug).join('  '));
