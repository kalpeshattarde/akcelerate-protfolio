import { createContext, useContext, useState, ReactNode } from "react";
import { Lock, LogIn } from "lucide-react";

export type AdminRole = "super_admin" | "manager" | "editor";

export interface AdminUser {
  username: string;
  role: AdminRole;
}

const ADMIN_PASS_KEY = "ak-admin-auth";
const ADMIN_ROLE_KEY = "ak-admin-role";
const ADMIN_USER_KEY = "ak-admin-user";

// Permission map: which tabs each role can access
export const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  super_admin: ["dashboard", "analytics", "funnel", "cohorts", "users", "orders", "content", "email", "products", "config", "affiliates", "growth", "ads", "activity", "live", "audit"],
  manager: ["dashboard", "analytics", "funnel", "cohorts", "users", "orders", "content", "email", "products", "activity", "live"],
  editor: ["dashboard", "content", "products", "activity", "live"],
};

export const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  manager: "Manager",
  editor: "Editor",
};

interface AdminAuthContextValue {
  authenticated: boolean;
  role: AdminRole;
  currentUser: string;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  hasPermission: (tab: string) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}

function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(() => {
    try { return sessionStorage.getItem(ADMIN_PASS_KEY) === "true"; } catch { return false; }
  });

  const [role, setRole] = useState<AdminRole>(() => {
    try { return (sessionStorage.getItem(ADMIN_ROLE_KEY) as AdminRole) || "editor"; } catch { return "editor"; }
  });

  const [currentUser, setCurrentUser] = useState<string>(() => {
    try { return sessionStorage.getItem(ADMIN_USER_KEY) || ""; } catch { return ""; }
  });

  const login = (username: string, password: string): boolean => {
    // Credentials validated via environment variables or fallback demo accounts
    const envUser = import.meta.env.VITE_ADMIN_USER;
    const envPass = import.meta.env.VITE_ADMIN_PASS;

    // Demo accounts for development (remove in production)
    const demoAccounts = [
      { username: "admin", password: "admin@2468", role: "super_admin" as AdminRole },
      { username: "kalpeshattarde", password: "attarde@2468", role: "super_admin" as AdminRole },
      { username: "manager", password: "manager@1234", role: "manager" as AdminRole },
      { username: "editor", password: "editor@1234", role: "editor" as AdminRole },
    ];

    let matchedRole: AdminRole | null = null;

    if (envUser && envPass && username === envUser && password === envPass) {
      matchedRole = "super_admin";
    } else {
      const account = demoAccounts.find(a => a.username === username && a.password === password);
      if (account) matchedRole = account.role;
    }

    if (matchedRole) {
      sessionStorage.setItem(ADMIN_PASS_KEY, "true");
      sessionStorage.setItem(ADMIN_ROLE_KEY, matchedRole);
      sessionStorage.setItem(ADMIN_USER_KEY, username);
      setAuthenticated(true);
      setRole(matchedRole);
      setCurrentUser(username);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_PASS_KEY);
    sessionStorage.removeItem(ADMIN_ROLE_KEY);
    sessionStorage.removeItem(ADMIN_USER_KEY);
    setAuthenticated(false);
    setRole("editor");
    setCurrentUser("");
  };

  const hasPermission = (tab: string) => ROLE_PERMISSIONS[role]?.includes(tab) ?? false;

  return (
    <AdminAuthContext.Provider value={{ authenticated, login, logout, role, currentUser, hasPermission }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

interface AdminLoginGateProps {
  children: React.ReactNode;
}

function AdminLoginForm() {
  const { login } = useAdminAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!login(username, password)) {
      setError("Incorrect credentials. Please try again.");
      setPassword("");
    }
  };

  const demoAccounts = [
    { username: "admin", role: "super_admin" as AdminRole, password: "admin@2468" },
    { username: "kalpeshattarde", role: "super_admin" as AdminRole, password: "attarde@2468" },
    { username: "manager", role: "manager" as AdminRole, password: "manager@1234" },
    { username: "editor", role: "editor" as AdminRole, password: "editor@1234" },
  ];

  return (
    <main className="pt-28 pb-20 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto px-4">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Lock className="w-7 h-7 text-primary" />
            </div>
          </div>
          <h1 className="font-poppins text-xl font-bold text-foreground text-center mb-2">Admin Access</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">Enter your admin credentials to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" autoFocus />
            <div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
              {error && <p className="text-xs text-destructive mt-2">{error}</p>}
            </div>
            <button type="submit" className="w-full btn-primary justify-center gap-2" disabled={!username.trim() || !password.trim()}>
              <LogIn className="w-4 h-4" /> Sign In
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-[10px] text-muted-foreground text-center mb-2">Demo Accounts</p>
            <div className="space-y-1">
              {demoAccounts.map(a => (
                <button key={a.username} onClick={() => { setUsername(a.username); setPassword(a.password); }}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs hover:bg-muted/60 transition-colors">
                  <span className="text-muted-foreground">{a.username}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    a.role === "super_admin" ? "bg-red-500/10 text-red-600" :
                    a.role === "manager" ? "bg-amber-500/10 text-amber-600" :
                    "bg-primary/10 text-primary"
                  }`}>{ROLE_LABELS[a.role]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function AdminGateInner({ children }: AdminLoginGateProps) {
  const { authenticated } = useAdminAuth();
  if (authenticated) return <>{children}</>;
  return <AdminLoginForm />;
}

export default function AdminLoginGate({ children }: AdminLoginGateProps) {
  return (
    <AdminAuthProvider>
      <AdminGateInner>{children}</AdminGateInner>
    </AdminAuthProvider>
  );
}
