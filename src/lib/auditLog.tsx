import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  target: string;
  details?: string;
}

interface AuditContextValue {
  entries: AuditEntry[];
  log: (action: string, target: string, details?: string) => void;
  clear: () => void;
}

const STORAGE_KEY = "ak-audit-log";

function loadEntries(): AuditEntry[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

const AuditContext = createContext<AuditContextValue | null>(null);

export function useAuditLog() {
  const ctx = useContext(AuditContext);
  if (!ctx) throw new Error("useAuditLog must be used within AuditProvider");
  return ctx;
}

export function AuditProvider({ user, children }: { user: string; children: ReactNode }) {
  const [entries, setEntries] = useState<AuditEntry[]>(loadEntries);

  const log = useCallback((action: string, target: string, details?: string) => {
    const entry: AuditEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      user,
      action,
      target,
      details,
    };
    setEntries(prev => {
      const updated = [entry, ...prev].slice(0, 500);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [user]);

  const clear = useCallback(() => {
    setEntries([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuditContext.Provider value={{ entries, log, clear }}>
      {children}
    </AuditContext.Provider>
  );
}
