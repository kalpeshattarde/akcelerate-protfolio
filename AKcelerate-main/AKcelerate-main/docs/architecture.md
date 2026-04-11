# AKcelerate Platform — Architecture Guide

## Overview

AKcelerate is a Node.js + Express static website serving a multi-page SaaS marketing platform for an AI Manufacturing Analytics company.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 20 |
| Server | Express 4 |
| Styling | Tailwind CSS (CDN) + Custom CSS |
| Charts | Chart.js |
| Animations | AOS (Animate on Scroll) |
| Icons | Lucide Icons |
| Fonts | Google Fonts (Poppins + Inter) |
| Security | Helmet + express-rate-limit |

## Directory Structure

```
/
├── server/
│   └── server.js           # Express server (port 5000)
├── public/                 # Static website files
│   ├── index.html          # Homepage
│   ├── solutions.html      # Solutions overview
│   ├── services.html       # Services overview
│   ├── case-studies.html   # Case studies
│   ├── about.html          # About / founder
│   ├── contact.html        # Contact page
│   ├── pricing.html        # Pricing page
│   ├── gallery.html        # Gallery / portfolio
│   ├── founder.html        # Founder portfolio
│   ├── services/           # Individual service pages
│   │   ├── predictive-maintenance.html
│   │   ├── supply-chain-analytics.html
│   │   ├── quality-analytics.html
│   │   └── energy-management.html
│   ├── css/
│   │   └── styles.css      # Main stylesheet (light + dark themes)
│   └── js/
│       └── script.js       # Main JavaScript
├── design-system/          # Design token library
│   ├── index.css           # Master import
│   └── tokens/             # CSS custom property files
├── brand-kit/              # Brand assets
├── private/                # Private files (gitignored)
├── modules/                # Future feature modules
├── docs/                   # Documentation
└── package.json
```

## Request Flow

```
Browser → Express Static Middleware → public/ files
Browser → Express Route Handler → res.sendFile()
Browser → POST /api/contact → JSON response
```

## Security Layers

1. **Helmet** — Sets security HTTP headers
2. **Rate Limiting** — 100 requests per 15min per IP on API routes
3. **Input Validation** — Frontend + backend validation on contact form
4. **CORS** — Configured via cors() middleware
5. **Environment Variables** — dotenv for secrets
