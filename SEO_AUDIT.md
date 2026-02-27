# SEO Audit Report — Opentechiz Website
**Audit Date:** 2026-02-27
**Skill:** seo-audit v1.0.0 (coreyhaines31/marketingskills)
**Site Type:** B2B Company / SaaS-style
**Scope:** Technical SEO · On-Page · Content Quality · Schema · E-E-A-T
**Method:** Direct source-file audit (all 6 HTML pages + nginx.conf + robots.txt + sitemap.xml)

> ⚠️ Schema detection note: JSON-LD was verified by reading raw HTML source directly — not via `web_fetch` — so results are accurate.

---

## Executive Summary

Opentechiz has a **structurally sound but pre-launch-incomplete** website. The foundation is good: every page has a canonical URL, meta description, `robots: index, follow`, breadcrumb navigation, and Nginx is correctly configured for gzip, caching, and clean URLs. JSON-LD Organization schema exists on the homepage.

However, the site has **4 launch-blocking gaps** that will materially harm social sharing, crawl quality, and lead conversion from day one:

1. **All images referenced in meta tags and schema don't exist** — the `/images/` directory is empty.
2. **No favicon** on any page.
3. **Contact form submits nowhere** — every organic lead is silently lost.
4. **Meta descriptions on 4 of 6 pages exceed 160 characters** — Google will rewrite them.

Beyond launch blockers, the site has **zero long-tail content** (no blog, no pricing page), which limits organic reach to 6 brand/service pages competing in a crowded "product engineering company" market.

**Overall SEO Health: 52 / 100**

| Dimension | Score | Status |
|-----------|-------|--------|
| Crawlability & Indexation | 8/10 | Good |
| Technical Foundations | 5/10 | Gaps |
| On-Page Optimization | 6/10 | Needs work |
| Content Quality / E-E-A-T | 3/10 | Weak |
| Authority & Links | 1/10 | Missing |

---

## Top 5 Priority Issues

| # | Issue | Impact |
|---|-------|--------|
| 1 | `/images/` is empty — OG image, logo.png, favicon don't exist on disk | Social previews broken sitewide; schema logo invalid |
| 2 | Contact form is non-functional (client-side simulation only) | Every organic lead is permanently lost |
| 3 | Meta descriptions too long on 4/6 pages (up to 178 chars) | Google rewrites them; messaging control lost |
| 4 | No structured data on 5 inner pages | Missing `BreadcrumbList`, `Service`, `ContactPage` schema |
| 5 | No blog, no pricing page, no long-tail content | Organic reach capped at 6 pages; zero content moat |

---

## Technical SEO Findings

---

**Issue T-01: No favicon on any page**
- **Impact:** High
- **Evidence:** All 6 HTML files — no `<link rel="icon">` or `<link rel="apple-touch-icon">` in any `<head>`
- **Fix:** Add to all pages:
  ```html
  <link rel="icon" type="image/png" href="/images/favicon.png">
  <link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
  ```
- **Priority:** P1 — blocks SERP favicon display

---

**Issue T-02: og:image file does not exist**
- **Impact:** High
- **Evidence:** `index.html:18` — `og:image` points to `https://opentechiz.com/images/og-image.jpg`; `images/` directory is empty
- **Fix:** Create a 1200×630px JPG at `/images/og-image.jpg` before launch
- **Priority:** P1 — LinkedIn, X, Slack, WhatsApp previews will show a broken/blank image

---

**Issue T-03: og:image missing entirely on 5 inner pages**
- **Impact:** High
- **Evidence:** `about.html`, `services.html`, `technology.html`, `projects.html`, `contact.html` — no `<meta property="og:image">` tag
- **Fix:** Add `og:image` to all inner pages (same image initially is fine)
- **Priority:** P1

---

