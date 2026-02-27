# Opentechiz Website — Project Summary

## Overview

**Opentechiz** is a product engineering company with 10+ years of experience, 70+ engineers, 50+ projects delivered, and presence in 3 markets (Europe, Australia, US).

This website is a **pure static marketing site** — no framework, no backend, no npm packages — just HTML5, CSS3, and Vanilla JavaScript.

---

## Project Structure

```
opentechiz-website/
├── index.html           # Home page
├── about.html           # About the company
├── services.html        # Services
├── technology.html      # Technology stack
├── projects.html        # Portfolio / case studies
├── contact.html         # Contact page
├── css/
│   └── style.css        # All styles (~1407 lines, 28.8 KB)
├── js/
│   └── main.js          # All JavaScript (~177 lines)
├── images/              # Image assets (currently empty)
├── Dockerfile           # Docker image build
├── docker-compose.yml   # Docker Compose config
├── nginx.conf           # Nginx web server config
├── robots.txt           # SEO crawler directives
└── sitemap.xml          # XML sitemap
```

---

## Technology Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | HTML5, CSS3, Vanilla JavaScript   |
| Fonts      | Google Fonts (Inter)              |
| Web server | Nginx (Alpine Linux)              |
| Container  | Docker + Docker Compose           |
| Build tool | None (zero-dependency)            |

---

## Pages & Content

### `index.html` — Home
- Hero section: headline + 2 stat cards (50+ projects, 70+ engineers)
- Stats bar: animated counters (10 years, 70+ engineers, 50+ projects, 3 markets)
- Summary of 3 core services
- 3 featured projects
- CTA section

### `about.html` — About
- Company story, mission, values
- 6 core capabilities with icons
- Company statistics

### `services.html` — Services
Three core pillars:
1. **Ecommerce Platforms** — Magento, Shopify, Drupal
2. **Scalable Product Engineering** — Web, mobile, backend
3. **AI-Driven Enhancements** — LLM, RAG, AI agents, recommendation

### `technology.html` — Technology
Full-stack breakdown:
- Frontend: React, React Native, Next.js, Vue.js, TypeScript, Tailwind, GraphQL, PWA
- Ecommerce: Magento 2, Shopify, Shopify Plus, Drupal Commerce, WooCommerce
- Database: PostgreSQL, MySQL, MongoDB, Elasticsearch, Redis, DynamoDB
- Cloud: AWS, GCP, OVH, Kubernetes
- Backend: NestJS, Golang, PHP, Node.js
- Message Queue: Kafka, RabbitMQ
- AI: LLM, RAG, AI Agents, Recommendation Systems

### `projects.html` — Portfolio
Three featured projects:

| Project | Description | Tech highlights |
|---------|-------------|-----------------|
| **GLAMIRA** | Global jewelry ecommerce | Magento, Elasticsearch, AI |
| **MEKTOUBE** | Social/dating platform (10+ dev team) | AI matching, real-time messaging |
| **Moët Hennessy** | B2B ecommerce APAC | Shopify/React, SAP integration |

### `contact.html` — Contact
- Contact form (Name, Email, Company, Message)
- No real backend — submission is simulated client-side (1.2s delay, 4s success message)
- Contact email: hoanv@opentechiz.com

---

## Design System

### Colors

| Variable | Dark mode | Light mode |
|----------|-----------|------------|
| `--bg-primary` | `#080d1a` (deep navy) | `#f4f7fb` |
| `--bg-secondary` | `#0d1526` | `#eaeff6` |
| `--bg-card` | `#111827` | `#ffffff` |
| `--text-primary` | `#ffffff` | `#0f172a` |
| `--text-secondary` | `#94a3b8` | `#475569` |
| `--accent` | `#96c73c` (leaf green) | `#96c73c` |

Dark mode is the default.

### Responsive Breakpoints
- Desktop: container max-width 1200px
- Tablet: ≤ 1024px (grid adjustments)
- Mobile: ≤ 768px (single column, mobile nav)
- Small mobile: ≤ 480px

---

## Features & Patterns

### Dark/Light Mode Toggle
- IIFE runs immediately to prevent flash of wrong theme
- Preference stored in `localStorage`
- Class `html.light` on the `<html>` element toggles all CSS variables

### Navbar Scroll Effect
- Initially: floating with a 14px top gap
- On scroll: snaps to top (0px) with backdrop blur
- Mobile: hamburger menu, closes on link click or outside click

### Scroll Reveal Animations
- Intersection Observer API
- Classes: `.reveal`, `.reveal.visible`, `.reveal-delay-{1-5}`
- Threshold: 0.12, margin: -40px bottom

### Counter Animation
- `requestAnimationFrame` + cubic easing
- `data-target="value"` attribute on each counter element

### SEO
- JSON-LD structured data (Organization schema)
- Open Graph + Twitter Card meta tags
- Canonical URLs
- Breadcrumb navigation
- `robots.txt` + `sitemap.xml`

### Accessibility
- ARIA labels and roles
- `aria-expanded` on menu toggle
- Semantic HTML5 (`nav`, `section`, `footer`, `main`)
- `prefers-reduced-motion` support

---

## Infrastructure & Deployment

### Docker
```yaml
# docker-compose.yml
service: opentechiz-web
port: 8080:80
restart: unless-stopped
healthcheck: wget every 30s
```

```dockerfile
# Dockerfile
FROM nginx:alpine
# Copy nginx.conf + static files
EXPOSE 80
```

### Nginx (`nginx.conf`)
- **Gzip**: enabled for CSS, JS, SVG, JSON, fonts
- **Cache headers**:
  - CSS/JS/Fonts: 30 days (immutable)
  - Images: 30 days
  - HTML: no-cache (must-revalidate)
  - robots.txt/sitemap: 1 day
- **Security headers**: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy
- **Clean URLs**: `/about` → `/about.html`
- Custom 404 → `index.html`

---

## Recent Git History

| Commit | Description |
|--------|-------------|
| `cf18c76` | feat: add light/dark mode toggle with localStorage persistence |
| `0db0943` | Navbar: extend bg to top:0 on scroll |
| `2739655` | Restore stat cards CSS + navbar fixes |
| `6a1d67b` | Navbar: remove border/shadow on scroll |
| `97d01a0` | Fix navbar: floating with top gap, pill shape when scrolled |

---

## Strengths

- **Zero-dependency**: no build step required, straightforward to deploy
- **Performance**: gzip compression + caching headers, small file sizes
- **Containerized**: Docker + Nginx, production-ready
- **SEO-ready**: JSON-LD, OpenGraph, sitemap, canonical URLs
- **Accessible**: ARIA, semantic HTML, reduced-motion support
- **Responsive**: mobile-first, 4 breakpoints

## Limitations / Notes

- Contact form **does not work in production** (no backend or email service integrated)
- The `images/` directory is **empty** — real assets need to be added
- All content is **hardcoded in HTML** — no CMS
- No build/bundle system → CSS/JS are not minified automatically
