import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import {
  getCohorts,
  getSelectedCohortId,
  setSelectedCohortId,
  matchesCohort,
  type Cohort,
} from "@/lib/cohorts";
import { getAnalyticsEvents } from "@/lib/analytics";

/**
 * Compact cohort filter pill bar. Drop into Funnel/Live/Analytics headers.
 * Persists selection across tabs.
 */
export default function CohortPicker() {
  const [cohorts, setCohorts] = useState<Cohort[]>(() => getCohorts());
  const [selected, setSelected] = useState<string | null>(() => getSelectedCohortId());

  useEffect(() => {
    const refresh = () => {
      setCohorts(getCohorts());
      setSelected(getSelectedCohortId());
    };
    window.addEventListener("ak-cohorts-updated", refresh);
    window.addEventListener("ak-cohort-selected", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("ak-cohorts-updated", refresh);
      window.removeEventListener("ak-cohort-selected", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const choose = (id: string | null) => {
    setSelected(id);
    setSelectedCohortId(id);
  };

  if (cohorts.length === 0) {
    return (
      <div className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Users className="w-3 h-3" /> No cohorts saved
      </div>
    );
  }

  const events = getAnalyticsEvents();

  return (
    <div className="inline-flex items-center gap-1.5 flex-wrap">
      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
        <Users className="w-3 h-3" /> Cohort:
      </span>
      <button
        type="button"
        onClick={() => choose(null)}
        className={`text-[11px] rounded-full px-2 py-0.5 border transition-colors ${
          !selected ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"
        }`}
      >
        All visitors
      </button>
      {cohorts.map(c => {
        const inSegment = matchesCohort(c, events);
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => choose(c.id)}
            title={c.description || c.name}
            className={`text-[11px] rounded-full px-2 py-0.5 border transition-colors inline-flex items-center gap-1 ${
              selected === c.id
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border hover:bg-muted"
            }`}
          >
            {c.name}
            <span className={`w-1.5 h-1.5 rounded-full ${inSegment ? "bg-emerald-500" : "bg-muted-foreground/40"}`} />
          </button>
        );
      })}
    </div>
  );
}
