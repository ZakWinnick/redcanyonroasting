# Site Improvements Design — 2026-02-21

## Goal
Comprehensive improvement to Red Canyon Roasting Company website covering polish, functionality, SEO, performance, and design enhancements. Keep it pure static (no npm, no build frameworks). Add a JSON-driven events system for easy content updates.

## Architecture Changes

### Events System (`data/events.json`)
- Events stored as JSON array with `date`, `name`, `location`, and optional `link` fields
- `main.js` fetches the JSON, filters out past events, renders upcoming ones
- Events with `link` field render as clickable `<a>` tags (open in new tab)
- Empty state: "No upcoming events — check back soon!"
- Date format: `YYYY-MM-DD` for sorting and comparison

### Partials Sync (`partials/` + `build.sh`)
- `partials/nav.html` and `partials/footer.html` are canonical shared sections
- HTML files use `<!-- NAV:START -->` / `<!-- NAV:END -->` and `<!-- FOOTER:START -->` / `<!-- FOOTER:END -->` comment markers
- `build.sh` replaces content between markers with partial file content
- Pages work standalone without running the build — script is a convenience for syncing shared sections

### Favicon
- SVG favicon derived from mountain logo mark
- Apple touch icon reference

## Per-Page Additions (all 5 pages)
- `<meta name="description">` with page-specific copy
- Open Graph tags: `og:title`, `og:description`, `og:type`
- Twitter card: `summary` type
- `<link rel="preconnect">` for Google Fonts (fonts.googleapis.com + fonts.gstatic.com)
- `<link rel="icon">` SVG favicon
- `<noscript>` CSS fallback for animated elements
- Semantic heading fix: `div.section-heading` → `h2` where appropriate
- Back-to-top button markup
- Scroll-triggered animation classes on below-fold sections

### index.html specific
- JSON-LD Organization structured data
- Origin card hover "Shop →" label markup

### community.html specific
- Hardcoded events replaced with `#events-container` for JS rendering

## CSS Additions
- `:focus-visible` outlines (sand color, 2px)
- Mobile menu: opacity/visibility transition (replace display snap)
- `.animate-on-scroll` + `.is-visible` for IntersectionObserver
- Back-to-top button (fixed position, bottom-right, fade in/out)
- `.newsletter-btn.success` green state
- `.origin-card-shop-label` hover reveal
- `a.upcoming-event-row` link styles with hover
- `.no-events` empty state styling

## JS Additions (`main.js`)
- IntersectionObserver for `.animate-on-scroll` elements
- `renderEvents()` — fetch, filter, render events from JSON
- Back-to-top button show/hide + smooth scroll
- Newsletter form `preventDefault` + success state swap
- Keep: nav scroll effect, dynamic footer year, mobile menu toggle

## Decisions
- No og:image tag (no raster image asset available yet)
- Newsletter form is visual-only for now (wired up later)
- Pure static — no npm, no framework, no build dependencies beyond bash
- Python not required for build script — pure bash/sed
