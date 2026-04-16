import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, ChevronRight, FolderOpen, FileText, Code, Archive, Eye, BookOpen, Lightbulb, CheckCircle2, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import FAQAccordion from "@/components/FAQAccordion";
import { toast } from "sonner";

/* ── Side‑nav sections ───────────────────────────────── */
const sections = [
  { id: "hero", label: "Start Here" },
  { id: "library", label: "What's Inside" },
  { id: "choose", label: "Choose a Prototype" },
  { id: "folder", label: "Which Folder" },
  { id: "structure", label: "Folder Structure" },
  { id: "prompts", label: "Prompts Folder" },
  { id: "better-prompts", label: "Write Better Prompts" },
  { id: "copy-paste", label: "Copy‑Paste Blocks" },
  { id: "best-practices", label: "Best Practices" },
  { id: "faq", label: "FAQ" },
  { id: "final-cta", label: "Get Started" },
];

/* ── Prompt text constants ───────────────────────────── */
const SHORT_PROMPT = `I am using one prototype from a larger SaaS Prototypes library. Use the selected prototype folder as the source of truth. Read its README, PRODUCT, PLAN, STRUCTURE, preview assets, prototype.manifest.json, and prompts folder before making changes. Treat archive or timestamped folders as reference only unless I explicitly say otherwise. Replace generic scaffold language with the chosen product idea, improve the most important user journeys end to end, and keep the implementation aligned with the docs and prompt package.`;

const LONG_PROMPT = `I am customizing a prototype from a larger SaaS Prototypes library.

Selected folder:
[PASTE PROTOTYPE FOLDER PATH HERE]

Your job:
Turn this prototype into a more specific, more polished, more believable product without losing repo truth.

Before changing anything:
1. Read \`README.md\`, \`PRODUCT.md\`, \`PLAN.md\`, \`STRUCTURE.md\`, \`prototype.manifest.json\`, \`preview/description.md\`, and the files inside \`prompts/\`.
2. Treat the selected prototype root as the main source of truth.
3. Use implementation folders such as \`apps/web\`, \`apps/api\`, \`packages/sdk\`, \`packages/types\`, \`specs/\`, and \`infra/\` as canonical working areas when they exist.
4. Treat folders like \`velocitycore_monorepo_v4/\` or timestamped archive folders as reference only unless I explicitly say to use them as the main implementation base.

Product direction:
- Product name: [YOUR PRODUCT NAME]
- Built for: [TARGET USERS]
- Main problem solved: [MAIN PROBLEM]
- Core workflow to improve first: [CORE WORKFLOW]
- Pages or screens to improve: [LIST THEM]
- Visual direction: [STYLE, BRAND, MOOD]
- Integrations needed: [INTEGRATIONS]
- Monetization or pricing direction: [OPTIONAL]

Execution rules:
- Replace generic scaffold copy with domain-specific product language.
- Keep the strongest parts of the existing prototype, but remove obvious template feeling.
- Improve onboarding, dashboard, settings, billing, and the main domain workflow where relevant.
- Add real empty states, realistic demo content, stronger hierarchy, and clearer calls to action.
- Do not pretend archive/reference folders are the source of truth.
- Do not generate vague placeholder sections.
- Keep the result consistent with the docs, route structure, and product direction.
- If something is missing, add it honestly and coherently instead of faking a finished product.`;

