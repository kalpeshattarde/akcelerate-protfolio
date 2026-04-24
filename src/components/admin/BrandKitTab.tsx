import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Upload, RotateCcw, Save, Palette, Type, Image as ImageIcon, MessageSquareQuote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  BrandKit,
  DEFAULT_BRAND_KIT,
  loadBrandKit,
  saveBrandKit,
  resetBrandKit,
  applyBrandKit,
  hexToHsl,
  hslToHex,
} from "@/lib/brandKit";

const FONT_OPTIONS = [
  "Inter", "Poppins", "Roboto", "Montserrat", "Lato", "Open Sans",
  "Raleway", "Nunito", "Playfair Display", "Merriweather", "DM Sans",
  "Plus Jakarta Sans", "Manrope", "Space Grotesk", "Work Sans",
];

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium">{label}</Label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={hslToHex(value)}
          onChange={e => onChange(hexToHsl(e.target.value))}
          className="h-10 w-12 rounded border border-border cursor-pointer bg-transparent"
          aria-label={`${label} color picker`}
        />
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="217 91% 60%"
          className="font-mono text-xs"
        />
      </div>
    </div>
  );
}

function LogoField({
  label, value, onChange, accept = "image/*",
}: { label: string; value: string | null; onChange: (v: string | null) => void; accept?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onFile = (file: File) => {
    if (file.size > 1024 * 1024) {
      alert("File too large. Max 1 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = e => onChange(String(e.target?.result || ""));
    reader.readAsDataURL(file);
  };
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium">{label}</Label>
      <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-muted/30">
        <div className="w-14 h-14 rounded-md bg-background border border-border flex items-center justify-center overflow-hidden shrink-0">
          {value ? (
            <img src={value} alt={label} className="max-w-full max-h-full object-contain" />
          ) : (
            <ImageIcon className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
            <Upload className="w-3.5 h-3.5 mr-1.5" /> Upload
          </Button>
          {value && (
            <Button type="button" variant="ghost" size="sm" onClick={() => onChange(null)}>
              Remove
            </Button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = ""; }}
        />
      </div>
    </div>
  );
}

export default function BrandKitTab() {
  const { toast } = useToast();
  const [kit, setKit] = useState<BrandKit>(() => loadBrandKit());
  const [dirty, setDirty] = useState(false);

  // Live preview as user edits
  useEffect(() => {
    applyBrandKit(kit);
  }, [kit]);

  const update = <K extends keyof BrandKit>(section: K, patch: Partial<BrandKit[K]>) => {
    setKit(prev => ({ ...prev, [section]: { ...prev[section], ...patch } }));
    setDirty(true);
  };

  const onSave = () => {
    saveBrandKit(kit);
    applyBrandKit(kit);
    setDirty(false);
    toast({ title: "Brand kit saved", description: "Your brand settings have been applied site-wide." });
  };

  const onReset = () => {
    if (!confirm("Reset to default brand kit? This cannot be undone.")) return;
    resetBrandKit();
    setKit(DEFAULT_BRAND_KIT);
    applyBrandKit(DEFAULT_BRAND_KIT);
    setDirty(false);
    toast({ title: "Brand kit reset", description: "Defaults restored." });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-poppins font-bold text-foreground">Brand Kit</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage colors, typography, logos, and brand voice. Changes preview live and persist on your device.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onReset}>
            <RotateCcw className="w-4 h-4 mr-2" /> Reset
          </Button>
          <Button onClick={onSave} disabled={!dirty}>
            <Save className="w-4 h-4 mr-2" /> Save Brand Kit
          </Button>
        </div>
      </div>

      {/* Colors */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-primary" />
            <CardTitle className="text-base">Colors</CardTitle>
          </div>
          <CardDescription>HSL format: <code className="text-xs">hue saturation% lightness%</code></CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ColorField label="Primary" value={kit.colors.primary} onChange={v => update("colors", { primary: v })} />
          <ColorField label="Accent" value={kit.colors.accent} onChange={v => update("colors", { accent: v })} />
          <ColorField label="Background — Light" value={kit.colors.background} onChange={v => update("colors", { background: v })} />
          <ColorField label="Foreground — Light" value={kit.colors.foreground} onChange={v => update("colors", { foreground: v })} />
          <ColorField label="Background — Dark" value={kit.colors.backgroundDark} onChange={v => update("colors", { backgroundDark: v })} />
          <ColorField label="Foreground — Dark" value={kit.colors.foregroundDark} onChange={v => update("colors", { foregroundDark: v })} />
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-primary" />
            <CardTitle className="text-base">Typography</CardTitle>
          </div>
          <CardDescription>Pick from Google Fonts. Loaded automatically.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-2">
            <Label className="text-xs font-medium">Heading Font</Label>
            <select
              value={kit.typography.heading}
              onChange={e => update("typography", { heading: e.target.value })}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium">Body Font</Label>
            <select
              value={kit.typography.body}
              onChange={e => update("typography", { body: e.target.value })}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              {FONT_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium">Weights</Label>
            <Input
              value={kit.typography.weights}
              onChange={e => update("typography", { weights: e.target.value })}
              placeholder="400;500;600;700"
              className="font-mono text-xs"
            />
          </div>
          <div className="md:col-span-3 p-4 rounded-lg border border-border bg-muted/30">
            <p style={{ fontFamily: `'${kit.typography.heading}', sans-serif` }} className="text-2xl font-bold text-foreground mb-2">
              The quick brown fox jumps over the lazy dog
            </p>
            <p style={{ fontFamily: `'${kit.typography.body}', sans-serif` }} className="text-sm text-muted-foreground">
              Body preview — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Logos */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-primary" />
            <CardTitle className="text-base">Logos</CardTitle>
          </div>
          <CardDescription>PNG/SVG, max 1 MB each. Stored as base64.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <LogoField label="Logo (light theme)" value={kit.logos.light} onChange={v => update("logos", { light: v })} />
          <LogoField label="Logo (dark theme)" value={kit.logos.dark} onChange={v => update("logos", { dark: v })} />
          <LogoField label="Favicon" value={kit.logos.favicon} onChange={v => update("logos", { favicon: v })} accept="image/png,image/x-icon,image/svg+xml" />
        </CardContent>
      </Card>

      {/* Brand voice */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquareQuote className="w-4 h-4 text-primary" />
            <CardTitle className="text-base">Brand Voice</CardTitle>
          </div>
          <CardDescription>Tagline and tone-of-voice notes for content writers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label className="text-xs font-medium">Tagline</Label>
            <Input
              value={kit.brand.tagline}
              onChange={e => update("brand", { tagline: e.target.value })}
              placeholder="One-line elevator pitch"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium">Voice & tone notes</Label>
            <Textarea
              value={kit.brand.voice}
              onChange={e => update("brand", { voice: e.target.value })}
              rows={5}
              placeholder="e.g. Confident, technical, outcome-focused. Avoid jargon."
            />
          </div>
        </CardContent>
      </Card>

      <Separator />
      <p className="text-xs text-muted-foreground">
        Brand kit is stored locally on this device. Connect a cloud-backed brand kit to share across the team.
      </p>
    </div>
  );
}