**Issue T-04: Twitter Card tags missing from all inner pages**
- **Impact:** Medium
- **Evidence:** Only `index.html` has partial Twitter/X Card tags (no `twitter:image` even there). All 5 inner pages have zero `<meta name="twitter:*">` tags.
- **Fix:** Add to all pages:
  ```html
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="...">
  <meta name="twitter:description" content="...">
  <meta name="twitter:image" content="https://opentechiz.com/images/og-image.jpg">
  ```
- **Priority:** P1

---

**Issue T-05: JSON-LD `logo` and `sameAs` reference broken/self-circular values**
- **Impact:** Medium
- **Evidence:** `index.html:40` — `"logo": "https://opentechiz.com/images/logo.png"` (file doesn't exist); `index.html:46` — `"sameAs": ["https://opentechiz.com"]` (points to itself, not external profiles)
- **Fix:** Upload `logo.png` (min 112×112px square); add real external profiles (LinkedIn, Clutch, GitHub) to `sameAs`
- **Priority:** P2

---

**Issue T-06: Sitemap `lastmod` dates are stale**
- **Impact:** Low–Medium
- **Evidence:** `sitemap.xml:5,10,15,20,25,30` — all 6 entries show `<lastmod>2025-02-25</lastmod>` (over a year ago)
- **Fix:** Update to current date; automate with a build/deploy hook if possible
- **Priority:** P2

---

**Issue T-07: Contact page sitemap priority is too low**
- **Impact:** Low
- **Evidence:** `sitemap.xml:36` — `<priority>0.6</priority>` and `<changefreq>yearly</changefreq>` for the primary conversion page
- **Fix:** Raise to `priority: 0.8`, `changefreq: monthly`
- **Priority:** P3

---

**Issue T-08: `<meta name="viewport">` appears after inline script**
- **Impact:** Low
- **Evidence:** All 6 pages `head:5-6` — inline theme-detection IIFE runs before viewport meta tag
- **Fix:** Move `<meta name="viewport">` above the inline `<script>` block
- **Priority:** P3

---

**Issue T-09: No `<meta name="theme-color">` for mobile browsers**
- **Impact:** Low
- **Evidence:** All 6 pages — missing
- **Fix:** `<meta name="theme-color" content="#080d1a">`
- **Priority:** P3

---

**Issue T-10: No `hreflang` for international targeting**
- **Impact:** Medium
- **Evidence:** Site explicitly targets EU, AU, US (every page lists these markets). No `<link rel="alternate" hreflang="...">` on any page.
- **Fix:** At minimum add `<link rel="alternate" hreflang="en" href="https://opentechiz.com/">`. If region-specific landing pages are planned, add per-country variants.
- **Priority:** P3

---

**Issue T-11: No custom 404 page**
- **Impact:** Medium
- **Evidence:** `nginx.conf` — Nginx is configured with `try_files` but no `error_page 404` directive pointing to a branded 404 page. Broken links send users to a bare Nginx 404.
- **Fix:** Create `404.html` and add `error_page 404 /404.html;` to nginx.conf
- **Priority:** P2

---

**Issue T-12: No `<main>` landmark element**
- **Impact:** Medium (accessibility + crawl clarity)
- **Evidence:** All 6 pages — content sections live directly inside `<body>` without a `<main>` wrapper
- **Fix:** Wrap primary page content in `<main role="main">...</main>`
- **Priority:** P2

---

**PASS — Robots.txt** ✓
Correctly allows all crawlers and references the sitemap. No accidental blocks.

**PASS — Canonical URLs** ✓
Every page has a unique, correctly formatted canonical tag.

**PASS — Gzip + Caching** ✓
Nginx enables gzip for CSS/JS/JSON/SVG/fonts; cache-control headers set (30 days for assets, no-cache for HTML).

**PASS — Google Fonts** ✓
`display=swap` parameter present; `preconnect` hints for both `fonts.googleapis.com` and `fonts.gstatic.com`.

**PASS — Sitemap coverage** ✓
All 6 pages listed with correct priority weighting (homepage 1.0, services 0.9).

**PASS — Mobile viewport** ✓
`<meta name="viewport" content="width=device-width, initial-scale=1.0">` on all pages.

---

## On-Page SEO Findings

### Title Tags

| Page | Title | Chars | Status |
|------|-------|-------|--------|
| index.html | Opentechiz \| Scalable Platform & AI Engineering Partner | 55 | ✓ |
| about.html | About Us \| Opentechiz - 70-Engineer Product Engineering Company | 63 | ⚠️ Slightly long |
| services.html | Services \| Opentechiz - Ecommerce, Product Engineering & AI Solutions | **69** | ✗ Too long |
| technology.html | Technology \| Opentechiz - Full-Stack Engineering Capabilities | 61 | ✓ |
| projects.html | Projects \| Opentechiz - Glamira, Mektoube, Moët Hennessy & More | 64 | ⚠️ Slightly long |
| contact.html | Contact Us \| Opentechiz - Get a Free Engineering Consultation | 61 | ✓ |

**Issue O-01: services.html title is 69 characters (truncated in SERP)**
- **Impact:** Medium
- **Fix:** Shorten to: `Ecommerce, AI & Product Engineering Services | Opentechiz` (57 chars)
- **Priority:** P2

---

### Meta Descriptions

| Page | Chars | Status |
|------|-------|--------|
| index.html | 173 | ✗ Too long |
| about.html | 166 | ⚠️ Slightly long |
| services.html | **178** | ✗ Too long |
| technology.html | 139 | ✓ |
| projects.html | 172 | ✗ Too long |
| contact.html | 157 | ⚠️ At limit |

**Issue O-02: Meta descriptions exceed 160 chars on 4/6 pages**
- **Impact:** High — Google rewrites descriptions exceeding ~160 chars, often pulling random body text that may not align with CTA
- **Evidence:** `index.html:8` (173 chars), `services.html:8` (178 chars), `projects.html:8` (172 chars), `about.html:8` (166 chars)
- **Fix (examples):**
  - index: *"70-engineer product engineering company. We build scalable ecommerce platforms, AI-driven systems, and digital infrastructure for global brands."* (146 chars)
  - services: *"Ecommerce platforms, scalable product engineering, and AI-driven solutions. Magento, Shopify, LLM, RAG — built by 70+ engineers."* (128 chars)
- **Priority:** P1

---

### Heading Structure

**PASS — H1:** Every page has exactly one `<h1>`, keyword-relevant, no duplication. ✓

**PASS — Hierarchy:** H1 → H2 → H3 flow is logical across all pages. ✓

---

### Internal Linking

**PASS — Navigation:** All 6 pages linked from top nav and footer on every page. ✓

**PASS — Breadcrumbs:** Present on all 5 inner pages. ✓

**Issue O-03: Footer "Services" links inconsistent across pages**
- **Impact:** Low
- **Evidence:** `index.html` footer — links to `services.html` (no anchor). `services.html` footer — links to `services.html#ecommerce`, `#product-engineering`, `#ai-driven`. Other pages use the no-anchor version.
- **Fix:** Standardize all footer service links to use anchor targets sitewide
- **Priority:** P3

---

### Image Optimization

**Issue O-04: No `<img>` tags exist on any page — all visuals are SVG icons or emoji**
- **Impact:** Medium
- **Evidence:** All 6 pages — zero `<img>` elements. Hero uses CSS gradient blobs; stat cards use emoji (👥🚀🤖🌏); project/capability sections use emoji as icons.
- **Fix:** Add real imagery (team photos, client screenshots, infographics) with descriptive `alt` text. Emoji in `aria-hidden` containers are invisible to screen readers and offer no image SEO signal.
- **Priority:** P2

---

### Keyword Targeting

**PASS — Keyword alignment:** Each page has a clear primary keyword expressed in the title, H1, and first paragraph. No obvious cannibalization across the 6 pages. ✓

**Issue O-05: No target keywords for "Vietnam software company" or offshore engineering**
- **Impact:** Medium
- **Evidence:** `index.html:9` — meta keywords include "Vietnam software company" but the visible page content never uses "Vietnam" or "offshore" — creating a signals mismatch
- **Fix:** Either remove "Vietnam software company" from keywords (Google ignores this tag anyway) or add visible content targeting it (e.g., "Vietnam-based engineering team")
- **Priority:** P3

---

## Content Quality / E-E-A-T Findings

**Issue C-01: Contact form has no backend — all leads are lost**
- **Impact:** High (conversion-critical)
- **Evidence:** `contact.html:81` — `<form id="contactForm" novalidate>` has no `action` attribute; `js/main.js` intercepts submit and shows a fake "Thank you" after 1.2s timeout with no actual submission
- **Fix:** Integrate a real form backend before launch: Formspree, Netlify Forms, EmailJS, or a backend endpoint
- **Priority:** P1

---

**Issue C-02: No blog, no long-form content**
- **Impact:** High (long-term organic growth)
- **Evidence:** Sitemap has 6 pages total. No `/blog`, `/insights`, `/resources`, or `/case-studies` section exists.
- **Impact detail:** For "product engineering company", "Magento agency", "AI ecommerce integration" — the site competes only with 6 pages. Agencies with blogs ranking for "Magento vs Shopify", "how to scale ecommerce", etc. will dominate.
- **Fix:** Create a `/blog` section. Priority topics: Magento vs Shopify comparisons, AI in ecommerce, scaling engineering teams, LLM for product recommendations.
- **Priority:** P1 (strategic)

---

**Issue C-03: No pricing page**
- **Impact:** High
- **Evidence:** Navigation: Home, About, Services, Technology, Projects + CTA. No pricing or engagement models page.
- **Fix:** Create `/pricing.html` or `/engagement-models.html` with at least pricing signals (ranges, models). B2B buyers qualify vendors on price before contacting.
- **Priority:** P1 (strategic)

---

**Issue C-04: No measurable outcomes in project case studies**
- **Impact:** High (E-E-A-T: Experience)
- **Evidence:** `projects.html` — GLAMIRA section lists features built but zero metrics. "Re-architected the platform" with no before/after numbers. MEKTOUBE: "millions of registered users" mentioned in body copy, not as a result of Opentechiz's work.
- **Fix:** Add 1–2 quantified outcomes per project: "Reduced page load time from 8s to 1.2s", "Scaled from 10K to 2M daily users", "Increased conversion rate by 18%"
- **Priority:** P2

---

**Issue C-05: No named team members or author credentials**
- **Impact:** High (E-E-A-T: Expertise, Authoritativeness)
- **Evidence:** `about.html` — mentions "70 engineers" but no names, titles, photos, or LinkedIn links for any team member or leader
- **Fix:** Add a "Leadership" or "Key Engineers" section to `about.html` with at minimum: name, role, area of expertise, LinkedIn link
- **Priority:** P2

---

**Issue C-06: No social media links on the site**
- **Impact:** Medium (E-E-A-T: Trustworthiness)
- **Evidence:** All pages — footer contains only internal links and an email address. No LinkedIn, GitHub, Clutch, or any external profile links.
- **Fix:** Add LinkedIn profile link (at minimum) to footer. Link to Clutch profile if one exists.
- **Priority:** P2

---

**Issue C-07: No privacy policy or terms page**
- **Impact:** Medium (E-E-A-T: Trustworthiness)
- **Evidence:** No `/privacy.html`, `/terms.html`, or equivalent. Not linked from footer.
- **Fix:** Create a basic privacy policy (especially important given the contact form collects email addresses) and link from footer
- **Priority:** P2

---

**Issue C-08: Copyright year is outdated**
- **Impact:** Low (trust signal)
- **Evidence:** All 6 pages footer — `© 2025 Opentechiz. All rights reserved.` Current year is 2026.
- **Fix:** Update to 2026, or use `<span id="year"></span>` + JS `document.getElementById('year').textContent = new Date().getFullYear()`
- **Priority:** P3 — Quick Win

---

**Issue C-09: No phone number or physical address**
- **Impact:** Medium (E-E-A-T, schema completeness)
- **Evidence:** `contact.html:144-184` — contact info card shows email, website, markets, response time only. No phone, no address.
- **Fix:** Add phone number and company registered address (Vietnam HQ). Also add to JSON-LD `Organization` schema.
- **Priority:** P2

---

**Issue C-10: Hero stat cards hidden from screen readers**
- **Impact:** Medium (accessibility + SEO signals)
- **Evidence:** `index.html:118` — `<div class="hero-visual" aria-hidden="true">` wraps 4 stat cards with key business claims (70+ engineers, 50+ projects)
- **Fix:** Remove `aria-hidden="true"` from the wrapper — the stats bar below provides visual duplication but screen readers and Googlebot should see the hero stats
- **Priority:** P2

---

## Schema / Structured Data Findings

> ⚠️ Schema was verified by reading raw HTML source directly — not via `web_fetch`. Results are accurate.

**Issue S-01: JSON-LD missing from 5 of 6 pages**
- **Impact:** High
- **Evidence:** Only `index.html` contains a `<script type="application/ld+json">` block. All inner pages have none.
- **Fix:**
  - All inner pages: Add `BreadcrumbList` schema (breadcrumbs are already in the HTML, just not in schema)
  - `services.html`: Add `Service` schema for each of the 3 service sections
  - `contact.html`: Add `ContactPage` schema
  - `projects.html`: Add `ItemList` or `CreativeWork` schema per project
- **Priority:** P2

---

**Issue S-02: `sameAs` is self-referential**
- **Impact:** Medium
- **Evidence:** `index.html:46` — `"sameAs": ["https://opentechiz.com"]` — the only entry points back to itself
- **Fix:** Replace with real external profiles: LinkedIn company page, Clutch profile, GitHub org, etc.
- **Priority:** P2

---

**Issue S-03: Organization schema missing `address` and `telephone`**
- **Impact:** Medium
- **Evidence:** `index.html:34-48` — `Organization` schema has `name`, `url`, `logo`, `description`, `email`, `areaServed`, `numberOfEmployees`, `knowsAbout`, `sameAs` — but no `address` or `telephone`
- **Fix:**
  ```json
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "VN"
  },
  "telephone": "+84-xxx-xxx-xxxx"
  ```
- **Priority:** P2

---

**PASS — Homepage Organization schema structure** ✓
Correct use of `@context`, `@type`, `numberOfEmployees` with `QuantitativeValue`, `areaServed` array.

---

## Prioritized Action Plan

### Phase 1 — Launch Blockers (do before going live)

| Task | File(s) | Effort |
|------|---------|--------|
| Create `og-image.jpg` (1200×630px) and `logo.png` (112×112px) | `/images/` | Low |
| Create `favicon.png` and `apple-touch-icon.png` | `/images/` | Low |
| Add `<link rel="icon">` + `<link rel="apple-touch-icon">` to all pages | All 6 HTML | Low |
| Add `og:image` and full Twitter Card tags to all 5 inner pages | Inner 5 HTML | Low |
| Integrate real form backend (Formspree/EmailJS/endpoint) | `contact.html`, `main.js` | Medium |
| Trim meta descriptions to 120–155 chars on `index`, `services`, `about`, `projects` | 4 HTML files | Low |
| Shorten `services.html` title to ≤60 chars | `services.html` | Low |
| Update copyright year to 2026 | All 6 HTML | Low |

---

### Phase 2 — High-Impact SEO (first sprint post-launch)

| Task | File(s) | Effort |
|------|---------|--------|
| Add `BreadcrumbList` JSON-LD to all 5 inner pages | Inner 5 HTML | Medium |
| Add `Service` schema to `services.html` (3 services) | `services.html` | Medium |
| Add `ContactPage` schema to `contact.html` | `contact.html` | Low |
| Add `<main>` landmark to all pages | All 6 HTML | Low |
| Update `Organization` schema: real `sameAs`, add `address` + `telephone` | `index.html` | Low |
| Add LinkedIn + Clutch links to footer | All 6 HTML | Low |
| Create privacy policy page + link from footer | New file | Medium |
| Add 1–2 outcome metrics per project on `projects.html` | `projects.html` | Low |
| Create 404.html + configure Nginx `error_page 404` | New file + `nginx.conf` | Low |
| Update sitemap `lastmod` dates | `sitemap.xml` | Low |

---

### Phase 3 — Content & Authority (ongoing)

| Task | Notes | Effort |
|------|-------|--------|
| Add leadership/team section to `about.html` | Names, roles, LinkedIn | Medium |
| Create `/pricing.html` or `/engagement-models.html` | Even ranges help qualify buyers | High |
| Create blog/insights section | 6–10 articles targeting "Magento vs Shopify", "AI ecommerce", etc. | High |
| Add phone number + address to `contact.html` and schema | Coordinate with business team | Low |
| Add `hreflang` for international targeting | Requires URL strategy decision | Medium |

---

## Quick Wins — Fix This Sprint

These can all be done in under 2 hours of dev time:

| # | What | Where | Impact |
|---|------|-------|--------|
| 1 | Trim meta descriptions to ≤155 chars | `index`, `about`, `services`, `projects` | High |
| 2 | Add `og:image` to 5 inner pages (reuse homepage image) | 5 HTML files | High |
| 3 | Add Twitter Card tags to all 6 pages | All 6 HTML files | Medium |
| 4 | Add `<link rel="icon">` to all pages | All 6 HTML files | High |
| 5 | Update copyright `2025` → `2026` | All 6 HTML files (footer) | Low |
| 6 | Shorten `services.html` title to ≤60 chars | `services.html:7` | Medium |
| 7 | Raise sitemap contact priority `0.6` → `0.8`, changefreq `yearly` → `monthly` | `sitemap.xml` | Low |
| 8 | Update all sitemap `lastmod` to today | `sitemap.xml` | Low |
| 9 | Move `<meta name="viewport">` above inline script | All 6 HTML `<head>` | Low |
| 10 | Add `<meta name="theme-color" content="#080d1a">` | All 6 HTML files | Low |

> Items 1, 3, 4 depend on first creating the image assets — do that first.

---

## What's Already Good ✓

- `lang="en"` on all pages
- Unique, keyword-relevant `<title>` on every page (4/6 correct length)
- `<meta name="robots" content="index, follow">` on every page
- Canonical URL on every page — correct and unique
- `robots.txt` — correct, crawlable, sitemap linked
- `sitemap.xml` — all 6 pages, correct format, sensible priorities
- Open Graph `og:title`, `og:description`, `og:url`, `og:type` on every page
- Breadcrumb nav on all 5 inner pages
- One H1 per page, keyword-aligned
- Logical H1 → H2 → H3 structure throughout
- No duplicate titles or descriptions
- Internal links: all pages reachable in 1 click from nav
- JSON-LD `Organization` schema on homepage (correct structure)
- `preconnect` hints for Google Fonts
- `display=swap` on font URL
- Gzip compression via Nginx
- 30-day immutable caching for CSS/JS/fonts
- Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- Clean URL support (`/about` → `about.html`)
- ARIA labels and roles throughout
- `prefers-reduced-motion` CSS support
- Mobile-first responsive design, 4 breakpoints
