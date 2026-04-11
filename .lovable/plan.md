

# Advanced Visual Upgrade Plan

## Summary
The source repo's `viz.js` contains **16 unique animated canvas visualizations** (1,628 lines) that are completely missing from the React rebuild. These are the biggest differentiator — each page in the original has a unique, animated canvas illustration in its hero area. Additionally, Chart.js data charts and a dark/light theme toggle are missing.

---

## What's Missing (from the repo)

### 1. Page-Specific Canvas Visualizations (viz.js — 16 modes)
Each page has a unique animated canvas in the hero section:

| Mode | Page | Visual |
|------|------|--------|
| `neural` | AI/ML Solution | Neural network with pulsing nodes and edge signals |
| `flow` | Business Automation | Animated flowchart with data pulses |
| `analytics` | Automated Analytics | Bar chart with trend line overlay |
| `dataviz` | Data Visualization | Donut chart + live line chart dashboard |
| `cloud` | Cloud & DevOps | Server cluster topology with packets |
| `mlops` | MLOps | Rotating lifecycle wheel + pipeline stages |
| `saas` | SaaS Dev | Build pipeline with terminal output |
| `strategy` | Business Consulting | KPI gauges + milestone timeline |
| `industries` | Industries | Rotating orbital hub with 12 industry nodes |
| `about` | About | Growth line chart + stat cards |
| `casestudies` | Case Studies | ROI bar chart dashboard with rotating highlights |
| `contact` | Contact | Globe with city nodes and connection pulses |
| `services` | Services | Radial service hub with orbiting nodes |
| `pricing` | Pricing | Radar chart comparing plans |
| `insights` | Insights/Blog | Category trend bars + sparklines |
| `founder` | Founder | Expertise rings with orbiting dots |

### 2. Chart.js Interactive Charts (main.js)
- **Hero Chart**: Units Produced line chart (Mon-Sun)
- **OEE Comparison Chart**: Before vs After AKcelerate (12 months)
- **ROI Bar Chart**: Investment vs Returns over 3 years

### 3. Dark/Light Theme Toggle
- Toggle button in navbar
- `data-theme` attribute on `<html>`
- localStorage persistence as `ak-theme`
- All canvas visualizations read theme per-frame via `getTC()` function

### 4. Button Ripple Effect
- Material-design ripple on all CTA buttons (already in visual.js, not yet in React)

---

## Implementation Plan

### Phase 1: Canvas Visualization Engine
Create a shared `SolutionViz` component with canvas utilities (`roundRect`, `roundRectFill`, `drawMetrics`, `drawVizFrame`, `getTC`) ported directly from viz.js. Then create 16 mode-specific render functions as separate files:

```
src/components/viz/
  utils.ts         — shared helpers (roundRect, drawMetrics, getTC, lerp, etc.)
  VizCanvas.tsx    — shared canvas wrapper with resize handling
  NeuralViz.tsx    — neural network mode
  FlowViz.tsx      — automation flowchart mode
  AnalyticsViz.tsx — bar chart mode
  DatavizViz.tsx   — dashboard mode
  CloudViz.tsx     — server topology mode
  MLOpsViz.tsx     — lifecycle wheel mode
  SaaSViz.tsx      — build pipeline mode
  StrategyViz.tsx  — KPI gauges mode
  IndustriesViz.tsx— orbital hub mode
  AboutViz.tsx     — growth chart mode
  CaseStudiesViz.tsx — ROI dashboard mode
  ContactViz.tsx   — globe connections mode
  ServicesViz.tsx  — radial hub mode
  PricingViz.tsx   — radar chart mode
  InsightsViz.tsx  — trends dashboard mode
  FounderViz.tsx   — expertise rings mode
```

### Phase 2: Integrate Canvases Into Pages
Add the matching `<VizCanvas mode="..." />` component to each page's hero section, positioned behind content with `absolute inset-0 z-0`.

### Phase 3: Chart.js Charts
Install `chart.js` + `react-chartjs-2`. Create `HeroChart`, `OEEChart`, `ROIChart` components with exact data/styling from main.js. Add to homepage hero and case studies page.

### Phase 4: Dark/Light Theme Toggle
- Add theme context with toggle in Navbar
- Wire `document.documentElement.classList.toggle('dark')` + localStorage
- All viz canvas components already use `getTC()` which reads theme per-frame

### Phase 5: Button Ripple
Create `useRipple` hook, apply to all `.btn-primary` and `.btn-secondary` buttons site-wide.

---

## Technical Notes
- All 16 canvas modes are self-contained and use `requestAnimationFrame` with cleanup
- The shared `getTC()` function provides theme-aware colors (reads DOM state each frame)
- Shared helpers (`roundRect`, `roundRectFill`, `roundRectStroke`, `drawMetrics`, `drawVizFrame`) are used across all modes — port once, reuse everywhere
- Total code: ~1,628 lines of viz.js to port into modular React components
- Chart.js adds ~60KB gzipped to bundle

