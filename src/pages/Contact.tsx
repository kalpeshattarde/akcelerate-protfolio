import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { HeroPage } from "@/components/Hero";
import SEOHead from "@/components/SEOHead";
import CTASection from "@/components/CTASection";
import { ContactForm } from "@/components/Forms";
import { Mail, Phone, MapPin, Clock, AlertTriangle } from "lucide-react";
import { RevealSection } from "@/hooks/useScrollReveal";
import { PRODUCTS } from "@/data/products";
import CustomizeSummary from "@/components/products/CustomizeSummary";
import CustomizationBrief from "@/components/products/CustomizationBrief";
import { trackEvent } from "@/lib/analytics";

const SAFE_PARAM = /^[\w\s.,'\-–&()/+]{1,120}$/;
const SAFE_ID = /^[a-zA-Z0-9_-]{1,40}$/;

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const intentRaw = searchParams.get("intent") ?? "";
  const productNameRaw = searchParams.get("product") ?? "";
  const productIdRaw = searchParams.get("productId") ?? "";

  const intent = intentRaw === "customize" ? "customize" : null;
  const productNameParam = SAFE_PARAM.test(productNameRaw) ? productNameRaw : "";
  const productIdParam = SAFE_ID.test(productIdRaw) ? productIdRaw : "";
  const isCustomize = intent === "customize";

  // Match by id first, then by exact name (decoded by useSearchParams)
  const product = useMemo(() => {
    if (!isCustomize) return null;
    return (
      (productIdParam && PRODUCTS.find((p) => p.id === productIdParam)) ||
      (productNameParam && PRODUCTS.find((p) => p.name === productNameParam)) ||
      null
    );
  }, [isCustomize, productIdParam, productNameParam]);

  const customizeParamsProvided = isCustomize && (productNameParam || productIdParam);
  const productMismatch = customizeParamsProvided && !product;

  const [mode, setMode] = useState<"quick" | "brief">(isCustomize ? "brief" : "quick");

  useEffect(() => {
    if (isCustomize) {
      trackEvent("contact_customize_landing", {
        product: product?.name ?? productNameParam,
        productId: product?.id ?? productIdParam,
        matched: !!product,
      });
    }
  }, [isCustomize, product, productNameParam, productIdParam]);

  const prefillMessage = product
    ? `Hi AKcelerate team,\n\nI'd like a customized version of "${product.name}" for my business.\n\nWhat I'm looking to tailor:\n• Branding & domain\n• Industry-specific workflows\n• Integrations with our existing tools\n\nPlease share next steps, timeline and pricing for a custom build.\n\nThanks!`
    : "";

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "AKcelerate",
    image: "https://akcelerate.lovable.app/images/akcelerate-og.png",
    url: "https://akcelerate.lovable.app",
    telephone: "+91-8208555380",
    email: "akceleratehq@gmail.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: 19.076, longitude: 72.8777 },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/akceleratehq/",
      "https://x.com/akcelerateHQ",
      "https://www.instagram.com/akceleratehq/",
    ],
  };

  return (
    <>
      <SEOHead
        title={isCustomize ? `Customize ${product?.name ?? "your SaaS"}` : "Contact"}
        description={
          isCustomize
            ? `Request a customized version of ${product?.name ?? "an AKcelerate prototype"} for your business.`
            : "Get in touch with AKcelerate. Tell us about your project and we'll respond within 24 hours."
        }
        path="/contact"
        jsonLd={localBusinessJsonLd}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]}
      />
      <HeroPage
        label={isCustomize ? "Customize" : "Contact"}
        title={
          isCustomize ? (
            <>Build a <span className="gradient-text">Custom SaaS</span> with Us</>
          ) : (
            <>Let's Build Something <span className="gradient-text">Great Together</span></>
          )
        }
        description={
          isCustomize
            ? "Tell us how you want this prototype tailored — we'll scope it within 24 hours."
            : "Tell us about your project and we'll get back to you within 24 hours."
        }
      />

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <RevealSection>
              <div>
                <h2 className="font-poppins font-bold text-2xl mb-6">Get in Touch</h2>
                <div className="space-y-5 mb-10">
                  {[
                    { icon: Mail, label: "Email", value: "akceleratehq@gmail.com", href: "mailto:akceleratehq@gmail.com" },
                    { icon: Phone, label: "Phone", value: "+91-8208555380", href: "tel:+918208555380" },
                    { icon: MapPin, label: "Location", value: "Mumbai, Maharashtra, India" },
                    { icon: Clock, label: "Response Time", value: "Within 24 hours" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="feature-icon !w-10 !h-10 !mb-0"><c.icon className="w-5 h-5 text-accent" /></div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">{c.label}</div>
                        {c.href ? (
                          <a href={c.href} className="text-foreground hover:text-primary transition-colors">{c.value}</a>
                        ) : (
                          <div className="text-foreground">{c.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="glass-card p-6">
                  <h3 className="font-poppins font-semibold mb-3">Why Partner With Us?</h3>
                  <ul className="space-y-2">
                    {["50+ projects delivered across 13+ industries", "315% average client ROI", "92% client retention rate", "2-4 week prototype delivery"].map((v, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg className="w-4 h-4 text-accent flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                        {v}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealSection>
            <RevealSection delay={200}>
              {isCustomize && product && <CustomizeSummary product={product} />}

              {isCustomize && (
                <div className="inline-flex items-center gap-1 p-1 mb-4 rounded-full border border-border bg-muted/40">
                  <button
                    type="button"
                    onClick={() => setMode("brief")}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${mode === "brief" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    Customization Brief
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("quick")}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${mode === "quick" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    Quick Message
                  </button>
                </div>
              )}

              {isCustomize && mode === "brief" ? (
                <CustomizationBrief
                  productName={product?.name ?? productNameParam ?? "Custom SaaS"}
                  productId={product?.id}
                />
              ) : (
                <ContactForm defaultMessage={prefillMessage} />
              )}
            </RevealSection>
          </div>
        </div>
      </section>

      <CTASection
        title="Prefer a Free Audit First?"
        description="Get a comprehensive assessment of your AI readiness and data opportunities — completely free."
        primaryCta={{ label: "Book Free Audit", to: "/free-audit" }}
        dark
      />
    </>
  );
}