/* ── FAQ data ────────────────────────────────────────── */
const faqItems = [
  { question: "Should I upload the whole repo?", answer: "No. Pick one prototype folder such as saas/crmpro/ or mobile_apps/Video Editing/ and zip only that folder. The AI works best with focused context from a single product, not hundreds of unrelated files. Only upload the full repo if you specifically need cross-prototype context." },
  { question: "Which prompt file should I use first?", answer: "Start with the prototype-specific prompt at prompts/LOVABLE_ADVANCED_PROMPT.md inside the prototype folder. If it doesn't exist, fall back to the shared global prompt package at saas/Global Prompts and MD files/ or mobile_apps/Global Prompts and MD files/. The prototype-specific prompt is always more targeted." },
  { question: "What if the prototype still looks generic?", answer: "That means you haven't given the AI enough product direction. Tell it your product name, target users, core workflow, and visual style. Replace scaffold language with your actual business idea. The more specific your prompt, the less generic the output." },
  { question: "Can I reuse the same prototype with multiple AI tools?", answer: "Yes. The prototype folder is tool-agnostic. You can hand the same ZIP to Lovable, Cursor, Claude, ChatGPT, Replit, or Bolt. Each tool will interpret it differently, but the docs, structure, and prompt files work universally." },
  { question: "What if I only want a landing page?", answer: "Choose a prototype that already has a strong landing page structure, then tell the AI to focus only on the landing page and ignore the rest. You can also strip the ZIP to just the landing-related files, preview assets, and product docs." },
  { question: "What if I want a mobile app instead of a SaaS web app?", answer: "Use the mobile_apps/ group. Prototypes like Grocery Delivery, Habit Tracker, Video Editing, and Meditation App are designed for mobile-first experiences. The same workflow applies: pick one, zip it, read the docs, and prompt the AI with your direction." },
];

