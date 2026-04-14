import { useState } from "react";
import { CONFIG } from "@/config/appConfig";
import { Save } from "lucide-react";

export default function ConfigTab() {
  const [config, setConfig] = useState(CONFIG);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem("ak-config-override", JSON.stringify(config));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h3 className="font-semibold text-foreground mb-4">Pricing Tiers</h3>
        <div className="space-y-3">
          {(["single", "bundle", "enterprise"] as const).map(tier => (
            <div key={tier} className="grid grid-cols-3 gap-3 items-center">
              <span className="text-sm font-medium text-foreground capitalize">{tier}</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">$</span>
                <input
                  type="number"
                  value={config.pricing[tier].usd}
                  onChange={e => setConfig(c => ({ ...c, pricing: { ...c.pricing, [tier]: { ...c.pricing[tier], usd: +e.target.value } } }))}
                  className="w-full px-2 py-1.5 rounded-lg border border-input bg-background text-sm"
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">₹</span>
                <input
                  type="number"
                  value={config.pricing[tier].inr}
                  onChange={e => setConfig(c => ({ ...c, pricing: { ...c.pricing, [tier]: { ...c.pricing[tier], inr: +e.target.value } } }))}
                  className="w-full px-2 py-1.5 rounded-lg border border-input bg-background text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-4">Growth Thresholds</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground">ROAS Scale Threshold</label>
            <input
              type="number"
              step="0.1"
              value={config.growth.roasScaleThreshold}
              onChange={e => setConfig(c => ({ ...c, growth: { ...c.growth, roasScaleThreshold: +e.target.value } }))}
              className="w-full px-2 py-1.5 rounded-lg border border-input bg-background text-sm mt-1"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">ROAS Pause Threshold</label>
            <input
              type="number"
              step="0.1"
              value={config.growth.roasPauseThreshold}
              onChange={e => setConfig(c => ({ ...c, growth: { ...c.growth, roasPauseThreshold: +e.target.value } }))}
              className="w-full px-2 py-1.5 rounded-lg border border-input bg-background text-sm mt-1"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-4">Feature Flags</h3>
        <div className="space-y-3">
          {Object.entries(config.features).map(([key, val]) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={val}
                onChange={e => setConfig(c => ({ ...c, features: { ...c.features, [key]: e.target.checked } }))}
                className="rounded border-input"
              />
              <span className="text-sm text-foreground">{key.replace(/([A-Z])/g, " $1").replace("enable ", "")}</span>
            </label>
          ))}
        </div>
      </div>

      <button onClick={handleSave} className="btn-primary gap-2">
        <Save className="w-4 h-4" /> {saved ? "Saved!" : "Save Configuration"}
      </button>
    </div>
  );
}
