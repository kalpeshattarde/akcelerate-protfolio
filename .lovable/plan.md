

# 20 High-Converting Ad Images for AKcelerate

## Approach

Generate 20 premium ad creatives using the AI image generation skill (`lovable_ai.py`). Each image will be crafted with a detailed prompt incorporating brand colors (#2563EB, #06B6D4, #0F172A), the pulse-line motif, bold Poppins-style headings, and a dark tech-forward aesthetic.

## Instagram Creatives (10 images, 1080×1080 or 1080×1350)

| # | Type | Headline | CTA |
|---|------|----------|-----|
| 1 | Pain point shock | "Your Ads Are Burning Cash. You Just Don't Know It Yet." | Book Free Audit |
| 2 | Before vs After | "Before AKcelerate → After AKcelerate" (split layout with metrics) | See Results |
| 3 | Bold stat visual | "87% of Ad Budgets Are Wasted on Wrong Audiences" | Fix Your Targeting |
| 4 | Founder frustration | "Still Running Ads Without AI in 2026?" | Get Started |
| 5 | Growth promise | "10x Your ROAS in 90 Days — Or We Work Free" | Claim Your Spot |
| 6 | FOMO / urgency | "Only 5 Audit Slots Left This Month" | Apply Now |
| 7 | UGC-style branded | "We Went From ₹2L/mo to ₹18L/mo in 4 Months" (testimonial card) | Learn How |
| 8 | Offer-driven | "Free AI Growth Audit — Worth ₹50,000" | Book Now |
| 9 | Problem-solution | "No Leads? No Pipeline? No Growth? → One Platform. All Fixed." | Start Free |
| 10 | Authority / trust | "Trusted by 200+ Brands Across 12 Industries" | Join Them |

## X (Twitter) Creatives (10 images, 1200×675)

| # | Type | Headline | CTA |
|---|------|----------|-----|
| 11 | Contrarian opinion | "Most Marketing Agencies Are Just Burning Your Money" | Thread ↓ |
| 12 | Data-driven insight | "Brands Using AI Analytics See 3.2x Higher Conversion Rates" | See the Data |
| 13 | Pain-point statement | "You're Not Losing to Better Products. You're Losing to Better Data." | Fix This → |
| 14 | Myth vs Reality | "MYTH: More Ad Spend = More Sales. REALITY: Smarter Spend = More Sales." | Learn More |
| 15 | Growth hack | "The #1 Growth Lever Nobody Talks About: Predictive Customer Intelligence" | Read More |
| 16 | Authority positioning | "We've Scaled 200+ Brands. Here's What They All Had in Common." | Discover → |
| 17 | Thread-style preview | "5 Reasons Your Startup Isn't Growing (Thread)" | Follow @AKcelerate |
| 18 | Bold one-liner | "Stop Guessing. Start Growing." | Get Your Audit |
| 19 | Mistake callout | "The Biggest Mistake Founders Make With Paid Ads" | Avoid This → |
| 20 | Strategy snapshot | "Our 3-Step Framework That Turned ₹1L Ad Spend Into ₹12L Revenue" | Get the Framework |

## Technical Execution

1. Copy the AI gateway script to `/tmp/lovable_ai.py`
2. For each creative, craft a detailed image generation prompt specifying:
   - Exact dimensions (1080×1080 for IG square, 1080×1350 for IG vertical, 1200×675 for X)
   - Dark background (#0F172A), blue-cyan gradient accents
   - Layout structure (headline placement, CTA button, pulse-line elements)
   - Typography style (bold geometric sans-serif)
   - Visual elements (data waves, glow effects, device mockups, charts)
3. Generate images using `google/gemini-3-pro-image-preview` for highest quality
4. Save all 20 images to `/mnt/documents/` with clear naming (`ig_01_pain_point.png`, `x_11_contrarian.png`)
5. QA each image for text readability, brand consistency, and visual quality
6. Re-generate any that don't meet the premium standard

## Output

20 PNG files in `/mnt/documents/`:
- `ig_01` through `ig_10` — Instagram creatives
- `x_11` through `x_20` — X (Twitter) creatives

