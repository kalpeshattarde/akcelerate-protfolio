import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  /** Absolute or root-relative path to OG image (1200x630). Defaults to brand image. */
  image?: string;
  /** JSON-LD structured data — pass any schema.org object or array of objects */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Auto-generate BreadcrumbList JSON-LD from these items */
  breadcrumbs?: BreadcrumbItem[];
}

const SITE = "AKcelerate";
const SITE_URL = "https://akcelerate.lovable.app";
const DEFAULT_DESC = "AKcelerate delivers AI consulting, data analytics, and digital transformation solutions for enterprise growth.";
const DEFAULT_IMAGE = "/images/akcelerate-og.png";

const SEOHead = ({ title, description, path, image, jsonLd, breadcrumbs }: SEOHeadProps) => {
  const fullTitle = title ? `${title} — ${SITE}` : `${SITE} — AI & Digital Solutions`;
  const desc = description || DEFAULT_DESC;
  const canonical = path ? `${SITE_URL}${path}` : undefined;
  const ogImage = (image || DEFAULT_IMAGE).startsWith("http") ? (image || DEFAULT_IMAGE) : `${SITE_URL}${image || DEFAULT_IMAGE}`;

  const schemas: Record<string, unknown>[] = [];
  if (jsonLd) {
    if (Array.isArray(jsonLd)) schemas.push(...jsonLd);
    else schemas.push(jsonLd);
  }
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: `${SITE_URL}${b.path}`,
      })),
    });
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
      {canonical && <link rel="canonical" href={canonical} />}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
