import { useState } from "react";
import { useAuditLog } from "@/lib/auditLog";
import { Search, Trash2, Download, Clock, User, FileText } from "lucide-react";
import { downloadCSV } from "@/lib/csvExport";

export default function AuditLogTab() {
  const { entries, clear } = useAuditLog();
  const [filter, setFilter] = useState("");

  const filtered = entries.filter(e =>
    !filter ||
    e.action.toLowerCase().includes(filter.toLowerCase()) ||
    e.target.toLowerCase().includes(filter.toLowerCase()) ||
    e.user.toLowerCase().includes(filter.toLowerCase())
  );

  const exportCSV = () => {
    downloadCSV("audit-log", ["Timestamp", "User", "Action", "Target", "Details"],
      filtered.map(e => [e.timestamp, e.user, e.action, e.target, e.details || ""])
    );
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="font-semibold text-foreground">Audit Log</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={filter}
              onChange={e => setFilter(e.target.value)}
              placeholder="Search logs..."
              className="pl-9 pr-4 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-56"
            />
          </div>
          <button onClick={exportCSV} className="btn-secondary text-sm gap-1.5">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={clear} className="btn-secondary text-sm gap-1.5 text-destructive hover:bg-destructive/10">
            <Trash2 className="w-4 h-4" /> Clear
          </button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} entries {filter && `matching "${filter}"`}</p>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <FileText className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No audit entries yet. Actions will be logged as you use the admin panel.</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {filtered.map(e => (
            <div key={e.id} className="rounded-xl border border-border bg-card p-4 flex items-start gap-4 hover:bg-muted/30 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-foreground">{e.action}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{e.target}</span>
                </div>
                {e.details && <p className="text-xs text-muted-foreground mt-1">{e.details}</p>}
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" />{e.user}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatTime(e.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
