

# Fix Remaining Bugs + Advancement Suggestions

## Current Problems (from console logs)

### 1. forwardRef Warning: `RevealSection` in `CTASection`
The `RevealSection` component is a plain function component. When used inside certain parent contexts, React warns about missing `forwardRef`. Fix: wrap `RevealSection` with `React.forwardRef` in `src/hooks/useScrollReveal.tsx`.

### 2. forwardRef Warning: `CountUpValue` in `HeroDashboard`
Same issue with the `CountUpValue` function component in `src/components/HeroDashboard.tsx`. Fix: wrap it with `React.forwardRef`.

## Files to Modify

| File | Change |
|------|--------|
| `src/hooks/useScrollReveal.tsx` | Wrap `RevealSection` and `RevealGrid` with `forwardRef` |
| `src/components/HeroDashboard.tsx` | Wrap `CountUpValue` with `forwardRef` |

## Suggested Advancements

| Feature | Description |
|---------|-------------|
| **Real-time Admin Notifications** | Toast alerts in the admin panel when new orders/signups occur, using a polling or SSE pattern |
| **Admin Account Management** | Settings page for super admins to create/update admin accounts and assign roles (replacing hardcoded demo accounts) |
| **Investor Pitch Deck** | Generate a downloadable .pptx with problem, solution, market size, business model, traction, team, and financials slides |
| **Monthly Cash Flow Forecast** | Add a month-by-month cash flow sheet to the business analysis for the first 2 years |
| **Competitive Analysis Doc** | Generate a document comparing AKcelerate with top AI consulting firms |
| **Client Portal Module** | Secure area for existing clients to view reports, dashboards, and submit support tickets |
| **Performance Optimization** | Audit and optimize bundle size — lazy-load heavy admin tabs, tree-shake unused Lucide icons, add image optimization |

## Technical Details

The `forwardRef` fixes are straightforward wraps. For `RevealSection`:
```tsx
export const RevealSection = forwardRef<HTMLDivElement, Props>(({ children, className, delay }, ref) => {
  const innerRef = useRef<HTMLDivElement>(null);
  // merge refs if needed, use innerRef for observer
  ...
});
```

For `CountUpValue`, it just needs `forwardRef` wrapping since it renders plain inline content — the ref can be attached to a wrapping `<span>`.

