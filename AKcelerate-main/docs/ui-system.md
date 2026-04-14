# AKcelerate UI System Guide

## Design System

All design tokens live in `/design-system/tokens/`. Import with:
```html
<link rel="stylesheet" href="/design-system/index.css">
```

## Color System

### Light Theme
| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#2563EB` | Buttons, links, highlights |
| `--color-accent` | `#06B6D4` | Secondary highlights |
| `--color-bg` | `#FFFFFF` | Page background |
| `--color-bg-alt` | `#F0F7FF` | Alternate sections |
| `--color-text-heading` | `#0F172A` | Headings |
| `--color-text-body` | `#64748B` | Body text |

### Dark Theme
The dark theme is activated by setting `data-theme="dark"` on the `<html>` element. 
Token values are automatically overridden via CSS custom properties.

## Typography

```css
font-family: var(--font-heading); /* Poppins — headings */
font-family: var(--font-body);    /* Inter — body text */
font-family: var(--font-mono);    /* JetBrains Mono — code */
```

## Component Classes

| Class | Purpose |
|-------|---------|
| `.glass-card` | Card with white bg, border, hover lift |
| `.btn-primary` | Gradient primary button |
| `.btn-secondary` | Outline secondary button |
| `.gradient-text` | Blue→Cyan gradient text |
| `.section-label` | Small uppercase accent label |
| `.hero-section` | Full-height hero with grid bg |
| `.feature-icon` | Icon container for feature cards |
| `.stat-number` | Large animated counter number |
| `.process-number` | Numbered step circle |
| `.tag-pill` | Small rounded tag/badge |
| `.case-card` | Case study card |
| `.faq-item` | FAQ accordion item |
| `.form-input` | Styled form input |

## Theme Toggle

Theme preference is stored in `localStorage` as `ak-theme` (`'light'` or `'dark'`).
The toggle button uses class `.theme-toggle-btn` and is present on all pages.

Anti-FOUC script in `<head>`:
```html
<script>(function(){var t=localStorage.getItem('ak-theme');if(t)document.documentElement.setAttribute('data-theme',t);})()</script>
```

## Navigation Dropdowns

The nav uses `.nav-dropdown` → `.nav-dropdown-menu` for hover dropdowns.
Mobile nav uses `.mobile-dropdown` with JavaScript toggle via `toggleMobileDropdown()`.
