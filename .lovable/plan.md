

# GitHub Repo for Product File Downloads

## Approach
Use a **private GitHub repository** to host product ZIP files. Each product gets a download URL mapped in the product data. After purchase, the app redirects to the GitHub download link.

However, there's an important consideration: **private GitHub repos require authentication** to download files. Two practical options:

### Option A: Public GitHub Releases (Free, Simple)
- Create a public repo (e.g., `akcelerate-product-files`)
- Upload each product ZIP as a **GitHub Release asset** (up to 2GB per file)
- Map release asset URLs directly in `src/data/products.ts`
- Download works instantly — no auth needed

### Option B: Private Repo + Personal Access Token
- Requires a GitHub token stored as an env variable
- Adds complexity for no real security gain (the signed URL approach is better handled by Google Drive or Supabase)

**Recommendation: Option A** — public repo with GitHub Releases. The files are only accessible to users who have the direct URL, and your app only reveals the URL after purchase verification.

## Implementation

### 1. Add `downloadUrl` field to Product interface
Add an optional `downloadUrl: string` to the `Product` type in `src/data/products.ts`. Populate it with GitHub Release asset URLs for each product.

### 2. Update `downloadProductFile()` in `src/lib/downloadProduct.ts`
- Accept `downloadUrl` as a parameter
- If URL exists, open it directly (no Supabase dependency)
- Keep README fallback for products without URLs yet

### 3. Update `MyPurchases.tsx`
- Pass `product.downloadUrl` to the download function

## Your Setup Steps
1. Create a GitHub repo (e.g., `akcelerate-products`)
2. For each product, create a Release and attach the ZIP file
3. Copy each release asset URL into the product data

## Technical Details
- File: `src/data/products.ts` — add `downloadUrl` field
- File: `src/lib/downloadProduct.ts` — use direct URL instead of Supabase Storage
- File: `src/pages/MyPurchases.tsx` — pass URL to download function