/* ── Folder structure data ───────────────────────────── */
const folderItems = [
  { name: "README.md", purpose: "Project overview, setup instructions, and architecture summary", badge: "Source of Truth", badgeClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" },
  { name: "PRODUCT.md", purpose: "Product vision, user personas, feature priorities, and roadmap", badge: "Source of Truth", badgeClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" },
  { name: "PLAN.md", purpose: "Implementation plan, milestones, and technical decisions", badge: "Source of Truth", badgeClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" },
  { name: "STRUCTURE.md", purpose: "File tree and module organization reference", badge: "Source of Truth", badgeClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" },
  { name: "prototype.manifest.json", purpose: "Machine-readable metadata: name, category, stack, features", badge: "Source of Truth", badgeClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" },
  { name: "prompts/", purpose: "AI prompt packages for Lovable, Claude, Codex, and others", badge: "Source of Truth", badgeClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" },
  { name: "preview/", purpose: "Screenshots, mockups, and description.md for visual context", badge: "Visual Reference", badgeClass: "bg-blue-500/15 text-blue-700 dark:text-blue-400" },
  { name: "apps/web", purpose: "Frontend application code (React, Next.js, etc.)", badge: "Implementation", badgeClass: "bg-amber-500/15 text-amber-700 dark:text-amber-400" },
  { name: "apps/api", purpose: "Backend API code (Express, Fastify, etc.)", badge: "Implementation", badgeClass: "bg-amber-500/15 text-amber-700 dark:text-amber-400" },
  { name: "packages/sdk", purpose: "Shared SDK or client library", badge: "Implementation", badgeClass: "bg-amber-500/15 text-amber-700 dark:text-amber-400" },
  { name: "packages/types", purpose: "Shared TypeScript types and interfaces", badge: "Implementation", badgeClass: "bg-amber-500/15 text-amber-700 dark:text-amber-400" },
  { name: "specs/", purpose: "OpenAPI specs, database schemas, and API contracts", badge: "Implementation", badgeClass: "bg-amber-500/15 text-amber-700 dark:text-amber-400" },
  { name: "infra/", purpose: "Docker configs, CI/CD, and deployment manifests", badge: "Implementation", badgeClass: "bg-amber-500/15 text-amber-700 dark:text-amber-400" },
  { name: "velocitycore_*/", purpose: "Older monorepo builds — use only if explicitly chosen", badge: "Archive", badgeClass: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400" },
  { name: "timestamped folders", purpose: "Auto-generated snapshots — reference only, not source of truth", badge: "Archive", badgeClass: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400" },
];

/* ── Copy helper ─────────────────────────────────────── */
function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all">
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
      {label || (copied ? "Copied" : "Copy")}
    </button>
  );
}

/* ── Main Guide Page ─────────────────────────────────── */
export default function Guide() {
  const [activeSection, setActiveSection] = useState("hero");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observerRef.current!.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <SEOHead title="Guide — SaaS Prototypes" description="Learn how to pick, zip, and prompt any prototype from the SaaS Prototypes library using Lovable or any AI builder." />

      <div className="min-h-screen bg-background">
        {/* ── Sticky Side Nav (desktop) ── */}
        <aside className="hidden xl:block fixed left-6 top-1/2 -translate-y-1/2 z-40 w-48">
          <nav className="space-y-1">
            {sections.map(s => (
              <button key={s.id} onClick={() => scrollTo(s.id)} className={`block w-full text-left text-xs px-3 py-1.5 rounded-lg transition-all ${activeSection === s.id ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 xl:ml-64 xl:mr-auto">

          {/* ══════════════ 1. HERO ══════════════ */}
          <section id="hero" className="pt-32 pb-20 lg:pt-40 lg:pb-28">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">SaaS Prototypes — Guide</p>
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-foreground">
              Use any prototype with AI<br className="hidden sm:block" /> in minutes
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Every prototype in this library includes enough context — docs, prompts, preview assets, and structured code — for Lovable or any AI builder to turn it into a more specific product. This guide shows you exactly how.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="btn-primary inline-flex items-center gap-2 text-sm">
                Browse Prototypes <ArrowRight className="w-4 h-4" />
              </Link>
              <CopyButton text={SHORT_PROMPT} label="Copy Lovable Prompt" />
            </div>
          </section>

          {/* ══════════════ 2. WHAT THIS LIBRARY CONTAINS ══════════════ */}
          <section id="library" className="py-16 lg:py-24 border-t border-border">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Overview</p>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-foreground mb-4">What This Library Contains</h2>
            <p className="text-muted-foreground mb-10 max-w-xl">The repository is organized into two main groups. Each prototype is a serious starting point — not a finished product, not a wireframe.</p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-primary" />
                  <h3 className="font-poppins font-semibold text-foreground">saas/</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Web SaaS products with full-stack structure, API specs, and deployment configs.</p>
                <div className="flex flex-wrap gap-1.5">
                  {["crmpro", "accounting", "contract_management", "project_management", "product_launch", "job_board", "marketing_analytics", "okr_tracking"].map(n => (
                    <span key={n} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{n}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FolderOpen className="w-5 h-5 text-primary" />
                  <h3 className="font-poppins font-semibold text-foreground">mobile_apps/</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Mobile-first products with app flows, preview screens, and UI specifications.</p>
                <div className="flex flex-wrap gap-1.5">
                  {["Video Editing", "language_learning", "Grocery Delivery", "Habit Tracker", "Meditation App", "Fitness", "Music Player", "Fashion Brand"].map(n => (
                    <span key={n} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{n}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════ 3. HOW TO CHOOSE ══════════════ */}
          <section id="choose" className="py-16 lg:py-24 border-t border-border">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Step by Step</p>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-foreground mb-10">How To Choose The Right Prototype</h2>

            <div className="space-y-6">
              {[
                { step: "1", title: "Choose your category", desc: "Decide whether you're building a web SaaS product or a mobile app. Browse the saas/ and mobile_apps/ directories to see what's available." },
                { step: "2", title: "Pick the closest match", desc: "You don't need an exact match. Pick the prototype whose domain, user type, or workflow is closest to your product idea. A CRM prototype can become a recruiting pipeline. An accounting prototype can become an invoicing tool." },
                { step: "3", title: "Review the docs", desc: "Open README.md, PRODUCT.md, prototype.manifest.json, and preview/description.md. These tell you what the prototype covers, who it's built for, and what's already implemented versus scaffolded." },
                { step: "4", title: "Confirm the prototype's depth", desc: "Some prototypes are already domain-shaped with specific workflows. Others are scaffold-heavy and need more direction. The docs will tell you which situation you're in." },
              ].map(s => (
                <div key={s.step} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">{s.step}</div>
                  <div>
                    <h3 className="font-poppins font-semibold text-foreground mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════ 4. WHICH FOLDER TO GIVE TO AI ══════════════ */}
          <section id="folder" className="py-16 lg:py-24 border-t border-border">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Upload Rules</p>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-foreground mb-4">Which Folder To Give To AI</h2>
            <p className="text-muted-foreground mb-8 max-w-xl">The default workflow: zip one prototype root and upload it. Nothing else.</p>

            <div className="space-y-4">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Do this</span>
                </div>
                <p className="text-sm text-muted-foreground">Zip a single prototype root like <code className="text-xs bg-muted px-1.5 py-0.5 rounded">saas/crmpro/</code> or <code className="text-xs bg-muted px-1.5 py-0.5 rounded">mobile_apps/Video Editing/</code>. Include everything inside — docs, prompts, preview, and implementation folders.</p>
              </div>
              <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-4 h-4 rounded-full border-2 border-red-500/50 flex items-center justify-center text-[10px] font-bold text-red-500">✕</span>
                  <span className="text-sm font-semibold text-red-700 dark:text-red-400">Avoid this</span>
                </div>
                <p className="text-sm text-muted-foreground">Don't upload the whole repository unless you need cross-prototype context. Don't upload random individual files. Don't treat archive or timestamped folders as the source of truth — they're reference material.</p>
              </div>
            </div>
          </section>

          {/* ══════════════ 5. FOLDER STRUCTURE ══════════════ */}
          <section id="structure" className="py-16 lg:py-24 border-t border-border">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Anatomy</p>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-foreground mb-4">How A Prototype Folder Is Organized</h2>
            <p className="text-muted-foreground mb-8 max-w-xl">Each file and folder serves a specific role. The badges show you what category each one belongs to.</p>

            <div className="space-y-2">
              {folderItems.map(item => (
                <div key={item.name} className="flex items-start gap-3 py-3 px-4 rounded-xl hover:bg-muted/50 transition-colors">
                  <FileText className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="text-sm font-medium text-foreground">{item.name}</code>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${item.badgeClass}`}>{item.badge}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.purpose}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════ 6. PROMPTS FOLDER ══════════════ */}
          <section id="prompts" className="py-16 lg:py-24 border-t border-border">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Prompt Packages</p>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-foreground mb-4">How To Use The prompts/ Folder</h2>
            <p className="text-muted-foreground mb-8 max-w-xl">Most prototypes include a ready-to-use prompt package inside <code className="text-xs bg-muted px-1.5 py-0.5 rounded">prompts/</code>. Some also include tool-specific variants.</p>

            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-poppins font-semibold text-foreground mb-2 flex items-center gap-2"><BookOpen className="w-4 h-4 text-primary" /> LOVABLE_ADVANCED_PROMPT.md</h3>
                <p className="text-sm text-muted-foreground">The primary prompt file for Lovable. It contains a detailed, structured prompt designed to be pasted directly into Lovable's chat. Start here when using Lovable.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-poppins font-semibold text-foreground mb-2 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-primary" /> Other prompt packs</h3>
                <p className="text-sm text-muted-foreground">Some prototypes include prompt files optimized for Codex, Claude, ChatGPT, Replit, or Bolt. Check the prompts/ folder for tool-specific variants. If none exist, the Lovable prompt works as a solid default for any AI tool.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-poppins font-semibold text-foreground mb-2 flex items-center gap-2"><FolderOpen className="w-4 h-4 text-primary" /> Global prompt packages</h3>
                <p className="text-sm text-muted-foreground">Shared docs and prompts live at <code className="text-xs bg-muted px-1.5 py-0.5 rounded">saas/Global Prompts and MD files/</code> and <code className="text-xs bg-muted px-1.5 py-0.5 rounded">mobile_apps/Global Prompts and MD files/</code>. Use these when the prototype-specific prompt is missing or when you want broader context about the library's conventions.</p>
              </div>
            </div>
          </section>

          {/* ══════════════ 7. WRITE BETTER PROMPTS ══════════════ */}
          <section id="better-prompts" className="py-16 lg:py-24 border-t border-border">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Prompting</p>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-foreground mb-4">How To Write A Better Prompt For Lovable</h2>
            <p className="text-muted-foreground mb-8 max-w-xl">Vague prompts create generic results. Use this formula to get specific, high-quality output from any AI builder.</p>

            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Selected prototype", hint: "saas/crmpro/ or mobile_apps/Video Editing/" },
                { label: "Target users", hint: "B2B sales teams, indie creators, clinic managers" },
                { label: "Product direction", hint: "Recruiting pipeline for agencies" },
                { label: "Screens to improve", hint: "Dashboard, onboarding, settings, billing" },
                { label: "Core workflows", hint: "Lead → Contact → Deal → Close" },
                { label: "Visual direction", hint: "Minimal, dark UI, editorial typography" },
                { label: "Integrations", hint: "Stripe, SendGrid, Google OAuth" },
                { label: "Canonical folders", hint: "apps/web, apps/api, packages/types" },
                { label: "Folders to ignore", hint: "velocitycore_v4/, timestamped builds" },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.hint}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════ 8. COPY-PASTE PROMPT BLOCKS ══════════════ */}
          <section id="copy-paste" className="py-16 lg:py-24 border-t border-border">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Ready to Use</p>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-foreground mb-8">Copy‑Paste Prompt Blocks</h2>

            {/* Short */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-poppins font-semibold text-foreground text-sm">Short Prompt</h3>
                <CopyButton text={SHORT_PROMPT} />
              </div>
              <div className="rounded-xl bg-zinc-900 dark:bg-zinc-950 text-zinc-300 p-5 text-sm leading-relaxed font-mono overflow-x-auto">
                {SHORT_PROMPT}
              </div>
            </div>

            {/* Long */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-poppins font-semibold text-foreground text-sm">Detailed Prompt</h3>
                <CopyButton text={LONG_PROMPT} />
              </div>
              <div className="rounded-xl bg-zinc-900 dark:bg-zinc-950 text-zinc-300 p-5 text-sm leading-relaxed font-mono overflow-x-auto whitespace-pre-wrap max-h-[500px] overflow-y-auto">
                {LONG_PROMPT}
              </div>
            </div>
          </section>

          {/* ══════════════ 9. BEST PRACTICES ══════════════ */}
          <section id="best-practices" className="py-16 lg:py-24 border-t border-border">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Checklist</p>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-foreground mb-8">Best Practices</h2>

            <div className="space-y-3">
              {[
                "Start with one prototype — don't mix multiple in a single session",
                "Keep one clear product direction per session",
                "Upload the whole selected prototype folder, not random individual files",
                "Tell the AI which folders are canonical and which to ignore",
                "Replace scaffold language with your actual business idea",
                "Ask for both content quality and UI quality — don't settle for generic output",
                "Read the prototype docs before prompting — context makes everything better",
                "Use the prototype-specific prompt before falling back to global prompts",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3 py-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════ 10. FAQ ══════════════ */}
          <section id="faq">
            <FAQAccordion items={faqItems} title="Frequently Asked Questions" />
          </section>

          {/* ══════════════ 11. FINAL CTA ══════════════ */}
          <section id="final-cta" className="py-20 lg:py-28 border-t border-border text-center">
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-foreground mb-4">Ready to build?</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">Pick a prototype, zip the folder, copy the prompt, and start in Lovable. You'll have a working product direction in minutes, not days.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/products" className="btn-primary inline-flex items-center gap-2 text-sm">
                Browse Prototypes <ArrowRight className="w-4 h-4" />
              </Link>
              <CopyButton text={SHORT_PROMPT} label="Copy Lovable Prompt" />
            </div>
          </section>

          <div className="pb-20" />
        </div>
      </div>
    </>
  );
}
