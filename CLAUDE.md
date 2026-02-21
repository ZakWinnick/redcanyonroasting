# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Red Canyon Roasting Company — a static marketing website for a specialty coffee roaster. Built with vanilla HTML, CSS, and JavaScript. No build system, no package manager, no frameworks.

## Architecture

- **Pages**: `index.html`, `origins.html`, `story.html`, `rangeway.html`, `community.html` — each is a standalone HTML file with shared nav/footer structure
- **Styles**: Single global stylesheet `styles.css` (~1300 lines) organized by section comments
- **JavaScript**: `main.js` — minimal vanilla JS for navbar scroll effect and mobile menu toggle
- **Fonts**: Google Fonts (Outfit, weights 200–800) loaded via CDN
- **Hosting**: Firebase Hosting (inferred from firebase-debug.log; no firebase.json committed)

There is no build step. Changes to HTML/CSS/JS are served directly.

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
- **Animations**: `fadeUp`, `fadeIn`, `subtlePulse`, `grainMove` keyframes with staggered delays via `.delay-N` classes
- **Spacing**: Multiples of 8px/16px; border-radius 4px for buttons, 12–16px for cards
- **Layout**: CSS Grid and Flexbox; no float-based layouts
- **Nav**: Fixed header that adds `.scrolled` class at 60px scroll; inner pages use `.nav-dark` variant
- **SVGs**: Inline SVGs for logo, icons, and terrain-specific origin card backgrounds

## Page Structure Pattern

Every page follows: fixed navbar → hero section → content sections → newsletter form → footer. The nav and footer markup is duplicated across pages (no templating system).
