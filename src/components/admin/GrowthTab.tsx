import { evaluateCampaign, DEMO_CAMPAIGNS } from "@/lib/growthEngine";
import { ArrowUpRight, ArrowDownRight, Minus, Zap } from "lucide-react";

const actionIcons = { scale: ArrowUpRight, pause: ArrowDownRight, maintain: Minus, optimize: Zap };
const actionColors = { scale: "text-green-500", pause: "text-red-500", maintain: "text-yellow-500", optimize: "text-blue-500" };

export default function GrowthTab() {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-foreground">AI Growth Agent — Campaign Analysis</h3>
      <div className="space-y-4">
        {DEMO_CAMPAIGNS.map(campaign => {
          const decision = evaluateCampaign(campaign);
          const Icon = actionIcons[decision.action];
          const roas = campaign.spend > 0 ? (campaign.revenue / campaign.spend).toFixed(1) : "0";

          return (
            <div key={campaign.name} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground">{campaign.name}</h4>
                <span className={`flex items-center gap-1 text-sm font-medium ${actionColors[decision.action]}`}>
                  <Icon className="w-4 h-4" /> {decision.action.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                <div><span className="text-muted-foreground">Spend</span><div className="font-medium text-foreground">${campaign.spend}</div></div>
                <div><span className="text-muted-foreground">Revenue</span><div className="font-medium text-foreground">${campaign.revenue}</div></div>
                <div><span className="text-muted-foreground">ROAS</span><div className="font-medium text-foreground">{roas}x</div></div>
                <div><span className="text-muted-foreground">Conv.</span><div className="font-medium text-foreground">{campaign.conversions}</div></div>
              </div>
              <p className="text-sm text-muted-foreground">{decision.reason}</p>
              {decision.budgetChange !== 0 && (
                <p className="text-xs mt-2 text-muted-foreground">
                  Budget change: <span className={decision.budgetChange > 0 ? "text-green-500" : "text-red-500"}>{decision.budgetChange > 0 ? "+" : ""}{decision.budgetChange}%</span>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
