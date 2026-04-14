

# Products Page with Subtabs + Top Selling

## Summary
Add a single "Products" link in the navbar (no dropdown). The `/products` page itself has two subtabs — **Mobile App** and **Web SaaS** — as tab switchers at the top of the page, plus a **Top Selling Products** section above the tabs. Admin remains a separate `/admin` route.

## Navigation Change
- Navbar gets a plain "Products" link (like "Contact") pointing to `/products` — no dropdown, no sub-links
- Admin link stays in footer only

## Products Page Layout (`/products`)

```text
┌─────────────────────────────────────┐
│  Personalized Hero Banner           │
├─────────────────────────────────────┤
│  🔥 Top Selling Products (carousel)│
│  [Card] [Card] [Card] [Card]       │
├─────────────────────────────────────┤
│  [ Mobile App ]  [ Web SaaS ]  ←tabs│
├─────────────────────────────────────┤
│  Product Grid (filtered by tab)     │
│  [Card] [Card] [Card]              │
│  [Card] [Card] [Card]              │
├─────────────────────────────────────┤
│  Upsell Banner                      │
└─────────────────────────────────────┘
```

## What Gets Built

### Files Created (~25 new files)
- `src/config/appConfig.ts` — global config (pricing, discounts, growth, features)
- `src/data/products.ts` — demo products with `category` ("mobile-app" | "web-saas") and `topSelling: boolean` flag
- `src/pages/products/Products.tsx` — main page with Top Selling section + Mobile App / Web SaaS tabs (using existing Tabs UI component)
- `src/pages/products/ProductDetail.tsx` — single product view
- `src/pages/products/Checkout.tsx` — mock checkout
- `src/pages/admin/Admin.tsx` — admin panel with tabbed sections (Dashboard, Config, Products, Affiliates, Growth, Ad Generator)
- `src/components/products/ProductCard.tsx` — card with preview, price, locked state, badges ("Most Popular", "Top Selling")
- `src/components/products/PricingSelector.tsx` — USD/INR toggle, coupon input
- `src/components/products/CheckoutModal.tsx` — mock Stripe/Razorpay flow
- `src/components/products/TopSellingSection.tsx` — horizontal showcase of top-selling products
- `src/components/products/RecommendationEngine.tsx` — "You might also like"
- `src/components/products/UpsellBanner.tsx` — single → bundle prompts
- `src/components/products/PersonalizedHero.tsx` — dynamic hero
- `src/components/admin/DashboardTab.tsx` — revenue charts
- `src/components/admin/ConfigTab.tsx` — edit pricing/toggles
- `src/components/admin/ProductsTab.tsx` — manage catalog
- `src/components/admin/AffiliateTab.tsx` — affiliate dashboard
- `src/components/admin/GrowthTab.tsx` — growth agent panel
- `src/components/admin/AdGeneratorTab.tsx` — AI ad tools
- Hooks: `useGeoDetection.ts`, `useProducts.ts`, `useAffiliate.ts`, `usePersonalization.ts`
- Lib: `growthEngine.ts`, `ltvCalculator.ts`, `adGenerator.ts`

### Files Modified (minimal)
- `src/components/Navbar.tsx` — add plain "Products" link (no dropdown)
- `src/App.tsx` — add routes: `/products`, `/products/:slug`, `/products/checkout`, `/admin`
- `src/components/Footer.tsx` — add "Admin" link

### Product Data Shape
```typescript
{
  id, name, slug, category: "mobile-app" | "web-saas",
  topSelling: boolean, salesCount: number,
  description, previewImage, tags, priceTier,
  price: { usd, inr }
}
```

Top Selling section filters by `topSelling: true` and sorts by `salesCount`.

## Technical Notes
- All mock data in localStorage until Supabase connected
- No existing pages changed — purely additive
- Tabs component from `src/components/ui/tabs.tsx` used for Mobile App / Web SaaS switching
- Recharts (already installed) for admin dashboard

