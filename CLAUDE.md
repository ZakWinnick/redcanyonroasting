# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Red Canyon Roasting Company — a static marketing website for a specialty coffee roaster. Built with vanilla HTML, CSS, and JavaScript. No package manager, no frameworks, no build step.

## Architecture

- **Pages**: `index.html`, `origins.html`, `story.html`, `rangeway.html`, `community.html` — each is a standalone HTML file with `<div id="nav-root">` and `<div id="footer-root">` placeholders
- **Shared nav/footer**: `main.js` injects nav and footer HTML into placeholder divs at runtime. The templates are defined once in `main.js` and auto-detect the current page for `nav-dark` class and active link highlighting.
- **Styles**: Single global stylesheet `styles.css` (~1450 lines) organized by section comments
- **JavaScript**: `main.js` — vanilla JS for nav/footer injection, nav scroll, mobile menu, scroll-triggered animations, events renderer, back-to-top button, and newsletter form
- **Data**: `data/events.json` — JSON-driven upcoming events list (community page)
- **Fonts**: Google Fonts (Outfit, weights 200–800) loaded via CDN with `preconnect`
- **Icons**: Font Awesome 6 (fontawesome.min.css + brands.min.css) for social icons in nav
- **Favicon**: `favicon.svg` — SVG mountain logo mark
- **Hosting**: GitHub Pages

Changes to HTML/CSS/JS are served directly. There is no build step.

## Nav/Footer Injection

Nav and footer are defined as template literals in `main.js` and injected into `#nav-root` and `#footer-root` on each page. The script:
- Detects the current page via `location.pathname`
- Adds `class="nav-dark"` on inner pages (not index.html)
- Adds `class="active"` to the matching nav link
- `<script src="main.js">` loads synchronously at the bottom of `<body>` so the DOM is ready

To edit nav or footer markup, edit the templates in `main.js`. All 5 pages update automatically.

## Events System

`data/events.json` stores events as a JSON array:
```json
{ "date": "YYYY-MM-DD", "name": "Event Name", "location": "City, ST", "link": "https://optional.url" }
```
`main.js` fetches the JSON on the community page, filters out past events (using local timezone), and renders upcoming ones. Events with a `link` field render as clickable rows. Empty/error states show a fallback message.

## Design System

CSS custom properties defined in `:root` of `styles.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--red` | `#B4232A` | Primary brand color |
| `--charcoal` | `#2C2C2C` | Dark text/backgrounds |
| `--sand` | `#D4A574` | Accent/secondary |
| `--cream` | `#F5F0E8` | Light backgrounds |
| `--forest` | `#2D5A3D` | Tertiary |

Each color has light/dark variants (e.g., `--red-dark`, `--sand-light`).

## Key Conventions

- **CSS naming**: BEM-inspired (`.origin-card`, `.origin-card-image`, `.origin-card-info`)
- **Responsive breakpoints**: 1024px (tablet), 768px (mobile)
- **Fluid typography**: Uses `clamp()` for responsive font sizing
- **Animations**: CSS keyframes (`fadeUp`, `fadeIn`, `subtlePulse`, `grainMove`) with `.delay-N` classes; scroll-triggered via `.animate-on-scroll` + IntersectionObserver
- **Spacing**: Multiples of 8px/16px; border-radius 4px for buttons, 12–16px for cards
- **Layout**: CSS Grid and Flexbox; no float-based layouts
- **Nav**: Fixed header that adds `.scrolled` class at 60px scroll; inner pages use `.nav-dark` variant; mobile menu uses opacity/visibility transition with `aria-expanded`
- **SVGs**: Inline SVGs for logo, icons, and terrain-specific origin card backgrounds
- **Accessibility**: `:focus-visible` outlines, `aria-expanded` on mobile toggle, Escape key closes mobile menu
- **SEO**: Each page has `<meta description>`, Open Graph, Twitter Card tags, and `<noscript>` CSS fallback for animations; `index.html` includes JSON-LD structured data

## Page Structure Pattern

Every page follows: `<div id="nav-root">` → hero section → content sections → newsletter form → `<div id="footer-root">` → back-to-top button → `<script src="main.js">`.
